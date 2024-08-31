import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { TriggeredCampainComponent } from './triggered-campain/triggered-campain.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailDashBoardComponent } from './email-dash-board/email-dash-board.component';
import { TriggeredCreateoreditComponent } from './triggered-createoredit/triggered-createoredit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { ListComponent } from './list/list.component';
import { CreatenewListsComponent } from './createnew-lists/createnew-lists.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ListLeadsComponent } from './list-tabs/list-leads/list-leads.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListContactsComponent } from './list-tabs/list-contacts/list-contacts.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListOpperComponent } from './list-tabs/list-opper/list-opper.component';
import { CreatesavepopupComponent } from './list-tabs/createsavepopup/createsavepopup.component';
import { EditlistTabComponent } from './list-tabs/editlist-tab/editlist-tab.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditcontactListComponent } from './list-tabs/editcontact-list/editcontact-list.component';
import { EditnewListsComponent } from './editnew-lists/editnew-lists.component';
import { EditopperlistComponent } from './list-tabs/editopperlist/editopperlist.component';
import { ViewtriggeredpopupComponent } from './viewtriggeredpopup/viewtriggeredpopup.component';

import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    TriggeredCampainComponent,
    EmailDashBoardComponent,
    TriggeredCreateoreditComponent,
    ListComponent,
    CreatenewListsComponent,
    ListLeadsComponent,
    ListContactsComponent,
    ListOpperComponent,
    CreatesavepopupComponent,
    EditlistTabComponent,
    EditcontactListComponent,
    EditnewListsComponent,
    EditopperlistComponent,
    ViewtriggeredpopupComponent
  ],
  imports: [
    CommonModule,MatCheckboxModule, MatDialogModule, MatStepperModule, MatTabsModule,NgbNavModule,NgxPaginationModule,MatProgressSpinnerModule,
    EmailRoutingModule, SharedModule, MatTableModule, MatSelectModule,MatPaginatorModule, FormsModule, ReactiveFormsModule,NgbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[EditlistTabComponent,EditcontactListComponent,EditopperlistComponent]
})
export class EmailModule { }
