import { ref, computed } from 'vue'
import { firebaseApp } from './firebase.js'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth'

const auth = getAuth(firebaseApp)

const currentUser = ref(null)
const isLoggedIn = computed(() => !!currentUser.value)
const authError = ref(null)
const loading = ref(false)

//if something changes in firebase, it tells it to reload. Force an update in vue.
onAuthStateChanged(auth, (user) => {
    currentUser.value = user
}) 


const login = async (email, password) => {
    console.log('login attempt: ', email) 
    loading.value = true
    authError.value = null
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch(error) {
        authError.value = error.message
    }
    finally {
        loading.value = false
    }
}

const logout = async (routerInstance) => {
    console.log("logout of this mail: ", currentUser.value?.email) /* putting ''?'' is telling the system it cant become undefined */
    loading.value = true
    authError.value = null

    try {
        await signOut(auth) //The only neccessary thing to do, everything else is UX for the user.
        if (routerInstance) {
            routerInstance.push('/')
        }
    }
    catch(error) {
        authError.value = error.message
    }
    finally{
        loading.value = false
    }
}

export function useAuth() {
    return { 
        currentUser, 
        isLoggedIn, 
        authError, 
        loading, 
        login, 
        logout }
}