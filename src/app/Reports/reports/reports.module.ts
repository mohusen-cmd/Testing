import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { LeadbyLeadSourceComponent } from './leadsReport/leadby-lead-source/leadby-lead-source.component';
import { SharedModule } from 'primeng/api';
import { MatIconModule } from '@angular/material/icon';
import { TinymceModule } from 'angular2-tinymce';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { LeaddetailreportsComponent } from './leadsReport/leaddetailreports/leaddetailreports.component';
import { LeadByLeadStatusReportComponent } from './leadsReport/lead-by-lead-status-report/lead-by-lead-status-report.component';
import { LeadownerreportComponent } from './leadsReport/leadownerreport/leadownerreport.component';
import { LeadsourceandstatusreportComponent } from './leadsReport/leadsourceandstatusreport/leadsourceandstatusreport.component';
import { CompanydetailreportComponent } from './companyReport/companydetailreport/companydetailreport.component';
import { CompanyTypereportComponent } from './companyReport/company-typereport/company-typereport.component';
import { CompanyindustryreportComponent } from './companyReport/companyindustryreport/companyindustryreport.component';
import { CompanyOwnershiptypereportComponent } from './companyReport/company-ownershiptypereport/company-ownershiptypereport.component';
import { CompanyOwnerreportComponent } from './companyReport/company-ownerreport/company-ownerreport.component';
import { ContactdetailreportComponent } from './contactReport/contactdetailreport/contactdetailreport.component';
import { ContactByLeadsourcereportComponent } from './contactReport/contact-by-leadsourcereport/contact-by-leadsourcereport.component';
import { ContactByContacttypereportComponent } from './contactReport/contact-by-contacttypereport/contact-by-contacttypereport.component';
import { ContactByLeadsourceContacttypereportComponent } from './contactReport/contact-by-leadsource-contacttypereport/contact-by-leadsource-contacttypereport.component';
import { ContactByOwnerreportComponent } from './contactReport/contact-by-ownerreport/contact-by-ownerreport.component';
import { OpportunityreportComponent } from './OpportunityReport/opportunityreport/opportunityreport.component';
import { OpportunityByBuyingstageComponent } from './OpportunityReport/opportunity-by-buyingstage/opportunity-by-buyingstage.component';
import { OpportunityBySourcereportComponent } from './OpportunityReport/opportunity-by-sourcereport/opportunity-by-sourcereport.component';
import { OpportunityTypereportComponent } from './OpportunityReport/opportunity-typereport/opportunity-typereport.component';
import { ActivityreportComponent } from './ActivityReport/activityreport/activityreport.component';
import { ActivityByTypereportComponent } from './ActivityReport/activity-by-typereport/activity-by-typereport.component';
import { ActivityByStatusreportComponent } from './ActivityReport/activity-by-statusreport/activity-by-statusreport.component';
import { ActivityByPriorityreportComponent } from './ActivityReport/activity-by-priorityreport/activity-by-priorityreport.component';
import { ActivityModelreportComponent } from './ActivityReport/activity-modelreport/activity-modelreport.component';
import { ActivityOpenCompletereportComponent } from './ActivityReport/activity-open-completereport/activity-open-completereport.component';
import { UserreportComponent } from './UserReport/userreport/userreport.component';
import { UserrolereportComponent } from './UserReport/userrolereport/userrolereport.component';
import { MatCardModule } from '@angular/material/card';
import { AgGridModule } from 'ag-grid-angular';
@NgModule({
  declarations: [
    LeadbyLeadSourceComponent,
    LeaddetailreportsComponent,
    LeadByLeadStatusReportComponent,
    LeadownerreportComponent,
    LeadsourceandstatusreportComponent,
    CompanydetailreportComponent,
    CompanyTypereportComponent,
    CompanyindustryreportComponent,
    CompanyOwnershiptypereportComponent,
    CompanyOwnerreportComponent,
    ContactdetailreportComponent,
    ContactByLeadsourcereportComponent,
    ContactByContacttypereportComponent,
    ContactByLeadsourceContacttypereportComponent,
    ContactByOwnerreportComponent,
    OpportunityreportComponent,
    OpportunityByBuyingstageComponent,
    OpportunityBySourcereportComponent,
    OpportunityTypereportComponent,
    ActivityreportComponent,
    ActivityByTypereportComponent,
    ActivityByStatusreportComponent,
    ActivityByPriorityreportComponent,
    ActivityModelreportComponent,
    ActivityOpenCompletereportComponent,
    UserreportComponent,
    UserrolereportComponent
  ],
  imports: [
    CommonModule,  SharedModule,MatIconModule,TinymceModule ,MatDatepickerModule,AgGridModule,
    MatCardModule,
  
      CarouselModule, NgbProgressbarModule, NgbDropdownModule,MatDialogModule,MatProgressSpinnerModule,
      FormsModule,ReactiveFormsModule,MatInputModule,MatExpansionModule,MatSelectModule,MatSortModule,
       MatPaginatorModule, MatTableModule,MatTabsModule,RouterModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
