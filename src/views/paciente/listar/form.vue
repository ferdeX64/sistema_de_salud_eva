<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { FormProps } from "./utils/types";
import { formRules } from "./utils/rule";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    cedula: "",
    name: "",
    ndate: 0,
    sex: "",
    civil_status: "",
    ocupation: "",
    address: "",
    phone: "",
    email: "",
    status: "",
  }),
});
const ruleFormRef = ref();

const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
import {
  InfoFilled,
  WarnTriangleFilled,
  HomeFilled,
  Avatar,
  Apple,
  Female,
} from "@element-plus/icons-vue";
interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}

const formSize = ref("default");

const ruleForm = reactive<RuleForm>({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

interface LinkItem {
  value: string;
  link: string;
}

const links = ref<LinkItem[]>([]);
const cedulas = ref();

const loadAll = () => {
  return [
    { value: "Erick Alejandro Fernández Bustos", link: "https://github.com/vuejs/vue" },
    { value: "Jenny Aracely Segovia Tapia", link: "https://github.com/ElemeFE/element" },
  ];
};
const allCedulas = () => {
  return [{ value: "0503814064" }, { value: "0501478935" }];
};

let timeout: ReturnType<typeof setTimeout>;
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 1000 * Math.random());
};
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const handleSelect = (item: Record<string, any>) => {
  console.log(item);
};
const querySearchAsyncCedulas = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? cedulas.value.filter(createFilter(queryString))
    : cedulas.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 1000 * Math.random());
};

onMounted(() => {
  links.value = loadAll();
  cedulas.value = allCedulas();
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
const value1 = ref("");
const activeName = ref("1");
const value = ref("100");
const value2 = ref("");
</script>
<template>
  <el-form ref="ruleFormRef" :model="newFormInline" :rules="formRules" label-width="200px" class="demo-ruleForm"
    status-icon :inline="true">
    <el-form-item label="N° cedula" prop="cedula">
      <el-autocomplete class="!w-[280px]" v-model="newFormInline.cedula" :fetch-suggestions="querySearchAsyncCedulas"
        placeholder="Ingrese la cédula" @select="handleSelect">
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="Nombre:" prop="name">
      <el-autocomplete class="!w-[280px]" v-model="newFormInline.name" :fetch-suggestions="querySearchAsync"
        placeholder="Ingrese el nombre" @select="handleSelect">
      </el-autocomplete> </el-form-item><el-form-item label="Fecha de nacimiento:" prop="ndate">
      <el-date-picker class="!w-[280px]" v-model="newFormInline.ndate" type="date" placeholder="Selecciona un dia" />
    </el-form-item>

    <el-form-item label="Sexo:" prop="sex">
      <el-select placeholder="Seleccione el sexo" v-model="newFormInline.sex" class="!w-[280px]">
        <el-option label="Masculino" value="1" />
        <el-option label="Femenino" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="Estado civil:" prop="civil_status">
      <el-select placeholder="Seleccione el estado" v-model="newFormInline.civil_status" class="!w-[280px]">
        <el-option label="Soltero" value="1" />
        <el-option label="Casado" value="2" />
        <el-option label="Divorciado" value="3" />
        <el-option label="Viudo" value="4" />
      </el-select>
    </el-form-item>
    <el-form-item label="Ocupación:" prop="ocupation">
      <el-select placeholder="Seleccione la ocupación" v-model="newFormInline.ocupation" class="!w-[280px]">
        <el-option label="Licenciado" value="1" v-model="newFormInline.ocupation" />
        <el-option label="Ingeniero" value="2" />
        <el-option label="Doctor" value="3" />
        <el-option label="Negocio propio" value="4" />
        <el-option label="Fuerzas Armadas" value="5" />
        <el-option label="Policía" value="6" />
      </el-select>
    </el-form-item>
    <el-form-item label="Dirección" prop="address">
      <el-input v-model="newFormInline.address" type="textarea" class="!w-[280px]" />
    </el-form-item>
    <el-form-item label="Celular:" prop="phone">
      <el-input placeholder="Ingrese el celular" v-model.number="newFormInline.phone"
        class="!w-[280px]"></el-input>
    </el-form-item>

    <el-form-item label="E-mail:" prop="email">
      <el-input placeholder="Ingrese el e-mail" v-model="newFormInline.email" class="!w-[280px]"></el-input>
    </el-form-item>
    <el-form-item label="Estado:" prop="status">
      <el-select placeholder="Seleccione el estado" v-model="newFormInline.status" clearable class="!w-[280px]">
        <el-option label="Ambulatorio" value="1" />
        <el-option label="Hospitalario" value="0" />
      </el-select>
    </el-form-item>

    <el-collapse accordion>
      <el-collapse-item name="1">
        <template #title>
          <el-icon class="header-icon" size="large">
            <info-filled />
          </el-icon>
          <el-text class="mx-1" size="large"> Datos adicionales</el-text>
          <div></div>
        </template>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="2">
            <template #title>
              <el-icon class="header-icon" size="large">
                <WarnTriangleFilled />
              </el-icon>
              <el-text class="mx-1" size="large">Alertas</el-text>
              <div></div>
            </template>
            <el-form-item label="Alerta" prop="desc">
              <el-input v-model="ruleForm.desc" type="textarea" class="!w-[280px]" />
            </el-form-item>

            <el-form-item label="Laboratorio:">
              <el-select placeholder="Seleccione el laboratorio" clearable class="!w-[280px]">
                <el-option label="Clínica Ambato" value="1" />
                <el-option label="Clínica Latacunga" value="0" />
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template #title>
              <el-icon class="header-icon" size="large">
                <HomeFilled />
              </el-icon>
              <el-text class="mx-1" size="large">Antecendentes heredo familiriares</el-text>
              <div></div>
            </template>

            <el-form-item label="Diabetes" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Hipertensión" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Cardiopatia" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Hepatopatia" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Nefropatia" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Enf. Mentales" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Asma" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Osteoarticulares" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Enf. Alérgicas" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Enf. Alérgicas" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Enf. Endócrinas" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch center v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Neoplasias" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Otro" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template #title>
              <el-icon class="header-icon" size="large">
                <Avatar />
              </el-icon>
              <el-text class="mx-1" size="large">Antecendentes personales patológicos</el-text>
            </template>
            <el-form-item label="Quirúrgicos" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Transfusión" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Alergias" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Traumáticos" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Patología crónica" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Hospitalizaciones previas" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Adicciones" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Digestivas" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Otros" prop="desc">
              <el-tooltip content="Tiene la enfermedad" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
          </el-collapse-item>
          <el-collapse-item name="5">
            <template #title>
              <el-icon class="header-icon" size="large">
                <Apple />
              </el-icon>
              <el-text class="mx-1" size="large">Antecendentes personales no patológicos</el-text>
            </template>
            <el-form-item label="Tipo de sangre:">
              <el-select placeholder="Seleccione el tipo de sangre" clearable class="!w-[280px]">
                <el-option label="A+" value="1" />
                <el-option label="A-" value="2" />
                <el-option label="B+" value="3" />
                <el-option label="B-" value="4" />
                <el-option label="O+" value="5" />
                <el-option label="O-" value="6" />
                <el-option label="AB+" value="7" />
                <el-option label="AB-" value="8" />
              </el-select>
            </el-form-item>
            <el-form-item label="Tabaquismo:">
              <el-select placeholder="N° de cigarrillos al día" clearable class="!w-[280px]">
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
                <el-option label="4" value="4" />
                <el-option label="5" value="5" />
                <el-option label="6" value="6" />
                <el-option label="7" value="7" />
                <el-option label="8" value="8" />
              </el-select>
            </el-form-item>
            <el-form-item label="Alimentación:">
              <el-select placeholder="N° de comidas al día" clearable class="!w-[280px]">
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
                <el-option label="4" value="4" />
                <el-option label="5" value="5" />
                <el-option label="6" value="6" />
                <el-option label="7" value="7" />
                <el-option label="8" value="8" />
              </el-select>
            </el-form-item>
            <el-form-item label="Actividad física:">
              <el-select placeholder="N° de horas al día" clearable class="!w-[280px]">
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
                <el-option label="4" value="4" />
                <el-option label="5" value="5" />
                <el-option label="6" value="6" />
                <el-option label="7" value="7" />
                <el-option label="8" value="8" />
              </el-select>
            </el-form-item>
            <el-form-item label="Inmunizaciones:">
              <el-select placeholder="N° de inmunizaciones" clearable class="!w-[280px]">
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
                <el-option label="4" value="4" />
                <el-option label="5" value="5" />
                <el-option label="6" value="6" />
                <el-option label="7" value="7" />
                <el-option label="8" value="8" />
              </el-select>
            </el-form-item>
            <el-form-item label="Vivienda:">
              <el-form-item placeholder="Tipo de vivienda" clearable class="!w-[280px]">
                <el-select placeholder="Seleccione la vivienda" clearable class="!w-[280px]">
                  <el-option label="Urbana" value="1" />
                  <el-option label="Rural" value="2" />
                </el-select>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item name="6">
            <template #title>
              <el-icon class="header-icon" size="large">
                <Female />
              </el-icon>
              <el-text class="mx-1" size="large">Gineco obstétricos</el-text>
            </template>
            <el-form-item label="Menarquia" prop="desc">
              <el-tooltip content="Ya sucedio" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Ritmo menstrual:">
              <el-select placeholder="Seleccione el ritmo menstrual" clearable class="!w-[280px]">
                <el-option label="Regular" value="1" />
                <el-option label="Irregular" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="FUM:">
              <el-date-picker class="!w-[280px]" v-model="value1" type="date" placeholder="Selecciona un dia" />
            </el-form-item>

            <el-form-item label="Parto" prop="desc">
              <el-tooltip content="Ya sucedio" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>

            <el-form-item label="Cesarea" prop="desc" label-width="170px">
              <el-tooltip content="Ya sucedio" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Gestación:">
              <el-date-picker class="!w-[280px]" v-model="value2" type="daterange" unlink-panels range-separator=""
                start-placeholder="Desde" end-placeholder="Hasta" />
            </el-form-item>
            <el-form-item label="Aborto" prop="desc">
              <el-tooltip content="Ya sucedio" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
            <el-form-item label="Actividad sexual:">
              <el-select placeholder="Seleccione el ciclo" class="!w-[280px]">
                <el-option label="Nunca" value="1" />
                <el-option label="A veces" value="2" />
                <el-option label="Siempre" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="Método anticonceptivo:">
              <el-input placeholder="Escriba el método" class="!w-[280px]" />
            </el-form-item>
            <el-form-item label="Prueba de Papanicolaou" prop="desc">
              <el-tooltip content="Ya se realizo" placement="top">
                <el-switch v-model="value" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  active-value="100" inactive-value="0" /> </el-tooltip></el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>
<style scoped lang="scss">
.header-icon {
  margin-right: 10px;
  margin-left: 10px;
}

.header-icon2 {
  margin-right: 10px;
  margin-left: 20px;
}
</style>
