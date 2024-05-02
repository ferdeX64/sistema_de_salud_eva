<script setup lang="ts">
import { ref } from "vue";
import { list } from "./high/list";

defineOptions({
  name: "PureTableHigh",
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
          El uso avanzado es todo en sintaxis tsx, dando pleno juego a la
          <el-link
            href="https://github.com/pure-admin/pure-admin-table"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            @pureadmin/table
          </el-link>
          Flexibilidad para mantener la tabla global simplemente manipulando la
          configuración de las columnas.
        </span>
      </div>
    </template>

    <el-alert
      title="En uso avanzado, todas las tablas se establecen con row-key, y el backend necesita devolver el valor único del campo, como id.  rendering, especialmente cuando el campo está en una estructura profunda; 2. para evitar que el componente de la tabla se estropee después de arrastrar y soltar (arrastrar y soltar debe estar configurado, todos hemos pisado los baches por ti ❤️ )"
      type="info"
      :closable="false"
    />

    <el-tabs @tab-click="tabClick">
      <template v-for="(item, index) of list" :key="item.key">
        <el-tab-pane :lazy="false">
          <template #label>
            <el-tooltip
              :content="`(No.${index + 1} ejemplo) ${item.content}`"
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
