<script setup lang="ts">
import { tableData } from "./data";

const indexMethod = (index: number) => {
  return index * 2;
};

const columns: TableColumnList = [
  {
    type: "index",
    index: indexMethod,
  },
  {
    label: "Fecha",
    prop: "date",
  },
  {
    label: "Nombre",
    prop: "name",
  },
  {
    label: "Dirección",
    prop: "address",
  },
];
</script>

<template>
  <pure-table :data="tableData" :columns="columns" />
</template>
