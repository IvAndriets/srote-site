<template>
    <b-container>
      <b-table-simple hover
                      responsive
                      outlined>
        <b-thead>
          <b-tr>
            <b-th>
              Цена
            </b-th>
            <b-th>
              Страна
            </b-th>
            <b-th>
              Дата
            </b-th>
            <b-th>
              Рейтинг
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-th class="container-fluid">
            <p>Название товара</p>
            <div style="background-color: red; height: 100px; width: 100px"></div>
            <p>Описание товара</p>
          </b-th>
        </b-tbody>
      </b-table-simple>
    </b-container>
</template>

<script>
  export default {
    name: 'ProductsList',
  };
</script>

<style scoped>

</style>
