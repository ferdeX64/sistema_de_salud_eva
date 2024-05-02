import { tableDataEdit } from "../data";
import { message } from "@/utils/message";
import { ref, computed, Transition } from "vue";
import { clone, delay } from "@pureadmin/utils";
import EditPen from "@iconify-icons/ep/edit-pen";
import Check from "@iconify-icons/ep/check";

// Consejo: Editar toda la línea del mismo método, el cellRenderer detrás de la representación del componente a cabo para hacer el tratamiento correspondiente puede ser
export function useColumns() {
  //Editar valor (puede ser múltiple)
  const inputValMap = ref({});
  //Si se está editando (puede ser más de una)
  const editStatus = ref({});
  // Célula actualmente activa (única)
  const activeIndex = ref(-1);
  const dataList = ref(clone(tableDataEdit, true));

  const comVal = computed(() => {
    return index => {
      return inputValMap.value[index]?.value;
    };
  });

  const editing = computed(() => {
    return index => {
      return editStatus.value[index]?.editing;
    };
  });

  const iconClass = computed(() => {
    return (index, other = false) => {
      return [
        "cursor-pointer",
        "ml-2",
        "transition",
        "delay-100",
        other
          ? ["hover:scale-110", "hover:text-red-500"]
          : editing.value(index) && ["scale-150", "text-red-500"]
      ];
    };
  });

  const columns: TableColumnList = [
    {
      label: "ID (editable)",
      prop: "id",
      // class="flex-bc" flex-bc 代表 flex justify-between items-center 具体看 src/style/tailwind.css 文件
      cellRenderer: ({ row, index }) => (
        <div
          class="flex-bc w-full h-[32px]"
          onMouseenter={() => (activeIndex.value = index)}
          onMouseleave={() => onMouseleave(index)}
        >
          <p v-show={!editing.value(index)}>{row.id}</p>
          <Transition enter-active-class="animate__animated animate__fadeInUp animate__faster">
            <el-input
              v-show={editing.value(index)}
              modelValue={comVal.value(index)}
              onInput={value => onChange(value, index)}
            />
          </Transition>
          <iconify-icon-offline
            v-show={editing.value(index)}
            icon={Check}
            class={iconClass.value(index)}
            onClick={() => onSure(index)}
          />
          <iconify-icon-offline
            v-show={activeIndex.value === index && !editing.value(index)}
            icon={EditPen}
            class={iconClass.value(index, true)}
            onClick={() => onEdit(row, index)}
          />
        </div>
      )
    },
    {
      label: "Fecha",
      prop: "date"
    },
    {
      label: "Nombre",
      prop: "name"
    },
    {
      label: "Dirección",
      prop: "address"
    }
  ];

  function onEdit({ id }, index) {
    inputValMap.value[index] = Object.assign({}, inputValMap.value[index], {
      value: id
    });
    // en modo edición
    editStatus.value[index] = Object.assign({}, editStatus.value[index], {
      editing: true
    });
  }

  function onMouseleave(index) {
    inputValMap.value[index]?.value
      ? (activeIndex.value = index)
      : (activeIndex.value = -1);
  }

  function onChange(value, index) {
    inputValMap.value[index].value = value;
  }

  function onSure(index) {
    dataList.value[index].id = inputValMap.value[index].value;
    message(
      `Has editado la line ${index + 1} y los datos editados son：${JSON.stringify(
        dataList.value[index]
      )}`,
      {
        type: "success"
      }
    );
    // Editar Estado Apagado
    editStatus.value[index] = Object.assign({}, editStatus.value[index], {
      editing: false
    });
    delay().then(() => (inputValMap.value[index].value = null));
  }

  return {
    columns,
    dataList
  };
}
