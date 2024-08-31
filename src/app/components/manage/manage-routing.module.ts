import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddnewcustomComponent } from "./addnewcustom/addnewcustom.component";
import { CustomfieldsComponent } from "./customfields/customfields.component";


const routes: Routes=[
    { path :"ViewCustomFields",component:CustomfieldsComponent},
    { path:"AddEditCustomFields",component:AddnewcustomComponent}
]


@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ManageRoutingModule{

}