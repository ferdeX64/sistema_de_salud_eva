<script setup lang="ts">
import { ref } from "vue";
import { tableData } from "./data";

const tableRef = ref();

const multipleSelection = ref([]);
const toggleSelection = (rows?: any) => {
  const { toggleRowSelection, clearSelection } = tableRef.value.getTableRef();
  if (rows) {
    rows.forEach(row => {
      toggleRowSelection(row, undefined);
    });
  } else {
    clearSelection();
  }
};
const handleSelectionChange = val => {
  multipleSelection.value = val;
};

const columns: TableColumnList = [
  {
    type: "selection",
    align: "left"
  },
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
      @selection-change="handleSelectionChange"
    />
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">
        Conmutar el estado de selección de la segunda y tercera filas
      </el-button>
      <el-button @click="toggleSelection()">Borrar selección</el-button>
    </div>
  </div>
</template>
