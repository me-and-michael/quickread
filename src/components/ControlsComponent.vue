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
        <fa-icon icon="fa-solid fa-backward-step" />
      </button>
      <button @click="emit('startstop')">
        <fa-icon v-if="props.playing" icon="fa-solid fa-pause" />
        <fa-icon v-else icon="fa-solid fa-play" />
      </button>
      <button @click="emit('forwards')">
        <fa-icon icon="fa-solid fa-forward-step" />
      </button>
    </form> <!-- separated forms as for some reason, when pressing enter on input with type number, backwards is emitted-->
    <form @submit.prevent>
      WPM: <input
        ref="wpm"
        type="number"
        min="0"
        :value="props.wpm"
        @change="emitWPM"
        @focusin="stop"
        @focusout="continuePreviousPlayingState"/>
      CurrentIndex: <input
        ref="currentIndex"
        type="number"
        min="0"
        :max="props.maxWordIndex"
        :value="props.currentIndex"
        @change="emitIndex"
        @focusin="stop"
        @focusout="continuePreviousPlayingState"
        />
    </form>
  </div>
</template>

<style scoped>
div {
  display:flex;
  justify-content:center;
}
</style>

