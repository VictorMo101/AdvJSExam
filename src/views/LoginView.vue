<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const { register, login, authError, loading, isLoggedIn, currentUser } = useAuth();

const email = ref('');
const password = ref('');

const loginUser = () => {
    login(email.value, password.value);
}

const regEmail = ref('');
const regPassword = ref('');

const registerUser = () => {
    register(regEmail.value, regPassword.value);
}

const showRegister = ref(false);
const toggleRegister = () => { showRegister.value = !showRegister.value; }

</script>

<template>
    <div class="loginView" v-if="!isLoggedIn">
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit" :disabled="loading">Login</button>
        </form>
        <div class="error" v-if="authError">
            {{ authError }}
        </div>
    </div>

    <div class="regShow" v-if="!isLoggedIn">
        <button class="regButton" type="button" @click="toggleRegister">
            {{ showRegister ? 'Hide register' : 'Wanna register?' }}
        </button>
    </div>

    <div class="registerView" v-if="!isLoggedIn && showRegister">
        <h2>Register</h2>
        <form @submit.prevent="registerUser">
            <input type="email" v-model="regEmail" placeholder="Email" required />
            <input type="password" v-model="regPassword" placeholder="Password" required />
            <button type="submit" :disabled="loading">Register</button>
        </form>
        <div class="error" v-if="authError">
            {{ authError }}
        </div>
    </div>

    <div class="loggedIn" v-if="isLoggedIn">
            Hello there! <strong>{{ currentUser?.email }}</strong>, it's poking time
    </div>
</template>

<style scoped>
.loginView {
    max-width: 400px;
    margin: 20px auto;
}

.loginView h2 {
    margin-bottom: 0.5rem;
}

.registerView {
    max-width: 400px;
    margin: 20px auto;
}

.registerView h2 {
    margin-bottom: 0.5rem;
}

.regShow {
    max-width: 400px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
}

.regButton {
    margin: 0;
}

.loggedIn {
    max-width: 400px;
    margin: 20px auto;
    font-size: 1.2rem;
}

.error {
    color: brown;
    margin-top: 16px;
}

input {
  margin-right: 0.5rem;
  padding: 0.5rem;
  border: 2px solid #C2CBD2;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

button {
  margin-left: 0;
  background-color: #fff;
  border: 2px solid #C2CBD2;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: background-color 0.3s;
  color: black;
}

button:hover {
  cursor: pointer;
  background-color: #f0f0f0;
}

form {
    display: flex;
    flex-direction: row;
}

@media (max-width: 700px) {
    form {
        flex-direction: column;
    }

    input {
        margin: 0 0 0.5rem 0;
    }

    button {
        margin: 0.5rem 0 0 0;
    }

    .loginView, .registerView {
        width: 80%;
    }
}
</style>