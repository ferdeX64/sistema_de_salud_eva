<script setup lang="ts">
import { ref } from "vue";
import Mint from "mint-filter";

defineOptions({
  name: "Sensitive",
});

// Diccionario personalizado de palabras sensibles
const words = ["descerebrado", "perdedor", "idiota", "tripa", "retrasado", "puta"];

const modelValue = ref();
const mint = new Mint(words);

function onInput() {
  modelValue.value = mint.filter(modelValue.value).text;
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">Filtrado de palabras sensibles</span>
      </div>
    </template>
    <div class="flex flex-wrap gap-2 my-2">
      <span>Palabras sensibles personalizadas</span>
      <el-tag
        v-for="(word, index) in words"
        :key="index"
        type="danger"
        class="mx-1"
        effect="dark"
        round
      >
        {{ word }}
      </el-tag>
    </div>
    <el-input v-model="modelValue" @input="onInput" />
    <p class="mt-2">{{ modelValue }}</p>
  </el-card>
</template>
