<script setup>
import { usePokemon } from '../composables/usePokemon.js';

const { dreamWorldUrl } = usePokemon();
</script>

<template>
  <main>
    <section class="hero">
        <h1 class="heroTitle">Hi and welcome to THE pokemon site!</h1>
        <img class="heroPikachu" :src="dreamWorldUrl(25)" alt="">
    </section>
    <section class="homeAbout">
        <div class="aboutTextImg">
          <div>
            <p>You can read and learn about the many different Pokemons!<br><br>Learn how strong they are, and what they are like!</p>
          <br>
          <p class="aboutArrows">⬇⬇⬇</p>
          <router-link to="/Pokedex">
            <button class="aboutButton">Pokedex</button>
          </router-link>

          </div>
          <img :src="dreamWorldUrl(6)" alt=""></img>
        </div>
        <div class="aboutTextImg">
          <img :src="dreamWorldUrl(108)" alt=""></img>
            <div>
              <p>You can even login and start collecting your own Pokemon!<br><br>Can you catch them all like Ash Ketchup 🍅?</p>
              <br>
              <p class="aboutArrows">⬇⬇⬇</p>
              <router-link to="/login">
                <button class="aboutButton">Login</button>
              </router-link>
            </div>
        </div>
    </section>

  </main>
</template>

<style>
.hero {
    text-align: center;
    font-size: 2.5rem;
    width: 80%;
    margin: 2rem auto 2rem auto
}

.heroPikachu {  
    width: 200px;
    height: 200px;
}

.homeAbout {
    font-size: 1.5rem;
    width: 80%;
    margin: auto; 
}


.aboutTextImg {
  background-color: white;
  height: 22rem;
  padding: 0.5rem;
  border: 2px solid #C2CBD2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 1rem;

  margin: 2rem 0 2rem 0;
  place-items: center;
  text-align: center;
}

.aboutTextImg img {
  width: 18rem;
  height: 18rem;
}

.aboutButton {
  margin: 0 0 1rem 0;
  background-color: #fff;
  border: 2px solid #C2CBD2;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: background-color 0.3s;
  color: black;
}

.aboutButton:hover {
  cursor: pointer;
  background-color: #f0f0f0;
}

.aboutArrows {
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (max-width: 768px) {
  .aboutTextImg {
    grid-template-columns: 1fr;
    height: auto;
  }

  .aboutTextImg img {
    width: 12rem;
    height: 12rem;
  }
}
</style>