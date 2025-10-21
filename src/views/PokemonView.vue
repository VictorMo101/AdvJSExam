<template>
  <div class="about">
    <h1>This is an about post page</h1>


    <input type="text" v-model="newPostTitle" placeholder="Post title" />
    <button @click="addPost">Add Post</button>
    <span v-if="showError" style="margin-left: 10px; color: darkred;">
      Have to enter a post title
    </span>


    <ul>
      <li v-for="post in posts" :key="post.id">
        Title: {{ post.title }} | 
        <!-- ID: {{ post.id }} -->
        UID: {{ getAuthorUid(post) }}
        Email: {{ getAuthorEmail(post) }}
        <button @click="deletePost(post.id)">Delete</button>
      </li>
    </ul>
  </div>


</template>


<script setup>
import { usePosts } from '../composables/usePosts.js'
const { getAuthorEmail,  getAuthorUid, posts, addPost, deletePost, newPostTitle, showError,

 } = usePosts()



</script>


<style scoped>
  .about {
    width: 90%;
    margin: auto;
  }
</style>
