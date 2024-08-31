import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatTableDataSource } from '@angular/material/table';
import { from, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { OAuthQuickBookService } from '../services/OAuthquickbook.Service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ClaimsHelper } from './claimshelper';
import { CommonService } from '../services/common.service';
import { ClientViewModel } from '../models/IClientViewModel';
import { Observable } from 'rxjs';
import { debounce, map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/IUser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginError: string = '';
    form: FormGroup;
    token: any;
    dataSource: any;
    isLoginForm: boolean = true;
    FirstName: any;
    LastName: any;
    Password: any;
    LoginId: any;
    model = {};
    companylog: string;
    showPassword: boolean = false;
    rememberMe: any;
    clientObj: ClientViewModel = new ClientViewModel();
    ShowRegisrationForm: Boolean = false;
    ShowForgetpassword: boolean = false;
    isLoading: boolean = false;
    constructor(
        private cookieService: CookieService,
        private readonly fb: FormBuilder,
        private oauthquckbookService: OAuthQuickBookService,
        public sr: AuthenticationService,
        public router: Router,
        public dialog: MatDialog,
        public claimsHelper: ClaimsHelper,
        public commonservice: CommonService,
        public _userService: UserService,
        private spinner:NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            grant_type: ['password'],
            password: ['', Validators.required],
            clientId: ['', { validators: [Validators.required], updateOn: 'blur' }]
        });
        this.updateFormValues();
    }
    updateFormValues() {
        // Updating only specific fields in the form
        this.rememberMe = JSON.parse(this.cookieService.get('rememberMe') || 'false');
        this.form.patchValue({
            username: this.cookieService.get('username') || '',
            clientId: this.cookieService.get('clientId') || '',
            password: this.cookieService.get('password') || ''
        });
    }
    validatorPassword(fc: FormControl) {
        const value = fc.value as string;
        const isInvalid = 'password' === value.trim().toLowerCase();
        return isInvalid ? { passwordError: 'Password is not a strong password' } : null;
    }

    valuechange(newValue) {
        this.form.value.clientId = newValue;
        localStorage.setItem('ClientId', this.form.value.clientId);
        this.sr.GetClientDetailsById(this.form.value.clientId).subscribe((data) => {
            this.spinner.hide();
            this.model = { ...data };
            if (this.model['CompanyLogo']) {
                this.companylog = this.model['CompanyLogo'];
            }
        });
    }
    submitForm() {
        if (this.form.valid) {
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, 10000);

            localStorage.setItem('ClientId', this.form.value.clientId);
            this.sr.GetClientDetailsById(this.form.value.clientId).subscribe((data) => {
                this.model = { ...data };
                if (data == null) {
                    this.model = {};
                    this.companylog = '';
                }
            });
            this.sr.userLogin(this.form.getRawValue()).subscribe((res) => {
                if (res.error != 'Wrong credentials..') {
                    this.token = res.access_token;
                    localStorage.setItem('token', this.token);
                    var clientType;
                    if (this.form.value.clientId == 'CRMV4_MASTER') {
                        clientType = 'superadmin';
                    } else if (this.form.value.clientId == 'CRMV4_medigavamshi') {
                        clientType = 'otheruser';
                    } else {
                        clientType = 'normaluser';
                    }
                    if (this.token != null) {
                        localStorage.setItem('token', this.token);
                        localStorage.setItem('Permission', clientType);
                        if (clientType.toLowerCase() == 'superadmin') {
                            this.router.navigate(['/admin']);
                        } else if (clientType.toLowerCase() == 'otheruser') {
                            this.router.navigate(['/otheruser']);
                        } else {
                            var UserId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
                            var QBExists = this.claimsHelper.QBExists();
                            if (QBExists == 'True' && UserId != '1') {
                                var Userid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
                                var QBClientID = this.claimsHelper.GetQbclientIDFromClaims();
                                var QBSecretID = this.claimsHelper.GetQBSecretIDFromClaims();
                                const formData = new FormData();
                                formData.append('Decrypt', QBSecretID);
                                this.commonservice.PostDecrypt(formData).subscribe((QBSecretID: any) => {
                                    QBSecretID = QBSecretID;
                                    this.GetOTP().subscribe((otp) => {
                                        if (otp) {
                                            localStorage.setItem('OTP', JSON.stringify(otp));
                                            this.GetSMS(otp).subscribe(
                                                (smsOtp: any) => {
                                                    this.connectToQuickBooks();
                                                },
                                                (error) => {
                                                    this.connectToQuickBooks();
                                                }
                                            );
                                        }
                                    });
                                });
                            } else if (QBExists == 'True' && UserId == '1') {
                                this.GetOTP().subscribe((otp) => {
                                    if (otp) {
                                        localStorage.setItem('OTP', JSON.stringify(otp));
                                        this.GetSMS(otp).subscribe(
                                            (smsOtp: any) => {
                                                this.connectToQuickBooks();
                                            },
                                            (error) => {
                                                this.connectToQuickBooks();
                                            }
                                        );
                                    }
                                });
                            } else {
                                this.GetOTP().subscribe((otp) => {
                                    if (otp) {
                                        localStorage.setItem('OTP', JSON.stringify(otp));
                                        this.GetSMS(otp).subscribe(
                                            (smsOtp: any) => {
                                                this.router.navigateByUrl('/verifyotp');
                                            },
                                            (error) => {
                                                this.router.navigateByUrl('/verifyotp');
                                            }
                                        );
                                    }
                                });
                            }
                        }
                    }
                    // localStorage.setItem('token', this.token);
                    //  localStorage.setItem("Permission", clientType);
                }
            });
        } else {
            //Swal.fire('Error', 'There is a problem with the form', 'error');
            console.log('There is a problem with the form');
            this.loginError = 'Invalid UserID and Password';
            //return false;
        }
    }
    keyDownFunction(event) {
        if (event.keyCode === 13) {
            // alert('you just pressed the enter key');
            // rest of your code
        }
    }
    keyPressNumbers(event) {
        var charCode = event.which ? event.which : event.keyCode;
        // Only Numbers 0-9
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            return false;
        } else {
            return true;
        }
    }
    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
    connectToQuickBooks(): void {
        var userModel = new ClientViewModel();
        var objclienttype = new ClientViewModel();
        let ClientName = localStorage.getItem('ClientId');
        if (ClientName != null) {
            this.commonservice.GetClientDetailsById(ClientName).subscribe((response: ClientViewModel) => {
                objclienttype = response;
                objclienttype.ClientNumber = objclienttype.ClientNumber;
            });
        }
        let Userid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
        if (Userid == 1) {
            this.commonservice.GetQBLoginIncomeAcct(Userid, ClientName).subscribe((resepone: any) => {
                userModel = resepone;
                if (userModel != null) {
                    if (userModel.QBClientID != null && userModel.QBSecretID != null && userModel.IsCorporate == true) {
                        const formData = new FormData();
                        formData.append('Decrypt', userModel.QBSecretID);
                        this.commonservice.PostDecrypt(formData).subscribe((QBSecretID: any) => {
                            userModel.QBSecretID = QBSecretID;
                            var objclienttype = new ClientViewModel();
                            objclienttype.QBClientID = userModel.QBClientID;
                            objclienttype.QBSecretID = userModel.QBSecretID;
                            objclienttype.QBRealmID = userModel.QBRealmID;
                            objclienttype.AccountID = userModel.AccountID;
                            objclienttype.AccountName = userModel.AccountName;
                            var ExistQBAccount = this.claimsHelper.QBExists();
                            if (objclienttype.QBClientID != null && objclienttype.QBSecretID != null && ExistQBAccount == 'True') {
                                const authorizationUrl = this.oauthquckbookService.getAuthorizationUrl(objclienttype.QBClientID);
                                window.location.href = authorizationUrl;
                                // const formData = new FormData();
                                // formData.append("QBClientID", QBClientID);
                                // this.commonservice.QuickBooksRedirection(formData).subscribe((authorizationUrl: any) => {
                                //   window.location.href = authorizationUrl;
                                // })
                            }
                        });
                    }
                }
            });
        } else {
            var ExistQBAccount = this.claimsHelper.QBExists();
            var QBClientID = this.claimsHelper.GetQbclientIDFromClaims();
            var QBSecretID = this.claimsHelper.GetQBSecretIDFromClaims();
            if (QBClientID != null && QBSecretID != null && ExistQBAccount == 'True') {
                const authorizationUrl = this.oauthquckbookService.getAuthorizationUrl(QBClientID);
                window.location.href = authorizationUrl;
                // const formData = new FormData();
                // formData.append("QBClientID", QBClientID);
                // this.commonservice.QuickBooksRedirection(formData).subscribe((authorizationUrl: any) => {
                //   window.location.href = authorizationUrl;
                // })
            }
        }
    }
    onRember(event: any) {
        this.rememberMe = event;
        if (this.rememberMe == true && event) {
            this.cookieService.set('rememberMe', 'true', 365); // Store for 365 days (adjust as needed)
            this.cookieService.set('username', this.form.value.username, 365);
            this.cookieService.set('clientId', this.form.value.clientId, 365);
            this.cookieService.set('password', this.form.value.password, 365);
        } else {
            // If "Remember Me" is not checked, remove stored values from cookies
            this.cookieService.delete('rememberMe');
            this.cookieService.delete('username');
            this.cookieService.delete('clientId');
            this.cookieService.delete('password');
        }
    }

    onRegisration() {
        this.ShowRegisrationForm = true;
    }
    onstatus(event) {
        this.ShowRegisrationForm = false;
        this.ShowForgetpassword = false;
    }

    OnForgetpassword() {
        this.ShowForgetpassword = true;
    }

    GetOTP(): Observable<any> {
        const formData = new FormData();
        formData.append('Email', this.claimsHelper.GetLoginUserNameAPIKeyFromClaims());
        formData.append('FullName', this.claimsHelper.GetUserNameAPIKeyFromClaims());
        return this.commonservice.PostOTPSMTP(formData);
    }

    GetSMS(code: any): Observable<any> {
        return new Observable((observer) => {
            let UserId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
            this._userService.GetUserInfoByUserID(UserId).subscribe(
                (response: ClientViewModel) => {
                    const userdetails = response;
                    const formData = new FormData();
                    formData.append('OTP', code);
                    formData.append('PhoneNo', userdetails.Users.Phone);
                    this.commonservice.ReceiveSMS(formData).subscribe(
                        (smsOtp) => {
                            observer.next(smsOtp);
                            observer.complete();
                        },
                        (error) => {
                            observer.error(error);
                        }
                    );
                },
                (error) => {
                    observer.error(error);
                }
            );
            (error) => {
                observer.error(error);
            };
        });
    }
}
