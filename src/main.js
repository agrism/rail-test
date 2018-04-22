import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('AppInputModal', require('./components/inputModal').default);
Vue.component('AppPreviewModal', require('./components/previewModal').default);

new Vue({
  el: '#app',
  render: h => h(App)
}).$mount("#app");
