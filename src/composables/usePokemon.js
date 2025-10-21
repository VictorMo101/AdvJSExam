import { ref } from 'vue';

export function usePokemon() {
  const max_Pokemon = 151;
  const all_Pokemons = ref([]);

  const fetchAllPokemons = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${max_Pokemon}`);
      const data = await res.json();
      all_Pokemons.value = data.results;
      return data.results;
    } catch (err) {
      console.error('failed to fetch pokemons', err);
      return null;
    }
  };

  const fetchPokemonDataBeforeRedirect = async (id) => {
    try {
      const [pokemon, pokemonSpecies] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(r => r.json())
      ]);
      return { pokemon, species: pokemonSpecies };
    } 
      catch (error) {
      console.error('failed to fetch pokemon data before redirect', error);
      return null;
    }
  };

  return { max_Pokemon, all_Pokemons, fetchAllPokemons, fetchPokemonDataBeforeRedirect };
}