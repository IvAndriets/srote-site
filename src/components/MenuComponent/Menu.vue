<template>
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link active"
                 to="/product-list">
                Продукты
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link link"
                 to="/profit">
                Прибыль
              </router-link>
            </li><li class="nav-item">
            <router-link class="nav-link link"
               to="/consumption">
              Расход
            </router-link>
          </li><li class="nav-item">
            <router-link class="nav-link link"
               to="/order">
                <polyline points="13 2 13 9 20 9"></polyline></svg>
              Заказ
            </router-link>
          </li>
          </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Menu',
  };
</script>

<style scoped>
  .link{
    color: gray;
  }
</style>
