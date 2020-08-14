import Axios from 'axios';
import {baseUrl} from '../../utils/pathes';
import {router} from '../../main';
import {removeFalsyValues} from '../../utils/pathes';

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
    modalStatus: null,
    rowsNumber: 0,
    pageLimit: null,
    currentPage: null,
    sortField: null,
    sortDirection: null,
    qRequest: null,
  },
  getters: {
    'GET_PRODUCTS_LIST': state => {
      return state.productsList;
    },
    GET_SELECTED_PRODUCT: state => {
      return state.selectedProduct;
    },
    GET_STATUS: state => {
      return state.status;
    },
    GET_ROWS_COUNT: state => {
      return state.rowsNumber;
    },
    GET_PAGE: state => {
      return state.currentPage;
    },
    GET_LIMITS: state => {
      return state.pageLimit;
    },
    GET_SORT_FIELD: state => {
      return state.sortField;
    },
    GET_SORT_DIRECTION: state => {
      return state.sortDirection;
    },
    GET_Q_REQUEST: state => {
      return state.qRequest;
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
      // console.log('##', 1);
      state.status = {
        loading: true,
        loaded: false,
        rejected: false,
        error: null,
      };
    },
    SET_LOADED: (state) => {
      // console.log('##', 2);

      state.status = {
        loading: false,
        loaded: true,
        rejected: false,
        error: null,
      };
    },
    SET_ERROR: (state, error) => {
      // console.log(3);

      state.status = {
        loading: false,
        loaded: false,
        rejected: true,
        error,
      };
    },
    SET_ROWS_NUMBER: (state, payload) => {
      state.rowsNumber = payload;
    },
    SET_LIMIT: (state, payload) => {
      state.pageLimit = payload;
    },
    SET_PAGE: (state, payload) => {
      state.currentPage = payload;
    },
    SET_SORT_FIELD: (state, payload) => {
      state.sortField = payload;
    },
    SET_SORT_DIRECTION: (state, payload) => {
      state.sortDirection = payload;
    },
    SET_Q_REQUEST: (state, payload) => {
      state.qRequest = payload;
    },
  },
  actions: {
    getProducts: async (context) => {
      context.commit('SET_LOADING');
      try {

        const params = removeFalsyValues({
          offset: ((context.getters.GET_PAGE - 1) * context.getters.GET_LIMITS),
          limit: context.getters.GET_LIMITS,
          sort_field: context.getters.GET_SORT_FIELD,
          sort: context.getters.GET_SORT_DIRECTION,
          q: context.getters.GET_Q_REQUEST
        });

        const {data} = await Axios.get(`${baseUrl}products`, { params });

        context.commit('SAVE_PRODUCTS', data.rows);
        context.commit('SET_ROWS_NUMBER', data.count);
        context.commit('SET_LOADED');
      } catch (e) {
        context.commit('SET_ERROR', e);
      }
    },
    getProduct: async (context, payload) => {
      context.commit('SET_LOADING');

      try {
        const product = await Axios.get(`${baseUrl}products/${payload}`);
        context.commit('SAVE_PRODUCT', product.data);
        context.commit('SET_LOADED');
      } catch (e) {
        context.commit('SET_ERROR', e);
      }
    },
    postProduct: async (context, payload) => {
      context.commit('SET_LOADING');


      try {
        const newProduct = await Axios.post(`${baseUrl}products`, payload);
        context.commit('SET_LOADED');
        await router.push('./');
      } catch (e) {
        context.commit('SET_ERROR', e);
      }
    },
    putProduct: async (context, payload) => {
      context.commit('SET_LOADING');

      try {
        const editedProduct = await Axios.put(`${baseUrl}products/${payload.id}`, payload);
        context.commit('SET_LOADED');
        await router.push('./');
      } catch (e) {
        context.commit('SET_ERROR', e);
      }
    },
    deleteProduct: async (context, payload) => {
      context.commit('SET_LOADING');
      try {
        const productDeleted = await Axios.delete(`${baseUrl}products/${payload}`)
        context.commit('SET_LOADED');
        await router.push('./');
      } catch (e) {
        context.commit('SET_ERROR', e);
      }
    }
  },
};

export default products;
