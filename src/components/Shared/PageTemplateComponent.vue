<template>
  <b-container class="py-1">
    <div v-if="this.$scopedSlots.breadcrumb"
         class="py-3">
      <slot name="breadcrumb"></slot>
    </div>

    <div v-if="this.$scopedSlots.header"
         class="py-3">
      <slot name="header"></slot>
    </div>

    <div v-if="this.$scopedSlots.filter"
         class="py-2">
      <slot name="filter"></slot>
    </div>

    <b-row v-if="this.$scopedSlots.toolbar"
           class="py-2">
      <slot name="toolbar"></slot>
    </b-row>

    <div v-if="this.$scopedSlots.paginationInfo"
         class="py-2">
      <slot name="paginationInfo"></slot>
    </div>

    <div v-if="this.$scopedSlots.body"
         class="py-2">
      <slot name="body"></slot>
    </div>

    <div v-if="this.$scopedSlots.pagination"
         class="py-2">
      <slot name="pagination"></slot>
    </div>

    <div v-if="this.$scopedSlots.actionBar"
         class="py-2">
      <slot name="actionBar"></slot>
    </div>

    <div v-if="this.$scopedSlots.footer"
         class="py-2">
      <slot name="footer"></slot>
    </div>

  </b-container>
</template>

<script>

  export default {
    name: 'PageTemplateComponent',
  };
</script>

<style scoped>

</style>
