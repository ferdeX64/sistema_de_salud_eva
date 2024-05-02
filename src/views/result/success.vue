<script setup lang="ts">
defineOptions({
  name: "Success",
});

const { lastBuildTime } = __APP_INFO__;

const columns = [
  {
    label: "evento deportivo ID：",
    value: "12345",
  },
  {
    label: "La cabeza:",
    value: "sin duda",
  },
  {
    label: "Tiempo efectivo:",
    value: lastBuildTime,
  },
];
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">página de éxito</span>
      </div>
    </template>
    <el-result
      icon="success"
      title="Enviado con éxito"
      sub-title="Presentar la página de resultados se utiliza para retroalimentar los resultados de una serie de tareas operativas, si sólo una simple operación, utilice el mensaje de retroalimentación global puede ser. Esta área de texto puede mostrar instrucciones adicionales simples, si hay una necesidad similar para mostrar los “documentos“, la siguiente zona gris puede ser un contenido más complejo."
    >
      <template #extra>
        <div class="flex">
          <el-button type="primary">Volver a la lista</el-button>
          <el-button>Ver proyecto</el-button>
          <el-button>imprimible</el-button>
        </div>
      </template>
    </el-result>
    <div class="p-6 ml-10 mr-10 bg-[#fafafa] dark:bg-[#1d1d1d]">
      <PureDescriptions title="Nombre del proyecto" :columns="columns" class="mb-5" />
      <el-steps :active="2">
        <el-step title="Crear un proyecto">
          <template #description>
            <p>sin duda</p>
            <p>{{ lastBuildTime }}</p>
          </template>
        </el-step>
        <el-step title="Primera instancia departamental">
          <template #description>
            <p class="flex items-center">
              brillante
              <span
                role="img"
                aria-label="dingding"
                class="anticon anticon-dingding flex items-center cursor-pointer"
                style="margin-left: 8px; color: rgb(0 160 233)"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="dingding"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M573.7 252.5C422.5 197.4 201.3 96.7 201.3 96.7c-15.7-4.1-17.9 11.1-17.9 11.1-5 61.1 33.6 160.5 53.6 182.8 19.9 22.3 319.1 113.7 319.1 113.7S326 357.9 270.5 341.9c-55.6-16-37.9 17.8-37.9 17.8 11.4 61.7 64.9 131.8 107.2 138.4 42.2 6.6 220.1 4 220.1 4s-35.5 4.1-93.2 11.9c-42.7 5.8-97 12.5-111.1 17.8-33.1 12.5 24 62.6 24 62.6 84.7 76.8 129.7 50.5 129.7 50.5 33.3-10.7 61.4-18.5 85.2-24.2L565 743.1h84.6L603 928l205.3-271.9H700.8l22.3-38.7c.3.5.4.8.4.8S799.8 496.1 829 433.8l.6-1h-.1c5-10.8 8.6-19.7 10-25.8 17-71.3-114.5-99.4-265.8-154.5z"
                  />
                </svg>
                Empuja.
              </span>
            </p>
          </template>
        </el-step>
        <el-step title="Revisión financiera" />
        <el-step title="cumplir" />
      </el-steps>
    </div>
  </el-card>
</template>

<style scoped>
:deep(.el-descriptions__body) {
  background: transparent;
}
</style>
