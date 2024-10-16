import { defineStore } from 'pinia'
import { parseData } from './parser'
const strapiURL = import.meta.env.VITE_API_URL

type Locale = 'en' | 'fr-FR' | 'nl'

interface Data {
  logo: string
  research_head: string
  research_lead: string
  explanation_short: {
    en: string
    nl: string
    'fr-FR': string
  }
}

interface State {
  data: Data
  locale: Locale
  loading: boolean
  error: unknown
}

export const useDataStore = defineStore('data', {
  state: () =>
    ({
      locale: 'en',
      data: {
        logo: '',
        research_head: '',
        research_lead: '',
        explanation_short: {
          en: '',
          'fr-FR': '',
          nl: ''
        }
      },
      loading: false,
      error: null
    }) as State,
  actions: {
    async getData() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/demos/25?populate=*`)
        const airLogo = await fetch(`${strapiURL}/uploads/air_a5e1c08136.svg`)
        const logo = await airLogo.text()

        const { data } = await response.json()

        const parsed = parseData(data)

        if (!response.ok) throw new Error('Network response was not ok')

        this.data = parsed
        this.data.logo = logo
      } catch (error) {
        this.error = 'Error fetching data'
      } finally {
        this.loading = false
      }
    },

    setLocale(locale: Locale): any {
      this.locale = locale
    }
  }
})
