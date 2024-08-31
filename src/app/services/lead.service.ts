import { Injectable } from '@angular/core';
// import { ConfigService } from '../sharednew/utils/config.service';
// import { DataService } from './dataservice.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ClaimsHelper } from '../login/claimshelper';
import { DataService } from "./data.service";
import { environment } from 'src/environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeadService extends DataService{
  readonly baseUrl: any = environment.apiserver;
  constructor(private httpClient: HttpClient, public claimsHelper: ClaimsHelper) { 
    super(httpClient)
  }

  Notificationcount() {
    const token = localStorage.getItem('token');
    const userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    const roleId = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
    return this.httpClient.get(this.baseUrl + '/api/1/dashboardapi/getempnotificationcount/' + roleId + '/' + userId,)
  }
  GetLeads(SearchColumn, AlphanumericSort, Keyword, OwnerName, userId, Leadid, StageId, jtStartIndex, jtPageSize, jtSorting, RecordCount) {
    var getLeads = this.LeadsAPI.getleads + SearchColumn + '/' + AlphanumericSort + '/' + Keyword + '/' + OwnerName + '/' + userId + '/' + Leadid + '/' + StageId + '/' + jtStartIndex + '/' + jtPageSize + '/' + jtSorting + '/' + RecordCount
    return this.getAsync(getLeads)
     // .pipe(map(rese => { return rese }))
  }
  // DeleteProjectLead(obj: any) {
  //   return this.getAsync(this.LeadsAPI.deleteProjectLead + obj)
  // }
  GetLeadsLeadsApiLeadDetailsEdit(leadid: number, accountTypeId: any) {
    var getLeadsLeadsApiLeadDetails = `${this.LeadsAPI.getleads}${leadid}/${accountTypeId}`
    return this.getAsync(getLeadsLeadsApiLeadDetails)
  }
  InsertLeadDetails(formData: any) {
    return this.postAsync(this.LeadsAPI.postCrmleads , formData)
  }
  post1pointleads(Obj: any) {
    return this.httpClient.post<any>(`https://1pointapi2.psplhyd.com/api/contact/Api_Key/nwlQoDRZqu2xGjEtP7AiZGx6zjl8Qj3E2ad`, Obj)
  }
  // post1pointleads(Obj:any){
  //   return this.postAsync(this.OnePointAPI.OnePointList,Obj)
  // }
  InsertUpdateAPIContactIDs(Obj: any) {
    return this.postAsync(this.LeadsAPI.insertupdateAPIContactIDs, Obj)
  }

  SMTPMail(formData: any) {
    return this.postAsync(this.LeadsAPI.smtpmail, formData)
  }
  PostAttachemts(formData) {
    return this.postAsync(this.LeadsAPI.postAttachemts, formData)
  }
  deleteAccountDetails(obj: any) {
    return this.postAsync(this.LeadsAPI.deleteProjectLead, obj)
  }

  GetEncryptParams(formData) {
    var getEncryptParams = `${this.LeadsAPI.getencryptParams}/${formData}`
    return this.getAsync(getEncryptParams)
  }
  GetAccountDetailsByID(opperId) {
    var getaccountdetailsByID = `${this.LeadsAPI.getAccountDetailsByID}/${opperId}`
    return this.getAsync(getaccountdetailsByID)
  }
  GetFilePathList(attachmentid, module) {
    var getFilePathList = `${this.LeadsAPI.getfilepathList}${attachmentid}/${module}`
    return this.getAsync(getFilePathList)
  }
  GetStageList(isStatus, actTypeId) {
    var getStageList = `${this.LeadsAPI.getstageList}${isStatus}/${actTypeId}`
    return this.getAsync(getStageList)
  }
  GetActivityList(leadid,userid,startindex,pagesize,orderByClause,totalPageCount)
  {
    var getactivitylistbycompanyid=this.LeadsAPI.getactivitylistbyleadIdAPI+leadid+"/"+userid+"/"+startindex+
    "/"+pagesize+
    "/"+orderByClause+
    "/"+totalPageCount
    return this.getAsync(getactivitylistbycompanyid);
  }
  GetLeadDetailsByLeadId(LeadId,AccountTypeID)
  {  
    var getleadbyIdurl= this.LeadsAPI.getleads+LeadId+"/"+AccountTypeID;
   return this.getAsync(getleadbyIdurl); 
  }
   LeadsAPI = 
   {
    getactivitylistbyleadIdAPI:"/api/1/leadsapi/acivities/",
    getleads:'/api/1/leadsapi/',
    deleteProjectLead:'/api/1/leadsapi/deleteleadids',
    postCrmleads:'/api/1/leadsapi/insertupdateleaddetails',
    insertupdateAPIContactIDs:'/api/1/commonapi/InsertsUpdateAPIOnePointContactIds',
    smtpmail:'/api/1/websiteapi/sendmailleads',
    postAttachemts:'/api/1/commonapi/postattachmentfromangular',
    getencryptParams:'/api/1/commonapi/getencryptparams',
    getAccountDetailsByID:'/api/1/leadsapi',
    getfilepathList:'/api/1/leadsapi/filepathlist/',
    getstageList:'/api/1/commonapi/stagelist/',
  }
  OnePointAPI = {
    EmailAPIKey: `${this.claimsHelper.GetEmailAPIKeyFromClaims()}`,
    EmailAPILink: this.claimsHelper.GetEmailapilinkFromClaims(),
    OnePointList: `${this.claimsHelper.GetEmailapilinkFromClaims()}list/Api_Key/${this.claimsHelper.GetEmailAPIKeyFromClaims()}`
}
}

