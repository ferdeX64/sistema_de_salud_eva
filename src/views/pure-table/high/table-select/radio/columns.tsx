import { message } from "@/utils/message";
import { tableDataEdit } from "../../data";
import { ref, reactive, type Ref } from "vue";
import type { PaginationProps } from "@pureadmin/table";

export function useColumns(selectRef: Ref) {
  const selectValue = ref("");
  const columns: TableColumnList = [
    {
      label: "ID",
      prop: "id",
      width: 80
    },
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

  /** Configuración de buscapersonas */
  const pagination = reactive<PaginationProps>({
    pageSize: 5,
    currentPage: 1,
    layout: "prev, pager, next",
    total: tableDataEdit.length,
    background: true,
    small: true
  });

  /** Resaltar la fila actualmente seleccionada */
  function rowStyle({ row: { name } }) {
    return {
      cursor: "pointer",
      background: name === selectValue.value ? "#f5f7fa" : ""
    };
  }

  /** clic de línea */
  function onRowClick(row) {
    selectValue.value = row.name;
    selectRef.value.blur();
    message(`Los datos de la fila actualmente seleccionada son: ${JSON.stringify(row)}`, { type: "success" });
  }

  return {
    columns,
    pagination,
    selectValue,
    tableDataEdit,
    rowStyle,
    onRowClick
  };
}
