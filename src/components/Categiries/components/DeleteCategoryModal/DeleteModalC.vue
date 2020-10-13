<template>
  <div>
    <b-modal v-model="MODAL_STATE"
             title="Delete category?"
             @ok="deleteCategory"
             @cancel="disableModal">
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'DeleteModalC',
    computed: {
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
    beforeDestroy() {
      this.MODAL_STATE = false;
      this.DELETE_ID = '';
    },
    methods: {
      deleteCategory() {
        this.$store.dispatch('deleteCategory', this.DELETE_ID);
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
