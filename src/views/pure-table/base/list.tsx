import Base from "./base.vue";
import Stripe from "./stripe.vue";
import Border from "./border.vue";
import Status from "./status.vue";
import FixHeader from "./fixHeader.vue";
import FixColumn from "./fixColumn.vue";
import FluidHeight from "./fluidHeight.vue";
import GroupHeader from "./groupHeader.vue";
import Radio from "./radio.vue";
import MultipleChoice from "./multipleChoice.vue";
import Sortable from "./sortable.vue";
import Filters from "./filters.vue";
import ColumnTemplate from "./column-template/index.vue";
import HeaderRenderer from "./header-renderer/index.vue";
import Expand from "./expand.vue";
import TreeTable from "./tree.vue";
import TotalRow from "./totalRow.vue";
import Merge from "./merge.vue";
import CustomIndex from "./customIndex.vue";
import Layout from "./layout.vue";
import NestProp from "./nestProp.vue";
import ImgPreview from "./imgPreview.vue";

const rendContent = (val: string) =>
  `Localización：src/views/pure-table/base/${val}.vue`;

export const list = [
  {
    key: "base",
    content: rendContent("base"),
    title: "Formularios básicos",
    component: Base
  },
  {
    key: "stripe",
    content: rendContent("stripe"),
    title: "Formas con rayas de cebra",
    component: Stripe
  },
  {
    key: "border",
    content: rendContent("border"),
    title: "Mesa con bordes",
    component: Border
  },
  {
    key: "status",
    content: rendContent("status"),
    title: "Con tabla de estado",
    component: Status
  },
  {
    key: "fixHeader",
    content: rendContent("fixHeader"),
    title: "Cabezal de contador fijo",
    component: FixHeader
  },
  {
    key: "fixColumn",
    content: rendContent("fixColumn"),
    title: "Columna fija",
    component: FixColumn
  },
  {
    key: "fixColumnHeader",
    content: rendContent("fixColumn"),
    title: "Columnas y encabezados de tabla fijos",
    component: () => <FixColumn height={"360"} />
  },
  {
    key: "groupHeader",
    content: rendContent("groupHeader"),
    title: "Cabeceras multinivel (agrupación de cabeceras)",
    component: GroupHeader
  },
  {
    key: "fluidHeight",
    content: rendContent("fluidHeight"),
    title: "Altura del fluido",
    component: FluidHeight
  },
  {
    key: "radio",
    content: rendContent("radio"),
    title: "Elección única",
    component: Radio
  },
  {
    key: "multipleChoice",
    content: rendContent("multipleChoice"),
    title: "Selección múltiple",
    component: MultipleChoice
  },
  {
    key: "sortable",
    content: rendContent("sortable"),
    title: "Clasificación y formato",
    component: Sortable
  },
  {
    key: "filters",
    content: rendContent("filters"),
    title: "Cribado",
    component: Filters
  },
  {
    key: "column-template",
    content: rendContent("column-template/index"),
    title: "Plantillas de columnas personalizadas",
    component: ColumnTemplate
  },
  {
    key: "header-renderer",
    content: rendContent("header-renderer/index"),
    title: "Encabezados de tabla personalizados",
    component: HeaderRenderer
  },
  {
    key: "expand",
    content: rendContent("expand"),
    title: "Realizar una tarea",
    component: Expand
  },
  {
    key: "tree",
    content: rendContent("tree"),
    title: "Datos del árbol y carga lenta",
    component: TreeTable
  },
  {
    key: "totalRow",
    content: rendContent("totalRow"),
    title: "Total de filas al final de la tabla",
    component: TotalRow
  },
  {
    key: "merge",
    content: rendContent("merge"),
    title: "Fusionar filas o columnas",
    component: Merge
  },
  {
    key: "customIndex",
    content: rendContent("customIndex"),
    title: "Indexación personalizada",
    component: CustomIndex
  },
  {
    key: "layout",
    content: rendContent("layout"),
    title: "Disposición de la mesa",
    component: Layout
  },
  {
    key: "nestProp",
    content: rendContent("nestProp"),
    title: "Múltiples formatos de datos (estructura profunda)",
    component: NestProp
  },
  {
    key: "imgPreview",
    content: rendContent("imgPreview"),
    title: "Vista previa de la imagen",
    component: ImgPreview
  }
];
