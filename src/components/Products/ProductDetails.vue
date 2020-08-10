<template>
  <b-container>
    <status-container v-bind:status="STATUS">
      <template v-slot:rendered>
        <div v-if="isNewProduct">

          <div>
            <h3>New product</h3>
          </div>

          <b-form @submit.prevent="createProduct(form)">
            <b-form-group label="Products name"
                          label-for="title-input">
              <b-form-input id="title-input"
                            v-model="form.title"
                            required>

              </b-form-input>
            </b-form-group>

            <b-form-group label="Products description"
                          label-for="description-input">
              <b-form-input id="description-input"
                            v-model="form.description"
                            required>
              </b-form-input>
            </b-form-group>

            <b-button type="submit">Save</b-button>
            <b-button to="../"
                      append>Cancel</b-button>

          </b-form>

        </div>
        <div v-else>

          <div>
            <h3>Product Details</h3>
          </div>

          <b-form @submit="updateProduct">
            <b-form-group label="Products name"
                          label-for="title-input">
              <b-form-input id="title-input"
                            v-model="form.title"
                            required>
              </b-form-input>
            </b-form-group>

            <b-form-group label="Products description"
                          label-for="description-input">
              <b-form-input id="description-input"
                            v-model="form.description"
                            required>
              </b-form-input>
            </b-form-group>

            <b-button type="submit">Commit</b-button>
            <b-button to="../" append>Back</b-button>
          </b-form>
          <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#ff1d5e"
          />
        </div>
      </template>
    </status-container>

  </b-container>
</template>

<script>
  import StatusContainer from '../StatusContainer';
  import { HalfCircleSpinner } from 'epic-spinners'

  export default {
    name: 'ProductDetails',
    components: {StatusContainer,'half-circle-spinner': HalfCircleSpinner},
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
      STATUS1(newValue, oldValue) {
        if (newValue.loaded) {
          this.form = {...this.PRODUCT};
        }
      },
    }
  }
</script>

<style scoped>

</style>
