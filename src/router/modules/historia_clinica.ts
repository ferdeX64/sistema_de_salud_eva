import { $t } from "@/plugins/i18n";
import { historia_clinica } from "@/router/enums";

export default {
  path: "/historia",
  redirect: "/historia/index",
  meta: {
    icon: "iwwa:history",
    title: "Historia clínica",
    rank: historia_clinica
  },
  children: [
    {
      path: "/historia/index",
      name: "historia",
      component: () => import("@/views/historia/listar/index.vue"),
      meta: {
        icon: "fluent:document-folder-24-filled",
        keepAlive: true,
        title: "Historia clínica"
      }
    }
  ]
} as RouteConfigsTable;
