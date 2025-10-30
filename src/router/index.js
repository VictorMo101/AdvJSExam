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

//navigation guard to pretet routes that requre authentication
router.beforeEach((to, from, next) => {
    const { isLoggedIn } = useAuth()

    if (to.meta.requiresAuth && !isLoggedIn.value) {
        //redirect to login if not authenticated
        next({ name: 'login' })
    } else {
        next() //proceed to route
    }
})

export default router
