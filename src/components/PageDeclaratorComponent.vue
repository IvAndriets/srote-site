<template>
  <b-container>
    <slot name="header"></slot>
    <slot name="filter"></slot>

    <b-row>
      <slot name="toolbar"></slot>
    </b-row>

    <slot name="paginationInfo"></slot>
    <slot name="body"></slot>
    <slot name="pagination"></slot>
    <slot name="actionBar"></slot>
    <slot name="footer"></slot>
  </b-container>
</template>

<script>
  export default {
    name: 'PageDeclaratorComponent'
  }
</script>

<style scoped>

</style>
