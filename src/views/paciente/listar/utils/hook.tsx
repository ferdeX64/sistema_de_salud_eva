import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getRoleList } from "@/api/system";
import { ElMessageBox } from "element-plus";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/PacienteDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";


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
      label: "Paciente",
      prop: "historia",
      minWidth: 120
    },
    {
      label: "N° cédula",
      prop: "ncedula",
      minWidth: 100
    },
    {
      label: "Nombre",
      prop: "name",
      minWidth: 180
    },
    {
      label: "Sexo",
      prop: "sexo",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.sexo === "Femenino" ? "danger" : "primary"}

          effect={row.sexo === "Femenino" ? "ligth" : "plain"}
        >
          {row.sexo === "Masculino" ? "Masculino" : "Femenino"}
        </el-tag>
      )
    },

    {
      label: "Creado el",
      minWidth: 180,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "Opciones",

      width: 340,
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
          message(`已${row.status === 0 ? "desactivar" : "empezar a utilizar"}${row.name}`, {
            type: "success"
          });
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
    const { data } = await getRoleList(toRaw(form));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function DialogCreatePaciente(title = "Agregar paciente", row?: FormItemProps) {
    addDialog({
      title: `${title}`,
      props: {
        formInline: {
          name: row?.name ?? ""

        }
      },
      width: "45%",
      top: "2vh",
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function notificacionAdd() {
          message(`Has agredado a ${curData.name}`, {
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
        if (!FormRef) return
        FormRef.resetFields(notificacionAdd())
      }
    });
  }

  /** Permisos de menú */
  function handleMenu() {
    message("Cuando se desarrolle la página de gestión de menús, se perfeccionará.");
  }

  /** Los permisos de datos los puede desarrollar usted mismo */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    // buttonClass,
    onSearch,
    resetForm,

    DialogCreatePaciente,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
