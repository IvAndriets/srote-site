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
    name: 'ProductDetails',
    data: () => ({
      product: {
        title: '',
        description: '',
      },
    }),
    methods: {
      addToList(product) {
        this.$store.dispatch('addProduct', product);
        this.$router.push('/products')
      },
      cancelMethod() {
        this.$router.push('/products')
      }
    },
  }
</script>

<style scoped>

</style>
