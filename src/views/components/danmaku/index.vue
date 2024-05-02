<script setup lang="ts">
import { danmus as danmusData, getDanmuData } from "./danmu.js";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import VueDanmaku from "vue3-danmaku";

defineOptions({
  name: "Danmaku",
});

const danmaku = ref();
const danmus = ref<any[]>(getDanmuData());
const danmuMsg = ref<string>("");
let timer = 0;
const config = reactive({
  channels: 5, // 轨道数量，为0则弹幕轨道数会撑满容器
  useSlot: true, // 是否开启slot
  loop: true, // 是否开启弹幕循环
  speeds: 200, // 弹幕速度，实际为弹幕滚动完一整屏的秒数，值越小速度越快
  fontSize: 20, // 文本模式下的字号
  top: 10, // 弹幕轨道间的垂直间距
  right: 0, // 同一轨道弹幕的水平间距
  debounce: 100, // 弹幕刷新频率（多少毫秒插入一条弹幕，建议不小于50）
  randomChannel: true, // 随机弹幕轨道
});

onMounted(() => {
  window.onresize = () => resizeHandler();
});

onUnmounted(() => {
  window.onresize = null;
});

function play(type: string) {
  switch (type) {
    case "play":
      danmaku.value.play();
      break;
    case "pause":
      danmaku.value.pause();
      break;
    case "stop":
      danmaku.value.stop();
      break;
    case "show":
      danmaku.value.show();
      break;
    case "hide":
      danmaku.value.hide();
      break;
    case "reset":
      danmaku.value.reset();
      break;
    default:
      break;
  }
}

function switchSlot(slot: boolean) {
  config.useSlot = slot;
  danmus.value = slot ? getDanmuData() : danmusData;

  setTimeout(() => {
    danmaku.value.stop();
    danmaku.value.play();
  });
}
function speedsChange(val: number) {
  if (config.speeds <= 10 && val === -10) {
    return;
  }
  config.speeds += val;
  danmaku.value.reset();
}
function fontChange(val: number) {
  config.fontSize += val;
  danmaku.value.reset();
}
function channelChange(val: number) {
  if (!config.channels && val === -1) {
    return;
  }
  config.channels += val;
}
function resizeHandler() {
  if (timer) clearTimeout(timer);
  timer = window.setTimeout(() => {
    danmaku.value.resize();
  }, 500);
}
function addDanmu() {
  if (!danmuMsg.value) return;
  const _danmuMsg = config.useSlot
    ? {
        avatar: "https://i.loli.net/2021/01/17/xpwbm3jKytfaNOD.jpg",
        name: "你",
        text: danmuMsg.value,
      }
    : danmuMsg.value;
  danmaku.value.add(_danmuMsg);
  danmuMsg.value = "";
}
</script>
<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          El componente emergente, que utiliza el código abierto
          <el-link
            href="https://github.com/hellodigua/vue-danmaku/tree/vue3"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            vue3-danmaku
          </el-link>
        </span>
      </div>
    </template>
    <div class="flex gap-5">
      <vue-danmaku
        ref="danmaku"
        class="demo"
        v-model:danmus="danmus"
        isSuspend
        v-bind="config"
      >
        <!-- 弹幕slot -->
        <template v-slot:dm="{ danmu, index }">
          <div class="danmu-item">
            <img class="img" :src="danmu.avatar" />
            <span>{{ index }}{{ danmu.name }}：</span>
            <span>{{ danmu.text }}</span>
          </div>
        </template>
      </vue-danmaku>
      <div class="main">
        <p>
          Juega:
          <el-button @click="play('play')">Play</el-button>
          <el-button @click="play('pause')">pausa (reproductor multimedia)</el-button>
          <el-button @click="play('stop')">Parar</el-button>
        </p>
        <p>
          Modo:
          <el-button @click="switchSlot(true)">ranura emergente</el-button>
          <el-button @click="switchSlot(false)">Texto sin formato</el-button>
        </p>
        <p>
          Espectáculo:
          <el-button @click="play('show')">Mostrar</el-button>
          <el-button @click="play('hide')">Esconder</el-button>
        </p>
        <p>
          Velocidad:
          <el-button @click="speedsChange(-10)">Frenar</el-button>
          <el-button @click="speedsChange(10)">Acelerar</el-button>
          <span class="ml-5">Velocidad actual:{{ config.speeds }}Píxel/s</span>
        </p>
        <p>
          Tamaño de letra:
          <el-button :disabled="config.useSlot" @click="fontChange(-1)">
            reducir
          </el-button>
          <el-button :disabled="config.useSlot" @click="fontChange(1)">
            acercar
          </el-button>
          <span class="ml-5">Tamaño de letra actual:{{ config.fontSize }}px</span>
        </p>
        <p>
          Pistas:
          <el-button @click="channelChange(-1)">-1</el-button>
          <el-button @click="channelChange(1)">+1</el-button>
          <el-button @click="channelChange(-config.channels)"> cram </el-button>
          <span class="ml-5">Pista actual:{{ config.channels }}</span>
        </p>
        <p class="flex">
          <el-input
            type="text"
            placeholder="Escriba un comentario e introduzca para enviar una ventana emergente"
            v-model="danmuMsg"
            @keyup.enter="addDanmu"
          />
        </p>
      </div>
    </div>
  </el-card>
</template>
<style lang="scss">
.demo {
  flex: 1;
  height: 600px;
  background: linear-gradient(45deg, #5ac381, #20568b);

  .danmu-item {
    display: flex;
    align-items: center;

    .img {
      width: 25px;
      height: 25px;
      margin-right: 5px;
      border-radius: 50%;
    }
  }
}

.main {
  flex: 1;

  p {
    margin-top: 10px;
  }
}
</style>
