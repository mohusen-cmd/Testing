export interface RoleMenuModel {
    RoleMenuId: number;
    RoleId: number;
    MenuId: number;
    IsChecked: boolean | null;
    MenuDescription: string;
    NavigateURL: string;
    ParentMenuId: number | null;
    RoleName: string;
}
export interface AccessMenuModel {
    RoleMenuId: number;
    RoleId: number;
    MenuId: number;
    IsChecked: boolean | null;
}

export interface Custom
{
  label: string; 
}
// test