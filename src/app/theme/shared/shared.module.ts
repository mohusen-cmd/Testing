import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule, BreadcrumbModule, CardModule, ModalModule } from './components';
import { DataFilterPipe } from './components/data-table/data-filter.pipe';
import { TodoListRemoveDirective } from './components/todo/todo-list-remove.directive';
import { TodoCardCompleteDirective } from './components/todo/todo-card-complete.directive';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ApexChartComponent } from './components/chart/apex-chart/apex-chart.component';
import { ApexChartService } from './components/chart/apex-chart/apex-chart.service';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './components/toast/toast.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LightboxModule } from 'ngx-lightbox';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TinymceModule } from 'angular2-tinymce';
import { TextMaskModule } from 'angular2-text-mask';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgApexchartsModule } from "ng-apexcharts";
import { ToastrModule } from 'ng6-toastr-notifications';
import { DataTablesModule } from 'angular-datatables';
/*import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';*/

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule,
        PerfectScrollbarModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        CardModule,
        BreadcrumbModule,
        ModalModule,
        ClickOutsideModule,
        LightboxModule,
        MatDialogModule,
        SnotifyModule,
        MatFormFieldModule,
        TinymceModule,
        TextMaskModule,
        NgbDropdownModule,
        MatPaginatorModule,
        NgApexchartsModule,
        NgbModule,
        ToastrModule.forRoot(),
        DataTablesModule
    ],
    exports: [
        CommonModule,
        PerfectScrollbarModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        CardModule,
        BreadcrumbModule,
        ModalModule,
        DataFilterPipe,
        TodoListRemoveDirective,
        TodoCardCompleteDirective,
        ClickOutsideModule,
        SpinnerComponent,
        ApexChartComponent,
        GalleryComponent,
        ToastComponent,
        MatFormFieldModule,
        MatInputModule,
        SnotifyModule,
        MatDialogModule,
        TextMaskModule,
        NgbDropdownModule,
        TinymceModule,
        MatPaginatorModule,
        NgApexchartsModule,
        NgbModule,
        ToastrModule,
        DataTablesModule
    ],
    declarations: [
        DataFilterPipe,
        TodoListRemoveDirective,
        TodoCardCompleteDirective,
        SpinnerComponent,
        ApexChartComponent,
        ToastComponent,
        GalleryComponent,
       
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue:DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        ApexChartService,
        ToastService,
        SnotifyService
    ]
})
export class SharedModule {}
