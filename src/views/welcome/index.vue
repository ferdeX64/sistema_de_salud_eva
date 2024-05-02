<script setup lang="ts">
import { computed, markRaw, ref } from "vue";

import dayjs from "dayjs";
import MdEditor from "md-editor-v3";

import { getReleases } from "@/api/list";
import { useRenderFlicker } from "@/components/ReFlicker";
import TypeIt from "@/components/ReTypeit";
import { randomColor } from "@pureadmin/utils";
import { useWindowSize } from "@vueuse/core";

import Bar from "./components/Bar.vue";
import Embudo from "./components/Embudo.vue";
import Info from "./components/Info.vue";
import Line from "./components/Line.vue";
import Pie from "./components/Pie.vue";
import Radar from "./components/Radar.vue";
import Table from "./components/Table.vue";

defineOptions({
  name: "Welcome",
});

const list = ref();
const loading = ref<boolean>(true);
const { version } = __APP_INFO__.pkg;
const titleClass = computed(() => {
  return ["text-base", "font-medium"];
});

const { height } = useWindowSize();

setTimeout(() => {
  loading.value = !loading.value;
}, 800);

getReleases().then(({ data }) => {
  list.value = data.list.map((v) => {
    return {
      content: v.body,
      timestamp: dayjs(v.published_at).format("YYYY/MM/DD hh:mm:ss A"),
      icon: markRaw(
        useRenderFlicker({
          background: randomColor({ type: "hex" }) as string,
        })
      ),
    };
  });
});
</script>

<template>
  <div>
    <el-row :gutter="24">


      <el-col :xs="25" :sm="24" :md="212" :lg="278" :xl="291" class="mb-[35px]" v-motion :initial="{
      opacity: 0,
      y: 100,
    }" :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 200,
      },
    }">
        <el-card shadow="never" :style="{ height: `calc(${height}px - 15vh - 250px)` }">
          <template #header>
            <el-text class="mx-1" size="large">Información de consultorio</el-text>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <el-scrollbar :height="`calc(${height}px - 15vh - 340px)`">
                <Info />
              </el-scrollbar>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-[18px]" v-motion :initial="{
      opacity: 0,
      y: 100,
    }" :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 400,
      },
    }">
        <el-card shadow="never">
          <template #header>
            <a :class="titleClass" href="https://github.com/pure-admin/vue-pure-admin" target="_black">
              <TypeIt :className="'type-it4'" :values="['Pacientes nuevos']" :cursor="false" :speed="120" />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Line />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-[18px]" v-motion :initial="{
      opacity: 0,
      y: 100,
    }" :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 400,
      },
    }">
        <el-card shadow="never">
          <template #header>
            <a :class="titleClass" href="https://github.com/pure-admin/vue-pure-admin" target="_black">
              <TypeIt :className="'type-it3'" :values="['Productividad']" :cursor="false" :speed="120" />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Pie />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-[18px]" v-motion :initial="{
      opacity: 0,
      y: 100,
    }" :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 400,
      },
    }">
        <el-card shadow="never">
          <template #header>
            <a :class="titleClass" href="https://github.com/pure-admin/vue-pure-admin" target="_black">
              <TypeIt :className="'type-it5'" :values="['Citas']" :cursor="false" :speed="120" />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Bar />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-[18px]" v-motion :initial="{
      opacity: 0,
      y: 100,
    }" :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 400,
      },
    }">
        <el-card shadow="never">
          <template #header>
            <a :class="titleClass" href="https://github.com/pure-admin/vue-pure-admin" target="_black">
              <TypeIt :className="'type-it8'" :values="['Principales diagnosticos']" :cursor="false" :speed="120" />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Radar />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-[18px]" v-motion :initial="{
      opacity: 0,
      y: 100,
    }" :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 400,
      },
    }">
        <el-card shadow="never">
          <template #header>
            <a :class="titleClass" href="https://github.com/pure-admin/vue-pure-admin" target="_black">
              <TypeIt :className="'type-i14'" :values="['Enfermedades crónicas']" :cursor="false" :speed="120" />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Embudo />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-[18px]" v-motion :initial="{
      opacity: 0,
      y: 100,
    }" :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 400,
      },
    }">
        <el-card shadow="never">
          <template #header>
            <a :class="titleClass" href="https://github.com/pure-admin/vue-pure-admin" target="_black">
              <TypeIt :className="'type-5'" :values="['Top recetas']" :cursor="false" :speed="120" />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Table />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-timeline-item) {
  margin: 6px 0 0 6px;
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
