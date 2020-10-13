<template>
  <page-template-component>
    <template v-slot:breadcrumb>
      <delete-modal-c></delete-modal-c>
      something
    </template>

    <template v-slot:header>
      <h3>Categories List</h3>
    </template>

    <template v-slot:filter>
      <CategorysFilter></CategorysFilter>
    </template>

    <template v-slot:toolbar>
      <b-container class="d-flex justify-content-end align-content-center">
        <b-button variant="primary"
                  to="./add"
                  append>
          Create
          <b-icon icon="plus"></b-icon>
        </b-button>
      </b-container>
    </template>

    <template v-slot:paginationInfo>

    </template>

    <template v-slot:body>
      <status-container :status="{STATUS, name:'List'}">
        <template v-slot:rendered>
          <CategorysTable>

          </CategorysTable>
        </template>
      </status-container>
    </template>

    <template v-slot:pagination>
      <b-pagination :value="PAGE || 1"
                    :total-rows="GET_ROWS"
                    :per-page="LIMITS || 5"
                    @change="pageChange">
      </b-pagination>
    </template>


  </page-template-component>
</template>

<script>
  import {removeFalsyValues} from '../../utils/pathes';
  import PageTemplateComponent from '../Shared/PageTemplateComponent';
  import StatusContainer from '../Shared/StatusContainer';
  import DeleteModalC from './components/DeleteCategoryModal/DeleteModalC';
  import CategorysFilter from './components/Filter/CategorysFilter';
  import CategorysTable from './components/Table/CategorysTable';

  export default {
    name: 'CategoriesList',
    components: {DeleteModalC, CategorysFilter, CategorysTable, StatusContainer, PageTemplateComponent},
    computed:{
      STATUS: {
        get() {
          return this.$store.getters.GET_STATUS_C;
        },
      },
      CARD_STYLE:{
        get() {
          return this.$store.getters.GET_CA_CARD_STYLE;
        }, set(value){
          this.$store.commit('SET_CA_CARD_STYLE', value);
        },
      },
      PAGE:{
        get(){
          return this.$store.getters.GET_CA_PAGE;
        }, set(value){
          this.$store.commit('SET_CA_PAGE',value);
        },
      },
      SORT_FIELD :{
        get(){
          return this.$store.getters.GET_CA_SORT_FIELD;
        }, set(value){
          this.$store.commit('SET_CA_SORT_FIELD', value);
        },
      },
      SORT_DIRECTION :{
        get(){
          return this.$store.getters.GET_CA_SORT_DIRECTION;
        }, set(value){
          this.$store.commit('SET_CA_SORT_DIRECTION', value);
        },
      },
      LIMITS:{
        get(){
          return this.$store.getters.GET_CA_LIMITS;
        }, set(value){
          this.$store.commit('SET_CA_LIMITS', value);
        },
      },
      SEARCH_REQUEST:{
        get(){
          return this.$store.getters.GET_CA_REQUEST;
        }, set(value){
          this.$store.commit('SET_CA_REQUEST', value);
        },
      },
      GET_ROWS:{
        get(){
          return this.$store.getters.GET_ROWS;
        }, set(value){
          this.$store.commit('SET_ROWS', value);
        },
      },
    },
    watch:{
      $route(to) {
        this.execute(to.query);
      },
    },
    created() {
      this.execute(this.$route.query);
    },
    methods:{
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

        this.$store.dispatch('getCategories');
        return query;
      },
    },
  };
</script>

<style scoped>

</style>
