import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "src/app/theme/shared/shared.module";
import { SetupRoutingModule } from "./setup-routing.module";
import { UserrolesComponent } from './userroles/userroles.component';
import { LeadopportunitysourceComponent } from './leadopportunitysource/leadopportunitysource.component';
import { NgxPaginationModule } from "ngx-pagination";
import { MatSelectModule } from "@angular/material/select";
import { BuyingstageleadstatusComponent } from './buyingstageleadstatus/buyingstageleadstatus.component';
import { OpportunitytypeComponent } from './opportunitytype/opportunitytype.component';
import { PrioritytypeComponent } from './prioritytype/prioritytype.component';
import { ContacttypeComponent } from './contacttype/contacttype.component';
import { ActivitytypeComponent } from './activitytype/activitytype.component';
import { CompanytypeComponent } from './companytype/companytype.component';
import { CompanyindustryComponent } from './companyindustry/companyindustry.component';
import { StatusComponent } from './status/status.component';
import { CompanyownershiptypeComponent } from './companyownershiptype/companyownershiptype.component';
import { CampaignemailComponent } from './campaignemail/campaignemail.component';
import { DepartmentComponent } from './department/department.component';
import { AccessmenussetupComponent } from './accessmenussetup/accessmenussetup.component';
import { DataTablesModule } from 'angular-datatables';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {TreeModule } from 'primeng/tree';
import { TreeTableModule} from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { UsersComponent } from './users/users.component';
import { CreateoreditusersComponent } from './users/createoreditusers/createoreditusers.component';
import { AddUserRolesComponent } from './add-user-roles/add-user-roles.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CrmModule } from "../crm/crm.module";
import { AddnewbuyingleadsComponent } from './buyingstageleadstatus/addnewbuyingleads/addnewbuyingleads.component';
import { AddnewprioritytypeComponent } from './prioritytype/addnewprioritytype/addnewprioritytype.component';
import { AddnewleadopportunitysourceComponent } from './leadopportunitysource/addnewleadopportunitysource/addnewleadopportunitysource.component';
import { AddnewopportunityComponent } from './opportunitytype/addnewopportunity/addnewopportunity.component';
import { AddnewComponent } from './contacttype/addnew/addnew.component';
import { AddnewactivityComponent } from './activitytype/addnewactivity/addnewactivity.component';
import { CreateoredituserrolesComponent } from './userroles/createoredituserroles/createoredituserroles.component';
import { AddnewcompanyComponent } from './companytype/addnewcompany/addnewcompany.component';
import { CreateoreditComponent } from './companyindustry/createoredit/createoredit.component';
import { CreateoreditstatusComponent } from './status/createoreditstatus/createoreditstatus.component';
import { OwnershipcreateoreditComponent } from './companyownershiptype/ownershipcreateoredit/ownershipcreateoredit.component';
import { AddnewcampaignemailComponent } from './campaignemail/addnewcampaignemail/addnewcampaignemail.component';
import { DepartmentcreateoreditComponent } from './department/departmentcreateoredit/departmentcreateoredit.component';

@NgModule({
    declarations: [
    UserrolesComponent,
    LeadopportunitysourceComponent,
    BuyingstageleadstatusComponent,
    OpportunitytypeComponent,
    PrioritytypeComponent,
    ContacttypeComponent,
    ActivitytypeComponent,
    CompanytypeComponent,
    CompanyindustryComponent,
    StatusComponent,
    CompanyownershiptypeComponent,
    CampaignemailComponent,
    DepartmentComponent,
    AccessmenussetupComponent,
    UsersComponent,
    CreateoreditusersComponent,
    AddUserRolesComponent,
    AddnewbuyingleadsComponent,
    AddnewprioritytypeComponent,
    AddnewleadopportunitysourceComponent,
    AddnewopportunityComponent,
    AddnewComponent,
    AddnewactivityComponent,
    CreateoredituserrolesComponent,
    AddnewcompanyComponent,
    CreateoreditComponent,
    CreateoreditstatusComponent,
    OwnershipcreateoreditComponent,
    AddnewcampaignemailComponent,
    DepartmentcreateoreditComponent
  ],
    imports: [SetupRoutingModule,CommonModule,SharedModule,ReactiveFormsModule,FormsModule,MatTableModule,MatProgressSpinnerModule,MatPaginatorModule,NgxPaginationModule,MatSelectModule,
      TreeModule,
      TreeTableModule,
        DataTablesModule,MatTreeModule,ButtonModule,MatIconModule,CrmModule
    ],
    exports: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SetupModule { }