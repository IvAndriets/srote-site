// import Axios from 'axios';
// import {baseUrl} from '../../utils/pathes';
// import {removeFalsyValues} from '../../utils/pathes';


import Axios from 'axios';
import {router} from '../../main';
import {baseUrl, removeFalsyValues} from '../../utils/pathes';

const category = {
  state:{
    categories: [],
    selectedCategory: null,
    statusC: {
      loading: false,
      loaded: false,
      rejected: false,
      error: null,
    },
    searchCaRequest:null,
    cardCaStyle: false,
    rowsNumCa:0,
    pageLimitCa: null,
    currentPageCa:null,
    sortFieldCa: null,
    sortDirectionCa: null,
    searchRequestCa: null,
    deleteCaModal: null,
    caModalState: false,
  },
  getters:{
    GET_CATEGORIES: state => {
      return state.categories;
    },
    GET_SELECTED_CATEGORY: state => {
      return state.selectedCategory;
    },
    GET_STATUS_C: state => {
      return state.statusC;
    },
    GET_CA_REQUEST:state => {
      return state.searchCaRequest;
    },
    GET_CA_CARD_STYLE: state =>{
      return state.cardCaStyle;
    },
    GET_CA_SORT_FIELD: state =>{
      return state.sortFieldCa;
    },
    GET_CA_SORT_DIRECTION: state =>{
      return state.sortDirectionCa;
    },
    GET_DELETE_CA: state => {
      return state.deleteCaModal;
    },
    GET_CA_MODAL_STATE: state => {
      return state.caModalState;
    },
    GET_CA_LIMITS: state => {
      return state.pageLimitCa;
    },
    GET_CA_PAGE: state =>{
      return state.currentPageCa;
    },
    GET_ROWS: state => {
      return state.rowsNumCa;
    },
  },
  mutations:{
    SAVE_CATEGORIES: (state, payload) => {
      state.categories = payload;
    },
    SAVE_CATEGORY: (state, payload) => {
      state.selectedCategory = payload;
    },
    SET_LOADING_C: (state) => {
      state.statusC = {
        loading: true,
        loaded: false,
        rejected: false,
        error: null,
      };
    },
    SET_LOADED_C: (state) => {
      state.statusC = {
        loading: false,
        loaded: true,
        rejected: false,
        error: null,
      };
    },
    SET_ERROR_C: (state, error) => {
      state.statusC = {
        loading: false,
        loaded: false,
        rejected: true,
        error,
      };
    },
    SET_CA_REQUEST: (state, payload) => {
      state.searchCaRequest = payload;
    },
    SET_CA_CARD_STYLE: (state, payload) =>{
      state.cardCaStyle = payload;
    },
    SET_CA_SORT_FIELD: (state, payload) => {
      state.sortFieldCa = payload;
    },
    SET_CA_SORT_DIRECTION: (state, payload) => {
      state.sortDirectionCa = payload;
    },
    SET_DELETE_CA: (state, payload) => {
      state.deleteCaModal = payload;
    },
    SET_CA_MODAL_STATE: (state, payload) => {
      state.caModalState = payload;
    },
    SET_CA_LIMITS: (state, payload) => {
      state.pageLimitCa = payload;
    },
    SET_CA_PAGE: (state, payload) => {
      state.currentPageCa = payload;
    },
    SET_ROWS: (state, payload) => {
      state.rowsNumCa = payload;
    },
  },
  actions:{
    getCategories: async (context) => {
      context.commit('SET_LOADING_C');
      try {
        const params = removeFalsyValues({
          offset: ((context.getters.GET_CA_PAGE - 1) * (context.getters.GET_CA_LIMITS || 5)),
          limit: context.getters.GET_LIMITS,
          sort_field: context.getters.GET_CA_SORT_FIELD,
          sort: context.getters.GET_CA_SORT_DIRECTION,
          q: context.getters.GET_CA_REQUEST,
        });

        const {data} = await Axios.get(`${baseUrl}categories`, {params});

        context.commit('SAVE_CATEGORIES', data.rows);
        context.commit('SET_ROWS', data.count);

        context.commit('SET_LOADED_C');
      } catch (e) {
        context.commit('SET_ERROR_C', e);
      }
    },
    getCategory: async (context, payload) => {
      context.commit('SET_LOADING_C');

      try {
        const category = await Axios.get(`${baseUrl}categories/${payload}`);
        context.commit('SAVE_CATEGORY', category.data);

        context.commit('SET_LOADED_C');
      } catch (e) {
        context.commit('SET_ERROR_C', e);

      }
    },
    postCategory: async (context, payload) => {
      context.commit('SET_LOADING_C');
      try {
        await Axios.post(`${baseUrl}categories`, payload);
        context.commit('SET_LOADED_C');
        await router.push('./');
      } catch (e) {
        context.commit('SET_ERROR_C', e);
      }
    },
    putCategory: async (context, payload) => {
      context.commit('SET_LOADING_C');

      try {
        await Axios.put(`${baseUrl}categories/${payload.id}`, payload);
        context.commit('SET_LOADED_C');
        await router.push('./');
      } catch (e) {
        context.commit('SET_ERROR_C', e);
      }
    },
    deleteCategory: async (context, payload) => {
      context.commit('SET_LOADING_C');
      try {
        await Axios.delete(`${baseUrl}categories/${payload}`);
        context.commit('SET_LOADED_C');
        context.dispatch('getCategories');

      } catch (e) {
        context.commit('SET_ERROR_C', e);
      }
    },
  },
};

export default category;
