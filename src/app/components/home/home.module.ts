import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { SharedModule } from "src/app/theme/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from './home/home.component';
import { ChartDataComponent } from './chart-data/chart-data.component';


@NgModule({
    declarations: [
        HomeComponent,
        ChartDataComponent
    ],
    imports: [CommonModule, HomeRoutingModule,SharedModule],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {

}