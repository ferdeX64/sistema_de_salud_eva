interface FormItemProps {
  fecha: number;
  value: string;
  medicina: string;
  cantidad: number;
  indicaciones: string;
  status: number;
}
interface FormProps {
  formInline: FormItemProps;
}
export type { FormItemProps, FormProps };
