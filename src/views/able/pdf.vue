<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import VuePdfEmbed from "vue-pdf-embed";

defineOptions({
  name: "Pdf",
});

const { t } = useI18n();
const pdfRef = ref<any>();
const pageCount = ref(1);
const loading = ref(true);
const currentPage = ref(1);
const currentRotation = ref(0);
const showAllPages = ref(false);
const rotations = [0, 90, 180, 270];
const { VITE_PUBLIC_PATH } = import.meta.env;
const source = `${VITE_PUBLIC_PATH}audio/Resume.pdf`;

const handleDocumentRender = () => {
  loading.value = false;
  pageCount.value = pdfRef.value.pageCount;
};

const showAllPagesChange = () => {
  currentPage.value = showAllPages.value ? null : 1;
};

const onPrint = () => {
  pdfRef.value.print();
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="font-medium">
        Vista previa del PDF (
        <el-link
          href="https://github.com/hrynko/vue-pdf-embed"
          target="_blank"
          style="margin: 0 5px 4px 0; font-size: 16px"
        >
          dirección github
        </el-link>
        ）
      </div>
    </template>
    <div
      class="h-[calc(100vh-239px)]"
      v-loading="loading"
      :element-loading-text="t('status.hsLoad')"
    >
      <div class="flex justify-between items-center h-9">
        <div v-if="showAllPages" class="font-medium ml-1.25 text-xl">
          Total {{ pageCount }} páginas
        </div>
        <div v-else>
          <el-pagination
            background
            layout="prev, slot, next"
            v-model:current-page="currentPage"
            :page-size="1"
            :total="pageCount"
          >
            {{ currentPage }} / {{ pageCount }}
          </el-pagination>
        </div>
        <div class="w-[170px] flex-bc">
          <el-checkbox v-model="showAllPages" @change="showAllPagesChange">
            Mostrar todas las páginas
          </el-checkbox>
          <el-tooltip
            effect="dark"
            :content="`Rotación (ángulo actual ${rotations[currentRotation]} grados）`"
            placement="top"
          >
            <IconifyIconOnline
              icon="ic:baseline-rotate-90-degrees-ccw"
              class="cursor-pointer outline-transparent"
              @click="
                currentRotation === 3 ? (currentRotation = 0) : (currentRotation += 1)
              "
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="打印" placement="top">
            <IconifyIconOnline
              icon="ri:printer-line"
              class="cursor-pointer outline-transparent"
              @click="onPrint"
            />
          </el-tooltip>
        </div>
      </div>
      <el-scrollbar>
        <vue-pdf-embed
          class="h-full container overflow-auto"
          ref="pdfRef"
          :rotation="rotations[currentRotation]"
          :page="currentPage"
          :source="source"
          @rendered="handleDocumentRender"
        />
      </el-scrollbar>
    </div>
  </el-card>
</template>
