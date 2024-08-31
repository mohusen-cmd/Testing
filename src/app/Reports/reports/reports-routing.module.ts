import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityByPriorityreportComponent } from './ActivityReport/activity-by-priorityreport/activity-by-priorityreport.component';
import { ActivityByStatusreportComponent } from './ActivityReport/activity-by-statusreport/activity-by-statusreport.component';
import { ActivityByTypereportComponent } from './ActivityReport/activity-by-typereport/activity-by-typereport.component';
import { ActivityModelreportComponent } from './ActivityReport/activity-modelreport/activity-modelreport.component';
import { ActivityOpenCompletereportComponent } from './ActivityReport/activity-open-completereport/activity-open-completereport.component';
import { ActivityreportComponent } from './ActivityReport/activityreport/activityreport.component';
import { CompanyOwnerreportComponent } from './companyReport/company-ownerreport/company-ownerreport.component';
import { CompanyOwnershiptypereportComponent } from './companyReport/company-ownershiptypereport/company-ownershiptypereport.component';
import { CompanyTypereportComponent } from './companyReport/company-typereport/company-typereport.component';
import { CompanydetailreportComponent } from './companyReport/companydetailreport/companydetailreport.component';
import { CompanyindustryreportComponent } from './companyReport/companyindustryreport/companyindustryreport.component';
import { ContactByContacttypereportComponent } from './contactReport/contact-by-contacttypereport/contact-by-contacttypereport.component';
import { ContactByLeadsourceContacttypereportComponent } from './contactReport/contact-by-leadsource-contacttypereport/contact-by-leadsource-contacttypereport.component';
import { ContactByLeadsourcereportComponent } from './contactReport/contact-by-leadsourcereport/contact-by-leadsourcereport.component';
import { ContactByOwnerreportComponent } from './contactReport/contact-by-ownerreport/contact-by-ownerreport.component';
import { ContactdetailreportComponent } from './contactReport/contactdetailreport/contactdetailreport.component';
import { LeadByLeadStatusReportComponent } from './leadsReport/lead-by-lead-status-report/lead-by-lead-status-report.component';
import { LeadbyLeadSourceComponent } from './leadsReport/leadby-lead-source/leadby-lead-source.component';
import { LeaddetailreportsComponent } from './leadsReport/leaddetailreports/leaddetailreports.component';
import { LeadownerreportComponent } from './leadsReport/leadownerreport/leadownerreport.component';
import { LeadsourceandstatusreportComponent } from './leadsReport/leadsourceandstatusreport/leadsourceandstatusreport.component';
import { OpportunityByBuyingstageComponent } from './OpportunityReport/opportunity-by-buyingstage/opportunity-by-buyingstage.component';
import { OpportunityBySourcereportComponent } from './OpportunityReport/opportunity-by-sourcereport/opportunity-by-sourcereport.component';
import { OpportunityTypereportComponent } from './OpportunityReport/opportunity-typereport/opportunity-typereport.component';
import { OpportunityreportComponent } from './OpportunityReport/opportunityreport/opportunityreport.component';
import { UserreportComponent } from './UserReport/userreport/userreport.component';
import { UserrolereportComponent } from './UserReport/userrolereport/userrolereport.component';

const routes: Routes = [
  {
    path: 'leadSource', component: LeadbyLeadSourceComponent,

  },
  {
    path: 'leadDetail', component: LeaddetailreportsComponent,

  },
  {
    path: 'leadbyLeadStatus', component: LeadByLeadStatusReportComponent,

  },
  {
    path: 'leadOwner', component: LeadownerreportComponent,

  },
  {
    path: 'leadSourceandStatus', component: LeadsourceandstatusreportComponent,

  },
  {
    path: 'companyDetail', component: CompanydetailreportComponent,

  },
  {
    path: 'companyType', component: CompanyTypereportComponent,

  },
  {
    path: 'companyIndustry', component: CompanyindustryreportComponent,

  },
  {
    path: 'companyOwnershipType', component: CompanyOwnershiptypereportComponent,

  },
  {
    path: 'companyOwner', component: CompanyOwnerreportComponent,

  },
  {
    path: 'contactdetail', component: ContactdetailreportComponent,

  },
  {
    path: 'contactByLeadsource', component: ContactByLeadsourcereportComponent,

  },
  {
    path: 'contactByContactType', component: ContactByContacttypereportComponent,

  },
  {
    path: 'contactByLeadandContactType', component: ContactByLeadsourceContacttypereportComponent,

  },
  {
    path: 'contactByOwner', component: ContactByOwnerreportComponent,

  },
  {
    path: 'OpportunityReport', component: OpportunityreportComponent,

  },
  {
    path: 'opportunityBuyingstageReport', component: OpportunityByBuyingstageComponent,

  },
  {
    path: 'opportunitySourceReport', component: OpportunityBySourcereportComponent,

  },
  {
    path: 'opportunityTypeReport', component: OpportunityTypereportComponent,

  },
  {
    path: 'activityReport', component: ActivityreportComponent,

  },
  {
    path: 'activityTypeReport', component: ActivityByTypereportComponent,

  },
  {
    path: 'activityStatusReport', component: ActivityByStatusreportComponent,

  },
  {
    path: 'activityPriorityReport', component: ActivityByPriorityreportComponent,

  },
  {
    path: 'activityModelReport', component: ActivityModelreportComponent,

  },
  {
    path: 'activityOpenComplete/:Id', component: ActivityOpenCompletereportComponent,

  },
  {
    path: 'userReport', component: UserreportComponent,

  },
  {
    path: 'userRoleReport', component: UserrolereportComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
