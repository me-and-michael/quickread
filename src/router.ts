import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './Home.vue'
import FlasherPage from './Flasher.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/flasher', component: FlasherPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})