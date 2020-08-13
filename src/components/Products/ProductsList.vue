<template>
  <page-declarator-component>
    <template v-slot:header><h3>Products List</h3></template>

    <template v-slot:filter>
      <filter-products></filter-products>
    </template>

    <template v-slot:toolbar>
      <b-container class="d-flex justify-content-end">
        <b-button variant="primary"
                  to="./add" append>
          Create
          <b-icon icon="plus"></b-icon>
        </b-button>
      </b-container>
    </template>

    <template v-slot:paginationInfo>
      <product-list-action-bar></product-list-action-bar>
    </template>

    <template v-slot:body>
      <b-table-simple hover
                      outlined>
        <b-thead>
          <b-tr>
            <b-th @click="sortColumn('title')"
                  class="">Title
              <div v-if="SORT_FIELD === 'title'"
                   @click="sortDirection">
                <b-icon v-if="SORT_DIRECTION === 'asc'"
                        icon="arrow-up"></b-icon>
                <b-icon v-else
                        icon="arrow-down"></b-icon>
              </div>
            </b-th>
            <b-th @click="sortColumn('description')"
                  class="">Description
              <div v-if="SORT_FIELD === 'description'"
                   @click="sortDirection">
                <b-icon v-if="SORT_DIRECTION === 'asc'"
                        icon="arrow-up"></b-icon>
                <b-icon v-else
                        icon="arrow-down"></b-icon>
              </div>
            </b-th>
            <b-th></b-th>
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
            <b-td class="d-flex justify-content-end">
              <b-button variant="danger">Delete</b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </template>

    <template v-slot:pagination>
      <b-pagination :value="PAGE"
                    :total-rows="ROWS"
                    :per-page="LIMITS"
                    v-on:change="pageChange">
      </b-pagination>
    </template>

  </page-declarator-component>

</template>

<script>
  import PageDeclaratorComponent from '../PageDeclaratorComponent';
  import ProductsFilter from './components/Filter/ProductsFilter';
  import ProductListActionBar from './components/ProductsAcrionBar/ProductsListActionBar';

  export default {
    name: 'ProductsList',
    data: () => ({
      productsList: [],
      totalRows: 0,
    }),
    computed: {
      PRODUCTS: {
        get() {
          return this.$store.getters.GET_PRODUCTS_LIST;
        }
      },
      ROWS: {
        get() {
          return this.$store.getters.GET_ROWS_COUNT;
        }
      },
      STATUS: {
        get() {
          return this.$store.getters.GET_STATUS;
        }
      },
      PAGE: {
        get() {
          return this.$store.getters.GET_PAGE;
        }, set(value) {
          this.$store.commit('SET_PAGE', value);
        }
      },
      LIMITS: {
        get() {
          return this.$store.getters.GET_LIMITS;
        },
      },
      // SORT_ARROWS: {
      //   get() {
      //     return this.$store.getters.GET_SORT_ARROWS;
      //   }
      // },
      SORT_FIELD: {
        get() {
          return this.$store.getters.GET_SORT_FIELD;
        }, set(payload) {
          this.$store.commit('SET_SORT_FIELD', payload)
        }
      },
      SORT_DIRECTION: {
        get() {
          return this.$store.getters.GET_SORT_DIRECTION;
        }, set(payload) {
          this.$store.commit('SET_SORT_DIRECTION', payload)
        }
      }
    },
    components: {
      PageDeclaratorComponent,
      'filter-products': ProductsFilter,
      'product-list-action-bar': ProductListActionBar,
    },
    created() {

    },
    mounted() {
      const page = +this.$route.query.page || 1;
      this.SORT_FIELD = this.$route.query.sortField || '';
      this.SORT_DIRECTION = this.$route.query.sort || '';
      this.$store.commit('SET_LIMIT', +this.$route.query.limit);

      setTimeout(() => {
        this.PAGE = page;
      }, 500);

      this.$store.dispatch('getProducts', {offset: ((page - 1) * this.LIMITS), limit: this.LIMITS});
    },
    methods: {
      pageChange(page) {
        this.$store.dispatch('getProducts', {offset: ((page - 1) * this.LIMITS), limit: this.LIMITS});
        this.$router.replace({query: {page: page, limit: this.LIMITS}}).catch(() => {
        });
      },
      sortColumn(column) {
        if (this.SORT_FIELD !== column) {
          this.SORT_FIELD = column;
          this.SORT_DIRECTION = 'asc';
          this.$store.dispatch('getProducts', {offset: null, limit: null});
          this.$router.replace({
            query: {
              page: this.PAGE,
              limit: this.LIMITS,
              sortField: this.SORT_FIELD,
              sort: this.SORT_DIRECTION
            }
          }).catch(() => {
          })
        }
      },
      sortDirection() {
        if (this.SORT_DIRECTION === 'asc') {
          this.SORT_DIRECTION = 'desc';
          this.$store.dispatch('getProducts', {offset: 0, limit: this.LIMITS});
          this.$router.replace({
            query: {
              page: this.PAGE,
              limit: this.LIMITS,
              sortField: this.SORT_FIELD,
              sort: this.SORT_DIRECTION
            }
          }).catch(() => {
          })

        } else {
          this.SORT_DIRECTION = 'asc';
          this.$store.dispatch('getProducts', {offset: 0, limit: this.LIMITS});
          this.$router.replace({
            query: {
              page: this.PAGE,
              limit: this.LIMITS,
              sortField: this.SORT_FIELD,
              sort: this.SORT_DIRECTION
            }
          }).catch(() => {
          })
        }
      }
    },
    watch: {
      LIMITS(newValue) {
        if (newValue !== +this.$route.query.limit) {
          this.PAGE = 1;
          this.pageChange(this.PAGE);
        }
      }
    },
  };
</script>

<style scoped>

</style>
