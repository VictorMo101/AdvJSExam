export function usePokemon() {
    
const max_Pokemon = 151;
let all_Pokemons = []; //fetching data and putting into this array


const fetchPokemonDataBeforeRedirect = async (id) => {
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


    return { max_Pokemon, all_Pokemons, fetchPokemonDataBeforeRedirect }
}
