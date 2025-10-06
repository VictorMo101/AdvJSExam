import { ref } from 'vue';

export function usePokemon() {
    const max_Pokemon = 151;
    const all_Pokemons = ref ([]);

    const list_Wrapper = document.querySelector(".listWrapper");
    const number_Filter = document.querySelector("#number");
    const name_Filter = document.querySelector("#name");
    const not_Found_Message = document.querySelector("#notFoundMessage");

    fetch (`https://pokeapi.co/api/v2/pokemon?limit=${max_Pokemon}`)
    .then((response) => response.json()) // Turns into json
    .then((data) => {
        all_Pokemons.value = data.results;
    })

    return { all_Pokemons }
}
