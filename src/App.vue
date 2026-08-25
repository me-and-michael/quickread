<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { createRouter } from 'vue-router'
</script>

<template>
  <router-view />
</template>

<style>
.line {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: -1;
  top: 35vh;
  height: 25%;
  width: 50%;
  left: 50%;
  border-left: 10px solid darkgray;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap');
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap');
</style>
