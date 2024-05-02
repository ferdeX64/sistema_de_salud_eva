import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** Validación personalizada de reglas de formulario */
export const formRules = reactive(<FormRules>{
  cedula: [
    {
      required: true,
      message: "El número de cédula es obligatorio",
      trigger: "change"
    },
    {
      min: 10,
      max: 10,
      message: "Debe ingresar 10 caracteres",
      trigger: "blur"
    }
  ],
  name: [
    { required: true, message: "El nombre es obligatorio", trigger: "change" },
    {
      min: 3,
      max: 35,
      message: "Debe ingresar mas de 3 caracteres",
      trigger: "blur"
    }
  ],
  sex: [
    {
      required: true,
      message: "Seleccionar el sexo es obligatorio",
      trigger: "change"
    }
  ],
  ndate: [
    { required: true, message: "La fecha es obligatoria", trigger: "change" }
  ],
  civil_status: [
    {
      required: true,
      message: "El estado civil es obligatorio",
      trigger: "change"
    }
  ],
  ocupation: [
    {
      required: true,
      message: "La ocupación es obligatoria",
      trigger: "change"
    }
  ],
  address: [
    { required: true, message: "La dirección es obligatoria", trigger: "blur" },
    {
      min: 7,
      max: 135,
      message: "Debe ingresar mas de 3 caracteres",
      trigger: "blur"
    }
  ],
  phone: [
    { required: true, message: "El celular es obligatorio", trigger: "change" },
    {
      validator: (rule, value, callback) => {
        console.log(value);
        if (value === "") {
          callback();
        } else if (value.toString().length < 9) {
          callback(new Error("Ingrese 9 dígitos"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    },
    { type: "number", message: "Debe ingresar un numero", trigger: "change" }
  ],
  email: [
    {
      required: true,
      message: "La dirección de email es obligatoria",
      trigger: "blur"
    },
    {
      type: "email",
      message: "Ingrese una dirección de email correcta",
      trigger: ["blur", "change"]
    }
  ],
  status: [
    { required: true, message: "El estado es obligatorio", trigger: "change" }
  ]
});
