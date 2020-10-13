<template>
  <div>
    <b-container v-if="CARD_STATUS"
                 class="d-inline-flex flex-wrap justify-content-between"
                 style="max-width: 1100px">
      <div v-if="PRODUCTS.length === 0"
           class="alert alert-primary container-fluid">
        No elements exist
      </div>
      <div v-for="product in PRODUCTS"
           v-else
           :key="product.id"
           class="py-1">
        <b-card
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          class="product-card">
          <template v-slot:header>
            <h6>
              <router-link :to="{path:`./${product.id}`}">
                {{ product.title }}
              </router-link>
            </h6>
          </template>
          <b-card-text class="description-height">
            <p>{{ product.description }}</p>
          </b-card-text>
          <template v-slot:footer>
            <div class="d-flex justify-content-end">
                    <span>
                    <b-button @click="showDeleteModal(product.id)">
                      <b-icon icon="trash"></b-icon>
                    </b-button>
                    </span>
            </div>
          </template>
        </b-card>
      </div>
    </b-container>

    <b-container v-else
                 fluid="xs">
      <div v-if="PRODUCTS.length === 0">
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
            <b-th>
              <div class="table-column d-inline-flex"
                   @click="sortColumn('category_id')">
                <span>Category</span>
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
          v-for="product in PRODUCTS"
          :key="product.id"
          class="py-2">
          <b-tr>
            <b-td>
              <router-link :to="{path:`./${product.id}`}"
                           append>
                {{ product.title }}
              </router-link>
            </b-td>
            <b-td>
              {{ product.description }}
            </b-td>
            <b-td>
<!--              {{ CATEGORIES.find(-->
<!--              function category(currentValue) {-->
<!--              console.log(currentValue);-->
<!--              return currentValue === product.category_id;-->
<!--              }) }}-->
            </b-td>
            <b-td>
              <div class="d-flex justify-content-end">
                <b-button @click="showDeleteModal(product.id)">
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
    name: 'TableComponent',
    computed: {
      CARD_STATUS: {
        get() {
          return this.$store.getters.GET_CARD_STYLE;
        }, set(value) {
          this.$store.commit('SET_CARD_STYLE', value);
        },
      },
      PRODUCTS: {
        get() {
          return this.$store.getters.GET_PRODUCTS_LIST;
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
      CATEGORIES: {
        get() {
          return this.$store.getters.GET_CATEGORIES;
        },
      },
    },
    methods: {
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
  .table-column {
    cursor: pointer;
  }

  .product-card {
    width: 240px;
  }

  .description-height {
    max-height: 120px;
  }
</style>
