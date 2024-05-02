<script setup lang="ts">
import TypeIt from "@/components/ReTypeit";

defineOptions({
  name: "Typeit"
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> Componentes de la máquina de escribir </span>
      </div>
    </template>
    <TypeIt :values="['test1', 'test2', 'test3']" />
  </el-card>
</template>
