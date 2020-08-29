import Axios from 'axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import {routes} from './router';
import store from './store';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueAxios from 'vue-axios';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, Axios);

Vue.config.productionTip = false;

export const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
