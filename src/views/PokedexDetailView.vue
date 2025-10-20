<script setup>
    import { useRouter } from 'vue-router';
    import { usePokemon } from '../composables/usePokemon.js';
    const { max_Pokemon, fetchPokemonDataBeforeRedirect } = usePokemon();
    let { all_Pokemons } = usePokemon();

</script>

<template>
    <p>hi</p>
</template>

<style></style>