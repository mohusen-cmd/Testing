import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Adminguard } from './guards/adminpermission.guard';
import { Authguard } from './guards/auth.guard';
import { UserGuard } from './guards/userpermission.guard';

import { LoginComponent } from './login/login.component';
import { CreateoreditclientComponent } from './sadmin/createoreditclient/createoreditclient.component';
import { SadminComponentComponent } from './sadmin/sadmin-component/sadmin-component.component';
import { MasterlayoutComponent } from './sharedlayout/masterlayout/masterlayout.component';
import { SuperAdminlayoutComponentComponent } from './sharedlayout/super-adminlayout-component/super-adminlayout-component.component';
import { QuickPaymentComponent } from './quickpayment/quick-payment/quick-payment.component';
import { VerifyOtpComponent } from './login/verify-otp/verify-otp.component';
import { OtherlayoutComponent } from './sharedlayout/otherlayout/otherlayout.component';
import { OtherGuard } from './guards/otherpermission.guard';
import { SalonComponent } from './otheruser/salon/salon.component';



const routes: Routes = [


    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: "verifyotp", component: VerifyOtpComponent },

    {
        path: '',
        component: SuperAdminlayoutComponentComponent,
        canActivate: [Authguard, Adminguard],
        children: [
            { path: '', redirectTo: "admin", pathMatch: "full" },
            { path: 'admin', component: SadminComponentComponent, data: { title: 'Clients', icon: 'icon-User', status: true } },
            { path: 'createclient', component: CreateoreditclientComponent, data: { title: 'Create Client', icon: 'icon-User', status: true } },
            { path: 'editclient/:Id', component: CreateoreditclientComponent }
        ]
    },

    {
        path: '', component: OtherlayoutComponent,
        canActivate: [Authguard, OtherGuard],
        children: [
            { path: '', redirectTo: "otheruser", pathMatch: "full" },
            { path: "otheruser", component: SalonComponent }
        ]

    },



    {
        path: "", component: MasterlayoutComponent,
        canActivate: [Authguard, UserGuard],
        children: [

            { path: '', redirectTo: "Home", pathMatch: 'full' },
            { path: "Home", loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
            { path: 'DashBoard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: "CRM", loadChildren: () => import('./components/crm/crm.module').then(m => m.CrmModule) },
            { path: "Email", loadChildren: () => import('./components/email/email.module').then(m => m.EmailModule) },
            { path: "CustomField", loadChildren: () => import('./components/manage/manage.module').then(m => m.ManageModule) },
            { path: "Setup", loadChildren: () => import('./components/setup/setup.module').then(m => m.SetupModule) },
            { path: "Invoice", loadChildren: () => import('./components/billing/billing.module').then(m => m.BillingModule) },
        ]
    },



    { path: 'Reports', loadChildren: () => import('./Reports/reports/reports.module').then(m => m.ReportsModule) },
    { path: "QuickPayment", component: QuickPaymentComponent },


    { path: '**', redirectTo: 'login' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
