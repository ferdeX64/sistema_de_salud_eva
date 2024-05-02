import { isString, isEmpty } from "@pureadmin/utils";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import {
  useRouter,
  useRoute,
  type LocationQueryRaw,
  type RouteParamsRaw
} from "vue-router";
import dayjs from "dayjs";

import { message } from "@/utils/message";
import { getDiagnosticoList, getPrescripcionList, getCIEList } from "@/api/system";
import { ElMessageBox } from "element-plus";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/PacienteDialog";
import { type FormItemProps } from "../../detalles/components/types/diagnostico";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import editForm from "../components/forms/addDiagnostico.vue";
import prescripcionForm from "../components/forms/prescripcion.vue";



export function useDetail() {
  const route = useRoute();
  const router = useRouter();
  const getParameter = isEmpty(route.params) ? route.query : route.params;

  function toDetail(
    parameter: LocationQueryRaw | RouteParamsRaw,
    model: "query" | "params"
  ) {
    // ⚠️ Preste especial atención aquí, porque vue-router lo convertirá automáticamente en un tipo de cadena al analizar los parámetros de enrutamiento. Por ejemplo, cuando use useRoute().route.query o useRoute().route.params, los parámetros obtenidos serán es un tipo de cadena
    // Por lo tanto, al pasar parámetros, si los parámetros son de tipo numérico, debe llamar a toString() aquí para asegurarse de que los parámetros pasados ​​sean consistentes con los tipos de parámetros de enrutamiento, que son cadenas. ¡Este es un enlace esencial! !！
    Object.keys(parameter).forEach(param => {
      if (!isString(parameter[param])) {
        parameter[param] = parameter[param].toString();
      }
    });
    if (model === "query") {
      // Guardar información en la pestaña
      useMultiTagsStoreHook().handleTags("push", {
        path: `/pacientes/detalles-atencion`,
        name: "AtencionPacientes",
        query: parameter,
        meta: {
          title: "Atención al paciente: " + parameter.id,
          // Si está utilizando una versión simplificada no internacionalizada del título, puede escribirlo de la siguiente manera
          // title: `No.${index} - 详情信息`,
          // Número máximo de pestañas abiertas
          dynamicLevel: 3
        }
      });
      // Salto de ruta
      router.push({ name: "AtencionPacientes", query: parameter });
    } else if (model === "params") {
      useMultiTagsStoreHook().handleTags("push", {
        path: `/pacientes/detalles-atencion/:id`,
        name: "AtencionPacientes",
        params: parameter,
        meta: {
          title: "Atención a: " + parameter.name
        }
      });
      router.push({ name: "AtencionPacientes", params: parameter });
    }
  }

  // Se utiliza para actualizar la página, volver a obtener los parámetros de la barra de direcciones del navegador y guardarlos en la página de pestañas.
  const initToDetail = (model: "query" | "params") => {
    if (getParameter) toDetail(getParameter, model);
  };

  return { toDetail, initToDetail, getParameter, router };
}

export function useRole() {
  const form = reactive({
    name: "",
    code: "",
    status: "",
    sexo: "",
    ncedula: ""
  });
  const formRef = ref();
  const dataList = ref([]);
  const dataDiagnostico = ref([]);

  const dataPrescripcionList = ref([]);

  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "Diagnóstico",
      prop: "diagnostico",
      minWidth: 175
    },
    {
      label: "Observación",
      prop: "observacion",
      minWidth: 175
    },

    {
      label: "Estado",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.status === 1 ? "danger" : "primary"}
          effect={row.status === 1 ? "ligth" : "plain"}
        >
          {row.status === 1 ? "Enfermo" : "Curado"}
        </el-tag>
      )
    },

    {
      label: "Detectado",
      minWidth: 100,
      prop: "createTime",
      formatter: ({ createTime }) => dayjs(createTime).format("YYYY-MM-DD")
    },
    {
      label: "Opciones",

      width: 225,
      slot: "operation"
    }
  ];
  // const buttonClass = computed(() => {
  //   return [
  //     "!h-[20px]",
  //     "reset-margin",
  //     "!text-gray-500",
  //     "dark:!text-white",
  //     "dark:hover:!text-primary"
  //   ];
  // });

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `reconocen que<strong>${row.status === 0 ? "desactivar" : "empezar a utilizar"
      }</strong><strong style='color:var(--el-color-primary)'>${row.name
      }</strong>? `,
      "Alerta del sistema",
      {
        confirmButtonText: "defina",
        cancelButtonText: "anulaciones",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message(
            `已${row.status === 0 ? "desactivar" : "empezar a utilizar"}${row.name
            }`,
            {
              type: "success"
            }
          );
        }, 300);
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  function handleDelete(row) {
    message(`Has borrado a ${row.name}s`, { type: "error" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getCIEList(toRaw(form));
    dataList.value = data.list;

    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  async function diagnosticTable() {
    const { data } = await getDiagnosticoList(toRaw(form));
    dataDiagnostico.value = data.list;
  }
  async function onSearchPrescripcion() {
    loading.value = true;
    const { data } = await getPrescripcionList(toRaw(form));

    dataPrescripcionList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  const columnsPrescripcion: TableColumnList = [
    {
      label: "Medicinas",
      prop: "medicina",
      minWidth: 115
    },

    {
      label: "Indicaciones",
      prop: "indicaciones",
      minWidth: 120
    },
    {
      label: "Cantidad",
      prop: "cantidad",
      minWidth: 70
    },

    {
      label: "Estado",
      prop: "status",
      minWidth: 110,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.status === 0 ? "danger" : "primary"}
          effect={row.status === 0 ? "ligth" : "plain"}
        >
          {row.status === 1 ? "Activo" : "Cancelado"}
        </el-tag>
      )
    },

    {
      label: "Prescrito ",
      minWidth: 100,
      prop: "createTime",
      formatter: ({ createTime }) => dayjs(createTime).format("YYYY-MM-DD")
    },
    {
      label: "Opciones",

      width: 225,
      slot: "operation"
    }
  ];

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };
  function DialogAddDiagnostico(
    title = "Agregar diagnóstico",
    row?: FormItemProps
  ) {
    addDialog({
      title: `${title}`,
      props: {
        formInline: {
          diag_name: row?.diag_name.substring(0, 4) ?? ""
        }
      },
      width: "35%",
      draggable: true,

      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function notificacionAdd() {
          message(`Has agredado ${curData.diag_name.substring(0, 4)}`, {
            type: "success"
          });
          done(); // Cerrar elemento emergente
          onSearch(); // Actualizar datos de la tabla
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // Se pasó la verificación de la regla de formulario
            if (title === "adicional") {
              // En el desarrollo real, primero llame a la nueva interfaz y luego realice las siguientes operaciones
              notificacionAdd();
            } else {
              //En el desarrollo real, primero llame a la interfaz de edición y luego realice las siguientes operaciones
              notificacionAdd();
            }
          }
        });
      },
      beforeReset: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        function notificacionAdd() {
          message(`Formulario reiniciado`, {
            type: "warning"
          });
        }
        if (!FormRef) return;
        FormRef.resetFields(notificacionAdd());
      }
    });
  }
  function DialogAddPrescripcion(
    title = "Agregar prescripción",
    row?: FormItemProps
  ) {
    addDialog({
      title: `${title}`,
      props: {
        formInline: {
          diag_name: row?.diag_name ?? ""
        }
      },
      width: "35%",
      draggable: true,

      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(prescripcionForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function notificacionAdd() {
          message(`Has agredado ${curData.diag_name}`, {
            type: "success"
          });
          done(); // Cerrar elemento emergente
          onSearch(); // Actualizar datos de la tabla
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // Se pasó la verificación de la regla de formulario
            if (title === "adicional") {
              // En el desarrollo real, primero llame a la nueva interfaz y luego realice las siguientes operaciones
              notificacionAdd();
            } else {
              //En el desarrollo real, primero llame a la interfaz de edición y luego realice las siguientes operaciones
              notificacionAdd();
            }
          }
        });
      },
      beforeReset: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        function notificacionAdd() {
          message(`Formulario reiniciado`, {
            type: "success"
          });
        }
        if (!FormRef) return;
        FormRef.resetFields(notificacionAdd());
      }
    });
  }
  function Save() {
    message("Atención agregada revisa el historial", { type: "success" });
  }
  function PDF() {
    message("Visor de pdf abierto", { type: "warning" });
  }


  function Imprimir() {
    message("Imprimiendo", { type: "info" });
  }
  function Receta() {
    message("Receta generada", { type: "warning" });
  }
  function Descargar() {
    message("Descargando", { type: "info" });
  }

  /** Permisos de menú */
  function handleMenu() {
    message(
      "Cuando se desarrolle la página de gestión de menús, se perfeccionará."
    );
  }


  /** Los permisos de datos los puede desarrollar usted mismo */
  // function handleDatabase() {}

  onMounted(() => {
    console.log("montado");
    onSearch();
    onSearchPrescripcion();
    diagnosticTable();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    dataDiagnostico,
    dataPrescripcionList,
    pagination,
    columnsPrescripcion,
    // buttonClass,
    onSearch,
    resetForm,
    onSearchPrescripcion,
    DialogAddDiagnostico,
    DialogAddPrescripcion,
    handleMenu,
    handleDelete,
    // handleDatabase,
    Descargar,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    Save,
    PDF,
    Imprimir,
    Receta
  };
}
