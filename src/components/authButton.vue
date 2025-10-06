<template>
<button v-if="isLoggedIn" @click="handleLogout" id="lg-btn" class="auth-btn">Logout</button>
<router-link v-else to="/login" class="auth-btn">Login</router-link>
</template>

<script setup>
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const { isLoggedIn, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
    logout(router);
}

</script>

<style>
    button {
        background: none;
        border: none;
        outline: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
        color: inherit;
        font: inherit;
        cursor: pointer;
    }

    #lg-btn {
        margin-left: 0;
        height: 100%;
        width: 100%;
        border-radius: 0;
        border-right: 2px solid #505A63;
    }

    #lg-btn:hover {
        background-color: #4C5A66;
    }
</style>