export interface IUser {
  roleId: string;
  employeeId?: string;
  fullnameTh?: string;
  fullnameEn?: string;
  departmentTh?: string;
  departmentEn?: string;
  status?: 'T' | 'F';
}

export interface IUserResponse {
  id: string;
  roleId?: string;
  roleName?: string;
  roleDescription?: string;
  employeeId?: string;
  fullnameTh?: string;
  fullnameEn?: string;
  departmentTh?: string;
  departmentEn?: string;
  updatedAt?: string;
  status?: 'T' | 'F';
  rolesModel?: {
    id: string;
    roleName: string;
    roleDescription: string;
    roleMapping: null;
  };
}
