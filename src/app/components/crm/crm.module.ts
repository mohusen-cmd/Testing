import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { CrmRoutingModule } from "./crm-routing.module";
import { LeadComponent } from './lead/lead/lead.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ViewleadComponent } from './lead/viewlead/viewlead.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddNewLeadsComponent } from './lead/add-new-leads/add-new-leads.component';
import { LeadImportHistoryComponent } from './lead/lead-import-history/lead-import-history.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeadImportComponent } from './lead/lead-import/lead-import.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CompanyComponent } from './company/company/company.component';
import { CompanyImportComponent } from './company/company-import/company-import.component';
import { ViewcompanyComponent } from './company/viewcompany/viewcompany.component';
import { ContactsComponent } from './contact/contacts/contacts.component';
import { ViewcontactsComponent } from './contact/viewcontacts/viewcontacts.component';

import { AddNewContactComponent } from './contact/add-new-contact/add-new-contact.component';
import { AddNewCompanyComponent } from './company/add-new-company/add-new-company.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { ActivityComponent } from './activity/activity/activity.component';
import { AddNewActivityComponent } from './activity/add-new-activity/add-new-activity.component';
import { CommonModalComponent } from './common-module-modal/common-modal/common-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanyModelComponent } from './common-module-modal/company-model/company-model.component';
import { ContactModalComponent } from './common-module-modal/contact-modal/contact-modal.component';
import { ContactImportComponent } from './contact/contact-import/contact-import.component';
import { OpportunityComponent } from './opportunity/opportunity/opportunity.component';
import { AddNewOpportunityComponent } from './opportunity/opportunity/add-new-opportunity/add-new-opportunity.component';
import { ViewopportunityComponent } from './opportunity/viewopportunity/viewopportunity.component';
import { OpportunityModalComponent } from './common-module-modal/opportunity-modal/opportunity-modal.component';
import { ViewactivityComponent } from './activity/viewactivity/viewactivity.component';
import { UsersModalComponent } from './common-module-modal/users-modal/users-modal.component';
import { ContactMapComponent } from './contact/contact-map/contact-map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { AdvancedSearchComponent } from './contact/advanced-search/advanced-search.component';
import { TinymceModule } from 'angular2-tinymce';
import { EmailtemplateComponent } from './emailtemplate/emailtemplate.component';
import { AttachmentsTabComponent } from './commoncomponents/attachments-tab/attachments-tab.component';
import { NoteTabComponent } from './commoncomponents/note-tab/note-tab.component';
import { ActivityTabComponent } from './commoncomponents/activity-tab/activity-tab.component';
import { ContactsTabComponent } from './commoncomponents/contacts-tab/contacts-tab.component';
import { OpportunityTabComponent } from './commoncomponents/opportunity-tab/opportunity-tab.component';
import { AppErrorHandler } from 'src/app/error/app-error-handler';
import { ConvertLeadComponent } from './lead/convert-lead/convert-lead.component';
import { NgbModule, NgbNavModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AlphasearchComponent } from './alphasearch/alphasearch.component';
import { ReportsviewerComponent } from './reportsviewer/reportsviewer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CreateCompanyModalComponent } from './contact/create-company-modal/create-company-modal.component';
import { PendingFilesComponent } from './pending-files/pending-files.component';
import { ImportedFilesComponent } from './imported-files/imported-files.component';
import { MatOptionModule } from '@angular/material/core';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ReusableTextInputComponent } from './reusable-text-input/reusable-text-input.component';


@NgModule({
    declarations: [
        LeadComponent, ViewleadComponent, AddNewLeadsComponent, LeadImportHistoryComponent, LeadImportComponent,
        CompanyComponent, CompanyImportComponent, ViewcompanyComponent, ContactsComponent, ViewcontactsComponent, AddNewCompanyComponent, NotificationComponent, AddNewContactComponent,
        ActivityComponent, AddNewActivityComponent, CommonModalComponent, NotificationComponent, CompanyModelComponent, ContactModalComponent, ContactImportComponent,
        OpportunityComponent, AddNewOpportunityComponent, ViewopportunityComponent, OpportunityModalComponent, ViewactivityComponent, UsersModalComponent, ContactMapComponent, AdvancedSearchComponent, EmailtemplateComponent, AttachmentsTabComponent, NoteTabComponent, ActivityTabComponent, ContactsTabComponent, OpportunityTabComponent, ConvertLeadComponent, AlphasearchComponent, ReportsviewerComponent, CreateCompanyModalComponent, PendingFilesComponent, ImportedFilesComponent, ContactListComponent, ReusableTextInputComponent
    ],
    imports: [MatTabsModule, CommonModule, MatTableModule, SharedModule, FormsModule, ReactiveFormsModule,
        MatDialogModule, MatStepperModule, MatProgressSpinnerModule, MatSelectModule, NgxPaginationModule, CrmRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA5NeYHYfIx9GJWITBLbS74PtQUT-ZrNvU',
            libraries: ["places", "geometry"]
        }),
        AgmDirectionModule, TinymceModule.withConfig({ 'auto_focus': false, }),NgbNavModule,NgbPopoverModule,NgbModule,MatExpansionModule,MatOptionModule

    ],
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler },GoogleMapsAPIWrapper],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [CompanyModelComponent,AlphasearchComponent]
})
export class CrmModule { }