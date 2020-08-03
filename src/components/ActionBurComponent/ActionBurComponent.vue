<template>
    <b-container class="action-bar-container">
        <b-button :to="{path:'/new-product'}"
                  class="plus-color">
            Add
            <b-icon icon="plus"></b-icon>
        </b-button>
    </b-container>
</template>

<script>
  export default {
    name: "ActionBurComponent"
  }
</script>

<style scoped>
    .action-bar-container {
        text-align: end;
        margin: 4px;
    }

    .plus-color {
        color: black;
    }
</style>
