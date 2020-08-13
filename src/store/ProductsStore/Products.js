import Axios from 'axios';
import stringifyRecordValues from 'bootstrap-vue/esm/components/table/helpers/stringify-record-values';
import {baseUrl} from '../../utils/pathes';
import {router} from '../../main';

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
    pageLimit: 5,
    currentPage: 1,
    sortArrows: {
      titleArrow: false,
      descriptionArrow: false,
    },
    sortField: 'title',
    sortDirection: 'aesc',
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
      return state.pageLimit || 5;
    },
    GET_SORT_ARROWS: state => {
      return state.sortArrows;
    },
    GET_SORT_FIELD: state => {
      return state.sortField;
    },
    GET_SORT_DIRECTION: state => {
      return state.sortDirection;
    }
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
      state.currentPage = payload
    },
    SET_TITLE_ARROW: (state, payload) => {
      state.sortArrows = {
        titleArrow: payload.value,
        descriptionArrow: false,
      };
      state.sortField = 'title';
      state.sortDirection = payload.direction
    },
    SET_DESCRIPTION_ARROW: (state, payload) => {
      state.sortArrows = {
        titleArrow: false,
        descriptionArrow: payload.value,
      };
      state.sortField = 'description';
      state.sortDirection = payload.direction
    },
    SET_SORT_FIELD: (state, payload) => {
      state.sortField = payload;
    },
    SET_SORT_DIRECTION: (state, payload) =>{
      state.sortDirection = payload;
    }
  },
  actions: {
    getProducts: async (context, payload) => {
      context.commit('SET_LOADING');
      try {
        const {data} = await Axios.get(`${baseUrl}products?offset=${payload.offset}&limit=${payload.limit}&sort_field=${context.state.sortField}&sort=${context.state.sortDirection}`);
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
