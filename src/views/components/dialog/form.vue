<script setup lang="ts">
import { ref } from "vue";

// Declarar el tipo props
export interface FormProps {
  formInline: {
    user: string;
    region: string;
  };
}

// Declarar accesorios por defecto
// Lecturas recomendadas:https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({ user: "", region: "" }),
});

// Vue requiere que todas las props sigan el principio de vinculación unidireccional, y lanza una advertencia cuando se modifica una prop directamente. La forma en que está escrito aquí es sólo para eliminar la advertencia.
// Porque una ref sobre un objeto reactivo devuelve un objeto Ref con el valor del objeto reactivo pasado, // es decir, newFormInline === props.
// es decir, newFormInline === props.formInline es verdadero, por lo que el efecto de este código sigue siendo modificar props.formInline directamente.
// Pero esto sólo funciona si props.formInline es un tipo objeto; ¡los tipos primitivos lanzan eventos!
// Lectura recomendada: https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline = ref(props.formInline);
</script>

<template>
  <el-form :model="newFormInline">
    <el-form-item label="Nombres">
      <el-input
        class="!w-[220px]"
        v-model="newFormInline.user"
        placeholder="Introduzca su nombre"
      />
    </el-form-item>
    <el-form-item label="Municipios">
      <el-select
        class="!w-[220px]"
        v-model="newFormInline.region"
        placeholder="Seleccione una ciudad"
      >
        <el-option label="Shanghai" value="Shanghai" />
        <el-option label="Zhejiang" value="Zhejiang" />
        <el-option label="Shenzhen" value="Shenzhen" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
