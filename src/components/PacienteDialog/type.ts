import type { CSSProperties, VNode, Component } from "vue";

type DoneFn = (cancel?: boolean) => void;
type EventType = "open" | "close" | "openAutoFocus" | "closeAutoFocus";
type ArgsType = {
  /** `cancelar` hace clic en el botón cancelar, `seguro` hace clic en el botón Aceptar, `cerrar` hace clic en el botón cerrar en la esquina superior derecha o en una página en blanco */
  command: "cancel" | "sure" | "close";
};

/** https://element-plus.org/zh-CN/component/dialog.html#attributes */
type DialogProps = {
  /** Mostrar y ocultar `Dialog` */
  visible?: boolean;
  /** Título del `Dialog` */
  title?: string;
  /** Ancho del `Dialog`, por defecto `50%` */
  width?: string | number;
  /** Si es o no pantalla completa `Dialog` (siempre será pantalla completa a menos que se cierre el cuadro emergente), por defecto `false`, sólo `fullscreen` tendrá efecto cuando `fullscreen` y `fullscreenIcon` son ambos pasados */
  fullscreen?: boolean;
  /** Mostrar o no iconos a pantalla completa, por defecto `false`, sólo `fullscreen` funcionará cuando se pasen `fullscreen` y `fullscreenIcon` */
  fullscreenIcon?: boolean;
  /** `margin-top` valor en `Dialog CSS`, por defecto `15vh` */
  top?: string;
  /** Si se requiere una capa de máscara, por defecto `true` */
  modal?: boolean;
  /** Si el propio `Dialog` se inserta o no en el elemento `body`. Los `Dialogs` anidados deben especificar este atributo y asignarle un valor `true`, el valor por defecto es `false` */
  appendToBody?: boolean;
  /** Si se bloquea el desplazamiento del `body` cuando aparece el `Dialog`, por defecto `true` */
  lockScroll?: boolean;
  /** Nombre de clase personalizado para `Dialog` */
  class?: string;
  /** Estilos personalizados para `Dialog` */
  style?: CSSProperties;
  /** Tiempo de retardo para que se abra el `Dialog`, en milisegundos, por defecto `0` */
  openDelay?: number;
  /** Tiempo de retardo para que el `Dialog` se cierre, en milisegundos, por defecto `0` */
  closeDelay?: number;
  /** Si el `Dialog` se puede cerrar pulsando `modal`, por defecto `true` */
  closeOnClickModal?: boolean;
  /** Si el `Dialog` se puede cerrar pulsando `ESC`, por defecto `true` */
  closeOnPressEscape?: boolean;
  /** Mostrar o no el botón de cerrar, por defecto `true` */
  showClose?: boolean;
  /** Un callback de pre-cierre que pausa el cierre del `Dialog`. El cierre real del diálogo se produce cuando se ejecuta el método parámetro `done` dentro de la función callback */
  beforeClose?: (done: DoneFn) => void;
  /** Habilitar arrastrar y soltar para `Dialog`, por defecto `false` */
  draggable?: boolean;
  /** Si se centran las partes `header` y `footer` del `Dialog`, por defecto `false` */
  center?: boolean;
  /** Si alinear el cuadro de diálogo horizontal o verticalmente, por defecto `false` */
  alignCenter?: boolean;
  /** Destruir elementos en `Dialog` cuando se cierra, por defecto `false` */
  destroyOnClose?: boolean;
};

type BtnClickDialog = {
  options?: DialogOptions;
  index?: number;
};
type BtnClickButton = {
  btn?: ButtonProps;
  index?: number;
};
/** https://element-plus.org/zh-CN/component/button.html#button-attributes */
type ButtonProps = {
  /** Texto del botón */
  label: string;
  /** Tamaño del botón */
  size?: "large" | "default" | "small";
  /** Tipo de botón */
  type?: "primary" | "success" | "warning" | "danger" | "info";
  /** Si el botón es un botón plano, por defecto `false` */
  plain?: boolean;
  /** Si es un botón de texto, por defecto `false` */
  text?: boolean;
  /** Si se muestra el color de fondo del botón de texto, por defecto `false` */
  bg?: boolean;
  /** Si es o no un botón de enlace, por defecto `false` */
  link?: boolean;
  /** Si el botón está redondeado o no, por defecto `false` */
  round?: boolean;
  /** Si el botón es redondo, por defecto `false` */
  circle?: boolean;
  /** Si el estado está cargado, por defecto `false` */
  loading?: boolean;
  /** Componente de icono de estado cargado personalizado */
  loadingIcon?: string | Component;
  /** Si el botón está deshabilitado, por defecto `false` */
  disabled?: boolean;
  /** Componentes de iconos */
  icon?: string | Component;
  /** Habilitar o deshabilitar la propiedad nativa `autofocus`, por defecto `false` */
  autofocus?: boolean;
  /** Atributo nativo `type`, por defecto `button` */
  nativeType?: "button" | "submit" | "reset";
  /** Inserta automáticamente un espacio entre dos caracteres chinos */
  autoInsertSpace?: boolean;
  /** Personaliza los colores de los botones y calcula automáticamente los colores tras los disparadores `hover` y `active` */
  color?: string;
  /** `dark` mode, significa establecer automáticamente `color` al color del modo `dark`, por defecto `false` */
  dark?: boolean;
  /** Etiquetado personalizado de elementos */
  tag?: string | Component;
  /** Callback activado por el clic del botón */
  btnClick?: ({
    dialog,
    button
  }: {
    /** Mensaje actual de `Dialog` */
    dialog: BtnClickDialog;
    /** Información actual del botón */
    button: BtnClickButton;
  }) => void;
};

interface DialogOptions extends DialogProps {
  /** props de los componentes del área de contenido, que pueden recibirse mediante `defineProps` */
  props?: any;
  /** Si se oculta el contenido del área de acción del botón `Dialog` */
  hideFooter?: boolean;
  /**
   * @description Renderizador de contenido personalizado para los títulos de los cuadros de diálogo
   * @see {@link https://element-plus.org/zh-CN/component/dialog.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%A4%B4%E9%83%A8}
   */
  headerRenderer?: ({
    close,
    titleId,
    titleClass
  }: {
    close: Function;
    titleId: string;
    titleClass: string;
  }) => VNode | Component;
  /** Renderizador de contenido personalizado */
  contentRenderer?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => VNode | Component;
  /** Personaliza el renderizador de contenido del área de acción del botón, que sustituye a `footerButtons` y a los botones por defecto `Cancel` y `OK` */
  footerRenderer?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => VNode | Component;
  /** Personalizar el funcionamiento del botón inferior */
  footerButtons?: Array<ButtonProps>;
  /** `Dialog` open callback */
  open?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** `Dialog` callback después de cerrar (sólo se activa al hacer clic en el botón de cierre en la esquina superior derecha o una página en blanco para cerrar la página) */
  close?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** `Dialog` Callback después de cerrar. Los valores `args` devueltos `command` son analizados: `cancel` hace clic en el botón cancelar, `sure` hace clic en el botón OK, `close` hace clic en el botón cerrar en la esquina superior derecha o en una página en blanco */
  closeCallBack?: ({
    options,
    index,
    args
  }: {
    options: DialogOptions;
    index: number;
    args: any;
  }) => void;
  /** Callback cuando el foco de entrada está en el contenido del `Dialog` */
  openAutoFocus?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** Callback cuando el foco de la entrada está fuera del foco del contenido del `Dialog` */
  closeAutoFocus?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** El callback para pulsar el botón de cancelar en la parte inferior pausa el cierre del `Dialog`. El cierre real del diálogo se produce cuando se ejecuta el método parámetro `done` dentro de la función callback */
  beforeCancel?: (
    done: Function,
    {
      options,
      index
    }: {
      options: DialogOptions;
      index: number;
    }
  ) => void;
  /** El callback para pulsar el botón OK en la parte inferior pausa el cierre del `Dialog`. El cierre real del diálogo se produce cuando se ejecuta el método del parámetro `done` dentro de la función callback */
  beforeSure?: (
    done: Function,
    {
      options,
      index
    }: {
      options: DialogOptions;
      index: number;
    }
  ) => void;
  beforeReset?: (
    done: Function,
    {
      options,
      index
    }: {
      options: DialogOptions;
      index: number;
    }
  ) => void;
}

export type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions };
