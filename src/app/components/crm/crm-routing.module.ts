import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ActivityComponent } from "./activity/activity/activity.component";
import { AddNewActivityComponent } from "./activity/add-new-activity/add-new-activity.component";
import { ViewactivityComponent } from "./activity/viewactivity/viewactivity.component";
import { AddNewCompanyComponent } from "./company/add-new-company/add-new-company.component";
import { CompanyImportComponent } from "./company/company-import/company-import.component";
import { CompanyComponent } from "./company/company/company.component";
import { ViewcompanyComponent } from "./company/viewcompany/viewcompany.component";
import { AddNewContactComponent } from "./contact/add-new-contact/add-new-contact.component";
import { ContactImportComponent } from "./contact/contact-import/contact-import.component";
import { ContactsComponent } from "./contact/contacts/contacts.component";
import { ViewcontactsComponent } from "./contact/viewcontacts/viewcontacts.component";
import { AddNewLeadsComponent } from "./lead/add-new-leads/add-new-leads.component";
import { LeadImportHistoryComponent } from "./lead/lead-import-history/lead-import-history.component";
import { LeadImportComponent } from "./lead/lead-import/lead-import.component";
import { LeadComponent } from "./lead/lead/lead.component";
import { ViewleadComponent } from "./lead/viewlead/viewlead.component";
import { NotificationComponent } from "./notification/notification/notification.component";
import { AddNewOpportunityComponent } from "./opportunity/opportunity/add-new-opportunity/add-new-opportunity.component";
import { OpportunityComponent } from "./opportunity/opportunity/opportunity.component";
import { ViewopportunityComponent } from "./opportunity/viewopportunity/viewopportunity.component";
import { ConvertLeadComponent } from "./lead/convert-lead/convert-lead.component";
import { ReportsviewerComponent } from "./reportsviewer/reportsviewer.component";
const routes: Routes = [
    { path: 'leads', component: LeadComponent, data: { title: 'CRM Leads', icon: 'icon-User', status: true } },
    { path: 'leads/viewleads/:Id', component: ViewleadComponent, data: { title: 'Create lead', icon: 'icon-User', status: true } },
    { path: "lead/addnewlead/:Id", component: AddNewLeadsComponent, data: { title: 'Create Lead', icon: 'icon-User', status: true } },
    { path: "contacts/convertlead/:Id", component:ConvertLeadComponent },
    { path: "leads/leadsimport", component: LeadImportComponent },
    { path: "import/importhistory/:type", component: LeadImportHistoryComponent },
    
    { path: "activities", component: ActivityComponent },
    { path: "activities/activityaddnew/:Id", component: AddNewActivityComponent },
    { path: "activities/activityview/:Id/:ModuleId/:AccountType", component: ViewactivityComponent },

    { path: "opportunities", component: OpportunityComponent },
    { path: "opportunities/addopportunities/:Id", component: AddNewOpportunityComponent },
    { path: "opportunities/viewopportunity/:Id", component: ViewopportunityComponent },

    { path: "contacts", component: ContactsComponent },
    { path: "contacts/contactview/:Id", component: ViewcontactsComponent },
    { path: "contacts/AddNew/:Id", component: AddNewContactComponent },
    { path: "contacts/import", component: ContactImportComponent },

    { path: "companies", component: CompanyComponent },
    { path: "companies/companyimport", component: CompanyImportComponent },
    { path: "companies/addnewcompany/:Id", component: AddNewCompanyComponent },
    { path: "companies/viewcompany/:Id", component: ViewcompanyComponent },

    { path: "DashBoard/GetNotificationList", component: NotificationComponent },
    { path: "companies/viewcompany/:Id", component: ViewcompanyComponent },
  //  { path: "DashBoard/GetNotificationList", component: NotificationComponent },
    { path: "opportunities/viewopportunity/:Id", component: ViewopportunityComponent },
    { path: "Reports",component:ReportsviewerComponent}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CrmRoutingModule { }