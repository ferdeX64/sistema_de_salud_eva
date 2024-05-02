import { $t } from "@/plugins/i18n";
import { citas } from "@/router/enums";

export default {
  path: "/citas",
  redirect: "/citas/index",
  meta: {
    icon: "carbon:user-filled",
    title: "Citas",
    rank: citas
  },
  children: [
    {
      path: "/citas/index",
      name: "citas",
      component: () => import("@/views/citas/listar/index.vue"),
      meta: {
        icon: "streamline:waiting-appointments-calendar-solid",
        keepAlive: true,
        title: "Citas"
      }
    }
  ]
} as RouteConfigsTable;
