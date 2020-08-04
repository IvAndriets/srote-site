<template>
  <b-container>
    <b-button :to="{path:'/products/new'}">
      Add
      <b-icon icon="plus"></b-icon>
    </b-button>
    <router-link :to="{ name: 'newProduct' }"
                 class="nav-link">Staff
    </router-link>
  </b-container>
</template>

<script>
  export default {
    name: 'ProductsListActionBar'
  }
</script>

<style scoped>

</style>
