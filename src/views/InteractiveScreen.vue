<template>
  <div class="view bg-color-blue" :class="{ [scenario]: true }">
    <img v-if="showAgents" src="@/assets/agent_hi_res.gif" class="agent agent-1" />
    <img v-if="showAgents" src="@/assets/agent_hi_res.gif" class="agent agent-2" />
    <img v-if="showAgents" src="@/assets/agent_hi_res.gif" class="agent agent-3" />
    <img v-if="showAgents" src="@/assets/agent_hi_res.gif" class="agent agent-4" />
    <img v-if="showAgents" src="@/assets/agent_hi_res.gif" class="agent agent-5" />
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
          @agents="(val) => (showAgents = val)"
          @scenario="(e) => $emit('change:scenario', e)"
        />
      </template>
    </FAppBar>

    <AnimationContainer
      :animation-data="animationGraph"
      :key="animationKey"
      class="animation-graph"
      autoplay
      :size="{
        width: '1920px',
        height: '1080px'
      }"
    />
    <AnimationContainer
      :animation-data="animationData"
      :key="animationKey2"
      class="animation"
      loop
      autoplay
    />
  </div>
</template>

<script setup lang="ts">
import { FAppBar, FButtonIcon } from 'fari-component-library'
import { useCMSstore } from '@/stores/cms'
import { storeToRefs } from 'pinia'
import type { Scenarios } from '@/types'
import ToolbarSettings from '@/components/ToolbarSettings.vue'
import IconCloudy from '@/components/icons/IconCloudy.vue'
import IconEnergyCoin from '@/components/icons/IconEnergyCoin.vue'
import IconCurrencyValue from '@/components/icons/IconCurrencyValue.vue'
import IconSunny from '@/components/icons/IconSunny.vue'
import IconRainy from '@/components/icons/IconRainy.vue'
import AnimationContainer from '@/components/AnimationContainer.vue'
import { ref, onMounted, watchEffect } from 'vue'

import GraphRainyNight from '@/assets/GraphRainyNight.json'
import RainyNight from '@/assets/RainyNight.json'

import GraphSunnyWinter from '@/assets/GraphSunnyWinter.json'
import SunWinter from '@/assets/SunWinter.json'

import GraphSpringCold from '@/assets/GraphSpringCold.json'
import SpringCold from '@/assets/SpringCold.json'

import GraphHotSunny from '@/assets/GraphHotSunny.json'
import SunSummer from '@/assets/SunSummer.json'

const animationGraph = ref(GraphHotSunny)
const animationData = ref(SunSummer)

const animationKey = ref(0)
const animationKey2 = ref(0)
const animationKey3 = ref(0)

onMounted(() => animationKey.value++)
const props = defineProps<{ scenario: Scenarios }>()
const { locale } = storeToRefs(useCMSstore())

const showAgents = ref(true)

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

watchEffect(() => {
  switch (props.scenario) {
    case 'summer':
      animationData.value = SunSummer
      animationGraph.value = GraphHotSunny
      break
    case 'winter':
      animationData.value = SunWinter
      animationGraph.value = GraphSunnyWinter
      break
    case 'spring':
      animationData.value = SpringCold
      animationGraph.value = GraphSpringCold
      break
    case 'autumn':
      animationData.value = RainyNight
      animationGraph.value = GraphRainyNight
      break
  }
  animationKey.value++
  animationKey2.value++
  animationKey3.value++
})
</script>

<style scoped lang="scss">
.animation {
  z-index: 2;
}

.agent {
  width: 40px;
  position: absolute;
  z-index: 3;
  &-1 {
    right: 69px;
    top: 74.5%;
  }
  &-2 {
    top: 152px;
    right: 484px;
  }
  &-3 {
    top: 152px;
    left: 286px;
  }
  &-4 {
    top: 490px;
    left: 170px;
  }
  &-5 {
    bottom: 200px;
    left: 827px;
  }
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
