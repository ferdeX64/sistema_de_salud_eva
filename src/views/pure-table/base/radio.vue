<script setup lang="ts">
import { ref } from "vue";
import { tableData } from "./data";

const tableRef = ref();
const currentRow = ref();

const setCurrent = (row?: any) => {
  // Métodos para obtener la tabla tableRef.value.getTableRef()
  const { setCurrentRow } = tableRef.value.getTableRef();
  setCurrentRow(row);
};
const handleCurrentChange = val => {
  currentRow.value = val;
};

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
  <div>
    <pure-table
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      highlight-current-row
      @page-current-change="handleCurrentChange"
    />
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData[1])">Seleccione la segunda fila</el-button>
      <el-button @click="setCurrent()">Borrar selección</el-button>
    </div>
  </div>
</template>
