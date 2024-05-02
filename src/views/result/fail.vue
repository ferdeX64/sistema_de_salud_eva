<script setup lang="ts">
import { useColumns } from "./columns";
defineOptions({
  name: "Fail",
});

const { columns } = useColumns();
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">página de fallos</span>
      </div>
    </template>
    <el-result
      icon="error"
      title="No presentado"
      sub-title="Por favor, compruebe y corrija la siguiente información antes de volver a enviarla."
    >
      <template #extra>
        <el-button type="primary">Volver a Modificar</el-button>
      </template>
    </el-result>
    <PureDescriptions
      :columns="columns"
      title="El contenido que ha enviado tiene los siguientes errores:"
      class="p-6 ml-10 mr-10 bg-[#fafafa] dark:bg-[#1d1d1d]"
    />
  </el-card>
</template>

<style scoped>
:deep(.el-descriptions__body) {
  background: transparent;
}
</style>
