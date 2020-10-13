import Vue from 'vue';
import Vuex from 'vuex';
import category from './CategoryStore/Category';
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
    categories: category,
  },
});
