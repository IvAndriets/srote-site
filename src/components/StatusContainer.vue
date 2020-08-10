<template>
  <div>
    <section v-if="status && status.loaded">
      <slot name="rendered"></slot>
    </section>
    <section v-if="status && status.loading">
      Loading
    </section>
    <section v-if="status && status.error">
      Error
    </section>
  </div>
</template>

<script>
  export default {
    name: 'StatusContainer',
    props: {
      status: null,
    },
  }
</script>

<style scoped>

</style>
