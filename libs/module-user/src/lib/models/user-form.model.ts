export interface IUserForm {
  roleId: string;
  employeeId?: string;
  fullnameTh?: string;
  fullnameEn?: string;
  departmentTh?: string;
  departmentEn?: string;
  status?: 'T' | 'F';
}
