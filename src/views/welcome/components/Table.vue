<script setup lang="ts">
import { tableData } from "./data";

const columns: TableColumnList = [
  {
    label: "Medicamento",
    prop: "med",
  },
  {
    label: "Cantidad",
    prop: "cant",
  },
];
</script>

<template>
  <pure-table
    :data="tableData.concat(tableData).concat(tableData)"
    :columns="columns"
    height="250"
  />
</template>
