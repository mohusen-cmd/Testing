import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "src/app/theme/shared/shared.module";
import { BillingRoutingModule } from "./billing-routing.module";
import { EstimateComponent } from './Estimate/estimate/estimate.component';
import { AddNewEstimateComponent } from './Estimate/add-new-estimate/add-new-estimate.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { EditEstimateComponent } from './Estimate/edit-estimate/edit-estimate.component';
import { ItemsComponent } from './Items/items/items.component';
import { AddIteamsComponent } from './Items/add-iteams/add-iteams.component';
import { CrmModule } from "../crm/crm.module";
import { InvoiceComponent } from './Invoice/invoice/invoice.component';
import { PaymentComponent } from './Payment/payment/payment.component';
import { EditInvoiceComponent } from './Invoice/edit-invoice/edit-invoice.component';
import { AddInvoiceComponent } from './Invoice/add-invoice/add-invoice.component';
import { IteamModalComponent } from './Items/iteam-modal/iteam-modal.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgxPaginationModule } from "ngx-pagination";
import { MatSelectModule } from "@angular/material/select";
import { OnepointMailingtemplateComponent } from './onepoint-mailingtemplate/onepoint-mailingtemplate.component';
import { InvoicemailingTemplateComponent } from './invoicemailing-template/invoicemailing-template.component';



@NgModule({
    declarations: [
    EstimateComponent,
    AddNewEstimateComponent,
    EditEstimateComponent,
    ItemsComponent,
    AddIteamsComponent,
    InvoiceComponent,
    PaymentComponent,
    EditInvoiceComponent,
    AddInvoiceComponent,
    IteamModalComponent,
    OnepointMailingtemplateComponent,
    InvoicemailingTemplateComponent,
  
  ],
    imports: [BillingRoutingModule,MatTableModule,NgxPaginationModule,MatSelectModule,CommonModule,ReactiveFormsModule,FormsModule,SharedModule,MatProgressSpinnerModule,MatDatepickerModule,CrmModule,MatTableModule,MatCheckboxModule],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BillingModule {}