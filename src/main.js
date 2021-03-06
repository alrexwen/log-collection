import Vue from 'vue'
import App from './App.vue'
import {initRouter} from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import '@/mock'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import {initI18n} from '@/utils/i18n'
import bootstrap from '@/bootstrap'
import Print from './plugins/Print'
import 'moment/locale/zh-cn'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import Print from './plugins/Print'
// Vue.use(Print)
const router = initRouter(store.state.setting.asyncRoutes)
const i18n = initI18n('CN', 'US')
Vue.use(Print)
Vue.use(Antd)
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Plugins)
Vue.use(VueAxios,axios)
bootstrap({router, store, i18n, message: Vue.prototype.$message})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')

