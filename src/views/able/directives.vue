<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/utils/message";

defineOptions({
  name: "Directives",
});

const search = ref("");
const searchTwo = ref("");
const searchThree = ref("");
const searchFour = ref("");
const searchFive = ref("");
const searchSix = ref("copy");
const text = ref("Texto reproducible");
const long = ref(false);
const cbText = ref("");
const idx = ref(0);

function onInput() {
  message(search.value);
}
function onInputTwo() {
  message(searchTwo.value);
}
function onInputThree({ name, sex }) {
  message(`${name}${sex}${searchThree.value}`);
}

function onInputFour() {
  message(searchFour.value);
}
function onInputFive({ name, sex }) {
  message(`${name}${sex}${searchFive.value}`);
}

function onLongpress() {
  long.value = true;
}
function onCustomLongpress() {
  long.value = true;
}
function onCbLongpress() {
  idx.value += 1;
  long.value = true;
  cbText.value = `Llamada de retorno continua ${idx.value} veces`;
}
function onReset() {
  long.value = false;
  cbText.value = "";
  idx.value = 0;
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"
          >Comandos personalizados de antivibración, interceptación, copia de texto y
          pulsación larga</span
        >
      </div>
    </template>
    <div class="mb-2">
      Comando anti-sacudida (entrada continua, sólo se ejecutará el primer evento de clic,
      inmediatamente)
      <el-input
        v-optimize="{
          event: 'input',
          fn: onInput,
          immediate: true,
          timeout: 1000,
        }"
        v-model="search"
        class="!w-[200px]"
        clearable
        @clear="onInput"
      />
    </div>
    <div class="mb-2">
      Comando anti-sacudida (entrada continua, sólo se ejecutará el último evento,
      ejecución retardada)
      <el-input
        v-optimize="{ event: 'input', fn: onInputTwo, timeout: 400 }"
        v-model="searchTwo"
        class="!w-[200px]"
        clearable
      />
    </div>
    <div>
      Instrucción antiparpadeo (entrada continua, sólo se ejecutará el último evento,
      ejecución diferida, uso pass-through)
      <el-input
        v-optimize="{
          event: 'input',
          fn: onInputThree,
          timeout: 400,
          params: { name: 'Ferdex', sex: 'Hombre' },
        }"
        v-model="searchThree"
        class="!w-[200px]"
        clearable
      />
    </div>

    <el-divider />

    <div class="mb-2">
      Orden de estrangulamiento (entrada continua, sólo se ejecutará un evento por
      segundo)
      <el-input
        v-optimize:throttle="{ event: 'input', fn: onInputFour, timeout: 1000 }"
        v-model="searchFour"
        class="!w-[200px]"
        clearable
      />
    </div>
    <div>
      Instrucciones de estrangulamiento (entrada continua, sólo se ejecutará un evento por
      segundo, uso pass-through)
      <el-input
        v-optimize:throttle="{
          event: 'input',
          fn: onInputFive,
          params: { name: 'Ferdex', sex: 'Hombre' },
        }"
        v-model="searchFive"
        class="!w-[200px]"
        clearable
      />
    </div>

    <el-divider />

    <div class="mb-2">
      Comando de copia de texto (doble clic en el contenido del cuadro de entrada para
      copiarlo)
      <el-input v-copy="searchSix" v-model="searchSix" class="!w-[200px]" />
    </div>
    <div>
      Comando de copia de texto (evento desencadenante personalizado, haga clic para
      copiar)
      <span v-copy:click="text" class="text-sky-500">{{ text }}</span>
    </div>

    <el-divider />
    <el-space wrap>
      comando de pulsación larga
      <el-button v-longpress="onLongpress">Pulsación larga (por defecto 500ms)</el-button>
      <el-button v-longpress:1000="onCustomLongpress">
        Tiempo de pulsación largo personalizado (1000 ms)
      </el-button>
      <el-button v-longpress:2000:200="onCbLongpress">
        Callback continuo cada 200ms después de 2 segundos
      </el-button>
      <el-button @click="onReset">restablecer estado</el-button>
      <el-tag :type="long ? 'success' : 'info'" class="ml-2" size="large">
        {{
          long
            ? "Estado actual de pulsación larga"
            : "Estado actual de pulsación no larga"
        }}
      </el-tag>
      <el-tag v-if="cbText" type="danger" class="ml-2" size="large">
        {{ cbText }}
      </el-tag>
    </el-space>
  </el-card>
</template>
