<template>
  <head>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />
  </head>
  <div class="layout">
    <Transition name="fade">
      <StartScreen v-if="startScreenVisible" @start="startDemo" />
      <InteractiveScreen
        v-else
        @exit="exitDemo"
        :scenario="scenario"
        @change:scenario="(e) => (scenario = e)"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import StartScreen from '@/views/StartScreen.vue'
import InteractiveScreen from '@/views/InteractiveScreen.vue'
import type { Scenarios } from '@/types'

const startScreenVisible = ref(true)
const transitionName = ref('slide-left')

const scenario = ref<Scenarios>('summer')

const startDemo = (e: Scenarios) => {
  scenario.value = e
  startScreenVisible.value = false
}

const exitDemo = () => (startScreenVisible.value = true)
</script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
}

.fade-enter-active {
  transition: opacity 800ms ease-in-out;
}

.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>
