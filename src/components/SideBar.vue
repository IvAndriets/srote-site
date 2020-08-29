<template>
  <b-container fluid="fluid" class="bg-light side-bar-height">
    <div>
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link active"
                       to="/products">
            <b-icon icon="folder2"></b-icon>
            Products
          </router-link>
        </li>
      </ul>
    </div>
  </b-container>
</template>

<script>
  export default {
    name: 'SideBar',
  };
</script>

<style scoped>
  .side-bar-height {
    height: 100%;
  }
</style>
