import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { MainDashboardComponent } from "./main-dashboard/main-dashboard.component";
import { InvoiceDashboardComponent } from "./invoice-dashboard/invoice-dashboard.component";
import { UserNotificationComponent } from "./user-notification/user-notification.component";

const routes: Routes = [
  { path: 'AdminDashboard', component: AdminDashboardComponent },
  { path: "DashboardIndex", component: MainDashboardComponent },
  { path: "InvoiceDashboardIndex", component: InvoiceDashboardComponent },
  { path: "GetUserNotifications", component: UserNotificationComponent }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class DashboardRoutingModule { }