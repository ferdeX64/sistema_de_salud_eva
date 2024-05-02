<script setup lang="ts">
import { ref } from "vue";
import { list } from "./base/list";

defineOptions({
  name: "PureTable",
});

const selected = ref(0);

function tabClick({ index }) {
  selected.value = index;
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          La plataforma encapsula la Tabla de element-plus, que es totalmente compatible
          con Api y proporciona elementos de configuración flexibles y alertas de tipo
          perfectas, por lo que ya no necesitará escribir todo su código en plantillas. Se
          acabó escribir código en plantillas.
          <el-link
            href="https://github.com/pure-admin/pure-admin-table"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            @pureadmin/table
          </el-link>
        </span>
      </div>
    </template>

    <el-alert
      title="La mayoría de las tablas en el uso básico no establecen row-key, pero es mejor establecerlo, el back-end necesita devolver el valor único del campo, como id Función: 1. se utiliza para optimizar el renderizado de Table especialmente si el campo se encuentra en una estructura profunda; 2. para evitar que ciertas operaciones saturen el componente de la tabla."
      type="info"
      :closable="false"
    />

    <el-tabs @tab-click="tabClick">
      <template v-for="(item, index) of list" :key="item.key">
        <el-tab-pane :lazy="true">
          <template #label>
            <el-tooltip
              :content="`（${index + 1} ejemplo）${item.content}`"
              placement="top-end"
            >
              <span>{{ item.title }}</span>
            </el-tooltip>
          </template>
          <component v-if="selected == index" :is="item.component" />
        </el-tab-pane>
      </template>
    </el-tabs>
  </el-card>
</template>

<style scoped>
:deep(.el-tabs__nav-wrap)::after {
  height: 1px;
}

:deep(.el-tabs__header) {
  margin-top: 10px;
}

:deep(.el-alert__title) {
  font-size: 16px;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  font-size: 16px;
  color: var(--el-text-color-primary);
}

:deep(.el-tabs__nav-next.is-disabled),
:deep(.el-tabs__nav-prev.is-disabled) {
  opacity: 0.5;
}
</style>
