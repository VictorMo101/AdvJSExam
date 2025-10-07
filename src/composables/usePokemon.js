import { onMounted } from 'vue';

export function usePokemon() {
    

const max_Pokemon = 151;
let all_Pokemons = []; //fetching data and putting into this array




function displayPokemons(pokemon) {
    const list_Wrapper = document.querySelector(".listWrapper");
    if (!list_Wrapper) return; // Prevent error if not found

    list_Wrapper.innerHTML = "";

    pokemon.forEach((pokemon) =>  {
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        listItem.className = "listItem";
        listItem.innerHTML = `
            <div class="NumberWrap">
                <p class="captionFonts">#${pokemonID}</p>
            </div>
            <div class="imgWrap">
                <img src="https://raw.githubusercontent.com/Pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}">
            </div>
            <div class="nameWrap">
                <p class="">#${pokemon.name}</p>
            </div>
        `;

        listItem.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);
            if (success) {
                window.location.href = `./PokedexDetailView.vue?id=${pokemonID}`;
            }
        });
        list_Wrapper.appendChild(listItem);
    });
}




async function fetchPokemonDataBeforeRedirect(id) {
    try {
        const [pokemon, pokemonSpecies] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()),
        ]);
        return true;
    } catch (error) {
        console.error("failed to fetch pokemon data, before redirect");
    }
}   // Fetches detailed data for a specific Pokémon and its species before redirecting. 
    // Returns true if successful, logs an error if the fetch fails.




onMounted(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${max_Pokemon}`)
        .then((response) => response.json())
        .then((data) => {
            all_Pokemons = data.results;
            displayPokemons(all_Pokemons);
        });
}); //Fetches the first 151 Pokémon from the API on mount and displays them in the DOM using displayPokemons. 
    // Also provides a function to fetch detailed data before redirecting

    return { all_Pokemons, displayPokemons, fetchPokemonDataBeforeRedirect }
}
