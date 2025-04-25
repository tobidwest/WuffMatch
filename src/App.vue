<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const screen = ref('welcome')
const resultsData = ref([])
</script>

<template>
  <header class="flex justify-center bg-orange-50">
    <img @click="router.push('/')" alt="Logo" class="h-16 cursor-pointer" src="./assets/logo.png" />
  </header>
  <main class="px-12">
    <router-view />
  </main>
</template>

<style scoped></style>
