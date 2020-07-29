import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Menu from '@/components/MenuComponent/Menu';
import Filter from '@/components/FilterComponent/Filter';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';



Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component('SideBarMenu', Menu);
Vue.component('filter-atr', Filter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');
