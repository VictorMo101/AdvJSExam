import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
        {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path : '/pokemon',
      name: 'pokemon',
      component: () => import('../views/PokemonView.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path : '/pokedex',
      name: 'pokedex',
      component: () => import('../views/PokedexView.vue')
    },
    {
      path : '/pokedex/pokedexDetail/:id',
      name: 'pokedexDetail',
      component: () => import('../views/PokedexDetailView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
    const { isLoggedIn } = useAuth()

    if (to.meta.requiresAuth && !isLoggedIn.value) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
