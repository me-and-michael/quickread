<script setup lang="ts">
import { useTemplateRef } from 'vue'

const emit = defineEmits<{
  (e : "backwards") : void,
  (e : "startstop") : void,
  (e : "forwards") : void,
  (e : "changeWpm", value : number) : void,
  (e : "changeIndex", value : number) : void
}>();

interface propsInterface {
  playing : boolean,
  wpm : number,
  maxWordIndex : number,
  currentIndex : number
}
const props = defineProps<propsInterface>();

let lastPlayingState = false;

const wpmInput = useTemplateRef('wpm');
const indexInput = useTemplateRef('currentIndex');
function emitWPM() {
  if (!wpmInput.value) return
  stop();
  emit('changeWpm', wpmInput.value.valueAsNumber);
}
function emitIndex() {
  if (!indexInput.value) return;
  stop();
  emit('changeIndex', indexInput.value.valueAsNumber);
}
function stop() {
  lastPlayingState = props.playing;
  if (props.playing) emit('startstop');
}

function continuePreviousPlayingState() {
  if (props.playing == lastPlayingState) return;
  emit('startstop');
}

</script>

<template>
  <div>
    <form @submit.prevent>
      <button @click="emit('backwards')">
        <fa-icon icon="fa-solid fa-backward-step" class="icon" />
      </button>
      <button @click="emit('startstop')">
        <fa-icon v-if="props.playing" icon="fa-solid fa-pause" class="icon" />
        <fa-icon v-else icon="fa-solid fa-play" class="icon" />
      </button>
      <button @click="emit('forwards')">
        <fa-icon icon="fa-solid fa-forward-step" class="icon" />
      </button>
    </form> <!-- separated forms as for some reason, when pressing enter on input with type number, backwards is emitted-->
    <form @submit.prevent class="input-form">
      Target WPM: <input
        ref="wpm"
        type="number"
        min="0"
        :value="props.wpm"
        class="wpm-input"
        @change="emitWPM"
        @focusin="stop"
        @focusout="continuePreviousPlayingState"/>
      <input
        ref="currentIndex"
        type="number"
        min="0"
        :max="props.maxWordIndex"
        :value="props.currentIndex"
        class="index-input"
        @change="emitIndex"
        @focusin="stop"
        @focusout="continuePreviousPlayingState"
        />
    </form>
  </div>
</template>

<style scoped>
div {
  display:block;
  text-align:center;
}

.icon {
  color: rgba(239, 239, 239, 1);
}

button {
  width: 60px;
  height: 30px;
  margin-top: 2vh;
  margin-bottom: 1vh;
  margin-left: 3px;
  margin-right: 3px;
  background-color: transparent;
  border: none;
  outline-color: rgba(239, 239, 239, 1);
  outline-style: solid;
  outline-width:2px;
  border-radius: 0.5vh;
}

button:active {
  background-color: rgba(239, 239, 239, 0.161);
}

input {
  font-family: 'Hammersmith One', sans-serif;
  color: rgba(239, 239, 239, 1);
  background-color: transparent;
  border: none;
  outline-color: rgba(239, 239, 239, 1);
  outline-style: solid;
  outline-width:2px;
  border-radius: 0.5vh;
  width: 60px;
  height: 30px;
}

.index-input {
  display: none;
}

.input-form {
  color: rgba(239, 239, 239, 1);
  font-family: 'Hammersmith One', sans-serif;
  }
</style>

