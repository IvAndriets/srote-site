<template>
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link active"
                 to="/products">
                <b-icon icon="basket3"></b-icon>
                Продукты
              </router-link>
            </li>
          </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'SideBar',
  };
</script>

<style scoped>
  .link{
    color: gray;
  }
</style>
