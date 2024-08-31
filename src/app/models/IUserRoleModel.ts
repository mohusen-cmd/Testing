import { AnyForUntypedForms } from "@angular/forms";

export class UserRolesDomainModel {
    RoleId: number | undefined=0;
    RoleName: string | undefined;
    Description: string | undefined;
    Status: any;
    RecordsCount: number | undefined=0;
    ActiveStatus: string | undefined=null;
    DuplicateRoleName: string | undefined=null;
    SwitchPermission: boolean = false;
    MasterpermissionStatus: string | undefined=null;
    // modifiedOn: string | undefined;
}
export class UserRoleModel {   
    RoleId: number;
    RoleName:string;
    Type:string; 
    Permission:string;  
}

export class Page {
    //The number of elements in the page
    size: number = 0;
    //The total number of elements
    totalElements: number = 0;
    //The total number of pages
    totalPages: number = 0;
    //The current page number
    pageNumber: number = 0;
    filter:string;
}