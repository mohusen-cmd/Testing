import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class OppotunityTypeService extends DataService {
    constructor(public httpclient: HttpClient) {
        super(httpclient);
    }

    GetOppotunitytypeInfo(pageindex, pagesize, orderby, totalrecordcount) {
        var getOppotunitytypeInfo = this.OpportunityAPI.getOppotunitytypeApi + pageindex + "/" + pagesize + "/" + orderby + "/" + totalrecordcount;
        return this.getAsync(getOppotunitytypeInfo);
    }
    insertOpportunitytype(model) {
        return this.postAsync(this.OpportunityAPI.insertopportunitytypedetails, model);
    }
    GetopportunitytypeDetailsbyid(ID) {
        let getcontacttypeUrl = this.OpportunityAPI.getOppotunitytypeApi + ID;
        return this.getAsync(getcontacttypeUrl);
    }
    UpdateOpportunityStatusByIds(ID, status) {
        return this.postAsync(this.OpportunityAPI.updateopportunitytypestatus + status, ID);
    }
    UpdateOpportunitytype(model) {
        return this.postAsync(this.OpportunityAPI.updateopportunitytypedetails, model)
    }
    OpportunityAPI =
        {
            getOppotunitytypeApi: '/api/1/opportunitytypeapi/',
            insertopportunitytypedetails: '/api/1/opportunitytypeapi',
            updateopportunitytypedetails: '/api/1/opportunitytypeapi/update',
            updateopportunitytypestatus: '/api/1/opportunitytypeapi/update/',
            createAPI: ''
        }

}