<template>
  <b-container>
    <b-row class="d-flex align-items-center justify-content-between">
      <div>
        Total items count: {{ROWS}}
      </div>
      <div>
        <span class="pr-2">Items per page:</span>
        <b-select @change="changeLimit"
                  v-model="LIMITS"
                  :options="option"
                  class="limit-select-width">
        </b-select>
      </div>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'ProductsListActionBar',
    data: () => ({
      option: [5, 10, 15],
    }),
    computed: {
      LIMITS: {
        get() {
          return this.$store.getters.GET_LIMITS;
        },
        set(value) {
          this.$store.commit('SET_LIMIT', value);
        }
      },
      ROWS: {
        get() {
          return this.$store.getters.GET_ROWS_COUNT;
        }
      }
    },
    methods: {
      changeLimit(value) {
        this.$store.commit('SET_LIMIT', value);
      }
    }
  }
</script>

<style scoped>
  .limit-select-width {
    width: 60px;
  }
</style>
