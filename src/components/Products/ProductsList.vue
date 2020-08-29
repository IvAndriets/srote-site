<template>
  <page-declarator-component>
    <template v-slot:breadcrumb>
      something
    </template>

    <template v-slot:header>
      <h3>Products List</h3>
    </template>

    <template v-slot:filter>
      <delete-modal></delete-modal>
      <filter-products></filter-products>
    </template>

    <template v-slot:toolbar>
      <b-container class="d-flex justify-content-end align-content-center">
        <span class="pr-1">
          <b-button :disabled="!CARD_STATUS"
                    @click="changePageStyle">
            <b-icon icon="list"></b-icon>
          </b-button>
        </span>
        <span class="pr-1">
        <b-button :disabled="CARD_STATUS"
                  @click="changePageStyle">
          <b-icon icon="grid3x3-gap"></b-icon>
        </b-button>
        </span>
        <b-button variant="primary"
                  to="./add"
                  append>
          Create
          <b-icon icon="plus"></b-icon>
        </b-button>
      </b-container>
    </template>

    <template v-slot:paginationInfo>
      <product-list-action-bar></product-list-action-bar>
    </template>


    <template v-slot:body>
      <status-container :status="{STATUS, name:'List'}">
        <template v-slot:rendered>
          <TableComponent>

          </TableComponent>
        </template>
      </status-container>
    </template>

    <template v-slot:pagination>
      <b-pagination :value="PAGE || 1"
                    :total-rows="GET_ROWS_COUNT"
                    :per-page="LIMITS || 5"
                    @change="pageChange">
      </b-pagination>
    </template>

  </page-declarator-component>

</template>

<script>
  import PageDeclaratorComponent from '../Shared/PageTemplateComponent';
  import StatusContainer from '../Shared/StatusContainer';
  import ProductsFilter from './components/Filter/ProductsFilter';
  import ProductListActionBar from './components/ProductsAcrionBar/ProductsListActionBar';
  import {removeFalsyValues} from '../../utils/pathes';
  import DeleteModal from './components/DeleteProductModal/DeleteModal';
  import TableComponent from './components/Table/TableComponent';


  export default {
    name: 'ProductsList',
    components: {
      TableComponent,
      StatusContainer,
      PageDeclaratorComponent,
      'filter-products': ProductsFilter,
      'product-list-action-bar': ProductListActionBar,
      'delete-modal': DeleteModal,
    },
    data: () => ({
      productsList: [],
      totalRows: 0,
      items:[],
    }),
    computed: {
      PRODUCTS: {
        get() {
          return this.$store.getters.GET_PRODUCTS_LIST;
        },
      },
      GET_ROWS_COUNT: {
        get() {
          return this.$store.getters.GET_ROWS_COUNT;
        },
      },
      STATUS: {
        get() {
          return this.$store.getters.GET_STATUS;
        },
      },
      PAGE: {
        get() {
          return this.$store.getters.GET_PAGE;
        }, set(value) {
          this.$store.commit('SET_PAGE', value);
        },
      },
      LIMITS: {
        get() {
          return this.$store.getters.GET_LIMITS;
        }, set(value) {
          this.$store.commit('SET_LIMIT', value);
        },
      },
      SORT_FIELD: {
        get() {
          return this.$store.getters.GET_SORT_FIELD;
        }, set(payload) {
          this.$store.commit('SET_SORT_FIELD', payload);
        },
      },
      SORT_DIRECTION: {
        get() {
          return this.$store.getters.GET_SORT_DIRECTION;
        }, set(payload) {
          this.$store.commit('SET_SORT_DIRECTION', payload);
        },
      },
      SEARCH_REQUEST: {
        get() {
          return this.$store.getters.GET_SEARCH_REQUEST;
        }, set(value) {
          this.$store.commit('SET_SEARCH_REQUEST', value);
        },
      },
      DELETE_ID: {
        get() {
          return this.$store.getters.GET_DELETE_PRODUCT;
        }, set(value) {
          this.$store.commit('SET_DELETE_PRODUCT', value);
        },
      },
      MODAL_STATE: {
        get() {
          return this.$store.getters.GET_MODAL_STATE;
        }, set(value) {
          this.$store.commit('SET_MODAL_STATE', value);
        },
      },
      CARD_STATUS: {
        get() {
          return this.$store.getters.GET_CARD_STYLE;
        }, set(value) {
          this.$store.commit('SET_CARD_STYLE', value);
        },
      },
    },
    watch: {
      LIMITS(newValue) {
        if (newValue && newValue !== (this.$route.query.limit ? +this.$route.query.limit : null)) {
          this.$router.push({query: {...this.$route.query, page: '1', limit: newValue}}).catch(() => {
          });
        }
      },
      $route(to) {
        this.execute(to.query);
      },
    },
    mounted() {
      const query = this.execute(this.$route.query);

      setTimeout(() => {
        this.PAGE = query.page ? `${query.page}` : 1;
      }, 500);
    },
    methods: {
      pageChange(page) {
        this.$router.push({query: {...this.$route.query, page}}).catch(() => {
        });
      },
      execute(queryParams) {
        const query = removeFalsyValues({
          page: queryParams.page ? +queryParams.page : null,
          limit: queryParams.limit ? +queryParams.limit : null,
          sortField: queryParams.sortField,
          sort: queryParams.sort,
          q: queryParams.q,
        });

        this.PAGE = query.page;
        this.SEARCH_REQUEST = query.q;
        this.SORT_FIELD = query.sortField;
        this.SORT_DIRECTION = query.sort;
        this.LIMITS = query.limit ? +query.limit : null;

        this.$store.dispatch('getProducts');

        return query;
      },

      changePageStyle() {
        this.CARD_STATUS = !this.CARD_STATUS;
      },
    },
  };
</script>

<style scoped>

</style>
