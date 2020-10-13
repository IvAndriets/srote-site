<template>
  <div class="d-flex justify-content-end">
  <span>
    <b-input-group size="md">
      <b-form-input v-model="value"
                    placeholder="Search"
                    class="search-field"
                    @keyup.enter="search">
        </b-form-input>
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
    </b-input-group>
  </span>
  </div>
</template>

<script>
  import {removeFalsyValues} from '../../../../utils/pathes';

  export default {
    name: 'CategorysFilter',
    data: () => ({
      value: '',
    }),
    computed: {
      SEARCH_REQUEST: {
        get() {
          return this.$store.getters.GET_CA_REQUEST;
        }, set(request) {
          this.$store.commit('SET_CA_REQUEST', request);
        },
      },
    },
    mounted() {
      this.value = this.$route.query.q ? JSON.parse(this.$route.query.q).name['$iLike'].replace(/%/g, '') : '';
    },
    methods: {
      search() {
        const v = this.value ? JSON.stringify({name: {'$iLike': `%${this.value}%`}}) : '';
        this.SEARCH_REQUEST = v;
        if (v) {
          this.$router.push({query: {...this.$route.query, q: v}}).catch(() => {
          });
        } else {
          const queryParams = this.$route.query;
          const query = removeFalsyValues({
            page: queryParams.page ? +queryParams.page : null,
            limit: queryParams.limit ? +queryParams.limit : null,
            sortField: queryParams.sortField,
            sort: queryParams.sort,
          });

          this.$router.push({query: {...query}}).catch(() => {
          });
        }
      },
    },
  };
</script>

<style scoped>

</style>
