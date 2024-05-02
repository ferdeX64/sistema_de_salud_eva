<script setup lang="ts">
import { markRaw } from "vue";
import { useRenderFlicker } from "@/components/ReFlicker";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Iphone from "@iconify-icons/ep/iphone";

defineOptions({
  name: "TimeLine",
});

const { lastBuildTime } = __APP_INFO__;
const activities = [
  {
    content: "Soporte de parpadeo de puntos",
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker()),
  },
  {
    content: "Soporte tapajuntas cuadrado",
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker({ borderRadius: 0, background: "#67C23A" })),
  },
  {
    content: "Soporte para colores por defecto",
    timestamp: lastBuildTime,
  },
  {
    content: "Soporte para colores personalizados",
    timestamp: lastBuildTime,
    color: "#F56C6C",
  },
  {
    content: "Compatibilidad con iconos personalizados",
    timestamp: lastBuildTime,
    color: "transparent",
    icon: useRenderIcon(Iphone, {
      color: "#0bbd87",
    }),
  },
];
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">cronología</span>
      </div>
    </template>
    <div class="flex">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :color="activity.color"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>

      <el-timeline class="pl-40">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :color="activity.color"
          :timestamp="activity.timestamp"
          placement="bottom"
        >
          <div class="message">
            vue-pure-admin se basa en Vue3.0 + TypeScript + Vite + Element-Plus escrito un
            conjunto de sistema de gestión de backend.
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<style scoped>
.message {
  position: relative;
  box-sizing: border-box;
  width: 200px;
  padding: 5px 12px;
  line-height: 18px;
  color: #fff;
  word-break: break-all;
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
  border-radius: 6px;
}

.message::after {
  position: absolute;
  top: 8px;
  left: -10px;
  width: 0;
  height: 0;
  overflow: hidden;
  content: "";
  border-color: var(--el-color-primary) transparent transparent;
  border-style: solid dashed dashed;
  border-width: 10px;
}
</style>
