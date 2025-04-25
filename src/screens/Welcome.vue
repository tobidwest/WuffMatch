<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col gap-6 mt-16 p-8 bg-white rounded-xl w-104">
      <h1 class="text-3xl">Finde deinen Traumhund</h1>
      <!-- add image of UI -->
      <div class="flex flex-col gap-2">
        <p>
          Du fragst dich, welche Hunderasse für dich in Frage kommt? Finde deinen Lieblingshund –
          ganz einfach per Swipe!
        </p>
        <p>
          Wische nach rechts, wenn dir ein Hund gefällt, und nach links, wenn nicht. Du benötigst
          kein Fachwissen, nur Bauchgefühl. Am Ende zeigen wir dir deine Favoriten an.
        </p>
        <p>
          In der App sind alle von der Fédération Cynologique Internationale (FCI) offiziell
          anerkannten Hunderassen enthalten. Das sindinsgesamt über 350 Rassen, die in 10 Gruppen
          unterteilt werden können.
        </p>
      </div>
      <button
        class="self-start cursor-pointer px-5 py-2 bg-orange-300 hover:bg-orange-200 hover:point rounded-md w-auto"
        @click="router.push('/slider')"
      >
        Starten
      </button>
    </div>
  </div>
  <div class="flex w-full justify-center gap-2 mt-8">
    <p>
      <a
        href="https://github.com/tobidwest/WuffMatch"
        target="_blank"
        rel="noopener noreferrer"
        class="cursor-pointer"
        >Auf GitHub anzeigen</a
      >
    </p>
    ·
    <p>
      <a
        @click="router.push('/license')"
        class="cursor-pointer"
        target="_blank"
        rel="noopener noreferrer"
        >Lizenzen</a
      >
    </p>
  </div>
</template>
