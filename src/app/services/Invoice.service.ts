import { Injectable } from '@angular/core';

import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService extends DataService {
    constructor(httpclient: HttpClient, public httpBackend: HttpBackend) {
        super(httpclient);
    }

    UpdateEstimateInvoicePost(EstimateInvoceObj) {
        return this.postAsync(this.EstimateAPI.UpdateEstimateInvoicePost, EstimateInvoceObj);
    }
    EstmateInvoiceOnePointMail(MailingInfoDomainModel) {
        return this.postAsync(this.EstimateAPI.EstmateInvoiceOnePointMail, MailingInfoDomainModel);
    }
    UpdateSingleInvoiceBalanceAmount(modal) {
        return this.postAsync(this.InvoiceAPI.UpdateSingleInvoiceBalanceAmount, modal);
    }
    InvoiceQuickBooksList(modal) {
        return this.postAsync(this.InvoiceAPI.GetInvoiceQuickBooksList, modal);
    }
    InsertQuickBooksInvoice(modal) {
        return this.postAsync(this.InvoiceAPI.InsertQuickBooksInvoice, modal);
    }

    GetQBLoginUserAcct(clientnumber, ClientName) {
        let GetQBLoginUserAcct = `${this.InvoiceAPI.GetQBLoginUserAcct}/${clientnumber}/${ClientName}`;
        return this.getAsync(GetQBLoginUserAcct);
    }
    CRM_UpdatePaymentbyID(payID, QBpayID) {
        let CRM_UpdatePaymentbyID = `${this.InvoiceAPI.CRM_UpdatePaymentbyID}/${payID}/${QBpayID}`;
        return this.getAsync(CRM_UpdatePaymentbyID);
    }
    GetInvoiceListForinvoiceId(invoiceId: any) {
        let GetInvoiceListForinvoiceId = `${this.InvoiceAPI.GetInvoiceListForinvoiceId}/${invoiceId}`;
        return this.getAsync(GetInvoiceListForinvoiceId);
    }
    GellAllPaymentbyInvoiceID(invoiceId: any) {
        let GellAllPaymentbyInvoiceID = `${this.InvoiceAPI.GellAllPaymentbyInvoiceID}/${invoiceId}`;
        return this.getAsync(GellAllPaymentbyInvoiceID);
    }

    MiPaymentBearerToken(modal) {
        return this.postAsync(this.InvoiceAPI.MiPaymentBearerToken, modal);
    }

    GetEstimatList(CreateByUserID, startIndex, pageSize, orderByClause, TotalCount) {
        return this.getAsync(`${this.EstimateAPI.GetEstList}/${CreateByUserID}/${startIndex}/${pageSize}/${orderByClause}/${TotalCount}`);
    }

    GetEstimateinvoiceDetailsbyId(estinvoiceid) {
        let URL = `${this.EstimateAPI.GetestimateinvoiceDetailsbyId}/${estinvoiceid}`;
        return this.getAsync(URL);
    }
    GetLastInvoicenumber() {
        return this.getAsync(this.InvoiceAPI.GetLastInvoicenumber);
    }
    DeleteEstInvids(id) {
        return this.postAsync(`${this.EstimateAPI.DeleteEstInvids}`, id);
    }
    InsertInvoice(modal) {
        return this.postAsync(`${this.InvoiceAPI.InsertInvoice}`, modal);
    }
    GetInvoiceList(UserId, statustype, invoice, jtStartIndex, jtPageSize, jtSorting, RecordCount) {
        let URL = `${this.InvoiceAPI.GetInvoiceList}/${UserId}/${statustype}/${invoice}/${jtStartIndex}/${jtPageSize}/${jtSorting}/${RecordCount}`;
        return this.getAsync(URL);
    }
    GetInvoiceDetailsByInvoiceId(invoiceId: any) {
        let url = `${this.InvoiceAPI.GetInvoiceDetailsByInvoiceId}/${invoiceId}`;
        return this.getAsync(url);
    }
    DeleteInvoiceIds(Obj: any) {
        return this.postAsync(`${this.InvoiceAPI.DeleteInvoiceIds}`, Obj);
    }
    UpdateInvoiceDetailsValue(modal: any) {
        return this.postAsync(`${this.InvoiceAPI.UpdateInvoiceDetailsValue}`, modal);
    }
    insertUpdateInvoiceitems(modal: any) {
        return this.postAsync(`${this.InvoiceAPI.insertUpdateInvoiceitems}`, modal);
    }
    InsertPaymentsDetails(model) {
        return this.postAsync(`${this.PaymentsAPI.InsertPaymentsDetails}`, model);
    }
    GetInvoiceItemforCard(InvoiceId: any, InvoiceNo: any) {
        let url = `${this.InvoiceAPI.GetInvoiceItemforCard}/${InvoiceId}/${InvoiceNo}`;
        return this.getAsync(url);
    }
    UpdateSingleInvAmountByQuickPay(InvoiceId, TransactionID, QBRealmID, UserID, ClientName) {
        let url = `${this.InvoiceAPI.UpdateSingleInvAmountByQuickPay}/${InvoiceId}/${TransactionID}/${QBRealmID}/${UserID}/${ClientName}`;
        return this.getAsync(url);
    }
    CompaniesContact(companyid) {
        let url = `${this.InvoiceAPI.CompaniesContact}/${companyid}`;
        return this.getAsync(url);
    }
    InvoiceAPI = {
        UpdateSingleInvoiceBalanceAmount: `/api/1/invoiceapi/updatesingleinvoicebalanceamount`,
        GetInvoiceQuickBooksList: `/api/1/invoiceapi/invoiceQuickBooksList`,
        InsertQuickBooksInvoice: `/api/1/invoiceapi/QuickBooksInvoice`,
        GetQBLoginUserAcct: `/api/1/invoiceapi/GetQBloginUserAcct`,
        CRM_UpdatePaymentbyID: `/api/1/invoiceapi/CRM_updatepaymentbyid`,
        // GetInvoiceListForinvoiceId: `/api/1/invoiceapi/invoicelistbycompanyid`,
        GellAllPaymentbyInvoiceID: `/api/1/invoiceapi/gellallpaymentbyinvoiceID`,
        MiPaymentBearerToken: `/api/1/invoiceapi/MiPaymentBearerToken`,
        GetLastInvoicenumber: `/api/1/invoiceapi/getlastinvoicenumber`,
        InsertInvoice: `/api/1/invoiceapi/insertinvoicedetails`,
        GetInvoiceList: `/api/1/invoiceapi`,
        GetInvoiceDetailsByInvoiceId: `/api/1/invoiceapi/getinvoicedetailsbyinvd`,
        DeleteInvoiceIds: `/api/1/invoiceapi/deleteinvids`,
        UpdateInvoiceDetailsValue: `/api/1/invoiceapi/upadteinvoicedetailsvalue`,
        insertUpdateInvoiceitems: `/api/1/invoiceapi/insertupdateinvoiceitemsdetails`,
        InsertPaymentsDetails: '/api/1/invoiceapi/insertpaymentdetails',
        GetInvoiceItemforCard: `/api/1/invoiceapi/getinvoiceitemforcard`,
        UpdateSingleInvAmountByQuickPay: `/api/1/invoiceapi/updatesingleinvamountbyQuickPay`,
        CompaniesContact: `/api/1/invoiceapi/companycontacts`,
        GetInvoiceListForinvoiceId: `/api/1/invoiceapi/invoicelistbyInvoiceid`
    };

    EstimateAPI = {
        UpdateEstimateInvoicePost: `/api/1/invoiceapi/updateestimateinvoicepostvalue`,
        EstmateInvoiceOnePointMail: `/api/1/invoiceapi/EstmateInvoiceOnePointMail`,
        GetEstList: `/api/1/invoiceapi`,
        GetestimateinvoiceDetailsbyId: `/api/1/invoiceapi/getestimateinvoiceDetailsbyId`,
        DeleteEstInvids: `/api/1/invoiceapi/deleteestinvids`
    };
    PaymentsAPI = {
        InsertPaymentsDetails: '/api/1/invoiceapi/insertpaymentdetails'
    };
    ServiceAPI = {
       // _BaseURL: 'http://localhost:52320',localAPI
       _BaseURL:`https://dev.psplhyd.com/Connector-Api`,
        token: '/token',
        Email:'/api/1/values/Email'
    };
    ServiceToken(form: any) {
        // Convert form object to URL-encoded string
        const formUrlEncoded = Object.keys(form)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(form[key])}`)
            .join('&');
    
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const req = new HttpRequest('POST', `${this.ServiceAPI._BaseURL}${this.ServiceAPI.token}`,formUrlEncoded,{ headers: headers });
        return this.httpBackend.handle(req);
    }
    ServiceInvoiceEmail(form){
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem("ServiceToken")}`,
            'Content-Type': 'application/json',
        });
        const req = new HttpRequest('POST', `${this.ServiceAPI._BaseURL}${this.ServiceAPI.Email}`,form,{ headers: headers });
        return this.httpBackend.handle(req);
    }
    // GetServiceToken(form) {
        
    //     return this.httpBackend.handle(new HttpRequest('post', `${this.ServiceAPI._BaseURL}${this.ServiceAPI.token}`, form))
    //    //return this.postAsync(`${this.ServiceAPI._BaseURL}${this.ServiceAPI.token}`, form);
    // }
    // //  ServiceauthToken(Obj: any) {
    //     const ServiceauthToken = localStorage.getItem("ServiceauthToken")
    //     const headers = new HttpHeaders({
    //       'Authorization': `Bearer ${ServiceauthToken}`,
    //        'Content-Type: application/x-www-form-urlencoded'
    //     })
    //     return this.httpBackend.handle(new HttpRequest('post', `${this.ServiceAPI._BaseURL}${this.ServiceAPI.token}`, Obj, { headers: headers }))
    //     //  return this.httpClient.post<any>("https://gateway.mipaymentchoice.com/api/v2/transactions/bcp", Obj,{headers:headers})
    //   }
}
