<template>
  <div>
    <h1>grupo de botones</h1>
    <div v-contextmenu:contextmenu class="wrapper">
      <code>Haga clic con el botón derecho del ratón en esta zona</code>
    </div>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>menú</v-contextmenu-item>

      <v-contextmenu-group>
        <v-contextmenu-item>Github</v-contextmenu-item>
        <v-contextmenu-item>Codepen</v-contextmenu-item>
        <v-contextmenu-item disabled>Alipay</v-contextmenu-item>
        <v-contextmenu-item>Wechat</v-contextmenu-item>
      </v-contextmenu-group>

      <v-contextmenu-divider />

      <v-contextmenu-group title="grupo de botones">
        <v-contextmenu-item>Menú 1</v-contextmenu-item>
        <v-contextmenu-item>Menú 2</v-contextmenu-item>
        <v-contextmenu-item disabled>Menú 3</v-contextmenu-item>
      </v-contextmenu-group>
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

const ExampleSFC = defineComponent({
  name: "ExampleSFC",

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

export default ExampleSFC;
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
