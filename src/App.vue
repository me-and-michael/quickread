<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { createRouter } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
<template>
  <header>
    <button @click="goHome" class="logo">QuickRead</button>
  </header>
  <router-view />
</template>

<style>
header{
  display: flex;
  width: 250px;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid rgba(54, 54, 54, 1);
  z-index: 3;
}

.logo{
  background-color: transparent;
  border: none;
  color: rgba(46, 153, 134, 1);
  font-size: 1.5em;
  cursor: pointer;
  font-family: 'Hammersmith One', sans-serif;
}

</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap');
</style>