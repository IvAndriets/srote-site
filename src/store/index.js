import Vue from 'vue'
import Vuex from 'vuex'

import fromProducts from './ProductsStore/Products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products: fromProducts,
  }
})
