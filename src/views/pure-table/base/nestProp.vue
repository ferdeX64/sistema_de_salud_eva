<script setup lang="ts">
const tableData = [
  {
    userInfo: { name: "Test1", age: 22 },
    other: [
      { sex: "Mujer" },
      {
        more: {
          content: '<div><span style="color: red">我是 html 片段</span></div>'
        }
      }
    ],
    role: "Diseñador"
  },
  {
    userInfo: { name: "Test2", age: 28 },
    other: [
      { sex: "Masculino" },
      {
        more: {
          content:
            '<img width="100" height="100" src="https://pure-admin.github.io/pure-admin-table/imgs/11.jpg">'
        }
      }
    ],
    role: "Parte trasera"
  },
  {
    userInfo: { name: "Test3", age: 20 },
    other: [
      { sex: "Mujer" },
      {
        more: {
          content:
            '<img width="100" height="100" src="https://pure-admin.github.io/pure-admin-table/imgs/1.jpg">'
        }
      }
    ],
    role: "Animador de programadores"
  },
  {
    userInfo: { name: "Test4", age: 26 },
    other: [
      { sex: "Masculino" },
      {
        more: {
          content:
            '<a href="https://github.com/xiaoxian521" target="_black">我是链接，点我去 Follow</a>'
        }
      }
    ],
    role: "Adelantar parte de algo"
  }
];

const columns: TableColumnList = [
  {
    label: "Nombre y apellidos",
    prop: "userInfo.name"
  },
  {
    label: "Distinguir entre los sexos",
    prop: "other[0].sex"
  },
  {
    label: "Edad",
    prop: "userInfo.age"
  },
  {
    label: "Fragmento html",
    slot: "content"
  },
  {
    label: "Rol",
    prop: "role"
  }
];
</script>

<template>
  <pure-table :data="tableData" :columns="columns">
    <template #content="{ row }">
      <span v-html="row.other[1].more.content" />
    </template>
  </pure-table>
</template>
