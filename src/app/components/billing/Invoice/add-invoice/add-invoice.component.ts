import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { CompanyDetailsViewModel, CompanyViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { ContactDetailsViewModel, AccountListViewModel } from 'src/app/models/IContactsViewModel';
import { InvoiceDomainModel } from 'src/app/models/IInvoiceDomainModel';
import { PaymentsDomainModel } from 'src/app/models/IPaymentsDomainModel';
import {
    IncomeAccountsRefViewModel,
    QBJournalEntryEntity,
    QBJournalEntryLineDetailViewModel,
    QBJournalEntryViewModel,
    QuickbookJournalLineItemViewModel
} from 'src/app/models/QuickbookJournalLineItemViewModel';
import { InvoiceService } from 'src/app/services/Invoice.service';
import { OAuthQuickBookService } from 'src/app/services/OAuthquickbook.Service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { CompanyService } from 'src/app/services/company.service';
import { QBApis } from 'src/app/services/qb_apis.service';
import { UserService } from 'src/app/services/user.service';
import { InvoicemailingTemplateComponent } from '../../invoicemailing-template/invoicemailing-template.component';

@Component({
    selector: 'app-add-invoice',
    templateUrl: './add-invoice.component.html',
    styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {
    @ViewChild(InvoicemailingTemplateComponent) InvoicemailingTemplateComponent: InvoicemailingTemplateComponent;
    companydetails: CompanyDetailsViewModel = new CompanyDetailsViewModel();
    InvoceObj: InvoiceDomainModel = new InvoiceDomainModel();
    contactdetailslist: ContactDetailsViewModel = new ContactDetailsViewModel();
    clientObj: ClientViewModel = new ClientViewModel();
    JournalList: QuickbookJournalLineItemViewModel[] = [];
    submitted: boolean = false;
    IsExists: boolean = false;
    addinvoiceForm: FormGroup;
    @ViewChild('companylist') companylist;
    @ViewChild('miscellaneouspercent') miscellaneouspercent;
    @ViewChild('meterialpercent') meterialpercent;
    @ViewChild('discountpercent') discountpercent;
    @ViewChild('taxPercent') taxPercent;
    teams: any = {};
    billingaddress: any = '';
    shippingaddress: any = '';
    invoiceno: any;
    iteams = [];
    taxx: string;
    conveniences: string;
    Granddtotalamt: string;
    selectedItem: any;
    ShowCompanyModal: boolean = false;
    ShowItemsModal: boolean = false;
    MailingInfolist: any = {};
    model: any = {};
    companylogo: any;
    userDetails: any = {};
    clientDetails: any={};
    constructor(
        public fb: FormBuilder,
        public authentication: AuthenticationService,
        public qbauthservice: OAuthQuickBookService,
        public _cookieService: CookieService,
        public companyservice: CompanyService,
        public invoiceService: InvoiceService,
        public commonService: CommonService,
        public claimesHelper: ClaimsHelper,
        public userservice: UserService,
        public toastr: ToastrManager,
        public qbapisservice: QBApis,
        private cdr: ChangeDetectorRef,
        public router: Router
    ) {
        this.InvoceObj.Listinvoiceitems = [];
        this.InvoceObj.PaymentObj = new PaymentsDomainModel();
        this.contactdetailslist.AccountObj = new AccountListViewModel();
        this.companydetails.CompanyObj = new CompanyViewModel();
        this.InvoceObj.TermsID = '3'; // "Net 30"
    }
    forms = {
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
    recurringInvoice = [
        { Value: '0', Text: 'Select', Selected: true },
        { Value: '1', Text: 'Daily' },
        { Value: '2', Text: 'Weekly' },
        { Value: '3', Text: 'Monthly' },
        { Value: '4', Text: 'Quarterly' },
        { Value: '5', Text: 'Semi-Annually' },
        { Value: '6', Text: 'Annually' }
    ];

    ngOnInit(): void {
        this.addinvoiceForm = this.fb.group({
            companyname: ['', { validators: [Validators.required] }],
            billingaddress: [],
            shippingaddress: [],
            invoiceAmount: [],
            invoiceno: [],
            invoicedate: [],
            terms: [],
            duedate: [],
            recurinvoice: [],
            itemname: [],
            itemcode: [],
            quantity: [],
            rateperunir: [],
            itemtotal: [],
            itemlist: [],
            total: [],
            taxamount: [],
            taxPercent: [{ updateOn: 'blur' }],
            discount: [],
            discountPercent: [{ updateOn: 'blur' }],
            miscellaneousAmount: [],
            meterialpercent: [],
            miscellaneouspercent: [{ updateOn: 'blur' }],
            grandTotal: [],
            createdDate: ['', { validators: [Validators.required] }],
            purchaseOrder: [],
            recursTerm: [],
            firstname: [],
            termsId: [''],
            email: ['']
        });

        this.invoiceService.GetLastInvoicenumber().subscribe((res: any) => {
            this.invoiceno = res;
            this.InvoceObj.InvoiceNo = `INV-${String(this.invoiceno).padStart(6, '0')}`;
            this.InvoceObj.MiscellaneousPercent = 3.5;
            this.InvoceObj.RecursTerm = 0;
            this.InvoceObj.TermsID = 2;
        });

        this.InvoceObj.CreatedDate = new Date();
        var myDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
        this.InvoceObj.DueDate = myDate;
        this.teams = [
            { Id: '1', Text: 'Due Now' },
            { Id: '2', Text: 'Net 15' },
            { Id: '3', Text: 'Net 30' },
            { Id: '4', Text: 'Net 45' },
            { Id: '5', Text: 'Net 60' },
            { Id: '6', Text: 'Net 90' }
        ];
    }
    get f() {
        return this.addinvoiceForm.controls;
    }

    onitemmodelstatus(event) {
        this.ShowItemsModal = false;
        this.forms = {
            InvoiceItemId: 0,
            Invoiceid: this.invoiceno,
            Invoiceno: this.InvoceObj.InvoiceNo,
            ItemId: event.ItemID,
            RatePerUnit: event.Saleprice,
            Quantity: 0,
            ItemTotal: 0,
            ItemCode: event.ItemCode,
            ItemName: event.ItemName,
            QtyCommitted: null,
            ReqQuantity: null
        };

        const isExits = this.InvoceObj.Listinvoiceitems.some((result) => {
            return result.ItemName?.toLocaleLowerCase() == this.forms.ItemName?.toLocaleLowerCase();
        });
        if (isExits) {
            this.forms = {
                InvoiceItemId: 0,
                Invoiceid: null,
                Invoiceno: null,
                ItemCode: null,
                ItemId: null,
                ItemName: null,
                ItemTotal: 0,
                QtyCommitted: null,
                Quantity: 0,
                RatePerUnit: null,
                ReqQuantity: null
            };
            this.toastr.errorToastr('Item extsis!,please select another item', 'error');
        } else {
            this.forms = {
                InvoiceItemId: 0,
                Invoiceid: null,
                Invoiceno: this.InvoceObj.InvoiceNo,
                ItemCode: event.ItemCode,
                ItemId: event.ItemID,
                ItemName: event.ItemName,
                ItemTotal: 0,
                QtyCommitted: null,
                Quantity: 0,
                RatePerUnit: event.Saleprice,
                ReqQuantity: null
            };
        }
    }
    addForm() {
        if (this.forms.ItemName && this.forms.Quantity) {
            this.InvoceObj.InvoiceAmount = 0;
            this.InvoceObj.Listinvoiceitems.push(this.forms);
            for (let i = 0; i < this.InvoceObj.Listinvoiceitems.length; i++) {
                this.InvoceObj.InvoiceAmount = this.InvoceObj.InvoiceAmount + this.InvoceObj.Listinvoiceitems[i].ItemTotal;
            }
            this.forms = {
                InvoiceItemId: 0,
                Invoiceid: null,
                Invoiceno: this.InvoceObj.InvoiceNo,
                ItemCode: null,
                ItemId: null,
                ItemName: null,
                ItemTotal: 0,
                QtyCommitted: null,
                Quantity: 0,
                RatePerUnit: null,
                ReqQuantity: null
            };
            this.onDiscountamt(this.discountpercent.nativeElement.value);
        } else {
            this.toastr.errorToastr('please select quantity');
        }
    }

    async oncompanylistmodalstatus(event) {debugger
        try {
            this.ShowCompanyModal = false;
            this.InvoceObj.Fname = event.CompanyName;
            this.InvoceObj.CustomerID = event.CompanyID;
    
            const res = await this.companyservice.GetCompanyDetailsById(this.InvoceObj.CustomerID).toPromise();
    
            this.companydetails = res as CompanyDetailsViewModel ;
            this.InvoceObj.QBCustID = res['CompanyObj'].QBCustID;
            this.companydetails.CompanyObj = res['CompanyObj'];
    
            if (this.companydetails.CompanyObj.MailingAddress != null)
                this.companydetails.CompanyObj.MailingAddress = this.companydetails.CompanyObj.MailingAddress;
            else
                this.companydetails.CompanyObj.MailingAddress = ' ';
    
            if (this.companydetails.CompanyObj.Shippingstreet != null)
                this.companydetails.CompanyObj.Shippingstreet = this.companydetails.CompanyObj.Shippingstreet;
            else
                this.companydetails.CompanyObj.Shippingstreet = ' ';
    
            if (this.companydetails.CompanyObj.Shippingcity != null)
                this.companydetails.CompanyObj.Shippingcity = this.companydetails.CompanyObj.Shippingcity;
            else
                this.companydetails.CompanyObj.Shippingcity = ' ';
    
            if (this.companydetails.CompanyObj.MailingStateText != null)
                this.companydetails.CompanyObj.MailingStateText = this.companydetails.CompanyObj.MailingStateText;
            else
                this.companydetails.CompanyObj.MailingStateText = ' ';
    
            if (this.companydetails.CompanyObj.MailingCountryText != null)
                this.companydetails.CompanyObj.MailingCountryText = this.companydetails.CompanyObj.MailingCountryText;
            else
                this.companydetails.CompanyObj.MailingCountryText = ' ';
    
            if (res['CompanyObj'].Shippingzip != null)
                res['CompanyObj'].Shippingzip = res['CompanyObj'].Shippingzip;
            else
                res['CompanyObj'].Shippingzip = ' ';
    
            if (res['CompanyObj'].BillingAddress != null)
                res['CompanyObj'].BillingAddress = res['CompanyObj'].BillingAddress;
            else
                res['CompanyObj'].BillingAddress = ' ';
    
            if (res['CompanyObj'].Billingstreet != null)
                res['CompanyObj'].Billingstreet = res['CompanyObj'].Billingstreet;
            else
                res['CompanyObj'].Billingstreet = ' ';
    
            if (res['CompanyObj'].Billingcity != null)
                res['CompanyObj'].Billingcity = res['CompanyObj'].Billingcity;
            else
                res['CompanyObj'].Billingcity = ' ';
    
            if (res['CompanyObj'].BillingStateText != null)
                res['CompanyObj'].BillingStateText = res['CompanyObj'].BillingStateText;
            else
                res['CompanyObj'].BillingStateText = ' ';
    
            if (res['CompanyObj'].BillingCountryText != null)
                res['CompanyObj'].BillingCountryText = res['CompanyObj'].BillingCountryText;
            else
                res['CompanyObj'].BillingCountryText = ' ';
    
            if (res['CompanyObj'].Billingzip != null)
                res['CompanyObj'].Billingzip = res['CompanyObj'].Billingzip;
            else
                res['CompanyObj'].Billingzip = ' ';
    
            this.billingaddress = `${this.InvoceObj.Fname} \n ${this.companydetails.CompanyObj.MailingAddress} \n ${this.companydetails.CompanyObj.Shippingstreet} \n ${this.companydetails.CompanyObj.Shippingcity}   ${this.companydetails.CompanyObj.MailingStateText}  ${this.companydetails.CompanyObj.Shippingzip} \n${this.companydetails.CompanyObj.MailingCountryText}`;
            
    
            const resepone: any = await this.invoiceService.CompaniesContact(this.InvoceObj.CustomerID).toPromise();
            
            if (resepone.length != 0) {
                this.contactdetailslist.AccountObj = resepone;
            }
            let ClientId = localStorage.getItem('ClientId');
        this.clientDetails = await this.commonService.GetClientDetailsById(ClientId).toPromise();
        this.model = { ...this.clientDetails };
        
        if (this.model['CompanyLogo']) {
            this.companylogo = this.model['CompanyLogo'];
        }

        const result = await this.companyservice.GetCompanyDetailsById(this.InvoceObj.CustomerID).toPromise();
        this.companydetails = result as CompanyDetailsViewModel;
        this.companydetails.CompanyObj = result['CompanyObj'];
        
        //this.billingaddress = `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet} \n ${this.companydetails.CompanyObj.Billingcity} , ${this.companydetails.CompanyObj.BillingStateText} ,${this.companydetails.CompanyObj.Billingzip}  \n ${this.companydetails.CompanyObj.BillingCountryText}`;
        this.billingaddress = `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.MailingAddress} \n ${this.companydetails.CompanyObj.Shippingstreet} \n ${this.companydetails.CompanyObj.Shippingcity} , ${this.companydetails.CompanyObj.MailingStateText} ,${this.companydetails.CompanyObj.Shippingzip}  \n ${this.companydetails.CompanyObj.MailingCountryText}`;
        let userid = this.claimesHelper.GetUserIdAPIKeyFromClaims();
        const response:any= await this.userservice.GetUserDetailsById(userid).toPromise();
        this.userDetails = response.Users ;
        this.cdr.detectChanges();
        } catch (error) {
            // Handle error as needed
            console.error('Error in oncompanylistmodalstatus:', error);
        }
    }
    

    BilltoShiping(event) {
        if (event) {
            
            this.companydetails.CompanyObj.BillingAddress=this.companydetails.CompanyObj.MailingAddress
            this.companydetails.CompanyObj.Billingstreet=this.companydetails.CompanyObj.Shippingstreet
            this.companydetails.CompanyObj.Billingcity=this.companydetails.CompanyObj.Shippingcity
            this.companydetails.CompanyObj.BillingStateText=this.companydetails.CompanyObj.MailingStateText
            this.companydetails.CompanyObj.Billingzip=this.companydetails.CompanyObj.Shippingzip
            this.companydetails.CompanyObj.BillingCountryText=this.companydetails.CompanyObj.MailingCountryText
            this.shippingaddress =  `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet}\n ${this.companydetails.CompanyObj.Billingcity}  ${this.companydetails.CompanyObj.BillingStateText} , ${this.companydetails.CompanyObj.Billingzip}   \n ${this.companydetails.CompanyObj.BillingCountryText}`;
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

    delete(event: any, i: any) {
        this.InvoceObj.Listinvoiceitems.splice(i, 1);
        this.InvoceObj.InvoiceAmount = this.InvoceObj.InvoiceAmount - event.ItemTotal;

        this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount - event.ItemTotal;

        this.onTaxAmount(this.taxPercent.nativeElement.value);
        this.onDiscountamt(this.discountpercent.nativeElement.value);
        this.onMisellenousamt(this.miscellaneouspercent.nativeElement.value);
        this.onGrandTotal();
        if (this.InvoceObj.InvoiceAmount == 0) {
            this.InvoceObj.MaterialAmount = 0;
            this.InvoceObj.Total = 0;
            this.InvoceObj.GrandTotal = 0;
            this.InvoceObj.DiscountPercent = null;
            this.InvoceObj.TaxPercent = null;
        }
    }

    onDiscountamt(event) {
        this.InvoceObj.Discount = 0;
        this.InvoceObj.DiscountPercent = event;
        this.InvoceObj.MaterialAmount = 0;
        for (let i = 0; i < this.InvoceObj.Listinvoiceitems.length; i++) {
            this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount + this.InvoceObj.Listinvoiceitems[i].ItemTotal;
        }
        this.InvoceObj.Discount = (this.InvoceObj.DiscountPercent / 100) * this.InvoceObj.InvoiceAmount;
        this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount - this.InvoceObj.Discount;
        this.onTaxAmount(this.taxPercent.nativeElement.value);
        this.onMisellenousamt(this.miscellaneouspercent.nativeElement.value);
        this.onGrandTotal();
    }
    onitemtotal() {
        this.forms.ItemTotal = 0;
        this.forms.ItemTotal = this.forms.Quantity * this.forms.RatePerUnit;
    }
    onTaxAmount(event) {
        this.InvoceObj.TaxPercent = event;
        this.onMaterialAmount(this.discountpercent.nativeElement.value);
        this.InvoceObj.TaxAmount = (this.InvoceObj.TaxPercent / 100) * this.InvoceObj.MaterialAmount;
        this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount + this.InvoceObj.TaxAmount;
        this.onMisellenousamt(this.miscellaneouspercent.nativeElement.value);
        this.onGrandTotal();
        this.taxx = (Math.round(this.InvoceObj.TaxAmount * 100) / 100).toFixed(2);
    }
    onMisellenousamt(event) {
        this.InvoceObj.MiscellaneousPercent = event;
        this.InvoceObj.MiscellaneousAmount = (this.InvoceObj.MiscellaneousPercent / 100) * this.InvoceObj.MaterialAmount;
        this.onGrandTotal();
        this.InvoceObj.MiscellaneousAmount;
        this.conveniences = (Math.round(this.InvoceObj.MiscellaneousAmount * 100) / 100).toFixed(2);
    }
    onGrandTotal() {
        this.InvoceObj.GrandTotal = this.InvoceObj.MiscellaneousAmount + this.InvoceObj.MaterialAmount;
        this.Granddtotalamt = (Math.round(this.InvoceObj.GrandTotal * 100) / 100).toFixed(2);
        this.NumberToFixed();
    }
    onMaterialAmount(event) {
        this.InvoceObj.Discount = 0;
        this.InvoceObj.DiscountPercent = event;
        this.InvoceObj.MaterialAmount = 0;
        for (let i = 0; i < this.InvoceObj.Listinvoiceitems.length; i++) {
            this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount + this.InvoceObj.Listinvoiceitems[i].ItemTotal;
        }
        this.InvoceObj.Discount = (this.InvoceObj.DiscountPercent / 100) * this.InvoceObj.InvoiceAmount;
        this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount - this.InvoceObj.Discount;
    }
    async save() {
        this.submitted = true;
        if (this.addinvoiceForm.valid) {debugger
            this.InvoceObj.CreateByUserID = this.claimesHelper.GetUserIdAPIKeyFromClaims();
            this.InvoceObj.InvoiceID = 0;
            this.InvoceObj.Posted = 0;
            this.InvoceObj.InvoiceType = 'Invoice';
            this.InvoceObj.BalanceAmount = this.InvoceObj.MaterialAmount;
            this.InvoceObj.LaborAmount = this.InvoceObj.MaterialAmount;
            this.InvoceObj.Email=this.companydetails.CompanyObj.Email
            const formData = {
                grant_type: "password",
                username: "crm-qa",
                password: "testing"
            }
            
            // Get the service token
            const tokenResponse = await this.invoiceService.ServiceToken(formData).toPromise();
            localStorage.setItem('ServiceToken', tokenResponse['body'].access_token);

            const Invoiceres = await this.invoiceService.ServiceInvoiceEmail(this.InvoceObj).toPromise();
          //  this.OnePointMail();
          this.toastr.successToastr('Invoice created successfully', 'success');
          this.cdr.detectChanges()
            if(Invoiceres){
                this.OnNav()
            }
            
            //this.InvoceObj.InvoiceID = +Invoiceres ;
            // const Invoiceres = await this.invoiceService.InsertInvoice(this.InvoceObj).toPromise();
            // this.InvoceObj.InvoiceID = +Invoiceres ;
            
           // this.router.navigate(['/Invoice/InvoiceList'])
            
            // this.invoiceService.InsertInvoice(this.InvoceObj).subscribe((res: any) => {debugger
            //     this.InvoceObj.InvoiceID = res;
            //     this.cdr.detectChanges(); // Trigger change detection manually
            //     if (res) {
            //         this.OnePointMail();
            //         // this.authentication.onupadteinvoicedetailsvalue(this.InvoceObj).subscribe(()=>{})
            //         // this.router.navigate(['/Invoice/InvoiceList'])
            //         this.toastr.successToastr('Invoice created successfully', 'success');
            //         //this.router.navigate(['Invoice', 'InvoiceList'])
            //     }
            // });
        } else {
            this.toastr.errorToastr('plese select Customer Name ', 'error');
        }
    }
    // save() {
    //     this.submitted = true;
    //     if (this.addinvoiceForm.valid) {
    //         this.InvoceObj.CreateByUserID = this.claimesHelper.GetUserIdAPIKeyFromClaims();
    //         this.InvoceObj.RecursTerm;
    //         this.InvoceObj.InvoiceID = 0;
    //         this.InvoceObj.Posted = 0;
    //         this.InvoceObj.InvoiceType = 'Invoice';
    //         this.InvoceObj.BalanceAmount = this.InvoceObj.MaterialAmount;
    //         this.InvoceObj.LaborAmount = this.InvoceObj.MaterialAmount;
    //         this.invoiceService.InsertInvoice(this.InvoceObj).subscribe((res: any) => {
    //             this.InvoceObj.InvoiceID = res;
    //             if (res) {
    //                 this.OnePointMail();
    //                 // this.authentication.onupadteinvoicedetailsvalue(this.InvoceObj).subscribe(()=>{})
    //                 // this.router.navigate(['/Invoice/InvoiceList'])

    //                 this.toastr.successToastr('Invoice created successfully', 'success');

    //                 //this.router.navigate(['Invoice', 'InvoiceList'])
    //             }
    //         });
    //     } else {
    //         this.toastr.errorToastr('plese select Customer Name ', 'error');
    //     }
    // }
    
    OnNav() {
        this.router.navigate(['/Invoice/InvoiceList']);
    }
    OnNavPayment() {
        this.router.navigate(['/Invoice/PaymentsIndex']);
    }

    onSaveandPost() {
        this.submitted = true;
        let CompanyID, lastInvoiceid, QBCustID;
        let QbmodalObj: any = {};
        if (this.addinvoiceForm.valid) {
            if (this.InvoceObj.Listinvoiceitems.length != 0) {
                lastInvoiceid = 0;
                this.InvoceObj.Posted = 0;
                this.InvoceObj.BalanceAmount = this.InvoceObj.MaterialAmount;
                this.InvoceObj.LaborAmount = this.InvoceObj.MaterialAmount;
                this.InvoceObj.InvoiceType = 'Invoice';
                const dtSpecifiedDate: Date = new Date();
                dtSpecifiedDate.setHours(0, 0, 0, 0); // Set the time portion to 00:00:00
                this.InvoceObj.TermsID = Number(this.InvoceObj.TermsID);
                this.InvoceObj.RecursTerm = Number(this.InvoceObj.RecursTerm);
                if (this.InvoceObj.TermsID === 1) {
                    this.InvoceObj.DueDate = new Date(dtSpecifiedDate);
                } else if (this.InvoceObj.TermsID === 2) {
                    this.InvoceObj.DueDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 15));
                } else if (this.InvoceObj.TermsID === 3) {
                    this.InvoceObj.DueDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 30));
                } else if (this.InvoceObj.TermsID === 4) {
                    this.InvoceObj.DueDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 45));
                } else if (this.InvoceObj.TermsID === 5) {
                    this.InvoceObj.DueDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 60));
                } else if (this.InvoceObj.TermsID === 6) {
                    this.InvoceObj.DueDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 90));
                } else {
                    this.InvoceObj.DueDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 30));
                }

                if (this.InvoceObj.RecursTerm === 1) {
                    this.InvoceObj.RecursDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 1));
                } else if (this.InvoceObj.RecursTerm === 2) {
                    this.InvoceObj.RecursDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 7));
                } else if (this.InvoceObj.RecursTerm === 3) {
                    this.InvoceObj.RecursDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 30));
                } else if (this.InvoceObj.RecursTerm === 4) {
                    this.InvoceObj.RecursDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 90));
                } else if (this.InvoceObj.RecursTerm === 5) {
                    this.InvoceObj.RecursDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 180));
                } else if (this.InvoceObj.RecursTerm === 6) {
                    this.InvoceObj.RecursDate = new Date(dtSpecifiedDate.setDate(dtSpecifiedDate.getDate() + 360));
                }
            }

            CompanyID = this.InvoceObj.CustomerID;
            this.companyservice.GetCompanyDetailsById(CompanyID).subscribe((response: any) => {
                this.companydetails = response;
                QBCustID = this.companydetails.CompanyObj.QBCustID;
                if (this.companydetails.CompanyObj.ShippingstateID && this.companydetails.CompanyObj.ShippingcountryID) {
                    for (let i = 0; i <= this.companydetails.StateList.length; i++) {
                        if (this.companydetails.CompanyObj.ShippingstateID == this.companydetails.StateList[i]?.ID) {
                            this.InvoceObj.StateName = this.companydetails.StateList[i].StateName;
                        }
                    }
                    for (let i = 0; i <= this.companydetails.CountryList.length; i++) {
                        if (this.companydetails.CompanyObj.ShippingcountryID == this.companydetails.CountryList[i]?.CountryId) {
                            this.InvoceObj.CountryName = this.companydetails.CountryList[i].CountryName;
                        }
                    }
                }

                let ClientID = localStorage.getItem('ClientId');
                this.commonService.GetClientDetailsById(ClientID).subscribe((response: ClientViewModel) => {
                    this.clientObj = response;
                    this.InvoceObj.CreateByUserID = this.claimesHelper.GetUserIdAPIKeyFromClaims();
                    this.authentication.GetUserDetailsById(this.InvoceObj.CreateByUserID).subscribe((response: ClientViewModel) => {
                        this.clientObj = response;
                        if (this.clientObj.Users.ApiUsername != null && this.clientObj.Users.ApiPassword != null) {
                            this.clientObj.ApiUsername = this.clientObj.Users.ApiUsername;
                            this.clientObj.ApiPassword = this.clientObj.Users.ApiPassword;
                            this.clientObj.ApiMerchantkey = this.clientObj.Users.ApiMerchantkey;
                        }
                        this.InvoceObj.CreateByUserID = this.claimesHelper.GetUserIdAPIKeyFromClaims();
                        this.InvoceObj.Paystatus = 'Unpaid';
                        this.InvoceObj.Posted = 0;
                        this.InvoceObj.InvoiceID = 0;
                        this.InvoceObj.InvoiceType = 'Invoice';
                        this.InvoceObj.BalanceAmount = this.InvoceObj.MaterialAmount;
                        this.InvoceObj.LaborAmount = this.InvoceObj.MaterialAmount;
                        let InvoiceID;
                        this.invoiceService.InsertInvoice(this.InvoceObj).subscribe(async (response) => {
                            InvoiceID = response;
                            var QBExists = this.claimesHelper.QBExists();
                            if (QBExists == 'True') {
                                this.InvoceObj.InvoiceID = InvoiceID;
                                if (InvoiceID != 0 && this.companydetails.CompanyObj.QBCustID > 0) {
                                    let Userid = this.claimesHelper.GetUserIdAPIKeyFromClaims();
                                    if (Userid == 1) {
                                        let ClientName = localStorage.getItem('ClientId');
                                        this.commonService
                                            .GetQBLoginIncomeAcct(Userid, ClientName)
                                            .subscribe((response: ClientViewModel) => {
                                                this.clientObj = response;
                                            });
                                    } else {
                                        let ClientName = localStorage.getItem('ClientId');
                                        this.invoiceService
                                            .GetQBLoginUserAcct(Userid, ClientName)
                                            .subscribe((resepone: ClientViewModel) => {
                                                this.clientObj = resepone;
                                            });
                                    }
                                    var modal: any = {
                                        QBRealmID: localStorage.getItem('realmId'),
                                        QBBearerToken: await this.getAccessToken() //localStorage.getItem('QBAccessToken')
                                    };

                                    this.invoiceService.InvoiceQuickBooksList(modal).subscribe((response: any) => {
                                        let quearyModalobj = JSON.parse(response.Result);
                                        if (quearyModalobj['fault'] != undefined) {
                                            this.toastr.errorToastr(`${quearyModalobj['fault'].error[0].message}`, 'error');
                                            this.OnNav();
                                        } else {
                                            if (quearyModalobj['QueryResponse'].Account) {
                                                quearyModalobj = quearyModalobj['QueryResponse'].Account;
                                                if (this.clientObj.ReceivableAcctNum != null) {
                                                    var receivableAccount = quearyModalobj.filter(
                                                        (x) => x.AcctNum == this.clientObj.ReceivableAcctNum && x.SubAccount == false
                                                    );
                                                    if (receivableAccount.length != 0) {
                                                        this.clientObj.QBAcctReceivable = receivableAccount[0].Name;
                                                        QbmodalObj.QBAcctRcvID = receivableAccount[0].Id;
                                                    }
                                                } else {
                                                    var receivableAccount = quearyModalobj.filter(
                                                        (x) => x.Name == this.clientObj.QBAcctReceivable && x.SubAccount == false
                                                    );
                                                    if (receivableAccount.length != 0) {
                                                        QbmodalObj.QBAcctRcvID = receivableAccount[0].Id;
                                                    }
                                                }
                                                if (this.clientObj.SalesAcctNum != null) {
                                                    var salesAccount = quearyModalobj.filter(
                                                        (x) => x.AcctNum == this.clientObj.SalesAcctNum && x.SubAccount == false
                                                    );
                                                    if (salesAccount.length != 0) {
                                                        this.clientObj.QBSalesAcct = salesAccount[0].Name;
                                                        QbmodalObj.QBSaleAcctId = salesAccount[0].Id;
                                                    }
                                                } else {
                                                    var salesAccount = quearyModalobj.filter(
                                                        (x) => x.Name == this.clientObj.QBSalesAcct && x.SubAccount == false
                                                    );
                                                    if (salesAccount.length != 0) {
                                                        QbmodalObj.QBSaleAcctId = salesAccount[0].Id;
                                                    }
                                                }
                                                if (this.clientObj.SalesTaxAcctNum != null) {
                                                    var salesTaxAccount = quearyModalobj.filter(
                                                        (x) => x.AcctNum == this.clientObj.SalesTaxAcctNum && x.SubAccount == false
                                                    );
                                                    if (salesTaxAccount.length != 0) {
                                                        this.clientObj.QBSaleTaxAcct = salesTaxAccount[0].Name;
                                                        QbmodalObj.QBSaleTaxID = salesTaxAccount[0].Id;
                                                    }
                                                } else {
                                                    var salesTaxAccount = quearyModalobj.filter(
                                                        (x) => x.Name == this.clientObj.QBSaleTaxAcct && x.SubAccount == false
                                                    );
                                                    if (salesTaxAccount.length != 0) {
                                                        QbmodalObj.QBSaleTaxID = salesTaxAccount[0].Id;
                                                    }
                                                }

                                                if (this.InvoceObj.TaxAmount > 0) {
                                                    var AccountDebitRefObj: IncomeAccountsRefViewModel = {
                                                        value: QbmodalObj.QBAcctRcvID,
                                                        name: this.clientObj.QBAcctReceivable
                                                    };
                                                    var AcctCreditTaxRefObj: IncomeAccountsRefViewModel = {
                                                        value: QbmodalObj.QBSaleTaxID,
                                                        name: this.clientObj.QBSaleTaxAcct
                                                    };
                                                    var AcctCreditRefObj: IncomeAccountsRefViewModel = {
                                                        value: QbmodalObj.QBSaleAcctId,
                                                        name: this.clientObj.QBSalesAcct
                                                    };
                                                    var EntityRef: IncomeAccountsRefViewModel = {
                                                        name: this.companydetails.CompanyObj.Name,
                                                        value: this.companydetails.CompanyObj.QBCustID
                                                    };
                                                    var Entityobj: QBJournalEntryEntity = {
                                                        Type: 'Customer',
                                                        EntityRef: EntityRef
                                                    };
                                                    var LineItemDebit: QuickbookJournalLineItemViewModel = {
                                                        Description: 'new invoice created ' + this.InvoceObj.InvoiceNo,
                                                        Amount: this.InvoceObj.MaterialAmount,
                                                        DetailType: 'JournalEntryLineDetail',
                                                        JournalEntryLineDetail: {
                                                            PostingType: 'Debit',
                                                            AccountRef: AccountDebitRefObj,
                                                            Entity: Entityobj
                                                        }
                                                    };
                                                    var LineItemCreditTax: QuickbookJournalLineItemViewModel = {
                                                        Description: 'new invoice created ' + this.InvoceObj.InvoiceNo,
                                                        Amount: this.InvoceObj.TaxAmount,
                                                        DetailType: 'JournalEntryLineDetail',
                                                        JournalEntryLineDetail: {
                                                            PostingType: 'Credit',
                                                            AccountRef: AcctCreditTaxRefObj
                                                        }
                                                    };
                                                    var LineItemCredit: QuickbookJournalLineItemViewModel = {
                                                        Description: 'new invoice created ' + this.InvoceObj.InvoiceNo,
                                                        Amount: +this.InvoceObj.MaterialAmount - +this.InvoceObj.TaxAmount,
                                                        DetailType: 'JournalEntryLineDetail',
                                                        JournalEntryLineDetail: {
                                                            PostingType: 'Credit',
                                                            AccountRef: AcctCreditRefObj
                                                        }
                                                    };
                                                    this.JournalList.push(LineItemDebit);
                                                    this.JournalList.push(LineItemCreditTax);
                                                    this.JournalList.push(LineItemCredit);
                                                } else {
                                                    var AccountDebitRefObj: IncomeAccountsRefViewModel = {
                                                        value: QbmodalObj.QBAcctRcvID,
                                                        name: this.clientObj.QBAcctReceivable
                                                    };
                                                    var AcctCreditRefObj: IncomeAccountsRefViewModel = {
                                                        value: QbmodalObj.QBSaleAcctId,
                                                        name: this.clientObj.QBSalesAcct
                                                    };
                                                    var EntityRef: IncomeAccountsRefViewModel = {
                                                        name: this.companydetails.CompanyObj.Name,
                                                        value: this.companydetails.CompanyObj.QBCustID
                                                    };
                                                    var Entityobj: QBJournalEntryEntity = {
                                                        Type: 'Customer',
                                                        EntityRef: EntityRef
                                                    };
                                                    var LineItemDebit: QuickbookJournalLineItemViewModel = {
                                                        Description: 'new invoice created ' + this.InvoceObj.InvoiceNo,
                                                        Amount: this.InvoceObj.MaterialAmount,
                                                        DetailType: 'JournalEntryLineDetail',
                                                        JournalEntryLineDetail: {
                                                            PostingType: 'Debit',
                                                            AccountRef: AccountDebitRefObj,
                                                            Entity: Entityobj
                                                        }
                                                    };
                                                    var LineItemCredit: QuickbookJournalLineItemViewModel = {
                                                        Description: 'new invoice created ' + this.InvoceObj.InvoiceNo,
                                                        Amount: this.InvoceObj.MaterialAmount,
                                                        DetailType: 'JournalEntryLineDetail',
                                                        JournalEntryLineDetail: {
                                                            PostingType: 'Credit',
                                                            AccountRef: AcctCreditRefObj
                                                        }
                                                    };
                                                    this.JournalList.push(LineItemDebit);
                                                    this.JournalList.push(LineItemCredit);
                                                }
                                                var NewJEData: QBJournalEntryViewModel = {
                                                    DocNumber: this.InvoceObj.InvoiceNo,
                                                    Line: this.JournalList,
                                                    QBRealmID: localStorage.getItem('realmId'),
                                                    QBBearerToken: localStorage.getItem('QBAccessToken')
                                                };
                                                this.invoiceService.InsertQuickBooksInvoice(NewJEData).subscribe((ResponseData: any) => {
                                                    var ResponseData = JSON.parse(ResponseData);
                                                    this.InvoceObj.QBInvID = ResponseData.JournalEntry.Id;
                                                    this.InvoceObj.InvoiceID = InvoiceID;
                                                    this.InvoceObj.QBCustID = QBCustID;
                                                    this.InvoceObj.QBRefreshToken = localStorage.getItem('QBAccessToken');
                                                    if (this.companydetails.CompanyObj.Email != null) {
                                                       // this.GetClientDetailsByClientId();
                                                        this.InvoceObj.Posted = 1;
                                                        this.OnePointMail();
                                                        this.toastr.successToastr('Invoice created successfully', 'success');
                                                    }
                                                });
                                            } else {
                                                this.toastr.errorToastr(`${quearyModalobj.fault['error'][0].message}`, 'error');
                                            }
                                        }
                                    });
                                } else {
                                    this.OnNav();
                                }
                            } else {
                                this.InvoceObj.Posted = 1;
                                this.OnePointMail();
                            }
                        });
                    });
                });
            });
        } else {
            this.toastr.errorToastr('plese select Terms ', 'error');
        }
    }

    async GetClientDetailsByClientId() {debugger
        try {
            let ClientId = localStorage.getItem('ClientId');
            const clientDetails = await this.commonService.GetClientDetailsById(ClientId).toPromise();
            this.model = { ...clientDetails };
            
            if (this.model['CompanyLogo']) {
                this.companylogo = this.model['CompanyLogo'];
            }
    
            const result = await this.companyservice.GetCompanyDetailsById(this.InvoceObj.CustomerID).toPromise();
            this.companydetails = result as CompanyDetailsViewModel;
            this.companydetails.CompanyObj = result['CompanyObj'];
            
            this.billingaddress = `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet} \n ${this.companydetails.CompanyObj.Billingcity} , ${this.companydetails.CompanyObj.BillingStateText} ,${this.companydetails.CompanyObj.Billingzip}  \n ${this.companydetails.CompanyObj.BillingCountryText}`;
    
            let userid = this.claimesHelper.GetUserIdAPIKeyFromClaims();
            const response = await this.userservice.GetUserDetailsById(userid).toPromise();
            this.clientObj = response as ClientViewModel;
            this.userDetails = response['Users'];
        } catch (error) {
            // Handle error as needed
            console.error('Error in loadInvoiceDetails:', error);
        }
    }

    OnePointMail() {
        this.MailingInfolist.EmailAPIKey = this.claimesHelper.GetEmailAPIKeyFromClaims();
        this.MailingInfolist.EmailAPILink = this.claimesHelper.GetEmailapilinkFromClaims();
        this.MailingInfolist.FromName = 'Digital55';
        this.MailingInfolist.FromAddress = 'noreply@piltd.com';
        this.MailingInfolist.ReplytoAddress = 'noreply@piltd.com';
        this.MailingInfolist.Subject = 'Invoice Details.';
        this.MailingInfolist.AssignedCampaign = '';
        this.MailingInfolist.Recipients = this.companydetails['CompanyObj'].Email;
        this.MailingInfolist.BccEmails = this.InvoceObj.Email == '0' ? '' : this.InvoceObj.Email;
        this.MailingInfolist.EnableTracking = '1';
        this.MailingInfolist.VMTAName = '';
        this.MailingInfolist.Tokens = '';
        this.MailingInfolist.ContactXMLData = '';
        this.MailingInfolist.Template = this.InvoicemailingTemplateComponent.InvoiceMailTemplateRef.nativeElement.innerHTML;
        var CompaignObj;
        this.invoiceService.EstmateInvoiceOnePointMail(this.MailingInfolist).subscribe((CompaignObj: any) => {
            CompaignObj = JSON.parse(CompaignObj);
            this.InvoceObj.CompaignID = CompaignObj['Data'].CampaignId;
            this.InvoceObj.pointmailStatus = CompaignObj['status'];
            if (this.InvoceObj.Posted == 0) {
                this.invoiceService.UpdateSingleInvoiceBalanceAmount(this.InvoceObj).subscribe(() => {
                    this.router.navigate(['Invoice', 'InvoiceList']);
                });
            } else {
                this.invoiceService.UpdateInvoiceDetailsValue(this.InvoceObj).subscribe((resepone) => {
                    this.invoiceService.UpdateSingleInvoiceBalanceAmount(this.InvoceObj).subscribe(() => {
                        this.router.navigate(['Invoice', 'InvoiceList']);
                    });
                });
            }
        });
    }
    NumberToFixed() {
        this.InvoceObj.Discount = +this.InvoceObj.Discount.toFixed(2);
        this.InvoceObj.GrandTotal = +this.InvoceObj.GrandTotal.toFixed(2);
        this.InvoceObj.InvoiceAmount = +this.InvoceObj.InvoiceAmount.toFixed(2);
        this.InvoceObj.MaterialAmount = +this.InvoceObj.MaterialAmount.toFixed(2);
        this.InvoceObj.MiscellaneousAmount = +this.InvoceObj.MiscellaneousAmount.toFixed(2);
        this.InvoceObj.TaxAmount = +this.InvoceObj.TaxAmount.toFixed(2);
    }

    saveStatus(event: any) {
        this.ShowItemsModal = false;
        this.ShowCompanyModal = false;
    }
    async getAccessToken(): Promise<string> {
        try {
            let userModel: ClientViewModel = new ClientViewModel();
            let ObjQBClientDetail = new ClientViewModel();
            let deserializeUsersModel = new ClientViewModel();
            var jsonClientModel: any = {};
            var clientId = localStorage.getItem('ClientId');
            let userid: number = this.claimesHelper.GetUserIdAPIKeyFromClaims();

            if (userid == 1) {
                jsonClientModel = await this.commonService.GetQBLoginIncomeAcct(userid, clientId).toPromise();
            } else {
                jsonClientModel = await this.invoiceService.GetQBLoginUserAcct(userid, clientId).toPromise();
            }
            ObjQBClientDetail = jsonClientModel;
            if (jsonClientModel.IsCorporate == true) {
                if (ObjQBClientDetail.QBClientID != null && ObjQBClientDetail.QBSecretID != null) {
                    let formData1 = new FormData();
                    formData1.append('Decrypt', ObjQBClientDetail.QBSecretID);
                    let QBSecretID: any = await this.commonService.PostDecrypt(formData1).toPromise();
                    ObjQBClientDetail.QBSecretID = QBSecretID;
                    let Refresh_token = this._cookieService.get('Refresh_token') 
                    if (!Refresh_token) {
                        Refresh_token = localStorage.getItem('Refresh_token');
                    }
                    let formData: FormData = new FormData();
                    formData.append('QBClientID', ObjQBClientDetail.QBClientID);
                    formData.append('QBSecretID', ObjQBClientDetail.QBSecretID);
                    formData.append('QBrefToken', Refresh_token);
                    let ResponseData: any = await this.commonService.RefreshQBToken(formData).toPromise();
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
