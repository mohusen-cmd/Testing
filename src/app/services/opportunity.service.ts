import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ClaimsHelper } from "../login/claimshelper";
import { DataService } from "./data.service";

@Injectable()
export class OpportunityService extends DataService {
    readonly baseUrl: any = environment.apiserver;
    constructor(private httpClient: HttpClient, public climes: ClaimsHelper) {
        super(httpClient)
    }

    GetOpportunityList(searchcolumn, alphanumericsort, keyword, companyid, companyname, userid, stageid, jtstartindex, jtpagesize, jtsorting, recordcount) {
        var getOppertunities = `${this.OpportunityAPI.getoppertunities}/${searchcolumn}/${alphanumericsort}/${keyword}/${companyid}/${companyname}/${userid}/${stageid}/${jtstartindex}/${jtpagesize}/${jtsorting}/${recordcount}`
        return this.getAsync(getOppertunities)
    }
    deleteProjectOppor(obj: any) {
        return this.postAsync(this.OpportunityAPI.deleteprojectoppor, obj)
    }
    GetOpportunityDetailsById(opporID: number, accounttypeid: number) {
        var getopportinityDetails = `${this.OpportunityAPI.getoppertunities}/${opporID}/${accounttypeid}`
        return this.getAsync(getopportinityDetails)
    }
    getCompanyApiGetCompanyDetailsById(companyid: number) {
        var getcompanyapigetcompanydetailsById = `${this.OpportunityAPI.getCompanyApiGetCompanyDetailsById}${companyid}`
        return this.getAsync(getcompanyapigetcompanydetailsById)
    }
    getCompanyApiGetConatctlistForCompanyId(companyid,pageindex,pagesize,orderbyclause,recordcount:any) {
        var getcompanyApiGetConatctlistForCompanyId = `${this.OpportunityAPI.getcompanyapigetconatctlistForCompanyId}${companyid}/${pageindex}/${pagesize}/${orderbyclause}/${recordcount}`
        return this.getAsync(getcompanyApiGetConatctlistForCompanyId)
    }
    InsertOppDetails(Obj: any) {
        return this.postAsync(this.OpportunityAPI.InsertOpportunity, Obj)
    }
    PostAttachemts(formData) {
        return this.postAsync(this.OpportunityAPI.InsertAttachemts, formData)
    }
    // post1pointContact(Obj: any) {
    //     return this.httpClient.post<any>(`https://1pointapi2.psplhyd.com/api/contact/Api_Key/nwlQoDRZqu2xGjEtP7AiZGx6zjl8Qj3E2ad`, Obj)
    // }
    InsertUpdateAPIContactIDs(Obj: any) {
        return this.postAsync(this.OpportunityAPI.insertupdateAPIContactIDs, Obj)
    }
    deleteProjectOpper(ID: any) {
        return this.postAsync(this.OpportunityAPI.deleteopportunity, ID)
    }
    SMTPMail(formData: any) {
        return this.postAsync(this.OpportunityAPI.smtpmail, formData)
    }
    postCrmActivityDelete(Obj: any) {
        return this.postAsync(this.OpportunityAPI.updateCrmActivityDelete, Obj)
    }
    GetAccountDetailsByID(opperId) {
        var getAccountDetailsByID = `${this.OpportunityAPI.getaccountdetailsByID}${opperId}`
        return this.getAsync(getAccountDetailsByID)
    }
    GetStageList() {
        let getstagelistAPI = this.OpportunityAPI.getstagelistAPI;
        return this.getAsync(getstagelistAPI);
    }
    GetactivitiesListbyopperAPIid(companyid, accounttype, keyword, module, jtstartindex, jtpagesize, jtsorting, recordcount) {
        let urlparams = `${this.OpportunityAPI.getactivitiesListbyopperAPIid}/${companyid}/${accounttype}/${keyword}/${module}/${jtstartindex}/${jtpagesize}/${jtsorting}/${recordcount}`
        return this.getAsync(urlparams);
    }
    getCreateCompanyOpportunity(companyid)
    {
     let getCreateCompanyOpportunity=  this.OpportunityAPI.getCreateCompanyOpportunity + companyid ;
     return this.getAsync(getCreateCompanyOpportunity); 
    }
    GetActivityList(companyid, accountype,Keyword, module, pageIndex, pageSize, orderbyclause, recordcount)
    {
     let getactivitieslist=  this.OpportunityAPI.getactivitieslist + companyid + "/" + accountype+ "/" + Keyword+ "/" + module+ "/" + pageIndex+ "/" + pageSize+ "/" + orderbyclause+ "/" + recordcount;
     return this.getAsync(getactivitieslist); 
    }
    CloneOpportunityDetails(OpportunityId)
     {
      let getcloneOpportunityDetails=this.OpportunityAPI.getcloneOpportunityDetails + OpportunityId;
      return this.getAsync(getcloneOpportunityDetails); 
     }
    OpportunityAPI =
        {
            getoppertunities: '/api/1/opportunitiesapi',
            getactivitieslist :'/api/1/opportunitiesapi/activitylist/',
            deleteprojectoppor: '/api/1/opportunitiesapi',
            getCompanyApiGetCompanyDetailsById: '/api/1/companyapi/',
            getcompanyapigetconatctlistForCompanyId: '/api/1/companyapi/contactlistbycompanyid/',
            InsertAttachemts: '/api/1/commonapi/postattachmentfromangular',
            insertupdateAPIContactIDs: '/api/1/commonapi/InsertsUpdateAPIOnePointContactIds',
            deleteopportunity: '/api/1/leadsapi/deleteleadids',
            smtpmail: '/api/1/websiteapi/sendmailleads',
            updateCrmActivityDelete: '/api/1/commonapi/deleteactivitybyids/update',
            getaccountdetailsByID: '/api/1/leadsapi/',
            getstagelistAPI: `/api/1/opportunitiesapi`,
            InsertOpportunity: '/api/1/opportunitiesapi',
            getactivitiesListbyopperAPIid: `/api/1/opportunitiesapi/activitylist`,
             getCreateCompanyOpportunity : '/api/1/companyapi/createcompanyopportunity/',
              getcloneOpportunityDetails : '/api/1/opportunitiesapi/cloneopportunitydetails/'
        }
}