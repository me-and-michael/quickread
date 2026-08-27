<script setup lang="ts">
import WordComponent from './components/WordComponent.vue'
import ControlsComponent from './components/ControlsComponent.vue'
import TextComponent from './components/TextComponent.vue'

import { computed, ref, onMounted, watch} from 'vue'
import { createRouter } from 'vue-router'

const DEFAULT_INTERVAL = 100;
const DEFAULT_TEXT = 'is that MY handsome, elegant, intelligent, charming, kind, thoughtful, strong, courageous, creative, brilliant, gentle, humble, generous, passionate, wise, funny, loyal, dependable, graceful, radiant, calm, confident, warm, compassionate, witty, adventurous, respectful, sincere, magnetic, bold, articulate, empathetic, inspiring, honest, patient, powerful, attentive, uplifting, classy, friendly, reliable, ambitious, intuitive, talented, supportive, grounded, determined, charismatic, extraordinary, trustworthy, noble, dignified, perceptive, innovative, refined, considerate, balanced, open-minded, composed, imaginative, mindful, optimistic, virtuous, noble-hearted, well-spoken, quick-witted, deep, philosophical, fearless, affectionate, expressive, emotionally intelligent, resourceful, delightful, fascinating, sharp, selfless, driven, assertive, authentic, vibrant, playful, observant, skillful, generous-spirited, practical, comforting, brave, wise-hearted, enthusiastic, dependable, tactful, enduring, discreet, well-mannered, composed, mature, tasteful, joyful, understanding, genuine, brilliant-minded, encouraging, well-rounded, magnetic, dynamic, radiant, radiant-spirited, soulful, radiant-hearted, insightful, creative-souled, justice-minded, reliable-hearted, tender, uplifting-minded, persevering, devoted, angelic, down-to-earth, golden-hearted, gentle-spirited, clever, courageous-hearted, courteous, harmonious, loyal-minded, beautiful-souled, easygoing, sincere-hearted, respectful-minded, comforting-voiced, confident-minded, emotionally strong, respectful-souled, imaginative-hearted, protective, noble-minded, confident-souled, wise-eyed, loving, serene, magnetic-souled, expressive-eyed, brilliant-hearted, inspiring-minded, unforgettable, glorious, elegant, intelligent, charming, kind, thoughtful, strong, courageous, creative, brilliant, gentle, generous, passionate, funny, loyal, dependable, graceful, radiant, calm, confident, warm, witty, yeraly baimagambetov from almaty kazakhstan??';

function PUNCTUATION_DELAY_MULTIPLIER(char : string | undefined) {
  switch (char) {
    case "." : return 2;
    case "," : return 1.5;
    case ":" : return 1.25;
    case "?" : return 1.75;
    case '"' : return 1.15;
    case "'" : return 1.15;
    case "!" : return 1.75;
    case ";" : return 1.5;
    default: return 1;
  }
}

const text = ref(DEFAULT_TEXT);
const words = computed(() : string[] => text.value.split(/[ ]/));
const wordCount = computed(() => words.value.length);

function getWordAtIndex(index : number) : string {
  if (index >= wordCount.value) throw "index out of bound"
  const word = words.value[index];

  if (typeof word === "undefined") throw "undefined at index "+index.toString();

  return word
}

const longestWordLen = ref(1);
const shortestWordLen = ref(1);
async function updateWordLengths() {
  let longest = 0;
  let shortest = 100000000;

  for (let i = 0; i < wordCount.value; i++) {
    const currentLength : number = getWordAtIndex(i).length; // not safe, but words array construction should ensure
    if (longest < currentLength) longest = currentLength;
    if (shortest > currentLength) shortest = currentLength;
  }
  longestWordLen.value = longest;
  shortestWordLen.value = shortest;
}
watch(words, updateWordLengths);
onMounted(updateWordLengths);

const wordIndex = ref(0)
const currentWord = computed(() : string => getWordAtIndex(wordIndex.value) || "Invalid word index/ words.")
const playing = ref(false)


const wpm = ref(DEFAULT_INTERVAL)
const interval = computed(() => {
  if (wpm.value > 0) {
    const lastChar = currentWord.value.at(-1);
    const punctDelayMult : number = PUNCTUATION_DELAY_MULTIPLIER(lastChar);
    return punctDelayMult*(((currentWord.value.length - shortestWordLen.value)/(longestWordLen.value - shortestWordLen.value)) + 0.5) * ((60 * 1000) / wpm.value);
  }
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  playing.value = false // this part only ever runs should wpm.value be set to 0, which should not be allowed anyways
  console.warn("WPM SET TO 0 OR NEGATIVE NUMBER");
  return DEFAULT_INTERVAL;
})

function startLoop() {
  function nextWord() {
    if (!playing.value || (wordIndex.value >= wordCount.value - 1)) {
      playing.value = false;
      return;
    }
    wordIndex.value++;
    setTimeout(nextWord, interval.value)
  }
  setTimeout(nextWord, interval.value)
}

function changeWPM(newWPM: number) {
  wpm.value = newWPM;
}

function changeIndex(newIndex : number) {
  if (newIndex < 0 || newIndex >= wordCount.value) return;
  wordIndex.value = newIndex;
}

function stop() {
  playing.value = false
}

function startstop() {
  playing.value = !playing.value
  if (playing.value) startLoop();
}

function backwards() {
  if (wordIndex.value <= 0) return
  playing.value = false
  wordIndex.value--
}
function forwards() {
  if (wordIndex.value >= wordCount.value - 1) return
  playing.value = false
  wordIndex.value++
}
</script>

<template>
  <div class="word-box">
  </div>
  <WordComponent
    v-model:word="currentWord"
  />
  <ControlsComponent
    :playing="playing"
    :wpm="wpm"
    :max-word-index="wordCount - 1"
    :current-index="wordIndex"
    @backwards="backwards"
    @startstop="startstop"
    @forwards="forwards"
    @change-wpm="changeWPM"
    @change-index="changeIndex"
  />

<!--
  <TextComponent
    v-model="text"
    @resetIndex="changeIndex(0)"
    @update:model-value="stop"
  /> -->
</template>

<style>
body{
  background-color: rgba(26, 26, 26, 1);
}
</style>
