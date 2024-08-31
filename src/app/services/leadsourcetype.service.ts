import { HttpClient } from "@angular/common/http";
import { DataService } from "./data.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LeadsourcetypeService extends DataService {
    constructor(public httpclient: HttpClient) {
        super(httpclient);
    }
    GetleadsourcetypeInfo(pageindex,Keyword, pagesize, orderby, totalrecordcount) {debugger
        var getleadsourcetypeInfo = this.LeadSourceAPI.getleadsourcetypeApi + pageindex + "/" +Keyword+"/"+ pagesize + "/" + orderby + "/" + totalrecordcount;
        return this.getAsync(getleadsourcetypeInfo);
    }

    GetleadsourcetypeDetailsbyid(ID) {
        let getcontacttypeUrl = this.LeadSourceAPI.getleadsourcetypeApi + ID;
        return this.getAsync(getcontacttypeUrl);
    }
    insertleadsourcetype(model) {


        return this.postAsync(this.LeadSourceAPI.insertleadsourcetypedetails, model);
    }
    UpdateleadsourceStatusByIds(ID, status) {
        

        return this.postAsync(this.LeadSourceAPI.updateleadsourcetypestatus + status, ID);
    }
    Updateleadsourcetype(model) {
        return this.postAsync(this.LeadSourceAPI.updateleadsourcetypedetails, model)
    }

    LeadSourceAPI = {
        getleadsourcetypeApi: '/api/1/leadsourceapi/',
        insertleadsourcetypedetails: '/api/1/leadsourceapi',
        updateleadsourcetypedetails: '/api/1/leadsourceapi/update',
        updateleadsourcetypestatus: '/api/1/leadsourceapi/update/',
        // createAPI: ''
    }
}