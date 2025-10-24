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

</script>

<template>
    <div class="login-view" v-if="!isLoggedIn">
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

    <div v-if="!isLoggedIn" class="register-view">
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

    <div class="loggedIn" v-if="isLoggedIn"> <!-- ((Only)) Shows the user ur logged in, also useful for switching states -->
            Hello there! <strong>{{ currentUser?.email }}</strong>, it's poking time
    </div>
</template>

<style>
.login-view {
    max-width: 400px;
    margin: 20px auto;
}

.register-view {
    max-width: 400px;
    margin: 20px auto;
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

button {
    padding: 0.5rem;
    background-color: #3E4A55;
    color: #EAECEE;
    margin-left: 1rem;
    border-radius: 50px;
}

form {
    display: flex;
    flex-direction: row;
}
</style>
