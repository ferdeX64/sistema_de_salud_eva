<script setup lang="ts">
import { ref } from "vue";
import { tableDataExpand } from "./data";

const parentBorder = ref(false);
const childBorder = ref(false);

const columns: TableColumnList = [
  {
    type: "expand",
    slot: "expand",
  },
  {
    label: "Fecha",
    prop: "date",
  },
  {
    label: "Nombre",
    prop: "name",
  },
];

const childColumns: TableColumnList = [
  {
    label: "Nombre",
    prop: "name",
  },
  {
    label: "Estado",
    prop: "state",
  },
  {
    label: "Ciudad",
    prop: "city",
  },
  {
    label: "Dirección",
    prop: "address",
  },
  {
    label: "Zip",
    prop: "zip",
  },
];
</script>

<template>
  <div>
    Activar el borde exterior:  <el-switch v-model="parentBorder" /> Activar borde de familia: 
    <el-switch v-model="childBorder" />
    <pure-table :data="tableDataExpand" :columns="columns" :border="parentBorder">
      <template #expand="{ row }">
        <div class="m-4">
          <p class="mb-2">Estado: {{ row.state }}</p>
          <p class="mb-2">Ciudad: {{ row.city }}</p>
          <p class="mb-2">Dirección: {{ row.address }}</p>
          <p class="mb-4">Zip: {{ row.zip }}</p>
          <h3>Familia</h3>
          <pure-table :data="row.family" :columns="childColumns" :border="childBorder" />
        </div>
      </template>
    </pure-table>
  </div>
</template>
