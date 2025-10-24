// useYourPokemon.js
import { ref, watch, onBeforeUnmount } from 'vue'
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { db } from './firebase.js'
import { useAuth } from './useAuth.js'

export function useYourPokemon() {
  const yourPokemonFBcollectionRef = 'yourPokemon'
  const yourPokemon = ref([])
  const showError = ref(false)
  const { currentUser } = useAuth()

  let unsubscribe = null

  const subscribeToUserPokemon = (uid) => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
    if (!uid) {
      yourPokemon.value = []
      return
    }

    const q = query(collection(db, yourPokemonFBcollectionRef), where('userId', '==', uid))
    unsubscribe = onSnapshot(q, (snapshot) => {
      yourPokemon.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    })
  }

  watch(
    () => currentUser.value?.uid,
    (uid) => subscribeToUserPokemon(uid),
    { immediate: true }
  )

  onBeforeUnmount(() => {
    if (unsubscribe) unsubscribe()
  })

  // 🧩 Check if user already owns Pokémon
  const userOwnsPokemon = async (pokeId) => {
    if (!currentUser.value) return false
    const q = query(
      collection(db, yourPokemonFBcollectionRef),
      where('userId', '==', currentUser.value.uid),
      where('pokeId', '==', pokeId)
    )
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }

  // ✅ Add Pokémon if not already owned
  const addPokemon = async (pokemon) => {
    if (!pokemon || !pokemon.name) {
      console.error('Invalid Pokémon data')
      return
    }
    if (!currentUser.value) {
      console.error('No user logged in')
      return
    }

    const alreadyOwned = await userOwnsPokemon(pokemon.id)
    if (alreadyOwned) {
      console.warn(`⚠️ You already own ${pokemon.name}`)
      return
    }

    try {
      await addDoc(collection(db, yourPokemonFBcollectionRef), {
        name: pokemon.name,
        image: pokemon.image,
        pokeId: pokemon.id,
        userId: currentUser.value.uid,
        userEmail: currentUser.value.email,
        createdAt: new Date(),
      })
      console.log(`✅ Added ${pokemon.name} to Firestore`)
    } catch (err) {
      console.error('❌ Failed to add Pokémon:', err)
    }
  }

  // 🗑️ Delete Pokémon
  const deletePokemon = async (id) => {
    try {
      await deleteDoc(doc(db, yourPokemonFBcollectionRef, id))
      console.log(`🗑️ Pokémon with ID ${id} deleted`)
    } catch (err) {
      console.error('❌ Failed to delete Pokémon:', err)
    }
  }

  return {
    yourPokemon,
    addPokemon,
    deletePokemon,
    showError,
  }
}
