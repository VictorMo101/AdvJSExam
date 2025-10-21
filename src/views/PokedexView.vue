<script setup>
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { usePokemon } from '../composables/usePokemon.js';
    const { max_Pokemon, fetchPokemonDataBeforeRedirect } = usePokemon();
    let { all_Pokemons } = usePokemon();

    const router = useRouter();
    

    // searchInput.addEventListener("keyup", handleSearch);

    const handleSearch =() => {
        const searchTerm = searchInput.value.toLowerCase();
    }



const displayPokemons = (pokemon) => {
    const list_Wrapper = document.querySelector(".listWrapper");
    if (!list_Wrapper) return; // Prevent error if not found

    list_Wrapper.innerHTML = "";

    pokemon.forEach((pokemon) =>  {
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        listItem.className = "listItem";
        listItem.innerHTML = `
            <div class="NumberWrap">
                <p class="captionFonts">${pokemonID}</p>
            </div>
            <div class="imgWrap">
                <img src="https://raw.githubusercontent.com/Pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}">
            </div>
            <div class="nameWrap">
                <p class="">${pokemon.name}</p>
            </div>
        `;

        listItem.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);
            if (success) {

                // Navigate with the router to the named route and param that your router expects
                
                // router.push({ name: 'pokedexDetail', params: { id: pokemonID } });

                router.push(`/pokedex/pokedexDetail/${pokemonID}`)

                // Alternative: router.push(`/pokedex/pokedexDetail/${pokemonID}`)
                // Avoid window.location.href to a .vue file path — router manages routes.
            }
        });
        list_Wrapper.appendChild(listItem);
    });
}

onMounted(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${max_Pokemon}`)
        .then((response) => response.json())
        .then((data) => {
            all_Pokemons = data.results;
            displayPokemons(all_Pokemons);
        });
}); //Fetches the first 151 Pokémon from the API on mount and displays them in the DOM using displayPokemons. 
    // Also provides a function to fetch detailed data before redirecting


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
    margin-bottom: 2rem;
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
    background-color: white;
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