// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 角色名称 */
  cedula: string,
  name: string ,
  ndate: number,
  sex: string,
  civil_status: string,
  ocupation: string,
  address: string,
  phone: string,
  email: string,
  status: string
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
