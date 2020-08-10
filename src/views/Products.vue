<template>
  <b-row>
    <side-bar></side-bar>
    <router-view></router-view>
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

</style>
