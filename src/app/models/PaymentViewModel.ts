import { CardViewModel } from './ICardViewModel';
import { CompanyDetailsViewModel, CompanyViewModel } from './ICompanyDetailsViewModel';
import { InvoiceDomainModel, InvoiceItemDomainModel } from './IInvoiceDomainModel';
import { PaymentsDomainModel } from './IPaymentsDomainModel';

export class PaymentViewModel {
    constructor() {
        this.InvvoiceObj = new InvoiceDomainModel();
        this.CompanyObj = new CompanyViewModel();
        this.InvoiceItemObj = new Array<InvoiceItemDomainModel>();
        this.CompanyDetailObj = new CompanyDetailsViewModel();
        this.CardPaymentObj = new CardPaymentViewModel();
        this.MipaymentObj = new MiPaymentTransactionViewModel();
        this.MiPaymentResponseObj = new MiPaymentTransactionResponseViewModel();
        this.PaymentsObj = new PaymentsDomainModel();
    }

    FirstName: string;
    LastName: string;
    Address1: string;
    Address2: string;
    Postcode: string;
    Phone: string;
    Amount: number;
    CardNumber: string;
    CardCode: string;
    Month: string;
    Year: string;
    Email: string;
    InvoiceBalance: number;
    InvID: number;
    InvvoiceObj: InvoiceDomainModel;
    CompanyObj: CompanyViewModel;
    InvoiceItemObj: Array<InvoiceItemDomainModel>;
    CompanyDetailObj: CompanyDetailsViewModel;
    CardPaymentObj: CardPaymentViewModel;
    MipaymentObj: MiPaymentTransactionViewModel;
    MiPaymentResponseObj: MiPaymentTransactionResponseViewModel;
    PaymentsObj: PaymentsDomainModel;
    InvoiceAmount?: number;
    CustomerID?: number;
    PaymentType: number;
    AmountPaid?: number;
    InvoiceID?: number;
    CountryName: string;
    StateName: string;
    customerAddressId: string;
    TransactionId: number;
    TransToken: string;
    Subscription: boolean;
    CustomerName: string;
    BearerToken: string;
    Total: string;
    TokenFormat: string;
    ExpirationDate: string;
    NameOnCard: string;
}

export class TransactionResponse {
    resultCode: any;
    transId: string;
    responseCode: string;
    messageCode: string;
    authCode: string;
    description: string;
    errorCode: string;
    errorText: string;
    paymentmethod: string;
    transactType: string;
    arbCustomerProfileID: string;
    Invoiceno: string;
    CustomerID?: number;
}

// You will also need to define the other classes/interfaces used in PaymentViewModel

export class CardPaymentViewModel {
    ID: number;
    PaymentID: number;
    PaymentMethod: string;
    TransactType: string;
    PaymentResponse: string;
    AuthCode: string;
    TransactionID: number;
    refresh_token: string;
    access_token: string;
    code: string;
}

export class MiPaymentTransactionViewModel {
    constructor() {
      this.InvoiceData = new PaymentInvoice();
      this.CardData = new CardViewModel();
      this.MiPaymentResponseObj = new MiPaymentTransactionResponseViewModel();
      this.OriginalTransaction = new OriginalTransactionViewModel();
      this.CheckData = new CheckViewModel();
    }
  
    TransactionType: string;
    RecurringBilling: boolean;
    ForceDuplicate: boolean;
    CardData: CardViewModel;
    InvoiceData: PaymentInvoice;
    CustomerId: string;
    CustomerName: string;
    FirstName: string;
    LastName: string;
    Postcode: string;
    Phone: string;
    Email: string;
    BillingAddress: string;
    ShippingCity: string;
    CountryName: string;
    UserName: string;
    Password: string;
    CardNumber: string;
    ExpirationDate: string;
    NameOnCard: string;
    MerchantKey: number;
    TokenFormat: string;
    NameOnCheck: string;
    CheckNumber: string;
    RoutingNumber: string;
    AccountNumber: string;
    SECCode: string;
    CustomerKey: number;
    AccountType: string;
    MiPaymentResponseObj: MiPaymentTransactionResponseViewModel;
    OriginalTransaction: OriginalTransactionViewModel;
    CheckData: CheckViewModel;
  }
export class CheckViewModel {
    NameOnCheck: string;
    RoutingNumber: string;
    AccountNumber: string;
    CheckNumber: string;
    AccountType: string;

    constructor() {
        this.NameOnCheck = '';
        this.RoutingNumber = '';
        this.AccountNumber = '';
        this.CheckNumber = '';
        this.AccountType = '';
    }
}

export class OriginalTransactionViewModel {
    TransactionId: number;

    constructor() {
        this.TransactionId = 0;
    }
}

export class MiPaymentTransactionResponseViewModel {
    constructor() {
        this.MiCompanyObj = new CompanyViewModel();
        this.CardDetails = new MiAuthenticationViewModel();
    }

    AuthorizedAmount: number;
    TransactionId: number;
    TransactionType: string;
    Token: string;
    MerchantKey: number;
    BearerToken: string;
    TotalAmount: number;
    CustomerId: string;
    CustomerKey: number;
    PaymentType: string;
    HostCode: string;
    TransactionIpAddress: string;
    ResponseMessage: string;
    ResultCode: number;
    ResultText: string;
    StatusCode: string;
    ResellerKey: number;
    StartDate: string;
    EndDate: string;
    BillAmount: number;
    MaximumAmount: number;
    TaxAmount: number;
    MaximumInterval: number;
    MaximumFailure: number;
    MerchantContractName: string;
    BillingInterval: string;
    BillingPeriod: string;
    ActivationStatus: string;
    MerchantContractId: string;
    TransToken: string;
    NextBillDate: string;
    MiCompanyObj: CompanyViewModel;
    CardDetails: MiAuthenticationViewModel;
}

export class MiAuthenticationViewModel {
    AuthorizationCode: string;

    constructor() {
        this.AuthorizationCode = '';
    }
}

// Ensure you define any required enums, interfaces, or additional classes.

export class PaymentInvoice {
    TotalAmount: number;
    InvoiceNumber: string;
}
