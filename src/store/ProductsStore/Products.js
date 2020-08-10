import Axios from 'axios';
import {baseUrl} from '../../utils/pathes';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const products = {
  state: {
    productsList: [
      {
        id: 'product-id-1',
        title: 'Product 1 title',
        description: 'Product 1 description',
      },
    ],
    selectedProduct: null,
    status: {
      loading: false,
      loaded: false,
      rejected: false,
      error: null,
    },
  },
  getters: {
    'GET_PRODUCTS_LIST': state => {
      return state.productsList;
    },
    GET_PRODUCT_BY_ID: (state) => (id) => {
      return state.productsList.find(p => p.id === id);
    },
    GET_SELECTED_PRODUCT: state =>{
      return state.selectedProduct;
    },
    GET_STATUS: state =>{
      return state.status;
    },
  },
  mutations: {
    SAVE_PRODUCTS: (state, payload) => {
      state.productsList = payload;
    },
    SAVE_PRODUCT: (state, payload) => {
      state.selectedProduct = payload;
    },
    SET_LOADING: (state) => {
      state.status = {
        loading: true,
        loaded: false,
        rejected: false,
        error: null,
      };
    },
    SET_LOADED: (state) => {
      state.status = {
        loading: false,
        loaded: true,
        rejected: false,
        error: null,
      };
    },
    SET_ERROR: (state, error) => {
      state.status = {
        loading: false,
        loaded: false,
        rejected: true,
        error,
      };
    },
  },
  actions: {
    getProducts: async (context) =>{
      try {
        const { data } = await Axios.get(baseUrl);
        context.commit('SAVE_PRODUCTS', data.rows);
      } catch (e) {
        console.error(e);
      }
    },
    getProduct: async (context, payload) => {
      context.commit('SET_LOADING');
      try {
        const product = await Axios.get(baseUrl +'/'+ payload);
        context.commit('SAVE_PRODUCT', product.data);
      } catch (e) {
        console.log('error', e);
        context.commit('SET_ERROR', e);
      }
      context.commit('SET_LOADED');
    },
    postProduct:  async (context,payload) => {
      context.commit('SET_LOADING');
      try {
        // console.log(payload);
        // await timeout(10000);

        const newProduct = await Axios.post(baseUrl, payload);
        // console.log(newProduct);
        context.commit('SET_LOADED');
      } catch (e) {
        // console.error(e);
        // await timeout(10000);

        context.commit('SET_ERROR', e);
      }
    },
    putProduct: payload=> {
      Axios.put(baseUrl + payload.id, payload)
    },
    deleteProduct: payload => {
      Axios.delete(baseUrl + payload)
    }
  },
};

export default products;
