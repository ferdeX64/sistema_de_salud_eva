<script setup lang="ts">
import { useDetail } from "./utils/hook";

import { computed, ref, nextTick } from "vue";
import { useWindowSize } from "@vueuse/core";
import Print from "@/utils/print";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import {
  Odometer,
  OfficeBuilding,
  CreditCard,
  Avatar,
  UserFilled,
  DocumentCopy,
  ZoomIn,
  Search,
  Cpu,
  DocumentAdd,
  DocumentChecked,
  Picture,
  User,
  Connection,
  CircleClose,
  Place,
  Male,
  AddLocation,
  SwitchFilled,
  Document,
  Delete,
  Printer,
  Download,
} from "@element-plus/icons-vue";
import { useRole } from "./utils/hook";

defineOptions({
  name: "AtencionPacientes",
});
import Ver from "@iconify-icons/ep/view";
import EditPen from "@iconify-icons/ep/edit-pen";
import Deleteb from "@iconify-icons/ep/delete";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { PureTableBar } from "@/components/RePureTableBar";

import avatar from "./components/Radiografia.png";
import ReCropper from "@/components/ReCropper";
import { formatBytes } from "@pureadmin/utils";
import save from "./svg/save.svg";
import pdf from "./svg/pdf.svg";

import Parent from "./components/documents/options.vue";
//import { Parent, exportPDF } from "./components/documents/diagnostico";
const {
  form,
  onSearchPrescripcion,
  columnsPrescripcion,
  columns,
  dataDiagnostico,
  dataPrescripcionList,
  pagination,
  // buttonClass,
  onSearch,
  resetForm,
  handleMenu,
  handleDelete,
  // handleDatabase,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  DialogAddDiagnostico,
  DialogAddPrescripcion,
  Save,
  PDF,
  Imprimir,

  Descargar,
} = useRole();

const { initToDetail, getParameter } = useDetail();
console.log(getParameter.ncedula);
initToDetail("query");
const loading = ref<boolean>(true);

const { height } = useWindowSize();

setTimeout(() => {
  loading.value = !loading.value;
}, 800);
const value = ref("1");

const options = [
  {
    value: "1",
    el: ".el-table",
    label: "Todo",
  },
  {
    value: "2",
    el: ".echart",
    label: "Fecha 2024-16-1",
  },
  {
    value: "3",
    el: ".img",
    label: "Fecha 2024-16-2",
  },
];
const downloadpdf = ref(false);
const visorpdf = ref(true);

function onPrint() {
  const el = options.filter((v) => v.value === value.value)[0]?.el;
  Print(el).toPrint;
}
const size = ref("");
const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "2px",
    small: "4px",
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});
const infos = ref();
const refCropper = ref();
const showPopover = ref(false);
const cropperImg = ref<string>("");

function onCropper({ base64, blob, info }) {
  console.log(blob);
  infos.value = info;
  cropperImg.value = base64;
}

import Vue3Html2pdf from "vue3-html2pdf";
const html2Pdf = ref(null);
async function generateReport() {
  visorpdf.value = true;
  downloadpdf.value = false;
  await nextTick();
  PDF();
  html2Pdf.value.generatePdf();
  console.log(html2Pdf.value);
}
async function downloadPDF() {
  visorpdf.value = false;
  downloadpdf.value = true;
  await nextTick();
  Descargar();
  html2Pdf.value.generatePdf();
  console.log(html2Pdf.value);
}
</script>

<template>
  <div>
    <el-row :gutter="40">
      <el-col
        :xs="25"
        :sm="6"
        :md="212"
        :lg="278"
        :xl="291"
        class="mb-[2px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200,
          },
        }"
      >
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span class="font-medium">Datos generales</span>
            </div>
          </template>

          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <el-scrollbar :height="`calc(${height}px - 19vh - 173px)`">
                <el-descriptions
                  class="margin-top"
                  :column="1"
                  border
                  direction="vertical"
                >
                  <el-descriptions-item label-class-name="my-label">
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle" size="large">
                          <UserFilled />
                        </el-icon>

                        Nombre del paciente
                      </div>
                    </template>
                    {{ getParameter.name }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle" size="large">
                          <CreditCard />
                        </el-icon>
                        Cedula
                      </div>
                    </template>
                    {{ getParameter.ncedula }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle" size="large">
                          <OfficeBuilding />
                        </el-icon>
                        Establecimiento
                      </div>
                    </template>
                    Hospital Uniandes
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle" size="large">
                          <Avatar />
                        </el-icon>
                        Medico
                      </div>
                    </template>
                    Dr. Joel Chicaiza
                  </el-descriptions-item>

                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle" size="large">
                          <Avatar />
                        </el-icon>
                        Servicio
                      </div>
                    </template>

                    <el-select placeholder="Seleccione el servicio" clearable>
                      <el-option label="Consulta médica" value="1" />
                      <el-option label="Control médico" value="2" />
                      <el-option label="Curación de heridas" value="3" />
                      <el-option label="Extracción de lipomas" value="4" />
                      <el-option label="Lavado de oidos" value="5" />
                    </el-select>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle" size="large">
                          <Avatar />
                        </el-icon>
                        Tipo de atención
                      </div>
                    </template>

                    <el-select
                      placeholder="Seleccione el tipo"
                      clearable
                      class="!w-[180px]"
                    >
                      <el-option label="Consulta" value="1" />
                      <el-option label="Exámenes" value="2" />
                      <el-option label="Procedimiento" value="3" />
                    </el-select>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle" size="large">
                          <Avatar />
                        </el-icon>
                        Seguro
                      </div>
                    </template>

                    <el-select
                      placeholder="Seleccione el tipo"
                      clearable
                      class="!w-[180px]"
                      style="border-width: 0"
                    >
                      <el-option label="Si" value="1" />
                      <el-option label="No" value="2" />
                    </el-select>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle" size="large">
                          <Avatar />
                        </el-icon>
                        Presupuesto
                      </div>
                    </template>

                    <el-input
                      placeholder="Ingrese el presupuesto"
                      class="!w-[180px]"
                    ></el-input>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle" size="large">
                          <Avatar />
                        </el-icon>
                        Fecha y hora
                      </div>
                    </template>

                    <el-date-picker
                      type="datetime"
                      placeholder="Selecciona la fecha"
                      format="YYYY/MM/DD hh:mm:ss"
                      value-format="YYYY-MM-DD h:m:s a"
                      class="!w-[180px]"
                    />
                    <!-- 2.3.12 -->
                  </el-descriptions-item>
                </el-descriptions>
              </el-scrollbar>
            </template>
          </el-skeleton>
          <template #footer>
            <div class="footerc">
              <el-button type="primary" :icon="DocumentCopy">Ver historial</el-button>
            </div>
          </template>
        </el-card>
      </el-col>
      <el-col
        :xs="25"
        :sm="16"
        :md="212"
        :lg="278"
        :xl="291"
        class="mb-[2px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200,
          },
        }"
      >
        <el-tabs type="border-card" class="demo-tabs">
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon size="large">
                  <Search />
                </el-icon>
                <span>Exploración</span>
              </span>
            </template>
            <el-scrollbar :height="`calc(${height}px - 16vh - 94px)`">
              <el-collapse accordion>
                <el-collapse-item name="1">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <Odometer />
                    </el-icon>
                    <el-text class="mx-1" size="large">
                      Signos vitales y atropometría</el-text
                    >
                    <div></div>
                  </template>
                  <el-form
                    ref="ruleFormRef"
                    label-width="220px"
                    class="demo-ruleForm"
                    status-icon
                    :inline="true"
                  >
                    <el-form-item label="Valor de TA (mmHg):" prop="address">
                      <el-input placeholder="Ingrese el valor"></el-input>
                    </el-form-item>
                    <el-form-item label="Frecuencia cardiaca (LPM):" prop="address">
                      <el-input placeholder="Ingrese el valor"></el-input>
                    </el-form-item>
                    <el-form-item label="Frecuencia respiratoria (RPM):" prop="address">
                      <el-input placeholder="Ingrese el valor"></el-input>
                    </el-form-item>
                    <el-form-item label="Temperatura (°C):" prop="address">
                      <el-input placeholder="Ingrese el valor"></el-input>
                    </el-form-item>
                    <el-form-item label="Peso (Kg):" prop="address">
                      <el-input placeholder="Ingrese el valor"></el-input>
                    </el-form-item>
                    <el-form-item label="Estatura (cm):" prop="address">
                      <el-input placeholder="Ingrese el valor"></el-input>
                    </el-form-item>
                    <el-form-item label="Índice de masa corporal:" prop="address">
                      <el-input placeholder="Ingrese el valor"></el-input>
                    </el-form-item>
                    <el-form-item label="Saturación de oxígeno:" prop="address">
                      <el-input placeholder="Ingrese el valor"></el-input>
                    </el-form-item>
                    <el-form-item label="Glucemia:" prop="address">
                      <el-input placeholder="Ingrese el valor"></el-input>
                    </el-form-item>
                    <el-form-item label="Responsable:" prop="address">
                      <el-input placeholder="Ingrese el nombre"></el-input>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <ZoomIn />
                    </el-icon>
                    <el-text class="mx-1" size="large"> Exploración general</el-text>
                    <div></div>
                  </template>
                  <el-form
                    ref="ruleFormRef"
                    label-width="100px"
                    class="demo-ruleForm"
                    status-icon
                    :inline="true"
                  >
                    <el-form-item label="Conciencia:">
                      <el-radio-group>
                        <el-radio label="Orientada" />
                        <el-radio label="Desorientada" />
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Piel:">
                      <el-checkbox>Adecuada</el-checkbox>
                      <el-checkbox>Palidez</el-checkbox>
                      <el-checkbox>Ícterico</el-checkbox>
                    </el-form-item>
                    <el-form-item label="Marcha:">
                      <el-radio-group>
                        <el-radio label="Normal" />
                        <el-radio label="Alteración" />
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Biotipo:">
                      <el-radio-group>
                        <el-radio label="Normal" />
                        <el-radio label="Atlético" />
                        <el-radio label="Pícnico" />
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item name="3">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <User />
                    </el-icon>
                    <el-text class="mx-1" size="large"> Exploración regional</el-text>
                    <div></div>
                  </template>
                  <el-form
                    ref="ruleFormRef"
                    label-width="170px"
                    class="demo-ruleForm"
                    status-icon
                    :inline="true"
                  >
                    <el-form-item label="Cabeza:" prop="address">
                      <el-input type="textarea" class="!w-[280px]" />
                    </el-form-item>
                    <el-form-item label="Cuello:" prop="address">
                      <el-input type="textarea" class="!w-[280px]" />
                    </el-form-item>
                    <el-form-item label="Tórax:" prop="address">
                      <el-input type="textarea" class="!w-[280px]" />
                    </el-form-item>
                    <el-form-item label="Abdomen:" prop="address">
                      <el-input type="textarea" class="!w-[280px]" />
                    </el-form-item>
                    <el-form-item label="Columna vertebral:" prop="address">
                      <el-input type="textarea" class="!w-[280px]" />
                    </el-form-item>
                    <el-form-item label="Miembros superiores:" prop="address">
                      <el-input type="textarea" class="!w-[280px]" />
                    </el-form-item>
                    <el-form-item label="Miembros inferiores:" prop="address">
                      <el-input type="textarea" class="!w-[280px]" />
                    </el-form-item>
                    <el-form-item label="Genito - Urinario:" prop="address">
                      <el-input type="textarea" class="!w-[280px]" />
                    </el-form-item>
                    <el-form-item label="Piel y Tegumentos:" prop="address">
                      <el-input type="textarea" class="!w-[280px]" />
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane :lazy="true" class="table-contenedor">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon size="large">
                  <Document />
                </el-icon>
                <span>Diagnóstico</span>
              </span>
            </template>
            <PureTableBar
              title="Lista de diagnósticos"
              :columns="columns"
              @refresh="onSearch"
              class="bar"
            >
              <template #buttons>
                <el-button
                  type="primary"
                  :icon="useRenderIcon(AddFill)"
                  @click="DialogAddDiagnostico()"
                >
                  Agregar diagnóstico
                </el-button>
              </template>
              <template v-slot="{ size, dynamicColumns }">
                <pure-table
                  align-whole="center"
                  showOverflowTooltip
                  table-layout="auto"
                  :loading="loading"
                  :size="size"
                  adaptive
                  :data="dataDiagnostico"
                  :columns="dynamicColumns"
                  :pagination="pagination"
                  :paginationSmall="size === 'small' ? true : false"
                  :header-cell-style="{
                    background: 'var(--el-fill-color-light)',
                    color: 'var(--el-text-color-primary)',
                  }"
                  @selection-change="handleSelectionChange"
                  @page-size-change="handleSizeChange"
                  @page-current-change="handleCurrentChange"
                >
                  <template #operation="{ row }">
                    <el-button
                      class="reset-margin"
                      link
                      type="success"
                      :size="size"
                      :icon="useRenderIcon(Ver)"
                    >
                      Ver
                    </el-button>

                    <el-button
                      class="reset-margin"
                      link
                      type="warning"
                      :size="size"
                      :icon="useRenderIcon(EditPen)"
                    >
                      Editar
                    </el-button>

                    <el-popconfirm
                      width="450"
                      :title="`¿Seguro desea borrar a ${row.name}?`"
                      @confirm="handleDelete(row)"
                    >
                      <template #reference>
                        <el-button
                          class="reset-margin"
                          link
                          type="danger"
                          :size="size"
                          :icon="useRenderIcon(Delete)"
                        >
                          Eliminar
                        </el-button>
                      </template>
                    </el-popconfirm>
                  </template>
                </pure-table>
              </template>
            </PureTableBar>
          </el-tab-pane>
          <el-tab-pane :lazy="true" class="table-contenedor">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon size="large">
                  <DocumentAdd />
                </el-icon>
                <span>Prescripción</span>
              </span>
            </template>
            <PureTableBar
              title="Lista de prescripciones"
              :columns="columnsPrescripcion"
              @refresh="onSearchPrescripcion"
            >
              <template #buttons>
                <el-button
                  type="primary"
                  :icon="useRenderIcon(AddFill)"
                  @click="DialogAddPrescripcion()"
                >
                  Agregar prescripción
                </el-button>
              </template>
              <template v-slot="{ size, dynamicColumns }">
                <pure-table
                  align-whole="center"
                  showOverflowTooltip
                  table-layout="auto"
                  :loading="loading"
                  :size="size"
                  adaptive
                  :data="dataPrescripcionList"
                  :columns="dynamicColumns"
                  :pagination="pagination"
                  :paginationSmall="size === 'small' ? true : false"
                  :header-cell-style="{
                    background: 'var(--el-fill-color-light)',
                    color: 'var(--el-text-color-primary)',
                  }"
                  @selection-change="handleSelectionChange"
                  @page-size-change="handleSizeChange"
                  @page-current-change="handleCurrentChange"
                >
                  <template #operation="{ row }">
                    <el-button
                      class="reset-margin"
                      link
                      type="success"
                      :size="size"
                      :icon="useRenderIcon(Ver)"
                    >
                      Ver
                    </el-button>

                    <el-button
                      class="reset-margin"
                      link
                      type="warning"
                      :size="size"
                      :icon="useRenderIcon(EditPen)"
                    >
                      Editar
                    </el-button>

                    <el-popconfirm
                      width="450"
                      :title="`¿Seguro desea borrar a ${row.name}?`"
                      @confirm="handleDelete(row)"
                    >
                      <template #reference>
                        <el-button
                          class="reset-margin"
                          link
                          type="danger"
                          :size="size"
                          :icon="useRenderIcon(Deleteb)"
                        >
                          Eliminar
                        </el-button>
                      </template>
                    </el-popconfirm>
                  </template>
                </pure-table>
              </template>
            </PureTableBar>
          </el-tab-pane>
          <el-tab-pane class="table-contenedor">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon size="large">
                  <DocumentChecked />
                </el-icon>
                <span>Exámenes</span>
              </span>
            </template>

            <el-scrollbar :height="`calc(${height}px - 15vh - 92px)`">
              <el-collapse accordion>
                <el-collapse-item name="0">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <AddLocation />
                    </el-icon>
                    <el-text class="mx-1" size="large">Electrólitos</el-text>
                  </template>
                  <div class="examenes-grid">
                    <el-checkbox label="Calcio" size="large" />
                    <el-checkbox label="Calcio Lonico" size="large" />
                    <el-checkbox label="Transferrina" size="large" />
                    <el-checkbox label="Cloro" size="large" />
                    <el-checkbox label="Fósforo" size="large" />
                    <el-checkbox label="Hierro" size="large" />
                    <el-checkbox label="Magnesio" size="large" />
                    <el-checkbox label="Potasio" size="large" />
                    <el-checkbox label="Sodio" size="large" />
                  </div>
                </el-collapse-item>
                <el-collapse-item name="1">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <Connection />
                    </el-icon>
                    <el-text class="mx-1" size="large">Hematológico</el-text>
                  </template>
                  <div class="examenes-grid">
                    <el-checkbox label="Coombs directo" size="large" />
                    <el-checkbox label="Coombs indirecto" size="large" />
                    <el-checkbox label="Eritrosedimentación" size="large" />
                    <el-checkbox label="Fórmula de Schilling" size="large" />
                    <el-checkbox label="Grupo sanguíneo y RH" size="large" />
                    <el-checkbox label="Hematies" size="large" />
                    <el-checkbox label="Hematócrito" size="large" />
                    <el-checkbox label="Hemoglobina" size="large" />
                    <el-checkbox label="Hemograma completo" size="large" />
                    <el-checkbox label="Leucocitos" size="large" />
                    <el-checkbox label="Plaquetas" size="large" />
                    <el-checkbox label="Plasmodium" size="large" />
                    <el-checkbox label="Reticulocitos" size="large" />
                  </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <CircleClose />
                    </el-icon>
                    <el-text class="mx-1" size="large">Hemóstatico</el-text>
                  </template>
                  <div class="examenes-grid">
                    <el-checkbox label="Fibrinógeno" size="large" />
                    <el-checkbox label="TPT" size="large" />
                    <el-checkbox label="Tiempo de coagulación" size="large" />
                    <el-checkbox label="Tiempo de protrombina" size="large" />
                    <el-checkbox label="Tiempo de sangría" size="large" />
                  </div>
                </el-collapse-item>
                <el-collapse-item name="3">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <Male />
                    </el-icon>
                    <el-text class="mx-1" size="large">Hormonas</el-text>
                  </template>
                  <div class="examenes-grid">
                    <el-checkbox label="Antitiroglobulina" size="large" />

                    <el-checkbox label="ACTH" size="large" />
                    <el-checkbox label="B HCG" size="large" />

                    <el-checkbox label="Cortisol AM" size="large" />

                    <el-checkbox label="Cortisol PM" size="large" />

                    <el-checkbox label="DHEA" size="large" />
                    <el-checkbox label="Estradiol" size="large" />
                    <el-checkbox label="FSH" size="large" />
                    <el-checkbox label="Hormona del crecimiento (hGH)" size="large" />
                    <el-checkbox label="Insulina" size="large" />
                    <el-checkbox label="LH" size="large" />
                    <el-checkbox label="Progesterona" size="large" />
                    <el-checkbox label="Prolactina" size="large" />
                    <el-checkbox label="Prolactina (2 tomas)" size="large" />
                    <el-checkbox label="Testosterona" size="large" />
                    <el-checkbox label="Testosterona libre" size="large" />
                  </div>
                </el-collapse-item>
                <el-collapse-item name="4">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <Place />
                    </el-icon>
                    <el-text class="mx-1" size="large">Panel tiroideo</el-text>
                  </template>
                  <div class="examenes-grid">
                    <el-checkbox label="Antitiroglobulina" size="large" />
                    <el-checkbox label="T3 Libre" size="large" />
                    <el-checkbox label="T3 Total" size="large" />
                    <el-checkbox label="T4 Libre" size="large" />
                    <el-checkbox label="T4 Total" size="large" />
                    <el-checkbox label="TSH" size="large" />
                  </div>
                </el-collapse-item>
                <el-collapse-item name="5">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <SwitchFilled />
                    </el-icon>
                    <el-text class="mx-1" size="large">Panel inmunológico</el-text>
                  </template>
                  <div class="examenes-grid">
                    <el-checkbox label="Clamydias lgG - lgM" size="large" />
                    <el-checkbox label="CMV lgG" size="large" />
                    <el-checkbox label="CMV lgM" size="large" />
                    <el-checkbox label="H. Pylori lgG (Serico)" size="large" />
                    <el-checkbox label="Herpes 1 - 2 lgG" size="large" />
                    <el-checkbox label="HIV 1 + 2" size="large" />
                    <el-checkbox label="Rubeola lgG - lgM" size="large" />
                    <el-checkbox label="Toxoplasma lgG - lgM" size="large" />
                  </div>
                </el-collapse-item>
                <el-collapse-item name="6">
                  <template #title>
                    <el-icon class="header-icon" size="large">
                      <cpu />
                    </el-icon>
                    <el-text class="mx-1" size="large">Serológico</el-text>
                  </template>
                  <div class="examenes-grid">
                    <el-checkbox label="ASTO (Cuantitativa)" size="large" />
                    <el-checkbox label="LE - Test" size="large" />
                    <el-checkbox label="Mono Test" size="large" />
                    <el-checkbox
                      label="Proteínas (Reactiva - Cuantitativa)"
                      size="large"
                    />
                    <el-checkbox label="R. Widall" size="large" />
                    <el-checkbox label="R. A. Test (Cuantitativa)" size="large" />
                    <el-checkbox label="VDRL" size="large" />
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane :lazy="true">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon size="large">
                  <Picture />
                </el-icon>
                <span>Imágenes</span>
              </span>
            </template>
            <el-scrollbar :height="`calc(${height}px - 15vh - 102px)`">
              <el-popover
                :visible="showPopover"
                placement="right"
                width="300px"
                :teleported="false"
              >
                <template #reference>
                  <ReCropper
                    ref="refCropper"
                    class="w-[30vw]"
                    :src="avatar"
                    circled
                    @cropper="onCropper"
                    @readied="showPopover = true"
                  />
                </template>
                <div class="flex flex-wrap justify-center items-center text-center">
                  <el-image
                    v-if="cropperImg"
                    :src="cropperImg"
                    :preview-src-list="Array.of(cropperImg)"
                    fit="cover"
                  />

                  <div v-if="infos" class="mt-1">
                    <p>
                      Tamaño de la imagen: {{ parseInt(infos.width) }} ×
                      {{ parseInt(infos.height) }} píxeles
                    </p>
                    <p>
                      Tamaño del archivo: {{ formatBytes(infos.size) }} ({{ infos.size }}
                      bytes)）
                    </p>
                  </div>
                </div>
              </el-popover>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col
        :xs="25"
        :sm="1"
        :md="212"
        :lg="278"
        :xl="291"
        class="mb-[2px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200,
          },
        }"
      >
        <div class="button">
          <el-row>
            <el-tooltip content="Guardar">
              <el-button circle class="size" type="success" @click="Save()">
                <template #icon>
                  <el-icon size="large">
                    <save />
                  </el-icon>
                </template>
              </el-button>
            </el-tooltip>
          </el-row>
          <el-row>
            <el-tooltip content="Ver pdf">
              <el-button circle class="size" type="danger" @click="generateReport()">
                <template #icon>
                  <el-icon size="large">
                    <pdf />
                  </el-icon>
                </template>
              </el-button>
            </el-tooltip>
          </el-row>
          <el-row>
            <el-tooltip content="Descargar">
              <el-button circle class="size" @click="downloadPDF()">
                <template #icon>
                  <el-icon size="large">
                    <download />
                  </el-icon>
                </template>
              </el-button>
            </el-tooltip>
          </el-row>
          <el-row>
            <el-tooltip content="Imprimir">
              <el-button circle class="size" type="warning" @click="Imprimir()">
                <template #icon>
                  <el-icon size="large">
                    <printer />
                  </el-icon>
                </template>
              </el-button>
            </el-tooltip>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-style: dashed solid;
}

.footerc {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-descriptions {
  margin-top: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

:deep(.my-label) {
  background: var(--el-color-primary-light-9) !important;
}

.margin-top {
  margin-top: 0px;
}

.demo-tabs .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.demo-ruleForm {
  display: grid;
  justify-content: center;
}

.header-icon {
  margin-right: 10px;
  margin-left: 10px;
}

.table-contenedor {
  height: 488px;
  width: 100%;
  margin: 0px;
}

.bar {
  margin-top: 0px;
}

.examenes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
}

.button {
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
}

.size {
  height: 60px;
  width: 60px;
}
</style>
