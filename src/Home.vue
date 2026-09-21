<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import TextComponent from './components/TextComponent.vue'

const router = useRouter()
//const DEFAULT_TEXT = 'is that MY handsome, elegant, intelligent, charming, kind, thoughtful, strong, courageous, creative, brilliant, gentle, humble, generous, passionate, wise, funny, loyal, dependable, graceful, radiant, calm, confident, warm, compassionate, witty, adventurous, respectful, sincere, magnetic, bold, articulate, empathetic, inspiring, honest, patient, powerful, attentive, uplifting, classy, friendly, reliable, ambitious, intuitive, talented, supportive, grounded, determined, charismatic, extraordinary, trustworthy, noble, dignified, perceptive, innovative, refined, considerate, balanced, open-minded, composed, imaginative, mindful, optimistic, virtuous, noble-hearted, well-spoken, quick-witted, deep, philosophical, fearless, affectionate, expressive, emotionally intelligent, resourceful, delightful, fascinating, sharp, selfless, driven, assertive, authentic, vibrant, playful, observant, skillful, generous-spirited, practical, comforting, brave, wise-hearted, enthusiastic, dependable, tactful, enduring, discreet, well-mannered, composed, mature, tasteful, joyful, understanding, genuine, brilliant-minded, encouraging, well-rounded, magnetic, dynamic, radiant, radiant-spirited, soulful, radiant-hearted, insightful, creative-souled, justice-minded, reliable-hearted, tender, uplifting-minded, persevering, devoted, angelic, down-to-earth, golden-hearted, gentle-spirited, clever, courageous-hearted, courteous, harmonious, loyal-minded, beautiful-souled, easygoing, sincere-hearted, respectful-minded, comforting-voiced, confident-minded, emotionally strong, respectful-souled, imaginative-hearted, protective, noble-minded, confident-souled, wise-eyed, loving, serene, magnetic-souled, expressive-eyed, brilliant-hearted, inspiring-minded, unforgettable, glorious, elegant, intelligent, charming, kind, thoughtful, strong, courageous, creative, brilliant, gentle, generous, passionate, funny, loyal, dependable, graceful, radiant, calm, confident, warm, witty, yeraly baimagambetov from almaty kazakhstan??';
const text = ref('');
const hasText = computed(() => text.value.trim().length > 0)

function goToFlasher() {
  localStorage.setItem('text', JSON.stringify(text.value));
  router.push('/flasher')
}
</script>
<template>
  <aside>
  </aside>
  <main>
    <h1>Read boring text faster</h1>
    <div class="upload-block">
      <div class="upload-file">
        <button>
          Upload
          <fa-icon icon="fa-solid fa-upload" />
        </button>
        <p>A PDF File</p>
      </div>
      <p>Or</p>
      <TextComponent
        v-model="text"
      />
      <button
        @click="goToFlasher"
        class="flasher-button"
        :disabled="!hasText"
      >Start Flasher</button>
    </div>
  </main>
</template>
<style>
body{
  background-color: rgba(26, 26, 26, 1);
  overflow-x: hidden;
}
aside
{
  border-right: 1px solid rgba(54, 54, 54, 1);
  background-color: rgba(35, 35, 35, 1);
  width: 250px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}
main
{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  left: 250px;
  right: 0;
  width: auto;
  position: absolute;
  top: 60px;
  padding: 20px;
  font-family: 'Hammersmith One', sans-serif;
  text-align: center;
}
h1{
  color: rgba(239, 239, 239, 1);
}
p{
  color: rgba(239, 239, 239, 1);
}
.upload-block{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid rgba(54, 54, 54, 1);
  background-color: rgba(35, 35, 35, 1);
  width: clamp(200px, 70%, 800px);
  border-radius: 20px;
}
.upload-file{
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(46, 153, 134, 1);
  width: 80%;
  height: 20vh;
  margin-top: 3vh;
  border-radius: 20px;
}
.upload-file button{
  background-color: rgba(153, 57, 46, 1);
  border: 2px solid rgba(239, 239, 239, 1);
  border-radius: 10px;
  color: rgba(239, 239, 239, 1);
  width: 110px;
  height: 40px;
  font-size: 1em;
  cursor: pointer;
  font-family: 'Hammersmith One', sans-serif;
}
.upload-file button:active{
  background-color: rgba(153, 57, 46, 0.811);
}
.upload-file p{
  margin-left: 10px;
}
.flasher-button{
  background-color: rgba(46, 153, 134, 1);
  border: 2px solid rgba(239, 239, 239, 1);
  border-radius: 10px;
  color: rgba(239, 239, 239, 1);
  width: 150px;
  height: 40px;
  font-size: 1em;
  cursor: pointer;
  font-family: 'Hammersmith One', sans-serif;
  margin: 20px;
}
.flasher-button:disabled{
  background-color: rgba(80, 80, 80, 1);
  border-color: rgba(120, 120, 120, 1);
  color: rgba(180, 180, 180, 1);
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 700px) {
  aside {
    display: none;
  }

  main {
    left: 0;
  }
}
</style>
