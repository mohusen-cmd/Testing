import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthQuickBookService } from 'src/app/services/OAuthquickbook.Service';
import { ClaimsHelper } from '../claimshelper';
import { CommonService } from 'src/app/services/common.service';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-verify-otp',
    templateUrl: './verify-otp.component.html',
    styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
    loginId: string = ''; // Replace with the actual loginId value
    phoneNumber: string = ''; // Replace with the actual phoneNumber value
    secureCode: string = '';
    isLoading: boolean = false;
    clientObj: ClientViewModel = new ClientViewModel();
    constructor(
        private oauthquckbookService: OAuthQuickBookService,
        private router: Router,
        public route: ActivatedRoute,
        public claimsHelper: ClaimsHelper,
        public commonservice: CommonService,
        public toastr: ToastrManager,
        private cookieService: CookieService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.loginId = this.claimsHelper.GetLoginUserNameAPIKeyFromClaims();
        if (localStorage.getItem('QBAccessToken') == null || localStorage.getItem('QBAccessToken') == 'undefined') {
            this.GetQuickBookParamsAuthication();
        }
    }
    GetQuickBookParamsAuthication() {
        var userLoginModel = new ClientViewModel();
        var objclienttypelog = new ClientViewModel();

        this.route.queryParams.subscribe((params) => {
            const code = params['code'];
            const state = params['state'];
            const realmId = params['realmId'];
            localStorage.setItem('code', code);
            localStorage.setItem('state', state);
            localStorage.setItem('realmId', realmId);
            if (code) {
                var clientId = localStorage.getItem('ClientId');
                this.commonservice.GetClientDetailsById(clientId).subscribe((objclienttypelog: ClientViewModel) => {
                    objclienttypelog.ClientNumber = objclienttypelog.ClientNumber;
                });

                var Userid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
                if (Userid == 1) {
                    var clientId = localStorage.getItem('ClientId');
                    this.commonservice.GetQBLoginIncomeAcct(Userid, clientId).subscribe((resepone: ClientViewModel) => {
                        userLoginModel = resepone;
                        if (userLoginModel.QBClientID != null && userLoginModel.QBSecretID != null && userLoginModel.IsCorporate == true) {
                            const formData = new FormData();
                            formData.append('Decrypt', userLoginModel.QBSecretID);
                            this.commonservice.PostDecrypt(formData).subscribe((QBSecretID: any) => {
                                objclienttypelog.QBSecretID = QBSecretID;
                                objclienttypelog.QBClientID = userLoginModel.QBClientID;
                                this.GetQBAccessToken(code, objclienttypelog.QBClientID, objclienttypelog.QBSecretID);
                            });
                        }
                    });
                } else {
                    objclienttypelog.QBClientID = this.claimsHelper.GetQbclientIDFromClaims();
                    objclienttypelog.QBSecretID = this.claimsHelper.GetQBSecretIDFromClaims();
                    const formData = new FormData();
                    formData.append('Decrypt', objclienttypelog.QBSecretID);
                    this.commonservice.PostDecrypt(formData).subscribe((QBSecretID: any) => {
                        objclienttypelog.QBSecretID = QBSecretID;
                        this.GetQBAccessToken(code, objclienttypelog.QBClientID, objclienttypelog.QBSecretID);
                    });
                }
            }
        });
    }

    GetQBAccessToken(code, QBClientID, QBSecretID) {
        this.cookieService.set('code', code, 365);
        this.cookieService.set('QBClientID', QBClientID, 365);
        this.cookieService.set('QBSecretID', QBSecretID, 365);
        this.oauthquckbookService.GettingQuickBookAuthenticationToken(code, QBClientID, QBSecretID).subscribe((data: any) => {
            if (data != null) {
                var QBObj = JSON.parse(data);
                this.cookieService.set('Refresh_token', QBObj['refresh_token'], 365);
                localStorage.setItem('QBAccessToken', QBObj['access_token']);
                localStorage.setItem('Refresh_token', QBObj['refresh_token']);
            }
        });
    }

    Verify() {
        this.isLoading = true;

        // Simulate an async operation (e.g., HTTP request)
        setTimeout(() => {
            // This is just a simulation. In a real application, you would handle the async operation here.
            this.isLoading = false;
        }, 10000);
        // this.spinner.show();
        var OTP = JSON.parse(localStorage.getItem('OTP'));
        if (OTP == this.secureCode) {
            Swal.fire({
                icon: 'success',
                text: 'OTP Verfied Successfully!!!!',
                timer: 700
            });
            this.router.navigateByUrl('/Home');
        } else {
            this.isLoading = false;
            this.spinner.hide();
            localStorage.clear();
            this.router.navigate(['/login']);
        }
    }

    onEnterKey(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            // Trigger Verify method when Enter key is pressed
            this.Verify();
        }
    }
}
