<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePokemon } from '../composables/usePokemon.js';

const { formatName, dreamWorldUrl, max_Pokemon, fetchPokemonDataBeforeRedirect } = usePokemon();

const query = ref('');
const pokedexList = ref([]); // [{ id, name }]

const loadList = async () => {
  const ids = Array.from({ length: max_Pokemon }, (_, i) => i + 1);
  const results = await Promise.all(
    ids.map(async (id) => {
      const data = await fetchPokemonDataBeforeRedirect(id);
      if (!data || !data.pokemon) return null;
      return { id, name: data.pokemon.name };
    })
  );
  pokedexList.value = results.filter(Boolean);
};

const filteredPokemons = computed(() => {
  const q = query.value.trim().toLowerCase();
  const source = pokedexList.value || [];
  if (!q) return source;
  return source.filter(pokemon => pokemon.name.toLowerCase().includes(q) || String(pokemon.id) === q);
});

onMounted(loadList);
</script>

<template>
  <main>
    <section class="headerPokedex">
      <h2>Pokedex</h2>
      <div class="searchWrapper">
        <div class="searchWrap">
          <img src="../assets/magnifying-glass-solid-full.svg" alt="search icon">
          <input
            v-model="query"
            type="text"
            placeholder="Search"
            class="searchInput"
            id="searchInput"
          >
        </div>
      </div>
    </section>

    <section class="pokemonList">
      <div class="pokemonContainer">
        <div class="listWrapper">
          <div
            v-for="pokemon in filteredPokemons"
            :key="pokemon.id"
            class="listItem"
          >
            <router-link :to="`/pokedex/pokedexDetail/${pokemon.id}`">
              <div class="NumberWrap">
                <p>{{ pokemon.id }}</p>
              </div>
              <div class="imgWrap">
                <img :src="dreamWorldUrl(pokemon.id)" :alt="pokemon.name">
              </div>
              <div class="nameWrap">
                <p>{{ formatName(pokemon.name) }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>

.headerPokedex {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 1rem auto 2rem auto;
    gap: 0.5rem;
}

.headerPokedex input {
    margin-left: 0.5rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #fff;
    border: 2px solid #C2CBD2;
}

.searchWrap {
    display: flex;
    align-items: center;
}

.searchWrap input {
    height: 1.5rem;
}

.searchWrap img {
    height: 1.5rem;
    width: 1.5rem;
}

.sortWrap img {
    height: 1.5rem;
    width: 1.5rem;
}

.pokemonList {
    display: flex;
    width: 90%;
    margin: auto;
    justify-content: center;
}



.listWrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: auto;
  justify-content: center;
  
}

.listItem {
    width: 160px;
    height: 160px;        
    background-color: #fff;
    border: 2px solid #C2CBD2;
    padding: 10px;
    border-radius: 1rem;

    align-items: center;
    text-align: center;
    transition: transform 0.2s;
}

.listItem:hover {
    cursor: pointer;
    transform: scale(1.05);
}

.imgWrap img {
    height: 100px;
    width: 100px;
}
</style>