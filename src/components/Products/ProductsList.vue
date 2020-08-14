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
      <product-list-action-bar class="pt-1 pb-1"></product-list-action-bar>
    </template>

    <template v-slot:body>
      <b-table-simple hover
                      outlined>
        <b-thead>
          <b-tr>
            <b-th>
              <div class="table-column d-inline-flex"
                   @click="sortColumn('title')">
                <span>Title</span>
                <span v-if="SORT_FIELD === 'title'">
                <b-icon v-if="SORT_DIRECTION === 'asc'"
                        icon="arrow-up"></b-icon>
                <b-icon v-else
                        icon="arrow-down"></b-icon>
              </span>
              </div>
            </b-th>
            <b-th @click="sortColumn('description')"
                  class="table-column">
              Description
              <span v-if="SORT_FIELD === 'description'">
                <b-icon v-if="SORT_DIRECTION === 'asc'"
                        icon="arrow-up"></b-icon>
                <b-icon v-else
                        icon="arrow-down"></b-icon>
              </span>
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
      <b-pagination :value="PAGE || 1"
                    :total-rows="GET_ROWS_COUNT"
                    :per-page="LIMITS || 5"
                    v-on:change="pageChange">
      </b-pagination>
    </template>

  </page-declarator-component>

</template>

<script>
  import PageDeclaratorComponent from '../PageDeclaratorComponent';
  import ProductsFilter from './components/Filter/ProductsFilter';
  import ProductListActionBar from './components/ProductsAcrionBar/ProductsListActionBar';
  import {removeFalsyValues} from '../../utils/pathes';

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
      GET_ROWS_COUNT: {
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
        },
        Q_REQUEST: {
          get() {
            return this.$store.getters.GET_Q_REQUEST;
          }
        }
      }
    },
    components: {
      PageDeclaratorComponent,
      'filter-products': ProductsFilter,
      'product-list-action-bar': ProductListActionBar,
    },
    mounted() {
      const page = this.$route.query.page;

      this.PAGE = page;
      this.Q_REQUEST = this.$route.query.q;
      this.SORT_FIELD = this.$route.query.sortField;
      this.SORT_DIRECTION = this.$route.query.sort;
      this.$store.commit('SET_LIMIT', this.$route.query.limit ? +this.$route.query.limit : null);

      setTimeout(() => {
        this.PAGE = page;
      }, 500);

      this.$store.dispatch('getProducts');
    },
    methods: {
      pageChange(page) {
        this.PAGE = page;

        this.$store.dispatch('getProducts');

        const queryValues = removeFalsyValues({
          page: this.PAGE,
          limit: this.LIMITS,
          sortField: this.SORT_FIELD,
          sort: this.SORT_DIRECTION,
          q: this.Q_REQUEST,
        });

        this.$router.replace({query: {...queryValues}}).catch(() => {
        });
      },
      sortColumn(column) {
        this.SORT_FIELD = column;

        this.SORT_DIRECTION = this.SORT_DIRECTION === 'asc' ? 'desc' : 'asc';

        this.pageChange(this.PAGE);
      },

    },
    watch: {
      LIMITS(newValue) {
        if (newValue && newValue !== (this.$route.query.limit ? +this.$route.query.limit : null)) {
          this.PAGE = 1;
          this.pageChange(this.PAGE);
        }
      },
      Q_REQUEST(newValue) {
        if (newValue !== this.$route.query.q) {
          this.PAGE = 1;
          this.pageChange(this.PAGE);
        }
      }
    },
  };
</script>

<style scoped>
  .table-column {
    cursor: pointer;
  }
</style>
