<script setup lang="ts">
import { ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";

// 兼容dark主题
const { isDark } = useDark();
let theme = computed(() => {
  return isDark.value ? "dark" : "default";
});

// 初始化ECharts
const chartRef = ref();
const { setOptions } = useECharts(chartRef, { theme });

// 根据配置项渲染ECharts
setOptions({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "0%",

    left: "center",
  },
  series: [
    {
      name: "Estadísticas",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 100, name: "Tos" },
        { value: 200, name: "Gripe" },
        { value: 300, name: "Infección" },
        { value: 400, name: "Covid 19" },
      ],
    },
  ],
});
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 35vh" />
</template>
