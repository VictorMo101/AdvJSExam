import { ref, watch, onBeforeUnmount } from 'vue'
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore'
import { db } from './firebase.js'
import { useAuth } from './useAuth.js'

export function usePosts() {
  const postsFBcollectionRef = 'posts'

  const posts = ref([])
  const newPostTitle = ref('')
  const showError = ref(false)

  const { currentUser } = useAuth()

  let unsubscribe = null

  const subscribeToUserPosts = (uid) => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
    if (!uid) {
      posts.value = []
      return
    }
    const q = query(collection(db, postsFBcollectionRef), where('userId', '==', uid))
    unsubscribe = onSnapshot(q, (snapshot) => {
      posts.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    })
  }

  watch(
    () => currentUser.value?.uid,
    (uid) => subscribeToUserPosts(uid),
    { immediate: true }
  )

  onBeforeUnmount(() => {
    if (unsubscribe) unsubscribe()
  })

  const addPost = async () => {
    if (newPostTitle.value.trim() === '') {
      showError.value = true
      return
    }
    showError.value = false

    await addDoc(collection(db, postsFBcollectionRef), {
      title: newPostTitle.value,
      userId: currentUser.value?.uid,
      uid: currentUser.value?.uid || null,
      userEmail: currentUser.value?.email,
    })

    newPostTitle.value = ''
  }

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, postsFBcollectionRef, id)
      await deleteDoc(postDoc)
    } catch (error) {
      console.error('Error deleting document: ', error)
    }
  }


  const getAuthorUid = (post) => {
    if (!post) return ''
    return Array.isArray(post.uid) ? post.uid[0] : post.uid || ''
  }

  const getAuthorEmail = (post) => {
    if (!post) return ''
    return Array.isArray(post.userEmail) ? post.userEmail[0] : post.userEmail || ''
  }

  return {
    posts,
    newPostTitle,
    showError,
    addPost,
    deletePost,
    currentUser,
    getAuthorUid,
    getAuthorEmail
  }
}