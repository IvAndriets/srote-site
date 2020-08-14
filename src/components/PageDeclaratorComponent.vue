<template>
  <b-container>
    <slot name="header" class="pt-1 pb-1"></slot>
    <slot name="filter" class="pt-1 pb-1"></slot>

    <b-row class="pt-1 pb-1">
      <slot name="toolbar"></slot>
    </b-row>

    <slot name="paginationInfo" class="pt-1 pb-1"></slot>
    <slot name="body" class="pt-1 pb-1"></slot>
    <slot name="pagination" class="pt-1 pb-1"></slot>
    <slot name="actionBar" class="pt-1 pb-1"></slot>
    <slot name="footer" class="pt-1 pb-1"></slot>
  </b-container>
</template>

<script>
  export default {
    name: 'PageDeclaratorComponent'
  }
</script>

<style scoped>

</style>
