<script setup>
import { ref } from 'vue'
import { usePokemon } from '../composables/usePokemon'
import { useYourPokemon } from '../composables/useYourPokemon'

const { dreamWorldUrl, formatName } = usePokemon()
const { setNickname, resetNickname, yourPokemon, deletePokemon, loadRandomPokemon, selectedPokemon, toggleFavorite, favoritesSet, alreadyOwned } = useYourPokemon()

const getFavoriteButtonLabel = (pokemon) => favoritesSet.value.has(pokemon.id) ? '❤️' : '🩶'
const isFavorited = (pokemon) => favoritesSet.value.has(pokemon.id)

const nicknames = ref({})

const displayName = (pokemon) => pokemon.nickname ? pokemon.nickname : formatName(pokemon.name)

const saveNick = async (pokemon) => {
  await setNickname(pokemon.id, nicknames.value[pokemon.id] || '')
}

const resetNick = async (pokemon) => {
  await resetNickname(pokemon.id)
  nicknames.value[pokemon.id] = ''
}

const showNickChange = ref(false);
const toggleNickChange = () => { showNickChange.value = !showNickChange.value; }

</script>

<template>
  <div class="pokemonView">
    <section class="randomSection">
      <h2>Add a Pokemon to your collection here!</h2>

      <div v-if="selectedPokemon" class="pokemonCard">
        <p>You got {{ formatName(selectedPokemon.name) }}!</p>
        <img
          v-if="selectedPokemon.image"
          :src="selectedPokemon.image"
          :alt="selectedPokemon.name"
          width="200"
          height="200"
        />
      </div>
      <p class="alreadyOwnText" v-if="alreadyOwned">You already own this Pokemon!</p>
      <button class="loadBtn" @click="loadRandomPokemon">Pokemon Button</button>
    </section>

    <section class="yourPokemonSection">
      <h2>Your Pokemon Collection</h2>

      <div class="nickShow">
          <button class="nickShowButton" type="button" @click="toggleNickChange">
              {{ showNickChange ? 'Hide' : 'Add Nicknames?' }}
          </button>
      </div>

      <div v-if="yourPokemon.length === 0" class="empty">
        <p>You dont have any Pokemon yet. Click the button above to catch one!</p>
      </div>
      
      <ul class="pokemonList" v-else>
        <li class="pokemonEntry" v-for="pokemon in yourPokemon" :key="pokemon.id">
          <router-link :to="`/pokedex/pokedexDetail/${pokemon.pokeId}`">
            <div class="pokemonBox">
              <img :src="dreamWorldUrl(pokemon.pokeId)" :alt="pokemon.name" width="80" height="80" />
              <div class="info">
                <strong>{{ displayName(pokemon) }}</strong>
                <small>#{{ pokemon.pokeId }}</small>
              </div>
            </div>
          </router-link>

          <div class="nickEditor" v-if="showNickChange">
            <input
              type="text"
              :placeholder="pokemon.nickname || formatName(pokemon.name)"
              v-model="nicknames[pokemon.id]"
            />
            <button @click.stop="saveNick(pokemon)">Save</button>
            <button @click.stop="resetNick(pokemon)">Reset</button>
          </div>
          <div class="dltfvrBox">
            <button v-if="!isFavorited(pokemon)" class="deleteBtn" @click.stop="deletePokemon(pokemon.id)">Release</button>
            <button class="favoriteBtn" @click.stop="toggleFavorite(pokemon)">{{ getFavoriteButtonLabel(pokemon) }}</button>
          </div>

        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.alreadyOwnText {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
}

.nickShow {
  margin-bottom: 1rem;
}

.nickShowButton {
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  border: none;
  background-color: #fff;
  border: 2px solid #C2CBD2;
  cursor: pointer;
  margin: 0.5rem 0 0 0;
  transition: background-color 0.3s;
}

.nickShowButton:hover {
  background-color: #f0f0f0;
}

.nickEditor {
  margin: 0.5rem 0 0.5rem 0;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-direction: column;
}

.nickEditor input {
  width: 90px;
  padding: 0.25rem 0.5rem;
  align-self: center;
  border-radius: 1rem;
  text-align: center;
}

.nickEditor button {
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  border: none;
  background-color: #fff;
  border: 2px solid #C2CBD2;
  cursor: pointer;

  transition: background-color 0.3s;
}

.nickEditor button:hover {
  background-color: #f0f0f0;
}


.pokemonView {
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pokemonBox {
  width: 100%;
}

.randomSection, .yourPokemonSection {
  text-align: center;
}

.randomSection h2 {
  margin-top: 1rem;
}

.loadBtn {
  margin-top: 1rem; 
  background-color: #fff;
  border: 2px solid #C2CBD2;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: background-color 0.3s;
  color: black;
}

.loadBtn:hover {
  cursor: pointer;
  background-color: #f0f0f0;
}

.pokemonList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.pokemonEntry {
    width: 160px;   
    background-color: #fff;
    border: 2px solid #C2CBD2;
    padding: 10px;
    border-radius: 1rem;
    align-items: center;
    text-align: center;

    transition: transform 0.2s;
}

.pokemonEntry:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.pokemonEntry a {
  text-decoration: none;
  color: black;
}

.pokemonEntry .info {
  margin-top: 0.5rem;
}

.empty {
  color: #666;
  font-style: italic;
}

.deleteBtn {
  background: #ff5c5c;
  color: white;
  padding: 6px 10px;
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
}

.deleteBtn:hover {
  background: #ff3c3c;
}


.favoriteBtn {
  background: #ffd700;
  padding: 6px;
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
}

.dltfvrBox {
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
}
</style>
