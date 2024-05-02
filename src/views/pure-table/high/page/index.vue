<script setup lang="ts">
import { useColumns } from "./columns";

const {
  loading,
  columns,
  dataList,
  select,
  hideVal,
  tableSize,
  pagination,
  loadingConfig,
  paginationAlign,
  paginationSmall,
  onChange,
  onSizeChange,
  onCurrentChange,
} = useColumns();
</script>

<template>
  <div>
    <el-space class="float-right mb-4">
      <p class="text-sm">Opción múltiple :</p>
      <el-radio-group v-model="select" size="small">
        <el-radio-button label="yes">Si</el-radio-button>
        <el-radio-button label="no">No</el-radio-button>
      </el-radio-group>
      <el-divider direction="vertical" />
      <p class="text-sm">Columnas dinámicas:</p>
      <el-radio-group v-model="hideVal" size="small">
        <el-radio-button label="nohide">No oculto</el-radio-button>
        <el-radio-button label="hideDate">Ocultar fecha</el-radio-button>
        <el-radio-button label="hideName">Ocultar su nombre</el-radio-button>
        <el-radio-button label="hideAddress">Dirección oculta</el-radio-button>
      </el-radio-group>
      <el-divider direction="vertical" />
      <p class="text-sm">Tamaño de la mesa:</p>
      <el-radio-group v-model="tableSize" size="small">
        <el-radio-button label="large">large</el-radio-button>
        <el-radio-button label="default">default</el-radio-button>
        <el-radio-button label="small">small</el-radio-button>
      </el-radio-group>
      <el-divider direction="vertical" />
      <p class="text-sm">Tamaño de la paginación:</p>
      <el-radio-group v-model="paginationSmall" size="small" @change="onChange">
        <el-radio-button :label="false">no small</el-radio-button>
        <el-radio-button :label="true">small</el-radio-button>
      </el-radio-group>
      <el-divider direction="vertical" />
      <p class="text-sm">La alineación de la paginación:</p>
      <el-radio-group v-model="paginationAlign" size="small">
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="center">center</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
      </el-radio-group>
    </el-space>

    <pure-table
      border
      row-key="id"
      alignWhole="center"
      showOverflowTooltip
      :size="tableSize as any"
      :loading="loading"
      :loading-config="loadingConfig"
      :height="tableSize === 'small' ? 352 : 440"
      :data="
        dataList.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize
        )
      "
      :columns="columns"
      :pagination="pagination"
      @page-size-change="onSizeChange"
      @page-current-change="onCurrentChange"
    />
  </div>
</template>
