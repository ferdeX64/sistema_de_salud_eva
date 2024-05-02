export interface ListItem {
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  description: string;
  status?: "" | "success" | "warning" | "info" | "danger";
  extra?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
}

export const noticesData: TabItem[] = [
  {
    key: "1",
    name: "Notificación",
    list: [
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        title: "Ha recibido 12 nuevos periódicos semanales",
        datetime: "hace un año",
        description: "",
        type: "1"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title:
          "El experto en front-end que recomendó pasó la tercera ronda de entrevistas",
        datetime: "hace un año",
        description: "",
        type: "1"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
        title:
          "Esta plantilla puede distinguir entre múltiples tipos de notificación",
        datetime: "hace un año",
        description: "",
        type: "1"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title:
          "El método de procesamiento para mostrar el contenido del título después de más de una línea. Si el contenido excede 1 línea, se truncará automáticamente y se admitirá información sobre herramientas para mostrar el título completo.",
        datetime: "hace un año",
        description: "",
        type: "1"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title:
          "Los iconos de la izquierda se utilizan para distinguir diferentes tipos",
        datetime: "hace un año",
        description: "",
        type: "1"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title:
          "Los iconos de la izquierda se utilizan para distinguir diferentes tipos",
        datetime: "hace un año",
        description: "",
        type: "1"
      }
    ]
  },
  {
    key: "2",
    name: "Información",
    list: [
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "Li Bai comentó sobre ti",
        description:
          "Habrá momentos en que fuertes vientos y olas rompan, así que podrás colgar las velas y navegar a través del mar.",
        datetime: "hace un año",
        type: "2"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "Li Bai te respondió",
        description:
          "El viaje es difícil, el viaje es difícil y los caminos son divergentes, pero ahora estoy a salvo.",
        datetime: "hace un año",
        type: "2"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "título",
        description:
          "Mueva el mouse aquí para probar qué tan largos se manejarán los mensajes demasiado largos aquí. El número máximo de líneas descriptivas establecidas en este ejemplo es 2. El contenido de la descripción que exceda las 2 líneas se omitirá y el contenido completo se podrá ver a través de la información sobre herramientas ",
        datetime: "hace un año",
        type: "2"
      }
    ]
  },
  {
    key: "3",
    name: "Pendientes",
    list: [
      {
        avatar: "",
        title: "nombre de la tarea",
        description: "La tarea debe iniciarse antes del 16/11/2022 a las 20:00",
        datetime: "",
        extra: "No iniciado",
        status: "info",
        type: "3"
      },
      {
        avatar: "",
        title: "Cambio de código de emergencia de terceros",
        description:
          "Yi Punch se envió el 16 de noviembre de 2022 y la tarea de cambio de código debe completarse antes del 18 de noviembre de 2022",
        datetime: "",
        extra: "Expira",
        status: "danger",
        type: "3"
      },
      {
        avatar: "",
        title: "Examen de seguridad de la información",
        description:
          "Asigne a Xiaoxian para completar la actualización y publicarla antes del 12/12/2022",
        datetime: "",
        extra: "Tardó 8 días",
        status: "warning",
        type: "3"
      },
      {
        avatar: "",
        title: "lanzamiento de la versión vue-pure-admin",
        description: "lanzamiento de la versión vue-pure-admin",
        datetime: "",
        extra: "en progreso",
        type: "3"
      }
    ]
  }
];
