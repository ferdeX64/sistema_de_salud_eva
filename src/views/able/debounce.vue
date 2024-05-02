<script setup lang="ts">
import { message } from "@/utils/message";
import { debounce, throttle } from "@pureadmin/utils";

defineOptions({
  name: "Debounce",
});

const handle = () =>
  message("Enhorabuena. Éste es un mensaje de éxito.", { type: "success" });

const immediateDebounce = debounce(handle, 1000, true);

const debounceClick = debounce(handle, 1000);

const throttleClick = throttle(handle);
</script>

<template>
  <div>
    <el-card class="mb-5" shadow="never">
      <template #header>
        <div>Anti-sacudida: debounce</div>
      </template>
      <div class="mb-5">
        Por dithering, entendemos que la función sólo puede ejecutarse una vez en un plazo
        de n segundos después de desencadenarse el evento, y si el evento vuelve a
        desencadenarse en un plazo de n segundos se vuelve a disparar el evento, se
        recalculará el tiempo de ejecución de la función.
      </div>
      <el-button @click="immediateDebounce">
        Los clics sucesivos sobre mí sólo ejecutarán inmediatamente el evento del primer
        clic
      </el-button>
      <el-button @click="debounceClick">
        Los clics continuos sobre mí sólo ejecutarán el último evento de clic, ejecución
        retardada
      </el-button>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <div>Acelerador: acelerador</div>
      </template>
      <div class="mb-5">
        Por estrangulamiento entendemos desencadenar eventos consecutivamente pero
        ejecutar la función sólo una vez en n segundos la función sólo se ejecuta una vez.
        El estrangulamiento diluye la frecuencia de ejecución de la función.
      </div>
      <el-button @click="throttleClick">
        Al hacer clic continuamente en mí sólo se ejecutará un evento de clic por segundo
      </el-button>
    </el-card>
  </div>
</template>
