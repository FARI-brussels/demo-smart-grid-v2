<template>
  <div class="view bg-color-blue" :class="{ [scenario]: true }">
    <!-- <Renderer
      v-if="props.scenario === 'summer'"
      class="heat-haze-effect"
      ref="renderer"
      resize
      :orbit-ctrl="{ enableDamping: true, dampingFactor: 0.01 }"
    >
      <Camera :position="{ x: 0, y: 0, z: 2 }" />
      <Scene background="#ffff">
        <NoisyImage
          :src="img"
          :time-coef="0.01"
          :noise-coef="10"
          :z-coef="0.05"
          :disp-coef="0"
          width="2000"
        />
      </Scene>
    </Renderer> -->

    <FAppBar color="primary" class="appbar">
      <template #navigation>
        <FButtonIcon
          name="chevron-left"
          color="blue-light"
          small
          @click="$emit('exit')"
        ></FButtonIcon>
      </template>

      <div class="title">
        <div class="energy-coin">
          <IconEnergyCoin />
          <IconCurrencyValue />
        </div>
        <div class="weather">
          <component :is="toolbarTitle[props.scenario].icon" />
          <h2 class="font-weight-semibold temp">
            {{ toolbarTitle[props.scenario].temperature }}
          </h2>
        </div>
      </div>

      <template #actions>
        <ToolbarSettings
          ref="settings"
          :locale="locale"
          :scenario="props.scenario"
          @scenario="(e) => $emit('change:scenario', e)"
        />
      </template>
    </FAppBar>

    <AnimationContainer
      :animation-data="animationGraph"
      :key="animationKey"
      class="animation-graph"
    />
    <AnimationContainer :animation-data="animationData" :key="animationKey" class="animation" />
  </div>
</template>

<script setup lang="ts">
import { FAppBar, FButtonIcon, FTitle } from 'fari-component-library'
import { useDataStore } from '@/stores/dataStore'
import { storeToRefs } from 'pinia'
import type { Scenarios } from '@/types/Scenario.ts'
import ToolbarSettings from '@/components/ToolbarSettings.vue'
import IconCloudy from '@/components/icons/IconCloudy.vue'
import IconEnergyCoin from '@/components/icons/IconEnergyCoin.vue'
import IconCurrencyValue from '@/components/icons/IconCurrencyValue.vue'
import IconSunny from '@/components/icons/IconSunny.vue'
import IconRainy from '@/components/icons/IconRainy.vue'
import AnimationContainer from '@/components/AnimationContainer.vue'
import { ref, onMounted } from 'vue'

import RainyNight from '@/assets/RainyNight.json'
import GraphRainyNight from '@/assets/GraphRainyNight.json'

import SunWinter from '@/assets/RainyNight.json'
import GraphSunnyWinter from '@/assets/GraphRainyNight.json'

import GraphSpringCold from '@/assets/GraphSpringCold.json'
import SpringCold from '@/assets/SpringCold.json'

import GraphHotSunny from '@/assets/GraphHotSunny.json'
import SunSummer from '@/assets/SunSummer.json'

// import img from '../assets/summer.jpg'

// import { Camera, Renderer, Scene } from 'troisjs'
// import NoisyImage from 'troisjs/src/components/noisy/NoisyImage.js'

const animationGraph = ref(GraphHotSunny)
const animationData = ref(SunSummer)

const animationKey = ref(0)

onMounted(() => animationKey.value++)
const props = defineProps<{ scenario: Scenarios }>()
const { data, locale } = storeToRefs(useDataStore())

const toolbarTitle = {
  winter: {
    icon: IconCloudy,
    temperature: '11'
  },
  summer: {
    icon: IconSunny,
    temperature: '31'
  },
  spring: {
    icon: IconCloudy,
    temperature: '15'
  },
  autumn: {
    icon: IconRainy,
    temperature: '15'
  }
}
</script>

<style scoped lang="scss">
.animation {
  z-index: 2;
}
.animation-graph {
  z-index: 3;
  width: 1920px;
  height: 1080px;
}
.appbar {
  position: absolute;
  top: 0;
  z-index: 4;
  box-sizing: border-box;
  max-width: 100vw;
  height: 120px;
  background-color: #13377790;
}

.view {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  position: relative;
  transition: all 400ms ease-in-out;
  background-size: cover;
}

:deep(.app-bar__title) {
  width: 0;
  flex: 0;
}
:deep(.app-bar__content) {
  width: -webkit-fill-available;
  flex: 3 !important;
}

.winter {
  background-image: url('../assets/winter.png');
}
.summer {
  background-image: url('../assets/summer.png');
}
.spring {
  background-image: url('../assets/spring.png');
}
.autumn {
  background-image: url('../assets/autumn.png');
}

.title {
  display: flex;
  align-items: center;
  float: left;
  gap: 10rem;

  .weather {
    display: flex;
    gap: 1rem;
    align-items: center;
    .temp {
      font-size: 56px;
    }
  }
  .energy-coin {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right: auto;
  }
}
</style>
