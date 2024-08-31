import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { ClaimsHelper } from 'src/app/login/claimshelper';

import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { CompanyDetailsViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { AccountListViewModel, ContactDetailsViewModel } from 'src/app/models/IContactsViewModel';
import { InvoiceDomainModel } from 'src/app/models/IInvoiceDomainModel';
import { PaymentsDomainModel } from 'src/app/models/IPaymentsDomainModel';
import { LoginDomainModel } from 'src/app/models/LoginDomainModel';
import { InvoiceService } from 'src/app/services/Invoice.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { InvoicemailingTemplateComponent } from '../../invoicemailing-template/invoicemailing-template.component';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {
  @ViewChild(InvoicemailingTemplateComponent) InvoicemailingTemplateComponent: InvoicemailingTemplateComponent;
  companydetails: CompanyDetailsViewModel = new CompanyDetailsViewModel()
  contactdetailslist: ContactDetailsViewModel = new ContactDetailsViewModel()
  InvoceObj: InvoiceDomainModel = new InvoiceDomainModel()
  form1: LoginDomainModel = new LoginDomainModel();
  paymentDomain = new ClientViewModel()
  InvoiceId: any;
  billingaddrees: string;
  shippingaddress: string;
  teams: any;
  recurringInvoice: any;
  ShowItemsModal: boolean = false
  @ViewChild('taxparcent') taxparcent: any
  @ViewChild('itemslistview') itemslistview: any
  @ViewChild('discountpercent') discountpercent: any
  @ViewChild('miscellaneouspercent') miscellaneouspercent: any
  InvoiceForm: FormGroup
  submitted: boolean = false
  form: any = {
    InvoiceItemId: 0,
    Invoiceid: null,
    Invoiceno: null,
    ItemId: '',
    RatePerUnit: '',
    Quantity: '',
    ItemTotal: '',
    ItemCode: '',
    ItemName: '',
    QtyCommitted: '',
    ReqQuantity: '',
  }
  iteams = []
  printContents: any;
  Terms: string;
  companylogo: any;
  userid: number;
  msgparent: any;
  clientId: string;
  clientdatamodel: any;
  userDetails: any={};
  model: any;
  constructor(public invoiceservice: AuthenticationService,
    public route: ActivatedRoute,
    public toastr: ToastrManager,
    public fb: FormBuilder,
    public claimesHelper: ClaimsHelper,
    public router: Router,
    public _service:InvoiceService,
    public userservice: UserService,
    public commonservice: CommonService,) {
    this.contactdetailslist.AccountObj = new AccountListViewModel()
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe((queryParam) => {
      this.InvoiceId = queryParam.get('InvoiceId')
    })


    this.userid = this.claimesHelper.GetUserIdAPIKeyFromClaims()
    const clientId = localStorage.getItem("ClientId");
    const clientDetails = await this.commonservice.GetClientDetailsById(clientId).toPromise();
    this.model = { ...clientDetails };
    this.companylogo = this.model['CompanyLogo'];
    const userDetails = await this.userservice.GetUserDetailsById(this.userid).toPromise();
    this.userDetails = userDetails["Users"];
   
    this.InvoiceForm = this.fb.group({
      fname: ['', { validators: [Validators.required] },],
      itemName: [''],
      quantity: [''],
      billingadrees: [],
      shippingaddress: [],
      estInvoiceNo: [],
      createdDate: ['', { validators: [Validators.required] }],
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
      invoiceno: [],
      purchaseOrder: [],
      termsId: ['', { validators: [Validators.required] }],
      duedate: [],
      recursTerm: [],
      invoiceAmount: [],
      email: ['',]
    })
    this.GetInvoiceDetails()

    this.teams = [
      { Value: "null", Text: "Select", Selected: true },
      { Value: "1", Text: "Due Now" },
      { Value: "2", Text: "Net 15" },
      { Value: "3", Text: "Net 30" },
      { Value: "4", Text: "Net 45" },
      { Value: "5", Text: "Net 60" },
      { Value: "6", Text: "Net 90" },
    ]
    this.recurringInvoice = [
      { Value: "0", Text: "Select", Selected: true },
      { Value: "1", Text: "Daily" },
      { Value: "2", Text: "Weekly" },
      { Value: "3", Text: "Monthly" },
      { Value: "4", Text: "Quarterly" },
      { Value: "5", Text: "Semi-Annually" },
      { Value: "6", Text: "Annually" },
    ]
  }


  get f() {
    return this.InvoiceForm.controls
  }
  downloadpdf() {

    let printContents, popupWin;

    printContents =this.InvoicemailingTemplateComponent.InvoiceMailTemplateRef.nativeElement.innerHTML;
    this.msgparent = printContents
    //localStorage.setItem('htmlcontent',printContents)
    this.printContents = this.InvoceObj
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
</html>`
    );
    popupWin.document.close();
  }

  GetInvoiceDetails() {
    this.invoiceservice.GetInvoiceDetailsByInvoiceId(this.InvoiceId).subscribe((response: InvoiceDomainModel) => {
      this.InvoceObj = response
      this.InvoceObj.Listinvoiceitems = response["listinvoiceitems"]
      this.invoiceservice.getCompanyApiGetCompanyDetailsById(this.InvoceObj.CustomerID).subscribe(
        (result: any) => {
          this.companydetails = result
          this.companydetails.CompanyObj = result["CompanyObj"]
          this.companydetails.CompanyObj.BillingAddress=this.companydetails.CompanyObj.MailingAddress
          this.companydetails.CompanyObj.Billingstreet=this.companydetails.CompanyObj.Shippingstreet
          this.companydetails.CompanyObj.Billingcity=this.companydetails.CompanyObj.Shippingcity
          this.companydetails.CompanyObj.BillingStateText=this.companydetails.CompanyObj.MailingStateText
          this.companydetails.CompanyObj.Billingzip=this.companydetails.CompanyObj.Shippingzip
          this.companydetails.CompanyObj.BillingCountryText=this.companydetails.CompanyObj.MailingCountryText
          this.billingaddrees = `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet} \n ${this.companydetails.CompanyObj.Billingcity} , ${this.companydetails.CompanyObj.BillingStateText} ,${this.companydetails.CompanyObj.Billingzip}  \n ${this.companydetails.CompanyObj.BillingCountryText}`
          this.shippingaddress = `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.MailingAddress} \n ${this.companydetails.CompanyObj.Shippingstreet}\n ${this.companydetails.CompanyObj.Shippingcity}  ${this.companydetails.CompanyObj.MailingStateText} , ${this.companydetails.CompanyObj.Shippingzip}   \n ${this.companydetails.CompanyObj.MailingCountryText}`
          this._service.CompaniesContact(this.InvoceObj.CustomerID).subscribe({
            next: (resepone: any) => {
              if (resepone.length != 0) {
                this.contactdetailslist.AccountObj = resepone
              }
            }
          })
        })
      

    })
  }


  onitemmodelstatus(event) {
    this.ShowItemsModal = false
    this.form = {
      InvoiceItemId: 0,
      Invoiceid: this.InvoiceId,
      Invoiceno: this.InvoceObj.InvoiceNo,
      ItemCode: event.ItemCode,
      ItemId: event.ItemID,
      ItemName: event.ItemName,
      ItemTotal: 0,
      QtyCommitted: null,
      Quantity: 0,
      RatePerUnit: event.Saleprice,
      ReqQuantity: null,
    }

    const isExits = this.InvoceObj.Listinvoiceitems.some((result) => { return result.ItemName?.toLocaleLowerCase() == this.form.ItemName?.toLocaleLowerCase() })
    if (isExits) {

      this.form = {
        InvoiceItemId: 0,
        Invoiceid: this.InvoiceId,
        Invoiceno: this.InvoceObj.InvoiceNo,
        ItemCode: null,
        ItemId: null,
        ItemName: null,
        ItemTotal: 0,
        QtyCommitted: null,
        Quantity: 0,
        RatePerUnit: null,
        ReqQuantity: null,
      }
      this.toastr.errorToastr('Items Exists !!! Please Select another Item', 'error')
    }
    else {

      this.form = {
        InvoiceItemId: 0,
        Invoiceid: this.InvoiceId,
        Invoiceno: this.InvoceObj.InvoiceNo,
        ItemCode: event.ItemCode,
        ItemId: event.ItemID,
        ItemName: event.ItemName,
        ItemTotal: 0,
        QtyCommitted: null,
        Quantity: 0,
        RatePerUnit: event.Saleprice,
        ReqQuantity: null,
      }
    }

  }

  onTotalamount() {
    this.form.ItemTotal = 0
    this.form.ItemTotal = this.form.Quantity * this.form.RatePerUnit
  }

  Addform() {

    if (this.form.ItemName && this.form.Quantity) {
      this.InvoceObj.InvoiceAmount = 0
      this.InvoceObj.Listinvoiceitems.push(this.form)

      for (let i = 0; i < this.InvoceObj.Listinvoiceitems.length; i++) {
        this.InvoceObj.InvoiceAmount = this.InvoceObj.InvoiceAmount + +this.InvoceObj.Listinvoiceitems[i].ItemTotal
        this.InvoceObj.MaterialAmount = this.InvoceObj.InvoiceAmount
      }

      this.form = {
        InvoiceItemId: 0,
        Invoiceid: this.InvoiceId,
        Invoiceno: this.InvoceObj.InvoiceNo,
        ItemCode: null,
        ItemId: null,
        ItemName: null,
        ItemTotal: 0,
        QtyCommitted: null,
        Quantity: 0,
        RatePerUnit: null,
        ReqQuantity: null,
      }
      this.onDiscountAmount(this.discountpercent.nativeElement.value)


    } else {
      this.toastr.errorToastr('Please Select Item', 'error')
    }

  }

  onDiscountAmount(event) {
    this.InvoceObj.Discount = 0
    this.InvoceObj.DiscountPercent = event
    this.InvoceObj.MaterialAmount = 0
    for (let i = 0; i < this.InvoceObj.Listinvoiceitems.length; i++) {
      this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount + this.InvoceObj.Listinvoiceitems[i].ItemTotal
    }
    this.InvoceObj.Discount = (this.InvoceObj.DiscountPercent / 100) * this.InvoceObj.InvoiceAmount
    this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount - this.InvoceObj.Discount
    this.onTaxAmount(this.taxparcent.nativeElement.value)
    this.MiscellaneousPercent(this.miscellaneouspercent.nativeElement.value)
    this.onGrandTotal()
  }

  onTaxAmount(event) {
    this.MaterialAmount(this.discountpercent.nativeElement.value)
    this.InvoceObj.TaxAmount = 0
    this.InvoceObj.TaxPercent = event
    this.InvoceObj.TaxAmount = (this.InvoceObj.TaxPercent / 100) * this.InvoceObj.MaterialAmount
    this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount + this.InvoceObj.TaxAmount
    this.MiscellaneousPercent(this.miscellaneouspercent.nativeElement.value)
    this.onGrandTotal()
  }

  MaterialAmount(event) {
    this.InvoceObj.Discount = 0
    this.InvoceObj.DiscountPercent = event
    this.InvoceObj.MaterialAmount = 0
    for (let i = 0; i < this.InvoceObj.Listinvoiceitems.length; i++) {
      this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount + this.InvoceObj.Listinvoiceitems[i].ItemTotal
    }
    this.InvoceObj.Discount = (this.InvoceObj.DiscountPercent / 100) * this.InvoceObj.InvoiceAmount
    this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount - this.InvoceObj.Discount
  }

  MiscellaneousPercent(event) {
    this.InvoceObj.MiscellaneousPercent = event
    this.InvoceObj.MiscellaneousAmount = (this.InvoceObj.MiscellaneousPercent / 100) * this.InvoceObj.MaterialAmount
    this.onGrandTotal()
  }


  onGrandTotal() {
    this.InvoceObj.GrandTotal = this.InvoceObj.MiscellaneousAmount + this.InvoceObj.MaterialAmount
    this.NumberToFixed()
  }


  onSave() {

    this.submitted = true;
    if (this.InvoiceForm.valid) {
      this.InvoceObj.CreateByUserID = this.claimesHelper.GetUserIdAPIKeyFromClaims()
      this.invoiceservice.UpdateInvoiceDetailsValue(this.InvoceObj).subscribe((resepone) => {
        if (resepone) {
          for (let i = 0; i < this.InvoceObj.Listinvoiceitems.length; i++) {
            this.invoiceservice.insertUpdateInvoiceitems(this.InvoceObj.Listinvoiceitems[i]).subscribe(() => { })
          }
          this.toastr.successToastr('invoice Updated Successfully.', 'success')
          if (this.InvoceObj.Posted == 0) {
            this.OnNav()
          } else if (this.InvoceObj.Posted == 1) {
            this.OnNavPayment()
          }
        }
      })
    } else {
      this.toastr.errorToastr('Please Select Item', 'error')
    }
    //Posted = 1
  }

  post() {
    this.InvoceObj.Posted = 1
    this.InvoceObj.InvoiceType = "Invoice"
    this.InvoceObj.Memo = "True"
    this.onSave()
  }

  delete(event, index) {
    this.InvoceObj.Listinvoiceitems.splice(index, 1);
    this.InvoceObj.InvoiceAmount = this.InvoceObj.InvoiceAmount - event.ItemTotal
    this.InvoceObj.MaterialAmount = this.InvoceObj.MaterialAmount - event.ItemTotal
    this.onTaxAmount(this.taxparcent.nativeElement.value)
    this.onDiscountAmount(this.discountpercent.nativeElement.value)
    this.MiscellaneousPercent(this.miscellaneouspercent.nativeElement.value)
    this.onGrandTotal()
    if (this.InvoceObj.InvoiceAmount == 0) {
      this.InvoceObj.MaterialAmount = 0
      this.InvoceObj.Total = 0
      this.InvoceObj.GrandTotal = 0
      this.InvoceObj.DiscountPercent = null
      this.InvoceObj.TaxPercent = null
    }
  }


  OnNav() {
    this.router.navigate(['/Invoice/InvoiceList'])
  }

  OnNavPayment() {
    this.router.navigate(['/Invoice/PaymentsIndex'])
  }
  saveStatus(event: any) {
    this.ShowItemsModal = false
  }
  NumberToFixed() {
    this.InvoceObj.Discount = +this.InvoceObj.Discount.toFixed(2)
    this.InvoceObj.GrandTotal = +this.InvoceObj.GrandTotal.toFixed(2)
    this.InvoceObj.InvoiceAmount = +this.InvoceObj.InvoiceAmount.toFixed(2)
    this.InvoceObj.MaterialAmount = +this.InvoceObj.MaterialAmount.toFixed(2)
    this.InvoceObj.MiscellaneousAmount = +this.InvoceObj.MiscellaneousAmount.toFixed(2)
    this.InvoceObj.TaxAmount = +this.InvoceObj.TaxAmount.toFixed(2)
  }
  BilltoShiping(event) {
    if (event) {
        
        this.companydetails.CompanyObj.BillingAddress=this.companydetails.CompanyObj.MailingAddress
        this.companydetails.CompanyObj.Billingstreet=this.companydetails.CompanyObj.Shippingstreet
        this.companydetails.CompanyObj.Billingcity=this.companydetails.CompanyObj.Shippingcity
        this.companydetails.CompanyObj.BillingStateText=this.companydetails.CompanyObj.MailingStateText
        this.companydetails.CompanyObj.Billingzip=this.companydetails.CompanyObj.Shippingzip
        this.companydetails.CompanyObj.BillingCountryText=this.companydetails.CompanyObj.MailingCountryText
        this.shippingaddress =   this.shippingaddress = `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet}\n ${this.companydetails.CompanyObj.Billingcity}  ${this.companydetails.CompanyObj.BillingStateText} , ${this.companydetails.CompanyObj.Billingzip}   \n ${this.companydetails.CompanyObj.BillingCountryText}`;
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
}

