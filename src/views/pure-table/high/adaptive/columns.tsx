import type {
  LoadingConfig,
  AdaptiveConfig,
  PaginationProps
} from "@pureadmin/table";
import { tableData } from "../data";
import { ref, onMounted, reactive } from "vue";
import { clone, delay } from "@pureadmin/utils";

export function useColumns() {
  const dataList = ref([]);
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      label: "Fecha",
      prop: "date"
    },
    {
      label: "Nombre",
      prop: "name"
    },
    {
      label: "Dirección",
      prop: "address"
    }
  ];

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 20,
    currentPage: 1,
    pageSizes: [20, 40, 60],
    total: 0,
    align: "right",
    background: true,
    small: false
  });

  /** 加载动画配置 */
  const loadingConfig = reactive<LoadingConfig>({
    text: "Cargando la primera páginaaa...",
    viewBox: "-10, -10, 50, 50",
    spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `,
    // svg: "",
  
    
  });

  /** Admite la configuración de la altura adaptativa de toda el área de contenido */
  const adaptiveConfig: AdaptiveConfig = {
    /**El desplazamiento de la tabla desde la parte inferior de la página, el valor por defecto es `96` */
    offsetBottom: 110
    /**Fijar o no la cabecera, el valor por defecto es `true` (si no quieres fijar la cabecera, fija fixHeader a false y fija table-layout="auto" para la tabla) */
    // fixHeader: true
    /** Tiempo de anti-sacudida al `redimensionar` la página, el valor por defecto es `60` ms */
    // timeout: 60
    /** El `z-index` de la cabecera de la tabla, que por defecto es `100`. */
    // zIndex: 100
  };

  function onSizeChange(val) {
    console.log("onSizeChange", val);
  }

  function onCurrentChange(val) {
    loadingConfig.text = `Cargando páginas ${val}...`;
    loading.value = true;
    delay(100).then(() => {
      loading.value = false;
    });
  }

  onMounted(() => {
    delay(100).then(() => {
      const newList = [];
      Array.from({ length: 6 }).forEach(() => {
        newList.push(clone(tableData, true));
      });
      newList.flat(Infinity).forEach((item, index) => {
        dataList.value.push({ id: index, ...item });
      });
      pagination.total = dataList.value.length;
      loading.value = false;
    });
  });

  return {
    loading,
    columns,
    dataList,
    pagination,
    loadingConfig,
    adaptiveConfig,
    onSizeChange,
    onCurrentChange
  };
}
