<script setup lang="ts">

interface propsInterface {
  playing : boolean,
  words : string[],
  wordIndex : number
}
const props = defineProps<propsInterface>();



</script>

<template>
  <p> {{ props.words[props.wordIndex] }} </p>
  <label>wordindex: {{ props.wordIndex }}</label>
</template>


<style scoped>
p {
  font-size: 10em;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  margin-top: 35vh;
  height:25vh
}
</style>
