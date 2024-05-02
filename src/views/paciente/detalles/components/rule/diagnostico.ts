import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** Validación personalizada de reglas de formulario */
export const formRules = reactive(<FormRules>{

  diag_name: [{ required: true, message: "El nombre es obligatorio", trigger: "blur" },
 ],

  diag_date: [{ required: true, message: "La fecha es obligatoria", trigger: "change" },
  ],
  diag_status: [{ required: true, message: "El estado civil es obligatorio", trigger: "change" },
  ],

  diag_observacion: [{ required: true, message: "La dirección es obligatoria", trigger: "blur" },
  { min: 1, max: 135, message: "Debe ingresar mas de 5 caracteres", trigger: "blur" },],
});
