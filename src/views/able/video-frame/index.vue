<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { useLoader } from "@pureadmin/utils";
import { CanvasRenderer } from "./canvasRenderer";
import { ref, onMounted, onBeforeUnmount } from "vue";

defineOptions({
  name: "VideoFrame",
});

const num = 200;
const curImg = ref("");
const renderer = ref();
const captureUtil = ref();
const loading = ref(false);
const { loadScript } = useLoader();

const { VITE_PUBLIC_PATH } = import.meta.env;
const getPath = (path) => `${VITE_PUBLIC_PATH}wasm/${path}`;
const src = getPath("index.js");
const workerPath = getPath("capture.worker.js");
const wasmPath = getPath("capture.worker.wasm");

loadScript({
  src,
}).then((mgs) => {
  if (mgs === "success") {
    // @ts-expect-error
    captureUtil.value = cheetahCapture.initCapture({
      workerPath,
      wasmPath,
    });
  }
});

onMounted(() => {
  renderer.value = new CanvasRenderer("canvas-container");
  emitter.on("imageInfo", (info) => (curImg.value = info.img.src));
});

function beforeUpload(file) {
  curImg.value = "";
  loading.value = true;
  renderer.value.clearImages();
  // referencia api https://github.com/wanwu/cheetah-capture#api
  captureUtil.value.then((res) => {
    res.capture({
      // 视频文件
      file,
      // Dibuja un número especificado de fotogramas, pasando `number` se dibujan los fotogramas por número, pasando un array se especifica el tiempo en milisegundos para dibujar los fotogramas (la estrategia de dibujo.):https://github.com/wanwu/cheetah-capture/issues/6#issuecomment-1634384486）
      info: 16,
      // Devoluciones de llamada cuando cambia el resultado de la extracción de un fotograma
      onChange: (list, { url }) => {
        renderer.value.addImage(url, num * list.url.length, 0, num, num);
      },
      // Llamada de retorno cuando el dibujo del fotograma se ha completado con éxito
      onSuccess: () => {
        renderer.value.addListener();
        // 默认选中第一张
        renderer.value.drawTick({ offsetX: num / 2, offsetY: num / 2 });
        loading.value = false;
      },
      // Llamada de retorno cuando se produce un error durante la extracción de fotogramas
      onError: () => {
        loading.value = false;
      },
    });
  });

  return false;
}

onBeforeUnmount(() => {
  // Desagregar el evento público `imageInfo` para evitar disparos múltiples
  emitter.off("imageInfo");
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          <p>
            Basado en una compilación personalizada
            <el-link
              href="https://github.com/FFmpeg/FFmpeg"
              target="_blank"
              style="margin: 0 4px 5px; font-size: 16px"
            >
              FFmpeg
            </el-link>
            Se trata de una herramienta de corte de fotogramas compatible con los
            principales formatos, como MP4, MOV, AVI, WebM, MKV, etc. Formato de
            codificación H.264 (AVC), H.265 (HEVC), MPEG-2, MPEG-4, VP8, VP9, WMV3.
          </p>
          Por supuesto que hay más formatos de vídeo que pueden ser compatibles, siempre y
          cuando FFmpeg los soporte, es razonable que los soporte, también puede consultar
          la sección
          <el-link
            href="https://github.com/wanwu/cheetah-capture"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            cheetah-capture
          </el-link>
          responder cantando
          <el-link
            href="https://github.com/jordiwang/web-capture"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            web-capture
          </el-link>
          Modificar y compilar archivos como wasm (compilar en Ubuntu es muy recomendable)
          <p>
            Instalación recomendada para sistemas mac
            <el-link
              href="https://github.com/utmapp/UTM"
              target="_blank"
              style="margin: 0 4px 5px; font-size: 16px"
            >
              UTM
            </el-link>
            Máquina virtual, sistema windows recomendado para instalar máquina virtual
            VMware
          </p>
          <p>
            Por supuesto, esto es sólo una herramienta de captura de fotogramas de vídeo,
            si desea más operaciones se pueden estudiar en virtud de la
            <el-link
              href="https://ffmpegwasm.netlify.app/"
              target="_blank"
              style="margin: 0 4px 5px; font-size: 16px"
            >
              ffmpeg.wasm
            </el-link>
            Es una herramienta pura WebAssembly / JavaScript basada en FFmpeg. Es una
            herramienta WebAssembly/JavaScript pura basada en FFmpeg, que permite grabar,
            convertir y transmitir vídeo y audio dentro del navegador. Sin embargo, con
            algo de práctica, el rendimiento todavía no es muy bueno para vídeos más
            largos, pero se puede utilizar para vídeos cortos de menor duración.
          </p>
        </span>
      </div>
    </template>
    <div class="flex flex-wrap">
      <el-upload
        drag
        :show-file-list="false"
        accept=".mp4,.mov,.avi,.webm,.mkv"
        :before-upload="beforeUpload"
      >
        <div class="el-upload__text">
          Arrastrar y soltar para subir vídeo (captura por defecto 16 fotogramas, se puede
          cambiar en el código)
        </div>
      </el-upload>
      <el-image
        v-if="curImg"
        :src="curImg"
        :preview-src-list="Array.of(curImg)"
        class="w-[180px] h-[180px] ml-2 rounded-[6px]"
      />
    </div>
    <div
      v-loading="loading"
      element-loading-text="Consejo: Arrastre la imagen hacia la izquierda o la derecha y haga clic para seleccionar el marco deseado.Dibujar una marca de verificación"
      id="canvas-container"
      class="w-full h-[200px] overflow-hidden mt-6"
    />
  </el-card>
</template>

<style scoped lang="scss">
::v-deep(.el-upload-dragger) {
  display: flex;
  align-items: center;
  height: 180px;
}
</style>
