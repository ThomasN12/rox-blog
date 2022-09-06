import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.config.productionTip = false
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from "./router";
import store from "./store";
import Gravatar from 'vue-gravatar';
import VueI18n from 'vue-i18n';
import Paginate from 'vuejs-paginate';
import Toasted from 'vue-toasted';
import VuePluralize from 'vue-pluralize';
import VueTimeago from 'vue-timeago'

Vue.use(VuePluralize)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueI18n)
Vue.use(Toasted, {
  position: 'top-right',
  type: "success",
  duration: 3000,
  dismissible: true
})

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  // locales: {
  //   'zh-CN': require('date-fns/locale/zh_cn'),
  //   ja: require('date-fns/locale/ja')
  // }
})

Vue.component('v-gravatar', Gravatar);
Vue.component('paginate-component', Paginate)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
