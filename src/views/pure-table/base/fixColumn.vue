<script setup lang="ts">
import { tableDataMore } from "./data";

const props = withDefaults(
  defineProps<{
    height?: string;
  }>(),
  {
    height: null,
  }
);

const columns: TableColumnList = [
  {
    label: "Fecha",
    prop: "date",
    width: "100",
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
    width: "200",
  },
  {
    label: "Opciones",
    width: "125",
    fixed: "right",
    slot: "operation",
  },
];

function handleClick(row) {
  console.log(
    "%crow===>>>: ",
    "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
    row
  );
}
</script>

<template>
  <pure-table
    :data="
      props.height
        ? tableDataMore.concat(tableDataMore).concat(tableDataMore)
        : tableDataMore
    "
    :columns="columns"
    :height="props.height"
  >
    <template #operation="{ row }">
      <el-button link type="primary" size="small" @click="handleClick(row)">
        Detalles
      </el-button>
      <el-button link type="primary" size="small">Editar</el-button>
    </template>
  </pure-table>
</template>
