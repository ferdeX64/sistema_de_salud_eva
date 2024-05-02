import TypeIt from "@/components/ReTypeit";
import Location from "@iconify-icons/ep/location";
import Notebook from "@iconify-icons/ep/notebook";
import Iphone from "@iconify-icons/ep/iphone";
import OfficeBuilding from "@iconify-icons/ep/office-building";
import Tickets from "@iconify-icons/ep/tickets";
import User from "@iconify-icons/ri/user-3-fill";

export function useColumns() {
  const lists = [
    { type: "", label: "Salud" },
    { type: "success", label: "Medicina" },
    { type: "info", label: "Familia" },
    { type: "danger", label: "Vida" },
    { type: "warning", label: "Ciencia" }
  ];

  const columnsA = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={User} />
          </el-icon>
          Nombre del consultorio
        </div>
      ),
      value: "Clinica UNIANDES"
    },
 
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Location} />
          </el-icon>
          Locación
        </div>
      ),
      value: "Ambato"
    }
  ];
  const columnsB = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Iphone} />
          </el-icon>
          Celular
        </div>
      ),
      value: "0998667053"
    }
  ]

  const columnsC = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Tickets} />
          </el-icon>
          Etiqueta
        </div>
      ),
      cellRenderer: () => {
        return lists.map(v => {
          return (
            <el-tag class="mr-[10px]" type={v.type} size="small" effect="dark">
              {v.label}
            </el-tag>
          );
        });
      }
    },
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={OfficeBuilding} />
          </el-icon>
          Dirección
        </div>
      ),
      value: "Provincia de Tungurahua,"
    }
  ];

  const columnsD = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Notebook} />
          </el-icon>
          Frase
        </div>
      ),
      cellRenderer: () => (
        <TypeIt
          className={"github"}
          values={["Siempre hay más soluciones que dificultades"]}
          cursor={false}
          speed={100}
        />
      )
    }
  ];

  return {
    columnsA,
    columnsB,
    columnsC,
    columnsD
  };
}
