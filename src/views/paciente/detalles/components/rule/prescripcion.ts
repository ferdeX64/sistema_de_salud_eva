import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** Validación personalizada de reglas de formulario */
export const formRules = reactive(<FormRules>{
  medicina: [
    { required: true, message: "El nombre es obligatorio", trigger: "blur" },
    {
      min: 3,
      max: 55,
      message: "Debe ingresar mas de 3 caracteres",
      trigger: "change"
    }
  ],
  indicaciones: [
    {
      required: true,
      message: "La indicación es obligatoria",
      trigger: "blur"
    },
    {
      min: 7,
      max: 135,
      message: "Debe ingresar mas de 3 caracteres",
      trigger: "blur"
    }
  ],

  cantidad: [
    {
      required: true,
      message: "La cantidad es obligatoria",
      trigger: "change"
    },

    { type: "number", message: "Debe ingresar un numero", trigger: "change" }
  ],
  status: [
    {
      required: true,
      message: "El estado es obligatorio",
      trigger: "change"
    }
  ],
  fecha: [
    { required: true, message: "La fecha es obligatoria", trigger: "change" }
  ]
});
