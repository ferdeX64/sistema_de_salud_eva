<script setup lang="ts">
import { reactive, ref, onMounted, toRaw } from "vue";

import { FormProps } from "../types/prescripcion";
import { formRules } from "../rule/prescripcion";
import { useRole } from "../../utils/hook";
const { dataPrescripcionList } = useRole();

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    value: "",
    medicina: "",
    fecha: 0,
    indicaciones: "",
    cantidad: 0,
    status: 0,
  }),
});
const ruleFormRef = ref();

const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({
  getRef,
});
interface LinkItem {
  fecha: number,
  value: string,
  medicina: string,
  cantidad: number,
  indicaciones: string,
  status: number
}


let timeout: ReturnType<typeof setTimeout>;
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? dataPrescripcionList.value.filter(createFilter(queryString))
    : dataPrescripcionList.value;
  console.log(dataPrescripcionList.value);

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 800 * Math.random());
};
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const handleSelect = (item: Record<string, any>) => {
  console.log(item.observacion);
  console.log([, , ,].length);
};
</script>
<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="200px"
    class="demo-ruleForm"
    status-icon
    :inline="true"
  >
    <el-form-item label="Nombre del medicamento:" prop="medicina">
      <el-autocomplete
        class="!w-[280px]"
        clearable
        :trigger-on-focus="false"
        v-model="newFormInline.medicina"
        :fetch-suggestions="querySearchAsync"
        placeholder="Ingrese el nombre"
        @select="handleSelect"
      >
        <template #loading>
          <el-icon class="is-loading">
            <svg class="circular" viewBox="0 0 20 20">
              <g
                class="path2 loading-path"
                stroke-width="0"
                style="animation: none; stroke: none"
              >
                <circle r="3.375" class="dot1" rx="0" ry="0" />
                <circle r="3.375" class="dot2" rx="0" ry="0" />
                <circle r="3.375" class="dot4" rx="0" ry="0" />
                <circle r="3.375" class="dot3" rx="0" ry="0" />
              </g>
            </svg>
          </el-icon>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="Indicación:" prop="indicaciones">
        <el-input
          v-model="newFormInline.indicaciones"
          type="textarea"
          class="!w-[280px]"
        />
      </el-form-item>
      <el-form-item label="Cantidad:" prop="cantidad">
        <el-input
          placeholder="Ingrese la cantidad"
          v-model.number="newFormInline.cantidad"
          class="!w-[280px]"
        ></el-input>
      </el-form-item>
    

    <el-form-item label="Estado:" prop="status">
      <el-select
        placeholder="Seleccione el estado"
        v-model="newFormInline.status"
        class="!w-[280px]"
      >
        <el-option label="Activo" value="1" />
        <el-option label="Cancelado" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="Fecha de prescripción:" prop="fecha">
        <el-date-picker
          class="!w-[280px]"
          v-model="newFormInline.fecha"
          type="datetime"
          placeholder="Selecciona un dia"
        />
      </el-form-item>

    
  </el-form>
</template>

<style lang="scss" scoped>
.header-icon {
  margin-right: 10px;
  margin-left: 10px;
}

.header-icon2 {
  margin-right: 10px;
  margin-left: 20px;
}

.circular {
  display: flex;
  height: 100%;
  width: 100%;
  animation: loading-rotate 2s linear infinite;
}

.loading-path .dot1 {
  transform: translate(3.75px, 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
}

.loading-path .dot2 {
  transform: translate(calc(100% - 3.75px), 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.4s;
}

.loading-path .dot3 {
  transform: translate(3.75px, calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 1.2s;
}

.loading-path .dot4 {
  transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.8s;
}

@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

@keyframes custom-spin-move {
  to {
    opacity: 1;
  }
}
</style>
../types/diagnostico
