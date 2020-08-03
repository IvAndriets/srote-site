<template>
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link active"
                 to="/product-list">
                <b-icon icon="basket3"></b-icon>
                Продукты
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link link"
                 to="/profit">
                <b-icon icon="box-arrow-up"></b-icon>
                Приход
              </router-link>
            </li><li class="nav-item">
            <router-link class="nav-link link"
               to="/consumption">
              <b-icon icon="box-arrow-down"></b-icon>
              Расход
            </router-link>
          </li><li class="nav-item">
            <router-link class="nav-link link"
               to="/order">
              <b-icon icon="blockquote-right"></b-icon>
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
