<script setup lang="ts">
import { ref, onMounted } from 'vue'

const index = ref(0)
const playing = ref(false)

const wpm = ref(100)
const interval = computed(() => {
  return 1 / (wpm.value * 60 * 1000)
})
const wordLoop = setInterval(() => {
  if (playing.value) {
    index.value++
  }
}, interval)

function back() {
  index.value--
}

function startstop() {
  playing.value = !playing.value
}

function forward() {
  index.value++
}

onMounted(() => {
  setInterval(() => {}, interval.value)
})
</script>

<template>
  <p>wordindex: {{ index }}</p>
  <p>wpm: {{ wpm }}</p>

  <form @submit.prevent>
    <button @click="back">
      <fa-icon icon="fa-solid fa-backward-step" />
    </button>
    <button @click="startstop">
      <fa-icon v-if="playing" icon="fa-solid fa-pause" />
      <fa-icon v-else icon="fa-solid fa-play" />
    </button>
    <button @click="forward">
      <fa-icon icon="fa-solid fa-forward-step" />
    </button>
  </form>
</template>
