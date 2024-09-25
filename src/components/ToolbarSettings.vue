<template>
  <div class="settings">
    <FDropdown
      v-model="settingsOpen"
      location="bottom-left"
      icon="settings"
      class="bg-color-blue mt-l"
      on-dark
      small
    >
      <div class="weather-menu rounded-s">
        <div
          v-for="{ value, label, icon } in scenarios"
          :key="value"
          class="scenario-item rounded-s p-xs"
          :class="{ selected: value === scenario }"
          @click="() => emit('scenario', value)"
        >
          <component :is="icon" />
          <span class="font-weight-black font-size-body"> {{ label[locale] }} </span>
        </div>

        <div class="scenario-item rounded-s p-xs" :class="{ selected: agentsActive }">
          <span class="font-weight-black font-size-body agent-selector"> Agents </span>
          <FSwitch v-model="agentsActive" />
        </div>
      </div>
    </FDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FDropdown, FSwitch } from 'fari-component-library'
import IconSummer from '@/components/icons/IconSummer.vue'
import IconWinter from '@/components/icons/IconWinter.vue'
import IconSpring from '@/components/icons/IconSpring.vue'
import IconAutumn from '@/components/icons/IconAutumn.vue'
import type { Scenario } from '@/types/Scenario.ts'

defineProps<{
  locale: string
  scenario: Scenario
}>()

const emit = defineEmits<{
  (e: 'scenario', value: Scenario): void
}>()

const settingsOpen = ref(false)

const agentsActive = ref(false)

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
.settings {
  margin-left: 2rem;
}

.scenario-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #2f519c;
  transition: all 200ms ease-in-out;
}

.selected {
  background-color: #4393de90;
}

.agent-selector {
  margin-right: auto;
}

:deep() {
  .dropdown-menu {
    width: fit-content;
    height: fit-content;
    .content {
      width: 400px;
      padding: 1rem;
      transition: 400ms ease-in-out;
      overflow: hidden;
      display: flex;
    }
  }
}

.weather-menu {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}
</style>
