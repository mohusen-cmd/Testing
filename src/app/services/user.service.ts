import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable()

export class UserService extends DataService {
    private modals: any[] = [];



    constructor(httpclient: HttpClient) {
        super(httpclient);



    }

    // Without Interceptor
    //GetUserInfo(userId, roleId) {
    //    return this.httpclient.get(this.rootURL + "api/1/userapi/getuserinfolist" + userId + "/" + roleId,
    //        { headers: new HttpHeaders({ "Authorization": this.token }) });

    //}

    //using Interceptor
    GetUserInfo(userId, roleId) {

        return this.httpclient.get(this._baseUrl + "api/1/userapi/getuserinfolist/" + userId + "/" + roleId);
        // var this.token="Bearer "+localStorage.getItem("userthis.token");
        // return this.httpclient.get(this._baseUrl + "api/1/userapi/getuserinfolist/" + userId + "/" + roleId,
        //    { headers: new Headers({ "Authorization": this.token }) });
    }
    GetUserDetailsByLoginId(userId, loginType) {

        return this.httpclient.get(this._baseUrl + "api/1/userapi/getUserinfobyloginid/" + userId + "/" + loginType);
    }
    SaveUserInfo(userInfo) {

        //return this.httpclient.post(this._baseUrl + "api/1/userapi/createoredituserinfo/", userInfo);
        return this.httpclient.post(this._baseUrl + "api/1/userapi/createoredituserinfo/", userInfo);
    }
    SaveUserRoleInfo(userRoleInfo) {
        debugger

        if (userRoleInfo.RoleId == 0) {
            return this.httpclient.post(this._baseUrl + "/api/1/userrolesapi/", userRoleInfo);
        }
        else {
            return this.httpclient.post(this._baseUrl + "/api/1/userrolesapi/update", userRoleInfo);
        }
    }

    GetRoleList(startIndex, pageSize, orderByClause, totalCount) {

        return this.httpclient.get(this._baseUrl + "/api/1/userrolesapi/" + startIndex + "/" + pageSize + "/" + orderByClause + "/" + totalCount);
    }
    GetRolebyid(roleid) {

        return this.getbyId(this.UserRolesAPI.getuserrolebyidAPI, roleid);
    }
    GetRepList(roleId) {
        return this.httpclient.get(this._baseUrl + "api/1/userapi/", roleId);
    }
    GetDealerList(repId) {
        return this.httpclient.get(this._baseUrl + "api/1/userapi/getdealersbyrepid/" + repId);
    }
    GetAllDealerList(repId) {
        return this.httpclient.get(this._baseUrl + "api/1/userapi/getalldealersbyrepid/" + repId);
    }
    GetUserInfoByUserID(userId) {
        return this.httpclient.get(this._baseUrl + "/api/1/userapi/" + userId);
    }
    // For paging
    // getuserPageResults(userId, roleId,page: Page) {
    //     return this.httpclient.get(this._baseUrl + "api/1/userapi/getuserpageresults/" + userId + "/" + roleId+"/"+page.pageNumber+"/"+page.size+"/"+page.filter+"/"+ 0 );
    // }
    DeleteUserInfoByUserID(userId) {
        return this.httpclient.get(this._baseUrl + "api/1/userapi/deleteuserinfobyuserid/" + userId);
    }
    getMenus(menuId) {
        return this.httpclient.get(this._baseUrl + "api/1/accessmenusapi/getmenus/" + menuId);
    }


    GetChildMenusByParentMenuId(menuId, roleId) {
        return this.httpclient.get(this._baseUrl + "api/1/accessmenusapi/getchildmenusnewbyparentmenuid/" + menuId + "/" + roleId);
    }
    InsertMenus(menupermissionslist) {
        return this.httpclient.post(this._baseUrl + "api/1/accessmenusapi/insertrolemenupermissions/", menupermissionslist);
    }
    DeleteUserRoleByRoleId(roleId) {
        return this.httpclient.get(this._baseUrl + "api/1/userapi/deleterolebyid/" + roleId);
    }
    ResetPassWord(UserId, Password) {
        return this.httpclient.get(this._baseUrl + "api/1/userapi/passwordreset/" + UserId + "/" + Password);
    }
    saveUserRegisterPassword(userInfo) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        // reqHeader.append('Access-Control-Allow-Origin', '*');
        return this.httpclient.post(this._baseUrl + "api/1/registerApi/updateUserRegisteredPassword/", userInfo, { headers: reqHeader });
    }
    resendAccessCode(clientId, userId, emailId) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.httpclient.get(this._baseUrl + "api/1/registerApi/resendVerifyAccessCode/" + clientId + "/" + userId + "/" + emailId, { headers: reqHeader });

    }

    GetuserDetails(SearchColumn, AlphanumericSort, name, email, city, phone, keyword, state, zip, level, branch, loginId, roleId, jtStartIndex, jtPageSize, jtSorting, RecordCount) {
        var userdetails = this.UserAPI.getuserbyidAPI + "/" + SearchColumn + "/" + AlphanumericSort + "/" + name + "/" + email + "/" + city + "/" + phone + "/" + keyword + "/" + state + "/" + zip + "/" + level + "/" + branch + "/" + loginId + "/" + roleId + "/" + jtStartIndex + "/" + jtPageSize + "/" + jtSorting + "/" + RecordCount
        return this.getAsync(userdetails);
    }
    GetUserDropdownData() {

        var DropdownData = this.UserAPI.getuserbyidAPI + "/" + " "
        return this.getAsync(DropdownData);
    }
    GetUserDetailsById(userid) {

        var userdetails = this.UserAPI.getuserbyidAPI + "/" + userid
        return this.getAsync(userdetails)
    }
    GetUserRoleIsDuplicate(RoleName) {
        var RoleIsDuplicate = `${this.UserRolesAPI.getuserroleIsDuplicate}/${RoleName}`
        return this.getAsync(RoleIsDuplicate)
    }
    GetById(roleId) {
        var RoleIdAPI = `${this.UserRolesAPI.getuserrolebyidAPI}${roleId}`
        return this.getAsync(RoleIdAPI)
    }
    AddorEditUser(usermodel) {

        var adduser = this.UserAPI.getuserbyidAPI + "/"
        return this.postAsync(adduser, usermodel)
    }
    updateuserdata(usermodel) {
        return this.postAsync(this.UserAPI.updateuserbyidAPI, usermodel)
    }
    deleteUser(userid) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.httpclient.post<any>(this._baseUrl + '/api/1/userapi/deleteUser', userid, httpOptions)
    }

    DeleteuserRolesinfo(RoleId) {

        var deleteuserRoles = this.UserRolesAPI.getuserrolebyidAPI + "roleIds"
        return this.postAsync(deleteuserRoles, RoleId)
    }


    QBIncomeAcct(model) {
        return this.postAsync(this.UserAPI.QBIncomeAcct, model);
    }
    //-----------------------company Industry-------------

    // GetCompanyIndustryList(SearchColumn, AlphanumericSort, orderByClause,totalCount)
    // { 
    //    let getopplistUrl=  this.UserAPI.getcompanyindustryAPI+SearchColumn+"/"+AlphanumericSort+"/"+orderByClause+"/"+totalCount; 
    //    return this.getAsync(getopplistUrl); 
    // }
    UserRolesAPI = {
        // getuserrolelistAPI:'api/1/companyapi/getcompaniesindex/',
        getuserrolebyidAPI: '/api/1/userrolesapi/',
        getuserroleIsDuplicate: `/api/1/userrolesapi/isduplicate`,
        createAPI: ''
    }
    UserAPI =
        {
            getuserbyidAPI: "/api/1/userapi",
            getcompanyindustryAPI: "/api/1/companyindustryapi/",
            updateuserbyidAPI: "/api/1/userapi/update",
            QBIncomeAcct: `/api/1/userapi/QBadduseracct`
        }
}
