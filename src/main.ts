import './assets/main.scss'
import 'fari-component-library/style'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import { TroisJSVuePlugin } from 'troisjs'

const app = createApp(App)

app.use(createPinia())

app.use(TroisJSVuePlugin)

app.mount('#app')
