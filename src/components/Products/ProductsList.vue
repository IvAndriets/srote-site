<template>
  <b-container>
    <filter-products></filter-products>
    <product-list-action-bar></product-list-action-bar>
    <b-table-simple hover
                    outlined>
      <b-thead>
        <b-tr>
          <b-th>Title</b-th>
          <b-th>Description</b-th>
        </b-tr>
      </b-thead>
      <b-tbody v-for="product in SHOW_PRODUCTS"
               :key="product.id">
        <b-tr>
          <b-td>{{product.title}}</b-td>
          <b-td>{{product.description}}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
  import ProductsFilter from './components/Filter/ProductsFilter';
  import ProductListActionBar from './components/ProductsAcrionBar/ProductsListActionBar';
  import ProductDetails from './ProductDetails';

  export default {
    name: 'ProductsList',
    data: () => ({}),
    computed: {
      SHOW_PRODUCTS: {
        get() {
          return this.$store.getters.GET_PRODUCTS_LIST;
        }
      }
    },
    components: {
      'filter-products': ProductsFilter,
      'product-list-action-bar': ProductListActionBar,
      'product-details': ProductDetails,
    },
  };
</script>

<style scoped>

</style>
