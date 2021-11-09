export interface IRoleResponse {
  id: string;
  roleName: string;
  roleDescription?: string;
  roleMapping?: IRoleMapping[];
}

export interface IRoleMapping {
  roleId: string;
  rolesModel: string;
  menuId: string;
  menuModel: {
    menuName: string;
    menuDescription: string;
  };
}

export interface IRole {
  role: string;
  permissions: string[];
}
