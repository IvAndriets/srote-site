<template>
  <div>
    <section v-if="status && status.loaded">
      <slot name="rendered"></slot>
    </section>
    <section v-if="status && status.loading">
      <b-overlay :show="showOverlay" rounded="sm">
        <slot name="rendered"></slot>
      </b-overlay>
    </section>
    <section v-if="status && status.error">
      Error
      <slot name="rendered"></slot>
    </section>
  </div>
</template>

<script>

  export default {
    name: 'StatusContainer',
    data: () => ({
      showOverlay: true,
    }),
    props: {
      status: null,
    },
  }
</script>

<style scoped>
</style>
