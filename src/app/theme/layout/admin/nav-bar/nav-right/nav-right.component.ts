import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LeadService } from 'src/app/services/lead.service';

@Component({
    selector: 'app-nav-right',
    templateUrl: './nav-right.component.html',
    styleUrls: ['./nav-right.component.scss'],
    providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
    @ViewChild('logoutItem') logoutItem: ElementRef;

    userName: any;
    Ncount: number;
    notifList: any;
    data: any;
    RoleName: any;

    constructor(
        private router: Router,
        private renderer: Renderer2,
        private claimsHelper: ClaimsHelper,
        public dashBoardService: DashboardService,
        public commonservice: CommonService,
        private cookieService: CookieService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.userName = this.claimsHelper.GetUserNameAPIKeyFromClaims();
        this.RoleName = this.claimsHelper.GetRoleNameAPIKeyFromClaims();
        this.getNoticationCount();
        this.getEmpNotification();
    }
    

    getNoticationCount() {
        let userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
        let roleId = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
        this.dashBoardService.GetEmpNotificationcount(roleId, userId).subscribe((res: number) => {
            this.Ncount = res;
        });
    }
    getEmpNotification() {
        var empid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
        var status = 1;
        this.dashBoardService.GetEmpNotification(empid, status).subscribe((res) => {
            this.notifList = res;
            this.data = this.notifList.length;
        });
    }

    logout() {
        localStorage.clear();
        //this.cookieService.deleteAll()
        this.spinner.hide();
        this.router.navigate(['/login']);
    }

    RevokeQuickBooksDisconnection() {
        this.spinner.show();
        var QBExists = this.claimsHelper.QBExists();
        if (QBExists == 'True') {
            var userLoginModel = new ClientViewModel();
            var objclienttypelog = new ClientViewModel();
            var RefreshToken = '',
                ClientID = '',
                QBclientID = '',
                QBsecretID = '';
            var QBexits: any = 'False';
            RefreshToken = this.cookieService.get('Refresh_token');
            QBclientID = this.cookieService.get('QBClientID');
            QBsecretID = this.cookieService.get('QBSecretID');
            QBexits = this.claimsHelper.QBExists();

            if (RefreshToken) {
                if (RefreshToken != '' && RefreshToken != null) {
                    RefreshToken = RefreshToken;
                }
            }
            if (localStorage.getItem('ClientId')) {
                if (localStorage.getItem('ClientId') != '' && localStorage.getItem('ClientId') != null) {
                    ClientID = localStorage.getItem('ClientId');
                }
            }
            if (QBclientID) {
                if (QBclientID != '' && QBclientID != null) {
                    QBclientID = QBclientID;
                }
            }
            if (QBsecretID) {
                if (QBsecretID != '' && QBsecretID != null) {
                    QBsecretID = QBsecretID;
                }
            }
            if (QBexits == 'True') {
                if (QBexits != '' && QBexits != null) {
                    QBexits = this.claimsHelper.QBExists();
                } else {
                    QBexits = 'False';
                }
            }
            if (RefreshToken != null && RefreshToken != '') {
                this.commonservice.GetClientDetailsById(ClientID).subscribe((JsonClientdetails: ClientViewModel) => {
                    if (JsonClientdetails != null) {
                        var ClientDetailsObj = JsonClientdetails;
                        objclienttypelog = ClientDetailsObj;
                        objclienttypelog.ClientNumber = objclienttypelog.ClientNumber;
                    }
                    var UserID = this.claimsHelper.GetUserIdAPIKeyFromClaims();
                    if (UserID == 1) {
                        this.commonservice.GetQBLoginIncomeAcct(UserID, ClientID).subscribe((JsonUserModel1: any) => {
                            var DeserializeUsersModel = JsonUserModel1;
                            userLoginModel = DeserializeUsersModel;
                            const formData = new FormData();
                            formData.append('Decrypt', userLoginModel.QBSecretID);
                            this.commonservice.PostDecrypt(formData).subscribe((SecretID: any) => {
                                QBsecretID = SecretID;
                                QBclientID = userLoginModel.QBClientID;
                                QBexits = userLoginModel.IsCorporate;
                                if (QBclientID != null && QBsecretID != null && (QBexits == true || QBexits == 'True')) {
                                    const formData = new FormData();
                                    formData.append('QBClientID', QBclientID);
                                    formData.append('QBSecretID', QBsecretID);
                                    formData.append('RefreshToken', RefreshToken);
                                    this.commonservice.RevokeQuickBooksConnection(formData).subscribe((response: any) => {
                                        if (response != null) {
                                            this.logout();
                                        }
                                    });
                                }
                            });
                        });
                    } else {
                        objclienttypelog.QBClientID = QBclientID;
                        objclienttypelog.QBSecretID = QBsecretID;
                        if (QBclientID != null && QBsecretID != null && (QBexits == true || QBexits == 'True')) {
                            const formData = new FormData();
                            formData.append('QBClientID', QBclientID);
                            formData.append('QBSecretID', QBsecretID);
                            formData.append('RefreshToken', RefreshToken);
                            this.commonservice.RevokeQuickBooksConnection(formData).subscribe((response: any) => {
                                if (response != null) {
                                    this.logout();
                                }
                            });
                        }
                    }
                });
            } else {
                this.logout();
            }
        } else {
            this.logout();
        }
    }
}
