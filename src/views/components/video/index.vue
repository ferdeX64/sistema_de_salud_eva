<script setup lang="ts">
import { onMounted } from "vue";
import { deviceDetection } from "@pureadmin/utils";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import VideoPlay from "@iconify-icons/ep/video-play";

import Player from "xgplayer";
import "xgplayer/dist/index.min.css";

defineOptions({
  name: "VideoPage",
});

onMounted(() => {
  new Player({
    id: "mse",
    lang: "es",
    // 默认静音
    volume: 0,
    autoplay: false,
    screenShot: true,
    videoAttributes: {
      crossOrigin: "anonymous",
    },
    url:
      "https://res.cloudinary.com/dcdvfurak/video/upload/v1702694448/tioccgoiy3aeq1uds7lv.mp4",
    poster: "https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
    fluid: deviceDetection(),
    //传入倍速可选数组
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
  });
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          Componentes de vídeo de código abierto
          <el-link
            href="https://v3.h5player.bytedance.com/"
            target="_blank"
            :icon="useRenderIcon(VideoPlay)"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            Jugador de sandía
          </el-link>
        </span>
      </div>
    </template>
    <div id="mse" />
  </el-card>
</template>

<style scoped>
#mse {
  flex: auto;
}
</style>
