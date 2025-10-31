import { ref, watch, onBeforeUnmount } from 'vue'
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  setDoc, serverTimestamp,
  updateDoc, deleteField
} from 'firebase/firestore'
import { db } from './firebase.js'
import { useAuth } from './useAuth.js'
import { usePokemon } from './usePokemon'

export function useYourPokemon() {
   const yourPokemonFBcollectionRef = 'yourPokemon'
  const userFavoritesCollection = 'userFavorites'
  const yourPokemon = ref([])
  const { currentUser } = useAuth()
  const { dreamWorldUrl, max_Pokemon, fetchPokemonDataBeforeRedirect } = usePokemon()

  const favoritesSet = ref(new Set())

    const alreadyOwned = ref(false)

  let unsubscribe = null
  let unsubscribeFav = null

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

  const subscribeToFavorites = (uid) => {
    if (unsubscribeFav) {
      unsubscribeFav()
      unsubscribeFav = null
    }
    favoritesSet.value = new Set()
    if (!uid) return

    const q = query(collection(db, userFavoritesCollection), where('uid', '==', uid))
    unsubscribeFav = onSnapshot(q, (snapshot) => {
      favoritesSet.value = new Set(snapshot.docs.map(d => d.data().pokemonDocId))
    })
  }

  watch(
    () => currentUser.value?.uid,
    (uid) => {
      subscribeToUserPokemon(uid)
      subscribeToFavorites(uid)
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    if (unsubscribe) unsubscribe()
    if (unsubscribeFav) unsubscribeFav()
  })

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


  const addPokemon = async (pokemon) => {
    if (!pokemon || !pokemon.name) {
      console.log('Invalid Pokémon data')
      return
    }
    if (!currentUser.value) {
      console.log('No user logged in')
      return
    }

    alreadyOwned.value = false

    const owned = await userOwnsPokemon(pokemon.id)
    if (owned) {
      alreadyOwned.value = true
      return
    }


      await addDoc(collection(db, yourPokemonFBcollectionRef), {
        name: pokemon.name,
        image: pokemon.image,
        pokeId: pokemon.id,
        userId: currentUser.value.uid,
        userEmail: currentUser.value.email,
      createdAt: serverTimestamp(),
      })

  }

  const deletePokemon = async (id) => {
    try {
      await deleteDoc(doc(db, yourPokemonFBcollectionRef, id))
    } catch (err) {
      console.log('Failed to delete Pokémon:', err)
    }
  }

const selectedPokemon = ref(null)

const randomId = (max) => Math.floor(Math.random() * max) + 1

const loadRandomPokemon = async () => {
  try {
    const id = randomId(max_Pokemon)
    const data = await fetchPokemonDataBeforeRedirect(id)

    if (!data || !data.pokemon) {
      selectedPokemon.value = null
      return
    }

    selectedPokemon.value = {
      id,
      name: data.pokemon.name,
      image: dreamWorldUrl(id),
    }

    await addPokemon(selectedPokemon.value)
  } catch (e) {
    console.error('Failed to load random Pokémon', e)
    selectedPokemon.value = null
  }
}

 const toggleFavorite = async (pokemon) => {
    if (!currentUser.value || !pokemon?.id) return

    const userId = currentUser.value.uid
    const key = `${userId}_${pokemon.id}`
    const favRef = doc(db, userFavoritesCollection, key)
    const hasFavorited = favoritesSet.value.has(pokemon.id)

    try {
      if (hasFavorited) {
        await deleteDoc(favRef)
      } else {
        await setDoc(favRef, {
          uid: userId,
          pokemonDocId: pokemon.id,
          pokeId: pokemon.pokeId,
          createdAt: serverTimestamp()
        })
      }
    } catch (error) {
      console.log('error update:', error)
    }
  }







  const setNickname = async (docId, nickname) => {
  if (!currentUser.value) return
  const clean = (nickname ?? '').trim()
  await updateDoc(doc(db, yourPokemonFBcollectionRef, docId), {
    nickname: clean ? clean : deleteField(),
    updatedAt: serverTimestamp()
  })
}

const resetNickname = async (docId) => {
  await updateDoc(doc(db, yourPokemonFBcollectionRef, docId), {
    nickname: deleteField(),
    updatedAt: serverTimestamp()
  })
}

  return {
    yourPokemon,
    deletePokemon,
    loadRandomPokemon,
    selectedPokemon,
    toggleFavorite,
    currentUser,
    favoritesSet,
    setNickname,
    resetNickname,
    alreadyOwned,
  }
}