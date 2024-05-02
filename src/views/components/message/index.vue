<script setup lang="ts">
import { h } from "vue";
import hot from "@/assets/svg/hot.svg?component";
import { message, closeAllMessage } from "@/utils/message";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Check from "@iconify-icons/ep/check";

defineOptions({
  name: "Message",
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> Sugerencia de mensaje </span>
      </div>
    </template>

    <h4 class="mb-4">
      elemento-plus mensaje de alerta, haga clic para que aparezca un mensaje emergente
    </h4>

    <el-space wrap>
      <el-button
        type="info"
        @click="message('Mensaje de tipo Info', { customClass: 'el' })"
      >
        Info
      </el-button>
      <el-button
        type="success"
        @click="
          message('Mensaje de tipo de éxito', { customClass: 'el', type: 'success' })
        "
      >
        Success
      </el-button>
      <el-button
        type="warning"
        @click="
          message('Mensaje de tipo advertencia', { customClass: 'el', type: 'warning' })
        "
      >
        Warning
      </el-button>
      <el-button
        type="danger"
        @click="message('Mensaje de tipo de error', { customClass: 'el', type: 'error' })"
      >
        Error
      </el-button>
      <el-button
        @click="
          message('Los mensajes se pueden desactivar', {
            customClass: 'el',
            showClose: true,
          })
        "
      >
        conmutable
      </el-button>
      <el-button
        @click="
          message('Fusión de mensajes de paquetes', {
            customClass: 'el',
            type: 'success',
            grouping: true,
          })
        "
      >
        Fusión de mensajes de paquetes
      </el-button>
      <el-button
        @click="
          message('Iconos de mensajes personalizados', {
            customClass: 'el',
            icon: useRenderIcon(Check),
          })
        "
      >
        Iconos personalizados
      </el-button>
      <el-button
        @click="
          message('Cerrado después de 3 segundos', {
            customClass: 'el',
            duration: 3000,
            onClose: () =>
              message('Mensaje cerrado', { customClass: 'el', type: 'success' }),
          })
        "
      >
        Personaliza el tiempo de apagado retardado y configura otras operaciones tras el
        apagado
      </el-button>
      <el-button
        @click="
          message(
            h('p', null, [
              h('span', null, 'Message can be '),
              h('i', { style: 'color: teal' }, 'VNode'),
            ]),
            { customClass: 'el' }
          )
        "
      >
        Contenidos personalizados
      </el-button>
      <el-button
        @click="
          message('<strong>This is <i>HTML</i> string</strong>', {
            customClass: 'el',
            dangerouslyUseHTMLString: true,
          })
        "
      >
        Fragmentos HTML como contenido del cuerpo
      </el-button>
    </el-space>

    <el-divider />

    <h4 class="mb-4">
      Ant Alertas de mensajes con popups al hacer clic (basado en el estilo de ElMessage,
      no interfiere con el (basado en el estilo de ElMessage, no afecta el estilo original
      de ElMessage, muy bajo costo de uso y tamaño del paquete, y se adapta al Modo
      Oscuro)
    </h4>

    <el-space wrap>
      <el-button type="info" @click="message('Mensaje de tipo Info')">Info</el-button>
      <el-button
        type="success"
        @click="message('Mensaje de tipo de éxito', { type: 'success' })"
      >
        Success
      </el-button>
      <el-button
        type="warning"
        @click="message('Mensaje de tipo de éxito', { type: 'warning' })"
      >
        Warning
      </el-button>
      <el-button
        type="danger"
        @click="message('Mensaje de tipo de error', { type: 'error' })"
      >
        Error
      </el-button>
      <el-button
        @click="message('Los mensajes se pueden desactivar', { showClose: true })"
      >
        conmutable
      </el-button>
      <el-button
        @click="
          message('Fusión de mensajes de paquetes', { type: 'success', grouping: true })
        "
      >
        Fusión de mensajes de paquetes
      </el-button>
      <el-button
        @click="
          message('Iconos de mensajes personalizados', {
            icon: hot,
          })
        "
      >
        Iconos personalizados
      </el-button>
      <el-button
        @click="
          message('Cerrado después de 3 segundos', {
            duration: 3000,
            onClose: () => message('Mensaje cerrado', { type: 'success' }),
          })
        "
      >
        Personaliza el tiempo de apagado retardado y configura otras operaciones tras el
        apagado
      </el-button>
      <el-button
        @click="
          message(
            h('p', null, [
              h('span', null, 'Message can be '),
              h('i', { style: 'color: teal' }, 'VNode'),
            ])
          )
        "
      >
        Contenidos personalizados
      </el-button>
      <el-button
        @click="
          message('<strong>This is <i>HTML</i> string</strong>', {
            dangerouslyUseHTMLString: true,
          })
        "
      >
        Fragmentos HTML como contenido del cuerpo
      </el-button>
    </el-space>

    <el-divider />

    <el-button @click="closeAllMessage">
      Desactivar todas las alertas de mensajes
    </el-button>
  </el-card>
</template>
