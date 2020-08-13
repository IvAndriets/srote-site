<template>
  <b-navbar class="navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
    <b-navbar-brand to="/home"
                    class="col-sm-3 col-md-2 mr-0">
      Products Catalog
    </b-navbar-brand>
    <b-navbar-nav class="px-3">
      <b-nav-item class="text-nowrap">
        <router-link to="/products?page=1&limit=5"
                     class="nav-link">Admin
        </router-link>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  export default {
    name: 'MainToolbar'
  }
</script>

<style scoped>

</style>
