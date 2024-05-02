<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRole } from "./utils/hook";
import { useDetail } from "../detalles/utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import Atender from "@iconify-icons/ep/circle-plus";
import Menu from "@iconify-icons/ep/menu";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "pacientes",
});

const formRef = ref();
const state = ref("");
const cedula = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  // buttonClass,
  onSearch,
  resetForm,

  DialogCreatePaciente,
  handleMenu,
  handleDelete,
  // handleDatabase,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
} = useRole();
interface LinkItem {
  value: string;
  link: string;
}

const links = ref<LinkItem[]>([]);
const cedulas = ref();

const loadAll = () => {
  return [
    {
      value: "Erick Alejandro Fernández Bustos",
      link: "https://github.com/vuejs/vue",
    },
    {
      value: "Jenny Aracely Segovia Tapia",
      link: "https://github.com/ElemeFE/element",
    },
  ];
};
const allCedulas = () => {
  return [
    {
      value: "0503814064",
    },
    {
      value: "0501478935",
    },
  ];
};

let timeout: ReturnType<typeof setTimeout>;
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 1000 * Math.random());
};
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const handleSelect = (item: Record<string, any>) => {
  console.log(item);
};
const querySearchAsyncCedulas = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? cedulas.value.filter(createFilter(queryString))
    : cedulas.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 1000 * Math.random());
};

onMounted(() => {
  links.value = loadAll();
  cedulas.value = allCedulas();
});
const { toDetail } = useDetail();

const input = ref("");
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="Nombre:" prop="name">
        <el-autocomplete
          clearable
          class="!w-[180px]"
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="Ingrese el nombre"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="N° cédula:" prop="ncedula">
        <el-autocomplete
          clearable
          class="!w-[180px]"
          v-model="cedula"
          :fetch-suggestions="querySearchAsyncCedulas"
          placeholder="Ingrese la cédula"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>

      <el-form-item label="Sexo:" prop="sexo">
        <el-select
          v-model="form.sexo"
          placeholder="Seleccione el sexo"
          clearable
          class="!w-[180px]"
        >
          <el-option label="Masculino" value="1" />
          <el-option label="Femenino" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          Buscar
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          Reset
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="Lista de pacientes" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="DialogCreatePaciente()"
        >
          Agregar paciente
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
          :data="dataList"
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
              :icon="useRenderIcon(Atender)"
              @click="
                toDetail(
                  { id: row.historia, ncedula: row.ncedula, name: row.name },
                  'query'
                )
              "
            >
              Atender
            </el-button>

            <el-button
              class="reset-margin"
              link
              type="warning"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="DialogCreatePaciente('Editando a ' + row.name, row)"
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
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
