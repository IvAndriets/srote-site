<template>
  <b-container>

    <status-container v-bind:status="{STATUS, name:'notList'}">
      <template v-slot:rendered>
        <b-container fluid="sm" v-if="isNewProduct" class="py-2">

          <b-card>
            <template v-slot:header>
              <h3>New Product</h3>
            </template>

            <b-card-body>
              <b-form-group label="Products name"
                            label-for="title-input">
                <b-form-input id="title-input"
                              v-model="form.title"
                              required
                              class="name_input">

                </b-form-input>
              </b-form-group>
              <b-form-group label="Products description"
                            label-for="description-input">
                <b-form-textarea id="description-input"
                                 v-model="form.description"
                                 required
                                 class="text-width">
                </b-form-textarea>
              </b-form-group>
            </b-card-body>

            <template v-slot:footer>
              <div class="d-flex justify-content-between">
                <span>
                  <b-button to="../"
                            append>Cancel</b-button>
                </span>

                <span>
                  <b-button @click="createProduct(form)">Save</b-button>
                </span>
              </div>
            </template>
          </b-card>

        </b-container>

        <b-container fluid="xs" v-else class="py-2">
          <div class="d-flex justify-content-end py-2">
                  <span>
                    <b-button @click="deleteProduct"
                              variant="danger">Delete <b-icon icon="trash"></b-icon></b-button>
                  </span>
          </div>
          <b-card>
            <template v-slot:header>
              <h3>Product Details</h3>
            </template>

            <b-card-body>
              <b-form-group label="Products name"
                            label-for="title-input">
                <b-form-input id="title-input"
                              v-model="form.title"
                              required
                              class="name_input">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Products description"
                            label-for="description-input">
                <b-form-textarea id="description-input"
                                 v-model="form.description"
                                 required
                                 class="text-width">
                </b-form-textarea>
              </b-form-group>
            </b-card-body>

            <template v-slot:footer>
              <div class="d-flex justify-content-between">
                <span>
                  <b-button to="../" append>Cancel</b-button>
                </span>

                <span>
                  <b-button @click="updateProduct(form)">Save</b-button>
                </span>
              </div>
            </template>
          </b-card>

        </b-container>
      </template>
    </status-container>


  </b-container>
</template>

<script>
  import StatusContainer from '../Shared/StatusContainer';

  export default {
    name: 'ProductDetails',
    components: {StatusContainer},
    data: () => ({
      form: {
        title: '',
        description: '',
      },
      isNewProduct: false,
    }),
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    created() {
      this.isNewProduct = this.$props.id === 'add';

      if (!this.isNewProduct) {
        this.loadProduct();
      } else {
        this.$store.commit('SET_LOADED');
      }

    },
    methods: {
      loadProduct() {
        this.$store.dispatch('getProduct', this.$props.id);
      },
      createProduct(product) {
        this.$store.dispatch('postProduct', product);
      },
      updateProduct(product) {
        this.$store.dispatch('putProduct', product);
      },
      deleteProduct() {
        this.$store.dispatch('deleteProduct', this.$props.id)
      }
    },
    computed: {
      STATUS: {
        get() {
          return this.$store.getters.GET_STATUS;
        }
      },
      PRODUCT: {
        get() {
          return this.$store.getters.GET_SELECTED_PRODUCT;
        }
      }
    },
    watch: {
      STATUS(newValue, oldValue) {
        if (newValue.loaded && !this.isNewProduct) {
          this.form = {...this.PRODUCT};
        }
      },
    }
  }
</script>

<style scoped>
  .name_input {
    max-width: 400px;
  }

  .text-width {
    max-width: 400px;
  }


</style>
