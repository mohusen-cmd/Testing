import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';


@Injectable({
    providedIn: 'root'
})
export class CampaignemailService extends DataService {
   
    constructor(public httpclient: HttpClient) {
        super(httpclient);

    }
    GetCampaignEmailList(startIndex, AlphanumericSort, orderByClause, UserId, totalCount) {

        let getcampaigntimelistUrl = this.EmailApi.getCampaignemaillistAPI + startIndex + "/" + AlphanumericSort + "/" + orderByClause + "/" + UserId + "/" + totalCount;
        return this.getAsync(getcampaigntimelistUrl);
    }
    UpdateemailStatusByIds(ID, status) {

        return this.postAsync(this.EmailApi.updatetypestatus + status + status, ID);

    }
    GetCampaignListbyid(emailid) {
        let getlistnyidUrl = this.EmailApi.getCampaignemaillistbyid + emailid;
        return this.getAsync(getlistnyidUrl);
    }

    InsertUpdateCampainemail(Model) {
        return this.postAsync(this.EmailApi.insertupdateccampaignEmaildetails, Model);
    }
    EmailApi = {
        getCampaignemaillistAPI: '/api/1/commonapi/',
        getCampaignemaillistbyid: '/api/1/commonapi/getemaildata/',
        insertupdateccampaignEmaildetails: 'api/1/commonapi/insertupdateccampaignEmaildetails/',
        updatetypestatus: 'api/1/commonapi/updateemailstatus/',
    }
}
