import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import db from '../assets/dogs.json'

export const useDogsStore = defineStore('dogs', () => {
  const stored = localStorage.getItem('dogs')
  const dogs = ref(
    stored
      ? JSON.parse(stored)
      : db.map((dog) => ({
          ...dog,
          status: 'unmatched',
          friend: 'unmatched',
        })),
  )

  watch(
    dogs,
    (newDogs) => {
      localStorage.setItem('dogs', JSON.stringify(newDogs))
    },
    { deep: true },
  )

  return { dogs }
})
