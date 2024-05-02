import { message } from "@/utils/message";
import { tableData } from "../data";
import { ref, computed } from "vue";

// 如果您不习惯tsx写法，可以传slot，然后在template里写
// 需是hooks写法（函数中有return），避免失去响应性
export function useColumns() {
  const search = ref("");
  const filterTableData = computed(() =>
    tableData.filter(
      data =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase())
    )
  );

  const handleEdit = (index: number, row) => {
    message(`Ha editado la fila ${index}, los datos son：${JSON.stringify(row)}`, {
      type: "success"
    });
  };

  const handleDelete = (index: number, row) => {
    message(`Ha eliminado la fila ${index}, los datos son：${JSON.stringify(row)}`);
  };

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
    },
    {
      align: "right",
      // 自定义表头
      headerRenderer: () => (
        <el-input
          v-model={search.value}
          size="small"
          clearable
          placeholder="Type to search"
        />
      ),
      cellRenderer: ({ index, row }) => (
        <>
          <el-button size="small" onClick={() => handleEdit(index + 1, row)}>
            Editar
          </el-button>
          <el-button
            size="small"
            type="danger"
            onClick={() => handleDelete(index + 1, row)}
          >
            Eliminar
          </el-button>
        </>
      )
    }
  ];

  return {
    columns,
    filterTableData
  };
}
