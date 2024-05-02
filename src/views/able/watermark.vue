<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useWatermark } from "@pureadmin/utils";

defineOptions({
  name: "WaterMark",
});

const local = ref();
const preventLocal = ref();
const color = ref("#409EFF");
const value = ref("vue-pure-admin");
const { setWatermark, clear } = useWatermark();
const { setWatermark: setLocalWatermark, clear: clearLocal } = useWatermark(local);
const { setWatermark: setPreventLocalWatermark } = useWatermark(preventLocal);

onMounted(() => {
  nextTick(() => {
    setPreventLocalWatermark("Marcas de agua que no se pueden eliminar", {
      forever: true,
      width: 187,
      height: 80,
    });
  });
});

onBeforeUnmount(() => {
  // Elimina la marca de agua de toda la página al salir de ella
  clear();
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          Función de marca de agua de la página (cambie el tema de la plataforma a blanco
          brillante para observar que el efecto de marca de agua es más obvio Oh)
        </span>
      </div>
    </template>
    <span> Introduzca el valor para el que desea crear la marca de agua:</span>
    <el-input class="mb-4 mr-4" style="width: 200px" v-model="value" clearable />
    <span>Seleccione el color en el que desea crear la marca de agua：</span>
    <el-color-picker v-model="color" show-alpha />
    <br />
    <el-button @click="setWatermark(value, { fillStyle: color })">
      Crear una marca de agua a toda página
    </el-button>
    <el-button
      @click="
        setWatermark(value, {
          gradient: [
            { value: 0, color: 'magenta' },
            { value: 0.5, color: 'blue' },
            { value: 1.0, color: 'red' },
          ],
        })
      "
    >
      Crear una marca de agua degradada a toda página
    </el-button>
    <el-button
      @click="
        setWatermark(value, {
          rotate: 0,
          gradient: [
            { value: 0, color: 'magenta' },
            { value: 0.5, color: 'blue' },
            { value: 1.0, color: 'red' },
          ],
        })
      "
    >
      Cree un degradado a toda página con una marca de agua horizontal de 90 grados.
    </el-button>
    <el-button
      @click="
        setWatermark(value, {
          gradient: [
            { value: 0, color: 'magenta' },
            { value: 0.5, color: 'blue' },
            { value: 1.0, color: 'red' },
          ],
          shadowConfig: [20],
        })
      "
    >
      Crear una marca de agua degradada a toda página con sombras
    </el-button>
    <el-button
      @click="
        setWatermark(value, {
          globalAlpha: 0.15, // Cuanto menor sea el valor, más transparente
          gradient: [
            { value: 0, color: 'magenta' },
            { value: 0.5, color: 'blue' },
            { value: 1.0, color: 'red' },
          ],
        })
      "
    >
      Cree una marca de agua de degradado muy transparente a toda página
    </el-button>
    <el-button @click="clear">Eliminar la marca de agua a toda página</el-button>

    <div
      ref="local"
      class="mt-4 mb-4 w-[1080px] h-[400px] border-dotted border-2 border-sky-500"
    />
    <el-button
      @click="
        setLocalWatermark('marca de agua local', {
          fillStyle: color,
          width: 140,
          height: 60,
        })
      "
    >
      Crear una marca de agua local
    </el-button>
    <el-button
      @click="
        setLocalWatermark('marca de agua local', {
          width: 140,
          height: 60,
          gradient: [
            { value: 0, color: 'magenta' },
            { value: 0.5, color: 'blue' },
            { value: 1.0, color: 'red' },
          ],
        })
      "
    >
      Crear una marca de agua de gradiente local
    </el-button>
    <el-button
      @click="
        setLocalWatermark('marca de agua local', {
          width: 140,
          height: 56.5,
          rotate: 0,
          gradient: [
            { value: 0, color: 'magenta' },
            { value: 0.5, color: 'blue' },
            { value: 1.0, color: 'red' },
          ],
        })
      "
    >
      Creación de una marca de agua con un degradado local y 90 grados en horizontal
    </el-button>
    <el-button
      @click="
        setLocalWatermark('marca de agua local', {
          width: 140,
          height: 56.5,
          gradient: [
            { value: 0, color: 'magenta' },
            { value: 0.5, color: 'blue' },
            { value: 1.0, color: 'red' },
          ],
          shadowConfig: [20],
        })
      "
    >
      Creación de marcas de agua con degradados locales y sombras
    </el-button>
    <el-button @click="clearLocal">Eliminar marcas de agua localizadas</el-button>

    <div
      ref="preventLocal"
      class="mt-4 mb-4 w-[1080px] h-[400px] border-dotted border-2 border-indigo-500"
    />
  </el-card>
</template>
