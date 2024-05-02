<script setup lang="ts">
import { tableDataSortable } from "./data";

const columns: TableColumnList = [
  {
    label: "Fecha",
    prop: "date",
    sortable: true
  },
  {
    label: "Nombre",
    prop: "name"
  },
  {
    label: "Dirección",
    prop: "address",
    formatter: ({ address }) => `Contenido formateado: ${address}`
  }
];
</script>

<template>
  <pure-table
    :data="tableDataSortable"
    :columns="columns"
    :default-sort="{ prop: 'date', order: 'ascending' }"
  />
</template>
