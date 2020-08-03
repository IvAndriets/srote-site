<template>
  <div class="full_height">
    <main-tool-bar></main-tool-bar>
    <div class="container-height container-fluid">
      <b-row class=" full_height">
        <side-bar></side-bar>
        <main role="main"
              class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <router-view>

          </router-view>
        </main>
      </b-row>
    </div>
  </div>
</template>

<script>
  import MenuComponent from './MenuComponent/MenuComponent';
  import TopMenuComponent from './MenuComponent/TopMenuComponent';

  export default {
    components: {
      'side-bar': MenuComponent,
      'main-tool-bar': TopMenuComponent,
    },
    name: 'MainContainer',
  }
</script>

<style scoped>

  .full_height {
    height: 100%;
  }

  .container-height {
    height: calc(100% - 40px);
  }

</style>
