import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"

import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router)
app.use(VNetworkGraph)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
