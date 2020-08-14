<template>
  <b-container class="py-3">

    <div v-if="this.$scopedSlots.header"
         class="py-3">
      <slot name="header"></slot>
    </div>

    <slot name="filter"></slot>

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
    name: 'PageDeclaratorComponent',
  }
</script>

<style scoped>

</style>
