import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '../theme/index.css'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../element-variables.scss'
import '../node_modules/element-ui/lib/theme-chalk/reset.css'
import { Button, Select } from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import 'lib-flexible/flexible'
import echarts from 'echarts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import './mock'

Vue.use(ElementUI, { locale })
// Vue.component(Button.name, Button)
// Vue.component(Select.name, Select)
Vue.use(Button)
Vue.use(Select)
Vue.prototype.$echarts = echarts
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
