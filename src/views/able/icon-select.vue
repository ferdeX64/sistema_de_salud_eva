<script setup lang="ts">
import { ref } from "vue";
import IconSelect from "@/components/ReIcon/src/Select.vue";

defineOptions({
  name: "IconSelect",
});

const icon = ref("ep:add-location");
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">selector de iconos</span>
      </div>
    </template>
    <IconSelect v-model="icon" />
  </el-card>
</template>
