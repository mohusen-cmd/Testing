import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { ClaimsHelper } from '../login/claimshelper';



@Injectable(
    {
        providedIn: 'root'
    }
)

export class AdminService extends DataService {

    constructor(private httpClient: HttpClient, public claimsHelper: ClaimsHelper) {
        super(httpClient)
    }
    GetClientManagerApi() {
        return this.httpClient.get<any>(this._baseUrl + `/api/1/clientmanagerapi`)
    }
    DeleteClient(dbName: any) {
        return this.getAsync(`/api/1/clientmanagerapi/deleteclient/${dbName}`)
    }
    GetByIdClientManagerApi(clientDBName: any) {
        return this.httpClient.get<any>(this._baseUrl + `/api/1/clientmanagerapi/${clientDBName}`)
    }
    UpdateClientManager(Obj: any) {
        return this.httpClient.post<any>(this._baseUrl + `/api/1/clientmanagerapi/update`, Obj)
    }
    postClientManager(Obj: any) {
        return this.httpClient.post<any>(this._baseUrl + `/api/1/clientmanagerapi`, Obj)
    }
    IsDataBaseExists(clientId: any) {
        return this.httpClient.get<any>(this._baseUrl + `/api/1/clientmanagerapi/isduplicate/${clientId}`)
    }
    //using Interceptor
    GetClientList() {

        return this.httpclient.get(this._baseUrl + "api/1/clientmanagerapi/getclientslist/");
    }
    CheckDbExists(clientDbName) {

        return this.httpclient.get(this._baseUrl + "api/1/clientmanagerapi/checkdbexists/" + clientDbName);
    }
    CreateNewClient(client) {

        return this.httpclient.post(this._baseUrl + "api/1/clientmanagerapi/createnewcilent/", client);
    }
    GetClientDetailsById(clientId) {

        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.httpclient.get(this._baseUrl + "api/1/loginapi/getclientlogo/" + clientId, { headers: reqHeader });
        //return this.httpclient.get(this._baseUrl + "api/1/auth/getclientlogo/"+clientId,{ headers: reqHeader });        
    }
    EditClient(clientId) {
        return this.httpclient.get(this._baseUrl + "api/1/clientmanagerapi/editclient/" + clientId);
    }
    GetAutoAPIKey() {
        return this.httpclient.get(this._baseUrl + "/api/1/clientmanagerapi/getautoapikey/");
    }
    InactiveClient(clientId) {
        return this.httpclient.get(this._baseUrl + "api/1/adminapi/inactivateclient/" + clientId);
    }
    Reactiveclient(clientId) {
        return this.httpclient.get(this._baseUrl + "api/1/adminapi/reactivateclient/" + clientId);
    }
    UpdateClient(client) {
        return this.httpclient.post(this._baseUrl + "api/1/clientmanagerapi/editclient/", client);
    }
    GetVarifiedUserInfo(clientId, accesscode, userId) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.httpclient.get(this._baseUrl + "api/1/registerApi/getVarifiedUserInfo/" + clientId + "/" + accesscode + "/" + userId, { headers: reqHeader });
    }

}

