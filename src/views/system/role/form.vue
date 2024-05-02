<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    code: "",
    remark: "",
    cedu:""
  }),
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form ref="ruleFormRef" :model="newFormInline" :rules="formRules" label-width="82px">
    <el-form-item label="nombre del personaje" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="Introduzca el nombre del personaje"
      />
    </el-form-item>

    <el-form-item label="identidad de la persona" prop="code">
      <el-input
        v-model="newFormInline.code"
        clearable
        placeholder="Introduzca la identificación de la función"
      />
    </el-form-item>

    <el-form-item label="nota">
      <el-input
        v-model="newFormInline.remark"
        placeholder="Introduzca una nota"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
