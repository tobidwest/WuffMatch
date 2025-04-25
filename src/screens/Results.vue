<script setup>
import { ref, computed } from 'vue'
import { useDogsStore } from '../store/dogs'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useDogsStore()
const { dogs } = storeToRefs(store)

const likedDogs = computed(() => {
  return dogs.value.filter((dog) => dog.status === 'like' && dog.friend != 'like')
})

const sharedDogs = computed(() => {
  return dogs.value.filter((dog) => dog.status === 'dislike' && dog.friend === 'like')
})

const matchingDogs = computed(() => {
  return dogs.value.filter((dog) => dog.status === 'like' && dog.friend === 'like')
})

function getGoogleSearchUrl(dogName) {
  const query = encodeURIComponent(dogName)
  return `https://www.google.com/search?q=${query}`
}

function clearDogsStorage() {
  dogs.value = dogs.value.map((dog) => ({
    ...dog,
    status: 'unmatched',
  }))
  router.push('/')
}

function shareSheet() {
  const baseUrl = `${window.location.origin}/shared`
  const likedDogIds = likedDogs.value.map((dog) => dog.id).join(',')
  const shareUrl = `${baseUrl}?dogs=${likedDogIds}`

  if (navigator.canShare) {
    navigator.share({
      title: 'WuffMatch',
      text: `Sieh dir meine ${likedDogs.value.length} Lieblingshunde an und finde deine.`,
      url: shareUrl,
    })
  } else {
    alert('Teilen ist in diesem Browser nicht verfügbar.')
  }
}
</script>

<template>
  <div class="flex justify-center mt-6">
    <div class="flex flex-col gap-6 mb-6 w-104">
      <p>
        Du magst {{ likedDogs.length }} {{ likedDogs.length == 1 ? 'Hund' : 'Hunde' }}.<span
          v-if="sharedDogs.length !== 0"
        >
          Dein Kontakt mag {{ sharedDogs.length }} {{ sharedDogs.length == 1 ? 'Hund' : 'Hunde' }}.
          Es gibt {{ matchingDogs.length }}
          {{ matchingDogs.length == 1 ? 'Übereinstimmung' : 'Übereinstimmungen' }}.</span
        >
      </p>
      <!-- Beide mögen -->
      <h2 v-if="matchingDogs.length !== 0" class="text-2xl font-semibold">Ihr beide mögt</h2>
      <div
        v-if="matchingDogs.length !== 0"
        v-for="dog in matchingDogs"
        class="flex gap-6 bg-white rounded-2xl p-4"
      >
        <img :src="dog.picture" class="w-36 h-28 object-cover rounded-2xl aspect-auto" />
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
            <span
              class="cursor-pointer flex gap-1 items-center"
              @click="
                () => {
                  dog.status = 'dislike'
                }
              "
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                  clip-rule="evenodd"
                />
              </svg>
              Entfernen</span
            >
          </div>
        </div>
      </div>

      <!-- Beide mögen -->
      <h2 v-if="sharedDogs.length !== 0" class="text-2xl font-semibold">
        Dein Kontakt mag außerdem
      </h2>
      <div
        v-if="sharedDogs.length !== 0"
        v-for="dog in sharedDogs"
        class="flex gap-6 bg-white rounded-2xl p-4"
      >
        <img :src="dog.picture" class="w-36 h-28 object-cover rounded-2xl aspect-auto" />
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
            <span
              class="cursor-pointer flex gap-1 items-center"
              @click="
                () => {
                  dog.status = 'like'
                }
              "
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4"
              >
                <path
                  d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                />
              </svg>
              Liken</span
            >
          </div>
        </div>
      </div>

      <!-- Du magst -->
      <h2
        v-if="(matchingDogs.length !== 0 || sharedDogs.length !== 0) && likedDogs.length !== 0"
        class="text-2xl font-semibold"
      >
        Du magst außerdem
      </h2>
      <div v-for="dog in likedDogs" class="flex gap-6 bg-white rounded-2xl p-4">
        <img :src="dog.picture" class="w-36 h-28 object-cover rounded-2xl aspect-auto" />
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
            <span
              class="cursor-pointer flex gap-1 items-center"
              @click="
                () => {
                  dog.status = 'dislike'
                }
              "
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                  clip-rule="evenodd"
                />
              </svg>
              Entfernen</span
            >
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <span
          class="flex gap-2 w-fit cursor-pointer bg-white p-2 rounded-lg"
          @click="clearDogsStorage()"
          ><svg
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Neu starten</span
        >
        <span class="flex gap-2 w-fit cursor-pointer bg-white p-2 rounded-lg" @click="shareSheet()"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
              clip-rule="evenodd"
            />
          </svg>

          Ergebnis teilen</span
        >
      </div>
    </div>
  </div>
</template>
