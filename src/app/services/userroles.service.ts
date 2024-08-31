import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class UserrolesService extends DataService {
    constructor(httpclient: HttpClient) {
        super(httpclient);
    }
    GetUsersRolesDetails(Roleid) {
        var roles = this.RolesAPI.getuserrolesApi + "Roleid";
        return this.getAsync(roles);
    }

    DeleteRoleByUserRoleId(RoleId) {
        var Roleid = this.RolesAPI.getuserrolesApi
    }
    SaveUserRoles(RoleId) {

        var create = this.RolesAPI.getuserroleApi;
        return this.postAsync(create, RoleId)
    }

    RolesAPI =
        {

            getuserrolesApi: 'api/1/userapi/',
            getuserroleApi: 'api/1/userrolesapi/',

            createAPI: ''

        }
}
