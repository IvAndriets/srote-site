<template>
  <b-row no-gutters>
    <b-col cols="2">
      <side-bar></side-bar>
    </b-col>
    <b-col class="main-container-height"
            cols="10">
      <router-view></router-view>
    </b-col>
  </b-row>
</template>

<script>
  import SideBar from '../components/SideBar';

  export default {
    name: 'Categories',
    components: {
      'side-bar': SideBar,
    },
  };
</script>

<style scoped>

</style>
