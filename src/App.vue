<script setup lang="ts">
import WordComponent from './components/WordComponent.vue'
import ControlsComponent from './components/ControlsComponent.vue'

import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
type Interval = number | null

const text = ref(
  'is that MY handsome, elegant, intelligent, charming, kind, thoughtful, strong, courageous, creative, brilliant, gentle, humble, generous, passionate, wise, funny, loyal, dependable, graceful, radiant, calm, confident, warm, compassionate, witty, adventurous, respectful, sincere, magnetic, bold, articulate, empathetic, inspiring, honest, patient, powerful, attentive, uplifting, classy, friendly, reliable, ambitious, intuitive, talented, supportive, grounded, determined, charismatic, extraordinary, trustworthy, noble, dignified, perceptive, innovative, refined, considerate, balanced, open-minded, composed, imaginative, mindful, optimistic, virtuous, noble-hearted, well-spoken, quick-witted, deep, philosophical, fearless, affectionate, expressive, emotionally intelligent, resourceful, delightful, fascinating, sharp, selfless, driven, assertive, authentic, vibrant, playful, observant, skillful, generous-spirited, practical, comforting, brave, wise-hearted, enthusiastic, dependable, tactful, enduring, discreet, well-mannered, composed, mature, tasteful, joyful, understanding, genuine, brilliant-minded, encouraging, well-rounded, magnetic, dynamic, radiant, radiant-spirited, soulful, radiant-hearted, insightful, creative-souled, justice-minded, reliable-hearted, tender, uplifting-minded, persevering, devoted, angelic, down-to-earth, golden-hearted, gentle-spirited, clever, courageous-hearted, courteous, harmonious, loyal-minded, beautiful-souled, easygoing, sincere-hearted, respectful-minded, comforting-voiced, confident-minded, emotionally strong, respectful-souled, imaginative-hearted, protective, noble-minded, confident-souled, wise-eyed, loving, serene, magnetic-souled, expressive-eyed, brilliant-hearted, inspiring-minded, unforgettable, glorious, elegant, intelligent, charming, kind, thoughtful, strong, courageous, creative, brilliant, gentle, generous, passionate, funny, loyal, dependable, graceful, radiant, calm, confident, warm, witty, yeraly baimagambetov from almaty kazakhstan??',
)
const words = computed(() => text.value.split(/[ ]/))

const playing = ref(false)
const wordIndex = ref(0)

const wpm = ref(100)
const interval = computed(() => {
  return (60 * 1000) / (wpm.value || 1)
})

let wordLoop: Interval = null
function clearWordLoop() {
  if (wordLoop) {
    clearInterval(wordLoop)
    wordLoop = null
  }
}
function setWordLoop(time: number) {
  wordLoop = setInterval(() => {
    if (playing.value) {
      wordIndex.value++
    }
    if (wordIndex.value >= words.value.length - 1) {
      clearWordLoop();
    }
  }, time)
}
onMounted(() => {
  clearWordLoop()
  setWordLoop(interval.value)
})
onBeforeUnmount(clearWordLoop)

function changeWPM(newWPM: number) {
  wpm.value = newWPM;
  clearWordLoop();
  setWordLoop(interval.value);
}

function changeIndex(newIndex : number) {
  wordIndex.value = newIndex;
}

function startstop() {
  playing.value = !playing.value
}
function backwards() {
  if (wordIndex.value <= 0) return
  playing.value = false
  wordIndex.value--
}
function forwards() {
  if (wordIndex.value >= words.value.length - 1) return
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
    :max-word-index="words.length - 1"
    :current-index="wordIndex"
    @backwards="backwards"
    @startstop="startstop"
    @forwards="forwards"
    @change-wpm="changeWPM"
    @change-index="changeIndex"
  />
  <div class="line" ></div>
</template>

<style>
.line {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: -1;
  top: 35vh;
  height: 25%;
  width: 50%;
  left: 50%;
  border-left: 10px solid darkgray;
}
</style>