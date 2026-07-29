<script setup lang="ts">
const emit = defineEmits(["resetIndex"])

const model = defineModel({
  required:true,
  default:"Hi, something went horribly wrong if you see this message, yeraly."
});

</script>

<template>
  <div>
    <form>
      <textarea v-model="model" rows="50" cols="100" @input="emit('resetIndex')">
      </textarea>
    </form>
  </div>
</template>
