import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AccessmenussetupComponent } from "./accessmenussetup/accessmenussetup.component";
import { ActivitytypeComponent } from "./activitytype/activitytype.component";
import { AddUserRolesComponent } from "./add-user-roles/add-user-roles.component";
import { BuyingstageleadstatusComponent } from "./buyingstageleadstatus/buyingstageleadstatus.component";
import { CampaignemailComponent } from "./campaignemail/campaignemail.component";
import { CompanyindustryComponent } from "./companyindustry/companyindustry.component";
import { CompanyownershiptypeComponent } from "./companyownershiptype/companyownershiptype.component";
import { CompanytypeComponent } from "./companytype/companytype.component";
import { ContacttypeComponent } from "./contacttype/contacttype.component";
import { DepartmentComponent } from "./department/department.component";
import { LeadopportunitysourceComponent } from "./leadopportunitysource/leadopportunitysource.component";
import { OpportunitytypeComponent } from "./opportunitytype/opportunitytype.component";
import { PrioritytypeComponent } from "./prioritytype/prioritytype.component";
import { StatusComponent } from "./status/status.component";
import { UserrolesComponent } from "./userroles/userroles.component";
import { CreateoreditusersComponent } from "./users/createoreditusers/createoreditusers.component";
import { UsersComponent } from "./users/users.component";
import { AddnewbuyingleadsComponent } from "./buyingstageleadstatus/addnewbuyingleads/addnewbuyingleads.component";
import { AddnewprioritytypeComponent } from "./prioritytype/addnewprioritytype/addnewprioritytype.component";
import { AddnewleadopportunitysourceComponent } from "./leadopportunitysource/addnewleadopportunitysource/addnewleadopportunitysource.component";
import { AddnewopportunityComponent } from "./opportunitytype/addnewopportunity/addnewopportunity.component";
import { AddnewComponent } from "./contacttype/addnew/addnew.component";
import { AddnewactivityComponent } from "./activitytype/addnewactivity/addnewactivity.component";
import { CreateoredituserrolesComponent } from "./userroles/createoredituserroles/createoredituserroles.component";
import { AddnewcompanyComponent } from "./companytype/addnewcompany/addnewcompany.component";
import { CreateoreditComponent } from "./companyindustry/createoredit/createoredit.component";
import { CreateoreditstatusComponent } from "./status/createoreditstatus/createoreditstatus.component";
import { OwnershipcreateoreditComponent } from "./companyownershiptype/ownershipcreateoredit/ownershipcreateoredit.component";
import { AddnewcampaignemailComponent } from "./campaignemail/addnewcampaignemail/addnewcampaignemail.component";
import { DepartmentcreateoreditComponent } from "./department/departmentcreateoredit/departmentcreateoredit.component";



const routes: Routes = [
    { path: "UserRoles/UserRolesList", component: UserrolesComponent },
    { path: "LeadSource/LeadSourceList", component: LeadopportunitysourceComponent },
    { path: "Stage/StageList", component: BuyingstageleadstatusComponent },
    { path: "OpportunityType/OpportunityList", component: OpportunitytypeComponent },
    { path: "Priority/PriorityList", component: PrioritytypeComponent },
    { path: "ContactType/ContactTypeList", component: ContacttypeComponent },
    { path: "ActivityType/ActivityTypeList", component: ActivitytypeComponent },
    { path: "CompanyType/CompanyTypeList", component: CompanytypeComponent },
    { path: "CompanyIndustry/CompanyIndustryList", component: CompanyindustryComponent },
    { path: "Status/StatusList", component: StatusComponent },
    { path: "CompanyOwnership/CompanyOwnershipList", component: CompanyownershiptypeComponent },
    { path: "Common/CampaignEmailIndex", component: CampaignemailComponent },
    { path: "User/DepartmentIndex", component: DepartmentComponent },
    { path: "AccessMenus/AccessMenuSetUp", component: AccessmenussetupComponent },
    { path: "User/UserList", component: UsersComponent },
    { path: "User/CreateEditUser", component: CreateoreditusersComponent },
    { path: "CreateOrEditUserRole", component: AddUserRolesComponent },
    { path: 'Buyingstageleadstatus/addnewbuyingleads/:stagetype/:stageTypeId', component: AddnewbuyingleadsComponent, data: { title: 'Buying Stage/Lead Status', icon: 'icon-User', status: true } },
    { path: 'Prioritytype/addnewprioritytype/:PriorityType/:PriorityTypeId', component: AddnewprioritytypeComponent, data: { title: 'PriorityType', icon: 'icon-User', status: true } },
    { path: 'leadopportunitysource/addnewleadopportunitysource/:LeadSourcetype/:LeadSourceId', component: AddnewleadopportunitysourceComponent, data: { title: 'Lead/Opportunity Source List', icon: 'icon-User', status: true } },
    { path: 'Opportunitytype/addnewopportunity/:Opportunitytype/:OpportunitytypeId', component: AddnewopportunityComponent, data: { title: 'OpportunityType', icon: 'icon-User', status: true } },
    { path: 'Contacttype/addnew/:Contacttype/:ContactTypeId', component: AddnewComponent, data: { title: 'ContactType', icon: 'icon-User', status: true } },
    { path: 'Activitytype/addnewactivity/:Activitytype/:ActivityTypeId', component: AddnewactivityComponent, data: { title: 'ActivityType', icon: 'icon-User', status: true } },
    { path: 'Userroles/createoreditroles/:roleId/:type', component: CreateoredituserrolesComponent, data: { title: 'Create User role', icon: 'icon-User', status: true } },
    { path: 'Companytype/addnewcompany/:Companytype/:CompanyTypeId', component: AddnewcompanyComponent, data: { title: 'CompanyType', icon: 'icon-User', status: true } },
    { path: 'Companyindustry/createoredit/:CompanyindustryIdtype/:CompanyindustryId', component: CreateoreditComponent, data: { title: 'CRM Company Industry', icon: 'icon-User', status: true } },
    { path: 'Status/createoreditstatus/:Type/:Id', component: CreateoreditstatusComponent, data: { title: 'CRM Status', icon: 'icon-User', status: true } },
    { path: 'Companyownershiptype/ownershipcreateoredit/:Type/:Id', component: OwnershipcreateoreditComponent, data: { title: 'CRM Company Ownership Type', icon: 'icon-User', status: true } },
    { path: 'Campaignemails/addnewcampaignemail/:Emailtype/:EmailId', component: AddnewcampaignemailComponent, data: { title: 'campaign Email', icon: 'icon-User', status: true } },
    { path: 'Department/departmentcreateoredit/:Type/:Id', component: DepartmentcreateoreditComponent, data: { title: 'CRM Department', icon: 'icon-User', status: true } },
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetupRoutingModule { }