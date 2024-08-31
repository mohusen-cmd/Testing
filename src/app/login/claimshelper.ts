import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable(
   {
      providedIn: 'root',
   }
)
export class ClaimsHelper {
   helper = new JwtHelperService();
   token: any;
   userid: string;
   constructor(public route: Router) {
   }
   decodeToken(tokenColumnName: string) {
      this.token = localStorage.getItem("token");

      if (this.token == "" || this.token == undefined) {
         this.route.navigate(['/login']);
      } else {
         let decodeToken = this.helper.decodeToken(this.token);

         return decodeToken[tokenColumnName];

      }
   }
   GetEmailapilinkFromClaims() {
      return this.decodeToken(this.tokenkeys.emailapilink);
   }
   GetEmailAPIKeyFromClaims() {
      return this.decodeToken(this.tokenkeys.emailapikey);
   }
   GetClientDbAPIKeyFromClaims() {
      return this.decodeToken(this.tokenkeys.clientdb);
   }
   GetUserIdAPIKeyFromClaims() {
      return this.decodeToken(this.tokenkeys.userid);
   }
   GetUserTypeAPIKeyFromClaims(){
      return this.decodeToken(this.tokenkeys.usertype)
   }
   GetUserNameAPIKeyFromClaims() {
      return this.decodeToken(this.tokenkeys.username);
   }
   GetRoleIdAPIKeyFromClaims() {
      return this.decodeToken(this.tokenkeys.roleid);
   }
   GetLoginUserNameAPIKeyFromClaims() {
      return this.decodeToken(this.tokenkeys.loginusername);
   }
   GetRoleNameAPIKeyFromClaims() {
      return this.decodeToken(this.tokenkeys.rolename);
   }
   GetQbclientIDFromClaims() {
      return this.decodeToken(this.tokenkeys.QbclientID);
   }
   GetQBSecretIDFromClaims() {
      return this.decodeToken(this.tokenkeys.QBSecretID);
   }
   GetSwitchCase(){
      return this.decodeToken(this.tokenkeys.SwitchCase);
   }
   QBExists(){
      return this.decodeToken(this.tokenkeys.QBExists);
   }
   tokenkeys = {
      emailapilink: "http://schemas.microsoft.com/ws/2008/06/identity/claims/emailapilink",
      emailapikey: "http://schemas.microsoft.com/ws/2008/06/identity/claims/emailapikey",
      clientdb: "http://schemas.microsoft.com/ws/2008/06/identity/claims/clientdb",
      userid: "http://schemas.microsoft.com/ws/2008/06/identity/claims/userid",
      username: "http://schemas.microsoft.com/ws/2008/06/identity/claims/fullname",
      roleid: "http://schemas.microsoft.com/ws/2008/06/identity/claims/roleid",
      rolename: "http://schemas.microsoft.com/ws/2008/06/identity/claims/rolename",
      systemrights: "http://schemas.microsoft.com/ws/2008/06/identity/claims/systemrights",
      companyname: "http://schemas.microsoft.com/ws/2008/06/identity/claims/companyname",
      defaultloginapp: "http://schemas.microsoft.com/ws/2008/06/identity/claims/defaultloginapp",
      useridentity: "http://schemas.microsoft.com/ws/2008/06/identity/claims/useridentity",
      usertype: "http://schemas.microsoft.com/ws/2008/06/identity/claims/usertype",
      clientid: "http://schemas.microsoft.com/ws/2008/06/identity/claims/clientid",
      fullname: "http://schemas.microsoft.com/ws/2008/06/identity/claims/fullname",
      authkey: "http://schemas.microsoft.com/ws/2008/06/identity/claims/authkey",
      emailapiusername: "http://schemas.microsoft.com/ws/2008/06/identity/claims/emailapiusername",
      switchcase: "http://schemas.microsoft.com/ws/2008/06/identity/claims/switchcase",
      QBExists: "http://schemas.microsoft.com/ws/2008/06/identity/claims/QBExists",
      QbclientID: "http://schemas.microsoft.com/ws/2008/06/identity/claims/QbclientID",
      QBSecretID: "http://schemas.microsoft.com/ws/2008/06/identity/claims/QBSecretID",
      SwitchCase:"http://schemas.microsoft.com/ws/2008/06/identity/claims/switchcase",
      loginusername: "unique_name"
   }

}

