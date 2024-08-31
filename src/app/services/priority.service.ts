import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PriorityService extends DataService {
    constructor(public httpclient: HttpClient) {
        super(httpclient);
    }
    GetPrioritytypeInfo(pageindex, pagesize, orderby, totalrecordcount) {
        var getOppotunitytypeInfo = `${this.PriorityAPI.getOppotunitytypeApi}${pageindex}/${pagesize}/${orderby}/${totalrecordcount}`;

        return this.getAsync(getOppotunitytypeInfo);
    }

    GetPrioritytypeDetailsbyid(ID) {
        let getcontacttypeUrl = `${this.PriorityAPI.getOppotunitytypeApi}${ID}`;
        return this.getAsync(getcontacttypeUrl);
    }

    insertPrioritytype(model) {
        return this.postAsync(this.PriorityAPI.insertPrioritytypedetails, model);
    }

    UpdatePriorityStatusByIds(ID, status) {

        return this.postAsync(this.PriorityAPI.updatePrioritytypestatus + status, ID);
    }
    UpdatePrioritytype(model) {
        return this.postAsync(this.PriorityAPI.updatePrioritytypedetails, model)
    }


    PriorityAPI =
        {
            getOppotunitytypeApi: '/api/1/priorityapi/',
            insertPrioritytypedetails: '/api/1/priorityapi',
            updatePrioritytypedetails: '/api/1/priorityapi/update',
            updatePrioritytypestatus: '/api/1/priorityapi/update/',
            createAPI: ''
        }

}