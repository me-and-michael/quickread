<script setup lang="ts">  
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToFlasher() {
  router.push('/flasher')
}
</script>
<template>
  <p>Home</p>
  <button @click="goToFlasher">Start Flasher</button>
</template>
<style> 
body{
  background-color: rgba(26, 26, 26, 1);
}
p{
  color: white;
  font-family: 'Hammersmith One', sans-serif;
  font-size: 2em;
}
</style>