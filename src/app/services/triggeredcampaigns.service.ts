import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class TriggeredcampaignsService extends DataService {

    constructor(httpclient: HttpClient) {

        super(httpclient);

    }

    TriggeredAPI = {
        GetEmailDashBoard: `/api/1/emailapi/`,
        triggeredcampaignsapi: '/api/1/emailapi/draftCampaignList/',
        geteditddlapi: '/api/1/commonapi/getemaildrp/',
        GetEditCampaignContent: '/api/1/emailapi/TempInfoBy/',
        insertupdateCamp: '/api/1/emailapi/InsertupdateCamp',
        UpdateCampaign: '/api/1/emailapi/UpdateCampaignSendType/',
        GetListCount: '/api/1/emailapi/GetListCount',
        ConformToSendDetailsAPI: '/api/1/emailapi/CampaignSelectList1/',
        ConfirmSendMail: '/api/1/emailapi/ConfirmSendMail',
        ConfirmSendTestMail: '/api/1/emailapi/ConfirmSendTestMail/',
        deletelistid1: '/api/1/emailapi/deletelistid1/',
        GetManagebleValueList: '/api/1/emailapi/GetManagebleValueList/',
        CampaignExists: '/api/1/emailapi/CampaignExists',
        UpdateCampaignScheduleStatus: `/api/1/emailapi/UpdateCampaignScheduleStatus`,
        Mail: '/api/1/emailapi/OnePointMail'
    }

    UpdateCampaignScheduleStatus(campaignmodel) {
        var url = this.TriggeredAPI.UpdateCampaignScheduleStatus;
        return this.postAsync(url, campaignmodel);
    }
    CampaignNameExists(campaignName: any, campID: any) {
        var url = `${this.TriggeredAPI.CampaignExists}/${campaignName}/${campID}`
        return this.getAsync(url);
    }

    GetTriggercampaignsList(SearchColumn, AlphanumericSort, orderByClause, totalCount) {

        var url = this.TriggeredAPI.triggeredcampaignsapi + SearchColumn + "/" + AlphanumericSort + "/" + orderByClause + "/" + totalCount;
        return this.getAsync(url);
    }

    GetEditCampaignContentddl(userid) {
        var url = this.TriggeredAPI.geteditddlapi + userid;
        return this.getAsync(url);
    }
    GetEditcompaingncontent(TempID) {
        var url = this.TriggeredAPI.GetEditCampaignContent + TempID;
        return this.getAsync(url);
    }
    Insertcompaingncontent(campaignmodel) {
        var url = this.TriggeredAPI.insertupdateCamp;
        return this.postAsync(url, campaignmodel);
    }
    UpdateCampaignSendType(campaignmodel) {
        var url = this.TriggeredAPI.UpdateCampaign;
        return this.postAsync(url, campaignmodel);
    }
    GetListCount(lead, contact, oppor) {
        var url = `${this.TriggeredAPI.GetListCount}/${lead}/${contact}/${oppor}`
        return this.getAsync(url);
    }
    ConformToSendDetails(camid) {
        var url = this.TriggeredAPI.ConformToSendDetailsAPI + camid;
        return this.getAsync(url);
    }
    ConfirmSendMail(objlist) {
        var url = this.TriggeredAPI.ConfirmSendMail;
        return this.postAsync(url, objlist);
    }
    DeleteCampaignbyId(camID) {
        var url = this.TriggeredAPI.deletelistid1 + camID
        return this.getAsync(url);
    }
    GetManagebleValueList1() {
        var url = this.TriggeredAPI.GetManagebleValueList + "1";
        return this.getAsync(url);

    }
    GetManagebleValueList2() {
        var url = this.TriggeredAPI.GetManagebleValueList + "2";
        return this.getAsync(url);

    }
    ConfirmSendTestMail(campaignmodel) {
        var url = this.TriggeredAPI.insertupdateCamp;
        return this.postAsync(url, campaignmodel);
    }
    GetMail() {
        var url = `${this.TriggeredAPI.Mail}`
        return this.getAsync(url);
    }

    GetEmailDashBoard(startIndex, pageSize, orderByClause, totalCount) {
        var url = `${this.TriggeredAPI.GetEmailDashBoard}/${startIndex}/${pageSize}/${orderByClause}/${totalCount}`
        return this.getAsync(url);
    }
    GetEmailDashonepoint() {
        // this.httpClient = new HttpClient(this.httpBackend)
        // return this.httpClient.get<any>(`https://1pointapi2.psplhyd.com/api/Api_Key/CMmLAYGVTpkigacTHT45kX2E8lxKZCoWDhx`)
      }
}
