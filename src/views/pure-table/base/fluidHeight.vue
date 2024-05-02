<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import { tableDataMore } from "./data";

const columns: TableColumnList = [
  {
    label: "Fecha",
    prop: "date",
    width: "260",
    fixed: true,
  },
  {
    label: "Nombre",
    prop: "name",
    width: "260",
  },
  {
    label: "Estado",
    prop: "state",
    width: "260",
  },
  {
    label: "Ciudad",
    prop: "city",
    width: "260",
  },
  {
    label: "Dirección",
    prop: "address",
    width: "260",
  },
  {
    label: "Código postal",
    prop: "post-code",
    width: "260",
  },
  {
    label: "Plataforma",
    width: "120",
    fixed: "right",
    slot: "operation",
  },
];

const now = new Date();
const tableData = ref(tableDataMore);

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};

const onAddItem = () => {
  now.setDate(now.getDate() + 1);
  tableData.value.push({
    date: dayjs(now).format("YYYY-MM-DD"),
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    city: "Los Angeles",
    "post-code": "CA 90036",
  });
};
</script>

<template>
  <div>
    <pure-table :data="tableData" :columns="columns" maxHeight="500">
      <template #operation="{ $index }">
        <el-button link type="primary" size="small" @click.prevent="deleteRow($index)">
          Eliminar
        </el-button>
      </template>
    </pure-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem"> Agregar item </el-button>
  </div>
</template>
