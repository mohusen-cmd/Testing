import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { charts } from 'highcharts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { NgxSpinnerService } from 'ngx-spinner';

export type ChartOptions = {
  series: any[];
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any,
  title: any[]
};
@Component({
  selector: 'app-invoice-dashboard',
  templateUrl: './invoice-dashboard.component.html',
  styleUrls: ['./invoice-dashboard.component.scss']
})
export class InvoiceDashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(public dashboardservice: DashboardService,
    public claimshelper: ClaimsHelper,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.GetInvoiceDashBoard()
  }

  GetInvoiceDashBoard() {
    this.spinner.show()
    let loginid = this.claimshelper.GetUserIdAPIKeyFromClaims()
    let RoleId = this.claimshelper.GetRoleIdAPIKeyFromClaims()
    var chartlist = []
    this.dashboardservice.GetInvoiceDashboard(loginid, RoleId).subscribe((data) => {
      this.spinner.hide()
      chartlist.push(data["DashboardInvoiceCount"])
      chartlist.push(data["DashboardPayment"])
      chartlist.push(data["DashboardStatus"])
      var series = []
      var labels = []
      var chartdata: any = []
      for (let i = 0; i < chartlist.length; i++) {
        labels.push(Object.keys(chartlist[i]))
        series.push(Object.values(chartlist[i]))
        this.chartOptions = {
          series: series[i],
          chart: {
            width: 380,
            type: "donut"
          },
          labels: labels[i],
          title: [],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };
        chartdata.push(this.chartOptions)
        if (i == 0) {
          chartdata[i].title.push('Invoice overdue')

          chartdata[i].chart["type"] = 'donut'
        }
        if (i == 1) {
          chartdata[i].title.push('Payment Mode')
          chartdata[i].chart["type"] = 'pie'
        }
        if (i == 2) {
          chartdata[i].title.push('Payment Status')
          chartdata[i].chart["type"] = 'pie'
        }
      }

      this.chartOptions = chartdata
      console.log(this.chartOptions)
    })
  }
}
