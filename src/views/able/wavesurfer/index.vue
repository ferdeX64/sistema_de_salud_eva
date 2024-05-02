<script setup lang="ts">
import WaveSurfer from "wavesurfer.js";
import { getTime } from "@pureadmin/utils";
import { Play, Pause, Forward, Rewind } from "./svg";
import { ref, onMounted, onBeforeUnmount } from "vue";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { directive as tippy } from "vue-tippy";

defineOptions({
  name: "Wavesurfer",
});

const vTippy = tippy;
const loading = ref(true);
const wavesurfer = ref(null);
const wavesurferRef = ref();
// Duración total del audio (formato mm:ss)c
const totalTime = ref();
// Duración total del audio (en segundos)
const totalSecondTime = ref();
// Duración de la posición de reproducción actual del audio
const curTime = ref();
// Si el audio se está reproduciendo o no
const isPlay = ref(false);

const { VITE_PUBLIC_PATH } = import.meta.env;
const url = `${VITE_PUBLIC_PATH}audio/joan manuel serrat - mediterraneo.mp3`;

function init() {
  wavesurfer.value = WaveSurfer.create({
    container: wavesurferRef.value,
    height: "auto",
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    cursorColor: "rgb(64, 158, 255)",
    cursorWidth: 4,
    // backend: "MediaElement",
    url,
  });

  // Se activa cuando se descodifica el audio
  wavesurfer.value.on("decode", () => (loading.value = false));

  // Se activa cuando el audio se ha descodificado y está listo para su reproducción
  wavesurfer.value.on("ready", () => {
    if (!wavesurfer.value) return;
    const { decodedData } = wavesurfer.value;
    totalSecondTime.value = decodedData.duration;
    const { m, s } = getTime(decodedData.duration);
    totalTime.value = `${m}:${s}`;
    // Posición del cursor centrada
    wavesurfer.value.setTime(decodedData.duration / 2);
    // Ajuste del volumen de audio (rango 0-1)
    // wavesurfer.value.setVolume(1);
  });

  // Disparo continuo durante la reproducción cuando cambia la posición del audio
  wavesurfer.value.on("timeupdate", (timer) => {
    if (timer > totalSecondTime.value) return;
    const { m, s } = getTime(timer);
    curTime.value = `${m}:${s}`;
  });

  // Se activa durante la reproducción de audio
  wavesurfer.value.on("play", () => (isPlay.value = true));

  // Activado en pausa de audio
  wavesurfer.value.on("pause", () => (isPlay.value = false));
}

onMounted(init);

onBeforeUnmount(() => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
    wavesurfer.value = null;
  }
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          Visualización de audio con código abierto
          <el-link
            href="https://wavesurfer-js.org/"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            wavesurfer.js
          </el-link>
          <span class="text-[red]">
            (Consejos: El audio por defecto al máximo sonido, por favor baje el sonido de
            su ordenador cuando se juega, a fin de no afectar a usted)
          </span>
        </span>
      </div>
    </template>
    <div
      v-loading="loading"
      class="w-8/12 !m-auto !mt-[20px]"
      element-loading-background="transparent"
    >
      <div ref="wavesurferRef" />
      <div class="flex justify-between" v-show="totalTime">
        <span class="text-[#81888f]">00:00</span>
        <h1 class="text-4xl mt-2">{{ curTime }}</h1>
        <span class="text-[#81888f]">{{ totalTime }}</span>
      </div>
      <div class="flex mt-2 w-[180px] justify-around m-auto" v-show="totalTime">
        <Rewind
          class="cursor-pointer"
          v-tippy="{
            content: 'Fastback (posibilidad de prensa larga)',
            placement: 'bottom',
            animation: 'scale',
          }"
          v-longpress:0:100="() => wavesurfer?.skip(-1)"
        />
        <div
          class="cursor-pointer"
          v-tippy="{
            content: isPlay ? 'Pausa' : 'Reproducir',
            placement: 'bottom',
            animation: 'scale',
          }"
          @click="wavesurfer?.playPause()"
        >
          <Play v-if="isPlay" v-motion-pop />
          <Pause v-else v-motion-pop />
        </div>
        <Forward
          class="cursor-pointer"
          v-tippy="{
            content: 'Avance rápido (pulsación larga posible)',
            placement: 'bottom',
            animation: 'scale',
          }"
          v-longpress:0:100="() => wavesurfer?.skip(1)"
        />
      </div>
    </div>
  </el-card>
</template>
