<script setup lang="ts">
import { computed } from "vue"

interface propsInterface {
  playing : boolean,
  wordIndex : number
}
const props = defineProps<propsInterface>();
const emit = defineEmits(["wordCount"]);

const text = defineModel("text", {
  required:true,
  type:String
});

const words = computed(function(){
  const split = text.value.split(/[ ]/)
  emit("wordCount", split.length)
  return split
})

const currentWord = computed(() => words.value[props.wordIndex] ?? '')
const middleIndex = computed(() => Math.floor(currentWord.value.length / 2))
const leftSide = computed(() => currentWord.value.slice(0, middleIndex.value))
const middleLetter = computed(() => currentWord.value.slice(middleIndex.value, middleIndex.value + 1))
const rightSide = computed(() => currentWord.value.slice(middleIndex.value + 1))

</script>

<template>
  <div class="word-row">
    <span class="left">{{ leftSide }}</span>
    <span class="special">{{ middleLetter }}</span>
    <span class="right">{{ rightSide }}</span>
  </div>
  <label>wordindex: {{ props.wordIndex }}</label>
</template>


<style scoped>
span {
  padding: 2px 1px;
  font-size: 10em;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-color: white;
}

.special{
  color: red;
}

.word-row{
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  margin-top: 35vh;
  height:25vh;
}

.left {
  justify-self: end;
}

.right {
  justify-self: start;
}
</style>
