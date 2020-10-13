<template>
  <div>
    <b-container fluid="xs">
      <div v-if="CATEGORIES.length === 0">
        <div class="alert alert-primary">
          No elements exist
        </div>
      </div>
      <b-table-simple v-else
                      hover
                      outlined>
        <b-thead>
          <b-tr>
            <b-th>
              <div class="table-column d-inline-flex"
                   @click="sortColumn('name')">
                <span>Name</span>
                <span v-if="SORT_FIELD === 'name'">
                <b-icon v-if="SORT_DIRECTION === 'asc'"
                        icon="arrow-up"></b-icon>
                <b-icon v-else
                        icon="arrow-down"></b-icon>
              </span>
              </div>
            </b-th>
            <b-th>
              <div class="table-column d-inline-flex"
                   @click="sortColumn('description')">
                <span>Description</span>
                <span v-if="SORT_FIELD === 'description'">
                <b-icon v-if="SORT_DIRECTION === 'asc'"
                        icon="arrow-up"></b-icon>
                <b-icon v-else
                        icon="arrow-down"></b-icon>
              </span>
              </div>
            </b-th>
            <b-th></b-th>
          </b-tr>
        </b-thead>

        <b-tbody
          v-for="category in CATEGORIES"
          :key="category.id"
          class="py-2">
          <b-tr>
            <b-td>
              <router-link :to="{path:`./${category.id}`}"
                           append>
                {{ category.name }}
              </router-link>
            </b-td>
            <b-td>
              {{ category.description }}
            </b-td>
            <b-td>
              <div class="d-flex justify-content-end">
                <b-button @click="showDeleteModal(category.id)">
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </div>
            </b-td>
          </b-tr>

        </b-tbody>
      </b-table-simple>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'CategorysTable',
    computed:{
      CATEGORIES:{
        get(){
          return this.$store.getters.GET_CATEGORIES;
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
      DELETE_ID: {
        get() {
          return this.$store.getters.GET_DELETE_CA;
        }, set(value) {
          this.$store.commit('SET_DELETE_CA', value);
        },
      },
      MODAL_STATE: {
        get() {
          return this.$store.getters.GET_CA_MODAL_STATE;
        }, set(value) {
          this.$store.commit('SET_CA_MODAL_STATE', value);
        },
      },
    },
    methods:{
      showDeleteModal(productId) {
        this.DELETE_ID = productId;
        this.MODAL_STATE = true;
      },
      sortColumn(column) {
        this.$router.push({
          query: {
            ...this.$route.query,
            sortField: column,
            sort: this.SORT_DIRECTION === 'asc' ? 'desc' : 'asc',
          },
        }).catch(() => {
        });
      },
    },
  };
</script>

<style scoped>

</style>
