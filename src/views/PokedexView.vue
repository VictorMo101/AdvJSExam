<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemon } from '../composables/usePokemon.js';

const { all_Pokemons, fetchAllPokemons, fetchPokemonDataBeforeRedirect } = usePokemon();
const router = useRouter();

const formatName = (name) => name ? name.charAt(0).toUpperCase() + name.slice(1) : '';

const displayPokemons = (pokemonArray) => {
  const list_Wrapper = document.querySelector('.listWrapper');
  if (!list_Wrapper) return;
  list_Wrapper.innerHTML = '';

  (pokemonArray || []).forEach((pokemon) => {
    const pokemonID = pokemon.url.split('/')[6];
    const listItem = document.createElement('div');

    listItem.className = 'listItem';
    listItem.innerHTML =  `
            <div class="NumberWrap">
                <p class="captionFonts">${pokemonID}</p>
            </div>
            <div class="imgWrap">
                <img src="https://raw.githubusercontent.com/Pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}">
            </div>
            <div class="nameWrap">
                <p class="">${formatName(pokemon.name)}</p>
            </div>
        `;
    listItem.addEventListener('click', async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) router.push(`/pokedex/pokedexDetail/${pokemonID}`);
    });
    list_Wrapper.appendChild(listItem);
  });
};

onMounted(async () => {
  const pokes = await fetchAllPokemons();
  displayPokemons(pokes || all_Pokemons.value);
});

</script>

<template>
  <main>
    <section class="headerPokedex">
        <h2>Pokedex</h2>
        <div class="searchWrapper">
            <div class="searchWrap">
                <img src="../assets/magnifying-glass-solid-full.svg" alt="search icon">
                <input type="text"
                placeholder="Search"
                class="searchInput"
                id="searchInput">
            </div>
        </div>
    </section>

    <section class="pokemonList">
        <div class="container">
            <div class="listWrapper"></div>
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
}

.listWrapper {
    display: flex;
    flex-wrap: wrap;      /* Allow items to wrap to next line */
    justify-content: space-between;
    width: 90%;
    margin: auto;
}

.listItem {
    width: 160px;
    height: 160px;        
    background-color: #fff;
    border: 2px solid #C2CBD2;
    padding: 10px;
    border-radius: 12px;
    margin-bottom: 1rem;
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