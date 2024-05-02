<script setup lang="tsx">
import { h } from "vue";
import { message } from "@/utils/message";
import HomeFilled from "@iconify-icons/ep/home-filled";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Segmented, { type OptionsType } from "@/components/ReSegmented";

defineOptions({
  name: "Segmented"
});

/** 基础用法 */
const optionsBasis: Array<OptionsType> = [
  {
    label: "el lunes",
    value: 1
  },
  {
    label: "Martes",
    value: 2
  },
  {
    label: "el miércoles",
    value: 3
  },
  {
    label: "jueves",
    value: 4
  },
  {
    label: "Viernes",
    value: 5
  }
];

/** 禁用 */
const optionsDisabled: Array<OptionsType> = [
  {
    label: "el lunes",
    value: 1
  },
  {
    label: "Martes",
    value: 2
  },
  {
    label: "el miércoles",
    value: 3,
    disabled: true
  },
  {
    label: "jueves",
    value: 4
  },
  {
    label: "Viernes",
    value: 5,
    disabled: true
  }
];

/** Iconos de configuración */
const optionsIcon: Array<OptionsType> = [
  {
    label: "el lunes",
    value: 1,
    icon: HomeFilled
  },
  {
    label: "Martes",
    value: 2
  },
  {
    label: "el miércoles",
    value: 3,
    icon: "terminalWindowLine"
  },
  {
    label: "jueves",
    value: 4,
    icon: "streamline-emojis:airplane"
  },
  {
    label: "Viernes",
    value: 5,
    icon: "streamline-emojis:2"
  }
];

/** Establecer sólo icono */
const optionsOnlyIcon: Array<OptionsType> = [
  {
    value: 1,
    icon: HomeFilled
  },
  {
    value: 2,
    icon: "terminalWindowLine"
  },
  {
    value: 3,
    icon: "streamline-emojis:cow-face"
  },
  {
    value: 4,
    icon: "streamline-emojis:airplane"
  },
  {
    value: 5,
    icon: "streamline-emojis:2"
  }
];

/** Renderizado personalizado */
const optionsLabel: Array<OptionsType> = [
  {
    label: () => (
      <div>
        {h(useRenderIcon(HomeFilled), {
          class: "m-auto w-[20px] h-[20px]"
        })}
        <p>el lunes</p>
      </div>
    ),
    value: 1
  },
  {
    label: () => (
      <div>
        {h(useRenderIcon("terminalWindowLine"), {
          class: "m-auto w-[20px] h-[20px]"
        })}
        <p>Martes</p>
      </div>
    ),
    value: 2
  },
  {
    label: () => (
      <div>
        {h(useRenderIcon("streamline-emojis:cow-face"), {
          class: "m-auto w-[20px] h-[20px]"
        })}
        <p>el miércoles</p>
      </div>
    ),
    value: 3
  }
];

const optionsChange: Array<OptionsType> = [
  {
    label: "el lunes",
    value: 1
  },
  {
    label: "Martes",
    value: 2
  },
  {
    label: " miércoles",
    value: 3
  }
];

/** evento de cambio */
function onChange({ index, option }) {
  const { label, value } = option;
  message(`El índice del elemento seleccionado actualmente es: ${index}, el nombre es ${label} y el valor es ${value}.`, {
    type: "success"
  });
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">Controlador de segmento</span>
      </div>
    </template>
    <p class="mb-2">uso básico</p>
    <Segmented :options="optionsBasis" />
    <el-divider />
    <p class="mb-2">Predeterminado marcado y desactivado</p>
    <Segmented :options="optionsDisabled" :defaultValue="2" />
    <el-divider />
    <p class="mb-2">Iconos de configuración</p>
    <Segmented :options="optionsIcon" />
    <el-divider />
    <p class="mb-2">Establecer sólo icono</p>
    <Segmented :options="optionsOnlyIcon" />
    <el-divider />
    <p class="mb-2">Renderizado personalizado</p>
    <Segmented :options="optionsLabel" />
    <el-divider />
    <p class="mb-2">evento de cambio</p>
    <Segmented :options="optionsChange" @change="onChange" />
    <el-divider />
  </el-card>
</template>
