
import { ClientViewModel } from "./IClientViewModel";
import { EstimateInvoiceDomainModel } from "./IEstimateInvoiceDomainModel";
import { ItemQueryResponsesDomainModel, QuickBookInvoiceDetailDomainModel } from "./IItemQueryResponsesDomainModel";
import { PaymentsDomainModel } from "./IPaymentsDomainModel";


export class InvoiceDomainModel {
    PaymentObj: PaymentsDomainModel;
    Listinvoice: InvoiceDomainModel[];
    Listpayments: PaymentsDomainModel[];
    Listinvoiceitems: InvoiceItemDomainModel[];
    ClienUserObj:ClientViewModel 
    // estObj: EstimateInvoiceDomainModel;
    InvoiceID: number;
    InvoiceNo: string;
    CustomerID: number | null;
    CreatedDate: any | null;
    DueDate: Date | null;
    TermsID: number | any;
    TaxPercent: number | null |any;
    TaxAmount: number | null;
    DiscountPercent: number | null;
    Discount: number | null;
    InvoiceAmount: number | null;
    BalanceAmount: any;
    GrandTotal: number | null;
    PaymentId: number;
    Posted: number | null;
    IsDrafted: boolean | null;
    Memo: string;
    Description: string;
    IsCreditMemo: boolean | null;
    IsPaid: boolean | null;
    ModifiedDate: string | null;
    CreatedBy: string;
    ModifiedBy: number | null;
    Active: boolean | null;
    LateFee: number | null;
    InvoiceType: string;
    OrderNo: string;
    JobLocation: string;
    JobPhone: string;
    InvCretaedDate: string | null;
    MiscellaneousAmount: any;
    MiscellaneousPercent: any;
    LaborAmount: number | null;
    MaterialAmount: number | null;
    SoldTo: string;
    CreateByUserID: number | null;
    CompanyId: number | null;
    EquipmentAmount: number | null;
    Companyname: string;
    ItemID: number | null;
    Quantity: number | null;
    EstInvoiceID: number | null;
    EstInvoiceNo: string;
    ServiceAmt: any;
    Status: string;
    Name: string;
    Fname: string;
    MName: string;
    LName: string;
    BillingAddress: string;
    Billingstreet: string;
    Billingcity: string;
    Billingstate: string;
    Billingzip: string;
    Billingcountry: string;
    ShippingAddress: string;
    Shippingstreet: string;
    Shippingcity: string;
    Shippingstate: string;
    Shippingzip: string;
    Shippingcountry: string;
    StateName: any;
    CountryName: any
    Total: number | null;
    Paymenttype: string;
    AmountPaid: any;
    Amountwords: string;
    TermsText: string;
    RecordCount: number;
    CheckNumber: string;
    RecursTerm: number;
    RecursOn: number;
    RecursDate: string | null |any;
    Email: string;
    ServicePercent: number | null;
    ServiceFee: number | null;
    TransAmount: number | null;
    PurchaseOrder: string;
    TransToken: string;
    Paystatus: any
    InvoiceBalance: any
    ClientCompanyName:any
    Id: string;

    QBInvID: number;
    InvoiceAmt?: number;
    listinvoiceitems: InvoiceItemDomainModel[];
    EstObj: EstimateInvoiceDomainModel;

    QueryResponse: ItemQueryResponsesDomainModel;
    JournalEntry: QuickBookInvoiceDetailDomainModel;
    QBCustID: number;
    QBRefreshToken: string;
    CompaignID :any
    pointmailStatus :any
    QBPayID: any

    QuickbookUpdate: any
  RoleName: any;
    
}


export class InvoiceItemDomainModel {
    InvoiceItemId: any = 0
    Invoiceid: number | null;
    Invoiceno: string;
    ItemId: number | null;
    RatePerUnit: number | null;
    Quantity: number | null;
    ItemTotal: any | null;
    ItemCode: string;
    ItemName: string;
    QtyCommitted: number | null;
    ReqQuantity: string;
}