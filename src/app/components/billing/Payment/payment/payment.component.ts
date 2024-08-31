import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CardViewModel } from 'src/app/models/ICardViewModel';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { CompanyDetailsViewModel, CompanyViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { InvoiceDomainModel } from 'src/app/models/IInvoiceDomainModel';
import { PaymentsDomainModel } from 'src/app/models/IPaymentsDomainModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { InvoiceService } from 'src/app/services/Invoice.service';
import { LoadingService } from 'src/app/services/Loading.service';
import { CommonService } from 'src/app/services/common.service';
import {
    IncomeAccountsRefViewModel,
    QBJournalEntryEntity,
    QBJournalEntryLineDetailViewModel,
    QBJournalEntryViewModel,
    QuickbookJournalLineItemViewModel
} from 'src/app/models/QuickbookJournalLineItemViewModel';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import {
    CheckViewModel,
    MiPaymentTransactionResponseViewModel,
    MiPaymentTransactionViewModel,
    OriginalTransactionViewModel,
    PaymentInvoice,
    PaymentViewModel
} from 'src/app/models/PaymentViewModel';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { de } from 'date-fns/locale';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    companydetails: CompanyDetailsViewModel = new CompanyDetailsViewModel();
    ComViewModel: PaymentViewModel = new PaymentViewModel(); //ACH
    paymentObj: PaymentsDomainModel = new PaymentsDomainModel();
    InvoceObj: InvoiceDomainModel = new InvoiceDomainModel();
    JournalList: QuickbookJournalLineItemViewModel[] = [];
    clientObj: ClientViewModel = new ClientViewModel();
    cardData: CardViewModel = new CardViewModel();
    MiACHpayObj: MiPaymentTransactionViewModel;
    @ViewChild('creditcardmodal') creditcardmodal: any;
    @ViewChild('paymentmodal') paymentmodal: any;
    @ViewChild('printContents') printsection: any;
    @ViewChild('amountpaid') amountpaidvalue: any;
    @ViewChild('editInvoice') editInvoice: any;
    @ViewChild('achpayment') achpayment: any;
    @ViewChild('pdftable') pdftable: any;
    size: number = 10;
    UserId: any = 1;
    statustype: any = 'All';
    invoice: any = 'Payment';
    jtStartIndex: any = 0;
    jtPageSize: any = this.size;
    jtSorting: any = 'InvoiceId desc';
    RecordCount: any = 0;
    Invoicelist: any;
    paymentModeslist: any;
    InvoiceId: any;
    Users: any = {};
    resultLength: any;
    Invoiceeditlist = [];
    PaymentList = [];
    Fname: any;
    INVno: any;
    paymentForm: FormGroup;
    cardForm: FormGroup;
    MipaymentObjForm: FormGroup;
    submitted: boolean = false;
    AmountPay: any;
    expiredateForm: any;
    duedate: any;
    companylogo: any;
    model: any = {};
    userDetails: any = {};
    teams: any;
    billingadrees: string;
    p: number = 1;
    orderByClause: string;
    totalCount: number;
    MailingInfolist: any = {};
    titleforpopup: any;
    textforpopup: any;
    marked: boolean = false;
    BearerToken: any;
    QBRealmID: any;
    accountTypes: any = {};
    transactionTypes: any = {};
    constructor(
        public authenticationservice: AuthenticationService,
        public companyservice: CompanyService,
        public loadingService: LoadingService,
        public invoiceService: InvoiceService,
        public commonservice: CommonService,
        public claimesHelper: ClaimsHelper,
        private spinner: NgxSpinnerService,
        public userservice: UserService,
        public toastr: ToastrManager,
        public _cookieService: CookieService,
        public fb: FormBuilder,
        public router: Router
    ) {
        this.paymentObj.InvvoiceObj = new InvoiceDomainModel();
        this.UserId = this.claimesHelper.GetUserIdAPIKeyFromClaims();
        this.BearerToken = localStorage.getItem('token');
        this.QBRealmID = localStorage.getItem('realmId');
    }
    displayedColumns: string[] = [
        'select',
        'invoicenumber',
        'customer',
        'amount',
        'trans',
        'balance',
        'duedate',
        'invoice',
        'status',
        'recurrence'
    ];
    dataSource = new MatTableDataSource<PeriodicElement>();
    selection = new SelectionModel<PeriodicElement>(true, []);

    displayedColumns1: string[] = ['invoicenumber', 'customer', 'amount', 'trans', 'balance', 'duedate', 'invoice', 'status', 'recurrence'];
    dataSource1 = new MatTableDataSource<PeriodicElement>();
    selection1 = new SelectionModel<PeriodicElement>(true, []);

    ngOnInit(): void {
        this.getInvoicelist();
        this.GetInvoiceDetails();
        this.GetUserDetailsById();
        this.GetDecrypt();

        this.paymentObj.TransactionId = null;
        this.cardForm = this.fb.group({
            nameOnCard: ['', { validators: [Validators.required] }],
            cardNumber: ['', { validators: [Validators.required] }],
            expirationfrom: [''],
            expirationto: [''],
            cvv: ['', { validators: [Validators.required] }],
            zipCode: ['', { validators: [Validators.required] }],
            totalamount: [''],
            transactionType: [''],
            emailClient: ['']
        });
        this.MipaymentObjForm = this.fb.group({
            NameOnCheck: ['', { validators: [Validators.required] }],
            CheckNumber: [''],
            AmountPaid: ['', { validators: [Validators.required] }],
            RoutingNumber: ['', { validators: [Validators.required] }],
            AccountNumber: ['', { validators: [Validators.required] }],
            AccountType: [''],
            TransactionType: [''],
            Email: ['']
        });

        this.Invoicelist = [
            { Value: 'All', Text: 'All', Selected: true },
            { Value: 'Paid', Text: 'Paid' },
            { Value: 'Unpaid', Text: 'Unpaid' },
            { Value: 'Partially', Text: 'Partially' }
        ];

        this.paymentModeslist = [
            { Value: '1', Text: 'Cash' },
            { Value: '2', Text: 'Check' },
            { Value: '3', Text: 'Credit Card' },
            { Value: '4', Text: 'ACH' }
        ];

        this.expiredateForm = [
            { Value: '00', Text: 'Select', Selected: true },
            { Value: '01', Text: '01' },
            { Value: '02', Text: '02' },
            { Value: '03', Text: '03' },
            { Value: '04', Text: '04' },
            { Value: '05', Text: '05' },
            { Value: '06', Text: '06' },
            { Value: '07', Text: '07' },
            { Value: '08', Text: '08' },
            { Value: '09', Text: '09' },
            { Value: '10', Text: '10' },
            { Value: '11', Text: '11' },
            { Value: '12', Text: '12' }
        ];

        this.duedate = [
            { Value: '00', Text: 'Select', Selected: true },
            { Value: '22', Text: '22' },
            { Value: '23', Text: '23' },
            { Value: '24', Text: '24' },
            { Value: '25', Text: '25' },
            { Value: '26', Text: '26' },
            { Value: '27', Text: '27' },
            { Value: '28', Text: '28' },
            { Value: '29', Text: '29' },
            { Value: '30', Text: '30' },
            { Value: '31', Text: '31' },
            { Value: '32', Text: '32' },
            { Value: '33', Text: '33' }
        ];
        this.teams = [
            { Value: '0', Text: 'Select', Selected: true },
            { Value: '1', Text: 'Due Now' },
            { Value: '2', Text: 'Net 15' },
            { Value: '3', Text: 'Net 30' },
            { Value: '4', Text: 'Net 45' },
            { Value: '5', Text: 'Net 60' },
            { Value: '6', Text: 'Net 90' }
        ];
        this.accountTypes = [
            { text: 'Select', value: '0', Selected: true },
            { text: 'Personal Checking', value: '1' },
            { text: 'Personal Savings', value: '2' },
            { text: 'Business Checking', value: '3' },
            { text: 'Business Savings', value: '4' }
        ];
        this.transactionTypes = [
            { text: 'Select', value: '0' },
            { text: 'Debit', value: '1' }
        ];
        this.checkingFormValidation();
    }
    GetDecrypt() {
        let UserId = this.claimesHelper.GetUserIdAPIKeyFromClaims();
        this.userservice.GetUserDetailsById(UserId).subscribe((response: any) => {
            this.Users = response['Users'];
            if (this.Users.ApiPassword != null || this.Users.ApiPassword != undefined) {
                const formData = new FormData();
                formData.append('Decrypt', this.Users.ApiPassword);
                this.commonservice.PostDecrypt(formData).subscribe({
                    next: (resepone: any) => {
                        this.Users.ApiPassword = resepone;
                    }
                });
            }
        });
    }

    get f() {
        return this.paymentForm.controls;
    }
    get h() {
        return this.cardForm.controls;
    }

    get m() {
        return this.MipaymentObjForm.controls;
    }
    checkingFormValidation() {
        if (this.paymentObj.PaymentMode == 1 || this.paymentObj.PaymentMode == null || this.paymentObj.PaymentMode == undefined) {
            this.paymentForm = this.fb.group({
                invoiceNo: new FormControl(''),
                grandTotal: new FormControl(''),
                materialAmount: new FormControl(''),
                balanceAmount: new FormControl(''),
                dueDate: new FormControl(''),
                paymentMode: new FormControl('', [Validators.required]),
                checkNo: new FormControl(''),
                amountPaid: new FormControl('', [Validators.required])
            });
        } else if (this.paymentObj.PaymentMode == 2) {
            this.paymentForm = this.fb.group({
                invoiceNo: new FormControl(),
                grandTotal: new FormControl(''),
                materialAmount: new FormControl(''),
                balanceAmount: new FormControl(''),
                dueDate: new FormControl(''),
                paymentMode: new FormControl('', [Validators.required]),
                checkNo: new FormControl('', [Validators.required]),
                amountPaid: new FormControl('', [Validators.required])
            });
        } else if (this.paymentObj.PaymentMode == 3) {
            this.paymentForm = this.fb.group({
                invoiceNo: new FormControl(''),
                grandTotal: new FormControl(''),
                materialAmount: new FormControl(''),
                balanceAmount: new FormControl(''),
                dueDate: new FormControl(''),
                paymentMode: new FormControl('', [Validators.required]),
                checkNo: new FormControl(''),
                amountPaid: new FormControl('', [Validators.required])
            });
        }
    }
    onStatusChanged() {}

    getInvoicelist() {
        this.spinner.show();
        this.invoiceService
            .GetInvoiceList(
                this.UserId,
                this.statustype,
                this.invoice,
                this.jtStartIndex,
                this.jtPageSize,
                this.jtSorting,
                this.RecordCount
            )
            .subscribe(
                (res: any) => {
                    this.spinner.hide();
                    this.dataSource.data = res;
                    this.resultLength = res[0].RecordCount;
                },
                (err: AppError) => {
                    this.spinner.hide();
                    if (err instanceof BadInputError) {
                        window.alert('Bad Request:' + err.originalError);
                    } else if (err instanceof NotFoundError) {
                        window.alert('404 Error Occured!');
                    } else {
                        window.alert('An unexpected Error Occured!');
                    }
                }
            );
    }
    paginate(event: any) {
        this.jtStartIndex = (event - 1) * this.size;
        this.jtPageSize = this.size;
        this.getInvoicelist();
    }
    pagevaluechange(event: any) {
        this.size = event;
        this.jtPageSize = this.size;
        this.getInvoicelist();
    }

    Onsearch(event) {
        this.statustype = event;
        this.getInvoicelist();
    }
    //

    GetList(invoiceId) {
        let invoiceid = 0;
        let startIndex = invoiceId;
        let pageSize = 10;
        let orderByClause = 'InvoiceId desc';
        let TotalCount = 0;
        this.Invoiceeditlist = [];

        this.invoiceService.GetInvoiceListForinvoiceId(invoiceId).subscribe((response) => {
            this.Invoiceeditlist.push(response);
            this.Fname = this.Invoiceeditlist[0].Fname;
            this.INVno = this.Invoiceeditlist[0].InvoiceNo;
            this.editInvoice.show();
        });
    }

    ConverttoPost(InvoiceId: any) {
        this.authenticationservice.GetInvoiceDetailsByInvoiceId(InvoiceId).subscribe((response) => {
            this.InvoceObj = response;
            this.InvoceObj.Listinvoiceitems = response['listinvoiceitems'];
            this.InvoceObj.Posted = 1;
            this.InvoceObj.InvoiceType = 'Invoice';
            this.InvoceObj.Memo = 'True';
            this.authenticationservice.UpdateInvoiceDetailsValue(this.InvoceObj).subscribe((resepone) => {
                if (resepone) {
                    for (let i = 0; i < this.InvoceObj.Listinvoiceitems.length; i++) {
                        this.authenticationservice.insertUpdateInvoiceitems(this.InvoceObj.Listinvoiceitems[i]).subscribe(() => {});
                    }
                    this.toastr.successToastr('invoice Updated Successfully.', 'success');
                    this.getInvoicelist();
                }
            });
        });
    }

    deletemsg(data) {
        let InvoiceIds = [];
        InvoiceIds.push(data.InvoiceID);
        let result = confirm(`You are about to delete the Invoice permanently.Are you sure you want to delete Invoice ?`);
        if (result) {
            this.authenticationservice.DeleteInvoiceIds(InvoiceIds).subscribe((response) => {
                if (response) {
                    this.toastr.successToastr('Invoice Deleted Successfully', 'success');
                    this.getInvoicelist();
                    InvoiceIds = [];
                }
            });
        }
    }

    onupdateform(event) {
        if (event) {
            this.checkingFormValidation();
            this.paymentForm.patchValue({
                invoiceNo: event.InvvoiceObj.InvoiceNo,
                grandTotal: event.InvvoiceObj.GrandTotal,
                materialAmount: event.InvvoiceObj.MaterialAmount,
                balanceAmount: event.InvvoiceObj.BalanceAmount,
                dueDate: this.formatDate(event.InvvoiceObj.DueDate),
                paymentMode: event.PaymentMode,
                checkNo: event.CheckNo,
                amountPaid: event.AmountPaid
            });
        }
    }

    formatDate(event: any) {
        const dueDate = new Date(event);
        const day = dueDate?.getDate();
        const month = dueDate?.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
        const year = dueDate?.getFullYear();
        const hours = dueDate?.getHours();
        const minutes = dueDate?.getMinutes();
        const seconds = dueDate?.getSeconds();
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    onPayment(event) {
        this.PaymentList = [];
        this.invoiceService.GetInvoiceListForinvoiceId(event.InvoiceID).subscribe((response: InvoiceDomainModel) => {
            this.InvoceObj = response;
            this.paymentObj.InvvoiceObj = this.InvoceObj;
            this.invoiceService.GellAllPaymentbyInvoiceID(event.InvoiceID).subscribe((response: PaymentsDomainModel) => {
                if (response == null) {
                    this.paymentObj.CheckNo = '';
                    this.paymentObj.PaymentMode = '1';
                    this.paymentObj.InvvoiceObj = this.InvoceObj;
                    this.PaymentList.push(this.paymentObj);
                    this.Fname = this.PaymentList[0].InvvoiceObj.Fname;
                    this.paymentObj.AmountPaid = this.paymentObj.InvvoiceObj.BalanceAmount;
                } else {
                    this.paymentObj = response;
                    this.paymentObj.InvvoiceObj = this.InvoceObj;
                    this.PaymentList.push(this.paymentObj);
                    this.Fname = this.PaymentList[0].InvvoiceObj.Fname;
                    this.paymentObj.AmountPaid = this.paymentObj.InvvoiceObj.BalanceAmount;
                }
                this.paymentmodal.show();
                this.companyservice.GetCompanyDetailsById(this.InvoceObj.CustomerID).subscribe((result: any) => {
                    this.companydetails = result;
                    this.companydetails.CompanyObj = result['CompanyObj'];
                    this.billingadrees = `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet} \n ${this.companydetails.CompanyObj.Billingcity} , ${this.companydetails.CompanyObj.BillingStateText} ,${this.companydetails.CompanyObj.Billingzip}  \n ${this.companydetails.CompanyObj.BillingCountryText}`;
                });
            });
        });
    }

    Paynow() {
        this.submitted = true;
        if (this.paymentForm.valid && (this.paymentObj.PaymentMode == 1 || this.paymentObj.PaymentMode == 2)) {
            this.paymentmodal.hide();
            this.paymentObj.CreatedBy = this.claimesHelper.GetUserIdAPIKeyFromClaims();
            this.paymentObj.CreatedDate = new Date();
            this.paymentObj.CustomerID = this.paymentObj.InvvoiceObj.CustomerID;
            this.paymentObj.InvoiceAmount = this.paymentObj.InvvoiceObj.InvoiceAmount;
            this.paymentObj.InvoiceID = this.paymentObj.InvvoiceObj.InvoiceID;
            this.paymentObj.InvoiceBalance = this.paymentObj.InvvoiceObj.BalanceAmount;
            this.paymentObj.PaymentType = this.paymentObj.PaymentMode;
            this.paymentObj.InvoiceBalance = this.paymentObj.InvoiceAmount - this.paymentObj.AmountPaid;
            //  this.paymentObj.InvoiceBalance = (this.paymentObj.InvoiceBalance > 0) ? this.paymentObj.InvoiceBalance : 0
            this.paymentObj.InvvoiceObj.BalanceAmount = this.paymentObj.InvvoiceObj.BalanceAmount - this.paymentObj.AmountPaid;
            this.authenticationservice.GetInvoiceItemforCard(this.InvoceObj.InvoiceID, this.InvoceObj.InvoiceNo).subscribe((response) => {
                this.InvoceObj.Listinvoiceitems = response;
                this.authenticationservice.InsertPaymentsDetails(this.paymentObj).subscribe((response) => {
                    var Paymentid: any[] = response.split('/');
                    var payId = Paymentid[1];
                    this.InvoceObj.PaymentObj = this.paymentObj;
                    this.InvoceObj.Paymenttype = this.paymentObj.PaymentType;
                    this.OnePointMail();
                    var QBExists = this.claimesHelper.QBExists();
                    if (QBExists == 'True') {
                        if (payId) {
                            this.QuickBookPaymentMode(payId);
                        }
                    }
                });
                this.invoiceService.UpdateSingleInvoiceBalanceAmount(this.InvoceObj).subscribe((response) => {
                    this.getInvoicelist();
                    this.paymentForm.reset();
                });
            });
        } else {
            if (this.paymentObj.PaymentMode == 2) {
                this.toastr.errorToastr('Please Enter REF#/CK#', 'error');
            } else if (this.paymentObj.PaymentMode == 3) {
                this.GetCompanyInfo(this.InvoceObj.CustomerID);
                this.paymentmodal.hide();
                this.creditcardmodal.show();
                this.submitted = false;
            } else if (this.paymentObj.PaymentMode == 4) {
                this.paymentmodal.hide();
                this.creditcardmodal.hide();
                this.achpayment.hide();
                this.submitted = false;
                this.ACHPAYMENT();
            }
        }
    }

    // onPayCreditCard() {
    //     let UserId = this.claimesHelper.GetUserIdAPIKeyFromClaims();
    //     let username = '';
    //     let password = '';
    //     let authToken = '';
    //     this.submitted = true;
    //     this.userservice.GetUserDetailsById(UserId).subscribe((response: any) => {
    //
    //         this.clientObj = response;
    //         if (this.clientObj.Users.ApiUsername != null && this.clientObj.Users.ApiPassword != null) {
    //             this.clientObj.ApiUsername = this.clientObj.Users.ApiUsername;
    //             this.clientObj.ApiPassword = this.clientObj.Users.ApiPassword;
    //             username = this.clientObj.ApiUsername;
    //             const formData = new FormData();
    //             formData.append('Decrypt', this.clientObj.ApiPassword);
    //             this.commonservice.PostDecrypt(formData).subscribe((resepone: any) => {
    //
    //                 //this.clientObj.ApiPassword = resepone
    //                 password = resepone;
    //             });
    //         } else {
    //             username = 'NoUser';
    //             password = 'NoPass';
    //         }
    //         let loginData = {
    //             UserName: username,
    //             Password: password
    //         };

    //         if (loginData.Password != '' && loginData.Password != null) {
    //             this.authenticationservice.MiPaymentBearerToken(loginData).subscribe((AuthResponse: any) => {
    //
    //                 authToken = AuthResponse;
    //                 localStorage.setItem('BillingauthToken', authToken['BearerToken']);
    //                 this.cardData.ExpirationDate = this.cardData.Month + this.cardData.Year;
    //                 this.cardData.Month = null;
    //                 this.cardData.Year = null;

    //                 if (this.cardForm.valid) {
    //                     var MipaymentObj: any = {
    //                         TransactionType: '1',
    //                         ForceDuplicate: false,
    //                         CardData: this.cardData,
    //                         InvoiceData: {
    //                             TotalAmount: this.paymentObj.AmountPaid
    //                         }
    //                     };
    //                     if (this.paymentObj.TransactionId == 1) {
    //                         MipaymentObj.TransactionType = 'Sale';
    //                     } else if (MipaymentObj.TransactionType == '2') {
    //                         MipaymentObj.TransactionType = 'Refund';
    //                     } else {
    //                         MipaymentObj.TransactionType = 'Sale';
    //                     }
    //                     if (MipaymentObj.TransactionType == 'Sale') {
    //                         (MipaymentObj.TransactionType = MipaymentObj.TransactionType),
    //                             (MipaymentObj.ForceDuplicate = MipaymentObj.ForceDuplicate),
    //                             (MipaymentObj.CardData = this.cardData),
    //                             (MipaymentObj.InvoiceData.TotalAmount = this.paymentObj.AmountPaid);
    //                     } else if (MipaymentObj.TransactionType == 'Refund') {
    //                         (MipaymentObj.TransactionType = MipaymentObj.TransactionType),
    //                             (MipaymentObj.ForceDuplicate = MipaymentObj.ForceDuplicate),
    //                             (MipaymentObj.CardData = this.cardData),
    //                             (MipaymentObj.InvoiceData.TotalAmount = this.paymentObj.AmountPaid);
    //                         MipaymentObj.OriginalTransaction = 0;
    //                     }
    //                     this.authenticationservice.MiPaymentTransactionsbcp(MipaymentObj).subscribe(
    //                         (response: any) => {
    //                             if (response.type != 0) {
    //                                 const serviceFee = parseFloat(this.InvoceObj.MiscellaneousPercent);
    //                                 const newService = serviceFee / 100;
    //                                 const ServiceTotal = this.AmountPay * newService;

    //                                 this.paymentObj.InvvoiceObj.AmountPaid = this.paymentObj.InvvoiceObj.AmountPaid - ServiceTotal;
    //                                 this.paymentObj.InvvoiceObj.BalanceAmount =
    //                                     this.paymentObj.InvvoiceObj.BalanceAmount - this.paymentObj.InvvoiceObj.AmountPaid;
    //                                 this.paymentObj.InvvoiceObj.BalanceAmount =
    //                                     this.paymentObj.InvvoiceObj.BalanceAmount >= 0 ? this.paymentObj.InvvoiceObj.BalanceAmount : 0;

    //                                 this.paymentObj.AmountPaid = this.paymentObj.AmountPaid - ServiceTotal;
    //                                 this.paymentObj.AmountPaid = +this.paymentObj.AmountPaid.toFixed(2);
    //                                 this.paymentObj.InvoiceBalance = this.paymentObj.InvoiceBalance - this.paymentObj.AmountPaid;
    //                                 this.paymentObj.InvoiceBalance =
    //                                     this.paymentObj.InvoiceBalance >= 0 ? this.paymentObj.InvoiceBalance : 0;

    //                                 if (this.paymentObj.InvvoiceObj.BalanceAmount == this.paymentObj.InvvoiceObj.GrandTotal) {
    //                                     this.paymentObj.InvvoiceObj.Paystatus = 'Unpaid';
    //                                 } else if (
    //                                     this.paymentObj.InvvoiceObj.BalanceAmount > 0 &&
    //                                     this.paymentObj.InvvoiceObj.BalanceAmount < this.paymentObj.InvvoiceObj.GrandTotal
    //                                 ) {
    //                                     this.paymentObj.InvvoiceObj.Paystatus = 'Partially Paid';
    //                                 } else if (this.paymentObj.InvvoiceObj.BalanceAmount == 0) {
    //                                     this.paymentObj.InvvoiceObj.Paystatus = 'Paid';
    //                                 }
    //                                 this.paymentObj.TransToken = response.body.Token;
    //                                 this.paymentObj.TransactionId = response['body'].TransactionId;
    //                                 this.authenticationservice
    //                                     .GetInvoiceItemforCard(this.InvoceObj.InvoiceID, this.InvoceObj.InvoiceNo)
    //                                     .subscribe((response) => {
    //                                         this.InvoceObj.Listinvoiceitems = response;
    //                                         this.authenticationservice.InsertPaymentsDetails(this.paymentObj).subscribe((response) => {
    //                                             var Paymentid: any[] = response.split('/');
    //                                             var payId = Paymentid[1];
    //                                             this.invoiceService
    //                                                 .UpdateSingleInvoiceBalanceAmount(this.InvoceObj)
    //                                                 .subscribe((response) => {
    //                                                     if (response) {
    //                                                         this.creditcardmodal.hide();
    //                                                         this.OnePointMail();
    //                                                         this.getInvoicelist();
    //                                                         var QBExists = this.claimesHelper.QBExists();
    //                                                         if (QBExists == 'True') {
    //                                                             this.QuickBookPaymentMode(payId);
    //                                                         }
    //                                                         this.toastr.successToastr(
    //                                                             `Success Transaction Successful!. TransactionID ${this.paymentObj.TransactionId}`,
    //                                                             'Success'
    //                                                         );
    //                                                         this.submitted = false;
    //                                                     }
    //                                                 });
    //                                         });
    //                                     });
    //                             }
    //                         },
    //                         (error) => {
    //                             this.creditcardmodal.hide();
    //                             this.toastr.errorToastr('Invalid Card', 'error');
    //                             console.log(error);
    //                         }
    //                     );
    //                 }
    //             });
    //         }
    //     });
    // }
    // MiPaymentBearerToken(username: any, password: any) {
    //
    //   let authToken = "";
    //   let loginData = {
    //     UserName: username,
    //     Password: '950d0cb936524686'
    //   }
    //   this.authenticationservice.MiPaymentBearerToken(loginData).subscribe((AuthResponse) => {
    //     authToken = AuthResponse
    //   })
    //   return authToken
    // }
    GetUserDetailsById() {
        let userid = this.claimesHelper.GetUserIdAPIKeyFromClaims();
        this.authenticationservice.GetUserDetailsById(userid).subscribe((response: ClientViewModel) => {
            if (response) {
                this.clientObj = response;
                this.userDetails = response.Users;
            }
        });
    }

    GetInvoiceDetails() {
        let ClientId = localStorage.getItem('ClientId');
        this.authenticationservice.GetClientDetailsById(ClientId).subscribe((data) => {
            this.model = { ...data };
            this.companylogo = this.model['CompanyLogo'];
        });
    }

    activeInActiveToggle(event, invoiceObj: InvoiceDomainModel) {
        this.marked = event;
        if (this.marked == true) {
            this.authenticationservice.GetInvoiceDetailsByInvoiceId(invoiceObj.InvoiceID).subscribe((response: InvoiceDomainModel) => {
                if (response) {
                    this.InvoceObj = response;
                    this.InvoceObj.Listinvoiceitems = response['listinvoiceitems'];
                    if (this.InvoceObj.TermsID == 1) {
                        this.InvoceObj.TermsText = 'Due Now';
                    } else if (this.InvoceObj.TermsID == 2) {
                        this.InvoceObj.TermsText = 'Net ' + 15;
                    } else if (this.InvoceObj.TermsID == 3) {
                        this.InvoceObj.TermsText = 'Net ' + 30;
                    } else if (this.InvoceObj.TermsID == 4) {
                        this.InvoceObj.TermsText = 'Net ' + 45;
                    } else if (this.InvoceObj.TermsID == 5) {
                        this.InvoceObj.TermsText = 'Net ' + 60;
                    } else if (this.InvoceObj.TermsID == 6) {
                        this.InvoceObj.TermsText = 'Net ' + 90;
                    } else {
                        this.InvoceObj.TermsText = 'Net ' + 30;
                    }
                }
            });

            this.companyservice.GetCompanyDetailsById(invoiceObj.CustomerID).subscribe((result: any) => {
                this.companydetails = result;
                this.companydetails.CompanyObj = result['CompanyObj'];
                this.billingadrees = `${this.InvoceObj.Fname}  \n ${this.companydetails.CompanyObj.BillingAddress} \n ${this.companydetails.CompanyObj.Billingstreet} \n ${this.companydetails.CompanyObj.Billingcity} , ${this.companydetails.CompanyObj.BillingStateText} ,${this.companydetails.CompanyObj.Billingzip}  \n ${this.companydetails.CompanyObj.BillingCountryText}`;
            });
        }
    }

    generatePDF() {
        if (this.marked == true) {
            let printContents, popupWin;
            printContents = this.pdftable.nativeElement.innerHTML;
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
        } else {
            this.titleforpopup = 'Select One Record Only.!';
            this.textforpopup = '';
            this.Swa1alerts('delete', this.titleforpopup, this.textforpopup);
        }
    }

    Swa1alerts(type, title, text) {
        Swal.fire({
            title: `<span style=" font-weight: normal;">${title}</span>`,
            text: text,
            backdrop: false,
            imageUrl: '',
            reverseButtons: true,
            showCancelButton: false,
            cancelButtonColor: '#ef4d4d',
            confirmButtonColor: '#448aff'
        }).then((result) => {
            if (result.value) {
            } else {
            }
        });
    }

    GetCompanyInfo(CompanyID: any) {
        this.companyservice.GetCompanyDetailsById(CompanyID).subscribe((response: CompanyDetailsViewModel) => {
            this.companydetails = response;
            for (let i = 0; i < this.companydetails.StateList.length; i++) {
                if (this.companydetails.CompanyObj.ShippingstateID == this.companydetails.StateList[i].ID) {
                    this.InvoceObj.StateName = this.companydetails.StateList[i].StateName;
                }
            }
            for (let i = 0; i < this.companydetails.CountryList.length; i++) {
                if (this.companydetails.CompanyObj.ShippingcountryID == this.companydetails.CountryList[i].CountryId) {
                    this.InvoceObj.CountryName = this.companydetails.CountryList[i].CountryName;
                }
            }
            this.paymentObj.InvvoiceObj.InvoiceID = this.InvoceObj.InvoiceID;
            this.paymentObj.InvvoiceObj.InvoiceNo = this.InvoceObj.InvoiceNo;
            this.paymentObj.InvvoiceObj.Description = this.InvoceObj.Description;
            this.paymentObj.InvvoiceObj.InvoiceAmount = this.InvoceObj.InvoiceAmount;
            this.paymentObj.InvvoiceObj.GrandTotal = this.InvoceObj.GrandTotal;
            this.paymentObj.InvvoiceObj.CustomerID = this.InvoceObj.CustomerID;
            this.paymentObj.InvvoiceObj.BalanceAmount = this.InvoceObj.BalanceAmount;
            this.paymentObj.InvvoiceObj.AmountPaid = this.InvoceObj.BalanceAmount;
            this.paymentObj.InvvoiceObj.TaxAmount = this.InvoceObj.TaxAmount;
            this.paymentObj.InvvoiceObj.CreatedDate = this.InvoceObj.CreatedDate;
            this.paymentObj.InvvoiceObj.RecursDate = this.InvoceObj.RecursDate;
            this.companydetails.CompanyObj.Name = this.companydetails.CompanyObj.Name;
            this.paymentObj.Address1 = this.companydetails.CompanyObj.BillingAddress;
            this.paymentObj.Address2 = this.companydetails.CompanyObj.Shippingcity;
            this.paymentObj.Phone = this.companydetails.CompanyObj.Phone;
            this.companydetails.CompanyObj.Email = this.companydetails.CompanyObj.Email;
            this.paymentObj.Email = this.companydetails.CompanyObj.Email;
            this.paymentObj.AmountPaid = this.InvoceObj.Total;
            this.paymentObj.InvvoiceObj.MaterialAmount = this.paymentObj.InvvoiceObj.MaterialAmount;
            this.paymentObj.InvvoiceObj.ServiceAmt = this.InvoceObj.ServiceAmt;
            this.paymentObj.InvvoiceObj.MiscellaneousAmount = this.InvoceObj.MiscellaneousAmount;
            //  this.paymentObj.AmountPaid = this.paymentObj.AmountPaid + this.InvoceObj.MiscellaneousAmount
            this.paymentObj.InvvoiceObj.MiscellaneousPercent = this.InvoceObj.MiscellaneousPercent;
            this.paymentObj.PaymentType = 3;
            if (this.paymentObj.PaymentMode === '3') {
                this.paymentObj.AmountPaid = this.paymentObj.AmountPaid;
                const serviceFee = parseFloat(this.InvoceObj.MiscellaneousPercent);
                if (serviceFee > 0) {
                    const newService = serviceFee / 100;
                    this.AmountPay = this.amountpaidvalue.nativeElement.value;
                    const ServiceTotal = parseFloat(this.amountpaidvalue.nativeElement.value) * newService;
                    const roundedMis = (Math.round(ServiceTotal * 100) / 100).toFixed(2);
                    const TotalPaidAmt = parseFloat(this.amountpaidvalue.nativeElement.value) + parseFloat(roundedMis);
                    const TotalAmount: any = isNaN(TotalPaidAmt) ? 0 : TotalPaidAmt;
                    const amtPaid = parseFloat(TotalAmount).toFixed(2);
                    this.paymentObj.AmountPaid = amtPaid;
                    this.paymentObj.InvvoiceObj.AmountPaid = amtPaid;
                    this.paymentObj.CreatedBy = this.claimesHelper.GetUserIdAPIKeyFromClaims();
                    this.paymentObj.CreatedDate = new Date();
                    this.paymentObj.CustomerID = this.paymentObj.InvvoiceObj.CustomerID;
                    // this.paymentObj.AmountPaid = this.amountpaidvalue.nativeElement.value
                    // this.paymentObj.Email = this.paymentObj.InvvoiceObj.Email
                    this.paymentObj.InvoiceAmount = this.paymentObj.InvvoiceObj.InvoiceAmount;
                    this.paymentObj.InvoiceID = this.paymentObj.InvvoiceObj.InvoiceID;
                    this.paymentObj.InvoiceBalance = this.paymentObj.InvvoiceObj.BalanceAmount;
                } else {
                    this.paymentObj.AmountPaid = (Math.round(this.paymentObj.AmountPaid * 100) / 100).toFixed(2);
                }
            } else {
                this.paymentObj.AmountPaid = (Math.round(this.paymentObj.AmountPaid * 100) / 100).toFixed(2);
            }
        });
    }

    OnePointMail() {
        this.MailingInfolist.EmailAPIKey = this.claimesHelper.GetEmailAPIKeyFromClaims();
        this.MailingInfolist.EmailAPILink = this.claimesHelper.GetEmailapilinkFromClaims();
        this.MailingInfolist.FromName = 'Digital55';
        this.MailingInfolist.FromAddress = 'noreply@piltd.com';
        this.MailingInfolist.ReplytoAddress = 'noreply@piltd.com';
        this.MailingInfolist.Subject = 'Payments Details.';
        this.MailingInfolist.AssignedCampaign = '';
        this.MailingInfolist.Recipients = this.companydetails['CompanyObj']?.Email;
        this.MailingInfolist.BccEmails = this.InvoceObj.Email == '0' ? '' : this.InvoceObj.Email;
        this.MailingInfolist.EnableTracking = '1';
        this.MailingInfolist.VMTAName = '';
        this.MailingInfolist.Tokens = '';
        this.MailingInfolist.ContactXMLData = '';
        this.MailingInfolist.Template = this.pdftable.nativeElement.innerHTML;
        var CompaignObj;

        this.invoiceService.EstmateInvoiceOnePointMail(this.MailingInfolist).subscribe((CompaignObj: any) => {
            CompaignObj = JSON.parse(CompaignObj);
            this.InvoceObj.CompaignID = CompaignObj['Data'].CampaignId;
            this.InvoceObj.pointmailStatus = CompaignObj['status'];
            this.invoiceService.UpdateSingleInvoiceBalanceAmount(this.InvoceObj).subscribe((response: any) => {
                this.toastr.successToastr('Mail sent successfully', 'success');
            });
        });
    }
    Tearms() {
        if (this.InvoceObj.TermsID == 1) {
            this.InvoceObj.TermsText = 'Due Now';
        } else if (this.InvoceObj.TermsID == 2) {
            this.InvoceObj.TermsText = 'Net ' + 15;
        } else if (this.InvoceObj.TermsID == 3) {
            this.InvoceObj.TermsText = 'Net ' + 30;
        } else if (this.InvoceObj.TermsID == 4) {
            this.InvoceObj.TermsText = 'Net ' + 45;
        } else if (this.InvoceObj.TermsID == 5) {
            this.InvoceObj.TermsText = 'Net ' + 60;
        } else if (this.InvoceObj.TermsID == 6) {
            this.InvoceObj.TermsText = 'Net ' + 90;
        } else {
            this.InvoceObj.TermsText = 'Net ' + 30;
        }
    }

    async QuickBookPaymentMode(payId: any) {
        var QuickBookObj: any = {};
        var modal: any = {
            QBRealmID: localStorage.getItem('realmId'),
            QBBearerToken:await this.getAccessToken()// localStorage.getItem('QBAccessToken')
        };
        var UserID = this.claimesHelper.GetUserIdAPIKeyFromClaims();
        if (UserID == 1) {
            let ClientName = localStorage.getItem('ClientId');
            this.commonservice.GetQBLoginIncomeAcct(UserID, ClientName).subscribe((resepone: ClientViewModel) => {
                this.clientObj = resepone;
            });
        } else {
            let ClientName = localStorage.getItem('ClientId');
            this.invoiceService.GetQBLoginUserAcct(UserID, ClientName).subscribe((resepone: ClientViewModel) => {
                this.clientObj = resepone;
            });
        }
        if (this.clientObj != null) {
            this.invoiceService.InvoiceQuickBooksList(modal).subscribe((response: any) => {
                let newAcctList = JSON.parse(response.Result);
                if (newAcctList['fault'] != undefined) {
                    this.toastr.errorToastr(`${newAcctList['fault'].error[0].message}`, 'error');
                } else {
                    newAcctList = newAcctList['QueryResponse'].Account;
                    if (this.clientObj.ReceivableAcctNum != null) {
                        var receivableAccount = newAcctList.filter(
                            (x) => x.AcctNum == this.clientObj.ReceivableAcctNum && x.SubAccount == false
                        );
                        if (receivableAccount.length != 0) {
                            this.clientObj.QBAcctReceivable = receivableAccount[0].Name;
                            QuickBookObj.QBAcctRcvID = receivableAccount[0].Id;
                        }
                    } else {
                        var receivableAccount = newAcctList.filter(
                            (x) => x.Name == this.clientObj.QBAcctReceivable && x.SubAccount == false
                        );
                        if (receivableAccount.length != 0) {
                            QuickBookObj.QBAcctRcvID = receivableAccount[0].Id;
                        }
                    }
                    if (this.clientObj.BankAcctNum != null) {
                        var BankAccount = newAcctList.filter((x) => x.AcctNum == this.clientObj.BankAcctNum && x.SubAccount == false);
                        if (BankAccount.length != 0) {
                            this.clientObj.QBBankAccnt = BankAccount[0].Name;
                            QuickBookObj.QBBankAcctID = BankAccount[0].Id;
                        }
                    } else {
                        var BankAccount = newAcctList.filter((x) => x.Name == this.clientObj.QBBankAccnt && x.SubAccount == false);
                        if (BankAccount.length != 0) {
                            QuickBookObj.QBBankAcctID = BankAccount[0].Id;
                        }
                    }
                    if (this.clientObj.SalesTaxAcctNum != null) {
                        var salesTaxAccount = newAcctList.filter(
                            (x) => x.AcctNum == this.clientObj.SalesTaxAcctNum && x.SubAccount == false
                        );
                        if (salesTaxAccount.length != 0) {
                            this.clientObj.QBSaleTaxAcct = salesTaxAccount[0].Name;
                            QuickBookObj.QBSaleTaxID = salesTaxAccount[0].Id;
                        }
                    } else {
                        var salesTaxAccount = newAcctList.filter((x) => x.Name == this.clientObj.QBSaleTaxAcct && x.SubAccount == false);
                        if (salesTaxAccount.length != 0) {
                            QuickBookObj.QBSaleTaxID = salesTaxAccount[0].Id;
                        }
                    }
                    this.InvoceObj.TaxPercent = this.InvoceObj.TaxPercent == null ? 0 : this.InvoceObj.TaxPercent;
                    this.InvoceObj.DiscountPercent = this.InvoceObj.DiscountPercent == null ? 0 : this.InvoceObj.DiscountPercent;
                    this.InvoceObj.TaxPercent = parseFloat(this.InvoceObj.TaxPercent);
                    // Calculate ActualPaid
                    const ActualPaid = this.InvoceObj.TaxPercent / 100;
                    // Calculate ActualPaidAmt, rounding to 2 decimal places
                    const ActualPaidAmt = (this.InvoceObj.Total * ActualPaid).toFixed(2);
                    // Calculate SubPaidAmt
                    const SubPaidAmt = this.InvoceObj.Total - parseFloat(ActualPaidAmt);

                    if (this.InvoceObj.TaxPercent > 0) {
                        var AccountCreditRefObj: IncomeAccountsRefViewModel = {
                            value: QuickBookObj.QBAcctRcvID,
                            name: this.clientObj.QBAcctReceivable
                        };
                        var AcctDebitRefObj: IncomeAccountsRefViewModel = {
                            value: QuickBookObj.QBBankAcctID,
                            name: this.clientObj.QBBankAccnt
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
                            Description: 'new payment by cash/check ' + this.InvoceObj.InvoiceNo,
                            Amount: this.InvoceObj.Total,
                            DetailType: 'JournalEntryLineDetail',
                            JournalEntryLineDetail: {
                                PostingType: 'Debit',
                                AccountRef: AcctDebitRefObj
                            }
                        };
                        var LineItemCredit: QuickbookJournalLineItemViewModel = {
                            Description: 'new payment by cash/check ' + this.InvoceObj.InvoiceNo,
                            Amount: this.InvoceObj.Total,
                            DetailType: 'JournalEntryLineDetail',
                            JournalEntryLineDetail: {
                                PostingType: 'Credit',
                                AccountRef: AccountCreditRefObj,
                                Entity: Entityobj
                            }
                        };
                        this.JournalList.push(LineItemDebit);
                        this.JournalList.push(LineItemCredit);
                    } else {
                        var AccountCreditRefObj: IncomeAccountsRefViewModel = {
                            value: QuickBookObj.QBAcctRcvID,
                            name: this.clientObj.QBAcctReceivable
                        };
                        var AcctCreditTaxRefObj: IncomeAccountsRefViewModel = {
                            value: QuickBookObj.QBSaleTaxID,
                            name: this.clientObj.QBSaleTaxAcct
                        };
                        var AcctDebitRefObj: IncomeAccountsRefViewModel = {
                            value: QuickBookObj.QBBankAcctID,
                            name: this.clientObj.QBBankAccnt
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
                            Description: 'new payment by cash/check ' + this.InvoceObj.InvoiceNo,
                            Amount: this.InvoceObj.Total,
                            DetailType: 'JournalEntryLineDetail',
                            JournalEntryLineDetail: {
                                PostingType: 'Debit',
                                AccountRef: AcctDebitRefObj
                            }
                        };
                        var LineItemCreditTax: QuickbookJournalLineItemViewModel = {
                            Description: 'new payment by cash/check ' + this.InvoceObj.InvoiceNo,
                            Amount: this.InvoceObj.TaxPercent,
                            DetailType: 'JournalEntryLineDetail',
                            JournalEntryLineDetail: {
                                PostingType: 'Credit',
                                AccountRef: AcctCreditTaxRefObj
                            }
                        };

                        var LineItemCredit: QuickbookJournalLineItemViewModel = {
                            Description: 'new payment by cash/check ' + this.InvoceObj.InvoiceNo,
                            Amount: this.InvoceObj.Total,
                            DetailType: 'JournalEntryLineDetail',
                            JournalEntryLineDetail: {
                                PostingType: 'Credit',
                                AccountRef: AccountCreditRefObj,
                                Entity: Entityobj
                            }
                        };
                        this.JournalList.push(LineItemDebit);
                        //this.JournalList.push(LineItemCreditTax);
                        this.JournalList.push(LineItemCredit);
                        var NewJEData: QBJournalEntryViewModel = {
                            DocNumber: this.InvoceObj.InvoiceNo,
                            Line: this.JournalList,
                            QBRealmID: localStorage.getItem('realmId'),
                            QBBearerToken: localStorage.getItem('QBAccessToken')
                        };
                        this.invoiceService.InsertQuickBooksInvoice(NewJEData).subscribe((ResponseData: any) => {
                            var ResponseData = JSON.parse(ResponseData);
                            this.InvoceObj.Id = ResponseData['JournalEntry'].Id;
                            this.InvoceObj.InvoiceID = this.InvoceObj.InvoiceID;
                            this.InvoceObj.QBCustID = this.InvoceObj.QBCustID;
                            this.InvoceObj.QBRefreshToken = this.InvoceObj.QBRefreshToken;
                            this.invoiceService.CRM_UpdatePaymentbyID(payId, this.InvoceObj.Id).subscribe((response: any) => {
                                if (response) {
                                    this.invoiceService.UpdateSingleInvoiceBalanceAmount(this.InvoceObj).subscribe((response: any) => {
                                        if (response) {
                                            this.toastr.successToastr('Payment created successfully', 'success');
                                        }
                                    });
                                }
                            });
                        });
                    }
                }
            });
        }
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
                jsonClientModel = await this.commonservice.GetQBLoginIncomeAcct(userid, clientId).toPromise();
            } else {
                jsonClientModel = await this.invoiceService.GetQBLoginUserAcct(userid, clientId).toPromise();
            }
            ObjQBClientDetail = jsonClientModel;
            if (jsonClientModel.IsCorporate == true) {
                if (ObjQBClientDetail.QBClientID != null && ObjQBClientDetail.QBSecretID != null) {
                    let formData1 = new FormData();
                    formData1.append('Decrypt', ObjQBClientDetail.QBSecretID);
                    let QBSecretID: any = await this.commonservice.PostDecrypt(formData1).toPromise();
                    ObjQBClientDetail.QBSecretID = QBSecretID;
                    let Refresh_token = this._cookieService.get('Refresh_token');

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
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; optherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
    }

    ACHPAYMENT() {
        let QBInvId = 0;
        var Mailsent = false;
        this.ComViewModel = new PaymentViewModel();
        this.ComViewModel.MipaymentObj.AccountType = '0';
        this.ComViewModel.MipaymentObj.TransactionType = '0';
        let CompanyID = 0;
        this.invoiceService.GetInvoiceListForinvoiceId(this.InvoceObj.InvoiceID).subscribe((InvoiceListvm: any) => {
            QBInvId = InvoiceListvm.QBInvID;
            this.InvoceObj.CompaignID = InvoiceListvm.CompaignID;
            this.InvoceObj.pointmailStatus = InvoiceListvm.pointmailStatus;

            if (QBInvId > 0) {
                this.InvoceObj.QBInvID = QBInvId;
            }
            this.InvoceObj.Paymenttype = this.paymentObj.PaymentMode;
            if (this.InvoceObj.Paymenttype == '3' || this.InvoceObj.Paymenttype == '4') {
                CompanyID = this.InvoceObj.CustomerID;

                let CompanyDetailsObj = new CompanyDetailsViewModel();
                this.companyservice.GetCompanyDetailsById(CompanyID).subscribe((response: CompanyViewModel) => {
                    this.ComViewModel.CompanyObj = response;
                    if (this.ComViewModel.CompanyObj.Name != null && this.ComViewModel.CompanyObj.Name != '') {
                        this.ComViewModel.CompanyObj.Name = this.ComViewModel.CompanyObj.Name.replace('*', "'");
                    } else {
                        this.ComViewModel.CompanyObj.Name = 'No Company';
                    }
                    this.companyservice.GetCompanyDetailsById(CompanyID).subscribe((reseponeCompanyDetailsObj: CompanyDetailsViewModel) => {
                        CompanyDetailsObj = reseponeCompanyDetailsObj;

                        for (let i = 0; i < CompanyDetailsObj.StateList.length; i++) {
                            if (this.ComViewModel.CompanyObj.ShippingstateID == CompanyDetailsObj.StateList[i].ID) {
                                this.ComViewModel.StateName = CompanyDetailsObj.StateList[i].StateName;
                            }
                        }
                        for (let i = 0; i < CompanyDetailsObj.CountryList.length; i++) {
                            if (this.ComViewModel.CompanyObj.ShippingcountryID == CompanyDetailsObj.CountryList[i].CountryId) {
                                this.ComViewModel.CountryName = CompanyDetailsObj.CountryList[i].CountryName;
                            }
                        }

                        let RoleName = this.claimesHelper.GetRoleNameAPIKeyFromClaims(); // RoleMenuAccess.GetRoleName();
                        this.ComViewModel.InvvoiceObj.RoleName = RoleName;
                        this.ComViewModel.InvvoiceObj.InvoiceID = InvoiceListvm.InvoiceID;
                        this.ComViewModel.InvvoiceObj.InvoiceNo = InvoiceListvm.InvoiceNo;
                        this.ComViewModel.InvvoiceObj.Description = InvoiceListvm.Description;
                        this.ComViewModel.InvvoiceObj.InvoiceAmount = InvoiceListvm.InvoiceAmount;
                        this.ComViewModel.InvvoiceObj.GrandTotal = InvoiceListvm.GrandTotal;
                        this.ComViewModel.InvvoiceObj.CustomerID = InvoiceListvm.CustomerID;
                        this.ComViewModel.InvvoiceObj.BalanceAmount = InvoiceListvm.BalanceAmount;
                        this.ComViewModel.InvvoiceObj.AmountPaid = InvoiceListvm.BalanceAmount;
                        this.ComViewModel.InvvoiceObj.TaxAmount = InvoiceListvm.TaxAmount;
                        this.ComViewModel.InvvoiceObj.CreatedDate = InvoiceListvm.CreatedDate;
                        this.ComViewModel.InvvoiceObj.RecursDate = InvoiceListvm.RecursDate;
                        this.ComViewModel.CompanyObj.Name = this.ComViewModel.CompanyObj.Name;
                        this.ComViewModel.Address1 = this.ComViewModel.CompanyObj.BillingAddress;
                        this.ComViewModel.Address2 = this.ComViewModel.CompanyObj.Shippingcity;
                        this.ComViewModel.Phone = this.ComViewModel.CompanyObj.Phone;
                        this.ComViewModel.CompanyObj.Email = this.ComViewModel.CompanyObj.Email;
                        this.ComViewModel.AmountPaid = this.InvoceObj.Total;
                        this.ComViewModel.InvvoiceObj.MaterialAmount = this.ComViewModel.InvvoiceObj.MaterialAmount;
                        this.ComViewModel.InvvoiceObj.ServiceAmt = this.InvoceObj.ServiceAmt;

                        //ComViewModel.Amount = (decimal)INVModelObj.ServiceAmt;
                        this.ComViewModel.InvvoiceObj.MiscellaneousAmount = InvoiceListvm.MiscellaneousAmount;
                        this.ComViewModel.InvvoiceObj.MiscellaneousPercent = InvoiceListvm.MiscellaneousPercent;
                        this.ComViewModel.PaymentType = 3;
                        if (this.InvoceObj.Paymenttype == '3') {
                            // return View('CreatePaymentMethod', ComViewModel);
                        } else if (this.InvoceObj.Paymenttype == '4') {
                            this.ComViewModel.PaymentType = 4;
                            this.ComViewModel.AmountPaid = this.paymentObj.AmountPaid;
                            this.achpayment.show();

                            // return PartialView('_ACHPayments', ComViewModel);
                        }
                        //return View('PaymentsIndex');
                    });
                });
            }
        });
    }
    ACHPaymentPost(paymentObj: PaymentViewModel) {
        this.spinner.show();

        this.submitted = true;
        if (this.MipaymentObjForm.valid) {
            let authToken = '';
            let results = '';
            let msg = '';
            let UserId = '1';
            let Mailsent = false;
            var MipaymentObj: MiPaymentTransactionViewModel = new MiPaymentTransactionViewModel();
            var userModel: ClientViewModel = new ClientViewModel();
            this.userservice.GetUserInfoByUserID(UserId).subscribe(async (response: ClientViewModel) => {
                userModel = response;
                paymentObj.InvvoiceObj.ClienUserObj = userModel;
                let username = '';
                let password = '';
                if (userModel.Users.ApiUsername != null && userModel.Users.ApiPassword != null) {
                    paymentObj.InvvoiceObj.ClienUserObj.ApiUsername = userModel.Users.ApiUsername;
                    paymentObj.InvvoiceObj.ClienUserObj.ApiPassword = await this.decryptApiPassword(userModel.Users.ApiPassword);
                    username = paymentObj.InvvoiceObj.ClienUserObj.ApiUsername;
                    password = paymentObj.InvvoiceObj.ClienUserObj.ApiPassword;
                } else {
                    username = 'NoUser';
                    password = 'NoPass';
                }
                let loginData = {
                    UserName: username,
                    Password: password
                };
                this.commonservice.MiPaymentauthenticate(loginData).subscribe((AuthResponse: any) => {
                    authToken = AuthResponse;
                    localStorage.setItem('BillingauthToken', authToken['BearerToken']);
                    if (paymentObj.MipaymentObj.AccountType == '1') {
                        paymentObj.MipaymentObj.AccountType = 'Personal Checking';
                    } else if (paymentObj.MipaymentObj.AccountType == '2') {
                        paymentObj.MipaymentObj.AccountType = 'Personal Savings';
                    } else if (paymentObj.MipaymentObj.AccountType == '3') {
                        paymentObj.MipaymentObj.AccountType = 'Business Checking';
                    } else if (paymentObj.MipaymentObj.AccountType == '4') {
                        paymentObj.MipaymentObj.AccountType = 'Business Saving';
                    }

                    const CheckedData: CheckViewModel = {
                        NameOnCheck: paymentObj.MipaymentObj.NameOnCheck,
                        CheckNumber: paymentObj.MipaymentObj.CheckNumber,
                        RoutingNumber: paymentObj.MipaymentObj.RoutingNumber,
                        AccountNumber: paymentObj.MipaymentObj.AccountNumber,
                        AccountType: paymentObj.MipaymentObj.AccountType // Assuming this is a string
                    };

                    const InvoiceData: PaymentInvoice = {
                        TotalAmount: paymentObj.AmountPaid as number,
                        InvoiceNumber: paymentObj.InvvoiceObj.InvoiceNo
                    };
                    if (paymentObj.MipaymentObj.TransactionType == '1') {
                        paymentObj.MipaymentObj.TransactionType = 'Debit';
                    }
                    const MiACHpayObj = {
                        TransactionType: paymentObj.MipaymentObj.TransactionType,
                        CheckData: CheckedData, // Assuming CheckedData is defined somewhere
                        SECCode: paymentObj.MipaymentObj.SECCode,
                        InvoiceData: InvoiceData // Assuming InvoiceData is defined somewhere
                    };
                    const jsondata = JSON.stringify(MiACHpayObj);
                    this.commonservice.MiPaymentECP(jsondata).subscribe((MiPaymentECP: any) => {
                        if (MiPaymentECP['type'] != 0) {
                            if (MiPaymentECP['status'] === 201) {
                                let paymentResponse: MiPaymentTransactionResponseViewModel = MiPaymentECP['body'];
                                if (paymentResponse.ResponseMessage === 'Approved') {
                                    sessionStorage.setItem('CreateACHPayment', 'CreateACHPayment');
                                    sessionStorage.setItem('TranID', paymentResponse.TransactionId as any);
                                    paymentObj.InvvoiceObj.ServiceAmt = paymentObj.AmountPaid;
                                    let BalanceAmt = paymentObj.InvvoiceObj.BalanceAmount;
                                    let PaidAmt = paymentObj.InvvoiceObj.ServiceAmt;
                                    let AmountPaid = BalanceAmt - PaidAmt;
                                    let FAmt = AmountPaid < 0 ? 0 : AmountPaid;
                                    paymentObj.AmountPaid = paymentObj.InvvoiceObj.ServiceAmt;
                                    paymentObj.InvoiceBalance = AmountPaid as number; // Assuming it's safe to cast
                                    paymentObj.InvvoiceObj.BalanceAmount = paymentObj.InvoiceBalance;
                                    paymentObj.InvvoiceObj.LaborAmount = paymentObj.InvoiceBalance;
                                    paymentObj.CustomerID = paymentObj.InvvoiceObj.CustomerID;
                                    paymentObj.FirstName = paymentObj.CompanyObj.Name;
                                    paymentObj.LastName = paymentObj.CompanyObj.LName;
                                    paymentObj.Address1 = paymentObj.CompanyObj.BillingAddress;
                                    paymentObj.Address2 = paymentObj.CompanyObj.Shippingcity;
                                    paymentObj.Phone = paymentObj.CompanyObj.Phone;
                                    paymentObj.InvoiceID = paymentObj.InvvoiceObj.InvoiceID;

                                    paymentObj.InvvoiceObj.InvoiceNo = paymentObj.InvvoiceObj.InvoiceNo;
                                    paymentObj.InvoiceAmount = paymentObj.InvvoiceObj.GrandTotal;
                                    paymentObj.InvvoiceObj.BalanceAmount = paymentObj.InvvoiceObj.BalanceAmount as number; // Assuming it's safe to cast
                                    paymentObj.PaymentType = 4;
                                    paymentObj.PaymentsObj.TransactionId = paymentResponse.TransactionId;
                                    paymentObj.TransactionId = paymentResponse.TransactionId;
                                    paymentObj.TransToken = paymentResponse.Token;
                                    paymentObj.Email = paymentObj.Email;
                                    //  paymentObj.InvoiceBalance = paymentObj.InvoiceAmount - paymentObj.AmountPaid;
                                    // Payment status update
                                    if (paymentObj.InvoiceBalance === paymentObj.InvvoiceObj.GrandTotal) {
                                        paymentObj.InvvoiceObj.Paystatus = 'Unpaid';
                                    } else if (
                                        paymentObj.InvoiceBalance > 0 &&
                                        paymentObj.InvoiceBalance < paymentObj.InvvoiceObj.GrandTotal
                                    ) {
                                        paymentObj.InvvoiceObj.Paystatus = 'Partially Paid';
                                    } else if (paymentObj.InvoiceBalance === 0) {
                                        paymentObj.InvvoiceObj.Paystatus = 'Paid';
                                    }
                                    this.invoiceService.InsertPaymentsDetails(paymentObj).subscribe((resepone) => {
                                        if (resepone != null) {
                                            this.invoiceService
                                                .UpdateSingleInvoiceBalanceAmount(paymentObj.InvvoiceObj)
                                                .subscribe((resepone) => {
                                                    if (resepone) {
                                                        this.achpayment.hide();
                                                        this.spinner.hide();
                                                        this.toastr.successToastr(
                                                            `Success Transaction Successful!. TransactionID ${paymentObj.TransactionId}`,
                                                            'Success'
                                                        );
                                                        this.submitted = false;
                                                        this.getInvoicelist();
                                                    }
                                                });
                                        }
                                    });
                                    // HTTP requests and other operations
                                } else {
                                    this.spinner.hide();
                                    this.toastr.errorToastr(`Non-approved response ${paymentResponse.ResultText}`, 'error');
                                }
                            }
                        }
                    });
                });
            });
        } else {
            this.spinner.hide();
            this.toastr.errorToastr('Please Enter the Required Fields', 'error');
        }
    }

    decryptApiPassword(ApiPassword): Promise<any> {
        const formData = new FormData();
        formData.append('Decrypt', ApiPassword);

        return new Promise((resolve, reject) => {
            this.commonservice.PostDecrypt(formData).subscribe({
                next: (response: any) => {
                    resolve(response);
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });
    }

    onPayCreditCard() {
        let UserId = this.claimesHelper.GetUserIdAPIKeyFromClaims();
        this.submitted = true;

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

            this.cardData.ExpirationDate = this.cardData.Month + this.cardData.Year;
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

                this.authenticationservice.MiPaymentTransactionsbcp(MipaymentObj).subscribe(
                    (response: any) => {
                        if (response.type != 0) {
                            this.processSuccessfulTransaction(response);
                        }
                    },
                    (error) => {
                        this.creditcardmodal.hide();
                        this.toastr.errorToastr('Invalid Card', 'error');
                        console.log(error);
                    }
                );
            }
        });
    }

    processSuccessfulTransaction(response: any) {
        const serviceFee = parseFloat(this.InvoceObj.MiscellaneousPercent);
        const newService = serviceFee / 100;
        const ServiceTotal = this.AmountPay * newService;

        this.paymentObj.InvvoiceObj.AmountPaid -= ServiceTotal;
        this.paymentObj.InvvoiceObj.BalanceAmount -= this.paymentObj.InvvoiceObj.AmountPaid;
        this.paymentObj.InvvoiceObj.BalanceAmount = Math.max(this.paymentObj.InvvoiceObj.BalanceAmount, 0);
        this.paymentObj.AmountPaid -= ServiceTotal;
        this.paymentObj.AmountPaid = +this.paymentObj.AmountPaid.toFixed(2);
        this.paymentObj.InvoiceBalance -= this.paymentObj.AmountPaid;
        this.paymentObj.InvoiceBalance = Math.max(this.paymentObj.InvoiceBalance, 0);

        if (this.paymentObj.InvvoiceObj.BalanceAmount == this.paymentObj.InvvoiceObj.GrandTotal) {
            this.paymentObj.InvvoiceObj.Paystatus = 'Unpaid';
        } else if (
            this.paymentObj.InvvoiceObj.BalanceAmount > 0 &&
            this.paymentObj.InvvoiceObj.BalanceAmount < this.paymentObj.InvvoiceObj.GrandTotal
        ) {
            this.paymentObj.InvvoiceObj.Paystatus = 'Partially Paid';
        } else if (this.paymentObj.InvvoiceObj.BalanceAmount == 0) {
            this.paymentObj.InvvoiceObj.Paystatus = 'Paid';
        }

        this.paymentObj.TransToken = response.body.Token;
        this.paymentObj.TransactionId = response.body.TransactionId;

        this.authenticationservice
            .GetInvoiceItemforCard(this.InvoceObj.InvoiceID, this.InvoceObj.InvoiceNo)
            .subscribe((invoiceResponse) => {
                this.InvoceObj.Listinvoiceitems = invoiceResponse;
                this.authenticationservice.InsertPaymentsDetails(this.paymentObj).subscribe((insertResponse) => {
                    const payId = insertResponse.split('/')[1];
                    this.invoiceService.UpdateSingleInvoiceBalanceAmount(this.InvoceObj).subscribe((updateResponse) => {
                        if (updateResponse) {
                            this.creditcardmodal.hide();
                            this.OnePointMail();
                            this.getInvoicelist();

                            if (this.claimesHelper.QBExists() == 'True') {
                                this.QuickBookPaymentMode(payId);
                            }

                            this.toastr.successToastr(
                                `Success Transaction Successful!. TransactionID ${this.paymentObj.TransactionId}`,
                                'Success'
                            );
                            this.submitted = false;
                        }
                    });
                });
            });
    }
}
export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];
