<template>
  <main-component></main-component>
</template>

<script>
  import MainContainer from './components/MainContainer';
  import ProductDetails from './components/Products/ProductDetails';

  export default {
    components: {
      'main-component': MainContainer,
    },
    name: 'App',
    computed: {},
  };
</script>

<style>
</style>
