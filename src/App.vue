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
import type { Scenario } from '@/types/Scenario.ts'

const startScreenVisible = ref(true)
const transitionName = ref('slide-left')

const scenario = ref<Scenario>('summer')

const startDemo = (e: Scenario) => {
  scenario.value = e

  // transitionName.value = 'slide-left'
  startScreenVisible.value = false
}

const exitDemo = () => {
  // transitionName.value = 'slide-right'
  startScreenVisible.value = true
}
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
