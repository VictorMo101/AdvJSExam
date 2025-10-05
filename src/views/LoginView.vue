<template>
    <div class="login-view">
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit" :disabled="loading">Login</button>
        </form>
        <div class="error" v-if="authError">
            {{ authError }}
        </div>
        <div v-if="isLoggedIn"> <!-- ((Only)) Shows the user ur logged in, also useful for switching states -->
            Logged in as: {{ currentUser?.email }} 
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const { login, authError, loading, isLoggedIn, currentUser } = useAuth();

const email = ref('');
const password = ref('');

const loginUser = () => {
    login(email.value, password.value);
}

</script>

<style>
.login-view {
    max-width: 400px;
    margin: 20px auto;
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
