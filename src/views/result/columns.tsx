import ArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line";
import CloseCircleLine from "@iconify-icons/ri/close-circle-line";

export function useColumns() {
  const columns = [
    {
      cellRenderer: () => {
        return (
          <span class="flex items-center -mt-6">
            <iconify-icon-offline
              icon={CloseCircleLine}
              color="#F56C6C"
              width="18px"
              height="18px"
            />
            <span class="ml-1 mr-4">Su cuenta ha sido congelada</span>
            <a
              href="javascript:void(0);"
              class="flex items-center"
              style="color: var(--el-color-primary)"
            >
              Descongelación inmediata
              <iconify-icon-offline
                icon={ArrowRightSLine}
                color="var(--el-color-primary)"
                width="18px"
                height="18px"
              />
            </a>
          </span>
        );
      }
    },
    {
      cellRenderer: () => {
        return (
          <span class="flex items-center -mt-8">
            <iconify-icon-offline
              icon={CloseCircleLine}
              color="#F56C6C"
              width="18px"
              height="18px"
            />
            <span class="ml-1 mr-4">Su cuenta aún no es apta para solicitar</span>
            <a
              href="javascript:void(0);"
              class="flex items-center"
              style="color: var(--el-color-primary)"
            >
              Actualizar ahora
              <iconify-icon-offline
                icon={ArrowRightSLine}
                color="var(--el-color-primary)"
                width="18px"
                height="18px"
              />
            </a>
          </span>
        );
      }
    }
  ];

  return {
    columns
  };
}
