import { ref } from "vue";
import { utils, writeFile } from "xlsx";
import { tableDataDrag } from "../data";
import { clone } from "@pureadmin/utils";
import { message } from "@/utils/message";

export function useColumns() {
  const dataList = ref(clone(tableDataDrag, true));

  const columns: TableColumnList = [
    {
      label: "ID",
      prop: "id"
    },
    {
      label: "Fecha",
      prop: "date"
    },
    {
      label: "Nombre",
      prop: "name"
    }
  ];

  const exportExcel = () => {
    const res = dataList.value.map(item => {
      const arr = [];
      columns.forEach(column => {
        arr.push(item[column.prop as string]);
      });
      return arr;
    });
    const titleList = [];
    columns.forEach(column => {
      titleList.push(column.label);
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "Ficha de datos");
    writeFile(workBook, "pure-admin-table.xlsx");
    message("Exportación correcta", {
      type: "success"
    });
  };

  return {
    columns,
    dataList,
    exportExcel
  };
}
