<script setup lang="ts">
import WordComponent from './components/WordComponent.vue'
import ControlsComponent from './components/ControlsComponent.vue'

import { computed, ref, watch, onBeforeUnmount } from 'vue'

const text = ref(
  'is that MY handsome, elegant, intelligent, charming, kind, thoughtful, strong, courageous, creative, brilliant, gentle, humble, generous, passionate, wise, funny, loyal, dependable, graceful, radiant, calm, confident, warm, compassionate, witty, adventurous, respectful, sincere, magnetic, bold, articulate, empathetic, inspiring, honest, patient, powerful, attentive, uplifting, classy, friendly, reliable, ambitious, intuitive, talented, supportive, grounded, determined, charismatic, extraordinary, trustworthy, noble, dignified, perceptive, innovative, refined, considerate, balanced, open-minded, composed, imaginative, mindful, optimistic, virtuous, noble-hearted, well-spoken, quick-witted, deep, philosophical, fearless, affectionate, expressive, emotionally intelligent, resourceful, delightful, fascinating, sharp, selfless, driven, assertive, authentic, vibrant, playful, observant, skillful, generous-spirited, practical, comforting, brave, wise-hearted, enthusiastic, dependable, tactful, enduring, discreet, well-mannered, composed, mature, tasteful, joyful, understanding, genuine, brilliant-minded, encouraging, well-rounded, magnetic, dynamic, radiant, radiant-spirited, soulful, radiant-hearted, insightful, creative-souled, justice-minded, reliable-hearted, tender, uplifting-minded, persevering, devoted, angelic, down-to-earth, golden-hearted, gentle-spirited, clever, courageous-hearted, courteous, harmonious, loyal-minded, beautiful-souled, easygoing, sincere-hearted, respectful-minded, comforting-voiced, confident-minded, emotionally strong, respectful-souled, imaginative-hearted, protective, noble-minded, confident-souled, wise-eyed, loving, serene, magnetic-souled, expressive-eyed, brilliant-hearted, inspiring-minded, unforgettable, glorious, elegant, intelligent, charming, kind, thoughtful, strong, courageous, creative, brilliant, gentle, generous, passionate, funny, loyal, dependable, graceful, radiant, calm, confident, warm, witty, yeraly baimagambetov from almaty kazakhstan??',
)
const words = computed(() => text.value.split(/[ ]/))
const lastIndex = computed(() => Math.max(0, words.value.length - 1))

const playing = ref(false)
const wordIndex = ref(0)

const wpm = ref(100)
const interval = computed(() => (60 * 1000) / (wpm.value || 1))

let wordLoop: ReturnType<typeof setInterval> | null = null

function atEnd() {
  return wordIndex.value >= lastIndex.value
}

function clearWordLoop() {
  if (wordLoop !== null) {
    clearInterval(wordLoop)
    wordLoop = null
  }
}

function tick() {
  if (atEnd()) {
    playing.value = false
    return
  }
  wordIndex.value++
  if (atEnd()) {
    playing.value = false
  }
}

// Keep the timer in sync with `playing` and WPM. The interval is a browser
// side effect, not Vue state, so it must be started/stopped whenever those change.
watch([playing, interval], () => {
  clearWordLoop()
  if (!playing.value) return
  if (atEnd()) {
    playing.value = false
    return
  }
  wordLoop = setInterval(tick, interval.value)
})
onBeforeUnmount(clearWordLoop)

function changeWPM(newWPM: number) {
  wpm.value = newWPM
}

function changeIndex(newIndex: number) {
  wordIndex.value = newIndex
}

function startstop() {
  if (!playing.value && atEnd()) return
  playing.value = !playing.value
}
function backwards() {
  if (wordIndex.value <= 0) return
  playing.value = false
  wordIndex.value--
}
function forwards() {
  if (atEnd()) return
  playing.value = false
  wordIndex.value++
}
</script>

<template>
  <WordComponent
    :words="words"
    :playing="playing"
    :word-index="wordIndex"
  />
  <ControlsComponent
    :playing="playing"
    :wpm="wpm"
    :max-word-index="lastIndex"
    :current-index="wordIndex"
    @backwards="backwards"
    @startstop="startstop"
    @forwards="forwards"
    @change-wpm="changeWPM"
    @change-index="changeIndex"
  />
</template>
