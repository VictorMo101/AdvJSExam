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

  const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};


const getFlavorText = (species) => {
  if (!species) return '';
  const entry = species.flavor_text_entries?.find(e => e.language?.name === 'en');
  return entry ? entry.flavor_text.replace(/\f|\n|\r/g, ' ') : '';
};

  return { getFlavorText, formatName, dreamWorldUrl, max_Pokemon, all_Pokemons, fetchPokemonDataBeforeRedirect, typeColors };
}