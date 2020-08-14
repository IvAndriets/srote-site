<template>
  <b-container class="d-flex justify-content-end">
    <b-input placeholder="Search"
             class="search-field"
             v-model="searchValue"></b-input>
    <b-button @click="search" class="pl-2">Search</b-button>
  </b-container>
</template>

<script>
  export default {
    name: 'ProductsFilter',
    data: () => ({
      searchValue: '',
    }),
    computed: {
      Q_REQUEST: {
        get() {
          return this.$store.getters.GET_Q_REQUEST;
        }, set(request) {
          this.$store.commit('SET_Q_REQUEST', request)
        }
      },
    },
    methods: {
      search() {
        console.log(this.searchValue);
        this.Q_REQUEST = this.searchValue;
      }
    },
  };
</script>

<style scoped>
  .search-field {
    width: 200px;
  }
</style>
