<template>
  <b-row no-gutters>
    <b-col cols="2">
      <side-bar></side-bar>
    </b-col>
    <b-col cols="10" class="main-container-height">

      <router-view></router-view>
    </b-col>
  </b-row>
</template>

<script>
  import SideBar from '../components/SideBar';

  export default {
    name: 'Products',
    components: {
      'side-bar': SideBar,
    },
  }
</script>

<style scoped>
  .main-container-height{
    height: 1600px;
  }
</style>
