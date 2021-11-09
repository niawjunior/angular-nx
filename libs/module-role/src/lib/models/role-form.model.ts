export interface IRoleForm {
  role: string;
  permissions: Array<{
    checked?: boolean;
    label: string;
    value: string;
  }>;
}
