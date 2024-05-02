<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
    <PacienteDialog />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { checkVersion } from "version-rocket";
import { ElConfigProvider } from "element-plus";
import en from "element-plus/dist/locale/en.mjs";
import { ReDialog } from "@/components/ReDialog";
import { PacienteDialog } from "@/components/PacienteDialog";

import es from "element-plus/dist/locale/es.mjs";

export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog,
    PacienteDialog,
  },
  computed: {
    currentLocale() {
      return this.$storage.locale?.locale === "es" ? es : en;
    },
  },
  beforeCreate() {
    const { version, name: title } = __APP_INFO__.pkg;
    const { VITE_PUBLIC_PATH, MODE } = import.meta.env;
    if (MODE === "production") {
      // 版本实时更新检测，只作用于线上环境
      checkVersion(
        // config
        {
          // 5分钟检测一次版本
          pollingTime: 300000,
          localPackageVersion: version,
          originVersionFileUrl: `${location.origin}${VITE_PUBLIC_PATH}version.json`,
        },
        // options
        {
          title,
          description: "",
          buttonText: "",
        }
      );
    }
  },
});
</script>
