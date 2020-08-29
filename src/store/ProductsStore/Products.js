import Axios from 'axios';
import {baseUrl} from '../../utils/pathes';
import {router} from '../../main';
import {removeFalsyValues} from '../../utils/pathes';

// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

const products = {
  state: {
    productsList: [],
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
    searchRequest: null,
    deleteProductModal: null,
    modalState: false,
    cardStyle: false,
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
    GET_SEARCH_REQUEST: state => {
      return state.searchRequest;
    },
    GET_DELETE_PRODUCT: state => {
      return state.deleteProductModal;
    },
    GET_MODAL_STATE: state => {
      return state.modalState;
    },
    GET_CARD_STYLE: state =>{
      return state.cardStyle;
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
    SET_SEARCH_REQUEST: (state, payload) => {
      state.searchRequest = payload;
    },
    SET_DELETE_PRODUCT: (state, payload) => {
      state.deleteProductModal = payload;
    },
    SET_MODAL_STATE: (state, payload) => {
      state.modalState = payload;
    },
    SET_CARD_STYLE: (state, payload) => {
      state.cardStyle = payload;
    },
  },
  actions: {
    getProducts: async (context) => {
      context.commit('SET_LOADING');
      try {

        const params = removeFalsyValues({
          offset: ((context.getters.GET_PAGE - 1) * (context.getters.GET_LIMITS || 5)),
          limit: context.getters.GET_LIMITS,
          sort_field: context.getters.GET_SORT_FIELD,
          sort: context.getters.GET_SORT_DIRECTION,
          q: context.getters.GET_SEARCH_REQUEST,
        });

        const {data} = await Axios.get(`${baseUrl}products`, {params});

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
        await Axios.post(`${baseUrl}products`, payload);
        context.commit('SET_LOADED');
        await router.push('./');
      } catch (e) {
        context.commit('SET_ERROR', e);
      }
    },
    putProduct: async (context, payload) => {
      context.commit('SET_LOADING');

      try {
        await Axios.put(`${baseUrl}products/${payload.id}`, payload);
        context.commit('SET_LOADED');
        await router.push('./');
      } catch (e) {
        context.commit('SET_ERROR', e);
      }
    },
    deleteProduct: async (context, payload) => {
      context.commit('SET_LOADING');
      try {
        await Axios.delete(`${baseUrl}products/${payload}`);
        context.commit('SET_LOADED');
        context.dispatch('getProducts');
      } catch (e) {
        context.commit('SET_ERROR', e);
      }
    },
  },
};

export default products;
