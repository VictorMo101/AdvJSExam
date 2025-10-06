<script setup>
// import { onMounted } from 'vue';
// import { usePokemon } from '../composables/usePokemon.js';

// const { all_Pokemons } = usePokemon();

// onMounted(() => {
//   setTimeout(() => {
//     console.log(all_Pokemons.value[5]);
//   }, 100); // delay just for testing, not recommended in production
// });

    const max_Pokemon = 151;

    const list_Wrapper = document.querySelector(".listWrapper");
    const number_Filter = document.querySelector("#number");
    const name_Filter = document.querySelector("#name");
    const not_Found_Message = document.querySelector("#notFoundMessage");

    let all_Pokemons = [];

    fetch (`https://pokeapi.co/api/v2/pokemon?limit=${max_Pokemon}`)
    .then((response) => response.json()) // Turns into json
    .then((data) => {
        all_Pokemons.value = data.results;
    })

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
                id="searchInput"
                >
            </div>
            <div class="sortWrapper">
                <div class="sortWrap">
                    <img src="../assets/sort-solid-full.svg" alt="sort icon" class="sortIcon" id="sortIcon">
                </div>
                <div class="filterWrapper">
                    <p>Sort by:</p>
                    <div class="filterWrap">
                        <div>
                            <input 
                            type="radio" 
                            id="number" 
                            name="filters" 
                            value="number" 
                            checked>
                            <label for="number">Number</label>
                        </div>
                        <div>
                            <input 
                            type="radio" 
                            id="name" 
                            name="filters" 
                            value="name">
                            <label for="name">Name</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="pokemonList">
        <div class="container">
            <div class="listWrapper"></div>
        </div>
        <div id="notFoundMessage">Pokemon not found</div>
    </section>
  </main>
</template>

<style>

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
</style>