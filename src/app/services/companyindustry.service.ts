import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class CompanyIndustryService extends DataService {
    constructor(public httpclient: HttpClient) {
        super(httpclient);
    }

    GetCompanyIndustryInfo(pageindex, pagesize, orderby, totalrecordcount) {
        var getCompanyIndustryInfo = this.CompanyIndustryaAPI.getCompanyIndustryApi + pageindex + "/" + pagesize + "/" + orderby + "/" + totalrecordcount;
        return this.getAsync(getCompanyIndustryInfo);
    }

    insertCompanyIndustry(model) {
        return this.postAsync(this.CompanyIndustryaAPI.insertCompanyIndustrydetails, model);
    }

    GetCompanyIndustryDetailsbyid(ID) {
        let getcontacttypeUrl = this.CompanyIndustryaAPI.getCompanyIndustryApi + ID;
        return this.getAsync(getcontacttypeUrl);
    }

    UpdateCompanyIndustryStatusByIds(ID, status) {
        return this.postAsync(this.CompanyIndustryaAPI.updateCompanyIndustrystatus + status, ID);
    }

    UpdateCompanyIndustry(model) {
        return this.postAsync(this.CompanyIndustryaAPI.updateCompanyIndustrydetails, model)
    }

    CompanyIndustryaAPI =
        {
            getCompanyIndustryApi: '/api/1/companyindustryapi/',
            insertCompanyIndustrydetails: '/api/1/companyindustryapi',
            updateCompanyIndustrydetails: '/api/1/companyindustryapi/update',
            updateCompanyIndustrystatus: '/api/1/companyindustryapi/update/',
            createAPI: ''
        }


}