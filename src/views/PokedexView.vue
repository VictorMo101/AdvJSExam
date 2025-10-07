<script setup>
    import { usePokemon } from '../composables/usePokemon.js';
    const { all_Pokemons, displayPokemons, fetchPokemonDataBeforeRedirect } = usePokemon();

    searchInput.addEventListener("keyup", handleSearch)

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

.pokemonList {
    display: flex;
}

.listWrapper {
    display: flex;
    flex-wrap: wrap;      /* Allow items to wrap to next line */
    gap: 1rem;
    justify-content: center; /* Or center, if you prefer */
}

.listItem {
    width: 160px;
    height: 160px;        
    background-color: red;
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