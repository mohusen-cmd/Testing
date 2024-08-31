import { InvoiceDomainModel } from "./IInvoiceDomainModel";


export class PaymentsDomainModel {
    PaymentID: string;
    PaymentNo: string;
    InvoiceID: number | null;
    BatchID: number | null;
    CheckNo: string;
    InvoiceAmount: number | null;
    InvoiceBalance: number | null;
    LateFee: number | null;
    Tax: number | null;
    Discount: number | null;
    Memo: string;
    CreatedDate: any | null;
    AccountID: number | null;
    CompanyID: number | null;
    CustomerID: number | null;
    IsMSAPayment: boolean | null;
    CreditCardNo: string;
    ModifiedDate: string | null;
    CreatedBy: number | null;
    ModifiedBy: number | null;
    Status: string;
    PaymentMode: any;
    AmountPaid: number |any;
    PaymentType: any;
    Fname: string;
    PaidDate: string;
    RecordCount: number;
    TransactionId: number;
    TransToken: string;
    TransAmount: number | null;
    GrandTotal: number | null;
    InvvoiceObj: InvoiceDomainModel;
    Email: string;
    Address1: any
    Address2: any
    Phone: any
    StateName:any
    LastName:any
    CountryName:any
    FirstName:any
}
