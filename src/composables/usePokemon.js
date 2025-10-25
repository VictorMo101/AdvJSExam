import { ref } from 'vue';

export function usePokemon() {
  const max_Pokemon = 151;
  const all_Pokemons = ref([]);

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

  const dreamWorldUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  const formatName = (name) => name ? name.charAt(0).toUpperCase() + name.slice(1) : '';

  return { formatName, dreamWorldUrl, max_Pokemon, all_Pokemons, fetchPokemonDataBeforeRedirect };
}