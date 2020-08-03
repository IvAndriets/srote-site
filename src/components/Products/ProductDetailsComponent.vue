<template>
    <b-container>
        <b-form-group>
            <b-input v-model="product.name">

            </b-input>
            <b-input v-model="product.description">

            </b-input>
        </b-form-group>
        <b-button @click="addToList(product)">
            Add
        </b-button>
        <b-button @click="cancelMethod">
            Cancel
        </b-button>
    </b-container>
</template>

<script>
  export default {
    name: 'ProductDetailsComponent',
    data: () => ({
      product: {
        title: '',
        description: '',
      },
    }),
    methods: {
      addToList(product) {
        this.$store.dispatch('addProduct', product);
        this.$router.push('/product-list')
      },
      cancelMethod() {
        this.$router.push('/product-list')
      }
    },
  }
</script>

<style scoped>

</style>
