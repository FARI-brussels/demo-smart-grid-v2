<template>
  <div class="view">
    <!-- <canvas ref="backgroundCanvas"></canvas> -->
    <FButtonIcon name="tooltip" class="tooltip" color="blue-light" small @click="toggleInfoCard" />
    <div class="heading">
      <div class="title">
        <FTitle class="title"> Smart energy</FTitle>
        <FTitle class="title"> communities</FTitle>
      </div>
      <FSubTitle class="subtitle"> Energy / Resource optimization </FSubTitle>
    </div>

    <FButton
      label="Start demo"
      type="primary"
      class="start-button"
      on-dark
      @click="toggleScenarioSelect"
    />

    <FSlideTransition :show="showInfoCard">
      <FCard v-if="showInfoCard" @close="toggleInfoCard" @update:locale="setLocale" class="card">
        {{ data.explanation_short[locale] }}

        <div class="researchers-container">
          <span class="researchers">
            research head: <span class="research-head color-black"> {{ data.research_head }} </span>
          </span>
          <span class="researchers">
            research lead: <span class="research-lead color-black"> {{ data.research_lead }} </span>
          </span>
        </div>
        <template #footer> <div v-if="data.logo" v-html="data.logo"></div> </template>
      </FCard>
    </FSlideTransition>

    <FSlideTransition :show="showScenarioSelect">
      <div
        v-if="showScenarioSelect"
        @close="toggleScenarioSelect"
        class="bg-color-blue p-l rounded scenario-select"
      >
        <FTitle> {{ scenarioSelectTitle[locale] }} </FTitle>
        <p class="color-white font-size-body">{{ scenarioSelectSubTitle[locale] }}</p>

        <div
          v-for="{ value, label, icon } in scenarios"
          :key="value"
          class="scenario-item bg-color-primary rounded-s p-md"
          @click="() => selectScenario(value)"
        >
          <component :is="icon" />
          <span class="font-weight-black font-size-body"> {{ label[locale] }} </span>
        </div>
        <FButton
          @click="toggleScenarioSelect"
          label="cancel"
          on-dark
          outlined
          class="cancel-button"
        />
      </div>
    </FSlideTransition>

    <div class="backdrop" :class="{ 'backdrop-active': showScenarioSelect || showInfoCard }"></div>
    <FFooter class="footer" />
    <AnimationContainer autoplay loop :animation-data="animationData" />
  </div>
</template>

<script setup lang="ts">
import 'fari-component-library/style'
import {
  FTitle,
  FSubTitle,
  FFooter,
  FButtonIcon,
  FCard,
  FSlideTransition,
  FButton
} from 'fari-component-library'
import AnimationContainer from '@/components/AnimationContainer.vue'
import animationData from '@/assets/smartgridNoTitle24fpsRedux.json'
import { useDataStore } from '@/stores/dataStore'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import IconSummer from '@/components/icons/IconSummer.vue'
import IconWinter from '@/components/icons/IconWinter.vue'
import IconSpring from '@/components/icons/IconSpring.vue'
import IconAutumn from '@/components/icons/IconAutumn.vue'

import type { Scenario } from '@/types/Scenario.ts'

const emit = defineEmits<{
  (e: 'scenario', value: Scenario): void
  (e: 'start', value: Scenario): void
}>()
const showInfoCard = ref(false)
const toggleInfoCard = () => (showInfoCard.value = !showInfoCard.value)

const showScenarioSelect = ref(false)
const toggleScenarioSelect = () => (showScenarioSelect.value = !showScenarioSelect.value)

const { data, locale } = storeToRefs(useDataStore())
const { getData, setLocale } = useDataStore()

onMounted(getData)

function selectScenario(scenario: Scenario) {
  setTimeout(() => (showScenarioSelect.value = false), 400)
  emit('start', scenario)
}

const scenarioSelectTitle = {
  en: 'Select a scenario',
  'fr-FR': 'Sélectionnez un scénario',
  nl: 'Selecteer een scenario'
} as const

const scenarioSelectSubTitle = {
  en: 'Weather conditions can have an impact on supply and demand. Select different situations to find out',
  'fr-FR':
    "Les conditions météorologiques peuvent avoir un impact sur l'offre et la demande. Sélectionnez différentes situations pour le savoir",
  nl: 'Weersomstandigheden kunnen van invloed zijn op vraag en aanbod. Selecteer verschillende situaties om erachter te komen'
} as const

const scenarios = [
  {
    label: {
      en: 'Hot sunny afternoon in summer',
      'fr-FR': 'Après-midi chaud et ensoleillé en été',
      nl: 'Warme zonnige middag in de zomer'
    },
    value: 'summer',
    icon: IconSummer
  },
  {
    label: {
      en: 'Rainy autumn night',
      'fr-FR': "Nuit pluvieuse d'automne",
      nl: 'Regenachtige herfstnacht'
    },
    value: 'autumn',
    icon: IconAutumn
  },
  {
    label: {
      en: 'Sunny winter day',
      'fr-FR': "Journée d'hiver ensoleillée",
      nl: 'Zonnige winterdag'
    },
    value: 'winter',
    icon: IconWinter
  },
  {
    label: {
      en: 'Dark cold spring day',
      'fr-FR': 'Journée de printemps froide et sombre',
      nl: 'Donkere koude lentedag'
    },
    value: 'spring',
    icon: IconSpring
  }
] as const
</script>

<style scoped lang="scss">
.view {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  position: relative;
  // background-image: url('../assets/SmartEnergy_BG.svg?url');
}

.scenario-select {
  z-index: 3;
  position: absolute;
  top: 5%;
  left: 27%;
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0;

  .cancel-button {
    margin: 1rem auto 0 auto;
  }

  .scenario-item {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

.heading {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space;
  margin-top: 6rem;
  .title {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }
}

.start-button {
  display: inline-block;
  width: auto;
  max-width: 200px;
  margin: auto;
}

.tooltip {
  position: absolute;
  top: 5rem;
  right: 37rem;
}

.footer {
  margin-top: auto;
  margin-bottom: 1.8rem;
}

.subtitle {
  font-family: 'Rhetorik';
  color: #64d8bf;
}

.card {
  position: absolute;
  top: 25%;
  left: 20%;
  z-index: 3;
}

.researchers-container {
  margin-top: auto;
  display: flex;
  flex-direction: column;
}

.researchers {
  color: #888;
  text-transform: uppercase;
}

.research-head,
.research-lead {
  text-transform: none;
}

.backdrop {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0);
  z-index: 2;
  transition: all 100ms;

  &-active {
    visibility: visible;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
    transition: all 300ms;
  }
}
</style>
