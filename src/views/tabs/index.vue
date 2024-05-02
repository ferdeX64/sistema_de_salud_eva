<script setup lang="ts">
import { deleteChildren, getNodeByUniqueId, appendFieldByUniqueId } from "@/utils/tree";
import { useDetail } from "./hooks";
import { ref, computed } from "vue";
import { clone } from "@pureadmin/utils";
import { transformI18n } from "@/plugins/i18n";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { usePermissionStoreHook } from "@/store/modules/permission";

defineOptions({
  name: "Tabs",
});

const { toDetail, router } = useDetail();
const menusTree = clone(usePermissionStoreHook().wholeMenus, true);

const treeData = computed(() => {
  return appendFieldByUniqueId(deleteChildren(menusTree), 0, {
    disabled: true,
  });
});

const currentValues = ref<string[]>([]);

const multiTags = computed(() => {
  return useMultiTagsStoreHook()?.multiTags;
});

function onCloseTags() {
  if (currentValues.value.length === 0) return;
  currentValues.value.forEach((uniqueId) => {
    const currentPath =
      getNodeByUniqueId(treeData.value, uniqueId).redirect ??
      getNodeByUniqueId(treeData.value, uniqueId).path;
    useMultiTagsStoreHook().handleTags("splice", currentPath);
    if (currentPath === "/tabs/index")
      router.push({
        path: multiTags.value[(multiTags as any).value.length - 1].path,
      });
  });
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div>Reutilización de pestañas, cierre automático si se supera el límite</div>
    </template>
    <div class="flex flex-wrap items-center">
      <p>modo de paso de consulta:</p>
      <el-button class="m-2" v-for="index in 6" :key="index" @click="toDetail({ id: index }, 'query')">
        Abrir la página detallada {{ index }}
      </el-button>
      <el-button @click="
        toDetail(
          { id: 666, name: 'Erick', age: 18, job: 'contratación externa' },
          'query'
        )
        ">
        Parámetros múltiples
      </el-button>
    </div>

    <el-divider />

    <div class="flex flex-wrap items-center">
      <p>params pasar el modo de parámetros:</p>
      <el-button class="m-2" v-for="index in 6" :key="index" @click="toDetail({ id: index }, 'params')">
        Abrir la página detallada {{ index }}
      </el-button>
    </div>

    <el-divider />
    <el-tree-select class="w-[300px]" node-key="uniqueId" placeholder="Seleccione la pestaña que desea cerrar" clearable
      multiple filterable default-expand-all :props="{
        label: (data) => transformI18n(data.meta.title),
        value: 'uniqueId',
        children: 'children',
        disabled: 'disabled',
      }" :data="treeData" v-model="currentValues">
      <template #default="{ data }">
        <span>{{ transformI18n(data.meta.title) }}</span>
      </template>
    </el-tree-select>
    <el-button class="m-2" @click="onCloseTags">Cerrar Etiquetas</el-button>

    <el-divider />
    <el-button @click="router.push({ name: 'Menu1-2-2' })">
      Saltar al menú dentro de la página (pasar nombre objeto, recomendación preferida)
    </el-button>
    <el-button @click="router.push('/nested/menu1/menu1-2/menu1-2-2')">
      Saltar al menú dentro de la página (pasar directamente la ruta a la que saltar)
    </el-button>
    <el-button @click="router.push({ path: '/nested/menu1/menu1-2/menu1-2-2' })">
      Saltar al menú de la página (pasar objeto de ruta)
    </el-button>

    <el-divider />
    <el-button @click="
      router.push({
        name: 'Menu1-2-2',
        query: { text: 'Pasar nombre objeto, recomendación preferida' },
      })
      ">
      Saltar al menú dentro de la página con parámetro (pasar nombre de objeto, preferido)
    </el-button>
    <el-button @click="
      router.push({
        path: '/nested/menu1/menu1-2/menu1-2-2',
        query: { text: '传path对象' },
      })
      ">
      Saltar al menú dentro de la página con parámetro (pasar objeto ruta)
    </el-button>
    <el-link class="ml-4"
      href="https://router.vuejs.org/zh/guide/essentials/navigation.html#%E5%AF%BC%E8%88%AA%E5%88%B0%E4%B8%8D%E5%90%8C%E7%9A%84%E4%BD%8D%E7%BD%AE"
      target="_blank">
      Haga clic para ver más formas de saltar
    </el-link>

    <el-divider />
    <el-button @click="router.push({ name: 'Empty' })">
      Saltar a una página en blanco sin Layout
    </el-button>
  </el-card>
</template>
