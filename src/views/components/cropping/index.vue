<script setup lang="tsx">
import { ref } from "vue";
import avatar from "./avatar.png";
import ReCropper from "@/components/ReCropper";
import { formatBytes } from "@pureadmin/utils";

defineOptions({
  name: "Cropping",
});

const infos = ref();
const refCropper = ref();
const showPopover = ref(false);
const cropperImg = ref<string>("");

function onCropper({ base64, blob, info }) {
  console.log(blob);
  infos.value = info;
  cropperImg.value = base64;
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          Componente de recorte de imágenes, basado en el código abierto
          <el-link
            href="https://fengyuanchen.github.io/cropperjs/"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            cropperjs
          </el-link>
          Realice una encapsulación secundaria (pista: haga clic con el botón derecho del
          ratón en el área de recorte de la izquierda para abrir el menú de funciones).
        </span>
      </div>
    </template>
    <el-popover
      :visible="showPopover"
      placement="right"
      width="300px"
      :teleported="false"
    >
      <template #reference>
        <ReCropper
          ref="refCropper"
          class="w-[30vw]"
          :src="avatar"
          circled
          @cropper="onCropper"
          @readied="showPopover = true"
        />
      </template>
      <div class="flex flex-wrap justify-center items-center text-center">
        <el-image
          v-if="cropperImg"
          :src="cropperImg"
          :preview-src-list="Array.of(cropperImg)"
          fit="cover"
        />
        <div v-if="infos" class="mt-1">
          <p>
            Tamaño de la imagen: {{ parseInt(infos.width) }} ×
            {{ parseInt(infos.height) }} píxeles
          </p>
          <p>
            Tamaño del archivo: {{ formatBytes(infos.size) }} ({{ infos.size }} bytes)）
          </p>
        </div>
      </div>
    </el-popover>
  </el-card>
</template>
