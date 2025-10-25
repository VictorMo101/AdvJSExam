<script setup>
import { ref } from 'vue'
import { usePokemon } from '@/composables/usePokemon'
import { useYourPokemon } from '@/composables/useYourPokemon'

const { dreamWorldUrl, formatName, max_Pokemon, fetchPokemonDataBeforeRedirect } = usePokemon()
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

    const image = dreamWorldUrl(id)

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
      <h2>Add a Pokemon to your collection here!</h2>

      <div v-if="selectedPokemon" class="pokemon-card">
        <p>You got {{ formatName(selectedPokemon.name) }}!</p>
        <img
          v-if="selectedPokemon.image"
          :src="selectedPokemon.image"
          :alt="selectedPokemon.name"
          width="200"
          height="200"
        />
      </div>

      <button class="load-btn" @click="loadRandomPokemon">Pokemon Button</button>
    </section>

    <!-- 🧾 Your Saved Pokémon -->
    <section class="your-pokemon-section">
      <h2>Your Pokemon Collection</h2>

      <div v-if="yourPokemon.length === 0" class="empty">
        <p>You dont have any Pokemon yet. Click the button above to catch one!</p>
      </div>

      <ul class="pokemon-list" v-else>
 
       
  <li class="pokemon-entry" v-for="pokemon in yourPokemon" :key="pokemon.id">
  <router-link :to="`/pokedex/pokedexDetail/${pokemon.pokeId}`">
    <div class="boxiscool">
      <img :src="pokemon.image" :alt="pokemon.name" width="80" height="80" />
      <div class="info">
        <strong>{{ formatName(pokemon.name) }}</strong>
        <small>#{{ pokemon.pokeId }}</small>
      </div>
    </div>
  </router-link>
  <button class="delete-btn" @click.stop="deletePokemon(pokemon.id)">Release</button>
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

.boxiscool {
  height:100%;
  width: 100%;
}

.random-section,
.your-pokemon-section {
  text-align: center;
}

.load-btn {
  margin-top: 1rem;
  background-color: #fff;
  border: 2px solid #C2CBD2;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: background-color 0.3s;
  color: black;
}

.load-btn:hover {
  cursor: pointer;
  background-color: #f0f0f0;
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
    width: 160px;   
    background-color: #fff;
    border: 2px solid #C2CBD2;
    padding: 10px;
    border-radius: 1rem;
    align-items: center;
    text-align: center;

    transition: transform 0.2s;
}

.pokemon-entry:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.pokemon-entry a {
  text-decoration: none;
  color: black;
}

.pokemon-entry .info {
  margin-top: 0.5rem;
}

.empty {
  color: #666;
  font-style: italic;
}

.delete-btn {
  background: #ff5c5c;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
  top: -1.7rem;
}

.delete-btn:hover {
  background: #ff3c3c;
}
</style>
