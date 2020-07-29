<template>
    <b-form-group lable="TableOption"
                  label-cols-lg="2">
      <b-form-checkbox v-model="filterValue1"
                       inline>
        Value 1
      </b-form-checkbox>
      <b-form-checkbox v-model="filterValue2"
                       inline>
        Value 2
      </b-form-checkbox>
      <b-form-checkbox v-model="filterValue3"
                       inline>
        Value 3
      </b-form-checkbox>
      <b-form-checkbox v-model="filterValue3"
                       inline>
        Value 4
      </b-form-checkbox>
    </b-form-group>
</template>

<script>
  export default {
    name: 'Filter',
    data: ()=>({
      filterValue1: true,
      filterValue2: true,
      filterValue3: true,
      filterValue4: true,

    }),
  };
</script>

<style scoped>

</style>
