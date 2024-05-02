import { $t } from "@/plugins/i18n";
import { paciente } from "@/router/enums";

export default {
  path: "/pacientes",
  redirect: "/pacientes/index",
  meta: {
    icon: "carbon:user-filled",
    title: "Pacientes",
    rank: paciente,
  
  },
  children: [
    {
      path: "/pacientes/index",
      name: "pacientes",
      component: () => import("@/views/paciente/listar/index.vue"),
      meta: {
        icon: "carbon:user-filled",
        keepAlive: true,
        title: "Pacientes"
      }
    },
    {
      path: "/pacientes/detalles-atencion",
      name: "AtencionPacientes",
      component: () => import("@/views/paciente/detalles/atention-details.vue"),
      meta: {
        // No aparece en el menú
        keepAlive: true,
        showLink: false,
        title: "Atención",
        activePath: "/pacientes/index",
        roles: ["admin", "common"]
      }
    }
  ]
} as RouteConfigsTable;
