import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClaimsHelper } from '../login/claimshelper';
import { DataService } from './data.service';

@Injectable()
export class ActivityService extends DataService {
    readonly baseUrl: any = environment.apiserver;
    constructor(private httpClient: HttpClient, public climes: ClaimsHelper) {
        super(httpClient);
    }

    GetActivityListDetails(searchcolumn, alphanumericsort, companykeyword, userid,Statusid,startindex, pagesize, orderbyclause, recordcount) {
        var getActivityapi =
            this.ActivityApi.getactivityapi +
            searchcolumn +
            '/' +
            alphanumericsort +
            '/' +
            companykeyword +
            '/' +
            userid +
            '/' +
            Statusid +
            '/' +
            startindex +
            '/' +
            pagesize +
            '/' +
            orderbyclause +
            '/' +
            recordcount;
        return this.getAsync(getActivityapi);
    }
    postCrmActivityDelete(Obj: any) {
        return this.postAsync(this.ActivityApi.updateCrmActivityDelete, Obj);
    }
    postCompleteActivitybyIds(Obj: any) {
        return this.postAsync(this.ActivityApi.updateCompleteActivitybyIds, Obj);
    }
    getActivityDetailsActivitybyId(activityid: any, moduleid: any) {
        var getactivitydetailsActivitybyId = `${this.ActivityApi.getactivitydetailsactivitybyId}${activityid}/${moduleid}`;
        return this.getAsync(getactivitydetailsActivitybyId);
    }
    GetActivityDetails(accountid: any, moduleid: any) {
        var getactivityDetails = `${this.ActivityApi.getactivitydetails}${accountid}/${moduleid}`;
        return this.getAsync(getactivityDetails);
    }
    postCrmActivity(Obj: any) {
        return this.postAsync(this.ActivityApi.updateCrmActivity, Obj);
    }
    PostAttachemts(formData) {
        return this.postAsync(this.ActivityApi.updateAttachemts, formData);
    }
    getCompanyApiGetConatctlistForCompanyId(conatctListCompanyId: any) {
        var getcompanyapiGetConatctlistForCompanyId = `${this.ActivityApi.getcompanyapigetconatctlistForCompanyId}${conatctListCompanyId.companyid}/${conatctListCompanyId.pageindex}/${conatctListCompanyId.pagesize}/${conatctListCompanyId.orderbyclause}/${conatctListCompanyId.recordcount}`;
        return this.getAsync(getcompanyapiGetConatctlistForCompanyId);
    }
    GetAccountDetailsByID(opperId) {
        var getAccountDetailsByID = `${this.ActivityApi.getaccountDetailsByID}${opperId}`;
        return this.getAsync(getAccountDetailsByID);
    }
    deleteActivityById(ActivityIDs) {
        return this.postAsync(this.ActivityApi.deleteActivityById, ActivityIDs);
    }
    ActivityComplete(activityId) {
        return this.postAsync(this.ActivityApi.activityComplete, activityId);
    }
    GetActivitytypebyid(LeadId, ModuleId) {
        let getactivitytypebyid = this.ActivityApi.getActivitydetailsById + LeadId + '/' + ModuleId;
        return this.getAsync(getactivitytypebyid);
    }
    InsertActivityDetails(model) {
        return this.postAsync(this.ActivityApi.insertActivityDetails, model);
    }
    CompleteActivitybyIds(model: any) {
        return this.postAsync(this.ActivityApi.completeactivitybyids, model);
        
    }
    ActivityApi = {
        activityComplete: '/api/1/commonapi/completeactivitybyids',
        deleteActivityById: '/api/1/commonapi/deleteactivitybyids',
        getactivityapi: '/api/1/companyapi/activitylist/',
        updateCrmActivityDelete: '/api/1/commonapi/deleteactivitybyids',
        updateCompleteActivitybyIds: '/api/1/commonapi/completeactivitybyids',
        getactivitydetailsactivitybyId: '/api/1/commonapi/getactivitydetails/',
        getactivitydetails: '/api/1/commonapi/createactivity/',
        getActivitydetailsById: '/api/1/commonapi/createactivity/',
        updateCrmActivity: '/api/1/commonapi/insertupdateactivity',
        insertActivityDetails: '/api/1/commonapi/insertupdateactivity',
        updateAttachemts: '/api/1/commonapi/postattachmentfromangular',
        getcompanyapigetconatctlistForCompanyId: '/api/1/companyapi/contactlistbycompanyid/',
        getaccountDetailsByID: '/api/1/leadsapi/',
        completeactivitybyids:`/api/1/commonapi/completeactivitybyids`
    };
}
