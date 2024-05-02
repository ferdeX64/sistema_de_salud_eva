import { ref } from "vue";
import pacienteDialog from "./index.vue";
import { useTimeoutFn } from "@vueuse/core";
import { withInstall } from "@pureadmin/utils";
import type {
  EventType,
  ArgsType,
  DialogProps,
  ButtonProps,
  DialogOptions
} from "./type";

const dialogStore = ref<Array<DialogOptions>>([]);

/** Abrir la ventana emergente */
const addDialog = (options: DialogOptions) => {
  const open = () =>
    dialogStore.value.push(Object.assign(options, { visible: true }));
  if (options?.openDelay) {
    useTimeoutFn(() => {
      open();
    }, options.openDelay);
  } else {
    open();
  }
};

/** Cerrar la ventana emergente */
const closeDialog = (options: DialogOptions, index: number, args?: any) => {
  dialogStore.value.splice(index, 1);
  options.closeCallBack && options.closeCallBack({ options, index, args });
};

/**
 * @description Modificación del valor de las propiedades propias de un cuadro emergente
 * @param value valor del atributo
 * @param key atributo, por defecto `title
 * @param index Índice de caja (por defecto `0`, lo que significa que sólo hay una caja, para cajas anidadas asigna `index` al valor de la propiedad de la caja que quieras cambiar)
 */
const updateDialog = (value: any, key = "title", index = 0) => {
  dialogStore.value[index][key] = value;
};

/** Cerrar todos los cuadros emergentes */
const closeAllDialog = () => {
  dialogStore.value = [];
};

/** No olvides introducirlo y registrarlo en los tres lugares siguientes, no te preocupes por registrarlo, ¡no se montará sin usar la llamada `addDialog`!
 * https://github.com/pure-admin/vue-pure-admin/blob/main/src/App.vue#L4
 * https://github.com/pure-admin/vue-pure-admin/blob/main/src/App.vue#L13
 * https://github.com/pure-admin/vue-pure-admin/blob/main/src/App.vue#L20
 */
const PacienteDialog = withInstall(pacienteDialog);

export type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions };
export {
  PacienteDialog,
  dialogStore,
  addDialog,
  closeDialog,
  updateDialog,
  closeAllDialog
};
