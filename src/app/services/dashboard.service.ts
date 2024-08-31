import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DataService } from "./data.service";

@Injectable()
export class DashboardService extends DataService {
    readonly baseUrl: any = environment.apiserver;
    constructor(private httpClient: HttpClient) {
        super(httpClient)
    }

    GetAdminDashboard(loginid, roleId) {
        var getAdminDashboard = this.DashboardAPI.getadminDashboard + loginid + '/' + roleId;
        return this.getAsync(getAdminDashboard)
    }
    GeteventsCalender(UserId) {
        var geteventsCalender = `${this.DashboardAPI.geteventscalender}${UserId}`
        return this.getAsync(geteventsCalender)
    }
    GetDashboardData(loginid, roleId) {
        var getDashboardData = `${this.DashboardAPI.getadminDashboard}${loginid}/${roleId}`
        return this.getAsync(getDashboardData)
    }
    GetNotificationsList(loginid, startIndex, pageSize, orderByClause, TotalCount) {
        var getNotificationsList = `${this.DashboardAPI.getadminDashboard}${loginid}/${startIndex}/${pageSize}/${orderByClause}/${TotalCount}`
        return this.getAsync(getNotificationsList)
    }
    GetInvoiceDashboard(loginid, roleId) {
        var getInvoiceDashboard = `${this.DashboardAPI.getinvoiceDashboard}${loginid}/${roleId}`
        return this.getAsync(getInvoiceDashboard)
    }
    GetDashBoardNotification(loginid, startIndex, pageSize, orderByClause, TotalCount) {
        let URL = `${this.DashboardAPI.getadminDashboard}${loginid}/${startIndex}/${pageSize}/${orderByClause}/${TotalCount}`
        return this.getAsync(URL)
    }
    GetEmpNotification(empid, status) {
        let URL = `${this.DashboardAPI.getEmpNotification}/${empid}/${status}`
        return this.getAsync(URL)
    }
    GetEmpNotificationcount(roleId, userId) {
        let URL = `${this.DashboardAPI.getEmpNotificationcount}/${roleId}/${userId}`
        return this.getAsync(URL)
    }
    DashboardAPI =
        {
            getadminDashboard: '/api/1/dashboardapi/',
            geteventscalender: '/api/1/dashboardapi/getschedularnotifications/',
            getinvoiceDashboard: '/api/1/dashboardapi/invoicedashboard/',
            getEmpNotification: `/api/1/dashboardapi/getempnotification`,
            getEmpNotificationcount: `/api/1/dashboardapi/getempnotificationcount`

        }
}