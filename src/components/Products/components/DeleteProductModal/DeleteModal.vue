<template>
  <div>
    <b-modal v-model="MODAL_STATE"
             title="Delete product?"
             @ok="deleteProduct"
             @cancel="disableModal">
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'DeleteModal',
    computed: {
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
    },
    beforeDestroy() {
      this.MODAL_STATE = false;
      this.DELETE_ID = '';
    },
    methods: {
      deleteProduct() {
        this.$store.dispatch('deleteProduct', this.DELETE_ID);
      },
      disableModal() {
        this.MODAL_STATE = false;
        this.DELETE_ID = '';
      },
    },
  };
</script>

<style scoped>

</style>
