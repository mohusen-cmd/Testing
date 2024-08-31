import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';

import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTooltipModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { LeftnavbarComponent } from './theme/layout/admin/leftnavbar/leftnavbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatTableModule } from '@angular/material/table';



import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AlertDirective } from './alert.directive';

import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';
import { ToastrModule } from 'ng6-toastr-notifications';
import { Adminguard } from './guards/adminpermission.guard';
import { SuperAdminlayoutComponentComponent } from './sharedlayout/super-adminlayout-component/super-adminlayout-component.component';
import { SadminComponentComponent } from './sadmin/sadmin-component/sadmin-component.component';
import { CreateoreditclientComponent } from './sadmin/createoreditclient/createoreditclient.component';
import { TextMaskModule } from 'angular2-text-mask';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './services/Loading.service';
import { MasterlayoutComponent } from './sharedlayout/masterlayout/masterlayout.component';
import { Authguard } from './guards/auth.guard';
import { UserGuard } from './guards/userpermission.guard';
import { SafePipePipe } from './pipes/safe-pipe.pipe';
import { DashboardService } from './services/dashboard.service';
import { LeadService } from './services/lead.service';
import { CompanyService } from './services/company.service';
import { ContactService } from './services/contact.service';
import { OpportunityService } from './services/opportunity.service';
import { ActivityService } from './services/activity.service';
import { LeadsourcetypeService } from './services/leadsourcetype.service';
import { BuyingstageService } from './services/buyingstage.service';
import { OppotunityTypeService } from './services/oppotunitytype.service';
import { PriorityService } from './services/priority.service';
import { ContactTypeService } from './services/contacttype.service';
import { ActivityTypeservice } from './services/activitytype.service';
import { CompanyTypeService } from './services/companytype.service';
import { CompanyIndustryService } from './services/companyindustry.service';
import { CampaignService } from './services/campaign.service';
import { CommonService } from './services/common.service';
import { CookieService } from 'ngx-cookie-service';
import { EmailService } from './services/email.service';
import { TriggeredcampaignsService } from './services/triggeredcampaigns.service';
import { CustomfieldService } from './services/customfield.service';
import { ImportService } from './services/Import.service';
import { ListsService } from './services/lists.service';
import { UserService } from './services/user.service';
import { InvoiceService } from './services/Invoice.service';
import { ItemService } from './services/item.service';
import { ReportsService } from './services/reports.service';
import { QuickPaymentComponent } from './quickpayment/quick-payment/quick-payment.component';
import { AgGridModule } from 'ag-grid-angular';
import { RegistrationFormComponent } from './login/registration-form/registration-form.component';
import { VerifyOtpComponent } from './login/verify-otp/verify-otp.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { OtherGuard } from './guards/otherpermission.guard';
import { OtherlayoutComponent } from './sharedlayout/otherlayout/otherlayout.component';
import { SalonComponent } from './otheruser/salon/salon.component';
import { ContactdepartmentDirective } from './directives/contactdepartment.directive';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        AuthComponent,
        NavigationComponent,
        NavContentComponent,
        NavGroupComponent,
        NavCollapseComponent,
        NavItemComponent,
        NavBarComponent,
        NavLeftComponent,
        NavSearchComponent,
        NavRightComponent,
        ConfigurationComponent,
        ToggleFullScreenDirective,
        LoginComponent,
        LeftnavbarComponent,
        SafePipePipe,
        AlertDirective,
        SuperAdminlayoutComponentComponent,
        SadminComponentComponent,
        CreateoreditclientComponent,
        LoadingComponent,
        MasterlayoutComponent,
        QuickPaymentComponent,
        RegistrationFormComponent,
        VerifyOtpComponent,
        ForgetPasswordComponent,
        OtherlayoutComponent,
        SalonComponent,
        ContactdepartmentDirective,




    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule,
        SharedModule,
        AgGridModule,
        NgbDropdownModule,
        NgbTooltipModule,
        NgbButtonsModule,
        NgbNavModule, NgxPaginationModule, TextMaskModule, MatProgressSpinnerModule,
        HttpClientModule, ReactiveFormsModule, FormsModule, MatTableModule, MatNativeDateModule, MatInputModule, MatDialogModule
    ],
    //  providers: [NavigationItem],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [NavigationItem,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
        Adminguard,
        LoadingService,
        Authguard,
        UserGuard,
        DashboardService,
        LeadService,
        CompanyService,
        ContactService,
        OpportunityService,
        ActivityService,
        LeadsourcetypeService,
        BuyingstageService,
        OppotunityTypeService,
        PriorityService,
        ContactTypeService,
        ActivityTypeservice,
        CompanyTypeService,
        CompanyIndustryService,
        CampaignService,
        CommonService,
        CookieService,
        EmailService,
        TriggeredcampaignsService,
        CustomfieldService,
        ImportService,
        ListsService,
        UserService,
        InvoiceService,
        ItemService,
        ReportsService,
        OtherGuard
    ],
    bootstrap: [AppComponent],

})
export class AppModule {

}
