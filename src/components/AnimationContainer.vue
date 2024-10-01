<template>
  <div class="animation-wrapper">
    <div
      v-bind="$attrs"
      ref="lottieContainer"
      class="lottie-container"
      :style="props.size || 'width: 1920px; height: 1080px'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  animationData: Object
  autoplay?: boolean
  loop?: boolean
  dark?: boolean
  size?: {
    width: string
    height: string
    top: string
    left: string
  }
}>()

const lottieContainer = ref<HTMLElement | null>(null)
let animationInstance: AnimationItem | null = null

function init({ container, animationData }: { container: HTMLElement; animationData: Object }) {
  if (animationInstance) {
    animationInstance.destroy()
  }
  animationInstance = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: props.loop,
    autoplay: props.autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet'
    }
  })
}

onMounted(() => {
  if (lottieContainer.value && props.animationData) {
    init({
      container: lottieContainer.value,
      animationData: props.animationData
    })
  }
})

watch(
  () => props.animationData,
  (newVal, oldVal) => {
    if (newVal === oldVal) return
    if (lottieContainer.value && newVal) {
      init({
        container: lottieContainer.value,
        animationData: newVal
      })
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  animationInstance && animationInstance.destroy()
})
</script>

<style scoped lang="scss">
.animation-wrapper {
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.lottie-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  max-width: 1920px; // Set a maximum width
  max-height: 1080px;
  z-index: -1;
  background-size: cover;
  background-position: center;
  will-change: transform, opacity;
  transition: background-image 1s;
}
</style>
