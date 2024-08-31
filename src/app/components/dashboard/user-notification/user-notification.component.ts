import { Component, OnInit } from '@angular/core';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardModule } from '../dashboard.module';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent implements OnInit {
  notifList: any;
  pageSize: any = 100
  todate = new Date()
  empid: any = 1;
  status: any = 1;
  p: any
  size: any = 3
  constructor(public as: AuthenticationService, public claimsHelper: ClaimsHelper,
    public dashBoardService: DashboardService) { }

  ngOnInit(): void {
    this.empid = this.claimsHelper.GetUserIdAPIKeyFromClaims()
    this.getNoticationList()
    this.getNoticationCount()
  }

  getNoticationCount() {
    let userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    let roleId = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
    this.dashBoardService.GetEmpNotificationcount(roleId, userId).subscribe(res => { })
  }

  getNoticationList() {
    this.dashBoardService.GetEmpNotification(this.empid, this.status).subscribe((res: any) => {
      
      for (let i = 0; i < res.length; i++) {
        res[i].DueDate = new Date(Date.parse(res[i].DueDate.toString()));
      }
      this.notifList = res;
    })
  }

}
