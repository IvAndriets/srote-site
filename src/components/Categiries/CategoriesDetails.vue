<template>
  <b-container>

    <StatusContainer :status="{STATUS, name:'notList'}">
      <template v-slot:rendered>
        <b-container v-if="isNewCategory"
                     fluid="sm"
                     class="py-2">

          <b-card>
            <template v-slot:header>
              <h3>New Product</h3>
            </template>

            <b-card-body>
              <b-form-group label="Category name"
                            label-for="title-input">
                <b-form-input id="title-input"
                              v-model="form.name"
                              required
                              class="name_input">

                </b-form-input>
              </b-form-group>
              <b-form-group label="Category description"
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
                  <b-button @click="createCategory(form)">Save</b-button>
                </span>
              </div>
            </template>
          </b-card>

        </b-container>

        <b-container v-else
                     fluid="xs"
                     class="py-2">
          <div class="d-flex justify-content-end py-2">
                  <span>
                    <b-button variant="danger"
                              @click="deleteCategory">Delete <b-icon icon="trash"></b-icon></b-button>
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
                              v-model="form.name"
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
                  <b-button @click="updateCategory(form)">Save</b-button>
                </span>
              </div>
            </template>
          </b-card>

        </b-container>
      </template>
    </StatusContainer>

  </b-container>
</template>

<script>
  import StatusContainer from '../Shared/StatusContainer';
  export default {
    name: 'CategoriesDetails',
    components: {StatusContainer},
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data: () => ({
      form: {
        name: '',
        description: '',
      },
      isNewCategory: false,
    }),
    computed: {
      STATUS: {
        get() {
          return this.$store.getters.GET_STATUS_C;
        },
      },
      CATEGORY: {
        get() {
          return this.$store.getters.GET_SELECTED_CATEGORY;
        },
      },
    },
    watch: {
      STATUS(newValue) {
        if (newValue.loaded && !this.isNewProduct) {
          this.form = {...this.CATEGORY};
        }
      },
    },
    created() {
      this.isNewCategory = this.$props.id === 'add';


      if (!this.isNewCategory) {
        this.loadCategory();
      } else {
        this.$store.commit('SET_LOADED_C');
      }

    },
    methods: {
      loadCategory() {
        this.$store.dispatch('getCategory', this.$props.id);
      },
      createCategory(product) {
        this.$store.dispatch('postCategory', product);
      },
      updateCategory(product) {
        this.$store.dispatch('putCategory', product);
      },
      deleteCategory() {
        this.$store.dispatch('deleteCategory', this.$props.id);
        this.$router.push('./');
      },
    },
  };
</script>

<style scoped>

</style>
