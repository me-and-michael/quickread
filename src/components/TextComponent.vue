<script setup lang="ts">

const model = defineModel({
  required:true,
  default:"Hi, something went horribly wrong if you see this message, yeraly."
});



</script>

<template>
  <div>
    <form>
      <textarea
        v-model="model"
        rows="50"
        cols="100"
        placeholder="Paste text here..."
      ></textarea>
    </form>
  </div>
</template>

<style> 
  form{
    width: 100%;
  }

  textarea{
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    resize: none;
    background-color: rgba(26, 26, 26, 1);
    color: rgba(239, 239, 239, 1);
    border: 2px solid rgba(54, 54, 54, 1);
    border-radius: 20px;
    padding: 10px;
    font-family: 'Hammersmith One', sans-serif;
    font-size: 1em;
    width: 80%;
    height: 20vh;
  }

  textarea::placeholder{
    color: rgba(54, 54, 54, 1);
    font-family: 'Hammersmith One', sans-serif;
    font-size: 1em;
  }
</style>