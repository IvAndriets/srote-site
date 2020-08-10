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
      <b-tbody v-for="product in PRODUCTS"
               :key="product.id">
        <b-tr>
          <b-td>
            <router-link :to="{path:`./${product.id}`}"
                         append>
              {{product.title}}
            </router-link>
          </b-td>
          <b-td>
            {{product.description}}
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
  import ProductsFilter from './components/Filter/ProductsFilter';
  import ProductListActionBar from './components/ProductsAcrionBar/ProductsListActionBar';

  export default {
    name: 'ProductsList',
    data: () => ({
      productsList: [],
    }),
    computed: {
      PRODUCTS: {
        get() {
          return this.$store.getters.GET_PRODUCTS_LIST;
        }
      }
    },
    components: {
      'filter-products': ProductsFilter,
      'product-list-action-bar': ProductListActionBar,
    },
    created() {
      this.$store.dispatch('getProducts');
    },
  };
</script>

<style scoped>

</style>
