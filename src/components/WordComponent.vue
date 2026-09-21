<script setup lang="ts">
import { computed } from "vue"

const text = defineModel("word", {
  required:true,
  type:String
});


const currentWord = computed(() => text.value ?? '')
const fontSize = computed(() => {
  const size = 'Math.clamp(2em, 5vw, 10em)';
  if(currentWord.value.length > 35)
  {
    return (5/(currentWord.value.length/35))+`vw`;
  }
  else
  {
    return size;
  }
})
const middleIndex = computed(() => {
  if (currentWord.value.length == 2) return 1;
  else if (currentWord.value.length == 3) return 1;
  return Math.floor((currentWord.value.length / 2) / 2)
})
const middleLetter = computed(() => {
  if (currentWord.value.length == 1) return currentWord.value;
  return currentWord.value.slice(middleIndex.value, middleIndex.value + 1)
})
const leftSide = computed(() => {
  if (currentWord.value.length == 1) return '';
  return currentWord.value.slice(0, middleIndex.value)
})
const rightSide = computed(() => {
  if (currentWord.value.length == 1) return '';
  return currentWord.value.slice(middleIndex.value + 1)
})

</script>

<template>
  <div class="word-row">
    <span class="left" :style="{ fontSize }">{{ leftSide }}</span>
    <span class="special" :style="{ fontSize }">
      {{ middleLetter }}
      <div class="line"></div>
      <div class="line2"></div>
    </span>
    <span class="right" :style="{ fontSize }">{{ rightSide }}</span>
  </div>
</template>


<style scoped>

.line{
  display: flex;
  width: auto;
  height: 8vh;
  position: absolute;
  top: 30vh;
  border-left: 1vh solid rgba(54, 54, 54, 1);
}

.line2{
  display: flex;
  width: auto;
  height: 7vh;
  position: absolute;
  bottom: 44vh;
  border-left: 1vh solid rgba(54, 54, 54, 1);
}

span {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25vh;
  line-height: 1;
  font-size: clamp(2em, 5vw, 10em);
  color: rgba(239, 239, 239, 1);
  background-color: rgba(26, 26, 26, 1);
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.special{
  color: rgb(222, 57, 39);
}

.word-row{
  margin-top: 30vh;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  width: 140vw;
  height:25vh;
  margin-left: -40vw;
  border-top: 1vh solid rgba(54, 54, 54, 1);
  border-bottom: 1vh solid rgba(54, 54, 54, 1);
}

.left {
  justify-self: end;
}

.right {
  justify-self: start;
}
</style>
