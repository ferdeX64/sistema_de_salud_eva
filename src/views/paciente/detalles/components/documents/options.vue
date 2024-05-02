<script setup lang="ts">
import { useRole } from "../../utils/hook";
import receta_header from "../../assets/receta_header.png";
const {
  dataPrescripcionList
} = useRole();
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>
<template>
  <el-image class="bg" :src="receta_header" fit="contain" />
  <div class="pagina">
    <el-container>
      <el-header class="header">
        <el-text class="text1"> La experiencia hace la diferencia </el-text>
        <el-row>
          <el-text tag="b" class="text2">Atención medica excepcional</el-text>
        </el-row>
        <el-row>
          <el-text class="text3" size="small">Tu salud es nuestra prioridad. Embárcate en un<br />
            viaje de bienestar con nuestra atención experta</el-text>
        </el-row>
        <div class="btn python python-1">
          <el-text class="text1"> Agenda tu cita </el-text>
        </div>
        <div class="horario">
          <el-text class="text3" tag="b">Horario de atención<br /></el-text>
          <hr class="solid" />

          <el-text class="text3">Lunes - Viernes </el-text>
          <el-text class="text3" tag="b">8:00am–7:00pm<br /> </el-text>
          <el-text class="text3">Sábado </el-text>
          <el-text class="text3" tag="b">11:00am–11:00pm<br /> </el-text>
          <el-text class="text3">Domingo </el-text>
          <el-text class="text3" tag="b">11:00am–5:00pm<br /> </el-text>
        </div>
        <el-text class="consultorio" tag="b">Consultorio Ambato</el-text>
      </el-header>
      <el-main>
        <el-text class="maintext1">Fecha: Lunes 5 de abril del 2024<br /></el-text>
        <el-text class="maintext1">Paciente: ERICK ALEJANDRO FERNANDEZ BUSTOS<br /></el-text>
        <el-text class="maintext1">Edad: 26 años<br /></el-text>
        <el-text class="maintext1">Diagnostico: Z251 NECESIDAD DE INMUNIZACION CONTRA LA INFLUENZA [GRIPE]<br /></el-text>

        <el-text class="maintext1">Codigo de receta: 21458<br /></el-text>
        <hr class="hrmedicina" />
        <div class="medicinaei">
          <iconify-icon-online style="height: 30px; position: relative; top: 3px" size="large"
            icon="icon-park-solid:medicine-bottle-one" /><el-text class="medicinaeitext" tag="b"> Medicinas e indicaciones
          </el-text>
          <iconify-icon-online style="height: 30px; position: relative; top: 4px" size="large"
            icon="solar:document-medicine-bold" />
        </div>

        <hr class="hrmedicinab" />
        <el-table class="ligthTable"  :data="dataPrescripcionList" align="center" style="width: 100%;" type="info">
          <el-table-column align="center" prop="date">
            <template #header>
              <span style="margin-right: 5px; position: relative; top: -5px;color:rgba(0, 0, 0, 0.649);">Medicina</span>
            </template> 
            <template #default="scope">
              <div style="display: flex; justify-content: space-evenly">
                <span style="margin-right: 6px; position: relative; top: -5px; color:black;">{{
                  scope.row.medicina
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" width="100">
            <template #header>
              <span style="margin-right: 5px; position: relative; top: -5px;  color:rgba(0, 0, 0, 0.649);">Cantidad</span>
            </template>
            <template #default="scope">
              <div style="display: flex; justify-content: space-evenly">
                <span style="margin-right: 9px; position: relative; top: -5px; color:black;">{{
                  scope.row.cantidad
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date">
            <template #header>
              <span style="margin-right: 5px; position: relative; top: -5px; color:rgba(0, 0, 0, 0.649);">Indicación</span>
            </template>
            <template #default="scope">
              <div style="display: flex; justify-content: space-evenly">
                <span style="margin-right: 5px; position: relative; top: -5px; color:black;">{{
                  scope.row.indicaciones
                }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>

      <el-footer>
      <div style="color:black; width: 100px; height: 200px; background-color: rgba(0, 0, 0, 0.5);"></div>
      </el-footer>
    </el-container>
  </div>

  <div class="html2pdf__page-break" />
</template>

<style>
.bg {
  position: absolute;
  top: -1px;
  width: 800px;
  height: 400px;
}

.bg:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.pagina {
  position: absolute;

  top: 0;
  left: 0;
  right: 0;

  width: 800px;
  height: 1121px;
}

.header {
  display: grid;
  align-content: center;

  justify-content: start;

  color: white;

  height: 400px;
}

.text1 {
  color: white;
  font-size: 19px;
}

.text2 {
  color: white;
  font-size: 25px;
}

.text3 {
  color: white;
  font-size: 12px;
}

.btn {
  vertical-align: top;

  display: inline-block;
  text-align: center;
  width: 152px;
  margin-top: 15px;
  height: 32px;
  line-height: 11px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.python {
  transition: 0.5s;
  background-size: 100% auto;
}

.python-1 {
  background-image: linear-gradient(to right, #2831df 0%, #af12b5 51%, #ea1ead01 100%);
}

.horario {
  vertical-align: top;
  background: #af12b5;
  background-size: 200% auto;
  display: inline-block;
  text-align: center;
  width: 192px;
  margin-top: 15px;
  height: 88px;
  line-height: 13px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  position: relative;
  top: 135px;
  left: 560px;
}

hr.solid {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-top: 2px solid;
}

.maintext1 {
  color:rgba(0, 0, 0, 0.649);
}

.consultorio {
  color: white;
  font-size: 35px;
}

.hrmedicina {
  margin-top: 40px;
  color: black;
}

.medicinaei {
  display: flex;
  justify-content: center;
}

.medicinaeitext {
  color: black;
  font-size: 15px;
}

.hrmedicinab {
  margin-top: 20px;
  color: black;
}

.medicina-icon {
  height: 100px;
  background: #000;
  position: relative;
  top: 5px;
  left: 20px;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.ligthTable{
  --el-bg-color: white;
}
</style>
