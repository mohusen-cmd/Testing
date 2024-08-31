import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { UserModel } from "../models/IUser";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { ClaimsHelper } from "../login/claimshelper";


@Injectable(
    {
        providedIn: 'root'
    }
)
export class EmailService extends DataService {

    constructor(httpclient: HttpClient, private claimsHelper: ClaimsHelper, httpBackend: HttpBackend) {

        super(httpclient);


    }

    GetRecentCampaignList(SearchColumn, AlphanumericSort, orderByClause, totalCount) {

        var url = this.EmailAPI.getrecentcampaign + SearchColumn + "/" + AlphanumericSort + "/" + orderByClause + "/" + totalCount;
        return this.getAsync(url);
    }
    GetJobSeeTemplatebyroleid(Roleid) {

        var templateurl = this.EmailAPI.GetJobSeeTemplate + Roleid;
        return this.getAsync(templateurl);
    }
    SaveEmailList(emailModel) {
        return this.postAsync(this.EmailAPI.saveemaillist, emailModel);
    }
    CreatesaveLeadSearchDetails(emailModel) {
        return this.postAsync(this.EmailAPI.createsaveLeadSearchDetail, emailModel);
    }
    updatelistresponse(emailModel) {
        return this.postAsync(this.EmailAPI.updatelistresponse, emailModel);
    }
    GetCampaignListByID(listid:any){
        var getCampaignListByID=`${this.EmailAPI.getCampaignListByID}/${listid}`
        return this.getAsync(getCampaignListByID);
    }
    GetLeadsListByID(listid:any){
        var getdetails=`${this.EmailAPI.getdetails}/${listid}`
        return this.getAsync(getdetails);
    }
    EmailAPI = {
        getrecentcampaign: '/api/1/emailapi',
        GetJobSeeTemplate: '/api/1/emailapi/JobSeeTemplate/',
        saveemaillist: '/api/1/emailapi/addupdatelistdetails',
        createsaveLeadSearchDetail: '/api/1/emailapi/leadsearchfilter',
        updatelistresponse: '/api/1/emailapi/updatelistresponse',
        getCampaignListByID:`/api/1/emailapi/getlistdetails`,
        getLeadsListByID:`/api/1/emailapi/getleadlistdetails`,
        getdetails:'/api/1/emailapi/getselecteddetailsList'
    }
    OnePointAPI = {
        EmailAPIKey: `${this.claimsHelper.GetEmailAPIKeyFromClaims()}`,
        EmailAPILink: this.claimsHelper.GetEmailapilinkFromClaims(),
        OnePointList: `${this.claimsHelper.GetEmailapilinkFromClaims()}list/Api_Key/dxiZB0U2ZGX065Wi2NhSquZDl8ufhaWWfOd`
    }
}