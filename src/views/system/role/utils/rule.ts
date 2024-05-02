import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "El nombre del rol es obligatorio", trigger: "blur" }],
  code: [{ required: true, message: "Es necesario identificar el papel", trigger: "blur" }]
});
