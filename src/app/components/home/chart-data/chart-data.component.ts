import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { OAuthQuickBookService } from 'src/app/services/OAuthquickbook.Service';
import { CommonService } from 'src/app/services/common.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.scss']
})
export class ChartDataComponent implements OnInit {
  supportChartData: any = {};
  data: any[];
  constructor(
    public claimsHelper: ClaimsHelper,
    private spinner: NgxSpinnerService,
    public dashboardservice: DashboardService) {

  }

  ngOnInit(): void {
    this.spinner.show()
    let loginid = this.claimsHelper.GetUserIdAPIKeyFromClaims()
    let RoleId = 1
    this.data = []
    this.dashboardservice.GetAdminDashboard(loginid, RoleId).subscribe((response: any) => {
      this.spinner.hide()
      this.data.push(response.LstModulesCount[0]?.IsLeads)
      this.data.push(response.LstModulesCount[0]?.IsContact);
      this.data.push(response.LstModulesCount[0]?.Companies)
      this.data.push(response.LstModulesCount[0]?.IsOpportunity);
      this.supportChartData = {
        chart: {
          type: 'area',
          height: 100,
          sparkline: {
            enabled: true
          }
        },
        colors: ['#4680ff'],
        stroke: {
          curve: 'smooth',
          width: 3
        },
        series: [
          {
            data: this.data
          }
        ],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: (seriesName) => 'CRM'
            }
          },
          marker: {
            show: false
          }
        }
      };
    }, (error) => {
      this.spinner.hide()
    })

  }

}
