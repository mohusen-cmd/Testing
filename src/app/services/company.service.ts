import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClaimsHelper } from '../login/claimshelper';
import { DataService } from './data.service';

@Injectable()
export class CompanyService extends DataService {
    readonly baseUrl: any = environment.apiserver;
    constructor(private httpClient: HttpClient, public climes: ClaimsHelper) {
        super(httpClient);
    }
    GetCompanyapi(searchcolumn, alphanumericsort, companykeyword, ownername, userid, startindex, pagesize, orderbyclause, recordcount) {
        var getCompanyapi = `${this.CompanyAPI.getCompanyapi}${searchcolumn}/${alphanumericsort}/${companykeyword}/${ownername}/${userid}/${startindex}/${pagesize}/${orderbyclause}/${recordcount}`;
        return this.getAsync(getCompanyapi);
    }
    CompanyDelete(Obj: any) {
        return this.postAsync(this.CompanyAPI.companyDelete, Obj);
    }
    GetCompanyDetailsById(companyid: number) {
        var getCompanyDetailsById = `${this.CompanyAPI.getCompanyDetailsById}${companyid}`;
        return this.getAsync(getCompanyDetailsById);
    }
    InsertCompanyDetails(Obj: any) {
        return this.postAsync(this.CompanyAPI.postCrmCompany, Obj);
    }
    deleteCompanyDetails(Obj: any) {
        return this.postAsync(this.CompanyAPI.getCompanyDetailsById, Obj);
    }
    PostAttachemts(formData) {
        return this.postAsync(this.CompanyAPI.postAttachemts, formData);
    }
    getCompanyApiGetConatctlistForCompanyId(companyid: any, pageindex: any, pagesize: any, orderbyclause: any, recordcount: any) {
        var getCompanyApiGetConatctlist = `${this.CompanyAPI.getCompanyApiGetConatctlistForCompanyId}${companyid}/${pageindex}/${pagesize}/${orderbyclause}/${recordcount}`;
        return this.getAsync(getCompanyApiGetConatctlist);
    }
    getCompanyApiGetopprFormCompanyId(
        searchcolumn: any,
        alphanumericsort: any,
        keyword: any,
        companyid: any,
        companyname: any,
        userid: any,
        stageid: any,
        jtstartindex: any,
        jtpagesize: any,
        jtsorting: any,
        recordcount: any
    ) {
        var getCompanyApiGetopprFormCompanyId = `${this.CompanyAPI.getCompanyApiGetopprFormCompanyId}${searchcolumn}/${alphanumericsort}/${keyword}/${companyid}/${companyname}/${userid}/${stageid}/${jtstartindex}/${jtpagesize}/${jtsorting}/${recordcount}`;
        return this.getAsync(getCompanyApiGetopprFormCompanyId);
    }

    InsertQuickBookCrmCompany(Obj: any) {
        return this.postAsync(this.CompanyAPI.InsertQuickBooksCompanyDetails, Obj);
    }
    GetAttachmentsList(attContactId, Module, pageindex, pagesize, orderbyclause, totalpagecount) {
        var getattachmentlisturl =
            this.CompanyAPI.getattachmentlist +
            attContactId +
            '/' +
            Module +
            '/' +
            pageindex +
            '/' +
            pagesize +
            '/' +
            orderbyclause +
            '/' +
            totalpagecount;
        return this.getAsync(getattachmentlisturl);
    }
    GetNoteList(notescompanyid, module, pageindex, pagesize, orderbyclause, totalpagecount) {
        var getnotelistbycompanyid =
            this.CompanyAPI.getnotelistbyCompanyIdAPI +
            notescompanyid +
            '/' +
            module +
            '/' +
            pageindex +
            '/' +
            pagesize +
            '/' +
            orderbyclause +
            '/' +
            totalpagecount;
        return this.getAsync(getnotelistbycompanyid);
    }
    SaveNotes(notemodel) {
        return this.postAsync(this.CompanyAPI.saveNote, notemodel);
    }
    GetActivityList(companyid, accountype, module, pageindex, pagesize, orderby, recordcount) {
        var getactivitylistbycompanyid =
            this.CompanyAPI.getactivitylistbyCompanyIdAPI +
            companyid +
            '/' +
            accountype +
            '/' +
            module +
            '/' +
            pageindex +
            '/' +
            pagesize +
            '/' +
            orderby +
            '/' +
            recordcount;
        return this.getAsync(getactivitylistbycompanyid);
    }
    GetContactInfo(companyid, pageindex, pagesize, orderby, totalrecordcount) {
        var getcontactsbycompanyId =
            this.CompanyAPI.getcontactbycompanyIdAPI +
            '/' +
            companyid +
            '/' +
            pageindex +
            '/' +
            pagesize +
            '/' +
            orderby +
            '/' +
            totalrecordcount;
        return this.getAsync(getcontactsbycompanyId);
    }
    GetOpportunityList(
        searchcolumn,
        alphanumericsort,
        companykeyword,
        companyid,
        companyname,
        userid,
        stageid,
        startindex,
        psize,
        orderbyclause,
        recordcount
    ) {
        var getopportunitybycompanyId =
            this.CompanyAPI.getopportunitybycompanyIdAPI +
            searchcolumn +
            '/' +
            alphanumericsort +
            '/' +
            companykeyword +
            '/' +
            companyid +
            '/' +
            companyname +
            '/' +
            userid +
            '/' +
            stageid +
            '/' +
            startindex +
            '/' +
            psize +
            '/' +
            orderbyclause +
            '/' +
            recordcount;
        return this.getAsync(getopportunitybycompanyId);
    }
    CompanyAPI = {
        getopportunitybycompanyIdAPI: '/api/1/opportunitiesapi/',
        getcontactbycompanyIdAPI: '/api/1/companyapi/contactlistbycompanyid/',
        saveNote: `/api/1/commonapi/insertupdatenotes`,
        getnotelistbyCompanyIdAPI: '/api/1/commonapi/noteslist/',
        getCompanyapi: '/api/1/companyapi/getcompaniesindex/',
        getattachmentlist: '/api/1/commonapi/getattachments/',
        companyDelete: '/api/1/companyapi/deletecompanies',
        getCompanyDetailsById: '/api/1/companyapi/',
        postCrmCompany: '/api/1/companyapi/postcompany',
        //postCrmCompanyDelete: '/api/1/companyapi/deletecompanies',
        postAttachemts: '/api/1/commonapi/postattachmentfromangular',
        getCompanyApiGetConatctlistForCompanyId: '/api/1/companyapi/contactlistbycompanyid/',
        getCompanyApiGetopprFormCompanyId: '/api/1/opportunitiesapi/',
        InsertQuickBooksCompanyDetails: `/api/1/companyapi/QuickBookspostcompany`,
        getactivitylistbyCompanyIdAPI: '/api/1/contactapi/acivities/'
    };
}
