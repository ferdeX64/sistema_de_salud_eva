<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "ButtonPage",
});

const { VITE_PUBLIC_PATH } = import.meta.env;

const url = ref(`${VITE_PUBLIC_PATH}html/button.html`);
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"
          >Introducción de una página de botones a través de un iframe</span
        >
      </div>
    </template>
    <iframe :src="url" frameborder="0" class="iframe w-full h-[60vh]" />
  </el-card>
</template>
