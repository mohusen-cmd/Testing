import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";
import { ClaimsHelper } from "../login/claimshelper";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ReportsService extends DataService {
    constructor(public httpclient: HttpClient, public claimsHelper: ClaimsHelper) {
        super(httpclient);
    }
    GetactivitesPriorityIDReport(startDate, endDate, PriorityID) {
        let url = `${this.ReportsAPI.GetactivitesPriorityIDReport}/${startDate}/${endDate}/${PriorityID}`
        return this.getAsync(url)
    }
    GetActivitesStatusReportDropdown() {
        let url = `${this.ReportsAPI.GetActivitesStatusReportDropdown}`
        return this.getAsync(url)
    }
    GetActivitesStatusIDReport(startDate, endDate, StatusID) {
        let url = `${this.ReportsAPI.GetActivitesStatusIDReport}/${startDate}/${endDate}/${StatusID}`
        return this.getAsync(url)
    }
    GetActivitesPriorityReportDropdown() {
        let url = `${this.ReportsAPI.GetActivitesPriorityReportDropdown}`
        return this.getAsync(url)
    }
    GetActivitesTypeReportDropdown() {
        let url = `${this.ReportsAPI.GetActivitesTypeReportDropdown}`
        return this.getAsync(url)
    }
    GetactivitesByActivityTypeIDReport(startDate, endDate, ActivityTypeID) {
        let url = `${this.ReportsAPI.GetactivitesByActivityTypeIDReport}/${startDate}/${endDate}/${ActivityTypeID}`
        return this.getAsync(url)
    }
    GetActivitesModelReportDropdown() {
        let url = `${this.ReportsAPI.GetActivitesModelReportDropdown}`
        return this.getAsync(url)
    }
    GetactivitesModelReport(startDate, endDate, AccountTypeID) {
        let url = `${this.ReportsAPI.GetactivitesModelReport}/${startDate}/${endDate}/${AccountTypeID}`
        return this.getAsync(url)
    }
    
    GetopenCompleteActivitesReport(startDate, endDate, status) {
        let url = `${this.ReportsAPI.GetopenCompleteActivitesReport}/${startDate}/${endDate}/${status}`
        return this.getAsync(url)
    }
    GetActivitesReport(startDate, endDate) {
        let url = `${this.ReportsAPI.GetActivitesReport}/${startDate}/${endDate}`
        return this.getAsync(url)
    }
    GetCompanyOwnerReportDropdown() {
        let url = `${this.ReportsAPI.GetCompanyOwnerReportDropdown}`
        return this.getAsync(url)
    }
    GetCompanyOwnerReport(startDate, endDate, Ownership) {
        let url = `${this.ReportsAPI.GetCompanyOwnerReport}/${startDate}/${endDate}/${Ownership}`
        return this.getAsync(url)
    }
    GetCompanyOwnerShipReportDropdown() {
        let url = `${this.ReportsAPI.GetCompanyOwnerShipReportDropdown}`
        return this.getAsync(url)
    }
    GetCompanyOwnerShipReport(startDate, endDate, CompanyOwnershipTypeText) {
        let url = `${this.ReportsAPI.GetCompanyOwnerShipReport}/${startDate}/${endDate}/${CompanyOwnershipTypeText}`
        return this.getAsync(url)
    }
    GetCompanyTypeReportDropdown() {
        let url = `${this.ReportsAPI.GetCompanyTypeReportDropdown}`
        return this.getAsync(url)
    }
    GetCompanyTypeReport(startDate, endDate, companytypetext) {
        let url = `${this.ReportsAPI.GetCompanyTypeReport}/${startDate}/${endDate}/${companytypetext}`
        return this.getAsync(url)
    }
    GetCompanyDetailReport(startDate, endDate) {
        let url = `${this.ReportsAPI.GetCompanyDetailReport}/${startDate}/${endDate}`
        return this.getAsync(url)
    }
    GetCompanyIndustryReportDropdown() {
        let url = `${this.ReportsAPI.GetCompanyIndustryReportDropdown}`
        return this.getAsync(url)
    }
    GetCompanyIndustryReport(startDate, endDate, CompanyIndustryText) {
        let url = `${this.ReportsAPI.GetCompanyIndustryReport}/${startDate}/${endDate}/${CompanyIndustryText}`
        return this.getAsync(url)
    }
    GetContactTypeReportDropdown() {
        let url = `${this.ReportsAPI.GetContactTypeReportDropdown}`
        return this.getAsync(url)
    }
    GetContacatByContactTypeReport(startDate, endDate, ContactTypeText) {
        let url = `${this.ReportsAPI.GetContacatByContactTypeReport}/${startDate}/${endDate}/${ContactTypeText}`
        return this.getAsync(url)
    }
    GetContactLeadSourceReportDropdown() {
        let url = `${this.ReportsAPI.GetContactLeadSourceReportDropdown}`
        return this.getAsync(url)
    }
    GetContacatByLeadSourceAndContactTypeReport(startDate, endDate, LeadSourceText, ContactTypeText) {
        let url = `${this.ReportsAPI.GetContacatByLeadSourceAndContactTypeReport}/${startDate}/${endDate}/${LeadSourceText}/${ContactTypeText}`
        return this.getAsync(url)
    }
    GetContacatByLeadSourceReport(startDate, endDate, LeadSourceText) {
        let url = `${this.ReportsAPI.GetContacatByLeadSourceReport}/${startDate}/${endDate}/${LeadSourceText}`
        return this.getAsync(url)
    }
    GetContactOwnerReportDropdown() {
        let url = `${this.ReportsAPI.GetContactOwnerReportDropdown}`
        return this.getAsync(url)
    }
    GetContacatByContactOwnerReport(startDate, endDate, Ownership) {
        let url = `${this.ReportsAPI.GetContacatByContactOwnerReport}/${startDate}/${endDate}/${Ownership}`
        return this.getAsync(url)
    }
    GetContacatDetailReport(startDate, endDate) {
        let url = `${this.ReportsAPI.GetContacatDetailReport}/${startDate}/${endDate}`
        return this.getAsync(url)
    }
    
    ReportsAPI = {
        GetactivitesPriorityIDReport: `/api/1/activitytypeapi/activitesPriorityIDReport`,
        GetActivitesStatusReportDropdown: `/api/1/activitytypeapi/activitesStatusReportDropdown`,
        GetActivitesStatusIDReport: `/api/1/activitytypeapi/activitesStatusIDReport`,
        GetActivitesPriorityReportDropdown: `/api/1/activitytypeapi/activitesPriorityReportDropdown`,
        GetActivitesTypeReportDropdown: `/api/1/activitytypeapi/activitesTypeReportDropdown`,
        GetactivitesByActivityTypeIDReport: `/api/1/activitytypeapi/activitesByActivityTypeIDReport`,
        GetActivitesModelReportDropdown: `/api/1/activitytypeapi/activitesModelReportDropdown`,
        GetactivitesModelReport: `/api/1/activitytypeapi/activitesModelReport`,
        GetopenCompleteActivitesReport: `/api/1/activitytypeapi/openActivitesReport`,
        GetActivitesReport: `/api/1/activitytypeapi/activitesReport`,
        GetCompanyOwnerReportDropdown: `/api/1/companyapi/companyOwnerreportDropdown`,
        GetCompanyOwnerReport: `/api/1/companyapi/companyOwnerreport`,
        GetCompanyOwnerShipReportDropdown: `/api/1/companyapi/companyOwnershipreportDropdown`,
        GetCompanyOwnerShipReport: `/api/1/companyapi/companyOwnerShipreport`,
        GetCompanyTypeReportDropdown: `/api/1/companyapi/companyTypereportDropdown`,
        GetCompanyTypeReport: `/api/1/companyapi/companyTypereport`,
        GetCompanyDetailReport: `/api/1/companyapi/companyreport`,
        GetCompanyIndustryReportDropdown: `/api/1/companyapi/companyIndustryreportDropdown`,
        GetCompanyIndustryReport: `/api/1/companyapi/companyIndustryreport`,
        GetContactTypeReportDropdown: `/api/1/contactApi/ContactTypeReportDropdown`,
        GetContacatByContactTypeReport: `/api/1/contactApi/contactByContactTypeReport`,
        GetContactLeadSourceReportDropdown: `/api/1/contactApi/ContactByLeadSourceReportDropdown`,
        GetContacatByLeadSourceAndContactTypeReport: `/api/1/contactApi/contactByLeadSourceAndContactTypeReport`,
        GetContacatByLeadSourceReport: `/api/1/contactApi/contactByLeadSourceReport`,
        GetContactOwnerReportDropdown: `/api/1/contactApi/ContactOwnerReportDropdown`,
        GetContacatByContactOwnerReport: `/api/1/contactApi/contactByContactOwnerReport`,
        GetContacatDetailReport: `/api/1/contactApi/contactDetailReport`
    }
}