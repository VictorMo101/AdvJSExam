<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';



const route = useRoute();
const router = useRouter();

const pokemon = ref(null);
const species = ref(null);
const loading = ref(true);
const error = ref(null);

async function loadPokemonById(id) {
  loading.value = true;
  error.value = null;
  pokemon.value = null;
  species.value = null;

  try {
    const [p, s] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(r => r.json())
    ]);
    pokemon.value = p;
    species.value = s;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to load Pokémon data.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  const id = route.params.id;
  if (id) loadPokemonById(id);
});

watch(() => route.params.id, (newId) => {
  if (newId) loadPokemonById(newId);
});

function formatName(name) {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getFlavorText() {
  if (!species.value) return '';
  const entry = species.value.flavor_text_entries?.find(e => e.language?.name === 'en');
  return entry ? entry.flavor_text.replace(/\f|\n|\r/g, ' ') : '';
}

function goBack() {
  router.back();
}
</script>

<template>
  <main class="detailRoot">
    <button class="backBtn" @click="goBack">Back</button>

    <div v-if="loading" class="status">Loading...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>
    <div v-else-if="pokemon" class="pokemonCard">
      <div class="header">
        <h2>#{{ pokemon.id }} — {{ formatName(pokemon.name) }}</h2>
      </div>

      <div class="content">
        <div class="imageWrap">
          <img
            :src="pokemon.sprites?.other?.dream_world?.front_default || pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default"
            :alt="pokemon.name"
          />
        </div>

        <div class="info">
          <p class="types">
            <strong>Type:</strong>
            <span v-for="(t, i) in pokemon.types" :key="i" class="typeLabel">{{ formatName(t.type.name) }}</span>
          </p>

          <p class="stats">
            <strong>Stats:</strong>
            <ul>
              <li v-for="s in pokemon.stats" :key="s.stat.name">{{ formatName(s.stat.name) }}: {{ s.base_stat }}</li>
            </ul>
          </p>

          <p class="description"><strong>About:</strong> {{ getFlavorText() }}</p>
        </div>
      </div>
    </div>
    <div v-else class="status">No Pokémon data</div>
  </main>
</template>

<style scoped>
.detailRoot {
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
}
.backBtn {
  margin-bottom: 1rem;
}
.status {
  padding: 1rem;
}
.status.error {
  color: #b00020;
}
.pokemonCard {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}
.imageWrap img {
  width: 220px;
  height: 220px;
  object-fit: contain;
}
.info { flex: 1; }
.typeLabel {
  display: inline-block;
  margin-left: .5rem;
  padding: .2rem .5rem;
  border-radius: 10px;
  background: #eee;
}
</style>