<template>
  <div>
    <main-toolbar></main-toolbar>

    <router-view></router-view>
  </div>
</template>

<script>
  import MainToolbar from './MainToolbar';

  export default {
    components: {
      'main-toolbar': MainToolbar,
    },
    name: 'MainContainer',
  }
</script>

<style scoped>

  /*.container-height {*/
  /*  height: calc(100% - 40px);*/
  /*}*/

</style>
