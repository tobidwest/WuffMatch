<script setup>
import { ref } from 'vue'
import { useDogsStore } from '../store/dogs'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useDogsStore()
const { dogs } = storeToRefs(store)
const progress = ref(dogs.value.filter((dog) => dog.status !== 'unmatched').length)

if (progress.value === dogs.value.length) {
  router.push('/results')
}

function swipeAction(index, direction) {
  try {
    if (direction === 'left') {
      dogs.value[index].status = 'dislike'
    } else if (direction === 'right') {
      dogs.value[index].status = 'like'
    }
    progress.value++
    if (progress.value === dogs.value.length) {
      router.push('/results')
    }
  } catch (error) {
    console.error('[swipeAction error]:', error.message)
  }
}
</script>

<template>
  <div class="flex justify-center mt-6">
    <section class="mb-8">
      <p v-if="progress < dogs.length" class="text-gray-800 text-sm text-center">
        {{ dogs[progress].group }}
        <!-- » {{ dogs[progress].section }} -->
      </p>
      <div class="overflow-hidden rounded-full bg-gray-200 mt-2 mb-8 w-84">
        <div
          class="h-2 rounded-full bg-orange-300"
          :style="{ width: (progress / dogs.length) * 100 + '%' }"
        ></div>
      </div>
      <div
        v-for="(dog, index) in dogs"
        :key="index"
        class="absolute top-36 left-1/2 transform -translate-x-1/2"
        :style="{
          zIndex: dogs.length - index,
          opacity: index === progress || index === progress + 1 ? 1 : 0,
          pointerEvents: index === progress || index === progress + 1 ? 'auto' : 'none',
        }"
      >
        <div
          class="flex flex-col gap-2 bg-white rounded-2xl mb-6 p-6 shadow-lg w-104"
          v-if="progress <= index && dog.status === 'unmatched'"
        >
          <span class="text-xl font-semibold mb-2 text-center">{{ dog.name_de }}</span>
          <img :src="dog.picture" class="w-full h-64 object-cover rounded-2xl mb-2" />
          <div class="flex justify-around">
            <button
              class="h-12 w-12 rounded-full bg-rose-400 flex justify-center items-center text-white cursor-pointer"
              @click="() => swipeAction(index, 'left')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </button>
            <button
              class="h-12 w-12 rounded-full bg-emerald-400 flex justify-center items-center text-white cursor-pointer"
              @click="() => swipeAction(index, 'right')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
