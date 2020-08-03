const products = {
  state: {
    productsList: [
      {
        id: 'product-id-1',
        title: 'Product 1 title',
        description: 'Product 1 description',
      }
    ],
  },
  getters: {
    'GET_PRODUCTS_LIST': state => {
      return state.productsList;
    },
  },
  mutations: {
    ADD_NEW_PRODUCT: (state, payload) => {
      state.productsList.push(payload);
    },
  },
  actions: {
    addProduct: (context, payload) => {
      context.commit('ADD_NEW_PRODUCT', payload);
    },
  },
};

export default products;
