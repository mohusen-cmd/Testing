import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
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
import { OnepointMailingtemplateComponent } from '../../onepoint-mailingtemplate/onepoint-mailingtemplate.component';
import { CompanyService } from 'src/app/services/company.service';

@Component({
    selector: 'app-edit-estimate',
    templateUrl: './edit-estimate.component.html',
    styleUrls: ['./edit-estimate.component.scss']
})
export class EditEstimateComponent implements OnInit {
    @ViewChild(OnepointMailingtemplateComponent) OnepointMailingtemplateComponent: OnepointMailingtemplateComponent;
    estInvoicedetails: EstimateInvoiceDomainModel = new EstimateInvoiceDomainModel();
    contactdetailslist: ContactDetailsViewModel = new ContactDetailsViewModel();
    companydetails: CompanyDetailsViewModel = new CompanyDetailsViewModel();
    InvoceObj: InvoiceDomainModel = new InvoiceDomainModel();
    clientObj: ClientViewModel = new ClientViewModel();
    @ViewChild('taxparcent') taxparcent: any;
    @ViewChild('discountpercent') discountpercent: any;
    @ViewChild('miscellaneouspercent') miscellaneouspercent: any;
    EstInvoiceId: any;
    Eststatus: any;
    billingadrees: any;
    shippingaddress: any;
    form: any = {};
    companylogo: any;
    model: any = {};
    userDetails: any = {};
    ShowItemsModal: boolean = false;
    constructor(
        public activatedroute: ActivatedRoute,
        public invoiceservice: AuthenticationService,
        public toastr: ToastrManager,
        public router: Router,
        public helper: ClaimsHelper,
        public _service: InvoiceService,
        public _companyService: CompanyService
    ) {
        this.estInvoicedetails.listItemsModel = new ItemsDomainModel();
        //  this.estInvoicedetails.listinvoiceitems = new InvoiceItemDomainModel()
        this.companydetails.CompanyObj = new CompanyViewModel();
        //this.InvoceObj.Listinvoiceitems=new InvoiceItemDomainModel()
        this.contactdetailslist.AccountObj = new AccountListViewModel();
    }
    ngOnInit(): void {
        this.activatedroute.queryParamMap.subscribe((queryParams) => {
            this.EstInvoiceId = queryParams.get('EstInvoiceId');
            this.Eststatus = queryParams.get('type');
        });
        this.GetEstimateInvoicebyinvoiceId();
        this.invoiceservice.getLastInvoicenumber().subscribe((res) => {
            this.InvoceObj.InvoiceNo = 'INV-' + String(res + 1).padStart(6, '0');
        });
        // this.PrintPDFile()
    }
    GetEstimateInvoicebyinvoiceId() {
        this.invoiceservice.getestimateinvoiceDetailsbyId(this.EstInvoiceId).subscribe((response: EstimateInvoiceDomainModel) => {
            this.estInvoicedetails = response;
            this.estInvoicedetails.ListEstimateitems = response['ListEstimateitems'];
            for (let i = 0; i < this.estInvoicedetails.ListEstimateitems?.length; i++) {
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
            this._companyService.GetCompanyDetailsById(response.CustomerID).subscribe((result: any) => {
                this.companydetails = result;
                this.companydetails.CompanyObj = result['CompanyObj'];
                this.billingadrees = `${this.estInvoicedetails.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet} \n ${this.companydetails.CompanyObj.Billingcity} , ${this.companydetails.CompanyObj.BillingStateText} ,${this.companydetails.CompanyObj.Billingzip}  \n ${this.companydetails.CompanyObj.BillingCountryText}`;
                this.shippingaddress = `${this.estInvoicedetails.Fname}  \n ${this.companydetails.CompanyObj.MailingAddress} \n ${this.companydetails.CompanyObj.Shippingstreet}\n ${this.companydetails.CompanyObj.Shippingcity}  ${this.companydetails.CompanyObj.MailingStateText} , ${this.companydetails.CompanyObj.Shippingzip}   \n ${this.companydetails.CompanyObj.MailingCountryText}`;
                this.billingadrees = (this.billingadrees == '' && undefined) || this.shippingaddress;
            });
            this._service.CompaniesContact(this.estInvoicedetails.CustomerID).subscribe({
                next: (resepone: any) => {
                    if (resepone.length != 0) {
                        this.contactdetailslist.AccountObj = resepone;
                    }
                }
            });
            let userid = this.helper.GetUserIdAPIKeyFromClaims();
            this.invoiceservice.GetUserDetailsById(userid).subscribe((response: ClientViewModel) => {
                this.clientObj = response;
                this.userDetails = response.Users;
            });
        });
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
            this.estInvoicedetails.DiscountPercent = null;
            this.estInvoicedetails.TaxPercent = null;
        }
    }

    Addform() {
        if (this.form.ItemName) {
            this.estInvoicedetails.Total = 0;
            this.estInvoicedetails.ListEstimateitems.push(this.form);
            this.estInvoicedetails.listinvoiceitems = [];

            for (let i = 0; i < this.estInvoicedetails.ListEstimateitems?.length; i++) {
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
            console.log(this.estInvoicedetails.listinvoiceitems);

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
            // this.onTaxAmount(this.taxparcent.nativeElement.value)
            // this.MiscellaneousPercent(this.miscellaneouspercent.nativeElement.value)
            // this.onGrandTotal()
        } else {
            this.toastr.errorToastr('Please Select Item', 'error');
        }
    }

    onmodallistrecive(event) {
        this.ShowItemsModal = false;
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
    onTotal() {
        // this.estInvoicedetails.Total = 0
        this.form.ItemTotal = this.form.Quantity * this.form.RatePerUnit;
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

    onsave() {
        this.invoiceservice.UpdateEstimateInvoicePost(this.estInvoicedetails).subscribe((response) => {
            for (let i = 0; i < this.estInvoicedetails.ListEstimateitems.length; i++) {
                this.invoiceservice.insertUpdateEstimateitems(this.estInvoicedetails.ListEstimateitems[i]).subscribe(() => {});
            }
            this.NavEstDetails()
            this.toastr.successToastr('Estimate invoice Updated Successfully.', 'success');
        });
    }

    NavEstDetails() {
        this.router.navigate(['/Invoice/EstimateInvoice']);
    }
    ConverttoInvoice() {
        this.estInvoicedetails.Posted = 1;
        if (this.estInvoicedetails.Posted == 1) {
            this.onsave();
        }

        (this.InvoceObj.Active = this.estInvoicedetails.Active),
            (this.InvoceObj.CompanyId = this.estInvoicedetails.CompanyId),
            (this.InvoceObj.Companyname = this.estInvoicedetails.Companyname),
            (this.InvoceObj.CreateByUserID = this.estInvoicedetails.CreateByUserID),
            (this.InvoceObj.CreatedBy = this.estInvoicedetails.CreatedBy),
            (this.InvoceObj.CreatedDate = this.estInvoicedetails.CreatedDate),
            (this.InvoceObj.CustomerID = this.estInvoicedetails.CustomerID),
            (this.InvoceObj.Description = this.estInvoicedetails.Description),
            (this.InvoceObj.Discount = this.estInvoicedetails.Discount),
            (this.InvoceObj.DiscountPercent = this.estInvoicedetails.DiscountPercent),
            (this.InvoceObj.EquipmentAmount = this.estInvoicedetails.EquipmentAmount),
            (this.InvoceObj.EstInvoiceID = this.estInvoicedetails.EstInvoiceID),
            (this.InvoceObj.EstInvoiceNo = this.estInvoicedetails.EstInvoiceNo),
            (this.InvoceObj.Fname = this.estInvoicedetails.Fname),
            (this.InvoceObj.GrandTotal = this.estInvoicedetails.GrandTotal),
            (this.InvoceObj.InvCretaedDate = this.estInvoicedetails.InvCretaedDate),
            (this.InvoceObj.IsCreditMemo = this.estInvoicedetails.IsCreditMemo),
            (this.InvoceObj.IsDrafted = this.estInvoicedetails.IsDrafted),
            (this.InvoceObj.IsPaid = this.estInvoicedetails.isPaid),
            (this.InvoceObj.JobLocation = this.estInvoicedetails.JobLocation),
            (this.InvoceObj.JobPhone = this.estInvoicedetails.JobPhone),
            (this.InvoceObj.LaborAmount = this.estInvoicedetails.LaborAmount),
            (this.InvoceObj.LateFee = this.estInvoicedetails.LateFee),
            (this.InvoceObj.MaterialAmount = this.estInvoicedetails.MaterialAmount),
            (this.InvoceObj.Memo = this.estInvoicedetails.Memo),
            (this.InvoceObj.MiscellaneousAmount = this.estInvoicedetails.MiscellaneousAmount),
            (this.InvoceObj.MiscellaneousPercent = this.estInvoicedetails.MiscellaneousPercent),
            (this.InvoceObj.ModifiedBy = this.estInvoicedetails.ModifiedBy),
            (this.InvoceObj.ModifiedDate = this.estInvoicedetails.ModifiedDate),
            (this.InvoceObj.OrderNo = this.estInvoicedetails.OrderNo),
            (this.InvoceObj.Posted = 0);
        (this.InvoceObj.SoldTo = this.estInvoicedetails.SoldTo),
            (this.InvoceObj.TaxAmount = this.estInvoicedetails.TaxAmount),
            (this.InvoceObj.TaxPercent = this.estInvoicedetails.TaxPercent),
            (this.InvoceObj.Total = this.estInvoicedetails.Total),
            (this.InvoceObj.InvoiceAmount = this.estInvoicedetails.Total),
            (this.InvoceObj.Email = this.estInvoicedetails.Email);
        this.InvoceObj.BalanceAmount = this.estInvoicedetails.Total;
        this.InvoceObj.InvoiceID = 0;
        this.InvoceObj.InvoiceType = 'Estimate';
        this.InvoceObj.DueDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
        this.InvoceObj.BalanceAmount = this.estInvoicedetails.MaterialAmount;
        this.InvoceObj.LaborAmount = this.estInvoicedetails.MaterialAmount;
        this.InvoceObj.Listinvoiceitems = this.estInvoicedetails.listinvoiceitems;
        this.invoiceservice.InsertInvoiceDetails(this.InvoceObj).subscribe((resepone) => {
            if (resepone) {
                this.router.navigate(['/Invoice/InvoiceList']);
            }
        });
    }

    // PrintPDFile() {
    //   let ClientId = localStorage.getItem("ClientId")
    //   this.invoiceservice.GetClientDetailsById(ClientId).subscribe((data) => {
    //     this.model = { ...data }
    //     if (this.model["CompanyLogo"]) {
    //       this.companylogo = this.model["CompanyLogo"]
    //     }
    //     this._companyService.GetCompanyDetailsById(this.estInvoicedetails.CustomerID).subscribe(
    //       (result: any) => {
    //         this.companydetails = result
    //         this.companydetails.CompanyObj = result["CompanyObj"]
    //         this.billingadrees = `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet} \n ${this.companydetails.CompanyObj.Billingcity} , ${this.companydetails.CompanyObj.BillingStateText} ,${this.companydetails.CompanyObj.Billingzip}  \n ${this.companydetails.CompanyObj.BillingCountryText}`
    //         let userid = this.helper.GetUserIdAPIKeyFromClaims()
    //         this.invoiceservice.GetUserDetailsById(userid).subscribe((response: ClientViewModel) => {
    //           this.clientObj = response
    //           this.userDetails = response.Users
    //         })
    //       })
    //   })

    // }

    generatePDF() {
        let printContents, popupWin;
        printContents = this.OnepointMailingtemplateComponent.childTemplateRef.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
    <html>
      <head>
        <title>Print tab</title>
        <style>
        //........Customized style.......
        </style>
      </head>
       <body onload="window.print();window.close()">${printContents}</body>
    </html>`);
        popupWin.document.close();
    }
    saveStatus(event: any) {
        this.ShowItemsModal = false;
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

    onBilltoShiping(event) {
        if (event) {
            this.companydetails.CompanyObj.BillingAddress = this.companydetails.CompanyObj.MailingAddress;
            this.companydetails.CompanyObj.Billingstreet = this.companydetails.CompanyObj.Shippingstreet;
            this.companydetails.CompanyObj.Billingcity = this.companydetails.CompanyObj.Shippingcity;
            this.companydetails.CompanyObj.BillingStateText = this.companydetails.CompanyObj.MailingStateText;
            this.companydetails.CompanyObj.Billingzip = this.companydetails.CompanyObj.Shippingzip;
            this.companydetails.CompanyObj.BillingCountryText = this.companydetails.CompanyObj.MailingCountryText;
            this.shippingaddress = `${this.estInvoicedetails.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet}\n ${this.companydetails.CompanyObj.Billingcity}  ${this.companydetails.CompanyObj.BillingStateText} , ${this.companydetails.CompanyObj.Billingzip}   \n ${this.companydetails.CompanyObj.BillingCountryText}`;
        } else {
            this.shippingaddress = '';
            this.companydetails.CompanyObj.BillingAddress = '';
            this.companydetails.CompanyObj.Billingstreet = '';
            this.companydetails.CompanyObj.Billingcity = '';
            this.companydetails.CompanyObj.BillingStateText = '';
            this.companydetails.CompanyObj.Billingzip = '';
            this.companydetails.CompanyObj.BillingCountryText = '';
        }
    }
}
