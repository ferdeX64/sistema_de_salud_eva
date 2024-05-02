<script setup lang="ts">
import intro from "intro.js";
import "intro.js/minified/introjs.min.css";

defineOptions({
  name: "Guide",
});

const guide = () => {
  intro()
    .setOptions({
      nextLabel: "Siguiente",
      prevLabel: "Anterior",
      skipLabel: "x",
      doneLabel: "Hecho",
      steps: [
        {
          element: document.querySelector("#header-notice") as string | HTMLElement,
          title: "notificación de mensaje",
          intro: "Aquí puede consultar los mensajes enviados por el administrador",
          position: "left",
        },
        {
          element: document.querySelector("#header-translation") as string | HTMLElement,
          title: "internacionalización",
          intro: "Aquí puede cambiar de idioma",
          position: "left",
        },
        {
          element: document.querySelector(".set-icon") as string | HTMLElement,
          title: "Configuración ",
          intro: "Puede ver la configuración del proyecto aquí",
          position: "left",
        },
        {
          element: document.querySelector(".tags-view") as string | HTMLElement,
          title: "multipestaña",
          intro: "He aquí un historial de las páginas que ha visitado",
          position: "bottom",
        },
      ],
    })
    .start();
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          La página de introducción es útil para algunas personas que entran en el
          proyecto por primera vez, puede introducir brevemente la funcionalidad del
          proyecto
        </span>
      </div>
    </template>
    <el-button type="primary" class="mt-[10px]" @click="guide">
      Abrir la página bootstrap
    </el-button>
  </el-card>
</template>
