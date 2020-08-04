<template>
  <div>
    <main-toolbar></main-toolbar>
    <b-row>
      <side-bar></side-bar>
      <main>
        <router-view>
          <router-view></router-view>
        </router-view>
      </main>
    </b-row>
  </div>
</template>

<script>
  import SideBar from './SideBar';
  import MainToolbar from './MainToolbar';

  export default {
    components: {
      'side-bar': SideBar,
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
