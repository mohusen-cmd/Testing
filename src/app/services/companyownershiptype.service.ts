import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyownershiptypeService extends DataService {

    constructor(httpclient: HttpClient) {
        super(httpclient);
    }

    companyownershipAPI = {
        getcompanyownership: "/api/1/companyownershipapi/",
        updatecompanyownershiptatus: "/api/1/companyownershipapi/update/",
        createoreditcompanyindustry: "/api/1/companyownershipapi/",
        save: "/api/1/companyownershipapi/ "
    }

    GetCompanyownerList(SearchColumn, AlphanumericSort, orderByClause, totalCount) {

        var companyownershiplist = this.companyownershipAPI.getcompanyownership + SearchColumn + "/" + AlphanumericSort + "/" + orderByClause + "/" + totalCount;
        return this.getAsync(companyownershiplist);
    }
    UpdateStatusByIds(ID, status) {

        return this.postAsync(this.companyownershipAPI.updatecompanyownershiptatus + status, ID);
    }

    GetCompanyOwnershipDetailsbyid(Id) {

        let getcompanyownershiptypeUrl = this.companyownershipAPI.getcompanyownership + Id;
        return this.getAsync(getcompanyownershiptypeUrl);
    }
    updatecompanyownership(model) {

        // var save=this.CompanyIndustryAPI.save;
        // return this.postAsync(save,model);
        return this.postAsync(this.companyownershipAPI.updatecompanyownershiptatus, model);
    }
    SaveNewCompanyIndustry(model) {

        // var save=this.CompanyIndustryAPI.save;
        // return this.postAsync(save,model);
        return this.postAsync(this.companyownershipAPI.save, model);
    }
}
