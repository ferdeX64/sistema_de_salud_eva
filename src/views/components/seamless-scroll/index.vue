<script setup lang="ts">
import { ref, reactive, unref } from "vue";
import SeamlessScroll from "@/components/ReSeamlessScroll";

defineOptions({
  name: "SeamlessScroll",
});

const scroll = ref();

const listData = ref([
  {
    title:
      "Desplazamiento continuo en la primera fila Desplazamiento continuo en la primera fila ！！！！！！！！！！",
  },
  {
    title:
      "Desplazamiento continuo en la segunda fila Desplazamiento continuo en la segunda fila ！！！！！！！！！！",
  },
  {
    title:
      "Desplazamiento continuo de la tercera fila Desplazamiento continuo de la tercera fila ！！！！！！！！！！",
  },
  {
    title:
      "Desplazamiento continuo en la cuarta fila Desplazamiento continuo en la cuarta fila ！！！！！！！！！！",
  },
  {
    title:
      "Desplazamiento continuo en la quinta fila Desplazamiento continuo en la quinta fila ！！！！！！！！！！",
  },
  {
    title:
      "Desplazamiento continuo 6ª fila Desplazamiento continuo 6ª fila ！！！！！！！！！！",
  },
  {
    title:
      "Desplazamiento sin interrupciones fila 7 Desplazamiento sin interrupciones fila 7 ！！！！！！！！！！",
  },
  {
    title:
      "Desplazamiento sin interrupciones fila 8 Desplazamiento sin interrupciones fila 8 ！！！！！！！！！！",
  },
  {
    title:
      "Desplazamiento sin interrupciones fila 9 Desplazamiento sin interrupciones fila 9 ！！！！！！！！！！",
  },
]);

const classOption = reactive({
  direction: "top",
});

function changeDirection(val) {
  (unref(scroll) as any).reset();
  unref(classOption).direction = val;
}
</script>

<template>
  <el-space wrap>
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>Ejemplo de desplazamiento continuo</span>
          <el-button class="button" link type="primary" @click="changeDirection('top')">
            <span :style="{ color: classOption.direction === 'top' ? 'red' : '' }">
              Desplácese hacia arriba
            </span>
          </el-button>
          <el-button
            class="button"
            link
            type="primary"
            @click="changeDirection('bottom')"
          >
            <span
              :style="{
                color: classOption.direction === 'bottom' ? 'red' : '',
              }"
            >
              Desplácese hacia abajo
            </span>
          </el-button>
          <el-button class="button" link type="primary" @click="changeDirection('left')">
            <span :style="{ color: classOption.direction === 'left' ? 'red' : '' }">
              Desplácese a la izquierda
            </span>
          </el-button>
          <el-button class="button" link type="primary" @click="changeDirection('right')">
            <span :style="{ color: classOption.direction === 'right' ? 'red' : '' }">
              Desplácese a la derecha
            </span>
          </el-button>
        </div>
      </template>
      <SeamlessScroll
        ref="scroll"
        :data="listData"
        :class-option="classOption"
        class="warp"
      >
        <ul class="item">
          <li v-for="(item, index) in listData" :key="index">
       
             <span class="title" v-text="item.title" />
          </li>
        </ul>
      </SeamlessScroll>
    </el-card>
  </el-space>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    margin-right: 20px;
  }
}

.warp {
  width: 360px;
  height: 270px;
  margin: 0 auto;
  overflow: hidden;

  ul {
    padding: 0;
    margin: 10 auto;
    list-style: none;

    li,
    a {
      display: flex;
      justify-content: space-between;
      height: 30px;
      font-size: 15px;
      line-height: 30px;
    }
  }
}
</style>
