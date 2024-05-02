import {
  clone,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";
import { tableDataDrag } from "../data";
import { message } from "@/utils/message";
import { templateRef } from "@vueuse/core";
import { ref, type Ref, computed } from "vue";

export function useColumns() {
  const dataList = ref(clone(tableDataDrag, true).splice(0, 4));

  const columns: TableColumnList = [
    {
      label: "ID",
      prop: "id"
    },
    {
      label: "Nombre",
      prop: "name"
    },
    {
      label: "Fecha",
      prop: "date"
    },
    {
      label: "Echarts gráficos",
      slot: "echart"
    }
  ];

  const { isDark } = useDark();

  const theme: EchartOptions["theme"] = computed(() => {
    return isDark.value ? "dark" : "light";
  });

  dataList.value.forEach((_, i) => {
    const { setOptions } = useECharts(
      templateRef(`PieChartRef${i}`) as Ref<HTMLDivElement>,
      {
        theme
      }
    );

    // https://pure-admin-utils.netlify.app/hooks/useEcharts/useEcharts.html
    setOptions(
      {
        tooltip: {
          trigger: "item",
          // 将 tooltip 控制在图表区域里
          confine: true
        },
        series: [
          {
            name: "Github信息",
            type: "pie",
            // center: ["30%", "50%"],
            data: [
              { value: 1067, name: "watchers" },
              { value: 4037, name: "star" },
              { value: 859, name: "forks" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      {
        name: "click",
        callback: ({ data: { name, value } }) => {
          message(
            `Ha hecho clic en la fila ${i + 1}  el título del gráfico es ${name}， y los datos del gráfico son：${value}`,
            {
              type: "success"
            }
          );
        }
      }
    );
  });

  return {
    columns,
    dataList
  };
}
