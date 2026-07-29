<script setup lang="ts">
import { useTemplateRef } from 'vue'

const emit = defineEmits(["backwards", "startstop", "forwards", "changeWpm", "changeIndex"])

interface propsInterface {
  playing : boolean,
  wpm : number,
  maxWordIndex : number,
  currentIndex : number
}
const props = defineProps<propsInterface>();

const wpmInput = useTemplateRef('wpm');
const indexInput = useTemplateRef('currentIndex');
function emitWPM() {
  stop();
  emit('changeWpm', wpmInput.value?.value);
}
function emitIndex() {
  stop();
  emit('changeIndex', indexInput.value?.value);
}
function stop() {
  if (props.playing) emit('startstop');
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
      WPM: <input ref="wpm" type="number" min="0" :value="props.wpm" @change="emitWPM" @focusin="stop"/>
      CurrentIndex: <input ref="currentIndex" type="number" min="0" :max="props.maxWordIndex" :value="props.currentIndex" @change="emitIndex" @focusin="stop"/>
    </form>
  </div>
</template>

<style scoped>
div {
  display:block;
  text-align:center;
}
</style>

