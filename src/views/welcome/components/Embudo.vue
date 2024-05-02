<script setup lang="ts">
import { ref, computed, type Ref, watch } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import { useDark, useECharts,type EchartOptions, delay, } from "@pureadmin/utils";

// 兼容dark主题
const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "default";
});

const lineChartRef = ref<HTMLDivElement | null>(null);
const {
  setOptions,
  getInstance,
  resize,
} = useECharts(lineChartRef as Ref<HTMLDivElement>, { theme });

// 根据配置项渲染ECharts
setOptions({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    type: "category",
    data: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "line",
      symbol: "triangle",
      symbolSize: 20,
      lineStyle: {
        color: "#5470C6",
        width: 4,
        type: "dashed",
      },
      itemStyle: {
        borderWidth: 2,
        borderColor: "#EE6666",
        color: "yellow",
      },
    },
  ],
});
watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="lineChartRef" style="width: 100%; height: 35vh" />
</template>
