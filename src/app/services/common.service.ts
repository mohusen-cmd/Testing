import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DataService } from './data.service';
import { Inject, Injectable } from '@angular/core';
import { ClaimsHelper } from '../login/claimshelper';
import { environment } from 'src/environments/environment';
import { PlatformLocation } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CommonService extends DataService {
    public redirectUrl = '';
    constructor(
        public httpclient: HttpClient,
        public claimsHelper: ClaimsHelper,
        public httpBackend: HttpBackend,
        @Inject(PlatformLocation) private platformLocation: PlatformLocation
    ) {
        super(httpclient);
        const currentOrigin = (this.platformLocation as any)._doc.location.origin;
        this.redirectUrl = currentOrigin + '/verifyotp';
    }
    DeleteLeadbyId(deletedids, APIContactID) {
        let EAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
        let OnePointAPIKey: any = '/Api_Key/';
        let EAPIKEY = this.claimsHelper.GetEmailAPIKeyFromClaims();
        let APIurl = EAPILink + 'contact/' + APIContactID + OnePointAPIKey + EAPIKEY;
        return this.deleteOnePointAPIKeyByIdAsync(APIurl);
    }
    downloadAttachmentFile(filename, modulename, username, uesrid) {
        let downloadattachment = `${this.CommonApi.downloadattachmentfile}/${filename}/${modulename}/${username}/${uesrid}`;
        return this.getDownloadFileAsync(downloadattachment);
    }

    GetQBLoginIncomeAcct(clientnumber: any, ClientName: any) {
        let GetQBLoginIncomeAcct = `${this.LoginAPI.GetQBLoginIncomeAcct}/${clientnumber}/${ClientName}`;
        return this.getAsync(GetQBLoginIncomeAcct);
    }

    GetGoogleanalyticsdata() {
        let GetGooglaAnalyticsData = `${this.GoogledataAPI.GooglaAnalyticsData}`;
        return this.getAsync(GetGooglaAnalyticsData);
    }
    Sendmail(formData) {
        let SendMail = this.CommonApi.SMTPMAIL;
        return this.postAsync(SendMail, formData);
    }
    ImportHistory(formData: any) {
        let Import = this.LoginAPI.Importleadsfiledata;
        return this.postAsync(Import, formData);
    }
    ImportFilesLeads(formData: any) {
        let Import = this.CommonApi.LeadsimportFile;
        return this.postAsync(Import, formData);
    }
    ImportFilesCompanies(formData: any) {
        let Import = this.CommonApi.CompanyImportFile;
        return this.postAsync(Import, formData);
    }
    ImportCompany(formData: any) {
        let Import = this.LoginAPI.Importcompanyfiledata;
        return this.postAsync(Import, formData);
    }

    ImportFilesContact(formData: any) {
        let Import = this.CommonApi.ContactImportFile;
        return this.postAsync(Import, formData);
    }
    ImportContact(formData: any) {
        let Import = this.LoginAPI.Importcontactfiledata;
        return this.postAsync(Import, formData);
    }
    GetNotesByIds(notescontactid, moduleid, pageindex, pagesize, sortby, totalpagecount) {
        let UrlApiparams = `${this.CommonApi.GetNotesByIds}/${notescontactid}/${moduleid}/${pageindex}/${pagesize}/${sortby}/${totalpagecount}`;
        return this.getAsync(UrlApiparams);
    }
    GetAttachmentsList(contactid, module, startIndex, pageSize, orderByClause, totalCount) {
        let UrlApiparams = `${this.CommonApi.GetAttachmentsList}/${contactid}/${module}/${startIndex}/${pageSize}/${orderByClause}/${totalCount}`;
        return this.getAsync(UrlApiparams);
    }
    GetClientDetailsById(clientId) {
        let GetClientDetailsByClientId = `${this.LoginAPI.GetClientDetailsByClientId}/${clientId}`;
        return this.getAsync(GetClientDetailsByClientId);
    }
    GetDecrypt(key: any) {
        let GetDecrypt = `${this.CommonApi.GetDecrypt}/${key}`;
        return this.getAsync(GetDecrypt);
    }
    PostDecrypt(formData: any) {
        return this.postAsync(this.CommonApi.GetDecrypt, formData);
    }
    PostEncrypt(formData: any) {
        return this.postAsync(this.CommonApi.GetEncrypt, formData);
    }
    PostOTPSMTP(formData) {
        return this.postAsync(this.LoginAPI.OTPFROMSMTP, formData);
    }
    GetClientDetails(clientdb: any) {
        let url = `${this.LoginAPI.GetLoginDetials}/${clientdb}`;
        return this.getAsync(url);
    }
    SendMailForgotPass(model: any) {
        return this.postAsync(`${this.LoginAPI.Forgetpassword}`, model);
    }
    GetLoginDetails(ClientDB, Email, Answer, Qid) {
        let url = `${this.LoginAPI.GetLoginDetials}/${ClientDB}/${Email}/${Answer}/${Qid}`;
        return this.getAsync(url);
    }
    QuickBooksRedirection(formData: any) {
        return this.postAsync(`${this.LoginAPI.QuickBooksRedirection}`, formData);
    }
    QBIncomeAcct(model) {
        return this.postAsync(`${this.Clientmanagerapi.QBIncomeAcct}`, model);
    }
    RevokeQuickBooksConnection(formData) {
        return this.postAsync(`${this.LoginAPI.RevokeQuickBooksConnection}`, formData);
    }
    DeleteAttachmentByAttachmentId(formData: any) {
        return this.deleteAsync(`${this.CommonApi.Deleteattachment}`, formData);
    }
    InsertAttachemts(formData) {
        return this.postAsync(`${this.CommonApi.InsertAttachemts}`, formData);
    }
    Insertupdatenotes(formData) {
        return this.postAsync(`${this.CommonApi.Insertupdatenotes}`, formData);
    }

    ReceiveSMS(formData) {
        return this.postAsync(`${this.LoginAPI.SendSMS}`, formData);
    }
    RefreshQBToken(formData) {
        if (this.redirectUrl == environment.redirectURLCRMLocal) {
            var Status = 'AngularUI';
            formData.append('Status', Status);
            return this.postAsync(`${this.CommonApi.RefreshQBToken}`, formData);
        } else if (this.redirectUrl == environment.redirectURLCRMQA) {
            var Status = `AngularQA`;
            formData.append('Status', Status);
            return this.postAsync(`${this.CommonApi.RefreshQBToken}`, formData);
        }
    }
    GetCompanyIdbyCompanyName(ContactCompanyName) {
        let getcompanyName = this.CommonApi.getcompanyidbycompanyName + ContactCompanyName;
        return this.getAsync(getcompanyName);
    }
    GetAccountDetailsByID(ContactId) {
        let AccountDetailsByID = this.CommonApi.getAccountDetailsByID + ContactId;
        return this.getAsync(AccountDetailsByID);
    }
    CommonApi = {
        downloadattachmentfile: `/api/1/commonapi/downloadattachments`,
        SMTPMAIL: `/api/1/commonapi/sendmailleads`,
        LeadsimportFile: `/api/1/commonapi/leadsimportFile`,
        CompanyImportFile: '/api/1/commonapi/companyimportFile',
        ContactImportFile: `/api/1/commonapi/contactimportFile`,
        GetNotesByIds: `/api/1/commonapi/noteslist`,
        GetAttachmentsList: '/api/1/commonapi/getattachments',
        GetDecrypt: `/api/1/commonapi/Decrypt`,
        GetEncrypt: `/api/1/commonapi/Encrypt`,
        Deleteattachment: `/api/1/commonapi/deleteattachment`,
        InsertAttachemts: `/api/1/commonapi/postattachmentfromangular`,
        Insertupdatenotes: `/api/1/commonapi/insertupdatenotes`,
        RefreshQBToken: `/api/1/commonapi/RefreshQBToken`,
        getcompanyidbycompanyName: '/api/1/commonapi/getcompanyidbycompanyname/',
        getAccountDetailsByID: '/api/1/leadsapi/'
    };

    LoginAPI = {
        GetQBLoginIncomeAcct: `/api/1/loginapi/GetQBloginIncomeAcct`,
        Importleadsfiledata: `/api/1/loginapi/importleadsfiledata`,
        Importcompanyfiledata: `/api/1/loginapi/importcompanyfiledata`,
        Importcontactfiledata: `/api/1/loginapi/importcontactfiledata`,
        GetClientDetailsByClientId: `/api/1/loginapi/getclientlogo`,
        OTPFROMSMTP: `/api/1/loginapi/sendotp`,
        GetLoginDetials: `/api/1/loginapi`,
        Forgetpassword: `/api/1/loginapi/sendMaillForgotPass`,
        QuickBooksRedirection: `/api/1/loginapi/RedirectToQuickBookSite`,
        RevokeQuickBooksConnection: `/api/1/loginapi/RevokeQuickBooksConnection`,
        SendSMS: `/api/1/loginapi/SendSMS`
    };

    GoogledataAPI = {
        GooglaAnalyticsData: `/api/1/commonapi/GoogleAnalyticsData`
    };
    Clientmanagerapi = {
        QBIncomeAcct: `/api/1/clientmanagerapi/QBincomeAcct`
    };

    MiPaymentauthenticate(formData) {
        this.httpclient = new HttpClient(this.httpBackend);
        return this.httpclient.post<any>(`${this.MiPayment.MiPaymentBaseUrl}${this.MiPayment.MiPaymentauthenticate}`, formData);
    }
    MiPaymentECP(formData) {
        const BillingauthToken = localStorage.getItem('BillingauthToken');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${BillingauthToken}`,
            'Content-Type': 'application/json'
        });
        return this.httpBackend.handle(
            new HttpRequest('post', `${this.MiPayment.MiPaymentBaseUrl}${this.MiPayment.MiPaymentECP}`, formData, { headers: headers })
        );
        //return this.httpBackend.post<any>(`${this.MiPayment.MiPaymentBaseUrl}${this.MiPayment.MiPaymentECP}`, formData);
    }
    MiPayment = {
        MiPaymentBaseUrl: 'https://gateway.mipaymentchoice.com',
        MiPaymentauthenticate: '/api/authenticate',
        MiPaymentECP: '/api/v2/transactions/ecp'
    };
}
