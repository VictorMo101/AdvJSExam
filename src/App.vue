<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AuthButton from './components/authButton.vue'

import { useAuth } from './composables/useAuth';
const { currentUser,  isLoggedIn } = useAuth();

</script>

<template>
  <header>
    <nav class="navbar">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <AuthButton/>
        </li>
        <li>
          <router-link to="/Pokedex">Pokedex</router-link>
        </li>
        <li v-if="isLoggedIn"> 
          <router-link to="/Pokemon">Pokemon</router-link>
        </li>
        <p v-if="isLoggedIn">Hello there {{ currentUser.email }}! </p>
      </ul>

    </nav>
  </header>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background-color: #E8ECF1;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar p {
  color: white;
  margin-left: 1rem;
}

.navbar {
  margin: 0.5rem auto 0.5rem auto;
  height: 60px;
  width: 90%;
  background-color: #2F3B45;
  border-radius: 10rem;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12), 0 1.5px 4px 0 rgba(0,0,0,0.10);
}

.navbar ul {
  list-style: none;
  display: flex;
  align-items: center;
  height: 100%;
}

.navbar ul li {
  height: 100%;
  min-width: 100px;          
  background-color: #3E4A55;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar ul li:first-child {
  border-top-left-radius: 10rem;
  border-bottom-left-radius: 10rem;
}

.navbar a {
  text-decoration: none;
  border-right: 2px solid #505A63;
  display: flex;              
  align-items: center;       
  justify-content: center;    
  width: 100%;
  height: 100%;
  text-align: center;
}

.navbar ul li:hover {
background-color: #4C5A66;
}

.navbar a {
  text-decoration: none;
  color: #EAECEE;
}

.navbar a.router-link-exact-active {
  color: #9CA3AF;
}


</style>
