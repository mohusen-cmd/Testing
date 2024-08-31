import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class CompanyTypeService extends DataService {

    constructor(public httpclient: HttpClient) {
        super(httpclient);
    }
    GetcompanytypeInfo(pageindex, pagesize, orderby, totalrecordcount) {
        var getcompanytypeeInfo = `${this.CompanyTypeAPI.getcompanytypeeApi}${pageindex}/${pagesize}/${orderby}/${totalrecordcount}`;

        return this.getAsync(getcompanytypeeInfo);
    }

    GetcompanytypeDetailsbyid(ID) {
        let getcontacttypeUrl = `${this.CompanyTypeAPI.getcompanytypeeApi}${ID}`;
        return this.getAsync(getcontacttypeUrl);
    }

    insertcompanytype(model) {
        return this.postAsync(this.CompanyTypeAPI.insertcompanytypedetails, model);
    }

    UpdatecompanytypeStatusByIds(ID, status) {

        return this.postAsync(this.CompanyTypeAPI.updatecompanytypestatus + status, ID);
    }
    Updatecompanytype(model) {
        return this.postAsync(this.CompanyTypeAPI.updatecompanytypedetails, model)
    }


    CompanyTypeAPI =
        {
            getcompanytypeeApi: '/api/1/companytypeapi/',
            insertcompanytypedetails: '/api/1/companytypeapi',
            updatecompanytypedetails: '/api/1/companytypeapi/update',
            updatecompanytypestatus: '/api/1/companytypeapi/update/',
            createAPI: ''
        }

}
