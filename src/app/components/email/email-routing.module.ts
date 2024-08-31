import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatenewListsComponent } from './createnew-lists/createnew-lists.component';
import { EmailDashBoardComponent } from './email-dash-board/email-dash-board.component';
import { ListComponent } from './list/list.component';
import { TriggeredCampainComponent } from './triggered-campain/triggered-campain.component';
import { TriggeredCreateoreditComponent } from './triggered-createoredit/triggered-createoredit.component';
import { EditlistTabComponent } from './list-tabs/editlist-tab/editlist-tab.component';
import { EditnewListsComponent } from './editnew-lists/editnew-lists.component';

const routes: Routes = [
  { path: "EmailDashBoard", component: EmailDashBoardComponent },
  { path: 'TriggeredCampaigns', component: TriggeredCampainComponent },
  { path: "CreateTriggerCampaign/EditTriggerCampaign", component: TriggeredCreateoreditComponent },
  { path: "Lists", component: ListComponent },
  { path: 'CreateNewList/EditNewList', component: CreatenewListsComponent },
  { path: "GetEditlist", component: EditnewListsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
