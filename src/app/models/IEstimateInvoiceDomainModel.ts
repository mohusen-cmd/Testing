


export class EstimateInvoiceDomainModel {
    listItemsModel: ItemsDomainModel
    ListEstimateitems: EstimateInvoiceItemDomainModel[]
    listinvoiceitems: InvoiceItemDomainModel[]
    // Invoice: InvoiceDomainModel

    invoiceNo:number | null;
    EstInvoiceID: number | null;
    EstInvoiceNo: string;
    CustomerID: number | null;
    CreatedDate: any | null;
    TaxPercent: number | null;
    TaxAmount: number | null;
    DiscountPercent: number | null;
    Discount: number | null;
    EstInvoiceAmount: number | null;
    Total: number | null;
    GrandTotal: number | null;
    Posted: number | null;
    IsDrafted: boolean | null;
    Memo: string;
    Description: string;
    IsCreditMemo: boolean | null;
    IsPaid: boolean | null;
    ModifiedDate: string | null;
    CreatedBy: any;
    ModifiedBy: number | null;
    Active: boolean | null;
    LateFee: number | null;
    InvoiceType: string;
    OrderNo: string;
    JobLocation: string;
    JobPhone: string;
    InvCretaedDate: string | null;
    MiscellaneousAmount: number | null;
    MiscellaneousPercent: number | null;
    LaborAmount: number | null;
    MaterialAmount: number | null;
    SoldTo: string;
    CreateByUserID: number | null;
    CompanyId: number | null;
    EquipmentAmount: number | null;
    Companyname: string;
    ParentEstimateInvoiceID: number | null;
    EstInvStatus: string;
    Fname: string;
    Name: string;
    RecordsCount: number;
    Email: string;
    isPaid: any
    ItemsObj: any
    Estinvitemsobj: any
    Invoice: any
    ServiceAmt: number | null;
    CompaignID :any
    pointmailStatus :any
    // Invoice Item List

}
export class ItemsDomainModel {
    EstimateInvoiceItemId:any
    ItemID: number;
    ItemTypeID: number | null;
    MeasureID: number | null;
    ItemLocID: number | null;
    ItemCode: string;
    ItemName: string;
    Description: string;
    PrimaryVendorID: number | null;
    AlternateVendorID: number | null;
    AccountNO: string;
    RateperUnit: number | null;
    Saleprice: number | null;
    MinimumQty: number | null;
    ReorderQty: number | null;
    QtyonHand: number | null;
    ItemLocation: string;
    ItemUnits: string;
    Warranty: string;
    Active: boolean | null;
    CreatedDate: string | null;
    ModifiedDate: string | null;
    Updatedby: string;
    PartNumber: string;
    CompanyID: number | null;
    IsDeleted: boolean | null;
    NonStock: boolean | null;
    QtyCommitted: number | null;
    QtyOnOrder: number | null;
    Checked: boolean | null;
    ManufacturerID: number | null;
    RecordsCount: number;
    ItemTotal: number | null;
    SubTotal: number | null;
    TaxPercent: number | null;
    TaxAmount: number | null;
    ItemDesc: string;
    RPU: number;
    SP: number;
    Sku: string;
}

export class EstimateInvoiceItemDomainModel {
    EstimateInvoiceItemId: any;
    EstInvoiceID: number | null;
    EstInvoiceNo: string;
    ItemId: number | null;
    RatePerUnit: number | null;
    Quantity: number | null;
    ItemTotal: number | null;
    ItemCode: string;
    ItemName: string;
    QtyCommitted: number | null;
    ReqQuantity: string;


    
    

}
export class InvoiceItemDomainModel {
   

    InvoiceItemId: number;
    Invoiceid: number | null;
    Invoiceno: any;
    ItemId: number | null;
    RatePerUnit: number | null;
    Quantity: number | null;
    ItemTotal: number | null;
    ItemCode: any;
    ItemName: any;
    QtyCommitted: number | null;
    ReqQuantity: string;
    

}