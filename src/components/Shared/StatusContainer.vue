<template>
  <div>
    <section v-if="status && status.STATUS.loaded">
      <slot name="rendered"></slot>
    </section>
    <section v-if="status && status.STATUS.loading">
      <b-overlay :show="showOverlay" rounded="sm">
        <slot name="rendered"></slot>
      </b-overlay>
    </section>
    <section v-if="status && status.STATUS.error">
      <div class="alert alert-danger">
        {{status.STATUS.error}}
      </div>
      <slot name="rendered" v-if="status.name !== 'List'"></slot>
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
