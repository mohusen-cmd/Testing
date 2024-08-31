import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Observable, forkJoin } from 'rxjs';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { CompanyDetailsViewModel, CompanyViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { AccountListViewModel, ContactDetailsViewModel } from 'src/app/models/IContactsViewModel';
import {
    EstimateInvoiceDomainModel,
    EstimateInvoiceItemDomainModel,
    InvoiceItemDomainModel,
    ItemsDomainModel
} from 'src/app/models/IEstimateInvoiceDomainModel';
import { InvoiceDomainModel } from 'src/app/models/IInvoiceDomainModel';
import { InvoiceService } from 'src/app/services/Invoice.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { CompanyService } from 'src/app/services/company.service';
import { OnepointMailingtemplateComponent } from '../../onepoint-mailingtemplate/onepoint-mailingtemplate.component';

@Component({
    selector: 'app-add-new-estimate',
    templateUrl: './add-new-estimate.component.html',
    styleUrls: ['./add-new-estimate.component.scss']
})
export class AddNewEstimateComponent implements OnInit {
    @ViewChild(OnepointMailingtemplateComponent) OnepointMailingtemplateComponent: OnepointMailingtemplateComponent;
    estInvoicedetails: EstimateInvoiceDomainModel = new EstimateInvoiceDomainModel();
    contactdetailslist: ContactDetailsViewModel = new ContactDetailsViewModel();
    companydetails: CompanyDetailsViewModel = new CompanyDetailsViewModel();
    InvoceObj: InvoiceDomainModel = new InvoiceDomainModel();
    clientObj: ClientViewModel = new ClientViewModel();
    EstInvoiceId: any;
    Eststatus: any;
    billingadrees: any = '';
    shippingaddress: any = '';
    estlist: any = [];
    form: any = {};
    items = {
        InvoiceItemId: 0,
        Invoiceid: null,
        Invoiceno: null,
        ItemId: null,
        RatePerUnit: null,
        Quantity: null,
        ItemTotal: null,
        ItemCode: null,
        ItemName: null,
        QtyCommitted: null,
        ReqQuantity: null
    };
    EstmateForm: FormGroup;
    submitted: boolean = false;
    @ViewChild('taxparcent') taxparcent: any;
    @ViewChild('discountpercent') discountpercent: any;
    @ViewChild('miscellaneouspercent') miscellaneouspercent: any;
    ShowCompanyModal: boolean = false;
    ShowItemsModal: boolean = false;
    newEstID: any;
    userDetails: any = {};
    model: any = {};
    companylogo: any;
    MailingInfolist: any = {};
    constructor(
        public activatedroute: ActivatedRoute,
        public invoiceservice: AuthenticationService,
        public toastr: ToastrManager,
        public claimsHelper: ClaimsHelper,
        public router: Router,
        public fb: FormBuilder,
        public commonservice: CommonService,
        public EstService: InvoiceService,
        public companyservice: CompanyService,
        private spinner: NgxSpinnerService
    ) {
        this.estInvoicedetails.listItemsModel = new ItemsDomainModel();
        // this.estInvoicedetails.listinvoiceitems = new InvoiceItemDomainModel()
        this.InvoceObj.Listinvoiceitems = [];
        this.companydetails.CompanyObj = new CompanyViewModel();
        this.contactdetailslist.AccountObj = new AccountListViewModel();
    }

    ngOnInit(): void {
        this.EstmateForm = this.fb.group({
            fname: ['', { validators: [Validators.required] }],
            itemName: [''],
            quantity: [''],
            billingadrees: [],
            shippingaddress: [],
            estInvoiceNo: [],
            createdDate: [],
            itemcode: [],
            ratePerUnit: [],
            itemTotal: [],
            total: [],
            discount: [],
            discountpercent: [{ updateOn: 'blur' }],
            taxAmount: [],
            taxparcent: [{ updateOn: 'blur' }],
            materialamount: [],
            miscellaneousamount: [],
            miscellaneouspercent: [{ updateOn: 'blur' }],
            grandTotal: [],
            email: ['']
        });

        this.invoiceservice.GetLastEstimateInvoiceNumber().subscribe((response) => {
            this.EstInvoiceId = response + 1;
            this.estInvoicedetails.EstInvoiceNo = `EST-${String(this.EstInvoiceId).padStart(6, '0')}`;
            this.estInvoicedetails.CreatedDate = new Date();
            this.estInvoicedetails.CreateByUserID = this.claimsHelper.GetUserIdAPIKeyFromClaims();
            this.estInvoicedetails.MiscellaneousPercent = 3.5;
            this.estInvoicedetails.Total = 0;
            this.estInvoicedetails.Discount = 0;
            this.estInvoicedetails.TaxAmount = 0;
            this.estInvoicedetails.MaterialAmount = 0;
            this.estInvoicedetails.GrandTotal = 0;
            this.estInvoicedetails.Posted = 0;
            this.estInvoicedetails.ListEstimateitems = [];
            this.estInvoicedetails.listinvoiceitems = [];
        });
    }

    get f() {
        return this.EstmateForm.controls;
    }

    delete(event, index) {
        this.estInvoicedetails.ListEstimateitems.splice(index, 1);
        this.estInvoicedetails.Total = this.estInvoicedetails.Total - event.ItemTotal;
        this.estInvoicedetails.MaterialAmount = this.estInvoicedetails.MaterialAmount - event.ItemTotal;
        this.onTaxAmount(this.taxparcent.nativeElement.value);
        this.onDiscountAmount(this.discountpercent.nativeElement.value);
        this.MiscellaneousPercent(this.miscellaneouspercent.nativeElement.value);
        this.onGrandTotal();
        if (this.estInvoicedetails.Total == 0) {
            this.estInvoicedetails.MaterialAmount = 0;
            this.estInvoicedetails.Total = 0;
            this.estInvoicedetails.GrandTotal = 0;
            this.estInvoicedetails.TaxPercent = null;
            this.estInvoicedetails.DiscountPercent = null;
        }
    }

    Addform() {
        if (this.form.ItemName && this.form.Quantity) {
            this.estInvoicedetails.Total = 0;
            //  this.estInvoicedetails.ListEstimateitems = (this.form)
            this.estlist.push(this.form);
            this.estInvoicedetails.ListEstimateitems = this.estlist;
            this.estInvoicedetails.listinvoiceitems = [];
            for (let i = 0; i < this.estInvoicedetails.ListEstimateitems.length; i++) {
                this.estInvoicedetails.listinvoiceitems.push({
                    InvoiceItemId: 0,
                    Invoiceid: null,
                    Invoiceno: null,
                    ItemId: this.estInvoicedetails.ListEstimateitems[i].ItemId,
                    RatePerUnit: this.estInvoicedetails.ListEstimateitems[i].RatePerUnit,
                    Quantity: this.estInvoicedetails.ListEstimateitems[i].Quantity,
                    ItemTotal: this.estInvoicedetails.ListEstimateitems[i].ItemTotal,
                    ItemCode: this.estInvoicedetails.ListEstimateitems[i].ItemCode,
                    ItemName: this.estInvoicedetails.ListEstimateitems[i].ItemName,
                    QtyCommitted: this.estInvoicedetails.ListEstimateitems[i].QtyCommitted,
                    ReqQuantity: this.estInvoicedetails.ListEstimateitems[i].ReqQuantity
                });
            }

            for (let i = 0; i < this.estInvoicedetails.ListEstimateitems.length; i++) {
                this.estInvoicedetails.Total = this.estInvoicedetails.Total + this.estInvoicedetails.ListEstimateitems[i].ItemTotal;
                this.estInvoicedetails.MaterialAmount = this.estInvoicedetails.Total;
            }

            this.form = {
                EstInvoiceID: this.EstInvoiceId,
                EstInvoiceNo: this.estInvoicedetails.EstInvoiceNo,
                EstimateInvoiceItemId: 0,
                ItemCode: null,
                ItemId: null,
                ItemName: null,
                ItemTotal: 0,
                QtyCommitted: null,
                Quantity: 0,
                RatePerUnit: null,
                ReqQuantity: null
            };
            this.onDiscountAmount(this.discountpercent.nativeElement.value);
        } else {
            this.toastr.errorToastr('Please Select quantity', 'error');
        }
    }

    onmodallistrecive(event) {
        this.ShowItemsModal = false;
        let data = event;
        this.form = {
            EstInvoiceID: this.EstInvoiceId,
            EstInvoiceNo: this.estInvoicedetails.EstInvoiceNo,
            EstimateInvoiceItemId: 0,
            ItemCode: event.ItemCode,
            ItemId: event.ItemID,
            ItemName: event.ItemName,
            ItemTotal: 0,
            QtyCommitted: null,
            Quantity: 0,
            RatePerUnit: event.Saleprice,
            ReqQuantity: null
        };
        if (this.estInvoicedetails.ListEstimateitems.length != 0) {
            const isExits = this.estInvoicedetails.ListEstimateitems.some((result) => {
                return result.ItemName?.toLocaleLowerCase() == this.form.ItemName?.toLocaleLowerCase();
            });
            if (isExits) {
                this.form = {
                    EstInvoiceID: this.EstInvoiceId,
                    EstInvoiceNo: this.estInvoicedetails.EstInvoiceNo,
                    EstimateInvoiceItemId: 0,
                    ItemCode: null,
                    ItemId: null,
                    ItemName: null,
                    ItemTotal: 0,
                    QtyCommitted: null,
                    Quantity: 0,
                    RatePerUnit: null,
                    ReqQuantity: null
                };
                this.toastr.errorToastr('Items Exists !!! Please Select another Item', 'error');
            } else {
                this.form = {
                    EstInvoiceID: this.EstInvoiceId,
                    EstInvoiceNo: this.estInvoicedetails.EstInvoiceNo,
                    EstimateInvoiceItemId: 0,
                    ItemCode: data.ItemCode,
                    ItemId: data.ItemID,
                    ItemName: data.ItemName,
                    ItemTotal: 0,
                    QtyCommitted: null,
                    Quantity: 0,
                    RatePerUnit: data.Saleprice,
                    ReqQuantity: null
                };
            }
        }
    }

    onTotal() {
        // this.estInvoicedetails.Total = 0
        this.form.ItemTotal = this.form.Quantity * this.form.RatePerUnit;
        // this.estInvoicedetails.Total = this.form.ItemTotal
    }

    onDiscountAmount(event) {
        this.estInvoicedetails.Discount = 0;
        this.estInvoicedetails.DiscountPercent = event;
        this.estInvoicedetails.MaterialAmount = 0;
        for (let i = 0; i < this.estInvoicedetails.ListEstimateitems.length; i++) {
            this.estInvoicedetails.MaterialAmount =
                this.estInvoicedetails.MaterialAmount + this.estInvoicedetails.ListEstimateitems[i].ItemTotal;
        }
        this.estInvoicedetails.Discount = (this.estInvoicedetails.DiscountPercent / 100) * this.estInvoicedetails.Total;
        this.estInvoicedetails.MaterialAmount = this.estInvoicedetails.MaterialAmount - this.estInvoicedetails.Discount;
        this.onTaxAmount(this.taxparcent.nativeElement.value);
        this.MiscellaneousPercent(this.miscellaneouspercent.nativeElement.value);
        this.onGrandTotal();
    }

    onTaxAmount(event) {
        this.MaterialAmount(this.discountpercent.nativeElement.value);
        this.estInvoicedetails.TaxAmount = 0;
        this.estInvoicedetails.TaxPercent = event;
        this.estInvoicedetails.TaxAmount = (this.estInvoicedetails.TaxPercent / 100) * this.estInvoicedetails.MaterialAmount;
        this.estInvoicedetails.MaterialAmount = this.estInvoicedetails.MaterialAmount + this.estInvoicedetails.TaxAmount;
        this.MiscellaneousPercent(this.miscellaneouspercent.nativeElement.value);
        this.onGrandTotal();
    }

    MaterialAmount(event) {
        this.estInvoicedetails.Discount = 0;
        this.estInvoicedetails.DiscountPercent = event;
        this.estInvoicedetails.MaterialAmount = 0;
        for (let i = 0; i < this.estInvoicedetails.ListEstimateitems.length; i++) {
            this.estInvoicedetails.MaterialAmount =
                this.estInvoicedetails.MaterialAmount + this.estInvoicedetails.ListEstimateitems[i].ItemTotal;
        }
        this.estInvoicedetails.Discount = (this.estInvoicedetails.DiscountPercent / 100) * this.estInvoicedetails.Total;
        this.estInvoicedetails.MaterialAmount = this.estInvoicedetails.MaterialAmount - this.estInvoicedetails.Discount;
    }

    MiscellaneousPercent(event) {
        this.estInvoicedetails.MiscellaneousPercent = event;
        this.estInvoicedetails.MiscellaneousAmount =
            (this.estInvoicedetails.MiscellaneousPercent / 100) * this.estInvoicedetails.MaterialAmount;
        this.onGrandTotal();
    }

    onGrandTotal() {
        this.estInvoicedetails.GrandTotal = this.estInvoicedetails.MiscellaneousAmount + this.estInvoicedetails.MaterialAmount;
        this.NumberTOFixed();
    }

    onSave() {
        this.spinner.show();
        //console.log(this.htmlcontent.nativeElement.innerHTML)
        this.submitted = true;
        if (this.companydetails.CompanyObj.Email) {
            this.EstmateOnePointMail();
        } else {
            if (this.EstmateForm.valid && this.estInvoicedetails.ListEstimateitems.length != 0) {
                this.invoiceservice.InsertEstimateInvoiceDetails(this.estInvoicedetails).subscribe(
                    (response) => {
                        for (let i = 0; i < this.estInvoicedetails.ListEstimateitems.length; i++) {
                            this.invoiceservice.insertUpdateEstimateitems(this.estInvoicedetails.ListEstimateitems[i]).subscribe(() => {});
                        }
                        this.toastr.successToastr('Estimate invoice Created Successfully.', 'success');
                        this.router.navigate(['/Invoice/EstimateInvoice']);
                        this.spinner.hide();
                    },
                    (error) => {
                        this.spinner.hide();
                    }
                );
            } else {
                this.toastr.errorToastr('Please Add Item(s) to Cart', 'error');
                this.spinner.hide();
            }
        }
    }

    oncompanylistmodalstatus(event) {
        this.estInvoicedetails.Fname = event.CompanyName;
        this.estInvoicedetails.CustomerID = event.CompanyID;
        this.ShowCompanyModal = false;
        this.companyservice.GetCompanyDetailsById(this.estInvoicedetails.CustomerID).subscribe((result: any) => {
            this.companydetails = result;
            this.companydetails.CompanyObj = result['CompanyObj'];
            this.billingadrees = `${this.estInvoicedetails.Fname} \n ${this.companydetails.CompanyObj.MailingAddress} \n ${this.companydetails.CompanyObj.Shippingstreet} \n ${this.companydetails.CompanyObj.Shippingcity}   ${this.companydetails.CompanyObj.MailingStateText}  ${this.companydetails.CompanyObj.Shippingzip} \n${this.companydetails.CompanyObj.MailingCountryText}`;

            if (this.billingadrees == null) {
                this.billingadrees = this.billingadrees ?? 'no';
            }
            this.EstService.CompaniesContact(this.estInvoicedetails.CustomerID).subscribe({
                next: (resepone: any) => {
                    if (resepone.length != 0) {
                        this.contactdetailslist.AccountObj = resepone;
                    }
                }
            });
            let ClientId = localStorage.getItem('ClientId');
            this.commonservice.GetClientDetailsById(ClientId).subscribe((data: any) => {
                this.model = { ...data };
                if (this.model['CompanyLogo']) {
                    this.companylogo = this.model['CompanyLogo'];
                }
                let userid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
                this.invoiceservice.GetUserDetailsById(userid).subscribe((response: ClientViewModel) => {
                    this.clientObj = response;
                    this.userDetails = response.Users;
                });
            });

            //this.GetClientDetailsByClientId()
        });

        // this.shippingaddress = `${this.estInvoicedetails.Fname}  \n ${this.companydetails.CompanyObj.MailingAddress} \n ${this.companydetails.CompanyObj.Shippingstreet}\n ${this.companydetails.CompanyObj.Shippingcity}  ${this.companydetails.CompanyObj.MailingStateText} , ${this.companydetails.CompanyObj.Shippingzip}   \n ${this.companydetails.CompanyObj.MailingCountryText}`
        //  console.log(this.billingadrees)
        //this.billingadrees = `${this.estInvoicedetails.Fname}  \n ${event.BillingAddress} \n ${event.Billingstreet} \n ${event.Billingcity} , ${event.BillingStateText} ,${event.Billingzip}  \n ${event.BillingCountryText}`
    }

    onBilltoShiping(event) {
        if (event) {
            
            this.companydetails.CompanyObj.BillingAddress=this.companydetails.CompanyObj.MailingAddress
            this.companydetails.CompanyObj.Billingstreet=this.companydetails.CompanyObj.Shippingstreet
            this.companydetails.CompanyObj.Billingcity=this.companydetails.CompanyObj.Shippingcity
            this.companydetails.CompanyObj.BillingStateText=this.companydetails.CompanyObj.MailingStateText
            this.companydetails.CompanyObj.Billingzip=this.companydetails.CompanyObj.Shippingzip
            this.companydetails.CompanyObj.BillingCountryText=this.companydetails.CompanyObj.MailingCountryText
            this.shippingaddress =   this.shippingaddress = `${this.estInvoicedetails.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet}\n ${this.companydetails.CompanyObj.Billingcity}  ${this.companydetails.CompanyObj.BillingStateText} , ${this.companydetails.CompanyObj.Billingzip}   \n ${this.companydetails.CompanyObj.BillingCountryText}`;
        } else {
            this.shippingaddress = '';
            this.companydetails.CompanyObj.BillingAddress=''
            this.companydetails.CompanyObj.Billingstreet=''
            this.companydetails.CompanyObj.Billingcity=''
            this.companydetails.CompanyObj.BillingStateText=''
            this.companydetails.CompanyObj.Billingzip=''
            this.companydetails.CompanyObj.BillingCountryText=''
        }
    }

    NavEstDetails() {
        this.router.navigate(['/Invoice/EstimateInvoice']);
    }

    GetClientDetailsByClientId() {
        let ClientId = localStorage.getItem('ClientId');
        this.commonservice.GetClientDetailsById(ClientId).subscribe((data: any) => {
            this.model = { ...data };
            if (this.model['CompanyLogo']) {
                this.companylogo = this.model['CompanyLogo'];
            }
            this.invoiceservice.getCompanyApiGetCompanyDetailsById(this.estInvoicedetails.CustomerID).subscribe((result: any) => {
                this.companydetails = result;
                this.companydetails.CompanyObj = result['CompanyObj'];
                this.billingadrees = `${this.estInvoicedetails.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet} \n ${this.companydetails.CompanyObj.Billingcity} , ${this.companydetails.CompanyObj.BillingStateText} ,${this.companydetails.CompanyObj.Billingzip}  \n ${this.companydetails.CompanyObj.BillingCountryText}`;
                let userid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
                this.invoiceservice.GetUserDetailsById(userid).subscribe((response: ClientViewModel) => {
                    this.clientObj = response;
                    this.userDetails = response.Users;
                });
            });
        });
    }

    EstmateOnePointMail() {
        this.MailingInfolist.EmailAPIKey = this.claimsHelper.GetEmailAPIKeyFromClaims();
        this.MailingInfolist.EmailAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
        this.MailingInfolist.FromName = 'Digital55';
        this.MailingInfolist.FromAddress = 'noreply@piltd.com';
        this.MailingInfolist.ReplytoAddress = 'noreply@piltd.com';
        this.MailingInfolist.Subject = 'Estimate Invoice Details.';
        this.MailingInfolist.AssignedCampaign = '';
        this.MailingInfolist.Recipients = this.companydetails['CompanyObj'].Email;
        this.MailingInfolist.BccEmails = this.estInvoicedetails.Email == '0' ? '' : this.estInvoicedetails.Email;
        this.MailingInfolist.EnableTracking = '1';
        this.MailingInfolist.VMTAName = '';
        this.MailingInfolist.Tokens = '';
        this.MailingInfolist.ContactXMLData = '';
        this.MailingInfolist.Template = this.OnepointMailingtemplateComponent.childTemplateRef.nativeElement.innerHTML;
        var CompaignObj;
        this.EstService.EstmateInvoiceOnePointMail(this.MailingInfolist).subscribe((CompaignObj: any) => {
            CompaignObj = JSON.parse(CompaignObj);
            this.estInvoicedetails.CompaignID = CompaignObj['Data'].CampaignId;
            this.estInvoicedetails.pointmailStatus = CompaignObj['status'];
            if (this.EstmateForm.valid && this.estInvoicedetails.ListEstimateitems.length != 0) {
                this.invoiceservice.InsertEstimateInvoiceDetails(this.estInvoicedetails).subscribe((response) => {
                    for (let i = 0; i < this.estInvoicedetails.ListEstimateitems.length; i++) {
                        this.invoiceservice.insertUpdateEstimateitems(this.estInvoicedetails.ListEstimateitems[i]).subscribe(() => {});
                    }
                    this.toastr.successToastr('Estimate invoice Created Successfully.', 'success');
                    this.router.navigate(['/Invoice/EstimateInvoice']);
                });
            } else {
                this.toastr.errorToastr('Please Add Item(s) to Cart', 'error');
            }
            // this.EstService.UpdateEstimateInvoicePost(this.estInvoicedetails).subscribe(() => { })
        });
    }

    saveStatus(event: any) {
        this.ShowItemsModal = false;
        this.ShowCompanyModal = false;
    }

    NumberTOFixed() {
        (this.estInvoicedetails.Total = Math.trunc(this.estInvoicedetails.Total * 100) / 100),
            (this.estInvoicedetails.Discount = Math.trunc(this.estInvoicedetails.Discount * 100) / 100);
        this.estInvoicedetails.TaxAmount = Math.trunc(this.estInvoicedetails.TaxAmount * 100) / 100;
        this.estInvoicedetails.MaterialAmount = Math.trunc(this.estInvoicedetails.MaterialAmount * 100) / 100;
        this.estInvoicedetails.MiscellaneousAmount = Math.trunc(this.estInvoicedetails.MiscellaneousAmount * 100) / 100;
        this.estInvoicedetails.MiscellaneousPercent = Math.trunc(this.estInvoicedetails.MiscellaneousPercent * 100) / 100;
        this.estInvoicedetails.GrandTotal = Math.trunc(this.estInvoicedetails.GrandTotal * 100) / 100;
        this.estInvoicedetails.DiscountPercent = Math.trunc(this.estInvoicedetails.DiscountPercent * 100) / 100;
        this.estInvoicedetails.TaxPercent = Math.trunc(this.estInvoicedetails.TaxPercent * 100) / 100;
    }
}
