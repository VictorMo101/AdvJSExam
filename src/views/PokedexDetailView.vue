<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePokemon } from '@/composables/usePokemon'; // <-- import composable

const { dreamWorldUrl, formatName, fetchPokemonDataBeforeRedirect } = usePokemon();

const route = useRoute();
const router = useRouter();

const pokemon = ref(null);
const species = ref(null);
const loading = ref(true);
const error = ref(null);

// simple type -> color map (adjust colors as you like)
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

const loadPokemonById = async (id) => {
  const result = await fetchPokemonDataBeforeRedirect(id);
  if (result) {
    pokemon.value = result.pokemon;
    species.value = result.species;
  } else {
    error.value = 'Failed to load Pokémon data.';
  }

  loading.value = false;
};

const getFlavorText = () => {
  if (!species.value) return '';
  const entry = species.value.flavor_text_entries?.find(e => e.language?.name === 'en');
  return entry ? entry.flavor_text.replace(/\f|\n|\r/g, ' ') : '';
};


const goBack = () => router.back();

onMounted(() => {
  const id = route.params.id;
  if (id) loadPokemonById(id);
});

watch(() => route.params.id, (newId) => {
  if (newId) loadPokemonById(newId);
});
</script>



<template>
  <main class="detailRoot">
    <button class="backBtn" @click="goBack">Back</button>

    <div v-if="loading" class="status">Loading...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>
    <div v-else-if="pokemon" class="pokemonCard">
      <div class="header">
        <h2>#{{ pokemon.id }} - {{ formatName(pokemon.name) }}</h2>
      </div>

      <div class="content">

        <div class="imageWrap">
          <img
            :src="dreamWorldUrl(pokemon.id)"
            :alt="pokemon.name"
            
            
          />
        </div>

        <div class="info">
          <p class="types">
            <strong>Type:</strong>
            <span
              v-for="(t, i) in pokemon.types"
              :key="i"
              class="typeLabel"
              :style="{
                backgroundColor: typeColors[t.type.name] || '#eee',
                color: '#fff'
              }"
              >
              {{ formatName(t.type.name) }}
            </span>
          </p>

                    
          <div class="stats">
            <p><strong>Stats:</strong></p>
            <ul>
              <li v-for="s in pokemon.stats" :key="s.stat.name">{{ formatName(s.stat.name) }}: {{ s.base_stat }}</li>
            </ul>
          </div>

          <p class="description">
            <strong>About:</strong> {{ getFlavorText() }}
          </p>

        </div>

      </div>
    </div>
    <div v-else class="status">No Pokémon data</div>
  </main>
</template>

<style scoped>
.backBtn {
  margin: 0 0 1rem 0;
  background-color: #fff;
  border: 2px solid #C2CBD2;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: background-color 0.3s;
  color: black;
}

.backBtn:hover {
  cursor: pointer;
  background-color: #f0f0f0;
}

.status {
  padding: 1rem;
}
.status.error {
  color: #b00020;
}

.detailRoot {
  padding-top: 0.5rem;
  width: 90%;
  margin: 0 auto;
}

.pokemonCard {
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  border: 2px solid #C2CBD2;
}

.pokemonCard h2 {
  margin-bottom: 1rem;
  background-color: #E8ECF1;
  border: 2px solid #C2CBD2;
  padding: 0.5rem;
  border-radius: 1rem;
}

.content {
  display: flex;
  gap: 2%;
}

.imageWrap {
  background-color: #E8ECF1;
  border: 2px solid #C2CBD2;
  padding: 1rem;
  border-radius: 1rem;
}

.imageWrap img {
  width: 220px;
  height: 220px;
  object-fit: contain;
} 

.info .types, .stats {
  margin-bottom: 2rem;
}

.typeLabel {
  display: inline-block;
  margin-left: .5rem;
  padding: .2rem .5rem;
  border-radius: 10rem;
  background: #eee;
  border: 2px solid #C2CBD2;
}

.stats p {
  margin-bottom: 0.5rem;
}

.stats ul {
  background-color: #E8ECF1;
  border-radius: 10rem;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
  border: 2px solid #C2CBD2;
}

.stats ul li {
  background-color: transparent;
  text-align: center;
  border-radius: 0;
  padding: 0 0.5rem 0 0.5rem;
  list-style: none;
}

</style>