import { ref } from "vue";
import { tableDataDrag } from "../data";
import { clone } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { CustomMouseMenu } from "@howdyjs/mouse-menu";

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

  // 配置参考：https://kongfandong.cn/howdy/mouse-menu/readme
  const menuOptions = {
    menuList: [
      {
        label: ({ id }) => `ID为：${id}`,
        disabled: true
      },
      {
        label: "Editar",
        tips: "Edit",
        fn: row =>
          message(
            `Has editado la fila ${
              dataList.value.findIndex(v => v.id === row.id) + 1
            } con los datos：${JSON.stringify(row)}`,
            {
              type: "success"
            }
          )
      }
    ]
  };

  function showMouseMenu(row, column, event) {
    event.preventDefault();
    const { x, y } = event;
    const ctx = CustomMouseMenu({
      el: event.currentTarget,
      params: row,
      // 菜单容器的CSS设置
      menuWrapperCss: {
        background: "var(--el-bg-color)"
      },
      menuItemCss: {
        labelColor: "var(--el-text-color)",
        hoverLabelColor: "var(--el-color-primary)",
        hoverTipsColor: "var(--el-color-primary)"
      },
      ...menuOptions
    });
    ctx.show(x, y);
  }

  return {
    columns,
    dataList,
    showMouseMenu
  };
}
