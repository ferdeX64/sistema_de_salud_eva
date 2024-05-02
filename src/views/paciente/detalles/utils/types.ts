interface FormItemProps {

  cedula: string,
  name: string ,
  ndate: number,
  sex: string,
  civil_status: string,
  ocupation: string,
  address: string,
  phone: number,
  email: string,
  status: string
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
