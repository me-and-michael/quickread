<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const index = ref(0)
const playing = ref(false)

const wpm = ref(100)
const interval = computed(() => {
  return (60*1000)/(wpm.value || 1)
})
let wordLoop = null
onMounted(() => {
  if (wordLoop) {
    clearInterval(wordLoop)
    wordLoop = null
  }
  wordLoop = setInterval(() => {
    if (playing.value) {
      index.value++
    }
  }, interval.value)
})
onBeforeUnmount(() => {
  if (wordLoop) {
    clearInterval(wordLoop)
    wordLoop = null
  }
})

function back() {
  index.value--
}

function startstop() {
  playing.value = !playing.value
}

function forward() {
  index.value++
}

// onMounted(() => {
//   setInterval(() => {}, interval.value)
// })
</script>

<template>
  <p>wordindex: {{ index }}</p>
  <p>wpm: {{ wpm }} interval: {{ interval }}</p>

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
