<template>
    <b-form-group lable="TableOption"
                  label-cols-lg="2"
                  class="filter-container">
        <b-form-checkbox v-model="filterValue1">
            Value 1
        </b-form-checkbox>
        <b-form-checkbox v-model="filterValue2">
            Value 2
        </b-form-checkbox>
        <b-form-checkbox v-model="filterValue3">
            Value 3
        </b-form-checkbox>
        <b-form-checkbox v-model="filterValue4">
            Value 4
        </b-form-checkbox>
    </b-form-group>
</template>

<script>
  export default {
    name: 'FilterComponent',
    data: () => ({
      filterValue1: true,
      filterValue2: true,
      filterValue3: true,
      filterValue4: true,
    }),
    methods: {
      onShowHide() {
      }
    }
  };
</script>

<style scoped>
    .filter-container {
        display: flex;
        justify-content: space-around;
    }
</style>
