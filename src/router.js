// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Welcome from './screens/Welcome.vue'
import Slider from './screens/Slider.vue'
import Results from './screens/Results.vue'
import Shared from './screens/Shared.vue'
import License from './screens/License.vue'

const routes = [
  { path: '/', component: Welcome },
  { path: '/slider', component: Slider },
  { path: '/results', component: Results },
  { path: '/shared', component: Shared },
  { path: '/license', component: License },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
