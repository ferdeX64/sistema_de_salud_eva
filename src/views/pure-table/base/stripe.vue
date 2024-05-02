<script setup lang="ts">
import { tableData } from "./data";

const columns: TableColumnList = [
  {
    label: "Fecha",
    prop: "date"
  },
  {
    label: "Nombre",
    prop: "name"
  },
  {
    label: "Dirección",
    prop: "address"
  }
];
</script>

<template>
  <pure-table :data="tableData" :columns="columns" stripe />
</template>
