<template>
  <div>
    <h1>Uso básico</h1>
    <div v-contextmenu:contextmenu class="wrapper">
      <code>Haga clic con el botón derecho del ratón en esta zona</code>
    </div>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>GitHub</v-contextmenu-item>
      <v-contextmenu-item>GitLab</v-contextmenu-item>

      <v-contextmenu-divider />

      <v-contextmenu-submenu title="plato de verduras">
        <v-contextmenu-item>cacahuete (Tw)</v-contextmenu-item>

        <v-contextmenu-submenu title="Col china">
          <v-contextmenu-item>canola</v-contextmenu-item>
          <v-contextmenu-item>col</v-contextmenu-item>
        </v-contextmenu-submenu>

        <v-contextmenu-item>pepinos</v-contextmenu-item>
      </v-contextmenu-submenu>

      <v-contextmenu-item disabled>jackfruit</v-contextmenu-item>

      <v-contextmenu-divider />

      <v-contextmenu-item>Melón Hami (variedad de melón almizclero)</v-contextmenu-item>
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
  ContextmenuGroup
} from "v-contextmenu";

export default defineComponent({
  name: "ExampleSimple",

  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuDivider.name]: ContextmenuDivider,
    [ContextmenuSubmenu.name]: ContextmenuSubmenu,
    [ContextmenuGroup.name]: ContextmenuGroup
  },

  directives: {
    contextmenu: directive
  }
});
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  background-color: rgb(90 167 164 / 20%);
  border: 3px dashed rgb(90 167 164 / 90%);
  border-radius: 8px;
}
</style>
