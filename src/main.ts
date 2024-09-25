import './assets/main.scss'
import 'fari-component-library/style'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { TroisJSVuePlugin } from 'troisjs'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TroisJSVuePlugin)

app.mount('#app')
