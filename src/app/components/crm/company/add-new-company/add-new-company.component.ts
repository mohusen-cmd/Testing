import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';
;
import { ToastrManager } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';

import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { CompanyDetailsViewModel, CompanyViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { InvoiceService } from 'src/app/services/Invoice.service';

import { CommonService } from 'src/app/services/common.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'app-add-new-company',
    templateUrl: './add-new-company.component.html',
    styleUrls: ['./add-new-company.component.scss']
})
export class AddNewCompanyComponent implements OnInit {
    //public maskUsMobile = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskUsMobile = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    registerForm: FormGroup;
    submitted = false;
    myFiles: string[] = [];
    showSearchUsersmodal: boolean = false;
    ShowCompanyListModal: boolean = false;
    companydetails: CompanyDetailsViewModel = new CompanyDetailsViewModel();
    @ViewChild('myuploadInput') myInputVariable: any;
    userName: any;
    userId: any;
    CompanyId: any;
    AccountTypeID: number;
    ViewTab: string;
    Urlvalidator = 'https?://.+';
    constructor(
        private spinner: NgxSpinnerService,
        public _commonService: CommonService,
        public _cookieService: CookieService,
        public _invoicService: InvoiceService,
        private toastr: ToastrManager,
        private activatedRoute: ActivatedRoute,
        private companyservice: CompanyService,
        private router: Router,
        private contactService: ContactService,
        private fb: FormBuilder,
        private claimsHelper: ClaimsHelper
    ) {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.CompanyId = params.get('Id');
        });
        this.userName = this.claimsHelper.GetUserNameAPIKeyFromClaims();
        this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
        this.companydetails.listCustomfields;
        this.companydetails.lstcustomVM;
        this.companydetails.lstCustomOptions;
        this.companydetails.LstCompany;
        this.companydetails.LstCompanyType;
        this.companydetails.lstcmpnyindustry;
        this.companydetails.LstOwnerShipType;
        this.companydetails.AccoutnList;
        this.companydetails.LstNotes;
        this.companydetails.CompanyObj = new CompanyViewModel();
        this.companydetails.customVM;
        this.companydetails.CustomDrpObj;
        this.companydetails.AllNotesObj;
        this.companydetails.AccountObj;
        this.companydetails.StateList;
        this.companydetails.CountryList;
    }
    ngOnInit() {
        this.registerForm = this.fb.group({
            ownership: new FormControl(''),
            phoneext: new FormControl(''),
            phone: new FormControl(''),
            companydba: new FormControl(''),
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.email),
            website: new FormControl('', Validators.pattern(this.Urlvalidator)),
            fax: new FormControl(''),
            parentcompanyname: new FormControl(''),
            companytypeid: new FormControl(''),
            companyindustryid: new FormControl(''),
            companystatusid: new FormControl(''),
            employees: new FormControl(''),
            annualrevenue: new FormControl('', Validators.maxLength(15)),
            siccode: new FormControl('', Validators.maxLength(25)),
            mailingaddress: new FormControl(''),
            shippingstreet: new FormControl(''),
            shippingcity: new FormControl(''),
            shippingstateid: new FormControl(''),
            shippingzip: new FormControl('', Validators.maxLength(9)),
            shippingcountryId: new FormControl(''),
            billingaddress: new FormControl(''),
            billingstreet: new FormControl(''),
            billingcity: new FormControl(''),
            billingstateid: new FormControl(''),
            billingzip: new FormControl('', Validators.maxLength(9)),
            billingcountryid: new FormControl(''),
            description: new FormControl(''),
            attachment: new FormControl(''),
            companyindustry: new FormControl(''),
            copymailing: new FormControl('')
        });
        if (this.CompanyId != '0') {
            this.companyservice.GetCompanyDetailsById(this.CompanyId).subscribe(
                (result: any) => {
                    this.companydetails = result;
                    this.companydetails.CompanyObj.ID = 0;
                    this.companydetails.CompanyObj.RoleID = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
                    this.companydetails.CompanyObj.RoleName = this.claimsHelper.GetRoleNameAPIKeyFromClaims();
                    this.spinner.hide();
                },
                (err: AppError) => {
                    this.spinner.hide();
                    if (err instanceof NotFoundError) {
                        window.alert('404 Error Occured!');
                    } else {
                        window.alert('An unexpected Error Occured!');
                    }
                }
            );
        } else {
            this.GetCompanyInfoCompanyId(0);
        }
    }
    get f() {
        return this.registerForm.controls;
    }
    GetCompanyInfoCompanyId(companyId) {
        this.companyservice.GetCompanyDetailsById(companyId).subscribe(
            (result) => {
                this.companydetails.CompanyObj.OwnerID = +this.claimsHelper.GetUserIdAPIKeyFromClaims();
                this.companydetails.CompanyObj.Ownership = this.claimsHelper.GetUserNameAPIKeyFromClaims();
                this.companydetails.LstCompanyType = result['LstCompanyType'];
                this.companydetails.StateList = result['StateList'];
                this.companydetails.LstOwnerShipType = result['LstOwnerShipType'];
                this.companydetails.CountryList = result['CountryList'];
                this.companydetails.lstcmpnyindustry = result['lstcmpnyindustry'];
                this.companydetails.listCustomfields = result['listCustomfields'];
                this.companydetails.CompanyObj.ShippingstateID = 0;
                this.companydetails.CompanyObj.ShippingcountryID = 0;
                this.companydetails.CompanyObj.BillingstateID = 0;
                this.companydetails.CompanyObj.BillingcountryID = 0;
                this.companydetails.CompanyObj.CompanyIndustryID = 0;
                this.companydetails.CompanyObj.CompanyStatusID = 0;
                this.companydetails.CompanyObj.CompanytypeID = 0;
                this.companydetails.CompanyObj.RoleID = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
            },
            (err) => {
                console.log(err);
            }
        );
    }
    getFileDetails(e) {
        for (var i = 0; i < this.myInputVariable.nativeElement.files.length; i++) {
            this.myFiles.push(e.target.files[i]);
        }
    }
    onChange(FieldId, DrpValueId, isChecked) {
        for (let fileditems of this.companydetails['listCustomfields'].filter((item) => item.FieldId == +FieldId)[0].lstCustomOptions) {
            if (fileditems.DrpValueId == DrpValueId) {
                this.companydetails['listCustomfields']
                    .filter((item) => item.FieldId == +FieldId)[0]
                    .lstCustomOptions.filter((item1) => item1.DrpValueId == +DrpValueId)[0].IsDefault = true;
                this.companydetails['listCustomfields'].filter((item) => item.FieldId == +FieldId)[0].DefaultValue = DrpValueId;
            } else {
                this.companydetails['listCustomfields']
                    .filter((item) => item.FieldId == +FieldId)[0]
                    .lstCustomOptions.filter((item1) => item1.DrpValueId == +fileditems.DrpValueId)[0].IsDefault = false;
            }
        }
    }
    onPhoneChange(ele, type) {
        var value = ele.target.value.replace(/[^a-zA-Z 0-9]+/g, '').trim();
        if (value.length < 10 || value.length > 10) {
            if (type == 'phone') {
                this.companydetails.CompanyObj.Phone = '';
            } else if (type == 'fax') {
                this.companydetails.CompanyObj.Fax = '';
            }
        }
    }

    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    onChangeCheckBox(FieldId, DrpValueId, isChecked) {
        if (isChecked) {
            this.companydetails['listCustomfields']
                .filter((item) => item.FieldId == +FieldId)[0]
                .lstCustomOptions.filter((item1) => item1.DrpValueId == +DrpValueId)[0].IsDefault = true;
        } else {
            this.companydetails['listCustomfields']
                .filter((item) => item.FieldId == +FieldId)[0]
                .lstCustomOptions.filter((item1) => item1.DrpValueId == +DrpValueId)[0].IsDefault = false;
        }
    }
    async SaveAndnewCompany(SaveNew) {
        this.submitted = true;

        if (this.registerForm.valid) {
            let accountid;
            let CompanyID;
            let CourntryName: any = '';
            for (let i = 0; i < this.companydetails.CountryList.length; i++) {
                CourntryName = this.companydetails.CountryList[i].CountryName;
            }
            var BillingAddress = {
                Line1: this.companydetails.CompanyObj.MailingAddress,
                City: this.companydetails.CompanyObj.Shippingcity,
                Country: CourntryName,
                CountrySubDivisionCode: 'US',
                PostalCode: this.companydetails.CompanyObj.Billingzip
            };
            var PrimaryPhone = {
                FreeFormNumber: this.companydetails.CompanyObj.Phone
            };
            var PrimaryEmailAddr = {
                Address: this.companydetails.CompanyObj.Email
            };
            var objectdata = {
                BillAddr: BillingAddress,
                DisplayName: this.companydetails.CompanyObj.Name,
                PrimaryPhone: PrimaryPhone,
                PrimaryEmailAddr: PrimaryEmailAddr,
                QBRealmID: localStorage.getItem('realmId'),
                QBBearerToken: await this.getAccessToken()
            };
            var QuickBookObj;
            var QBExists = this.claimsHelper.QBExists();

            if (QBExists == 'True') {
                this.companyservice.InsertQuickBookCrmCompany(objectdata).subscribe(
                    (response: any) => {
                        QuickBookObj = JSON.parse(response);
                        this.companydetails.CompanyObj.QBCustID = QuickBookObj['Customer'].Id;
                        this.companyservice.InsertCompanyDetails(this.companydetails).subscribe((response: any) => {
                            accountid = response;
                            this.companydetails.CompanyObj.ID = response;
                            this.CompanyId = this.companydetails.CompanyObj.ID;
                            CompanyID = response;
                            const formData = new FormData();
                            for (var i = 0; i < this.myFiles.length; i++) {
                                formData.append('files', this.myFiles[i]);
                            }
                            formData.append('uesrid', this.claimsHelper.GetUserIdAPIKeyFromClaims());
                            formData.append('username', this.claimsHelper.GetUserNameAPIKeyFromClaims());
                            formData.append('module', 'Company');
                            formData.append('accountId', CompanyID);
                            formData.append('filetype', 'Company');
                            this.companyservice.PostAttachemts(formData).subscribe((res) => {});
                            this.toastr.successToastr('Company Created  Successfully.', 'success');
                            if (SaveNew == 'savenew') {
                                let Id = 0,
                                    ModuleId = '3',
                                    ModuleName = 'Companies';
                                this.router.navigate(['CRM/companies/addnewcompany/', Id, { MId: ModuleId, MName: ModuleName }]).then(
                                    (nav) => {
                                        console.log(nav);
                                    },
                                    (err) => {
                                        console.log(err);
                                    }
                                );
                            } else {
                                // this.router.navigate(["crm/companies/viewcompany/",CompanyID,{viewtype:"Company"}]).then(nav => {
                                //   console.log(nav); // true if navigation is successful
                                // }, err => {
                                //   console.log(err) // when there's an error
                                // });
                                this.router
                                    .navigate(['CRM/companies/viewcompany/', CompanyID, { vname: 'Companies', tname: 'Companies' }])
                                    .then(
                                        (nav) => {
                                            console.log(nav);
                                        },
                                        (err) => {
                                            console.log(err);
                                        }
                                    );
                            }
                        });
                    },
                    (error) => {
                        this.toastr.warningToastr(`${error.Message} Company Name Already Exist`, 'warning');
                    }
                );
            } else {
                this.companyservice.InsertCompanyDetails(this.companydetails).subscribe(
                    (response: any) => {
                        accountid = response;
                        this.companydetails.CompanyObj.ID = response;
                        this.CompanyId = this.companydetails.CompanyObj.ID;
                        CompanyID = response;
                        const formData = new FormData();
                        for (var i = 0; i < this.myFiles.length; i++) {
                            formData.append('files', this.myFiles[i]);
                        }
                        formData.append('uesrid', this.claimsHelper.GetUserIdAPIKeyFromClaims());
                        formData.append('username', this.claimsHelper.GetUserNameAPIKeyFromClaims());
                        formData.append('module', 'Company');
                        formData.append('accountId', CompanyID);
                        formData.append('filetype', 'Company');
                        this.companyservice.PostAttachemts(formData).subscribe((res) => {});
                        this.toastr.successToastr('Company Created  Successfully.', 'success');
                        if (SaveNew == 'savenew') {
                            let Id = 0, ModuleId = "3", ModuleName = "Companies";
                            this.router.navigate(["CRM/companies/addnewcompany/", Id, { MId: ModuleId, MName: ModuleName }]).then(nav => {

                                console.log(nav);
                              }, err => {
                                console.log(err)
                              });
                            this.registerForm.reset();
                            this.submitted = false;
                            this.GetCompanyInfoCompanyId(0);
                        } else {
                            this.router.navigate(['CRM/companies/viewcompany/', CompanyID, { vname: 'Companies', tname: 'Companies' }]).then((nav) => { console.log(nav)},
                                        (err) => {
                                            console.log(err);
                                        }
                                    );
                        }
                    },
                    (error) => {}
                );
            }
        } else {
            return;
        }
    }
    GetSearchUsersList(event) {
        debugger;
        if (event.clientX != 0 && event.clientY != 0) {
            this.showSearchUsersmodal = true;
        }
    }
    GetSearchCompanyListModal(event) {
        if (event.clientX != 0 && event.clientY != 0) {
            this.ShowCompanyListModal = true;
        }
    }
    saveStatus() {
        this.showSearchUsersmodal = false;
        this.ShowCompanyListModal = false;
    }
    usersStatus(event) {
        this.companydetails.CompanyObj.OwnerID = event.UserId;
        this.companydetails.CompanyObj.Ownership = event.FullName;
        this.showSearchUsersmodal = false;
    }
    companyliststatus(event) {
        this.companydetails.CompanyObj.ParentCompanyID = event.CompanyID;
        this.companydetails.CompanyObj.ParentCompanyName = event.CompanyName;
        this.ShowCompanyListModal = false;
    }
    NavigateBackCompanylist() {
        this.router.navigate(['CRM/companies/']).then(
            (nav) => {
                console.log(nav); // true if navigation is successful
            },
            (err) => {
                console.log(err); // when there's an error
            }
        );
    }
    ClearFiles() {
        this.myFiles = [];
    }
    onChangeCopyMailing(event) {
        debugger;
        if (event == true) {
            this.companydetails.CompanyObj.BillingAddress = this.companydetails.CompanyObj.MailingAddress;
            this.companydetails.CompanyObj.Billingstreet = this.companydetails.CompanyObj.Shippingstreet;
            this.companydetails.CompanyObj.Billingcity = this.companydetails.CompanyObj.Shippingcity;
            this.companydetails.CompanyObj.BillingstateID = this.companydetails.CompanyObj.ShippingstateID;
            this.companydetails.CompanyObj.Billingzip = this.companydetails.CompanyObj.Shippingzip;
            this.companydetails.CompanyObj.BillingcountryID = this.companydetails.CompanyObj.ShippingcountryID;
        } else {
            this.companydetails.CompanyObj.BillingAddress = '';
            this.companydetails.CompanyObj.Billingstreet = '';
            this.companydetails.CompanyObj.Billingcity = '';
            this.companydetails.CompanyObj.BillingstateID = 0;
            this.companydetails.CompanyObj.Billingzip = '';
            this.companydetails.CompanyObj.BillingcountryID = 0;
        }
    }
    async getAccessToken(): Promise<string> {
        try {
            let userModel: ClientViewModel = new ClientViewModel();
            let ObjQBClientDetail = new ClientViewModel();
            let deserializeUsersModel = new ClientViewModel();
            var jsonClientModel: any = {};
            var clientId = localStorage.getItem('ClientId');
            let userid: number = this.claimsHelper.GetUserIdAPIKeyFromClaims();

            if (userid == 1) {
                jsonClientModel = await this._commonService.GetQBLoginIncomeAcct(userid, clientId).toPromise();
            } else {
                jsonClientModel = await this._invoicService.GetQBLoginUserAcct(userid, clientId).toPromise();
            }
            ObjQBClientDetail = jsonClientModel;
            if (jsonClientModel.IsCorporate == true) {
                if (ObjQBClientDetail.QBClientID != null && ObjQBClientDetail.QBSecretID != null) {
                    let formData1 = new FormData();
                    formData1.append('Decrypt', ObjQBClientDetail.QBSecretID);
                    let QBSecretID: any = await this._commonService.PostDecrypt(formData1).toPromise();
                    ObjQBClientDetail.QBSecretID = QBSecretID;
                    let Refresh_token = this._cookieService.get('Refresh_token');

                    if (!Refresh_token) {
                        Refresh_token = localStorage.getItem('Refresh_token');
                    }
                    let formData: FormData = new FormData();
                    formData.append('QBClientID', ObjQBClientDetail.QBClientID);
                    formData.append('QBSecretID', ObjQBClientDetail.QBSecretID);
                    formData.append('QBrefToken', Refresh_token);
                    let ResponseData: any = await this._commonService.RefreshQBToken(formData).toPromise();
                    if (ResponseData['access_token'] != null) {
                        localStorage.setItem('QBAccessToken', ResponseData['access_token']);
                    }
                    if (ResponseData['refresh_token'] != null) {
                        this._cookieService.set('Refresh_token', ResponseData['refresh_token']);
                        localStorage.setItem('Refresh_token', ResponseData['refresh_token']);
                    }
                    return ResponseData['access_token'] ?? localStorage.getItem('QBAccessToken');
                }
            }
        } catch (error) {
            console.error('Error occurred while fetching access token:', error);
        }
    }
}
