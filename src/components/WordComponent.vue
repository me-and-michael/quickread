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

</script>

<template>
  <p> {{ words[props.wordIndex] }} </p>
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
