import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ManageRoutingModule } from "./manage-routing.module";
import { CustomfieldsComponent } from './customfields/customfields.component';

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AddnewcustomComponent } from './addnewcustom/addnewcustom.component';
import { SharedModule } from "src/app/theme/shared/shared.module";
import { AgGridModule } from "ag-grid-angular";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";




@NgModule({
    declarations: [
        CustomfieldsComponent,
        AddnewcustomComponent
    ],
    imports: [ManageRoutingModule,MatTableModule,MatSelectModule,MatCardModule,AgGridModule,CommonModule,ReactiveFormsModule,FormsModule,SharedModule,MatPaginatorModule],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManageModule { }