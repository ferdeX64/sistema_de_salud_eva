<script setup lang="ts">
import { type CSSProperties, computed } from "vue";
import { hasAuth, getAuths } from "@/router/utils";

defineOptions({
  name: "PermissionButton"
});

const elStyle = computed((): CSSProperties => {
  return {
    width: "85vw",
    justifyContent: "start"
  };
});
</script>

<template>
  <el-space direction="vertical" size="large">
    <el-tag :style="elStyle" size="large" effect="dark">
      Una lista de los códigos que se poseen actualmente:{{ getAuths() }}
    </el-tag>

    <el-card shadow="never" :style="elStyle">
      <template #header>
        <div class="card-header">Enfoque por componentes para juzgar los permisos</div>
      </template>
      <Auth value="btn_add">
        <el-button type="success"> Visible con el código: permiso 'btn_add </el-button>
      </Auth>
      <Auth :value="['btn_edit']">
        <el-button type="primary"> Tener code:['btn_edit'] permiso visible</el-button>
      </Auth>
      <Auth :value="['btn_add', 'btn_edit', 'btn_delete']">
        <el-button type="danger">
          Tener código: ['btn_add', 'btn_edit', 'btn_delete'] permiso visible
        </el-button>
      </Auth>
    </el-card>

    <el-card shadow="never" :style="elStyle">
      <template #header>
        <div class="card-header">Manera funcional de juzgar los permisos</div>
      </template>
      <el-button type="success" v-if="hasAuth('btn_add')">
        Visible con el código: permiso 'btn_add'
      </el-button>
      <el-button type="primary" v-if="hasAuth(['btn_edit'])">
        Tener code:['btn_edit'] permiso visible
      </el-button>
      <el-button type="danger" v-if="hasAuth(['btn_add', 'btn_edit', 'btn_delete'])">
        Tener código: ['btn_add', 'btn_edit', 'btn_delete'] permiso visible
      </el-button>
    </el-card>

    <el-card shadow="never" :style="elStyle">
      <template #header>
        <div class="card-header">
          Método de comandos para determinar los permisos (este método no permite la
          modificación dinámica de los permisos)
        </div>
      </template>
      <el-button type="success" v-auth="'btn_add'">
        Visible con el código: permiso 'btn_add'
      </el-button>
      <el-button type="primary" v-auth="['btn_edit']">
        Tener code:['btn_edit'] permiso visible
      </el-button>
      <el-button type="danger" v-auth="['btn_add', 'btn_edit', 'btn_delete']">
        拥有code：['btn_add', 'btn_edit', 'btn_delete'] 权限可见
      </el-button>
    </el-card>
  </el-space>
</template>
