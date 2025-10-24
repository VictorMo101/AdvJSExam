<script setup>
import { ref } from 'vue'
import { usePokemon } from '@/composables/usePokemon'
import { useYourPokemon } from '@/composables/useYourPokemon'

const { max_Pokemon, fetchPokemonDataBeforeRedirect } = usePokemon()
const { addPokemon, yourPokemon, deletePokemon } = useYourPokemon()

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

    const image =
      data.pokemon.sprites?.other?.['official-artwork']?.front_default ||
      data.pokemon.sprites?.front_default || ''

    selectedPokemon.value = {
      id,
      name: data.pokemon.name,
      image,
    }

    // ✅ Add to Firestore if not already owned
    await addPokemon(selectedPokemon.value)
  } catch (e) {
    console.error('Failed to load random Pokémon', e)
    selectedPokemon.value = null
  }
}
</script>

<template>
  <div class="pokemon-view">

    <!-- 🎲 Random Pokémon Loader -->
    <section class="random-section">
      <h2>Random Pokémon Generator</h2>

      <div v-if="selectedPokemon" class="pokemon-card">
        <p>Random: {{ selectedPokemon.name }}</p>
        <img
          v-if="selectedPokemon.image"
          :src="selectedPokemon.image"
          :alt="selectedPokemon.name"
          width="200"
          height="200"
        />
      </div>

      <button class="load-btn" @click="loadRandomPokemon">🎲 Load Random Pokémon</button>
    </section>

    <!-- 🧾 Your Saved Pokémon -->
    <section class="your-pokemon-section">
      <h2>Your Pokémon Collection</h2>

      <div v-if="yourPokemon.length === 0" class="empty">
        <p>You dont have any Pokémon yet. Click the button above to catch one!</p>
      </div>

      <ul class="pokemon-list" v-else>
        <li v-for="poke in yourPokemon" :key="poke.id" class="pokemon-entry">
          <img :src="poke.image" :alt="poke.name" width="80" height="80" />
          <div class="info">
            <strong>{{ poke.name }}</strong>
            <small>#{{ poke.pokeId }}</small>
            <p class="email">{{ poke.userEmail }}</p>
          </div>
          <button class="delete-btn" @click="deletePokemon(poke.id)">Release</button>
        </li>
      </ul>
    </section>


  </div>
</template>

<style scoped>
.pokemon-view {
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.random-section,
.your-pokemon-section {
  text-align: center;
}

.load-btn {
  margin-top: 10px;
  padding: 10px 16px;
  background: #ffcb05;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.load-btn:hover {
  background: #ffde59;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.pokemon-entry {
  background: #f8f8f8;
  border-radius: 10px;
  padding: 10px;
  width: 160px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-entry img {
  border-radius: 6px;
}

.pokemon-entry .info {
  margin-top: 5px;
}

.email {
  color: #777;
  font-size: 0.7rem;
}

.empty {
  color: #666;
  font-style: italic;
}

.delete-btn {
  margin-top: 8px;
  background: #ff5c5c;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.delete-btn:hover {
  background: #ff3c3c;
}
</style>
