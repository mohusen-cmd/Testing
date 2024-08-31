import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CardViewModel } from 'src/app/models/ICardViewModel';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { CompanyDetailsViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { InvoiceDomainModel } from 'src/app/models/IInvoiceDomainModel';
import { PaymentsDomainModel } from 'src/app/models/IPaymentsDomainModel';
import { IncomeAccountsRefViewModel, QBJournalEntryEntity, QBJournalEntryViewModel, QuickbookJournalLineItemViewModel } from 'src/app/models/QuickbookJournalLineItemViewModel';
import { InvoiceService } from 'src/app/services/Invoice.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quick-payment',
  templateUrl: './quick-payment.component.html',
  styleUrls: ['./quick-payment.component.scss']
})
export class QuickPaymentComponent implements OnInit {
  paymentObj: PaymentsDomainModel = new PaymentsDomainModel()
  InvoiceListvm: InvoiceDomainModel = new InvoiceDomainModel()
  companydetails: CompanyDetailsViewModel = new CompanyDetailsViewModel();
  clientObj: ClientViewModel = new ClientViewModel()
  cardData: CardViewModel = new CardViewModel()
  JournalList: QuickbookJournalLineItemViewModel[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  transactionId: string = '';
  cardForm: FormGroup
  MailingInfolist: any = {}
  companylogo: any;
  model: any = {};
  billingadrees: string;
  constructor(public fb: FormBuilder,
    public invoiceservice: InvoiceService,
    public route: ActivatedRoute,
    public companyservice: CompanyService,
    public claimsHelper: ClaimsHelper,
    public userservice: UserService,
    public commonservice: CommonService,
    public authenticationservice: AuthenticationService,
    public router: Router,
    public toastr: ToastrManager) {
      this.paymentObj.InvvoiceObj =new InvoiceDomainModel()
     }

  ngOnInit(): void {debugger

    this.initForm()
    this.route.queryParamMap.subscribe((queryParam) => {

      let InvoiceId = queryParam.get("InvoiceID")
      let token = queryParam.get("amp;BearerToken")
      this.paymentObj.AmountPaid = queryParam.get('amp;AmountPaid')
      let UserID = queryParam.get('amp;UserId')

      if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
        localStorage.setItem('token', token);
      }
      this.QuickPayment(InvoiceId)

    })
  }
  private initForm() {
    this.cardForm = this.fb.group({
      nameOnCard: ['', Validators.required],
      cardNumber: [null, [Validators.required, Validators.maxLength(16)]],
      expirationDate: ['', [Validators.required, Validators.maxLength(4)]],
      cvv: ['', [Validators.required, Validators.maxLength(4)]],
      zipcode: [null, [Validators.required, Validators.maxLength(6)]],
      amount: ['', Validators.required]
    });
  }
  QuickPayment(InvoiceId) {

    let QBInvId = 0;
    let QBCustID = 0;
    let QBRefreshToken = "";
    this.invoiceservice.GetInvoiceListForinvoiceId(InvoiceId).subscribe((response: InvoiceDomainModel) => {debugger
      this.InvoiceListvm = response
      if (this.InvoiceListvm.TermsID == 1) { this.InvoiceListvm.TermsText = "Due Now"; }
      else if (this.InvoiceListvm.TermsID == 2) { this.InvoiceListvm.TermsText = "Net " + 15; }
      else if (this.InvoiceListvm.TermsID == 3) { this.InvoiceListvm.TermsText = "Net " + 30;; }
      else if (this.InvoiceListvm.TermsID == 4) { this.InvoiceListvm.TermsText = "Net " + 45; }
      else if (this.InvoiceListvm.TermsID == 5) { this.InvoiceListvm.TermsText = "Net " + 60; }
      else if (this.InvoiceListvm.TermsID == 6) { this.InvoiceListvm.TermsText = "Net " + 90; }
      else { this.InvoiceListvm.TermsText = "Net " + 30; }
      QBInvId = this.InvoiceListvm.QBInvID;
      QBCustID = this.InvoiceListvm.QBCustID;
      QBRefreshToken = this.InvoiceListvm.QBRefreshToken == null ? "" : this.InvoiceListvm.QBRefreshToken;
      if (QBInvId > 0) {
        this.InvoiceListvm.QBInvID = QBInvId;
      }
      this.InvoiceListvm.Paymenttype='3'
      if (this.InvoiceListvm.Paymenttype == "3") {debugger
        var CompanyID = this.InvoiceListvm.CustomerID;
        this.companyservice.GetCompanyDetailsById(CompanyID).subscribe((response: CompanyDetailsViewModel) => {debugger
          this.companydetails = response
          this.billingadrees = `${this.InvoiceListvm.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet} \n ${this.companydetails.CompanyObj.Billingcity} , ${this.companydetails.CompanyObj.BillingStateText} ,${this.companydetails.CompanyObj.Billingzip}  \n ${this.companydetails.CompanyObj.BillingCountryText}`
          for (let i = 0; i < this.companydetails.StateList.length; i++) {
            if (this.companydetails.CompanyObj.ShippingstateID == this.companydetails.StateList[i].ID) {
              this.InvoiceListvm.StateName = this.companydetails.StateList[i].StateName;
            }
          }
          for (let i = 0; i < this.companydetails.CountryList.length; i++) {
            if (this.companydetails.CompanyObj.ShippingcountryID == this.companydetails.CountryList[i].CountryId) {
              this.InvoiceListvm.CountryName = this.companydetails.CountryList[i].CountryName;
            }
          }
          this.paymentObj.InvvoiceObj.InvoiceID = this.InvoiceListvm.InvoiceID;
          this.paymentObj.InvvoiceObj.InvoiceNo = this.InvoiceListvm.InvoiceNo;
          this.paymentObj.InvvoiceObj.Description = this.InvoiceListvm.Description;
          this.paymentObj.InvvoiceObj.InvoiceAmount = this.InvoiceListvm.InvoiceAmount;
          this.paymentObj.InvvoiceObj.GrandTotal = this.InvoiceListvm.GrandTotal;
          this.paymentObj.InvvoiceObj.CustomerID = this.InvoiceListvm.CustomerID;
          this.paymentObj.InvvoiceObj.BalanceAmount = this.InvoiceListvm.BalanceAmount;
          this.paymentObj.InvvoiceObj.AmountPaid = this.InvoiceListvm.BalanceAmount;
          this.paymentObj.InvvoiceObj.TaxAmount = this.InvoiceListvm.TaxAmount;
          this.paymentObj.InvvoiceObj.CreatedDate = this.InvoiceListvm.CreatedDate;
          this.paymentObj.InvvoiceObj.RecursDate = this.InvoiceListvm.RecursDate;
          this.paymentObj.Address1 = this.companydetails.CompanyObj.BillingAddress;
          this.paymentObj.Address2 = this.companydetails.CompanyObj.Shippingcity;
          this.paymentObj.Phone = this.companydetails.CompanyObj.Phone;
          this.paymentObj.Email = this.companydetails.CompanyObj.Email;
          this.paymentObj.AmountPaid = this.InvoiceListvm.Total;
          this.paymentObj.InvvoiceObj.MaterialAmount = this.paymentObj.InvvoiceObj.MaterialAmount;
          this.paymentObj.InvvoiceObj.ServiceAmt = this.InvoiceListvm.ServiceAmt;

          //ComViewModel.Amount = (decimal)INVModelObj.ServiceAmt;
          this.paymentObj.InvvoiceObj.MiscellaneousAmount = this.InvoiceListvm.MiscellaneousAmount;
          this.paymentObj.InvvoiceObj.MiscellaneousPercent = this.InvoiceListvm.MiscellaneousPercent;
          this.paymentObj.PaymentType = 3;

        })
      }
    })

  }
  // CreatePaymentMethod() {debugger
  //   var authToken = "";
  //   var results = "";
  //   var UserId = this.claimsHelper.GetUserIdAPIKeyFromClaims()
  //   let username = "";
  //   let password = "";
  //   let loginData = {
  //     UserName: "",
  //     Password: ""
  //   };
  //   this.userservice.GetUserDetailsById(UserId).subscribe((response: ClientViewModel) => {debugger
  //     this.clientObj = response
  //     if (this.clientObj.Users.ApiUsername != null && this.clientObj.Users.ApiPassword != null) {
  //       this.clientObj.ApiUsername = this.clientObj.Users.ApiUsername;
  //       this.clientObj.ApiPassword = (this.clientObj.Users.ApiPassword)
  //       username = this.clientObj.ApiUsername
  //       password = this.clientObj.ApiPassword
  //       const formData = new FormData();
  //       formData.append("Decrypt", this.clientObj.ApiPassword);
  //       this.commonservice.PostDecrypt(formData).subscribe((resepone: any) => {debugger
  //         //this.clientObj.ApiPassword = resepone
  //         password = resepone
  //         loginData = {
  //           UserName: username,
  //           Password: password
  //         };
  //       })
  //     } else {
  //       username = "NoUser";
  //       password = "NoPass";
  //       loginData = {
  //         UserName: username,
  //         Password: password
  //       };
  //     }

  //     if (loginData.UserName != "" && loginData.Password != "") {
  //       this.authenticationservice.MiPaymentBearerToken(loginData).subscribe((AuthResponse: any) => {debugger

  //         authToken = AuthResponse
  //         localStorage.setItem('BillingauthToken', authToken["BearerToken"])
  //         this.cardData.ExpirationDate = this.cardData.Month + this.cardData.Year
  //         this.cardData.Month = null
  //         this.cardData.Year = null
  
  //         if (this.cardForm.valid) {
  
  //           var MipaymentObj: any = {
  //             'TransactionType': '1',
  //             'ForceDuplicate': false,
  //             'CardData': this.cardData,
  //             'InvoiceData': {
  //               TotalAmount: this.paymentObj.AmountPaid,
  //             }
  //           }
  //           if (this.paymentObj.TransactionId == 1) {
  //             MipaymentObj.TransactionType = "Sale";
  //           }
  //           else if (MipaymentObj.TransactionType == "2") {
  //             MipaymentObj.TransactionType = "Refund";
  //           }
  //           else {
  //             MipaymentObj.TransactionType = "Sale";
  //           };
  //           if (MipaymentObj.TransactionType == "Sale") {
  //             MipaymentObj.TransactionType = MipaymentObj.TransactionType,
  //               MipaymentObj.ForceDuplicate = MipaymentObj.ForceDuplicate,
  //               MipaymentObj.CardData = this.cardData,
  //               MipaymentObj.InvoiceData.TotalAmount = this.paymentObj.AmountPaid
  //           }
  //           else if (MipaymentObj.TransactionType == "Refund") {
  //             MipaymentObj.TransactionType = MipaymentObj.TransactionType,
  //               MipaymentObj.ForceDuplicate = MipaymentObj.ForceDuplicate,
  //               MipaymentObj.CardData = this.cardData,
  //               MipaymentObj.InvoiceData.TotalAmount = this.paymentObj.AmountPaid
  //             MipaymentObj.OriginalTransaction = 0
  //           }
  //           var mipay =
  //           {
  //             CustomerID: this.paymentObj.InvvoiceObj.CustomerID
  //           };
  //           this.authenticationservice.MiPaymentTransactionsbcp(MipaymentObj).subscribe((response: any) => {debugger
  //             if (response.type != 0) {
  //               this.paymentObj.TransToken = response.body.Token
  //               this.paymentObj.TransactionId = response['body'].TransactionId
  //               this.paymentObj.Email = response['body'].Email;
  //               this.invoiceservice.GetInvoiceListForinvoiceId(this.paymentObj.InvvoiceObj.InvoiceID).subscribe((resepone: any) => {debugger
  //                 this.InvoiceListvm = response
  //                 var QBInvId = this.InvoiceListvm.QBInvID;
  //                 var QBCustID = this.InvoiceListvm.QBCustID;
  //                 this.paymentObj.InvvoiceObj.CompaignID = this.InvoiceListvm.CompaignID;
  //                 this.paymentObj.InvvoiceObj.pointmailStatus = this.InvoiceListvm.pointmailStatus;
  //                 var QBRefreshToken = this.InvoiceListvm.QBRefreshToken == null ? "" : this.InvoiceListvm.QBRefreshToken;
  //                 if (QBInvId > 0) {
  //                   this.paymentObj.InvvoiceObj.QBInvID = QBInvId;
  //                 }
  //                 var MisPercent = (this.paymentObj.InvvoiceObj.MiscellaneousPercent) / 100;
  
  //                 // TempData["CreatePayment"] = "CreatePayment";
  //                 //TempData["TransID"] = paymentResponse.TransactionId;
  //                 var BalanceAmt = this.paymentObj.InvvoiceObj.BalanceAmount
  //                 var PaidAmt = this.paymentObj.InvvoiceObj.ServiceAmt;
  //                 var AmountPaid = BalanceAmt - PaidAmt;
  //                 var FAmt = AmountPaid < 0 ? 0 : AmountPaid;
  //                 this.paymentObj.AmountPaid = this.paymentObj.InvvoiceObj.ServiceAmt;
  //                 this.paymentObj.InvoiceBalance = AmountPaid
  //                 this.paymentObj.InvvoiceObj.BalanceAmount = this.paymentObj.InvoiceBalance;
  //                 this.paymentObj.InvvoiceObj.LaborAmount = this.paymentObj.InvoiceBalance;
  //                 this.paymentObj.CustomerID = this.paymentObj.InvvoiceObj.CustomerID;
  //                 this.paymentObj.FirstName = this.companydetails.CompanyObj.Name;
  //                 this.paymentObj.LastName = this.companydetails.CompanyObj.LName;
  //                 this.paymentObj.Address1 = this.companydetails.CompanyObj.BillingAddress;
  //                 this.paymentObj.Address2 = this.companydetails.CompanyObj.Shippingcity;
  //                 this.paymentObj.Phone = this.companydetails.CompanyObj.Phone;
  //                 this.paymentObj.InvoiceID = this.paymentObj.InvvoiceObj.InvoiceID;
  //                 this.paymentObj.InvvoiceObj.RecursDate = this.InvoiceListvm.RecursDate;
  //                 this.paymentObj.InvvoiceObj.DueDate = this.InvoiceListvm.DueDate;
  //                 this.paymentObj.InvvoiceObj.InvoiceNo = this.paymentObj.InvvoiceObj.InvoiceNo;
  //                 this.paymentObj.InvoiceAmount = this.paymentObj.InvvoiceObj.GrandTotal;
  //                 this.paymentObj.InvvoiceObj.BalanceAmount = this.paymentObj.InvvoiceObj.BalanceAmount;
  //                 this.paymentObj.PaymentType = 3;
  //                 this.paymentObj.TransactionId = this.paymentObj.TransactionId;
  //                 this.paymentObj.TransactionId = this.paymentObj.TransactionId;
  //                 this.paymentObj.TransToken = this.paymentObj.TransToken;
  //                 this.paymentObj.Email = this.paymentObj.Email;
  //                 this.paymentObj.InvvoiceObj.TaxPercent = this.InvoiceListvm.TaxPercent;
  //                 this.paymentObj.InvvoiceObj.DiscountPercent = this.InvoiceListvm.DiscountPercent;
  //                 if (this.paymentObj.InvoiceBalance == this.paymentObj.InvvoiceObj.GrandTotal) {
  //                   this.paymentObj.InvvoiceObj.Paystatus = "Unpaid";
  //                 }
  //                 else if (this.paymentObj.InvoiceBalance > 0 && this.paymentObj.InvoiceBalance < this.paymentObj.InvvoiceObj.GrandTotal) {
  //                   this.paymentObj.InvvoiceObj.Paystatus = "Partially Paid";
  //                 }
  //                 else if (this.paymentObj.InvoiceBalance == 0) {
  //                   this.paymentObj.InvvoiceObj.Paystatus = "Paid";
  //                 }
  //                 this.invoiceservice.GetInvoiceItemforCard(this.paymentObj.InvvoiceObj.InvoiceID, this.paymentObj.InvvoiceObj.InvoiceNo).subscribe((response: any) => {
  //                   this.InvoiceListvm.Listinvoiceitems = response
  //                   this.invoiceservice.InsertPaymentsDetails(this.paymentObj).subscribe((PaymentIdvm: any) => {
  //                     var Paymentid = PaymentIdvm.split('/');
  //                     this.paymentObj.PaymentID = Paymentid[1];
  //                     this.OnePointMail(this.paymentObj.PaymentID)
  //                   })
  //                 })
  
  //               })
  //             }
  //           })
  //         }
  //       })
  //     }

     

  //   })
  // }
  
  async CreatePaymentMethod() {debugger
    const authToken = "";
    const UserId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    let username = "";
    let password:any = "";
    let loginData = {
      UserName: "",
      Password: ""
    };

    try {
     this.onPayCreditCard()
    } catch (error) {
      console.error('Error creating payment method:', error);
    }
  }
  OnePointMail(PaymentID) {

    this.MailingInfolist.EmailAPIKey = this.claimsHelper.GetEmailAPIKeyFromClaims();
    this.MailingInfolist.EmailAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
    this.MailingInfolist.FromName = "Digital55";
    this.MailingInfolist.FromAddress = "noreply@piltd.com"
    this.MailingInfolist.ReplytoAddress = "noreply@piltd.com";
    this.MailingInfolist.Subject = "Payments Details.";
    this.MailingInfolist.AssignedCampaign = ''
    this.MailingInfolist.Recipients = this.companydetails['CompanyObj']?.Email
    this.MailingInfolist.BccEmails = this.InvoiceListvm.Email == "0" ? "" : this.InvoiceListvm.Email
    this.MailingInfolist.EnableTracking = "1"
    this.MailingInfolist.VMTAName = "";
    this.MailingInfolist.Tokens = "";
    this.MailingInfolist.ContactXMLData = "";
    this.MailingInfolist.Template = ''///this.pdftable.nativeElement.innerHTML;
    var CompaignObj;

    this.invoiceservice.EstmateInvoiceOnePointMail(this.MailingInfolist).subscribe((CompaignObj: any) => {
      CompaignObj = JSON.parse(CompaignObj)
      this.InvoiceListvm.CompaignID = CompaignObj['Data'].CampaignId
      this.InvoiceListvm.pointmailStatus = CompaignObj['status']
      this.QuickBookPaymentMode(PaymentID)
      // this.invoiceservice.UpdateSingleInvoiceBalanceAmount(this.InvoiceListvm).subscribe((response: any) => {

      // })
    })


  }
  QuickBookPaymentMode(payId: any) {

    var QuickBookObj: any = {}
    var modal: any = {
      QBRealmID: localStorage.getItem("realmId"),
      QBBearerToken: localStorage.getItem("QBAccessToken"),
    }
    var UserID = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    if (UserID == 1) {
      let ClientName = localStorage.getItem("ClientId")
      this.commonservice.GetQBLoginIncomeAcct(UserID, ClientName).subscribe((resepone: ClientViewModel) => {
        this.clientObj = resepone
      })
    }
    else {
      let ClientName = localStorage.getItem("ClientId")
      this.invoiceservice.GetQBLoginUserAcct(UserID, ClientName).subscribe((resepone: ClientViewModel) => {
        this.clientObj = resepone
      })
    }
    if (this.clientObj != null) {
      this.invoiceservice.InvoiceQuickBooksList(modal).subscribe((response: any) => {
        let newAcctList = JSON.parse(response.Result)
        if (newAcctList['fault'] != undefined) {
          this.invoiceservice.UpdateSingleInvoiceBalanceAmount(this.InvoiceListvm).subscribe((response: any) => {
            if (response) {
              //this.toastr.successToastr('Payment created successfully', 'success')
              this.router.navigate(['/Invoice/PaymentsIndex'])
            }
          })
          // this.toastr.errorToastr(`${newAcctList['fault'].error[0].message}`, "error")
        } else {
          newAcctList = newAcctList['QueryResponse'].Account
          if (this.clientObj.ReceivableAcctNum != null) {
            var receivableAccount = newAcctList.filter(x => x.AcctNum == this.clientObj.ReceivableAcctNum && x.SubAccount == false)
            if (receivableAccount.length != 0) {
              this.clientObj.QBAcctReceivable = receivableAccount[0].Name;
              QuickBookObj.QBAcctRcvID = receivableAccount[0].Id;
            }
          }
          else {
            var receivableAccount = newAcctList.filter(x => x.Name == this.clientObj.QBAcctReceivable && x.SubAccount == false)
            if (receivableAccount.length != 0) {
              QuickBookObj.QBAcctRcvID = receivableAccount[0].Id;
            }
          }
          if (this.clientObj.BankAcctNum != null) {
            var BankAccount = newAcctList.filter(x => x.AcctNum == this.clientObj.BankAcctNum && x.SubAccount == false)
            if (BankAccount.length != 0) {
              this.clientObj.QBBankAccnt = BankAccount[0].Name;
              QuickBookObj.QBBankAcctID = BankAccount[0].Id;
            }
          }
          else {
            var BankAccount = newAcctList.filter(x => x.Name == this.clientObj.QBBankAccnt && x.SubAccount == false)
            if (BankAccount.length != 0) {
              QuickBookObj.QBBankAcctID = BankAccount[0].Id;
            }
          }
          if (this.clientObj.SalesTaxAcctNum != null) {
            var salesTaxAccount = newAcctList.filter(x => x.AcctNum == this.clientObj.SalesTaxAcctNum && x.SubAccount == false)
            if (salesTaxAccount.length != 0) {
              this.clientObj.QBSaleTaxAcct = salesTaxAccount[0].Name;
              QuickBookObj.QBSaleTaxID = salesTaxAccount[0].Id;
            }
          }
          else {
            var salesTaxAccount = newAcctList.filter(x => x.Name == this.clientObj.QBSaleTaxAcct && x.SubAccount == false)
            if (salesTaxAccount.length != 0) {
              QuickBookObj.QBSaleTaxID = salesTaxAccount[0].Id;
            }
          }
          this.InvoiceListvm.TaxPercent = this.InvoiceListvm.TaxPercent == null ? 0 : this.InvoiceListvm.TaxPercent
          this.InvoiceListvm.DiscountPercent = this.InvoiceListvm.DiscountPercent == null ? 0 : this.InvoiceListvm.DiscountPercent
          this.InvoiceListvm.TaxPercent = parseFloat(this.InvoiceListvm.TaxPercent);
          // Calculate ActualPaid
          const ActualPaid = this.InvoiceListvm.TaxPercent / 100;
          // Calculate ActualPaidAmt, rounding to 2 decimal places
          const ActualPaidAmt = (this.InvoiceListvm.Total * ActualPaid).toFixed(2);
          // Calculate SubPaidAmt
          const SubPaidAmt = this.InvoiceListvm.Total - parseFloat(ActualPaidAmt);

          if (this.InvoiceListvm.TaxPercent > 0) {
            var AccountCreditRefObj: IncomeAccountsRefViewModel =
            {
              value: QuickBookObj.QBAcctRcvID,
              name: this.clientObj.QBAcctReceivable
            };
            var AcctDebitRefObj: IncomeAccountsRefViewModel =
            {
              value: QuickBookObj.QBBankAcctID,
              name: this.clientObj.QBBankAccnt
            };
            var EntityRef: IncomeAccountsRefViewModel =
            {
              name: this.companydetails.CompanyObj.Name,
              value: this.companydetails.CompanyObj.QBCustID
            };
            var Entityobj: QBJournalEntryEntity =
            {
              Type: "Customer",
              EntityRef: EntityRef
            };
            var LineItemDebit: QuickbookJournalLineItemViewModel =
            {
              Description: "new payment by cash/check " + this.InvoiceListvm.InvoiceNo,
              Amount: this.InvoiceListvm.Total,
              DetailType: "JournalEntryLineDetail",
              JournalEntryLineDetail: {
                PostingType: "Debit",
                AccountRef: AcctDebitRefObj
              }
            };
            var LineItemCredit: QuickbookJournalLineItemViewModel =
            {
              Description: "new payment by cash/check " + this.InvoiceListvm.InvoiceNo,
              Amount: this.InvoiceListvm.Total,
              DetailType: "JournalEntryLineDetail",
              JournalEntryLineDetail: {
                PostingType: "Credit",
                AccountRef: AccountCreditRefObj,
                Entity: Entityobj
              }
            };
            this.JournalList.push(LineItemDebit)
            this.JournalList.push(LineItemCredit)
          } else {
            var AccountCreditRefObj: IncomeAccountsRefViewModel =
            {
              value: QuickBookObj.QBAcctRcvID,
              name: this.clientObj.QBAcctReceivable
            };
            var AcctCreditTaxRefObj: IncomeAccountsRefViewModel =
            {
              value: QuickBookObj.QBSaleTaxID,
              name: this.clientObj.QBSaleTaxAcct
            };
            var AcctDebitRefObj: IncomeAccountsRefViewModel =
            {
              value: QuickBookObj.QBBankAcctID,
              name: this.clientObj.QBBankAccnt
            };
            var EntityRef: IncomeAccountsRefViewModel =
            {
              name: this.companydetails.CompanyObj.Name,
              value: this.companydetails.CompanyObj.QBCustID
            };
            var Entityobj: QBJournalEntryEntity =
            {
              Type: "Customer",
              EntityRef: EntityRef
            };
            var LineItemDebit: QuickbookJournalLineItemViewModel =
            {
              Description: "new payment by cash/check " + this.InvoiceListvm.InvoiceNo,
              Amount: this.InvoiceListvm.Total,
              DetailType: "JournalEntryLineDetail",
              JournalEntryLineDetail: {
                PostingType: "Debit",
                AccountRef: AcctDebitRefObj
              }
            };
            var LineItemCreditTax: QuickbookJournalLineItemViewModel =
            {
              Description: "new payment by cash/check " + this.InvoiceListvm.InvoiceNo,
              Amount: this.InvoiceListvm.TaxPercent,
              DetailType: "JournalEntryLineDetail",
              JournalEntryLineDetail: {
                PostingType: "Credit",
                AccountRef: AcctCreditTaxRefObj
              }
            };

            var LineItemCredit: QuickbookJournalLineItemViewModel =
            {
              Description: "new payment by cash/check " + this.InvoiceListvm.InvoiceNo,
              Amount: this.InvoiceListvm.Total,
              DetailType: "JournalEntryLineDetail",
              JournalEntryLineDetail: {
                PostingType: "Credit",
                AccountRef: AccountCreditRefObj,
                Entity: Entityobj
              }
            };
            this.JournalList.push(LineItemDebit);
            //this.JournalList.push(LineItemCreditTax);
            this.JournalList.push(LineItemCredit);
            var NewJEData: QBJournalEntryViewModel =
            {
              DocNumber: this.InvoiceListvm.InvoiceNo,
              Line: this.JournalList,
              QBRealmID: localStorage.getItem("realmId"),
              QBBearerToken: localStorage.getItem("QBAccessToken"),
            };
            this.invoiceservice.InsertQuickBooksInvoice(NewJEData).subscribe((ResponseData: any) => {

              var ResponseData = JSON.parse(ResponseData)
              this.InvoiceListvm.Id = ResponseData['JournalEntry'].Id;
              this.InvoiceListvm.InvoiceID = this.InvoiceListvm.InvoiceID
              this.InvoiceListvm.QBCustID = this.InvoiceListvm.QBCustID;
              this.InvoiceListvm.QBRefreshToken = this.InvoiceListvm.QBRefreshToken;
              this.invoiceservice.CRM_UpdatePaymentbyID(payId, this.InvoiceListvm.Id).subscribe((response: any) => {
                if (response) {
                  this.invoiceservice.UpdateSingleInvoiceBalanceAmount(this.InvoiceListvm).subscribe((response: any) => {
                    if (response) {
                      this.toastr.successToastr('Payment created successfully', 'success')
                    }
                  })
                }
              })

            })

          }
        }

      })
    }
  }
  GetInvoiceDetails() {
    let ClientId = localStorage.getItem("ClientId")
    this.authenticationservice.GetClientDetailsById(ClientId).subscribe((data) => {

      this.model = { ...data }
      this.companylogo = this.model["CompanyLogo"]
    })
  }


  onPayCreditCard() {
    let UserId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    this.userservice.GetUserDetailsById(UserId).subscribe((response: any) => {
        this.clientObj = response;
        let username = this.clientObj.Users.ApiUsername || 'NoUser';
        let password = this.clientObj.Users.ApiPassword || 'NoPass';

        if (username !== 'NoUser' && password !== 'NoPass') {
            const formData = new FormData();
            formData.append('Decrypt', password);

            this.commonservice.PostDecrypt(formData).subscribe((decryptedPassword: any) => {
                this.authenticateAndProcessPayment(username, decryptedPassword);
            });
        } else {
            this.authenticateAndProcessPayment(username, password);
        }
    });
}

authenticateAndProcessPayment(username: string, password: string) {
    let loginData = {
        UserName: username,
        Password: password
    };

    this.authenticationservice.MiPaymentBearerToken(loginData).subscribe((AuthResponse: any) => {
        let authToken = AuthResponse['BearerToken'];
        localStorage.setItem('BillingauthToken', authToken);

        this.cardData.ExpirationDate = this.cardData.ExpirationDate
        this.cardData.Month = null;
        this.cardData.Year = null;

        if (this.cardForm.valid) {
            let MipaymentObj: any = {
                TransactionType: this.paymentObj.TransactionId == 1 ? 'Sale' : this.paymentObj.TransactionId == 2 ? 'Refund' : 'Sale',
                ForceDuplicate: false,
                CardData: this.cardData,
                InvoiceData: {
                    TotalAmount: this.paymentObj.AmountPaid
                }
            };

            if (MipaymentObj.TransactionType == 'Refund') {
                MipaymentObj.OriginalTransaction = 0;
            }
            if (this.paymentObj.TransactionId === 1) {
              MipaymentObj.TransactionType = "Sale";
            } else if (this.paymentObj.TransactionId === 2) {
              MipaymentObj.TransactionType = "Refund";
              MipaymentObj.OriginalTransaction = 0;
            } else {
              MipaymentObj.TransactionType = "Sale";
            }
  

            this.authenticationservice.MiPaymentTransactionsbcp(MipaymentObj).subscribe(
                (response: any) => {
                  if (response.type != 0) {
                    this.paymentObj.TransToken = response.body.Token
                    this.paymentObj.TransactionId = response['body'].TransactionId
                    this.paymentObj.Email = response['body'].Email;
                    this.invoiceservice.GetInvoiceListForinvoiceId(this.paymentObj.InvvoiceObj.InvoiceID).subscribe((resepone: any) => {debugger
                      this.InvoiceListvm = response
                      var QBInvId = this.InvoiceListvm.QBInvID;
                      var QBCustID = this.InvoiceListvm.QBCustID;
                      this.paymentObj.InvvoiceObj.CompaignID = this.InvoiceListvm.CompaignID;
                      this.paymentObj.InvvoiceObj.pointmailStatus = this.InvoiceListvm.pointmailStatus;
                      var QBRefreshToken = this.InvoiceListvm.QBRefreshToken == null ? "" : this.InvoiceListvm.QBRefreshToken;
                      if (QBInvId > 0) {
                        this.paymentObj.InvvoiceObj.QBInvID = QBInvId;
                      }
                      var MisPercent = (this.paymentObj.InvvoiceObj.MiscellaneousPercent) / 100;
      
                      // TempData["CreatePayment"] = "CreatePayment";
                      //TempData["TransID"] = paymentResponse.TransactionId;
                      var BalanceAmt = this.paymentObj.InvvoiceObj.BalanceAmount
                      var PaidAmt = this.paymentObj.InvvoiceObj.ServiceAmt;
                      var AmountPaid = BalanceAmt - PaidAmt;
                      var FAmt = AmountPaid < 0 ? 0 : AmountPaid;
                      this.paymentObj.AmountPaid = this.paymentObj.InvvoiceObj.ServiceAmt;
                      this.paymentObj.InvoiceBalance = AmountPaid
                      this.paymentObj.InvvoiceObj.BalanceAmount = this.paymentObj.InvoiceBalance;
                      this.paymentObj.InvvoiceObj.LaborAmount = this.paymentObj.InvoiceBalance;
                      this.paymentObj.CustomerID = this.paymentObj.InvvoiceObj.CustomerID;
                      this.paymentObj.FirstName = this.companydetails.CompanyObj.Name;
                      this.paymentObj.LastName = this.companydetails.CompanyObj.LName;
                      this.paymentObj.Address1 = this.companydetails.CompanyObj.BillingAddress;
                      this.paymentObj.Address2 = this.companydetails.CompanyObj.Shippingcity;
                      this.paymentObj.Phone = this.companydetails.CompanyObj.Phone;
                      this.paymentObj.InvoiceID = this.paymentObj.InvvoiceObj.InvoiceID;
                      this.paymentObj.InvvoiceObj.RecursDate = this.InvoiceListvm.RecursDate;
                      this.paymentObj.InvvoiceObj.DueDate = this.InvoiceListvm.DueDate;
                      this.paymentObj.InvvoiceObj.InvoiceNo = this.paymentObj.InvvoiceObj.InvoiceNo;
                      this.paymentObj.InvoiceAmount = this.paymentObj.InvvoiceObj.GrandTotal;
                      this.paymentObj.InvvoiceObj.BalanceAmount = this.paymentObj.InvvoiceObj.BalanceAmount;
                      this.paymentObj.PaymentType = 3;
                      this.paymentObj.TransactionId = this.paymentObj.TransactionId;
                      this.paymentObj.TransactionId = this.paymentObj.TransactionId;
                      this.paymentObj.TransToken = this.paymentObj.TransToken;
                      this.paymentObj.Email = this.paymentObj.Email;
                      this.paymentObj.InvvoiceObj.TaxPercent = this.InvoiceListvm.TaxPercent;
                      this.paymentObj.InvvoiceObj.DiscountPercent = this.InvoiceListvm.DiscountPercent;
                      if (this.paymentObj.InvoiceBalance == this.paymentObj.InvvoiceObj.GrandTotal) {
                        this.paymentObj.InvvoiceObj.Paystatus = "Unpaid";
                      }
                      else if (this.paymentObj.InvoiceBalance > 0 && this.paymentObj.InvoiceBalance < this.paymentObj.InvvoiceObj.GrandTotal) {
                        this.paymentObj.InvvoiceObj.Paystatus = "Partially Paid";
                      }
                      else if (this.paymentObj.InvoiceBalance == 0) {
                        this.paymentObj.InvvoiceObj.Paystatus = "Paid";
                      }
                      this.invoiceservice.GetInvoiceItemforCard(this.paymentObj.InvvoiceObj.InvoiceID, this.paymentObj.InvvoiceObj.InvoiceNo).subscribe((response: any) => {
                        this.InvoiceListvm.Listinvoiceitems = response
                        this.invoiceservice.InsertPaymentsDetails(this.paymentObj).subscribe((PaymentIdvm: any) => {
                          var Paymentid = PaymentIdvm.split('/');
                          this.paymentObj.PaymentID = Paymentid[1];
                          this.OnePointMail(this.paymentObj.PaymentID)
                        })
                      })
      
                    })
                  }
                },
                (error) => {
                   // this.creditcardmodal.hide();
                    this.toastr.errorToastr('Invalid Card', 'error');
                    console.log(error);
                }
            );
        }
    });
}


}
