import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { ClaimsHelper } from '../login/claimshelper';
import { debounce, map, shareReplay } from 'rxjs/operators';

@Injectable()
export class ContactService extends DataService {
    readonly baseUrl: any = environment.apiserver;
    constructor(private httpClient: HttpClient, public climes: ClaimsHelper) {
        super(httpClient);
    }

    GetContacts(
        SearchColumn,
        AlphanumericSort,
        Createdby,
        Contactkeyword,
        OwnerName,
        CompanyName,
        CompanyId,
        userId,
        jtStartIndex,
        jtPageSize,
        jtSorting,
        RecordCount
    ) {
        var getContact =
            this.ContactApi.getcontacts +
            SearchColumn +
            '/' +
            AlphanumericSort +
            '/' +
            Createdby +
            '/' +
            Contactkeyword +
            '/' +
            OwnerName +
            '/' +
            CompanyName +
            '/' +
            CompanyId +
            '/' +
            userId +
            '/' +
            jtStartIndex +
            '/' +
            jtPageSize +
            '/' +
            jtSorting +
            '/' +
            RecordCount;
        return this.getAsync(getContact);
    }
    deleteProjectContact(obj: any) {
        return this.postAsync(this.ContactApi.deleteContact, obj);
    }
    GetContactDetails(ContactID: number, accounttypeid: number) {
        var getContactDetails = `${this.ContactApi.getcontacts}${ContactID}/${accounttypeid}`;
        return this.getAsync(getContactDetails);
    }
    CreateCompanyContactBycompanyid(companyid: any) {
        var createcompanycontactBycompanyid = `${this.ContactApi.getCompanyContactBycompanyid}/${companyid}`;
        return this.getAsync(createcompanycontactBycompanyid);
    }
    GetCloneContacttypeDetailsbyid(companyid: any) {
        var getclonecontacttypeDetailsbyid = `${this.ContactApi.getcontacts}${companyid}`;
        return this.getAsync(getclonecontacttypeDetailsbyid);
    }
    postCrmContact(Obj: any) {
        return this.postAsync(this.ContactApi.InsertContactDetails, Obj);
    }
    PostAttachment(formData) {
        return this.postAsync(this.ContactApi.updateAttachemts, formData);
    }
    InsertUpdateAPIContactIDs(Obj: any) {
        return this.postAsync(this.ContactApi.insertUpdateAPIContactIDs, Obj);
    }
    GetAccountDetailsByID(opperId) {
        var getaccountDetailsByID = `${this.ContactApi.getaccountdetailsByID}${opperId}`;
        return this.getAsync(getaccountDetailsByID);
    }
    CreateNewCompanyDetails(model) {
        return this.postAsync(this.ContactApi.updateNewCompanyDetails, model);
    }
    GetactivitylistbycontactIdAPI(companyid, accounttype, module, idisplaystart, idisplaylength, orderbyclause, recordcount) {
        debugger;
        var getactivitylistbycontactIdAPI = `${this.ContactApi.getactivitylistbycontactIdAPI}/${companyid}/${accounttype}/${module}/${idisplaystart}/${idisplaylength}/${orderbyclause}/${recordcount}`;
        return this.getAsync(getactivitylistbycontactIdAPI);
    }
    GetActivityDetails(ActivityID, ModuleId) {
        let GetActivityDetails = this.ContactApi.getActivityDetails + ActivityID + '/' + ModuleId;
        return this.getAsync(GetActivityDetails);
    }
    sendEmail(ModuleId, activityID) {
        let GetsendEmailactivity = `${this.ContactApi.getsendEmailactivity}/${activityID}/${ModuleId}`;
        return this.getAsync(GetsendEmailactivity);
    }
    DeleteAccountsById(id) {
        return this.postAsync(this.ContactApi.deleteAccountsById, id);
    }
    insertContactDetails(model) {
        return this.postAsync(this.ContactApi.InsertContactDetails, model);
    }
    GetCompanyDetailsforMaillingAddress(CompanyID) {
        let getcompanyUrl = this.ContactApi.getcompanydetailsbycompanyid + CompanyID;
        return this.getAsync(getcompanyUrl);
    }
    getcontactdetailsByCompanyId(companyid) {
        let GetcontactdetailsByCompanyId = this.ContactApi.getcontactdetailsByCompanyId + companyid;
        return this.getAsync(GetcontactdetailsByCompanyId);
    }
    ContactApi = {
        getcontactdetailsByCompanyId: '/api/1/companyapi/createcompanycontact/',
        getActivityDetails: '/api/1/commonapi/getactivitydetails/',
        getcontacts: '/api/1/contactApi/',
        getaccountdetailsByID: '/api/1/leadsapi/',
        deleteContact: '/api/1/leadsapi/deleteleadids',
        getCompanyContactBycompanyid: '/api/1/companyapi/createcompanycontact/',
        updateAttachemts: '/api/1/commonapi/postattachmentfromangular',
        insertUpdateAPIContactIDs: '/api/1/commonapi/InsertsUpdateAPIOnePointContactIds',
        updateNewCompanyDetails: '/api/1/companyapi/postcompany',
        InsertContactDetails: '/api/1/contactApi',
        getactivitylistbycontactIdAPI: `/api/1/contactApi/acivities`,
        getsendEmailactivity: `/api/1/commonapi/sendMail`,
        deleteAccountsById: '/api/1/leadsapi/deleteleadids',
        getcompanydetailsbycompanyid: '/api/1/companyapi/'
    };
}
