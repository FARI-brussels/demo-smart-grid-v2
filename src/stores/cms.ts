import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchDirectus } from 'fari-directus-parser'
import type { Locale } from '@/types'

export const useCMSstore = defineStore('cms', () => {
  const locale = ref<Locale>('en')
  const data = ref<unknown | null>(null)
  const loading = ref(false)
  const error = ref(null)

  async function getData() {
    data.value = await fetchDirectus({ slug: 'smart-grid' })
  }

  const setLocale = (l: Locale) => (l === 'fr-FR' ? (locale.value = 'fr') : (locale.value = l))

  return {
    locale,
    setLocale,
    data,
    loading,
    error,
    getData
  }
})
