<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import Menu from "@iconify-icons/ep/menu";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Atender from "@iconify-icons/ep/circle-plus";

defineOptions({
  name: "citas",
});

const formRef = ref();
const value1 = ref("");
const value2 = ref("");
const state = ref("");
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  // buttonClass,
  onSearch,
  resetForm,
  openDialog,
  handleMenu,
  handleDelete,
  // handleDatabase,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
} = useRole();
const shortcuts = [
  {
    text: "⋄ Semana pasada",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "⋄ Anterior mes",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "⋄ Ultimos 3 meses",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
const loadAll = () => {
  return [
    { value: "Erick Alejandro Fernández Bustos", link: "https://github.com/vuejs/vue" },
    { value: "Jenny Aracely Segovia Tapia", link: "https://github.com/ElemeFE/element" },
  ];
};
interface LinkItem {
  value: string;
  link: string;
}


const links = ref<LinkItem[]>([]);
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
onMounted(() => {
  links.value = loadAll();

});
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :inline="true" :model="form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]">
      <el-form-item label="Fecha:">
        <el-date-picker v-model="value1" type="date" placeholder="Selecciona un dia" />
      </el-form-item>
      <el-form-item label="Fechas:">
        <el-date-picker v-model="value2" type="daterange" unlink-panels range-separator="" start-placeholder="Desde"
          end-placeholder="Hasta" :shortcuts="shortcuts" />
      </el-form-item>
      <el-form-item label="Paciente:" prop="name">
        <el-autocomplete clearable  class="!w-[200px]" v-model="form.name" :fetch-suggestions="querySearchAsync" placeholder="Ingrese el nombre"
          @select="handleSelect">
        </el-autocomplete>
      </el-form-item>

      <el-form-item label="Estado:">
        <el-select v-model="form.status" placeholder="Seleccione el estado" clearable class="!w-[180px]">
          <el-option label="Atendida" value="1" />
          <el-option label="Perdida" value="2" />
          <el-option label="Atrasada" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="Servicio:" prop="servi">
        <el-select v-model="form.servicio" placeholder="Seleccione el servicio" clearable class="!w-[180px]">
          <el-option label="Consulta médica" value="1" />
          <el-option label="Control médico" value="2" />
          <el-option label="Flebotomia" value="3" />
          <el-option label="Nebulización" value="4" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :icon="useRenderIcon(Search)" :loading="loading" @click="onSearch">
          Buscar
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          Reset
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="Lista de citas" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button type="primary" :icon="useRenderIcon(AddFill)" @click="openDialog()">
          Crear cita
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table align-whole="center" showOverflowTooltip table-layout="auto" :loading="loading" :size="size" adaptive
          :data="dataList" :columns="dynamicColumns" :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false" :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)',
          }" @selection-change="handleSelectionChange" @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange">
          <template #operation="{ row }">
            <el-button class="reset-margin" link type="success" :size="size" :icon="useRenderIcon(Atender)"
              >
              Atender
            </el-button>
            <el-button class="reset-margin" link type="warning" :size="size" :icon="useRenderIcon(EditPen)"
              @click="openDialog('Editar', row)">
              Editar
            </el-button>

            <el-popconfirm width="450" :title="`¿Seguro desea borrar a ${row.name}?`" @confirm="handleDelete(row)">
              <template #reference>
                <el-button class="reset-margin" link type="danger" :size="size" :icon="useRenderIcon(Delete)">
                  Eliminar
                </el-button>
              </template>
            </el-popconfirm>
            <!-- <el-dropdown>
              <el-button
                class="ml-3 mt-[2px]"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(More)"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button
                      :class="buttonClass"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(Menu)"
                      @click="handleMenu"
                    >
                      菜单权限
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      :class="buttonClass"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(Database)"
                      @click="handleDatabase"
                    >
                      数据权限
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown> -->
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}

.el-date-picker {
  margin-bottom: 120px;
}
</style>
