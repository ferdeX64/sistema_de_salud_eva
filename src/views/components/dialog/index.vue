<script setup lang="tsx">
import { useRouter } from "vue-router";
import { h, createVNode, ref } from "vue";
import { message } from "@/utils/message";
import forms, { type FormProps } from "./form.vue";
import formPrimitive from "./formPrimitive.vue";
import { cloneDeep, debounce } from "@pureadmin/utils";
import {
  addDialog,
  closeDialog,
  updateDialog,
  closeAllDialog
} from "@/components/ReDialog";

defineOptions({
  name: "DialogPage"
});

const router = useRouter();

function onBaseClick() {
  addDialog({
    title: "Uso básico",
    contentRenderer: () => <p>Contenido del cuadro emergente - uso básico</p> // jsx 语法 （注意在.vue文件启用jsx语法，需要在script开启lang="tsx"）
  });
}

function onDraggableClick() {
  addDialog({
    title: "Arrastrar y soltar",
    draggable: true,
    contentRenderer: () => h("p", "Contenido del cuadro emergente: arrastrar y soltar") // h 渲染函数 https://cn.vuejs.org/api/render-function.html#h
  });
}

function onFullscreenClick() {
  addDialog({
    title: "Pantalla completa",
    fullscreen: true,
    contentRenderer: () => createVNode("p", null, "Contenido del cuadro emergente - pantalla completa") // createVNode 渲染函数 https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes
  });
}

function onFullscreenIconClick() {
  addDialog({
    title: "Botón de pantalla completa",
    fullscreenIcon: true,
    contentRenderer: () => <p>Contenido del cuadro emergente: botón de pantalla completa</p>
  });
}

function onModalClick() {
  addDialog({
    title: "Sin capa de máscara de fondo",
    modal: false,
    contentRenderer: () => <p>Contenido del cuadro emergente - sin capa de máscara de fondo</p>
  });
}

function onStyleClick() {
  addDialog({
    title: "Personalizar la posición de la ventana emergente",
    top: "60vh",
    style: { marginRight: "20px" },
    contentRenderer: () => <p>Contenido de la ventana emergente: posición personalizada de la ventana emergente</p>
  });
}

// 添加 600ms 防抖
const onoOpenDelayClick = debounce(
  () =>
    addDialog({
      title: "Retraso de 2 segundos para abrir el cuadro emergente",
      openDelay: 2000 - 600,
      contentRenderer: () => <p>Contenido del cuadro emergente - 2 segundos de retraso para abrir el cuadro emergente</p>
    }),
  600
);

function onCloseDelayClick() {
  addDialog({
    title: "Retraso de 2 segundos para cerrar la ventana emergente",
    closeDelay: 2000,
    contentRenderer: () => <p>Contenido del cuadro emergente - 2 segundos de retraso para cerrar el cuadro emergente</p>
  });
}

function onShowCloseClick() {
  addDialog({
    title: "No muestra el icono del botón de cierre en la esquina superior derecha",
    showClose: false,
    contentRenderer: () => <p>Contenido del cuadro emergente: no muestra el icono del botón de cierre en la esquina superior derecha.</p>
  });
}

function onBeforeCloseClick() {
  addDialog({
    title: "Prohibir el apagado mediante el teclado ESC",
    closeOnPressEscape: false,
    contentRenderer: () => <p>Contenido del cuadro emergente - desactivar el cierre mediante el teclado ESC</p>
  });
}

function onCloseOnClickModalClick() {
  addDialog({
    title: "Prohibir el cierre pulsando el modal",
    closeOnClickModal: false,
    contentRenderer: () => <p>Contenido del cuadro emergente - desactivar el cierre haciendo clic en modal</p>
  });
}

function onHideFooterClick() {
  addDialog({
    title: "Ocultar los botones Cancelar, OK en la parte inferior",
    hideFooter: true,
    contentRenderer: () => <p>Contenido del cuadro emergente - ocultar los botones de cancelación y OK en la parte inferior</p>
  });
}

function onHeaderRendererClick() {
  addDialog({
    title: "Cabecera personalizada",
    showClose: false,
    headerRenderer: ({ close, titleId, titleClass }) => (
      // jsx 语法
      <div class="flex flex-row justify-between">
        <h4 id={titleId} class={titleClass}>
          Cabecera personalizada
        </h4>
        <el-button type="danger" onClick={close}>
          Cerrar
        </el-button>
      </div>
    ),
    contentRenderer: () => <p>Contenido del cuadro emergente - cabecera personalizada</p>
  });
}

function onFooterRendererClick() {
  addDialog({
    title: "Fondo a medida",
    footerRenderer: ({ options, index }) => (
      <el-button onClick={() => closeDialog(options, index)}>
        {options.title}-{index}
      </el-button>
    ),
    contentRenderer: () => <p>Contenido del cuadro emergente - Fondo personalizado</p>
  });
}

function onFooterButtonsClick() {
  addDialog({
    title: "Botones inferiores personalizados",
    footerButtons: [
      {
        label: "Botón 1",
        size: "small",
        type: "success",
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          closeDialog(options, index);
        }
      },
      {
        label: "Botón 2",
        text: true,
        bg: true,
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          closeDialog(options, index);
        }
      },
      {
        label: "Botón 3",
        size: "large",
        type: "warning",
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          closeDialog(options, index);
        }
      }
    ],
    contentRenderer: () => <p>Contenido del cuadro emergente - Botón inferior personalizado</p>
  });
}

function onOpenClick() {
  addDialog({
    title: "Devolución de llamada tras la apertura",
    open: ({ options, index }) => message({ options, index } as any),
    contentRenderer: () => <p>Contenido de la caja emergente - callback después de abrir</p>
  });
}

function onCloseCallBackClick() {
  addDialog({
    title: "Devoluciones de llamada tras el cierre",
    closeCallBack: ({ options, index, args }) => {
      console.log(options, index, args);
      let text = "";
      if (args?.command === "cancel") {
        text = "Ha pulsado el botón de cancelación";
      } else if (args?.command === "sure") {
        text = "Ha pulsado el botón OK";
      } else {
        text = "Ha hecho clic en el botón de cierre situado en la esquina superior derecha o en una página en blanco.";
      }
      message(text);
    },
    contentRenderer: () => <p>Contenido del cuadro emergente - devolución de llamada tras el cierre</p>
  });
}

// ¡Aquí con el fin de demostrar la conveniencia de utilizar el método de escritura anidada, en la práctica, es mejor addDialog función fuera de la anidación no es deseable!
function onNestingClick() {
  addDialog({
    title: "Cuadro emergente anidado",
    contentRenderer: ({ index }) => (
      <el-button
        onClick={() =>
          addDialog({
            title: `El ${index + 1}th bullet box`,
            width: "40%",
            contentRenderer: ({ index }) => (
              <el-button
                onClick={() =>
                  addDialog({
                    title: `El ${index + 1}th bullet box`,
                    width: "30%",
                    contentRenderer: () => (
                      <>
                        <el-button round onClick={() => closeAllDialog()}>
                         Aigoo, ¿qué haces? Cierra todas las ventanas emergentes.
                        </el-button>
                      </>
                    )
                  })
                }
              >
               Haz clic para abrir la {index + 1}ésima viñeta
              </el-button>
            )
          })
        }
      >
        Haz clic para abrir la {index + 1}ésima viñeta
      </el-button>
    )
  });
}

// Escenarios que permiten cambiar el valor de los atributos propios de un cuadro emergente en el área de contenido contentRenderer
function onUpdateClick() {
  const curPage = ref(1);
  addDialog({
    title: `Página ${curPage.value}`,
    contentRenderer: () => (
      <>
        <el-button
          disabled={curPage.value > 1 ? false : true}
          onClick={() => {
            curPage.value -= 1;
            updateDialog(`Página ${curPage.value}`);
          }}
        >
          página anterior
        </el-button>
        <el-button
          onClick={() => {
            curPage.value += 1;
            updateDialog(`Página ${curPage.value}`);
          }}
        >
          página siguiente
        </el-button>
      </>
    )
  });
}

// La propiedad props recibe los props del subcomponente y les asigna un valor.
function onFormOneClick() {
  addDialog({
    width: "30%",
    title: " Combinar formularios (primera forma)",
    contentRenderer: () => forms,
    props: {
      // asignar un valor por defecto
      formInline: {
        user: "FerdeX64",
        region: "Salcedo"
      }
    },
    closeCallBack: ({ options, args }) => {
      //options.props es sensible
      const { formInline } = options.props as FormProps;
      const text = `Nombre: ${formInline.user} Ciudad: ${formInline.region}`;
      if (args?.command === "cancel") {
        // Ha pulsado el botón de cancelación
        message(`Ha pulsado el botón de cancelar y los datos actuales del formulario son ${text}.`);
      } else if (args?.command === "sure") {
        message(`Ha pulsado el botón Aceptar y los datos actuales del formulario son ${text}.`);
      } else {
        message(`Ha pulsado el botón cerrar en la esquina superior derecha o una página en blanco, los datos actuales del formulario son ${text}.`);
      }
    }
  });
}

// Combinación de formularios (segunda forma)h Funciones de renderizado https://cn.vuejs.org/api/render-function.html#h
const formInline = ref({
  user: "Monters f",
  region: "Ambato"
});
const resetFormInline = cloneDeep(formInline.value);
function onFormTwoClick() {
  addDialog({
    width: "30%",
    title: "Combinar formularios (segunda vía)",
    contentRenderer: () =>
      h(forms, {
        formInline: formInline.value
      }),
    closeCallBack: () => {
      message(
        `Los datos actuales del formulario son Nombre: ${formInline.value.user} Ciudad: ${formInline.value.region}`
      );
      // Restablecer datos del formulario
      formInline.value = cloneDeep(resetFormInline);
    }
  });
}

// Combinado con el formulario Form (tercera vía) createVNode render function https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes
const formThreeInline = ref({
  user: "Gbasnes",
  region: "Japan"
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);
function onFormThreeClick() {
  addDialog({
    width: "30%",
    title: "Combinar formularios (tercera vía)",
    contentRenderer: () =>
      createVNode(forms, {
        formInline: formThreeInline.value
      }),
    closeCallBack: () => {
      message(
        `Los datos actuales del formulario son Nombre: ${formThreeInline.value.user} Ciudad: ${formThreeInline.value.region}`
      );
      // 重置表单数据
      formThreeInline.value = cloneDeep(resetFormThreeInline);
    }
  });
}

// Utiliza la sintaxis jsx junto con un formulario Form (la cuarta forma).
// Ten en cuenta que si forms no está registrado, lo está porque contentRenderer: () => forms, h(forms), createVNode(createVNode) están registrados indirectamente arriba.
// Si sólo usas la sintaxis jsx, algo como `contentRenderer: () => <forms formInline={formFourInline.value} />` no registrará el componente forms, necesitas escribir forms en cualquier parte del `script` (preferiblemente al final).
// Del mismo modo, si utiliza `contentRenderer: () => <forms formInline={formFourInline.value} />` en un archivo tsx, no registrará el componente de formularios, necesita escribir formularios en el retorno.
const formFourInline = ref({
  user: "Price",
  region: "EEUU"
});
const resetFormFourInline = cloneDeep(formFourInline.value);
function onFormFourClick() {
  addDialog({
    width: "30%",
    title: "Combinar formularios (cuarta vía)",
    contentRenderer: () => <forms formInline={formFourInline.value} />,
    closeCallBack: () => {
      message(
        `Los datos actuales del formulario son Nombre: ${formFourInline.value.user} Ciudad: ${formFourInline.value.region}`
      );
      // 重置表单数据
      formFourInline.value = cloneDeep(resetFormFourInline);
    }
  });
}
// Subcomponente prop es una demostración de tipo primitivo.
const formPrimitiveParam = ref("Hello World");
const resetFormPrimitiveParam = ref(formPrimitiveParam.value);
function onFormPrimitiveFormClick() {
  addDialog({
    width: "30%",
    title: "El subcomponente prop es de tipo primitivo demo",
    contentRenderer: () =>
      h(formPrimitive, {
        data: formPrimitiveParam.value,
        "onUpdate:data": val => (formPrimitiveParam.value = val)
      }),
    closeCallBack: () => {
      message(`Contenido actual del formulario: ${formPrimitiveParam.value}`);
      // Restablecer datos del formulario
      formPrimitiveParam.value = resetFormPrimitiveParam.value;
    }
  });
}

function onBeforeCancelClick() {
  addDialog({
    title: "Callbacks para pulsar el botón de cancelación en la parte inferior",
    contentRenderer: () => (
      <p>Contenido de la caja emergente - callback para pulsar el botón de cancelación en la parte inferior (pausará la caja emergente para cerrarse)</p>
    ),
    beforeCancel: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      // done(); // Debe cerrarse para anular el comentario
    }
  });
}

function onBeforeSureClick() {
  addDialog({
    title: "Llamada de retorno para pulsar el botón OK en la parte inferior",
    contentRenderer: () => (
      <p>
        Contenido del cuadro emergente - haga clic en la parte inferior de la devolución de llamada botón OK (hará una pausa en el cuadro emergente para cerrar, a menudo se utiliza para añadir, editar el contenido del cuadro emergente después de la interfaz de llamada)
      </p>
    ),
    beforeSure: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      // done(); // 需要关闭把注释解开即可
    }
  });
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          Encapsulación secundaria del elemento plus
          <el-link
            href="https://element-plus.org/zh-CN/component/dialog.html"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            Dialog
          </el-link>
          El componente de cuadro emergente se llama utilizando una función (para más
          ejemplos de cómo hacerlo, consulte la sección
          <span class="cursor-pointer text-primary" @click="router.push({ name: 'Dept' })"
            >Página de administración del sistema</span
          >
          ）
        </span>
      </div>
    </template>
    <el-space wrap>
      <el-button @click="onBaseClick"> Uso básico </el-button>
      <el-button @click="onDraggableClick">Arrastrar y soltar </el-button>
      <el-button @click="onFullscreenClick"> pantalla completa </el-button>
      <el-button @click="onFullscreenIconClick"> Botón de pantalla completa </el-button>
      <el-button @click="onModalClick"> Sin capa de máscara de fondo </el-button>
      <el-button @click="onStyleClick">
        Personalizar la posición de la ventana emergente
      </el-button>
      <el-button @click="onoOpenDelayClick">
        Retraso de 2 segundos para abrir el cuadro emergente
      </el-button>
      <el-button @click="onCloseDelayClick">
        Retraso de 2 segundos para cerrar la ventana emergente
      </el-button>
      <el-button @click="onShowCloseClick">
        No muestra el icono del botón de cierre en la esquina superior derecha
      </el-button>
      <el-button @click="onBeforeCloseClick">
        Prohibir el apagado mediante el teclado ESC
      </el-button>
      <el-button @click="onCloseOnClickModalClick">
        Prohibir el cierre pulsando el modal
      </el-button>
      <el-button @click="onHideFooterClick"
        >Ocultar los botones Cancelar, OK en la parte inferior
      </el-button>
      <el-button @click="onHeaderRendererClick"> Cabecera personalizada </el-button>
      <el-button @click="onFooterRendererClick"> Fondo a medida </el-button>
      <el-button @click="onFooterButtonsClick">
        Botones inferiores personalizados
      </el-button>
      <el-button @click="onOpenClick"> Devolución de llamada tras la apertura </el-button>
      <el-button @click="onCloseCallBackClick">
        Devoluciones de llamada tras el cierre
      </el-button>
      <el-button @click="onNestingClick"> cuadro emergente anidado </el-button>
      <el-button @click="onUpdateClick">
        Modificación del valor de las propiedades propias de un cuadro emergente
      </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button @click="onFormOneClick">
        Combinación de formularios (primer enfoque)
      </el-button>
      <el-button @click="onFormTwoClick"> Combinar formularios (segunda vía) </el-button>
      <el-button @click="onFormThreeClick">
        Combinar formularios (tercera vía)
      </el-button>
      <el-button @click="onFormFourClick"> Combinar formularios (cuarta vía) </el-button>
      <el-button @click="onFormPrimitiveFormClick">
        El subcomponente prop es de tipo primitivo
      </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button @click="onBeforeCancelClick">
        Llamada de retorno para pulsar el botón de cancelación en la parte inferior (que
        detiene el cierre de la ventana emergente)
      </el-button>
      <el-button @click="onBeforeSureClick">
        Llamada de retorno para pulsar el botón OK en la parte inferior (que detiene el
        cierre del cuadro emergente, a menudo se utiliza para llamar a la interfaz después
        de añadir o editar el contenido del cuadro emergente).
      </el-button>
    </el-space>
  </el-card>
</template>
