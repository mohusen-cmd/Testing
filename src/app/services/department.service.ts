import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService extends DataService {
    //readonly rootURL: string = "http://localhost/Services.Host/";
    constructor(httpclient: HttpClient) {
        super(httpclient);
    }

    departmentAPI = {
        getdepartmentlist: "/api/1/userapi/",
        updatedepartment: "/api/1/userapi/updatedepartstatus/",
        createoreditcompanyindustry: "/api/1/userapi/",
        getdepartmentdetails: "/api/1/userapi/getdeptdatabyid/",
        save: "/api/1/userapi/insertupdatedepartmentdetails/"
    }

    GetDepartmentList(SearchColumn, AlphanumericSort, orderByClause, totalCount) {debugger

        var departmenturl = this.departmentAPI.getdepartmentlist + SearchColumn + "/" + AlphanumericSort + "/" + orderByClause + "/" + totalCount;
        return this.getAsync(departmenturl);
    }

    UpdateStatusByIds(ID, status) {

        return this.postAsync(this.departmentAPI.updatedepartment + status, ID);
    }


    GetDepartmentDetailsbyid(Id) {

        let getdepartmentUrl = this.departmentAPI.getdepartmentdetails + Id;
        return this.getAsync(getdepartmentUrl);
    }

    SaveNewDepartment(model) {

        // var save=this.CompanyIndustryAPI.save;
        // return this.postAsync(save,model);
        return this.postAsync(this.departmentAPI.save, model);
    }
}
