<template>
  <div>
    <h1>Menú dinámico</h1>
    <div v-contextmenu:contextmenu class="wrapper">
      <code>Haga clic con el botón derecho del ratón en esta zona</code>
    </div>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-group title="plataforma">
        <v-contextmenu-item :hide-on-click="false" @click="extra.push('item')">
          Añadir menú
        </v-contextmenu-item>
        <v-contextmenu-item :hide-on-click="false" @click="extra.push('group')">
          Añadir un grupo de menús
        </v-contextmenu-item>
        <v-contextmenu-item :hide-on-click="false" @click="extra.push('submenu')">
          Añadir submenú
        </v-contextmenu-item>
        <v-contextmenu-item :hide-on-click="false" @click="extra.pop()">
          eliminar
        </v-contextmenu-item>
      </v-contextmenu-group>

      <template v-for="(item, index) of extra" :key="index">
        <v-contextmenu-divider />

        <v-contextmenu-group
          v-if="item === 'group'"
          :title="`grupo de menús ${index + 1}`"
        >
          <v-contextmenu-item>Menú 1</v-contextmenu-item>
          <v-contextmenu-item>Menú 2</v-contextmenu-item>
          <v-contextmenu-item>Menú 3</v-contextmenu-item>
        </v-contextmenu-group>

        <v-contextmenu-submenu
          v-else-if="item === 'submenu'"
          :title="`submenú ${index + 1}`"
        >
          <v-contextmenu-item>Menú 1</v-contextmenu-item>
          <v-contextmenu-item>Menú 2</v-contextmenu-item>
          <v-contextmenu-item>Menú 3</v-contextmenu-item>
        </v-contextmenu-submenu>

        <v-contextmenu-item v-else>menú {{ index + 1 }}</v-contextmenu-item>
      </template>
    </v-contextmenu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  directive,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
  ContextmenuSubmenu,
  ContextmenuGroup,
} from "v-contextmenu";

export default defineComponent({
  name: "ExampleDynamic",

  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuDivider.name]: ContextmenuDivider,
    [ContextmenuSubmenu.name]: ContextmenuSubmenu,
    [ContextmenuGroup.name]: ContextmenuGroup,
  },

  directives: {
    contextmenu: directive,
  },

  data() {
    return {
      extra: [],
    };
  },

  methods: {
    addItem(type = "item") {
      this.extra.push(type);
    },
    removeItem() {
      this.extra.pop();
    },
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  margin-bottom: 30px;
  background-color: rgb(90 167 164 / 20%);
  border: 3px dashed rgb(90 167 164 / 90%);
  border-radius: 8px;
}
</style>
