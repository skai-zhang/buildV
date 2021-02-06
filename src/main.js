import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import router from './plugins/router'

Vue.config.productionTip = false

Vue.use(VueCodeMirror)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
