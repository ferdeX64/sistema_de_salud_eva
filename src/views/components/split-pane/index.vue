<script setup lang="ts">
import splitpane, { ContextProps } from "@/components/ReSplitPane";
import { reactive } from "vue";

defineOptions({
  name: "SplitPane",
});

const settingLR: ContextProps = reactive({
  minPercent: 20,
  defaultPercent: 40,
  split: "vertical",
});

const settingTB: ContextProps = reactive({
  minPercent: 20,
  defaultPercent: 40,
  split: "horizontal",
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">Corte de paneles</span>
      </div>
    </template>
    <div class="split-pane">
      <splitpane :splitSet="settingLR">
        <!-- #paneL Indica que el componente se especifica como panel izquierdo.-->
        <template #paneL>
          <!-- Personalizar el contenido del panel izquierdo -->
          <div class="dv-a">A</div>
        </template>
        <!-- #paneR Indica que el componente se especifica como panel derecho -->
        <template #paneR>
          <!-- Dividir de nuevo el panel derecho -->
          <splitpane :splitSet="settingTB">
            <template #paneL>
              <div class="dv-b">B</div>
            </template>
            <template #paneR>
              <div class="dv-c">C</div>
            </template>
          </splitpane>
        </template>
      </splitpane>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
$W: 100%;
$H: 70vh;

.split-pane {
  width: 70vw;
  height: $H;
  font-size: 50px;
  color: #fff;
  text-align: center;
  border: 1px solid #e5e6eb;

  .dv-a,
  .dv-b,
  .dv-c {
    width: $W;
    height: $W;
    line-height: $H;
    color: rgba($color: dodgerblue, $alpha: 80%);
  }

  .dv-b,
  .dv-c {
    line-height: 250px;
  }

  .dv-b {
    color: rgba($color: #000, $alpha: 80%);
  }

  .dv-c {
    color: rgba($color: #ce272d, $alpha: 80%);
  }
}
</style>
