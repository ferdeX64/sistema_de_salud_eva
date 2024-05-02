<script setup lang="ts">
import { html } from "pinyin-pro";

defineOptions({
  name: "Pinyin",
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"
          >Hanyu Pinyin, el sistema de transliteración pinyin utilizado en la RPC desde
          los años 60</span
        >
      </div>
    </template>
    <p v-html="html('con tonos')" />
    <p class="mt-2" v-html="html('Sin tono', { toneType: 'none' })" />
    <p class="mt-2 custom" v-html="html('Estilos personalizados')" />
  </el-card>
</template>

<style lang="scss" scoped>
.custom {
  /* 汉字的样式 */
  :deep(.py-chinese-item) {
    color: #409eff;
  }

  /* 拼音的样式 */
  :deep(.py-pinyin-item) {
    color: #f56c6c;
  }
}
</style>
