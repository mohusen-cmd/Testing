import { ItemsDomainModel } from "./IEstimateInvoiceDomainModel";
import { UserModel } from "./IUser";

export class ItemQueryResponsesDomainModel {
    item: ItemsDomainModel[];
    customer: QBSCustomerDetailDomainModel[];
    account: UserModel;
    journalEntry: QuickBookInvoiceDetailDomainModel[];
}
export class QBSCustomerDetailDomainModel {
    DisplayName: any
    Id: any
}
export class QuickBookInvoiceDetailDomainModel {
    DisplayName: any
    Id: any
}