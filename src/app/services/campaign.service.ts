import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class CampaignService extends DataService {
    readonly baseUrl: any = environment.apiserver;
    constructor(public httpclient: HttpClient) {
        super(httpclient);
    }
    GetCampaignInfo(pageindex, pagesize, orderby, userId, totalrecordcount) {
        var getCampaignInfo = this.CampaignAPI.getCampaigneApi + "/" + pageindex + "/" + pagesize + "/" + orderby + "/" + userId + "/" + totalrecordcount;
        return this.getAsync(getCampaignInfo);
    }
    insertCampaign(model) {
        return this.postAsync(this.CampaignAPI.insertCampaigndetails, model);
    }
    UpdateCampaign(model) {
        return this.postAsync(this.CampaignAPI.updateCampaigndetails, model)
    }
    UpdateCampaignStatusByIds(ID, status) {
        return this.postAsync(this.CampaignAPI.updateCampaignstatus + status, ID);
    }
    GetCampaignbyid(ID) {
        let getCampaignUrl = this.CampaignAPI.getCampaigneApiById + ID;
        return this.getAsync(getCampaignUrl);
    }

    DeleteCampaignID(obj: any) {
        return this.deleteAsync(`${this.CampaignAPI.getCampaigneApi}`, obj)
    }

    CampaignAPI =
        {
            getCampaigneApi: '/api/1/commonapi',
            insertCampaigndetails: '/api/1/commonapi/insertupdateccampaignEmaildetails',
            updateCampaigndetails: '/api/1/emailapi/InsertupdateCamp',
            updateCampaignstatus: '/api/1/commonapi/updateemailstatus/',
            getCampaigneApiById: '/api/1/commonapi/getemaildata/',
            createAPI: ''
        }

}