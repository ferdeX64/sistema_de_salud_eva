import Adaptive from "./adaptive/index.vue";
import Page from "./page/index.vue";
import RowDrag from "./drag/row/index.vue";
import ColumnDrag from "./drag/column/index.vue";
import Contextmenu from "./contextmenu/index.vue";
import Excel from "./excel/index.vue";
import Edit from "./edit/index.vue";
import Watermark from "./watermark/index.vue";
import Print from "./prints/index.vue";
import Echarts from "./echarts/index.vue";
import TableSelect from "./table-select/index.vue";

const rendContent = (val: string) =>
  `Directorio：src/views/pure-table/high/${val}/index.vue`;

export const list = [
  {
    key: "adaptive",
    content: rendContent("adaptive"),
    title: "Altura del área de contenido adaptable",
    component: Adaptive
  },
  {
    key: "page",
    content: rendContent("page"),
    title: "Paginación, animación de carga, columnas dinámicas",
    component: Page
  },
  {
    key: "tableSelect",
    content: rendContent("table-select"),
    title: "Selector de mesa",
    component: TableSelect
  },
  {
    key: "rowDrag",
    content: rendContent("drag/row"),
    title: "Arrastrar y soltar tablas (arrastre de filas)",
    component: RowDrag
  },
  {
    key: "columnDrag",
    content: rendContent("drag/column"),
    title: "Arrastrar y soltar tablas (arrastrar y soltar columnas)",
    component: ColumnDrag
  },
  {
    key: "contextmenu",
    content: rendContent("contextmenu"),
    title: "Menú contextual",
    component: Contextmenu
  },
  {
    key: "edit",
    content: rendContent("edit"),
    title: "Edición celular",
    component: Edit
  },
  {
    key: "excel",
    content: rendContent("excel"),
    title: "Exportar excel",
    component: Excel
  },
  {
    key: "print",
    content: rendContent("print"),
    title: "Imprimible",
    component: Print
  },
  {
    key: "watermark",
    content: rendContent("watermark"),
    title: "Marcas de agua (marcas de agua que no se pueden eliminar oh 🤓️)",
    component: Watermark
  },
  {
    key: "echarts",
    content: rendContent("echarts"),
    title: "Gráficos Echarts incrustados",
    component: Echarts
  }
];
