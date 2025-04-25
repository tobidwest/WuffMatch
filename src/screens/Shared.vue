<script setup>
import { computed } from 'vue'
import { useDogsStore } from '../store/dogs'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const store = useDogsStore()
const { dogs } = storeToRefs(store)

const queryIds = route.query.dogs ? route.query.dogs.split(',').map((id) => Number(id)) : []

dogs.value.forEach((dog) => {
  dog.friend = queryIds.includes(dog.id) ? 'like' : 'dislike'
})

const sharedDogs = computed(() => {
  return dogs.value.filter((dog) => dog.friend === 'like')
})

function getGoogleSearchUrl(dogName) {
  const query = encodeURIComponent(dogName)
  return `https://www.google.com/search?q=${query}`
}
</script>

<template>
  <div class="flex justify-center mt-6">
    <div class="flex flex-col gap-6 mb-6 w-104">
      <p>
        Dein Kontakt mag {{ sharedDogs.length }} {{ sharedDogs.length == 1 ? 'Hund' : 'Hunde' }}.
      </p>
      <div v-for="dog in sharedDogs" class="flex gap-6 bg-white rounded-2xl p-4">
        <img :src="dog.picture" class="w-36 h-28 object-cover rounded-2xl" />
        <div class="flex flex-col gap-2 justify-between">
          <span class="text-xl font-semibold">{{ dog.name_de }}</span>
          <div class="text-gray-800">
            <a
              class="cursor-pointer flex gap-1 items-center"
              :href="getGoogleSearchUrl(dog.name_de)"
              rel="noopener noreferrer"
              target="_blank"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                  clip-rule="evenodd"
                />
              </svg>
              Details</a
            >
          </div>
        </div>
      </div>
      <div v-if="dogs[dogs.length - 1].status == 'unmatched'" class="flex flex-col gap-4">
        <p>Wollt ihr eure Ergebnisse vergleichen und euren gemeinsamen Traumhund finden?</p>
        <div class="flex gap-4">
          <span
            class="flex gap-2 w-fit cursor-pointer bg-white p-2 rounded-lg"
            @click="router.push('/')"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clip-rule="evenodd"
              />
            </svg>

            Finde deinen Lieblingshund</span
          >
        </div>
      </div>
      <div v-else class="flex flex-col gap-4">
        <p>Wollt ihr eure Ergebnisse vergleichen und euren gemeinsamen Traumhund finden?</p>
        <div class="flex gap-4">
          <span
            class="flex gap-2 w-fit cursor-pointer bg-white p-2 rounded-lg"
            @click="router.push('/results')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z"
              />
              <path
                d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z"
              />
            </svg>
            Vergleiche die Ergebnisse</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
