interface FormItemProps {
  diag_name: string;
  diag_date: number;
  diag_observacion: string;
  diag_status: number;
}
interface FormProps {
  formInline: FormItemProps;
}
export type { FormItemProps, FormProps };
