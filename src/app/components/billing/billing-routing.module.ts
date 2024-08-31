import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddNewEstimateComponent } from "./Estimate/add-new-estimate/add-new-estimate.component";
import { EditEstimateComponent } from "./Estimate/edit-estimate/edit-estimate.component";
import { EstimateComponent } from "./Estimate/estimate/estimate.component";
import { AddInvoiceComponent } from "./Invoice/add-invoice/add-invoice.component";
import { EditInvoiceComponent } from "./Invoice/edit-invoice/edit-invoice.component";
import { InvoiceComponent } from "./Invoice/invoice/invoice.component";
import { AddIteamsComponent } from "./Items/add-iteams/add-iteams.component";
import { ItemsComponent } from "./Items/items/items.component";
import { PaymentComponent } from "./Payment/payment/payment.component";


const routes: Routes = [
    { path: "EstimateInvoice", component: EstimateComponent },
    { path: "CreateEstimateInvoice", component: AddNewEstimateComponent },
    { path: "EditEstimateInvoice", component: EditEstimateComponent },
    { path: "Inventory", component: ItemsComponent },
    { path: "EditorAddItemsDetail", component: AddIteamsComponent },
    { path: 'InvoiceList', component: InvoiceComponent },
    { path: "PaymentsIndex", component: PaymentComponent },
    { path: "EditInvoice", component: EditInvoiceComponent },
    { path: "CreateInvoice", component: AddInvoiceComponent }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillingRoutingModule { }