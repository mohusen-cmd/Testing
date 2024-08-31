import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { ItemsDomainModel } from 'src/app/models/IItemsDomainModel';
import { InvoiceService } from 'src/app/services/Invoice.service';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { ItemService } from 'src/app/services/item.service';
import { QBApis } from 'src/app/services/qb_apis.service';

@Component({
    selector: 'app-add-iteams',
    templateUrl: './add-iteams.component.html',
    styleUrls: ['./add-iteams.component.scss']
})
export class AddIteamsComponent implements OnInit {
    IteamsForm: FormGroup;
    iteamsdetails: ItemsDomainModel = new ItemsDomainModel();
    clientObj: ClientViewModel = new ClientViewModel();
    IteamId: any;
    itemtypes: any;
    submitted: boolean = false;
    quearyModalobj: any;
    constructor(
        public authenticationservice: AuthenticationService,
        public activatedroute: ActivatedRoute,
        public _invoicService: InvoiceService,
        public _cookieService: CookieService,
        public commonservice: CommonService,
        public claimeHelper: ClaimsHelper,
        public itemservice: ItemService,
        public toastr: ToastrManager,
        public qbapisservice: QBApis,
        public fb: FormBuilder,
        public router: Router
    ) {}

    ngOnInit(): void {
        this.IteamsForm = this.fb.group({
            ItemCode: ['', Validators.required],
            ItemType: ['', Validators.required],
            ItemName: ['', Validators.required],
            SKU: [],
            RateperUnit: ['', Validators.required],
            SalesPrice: ['', Validators.required],
            Description: [],
            Active: []
        });

        this.activatedroute.queryParamMap.subscribe((queryParam) => {
            this.IteamId = queryParam.get('ItemID');
        });
        if (this.IteamId != 0) {
            this.itemservice.GetItemsByID(this.IteamId).subscribe((response: ItemsDomainModel) => {
                this.iteamsdetails = response;
            });
        } else if (this.IteamId == 0) {
            this.itemservice.GetItemsByID(this.IteamId).subscribe((response: ItemsDomainModel) => {
                this.iteamsdetails = response;
                if (this.iteamsdetails.Active == null) {
                    this.iteamsdetails.Active = true;
                }
            });
        }

        this.itemtypes = [
            { Text: 'Inventory', Value: '1' },
            { Text: 'Non Inventory', Value: '2' },
            { Text: 'Service', Value: '3' },
            { Text: 'Please Select', Value: 'null', Selected: true }
        ];
    }
    get f() {
        return this.IteamsForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.IteamsForm.valid) {
            if (this.iteamsdetails.ItemID == 0) {
                let salesAccount;
                let obj: any = {};
                let GetclientId = localStorage.getItem('ClientId');
                let UserID = this.claimeHelper.GetUserIdAPIKeyFromClaims();
                this.authenticationservice.GetClientDetailsById(GetclientId).subscribe((response: ClientViewModel) => {
                    this.clientObj = response;
                    var QBExists = this.claimeHelper.QBExists();

                    if (QBExists == 'True') {
                        this.commonservice
                            .GetQBLoginIncomeAcct(UserID, this.clientObj.ClientID)
                            .subscribe(async (response: ClientViewModel) => {
                                this.clientObj = response;
                                var modal: any = {
                                    QBRealmID: localStorage.getItem('realmId'),
                                    QBBearerToken: await this.getAccessToken()
                                };
                                this.itemservice.InventorymenuQuickBooksList(modal).subscribe((response: any) => {
                                    this.quearyModalobj = JSON.parse(response.Result);
                                    if (this.quearyModalobj['fault'] != undefined) {
                                        this.toastr.errorToastr(`${this.quearyModalobj['fault'].error[0].message}`, 'error');
                                    } else {
                                        this.quearyModalobj = this.quearyModalobj['QueryResponse'].Account;
                                        if (this.clientObj.SalesAcctNum != null) {
                                            salesAccount = this.quearyModalobj.filter(
                                                (item) => item.AcctNum == this.clientObj.SalesAcctNum && item.SubAccount == false
                                            );
                                            if (salesAccount.length != 0) {
                                                obj.QBSalesAcct = salesAccount[0].Name;
                                                obj.QBSaleAcctId = salesAccount[0].Id;
                                            }
                                        } else {
                                            salesAccount = this.quearyModalobj.filter(
                                                (item) => item.Name == this.clientObj.QBSalesAcct && item.SubAccount == false
                                            );
                                            if (salesAccount.length != 0) {
                                                obj.QBSaleAcctId = salesAccount[0].Id;
                                            }
                                        }
                                        var IncomeAccountRef = {
                                            value: obj.QBSaleAcctId,
                                            name: obj.QBSalesAcct
                                        };
                                        var objectdata = {
                                            Name: this.iteamsdetails.ItemName,
                                            Type: 'Service',
                                            IncomeAccountRef: IncomeAccountRef,
                                            QBRealmID: localStorage.getItem('realmId'),
                                            QBBearerToken: localStorage.getItem('QBAccessToken')
                                        };
                                        var itemObj;
                                        this.itemservice.InsertQuickBookItems(objectdata).subscribe((response: any) => {
                                            itemObj = JSON.parse(response);
                                            if (response) {
                                                if (this.iteamsdetails.ItemID == 0) {
                                                    this.itemservice.InsertItems(this.iteamsdetails).subscribe((res: any) => {
                                                        if (res) {
                                                            this.toastr.successToastr('Item Details Added Successfully', 'success');
                                                            this.router.navigate(['/Invoice/Inventory']);
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            });
                    } else {
                        this.itemservice.InsertItems(this.iteamsdetails).subscribe((res: any) => {
                            if (res) {
                                this.toastr.successToastr('Item Details Added Successfully', 'success');
                                this.router.navigate(['/Invoice/Inventory']);
                            }
                        });
                    }
                });
            } else {
                if (this.iteamsdetails.ItemID != 0) {
                    this.itemservice.InsertUpdateItems(this.iteamsdetails).subscribe((res: any) => {
                        if (res) {
                            this.toastr.successToastr('Item Details Updated Successfully', 'success');
                            this.router.navigate(['/Invoice/Inventory']);
                        }
                    });
                }
            }
        }
    }

    async getAccessToken(): Promise<string> {
        try {
            let userModel: ClientViewModel = new ClientViewModel();
            let ObjQBClientDetail = new ClientViewModel();
            let deserializeUsersModel = new ClientViewModel();
            var jsonClientModel: any = {};
            var clientId = localStorage.getItem('ClientId');
            let userid: number = this.claimeHelper.GetUserIdAPIKeyFromClaims();

            if (userid == 1) {
                jsonClientModel = await this.commonservice.GetQBLoginIncomeAcct(userid, clientId).toPromise();
            } else {
                jsonClientModel = await this._invoicService.GetQBLoginUserAcct(userid, clientId).toPromise();
            }
            ObjQBClientDetail = jsonClientModel;
            if (jsonClientModel.IsCorporate == true) {
                if (ObjQBClientDetail.QBClientID != null && ObjQBClientDetail.QBSecretID != null) {
                    let formData1 = new FormData();
                    formData1.append('Decrypt', ObjQBClientDetail.QBSecretID);
                    let QBSecretID: any = await this.commonservice.PostDecrypt(formData1).toPromise();
                    ObjQBClientDetail.QBSecretID = QBSecretID;
                    let Refresh_token = this._cookieService.get('Refresh_token') 
                    if (!Refresh_token) {
                        Refresh_token = localStorage.getItem('Refresh_token');
                    }
                    let formData: FormData = new FormData();
                    formData.append('QBClientID', ObjQBClientDetail.QBClientID);
                    formData.append('QBSecretID', ObjQBClientDetail.QBSecretID);
                    formData.append('QBrefToken', Refresh_token);
                    let ResponseData: any = await this.commonservice.RefreshQBToken(formData).toPromise();
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
