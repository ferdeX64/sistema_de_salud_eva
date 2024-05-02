<script setup lang="ts">
import { tableDataMore } from "./data";

const columns : TableColumnList = [
  {
    label: "Fecha",
    prop: "date",
    fixed: true,
  },
  {
    label: "Nombre",
    prop: "name",
    children: [
      {
        label: "Distrito",
        children: [
          {
            label: "Ciudad",
            prop: "city",
          },
          {
            label: "Dirección",
            prop: "address",
          },
        ],
      },
    ],
  },
  {
    label: "Código postal",
    prop: "post-code",
  },
];
</script>

<template>
  <pure-table :data="tableDataMore" :columns="columns" alignWhole="center" />
</template>
