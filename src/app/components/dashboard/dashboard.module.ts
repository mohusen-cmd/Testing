import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { SharedModule } from "src/app/theme/shared/shared.module";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { FullCalendarModule } from "@fullcalendar/angular";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartModule } from "angular2-chartjs";

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventcalendarComponent } from './eventcalendar/eventcalendar.component';
import { EventschedulerheaderComponent } from './eventschedulerheader/eventschedulerheader.component';
import { InvoiceDashboardComponent } from './invoice-dashboard/invoice-dashboard.component';
import { UserNotificationComponent } from './user-notification/user-notification.component';
import { NgxPaginationModule } from "ngx-pagination";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";


FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGrigPlugin
]);
@NgModule({
  declarations: [
    AdminDashboardComponent,
    MainDashboardComponent,
    EventcalendarComponent,
    EventschedulerheaderComponent,
    InvoiceDashboardComponent,
    UserNotificationComponent
  ],
  imports: [DashboardRoutingModule, Ng2GoogleChartsModule, SharedModule, CommonModule, MatTabsModule, Ng2GoogleChartsModule, FullCalendarModule, TabsModule.forRoot(), SharedModule, ChartModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgxPaginationModule,MatOptionModule,MatSelectModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }