import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as apexCharts from 'apexcharts';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    public barBasicChartData: any;

    public barBasicChartOption: any;
    @ViewChild('barBasicChart', { static: false }) barBasicChart: ElementRef; // used barStackedChart, barHorizontalChart
    public barBasicChartTag: CanvasRenderingContext2D;

    public barBasicStackChartData: any;
    public barStackedChartOption: any;
    @ViewChild('barStackedChart', { static: false }) barStackedChart: ElementRef; // used barStackedChart, barHorizontalChart
    public barBasicStackChartTag: CanvasRenderingContext2D;

    public lineIPMChartData: any;
    public lineIPMChartOption: any;
    @ViewChild('lineIPMChart', { static: false }) lineIPMChart: ElementRef;
    public lineIPMChartTag: CanvasRenderingContext2D;

    public areaBasicChartData: any;
    public areaBasicChartOption: any;
    @ViewChild('areaBasicChart', { static: false }) areaBasicChart: ElementRef;
    public areaBasicChartTag: CanvasRenderingContext2D;

    public areaFillOriginChartData: any;
    @ViewChild('areaFillOriginChart', { static: false }) areaFillOriginChart: ElementRef;
    public areaFillOriginChartTag: CanvasRenderingContext2D;

    public areaFillEndChartData: any;
    @ViewChild('areaFillEndChart', { static: false }) areaFillEndChart: ElementRef;
    public areaFillEndChartTag: CanvasRenderingContext2D;

    public areaRadar1ChartData: any;
    @ViewChild('areaRadar1Chart', { static: false }) areaRadar1Chart: ElementRef;
    public areaRadar1ChartTag: CanvasRenderingContext2D;

    public areaRadar2ChartData: any;
    @ViewChild('areaRadar2Chart', { static: false }) areaRadar2Chart: ElementRef;
    public areaRadar2ChartTag: CanvasRenderingContext2D;

    public areaRadar3ChartData: any;
    @ViewChild('areaRadar3Chart', { static: false }) areaRadar3Chart: ElementRef;
    public areaRadar3ChartTag: CanvasRenderingContext2D;

    public CountByMonth: any;
    @ViewChild('pieChart', { static: false }) pieChart: ElementRef; // doughnut
    public pieChartTag: CanvasRenderingContext2D;


    loginid: any = 1;
    roleId: any = 1;
    dataSource: any;
    Companies: any;
    IsContact: any;
    IsLeads: any;
    IsOpportunity: any;

    data: any;
    LeadCountByMonth: any[] = [];
    CountByQuater: { labels: string[]; datasets: { data: any[]; backgroundColor: (string | CanvasGradient)[]; hoverBackgroundColor: (string | CanvasGradient)[]; }[]; };
    LeadCountByQuater: any[] = [];
    OpportunityCount: any[] = [];
    Opportunity: { labels: string[]; datasets: { data: any[]; backgroundColor: (string | CanvasGradient)[]; hoverBackgroundColor: (string | CanvasGradient)[]; }[]; };
    Salesperson: string[] = [];
    LstSalesPersoncount: { labels: string[]; datasets: { data: any[]; backgroundColor: (string | CanvasGradient)[]; hoverBackgroundColor: (string | CanvasGradient)[]; }[]; };
    SalesPersoncount: any[] = [];
    //
    istestChart: boolean = false
    AddReportArray = [];
    AddReportChart = {};
    columnChartOptions={}
    chartData:any[]=[]
    SalesChartArray = [];
    SalesChart = {};
    LeadCountByMonthArray = [];
    LeadCountByMonthChart = {};
    LeadCountByQuarterArray = [];
    LeadCountByQuarterChart = {};
    //
    constructor(public dashboardservice: DashboardService,public commonservice:CommonService, public claims: ClaimsHelper,
        private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.getAdminDashboard()
    }

    getAdminDashboard() {
        this.commonservice.GetGoogleanalyticsdata().subscribe((res)=>{debugger
            console.log(res)
            this.chartData = Object.keys(res).map(key => ({
                channel: res[key].DefaultChannelGrouping, // Use the property key as the channel
                Users: res[key].Users,
                NewUsers: res[key].NewUsers,
                AnalyticSessions: res[key].AnalyticSessions,
                bouncerate:res[key].BounceRate,
                pagesession:res[key].PagesSession
              }));
        
               const barChartOptions = {
              chart: {
                type: 'bar',
                stacked: true // Stacked bar chart
              },
              xaxis: {
                categories: this.chartData.map(data => data.channel)
              },
              series: [
                {
                  name: 'Users',
                  data: this.chartData.map(data => data.Users )
                },
                {
                  name: 'New Users',
                  data: this.chartData.map(data => data.NewUsers    )
                },
                {
                  name: 'Analytics Sessions',
                  data: this.chartData.map(data => data.AnalyticSessions)
                }
              ],
              yaxis: {
                title: {
                  text: 'DefaultChannelGrouping'
                }
              },
              plotOptions: {
                bar: {
                  horizontal: true // Horizontal bars
                }
              },
              legend: {
                position: 'top'
              }
            };
        
            // Render the chart
            const chart = new ApexCharts(document.getElementById('chart'), barChartOptions);
            chart.render();
      
          //second
      
          const verticalBarChartOptions = {
            chart: {
              type: 'bar', // Change to bar chart
              stacked: true
            },
            xaxis: {
              categories: this.chartData.map(data => data.channel)
            },
            series: [
              {
                name: 'Users',
                data: this.chartData.map(data => data.Users)
              },
              {
                name: 'New Users',
                data: this.chartData.map(data => data.NewUsers)
              },
              {
                name: 'Analytics Sessions',
                data: this.chartData.map(data => data.AnalyticSessions)
              }
            ],
            yaxis: {
              title: {
                text: 'DefaultChannelGrouping'
              }
            },
            plotOptions: {
              bar: {
                horizontal: false // Vertical bars
              }
            },
            legend: {
              position: 'top'
            }
          };
      
          const verticalChart = new ApexCharts(document.getElementById('chart1'), verticalBarChartOptions);
          verticalChart.render();
      
      
          // Render the third chart (pie)
      const pieChartOptions = {
        chart: {
          type: 'pie',
        },
        series: this.chartData.map(data => data.bouncerate),
        labels: this.chartData.map(data => data.channel),
        title: {
          text: 'BounceRate',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            color: '#263238'
          }
        }
      };
      
      const pieChart = new ApexCharts(document.getElementById('chart2'), pieChartOptions);
      pieChart.render();
      
      
      
      
      const lineChartOptions = {
        chart: {
          type: 'line',
        },
        series: [{
          name: 'Page Sessions',
          data: this.chartData.map(data => data.pagesession)
        }],
        xaxis: {
          categories: this.chartData.map(data => data.channel)
        },
        yaxis: {
          title: {
            text: 'Page Sessions'
          }
        },
        title: {
          text: 'Page Sessions Chart',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            color: '#263238'
          },
        },
      };
      
      const lineChart = new ApexCharts(document.getElementById('chart4'), lineChartOptions);
      lineChart.render();
        });

        this.spinner.show()
        let loginid = this.claims.GetUserIdAPIKeyFromClaims()
        let RoleId = this.claims.GetRoleIdAPIKeyFromClaims()
        this.dashboardservice.GetAdminDashboard(loginid, RoleId).subscribe((response) => {
           
            this.dataSource = response;
            this.spinner.hide()
            this.Companies = this.dataSource.LstModulesCount[0].Companies;
            this.IsContact = this.dataSource.LstModulesCount[0].IsContact;
            this.IsLeads = this.dataSource.LstModulesCount[0].IsLeads;
            this.IsOpportunity = this.dataSource.LstModulesCount[0].IsOpportunity;
            this.LeadCountByMonth.push(this.dataSource.LstAdminleadcount[0].LeadCountByMonth)
            this.LeadCountByQuater.push(this.dataSource.LstAdminleadcount[0].LeadCountByQuater)
            this.OpportunityCount.push(this.dataSource.LstAdminleadcount[0].OpportunityCount)
            this.Salesperson.push(this.dataSource.LstSalesPersoncount[0].Salesperson)
            this.SalesPersoncount.push(this.dataSource.LstSalesPersoncount[0].Cold)
            this.SalesPersoncount.push(this.dataSource.LstSalesPersoncount[0].Hot)
            this.SalesPersoncount.push(this.dataSource.LstSalesPersoncount[0].Warm)
            this.AddReportArray = [];
            //this.AddReportArray.push(['Delivered','Bounced','Active']); 
            var Opp = this.dataSource.LstAdminleadcount[0]?.OpportunityCount;

            var xvalues = ["NAOpportunityme", "DeliveOppred"];
            var Yvalues = ["Email", Number(Opp)];
            //for(var i=0;i<=2;i++){
            this.AddReportArray.push(["Opportunity", "Total Activites"]);
            this.AddReportArray.push(["Total Activites", Number(Opp)]);
            this.istestChart = true
            console.log(this.AddReportArray)
            this.AddReportChart = {
                chartType: 'PieChart',
                dataTable: this.AddReportArray,
                options: {
                    //  vAxis: { minValue: 0 },
                    colors: ['#01C0C8', '#FB9678', '#FB9000'],
                    height: 300,
                    chartArea: { width: '75%', left: 0 },
                    legend: { 'position': 'top' },
                    is3D: true

                },

            };
            var Cold = this.dataSource.LstSalesPersoncount[0]?.Cold;
            var Hot = this.dataSource.LstSalesPersoncount[0]?.Hot;
            var Warm = this.dataSource.LstSalesPersoncount[0]?.Warm;
            this.SalesChartArray.push(["Title", "Cold", "Hot", "Warm"]);
            this.SalesChartArray.push([this.dataSource.LstSalesPersoncount[0]?.Salesperson, Number(Cold), Number(Hot), Number(Warm)]);
            this.istestChart = true

            this.SalesChart = {
                chartType: 'ColumnChart',
                dataTable: this.SalesChartArray,
                options: {
                    //  vAxis: { minValue: 0 },
                    colors: ['#01C0C8', '#FB9678', '#FB9000'],
                    height: 300,
                    chartArea: { width: '75%', left: 0 },
                    legend: { 'position': 'top' },
                    is3D: true

                },

            };

            var LeadCountByMonth = this.dataSource.LstAdminleadcount[0]?.LeadCountByMonth;
            this.LeadCountByMonthArray.push(["Title", "LeadCountByMonth"]);
            this.LeadCountByMonthArray.push(['Current Month', Number(LeadCountByMonth)]);
            this.istestChart = true

            this.LeadCountByMonthChart = {
                chartType: 'PieChart',
                dataTable: this.LeadCountByMonthArray,
                options: {
                    //  vAxis: { minValue: 0 },
                    colors: ['#FB9000'],
                    height: 300,
                    chartArea: { width: '75%', left: 0 },
                    legend: { 'position': 'top' },
                    is3D: true

                },

            };
            var LeadCountByQuater = this.dataSource.LstAdminleadcount[0]?.LeadCountByQuater;
            this.LeadCountByQuarterArray.push(["Title", "LeadCountByQuater"]);
            this.LeadCountByQuarterArray.push(['Current Quarter', Number(LeadCountByQuater)]);
            this.istestChart = true

            this.LeadCountByQuarterChart = {
                chartType: 'PieChart',
                dataTable: this.LeadCountByQuarterArray,
                options: {
                    //  vAxis: { minValue: 0 },
                    colors: ['#FB0678'],
                    height: 300,
                    chartArea: { width: '75%', left: 0 },
                    legend: { 'position': 'top' },
                    is3D: true

                },

            };
        })


        setTimeout(() => {


            const pieTag = (this.pieChart.nativeElement as HTMLCanvasElement).children;
            this.pieChartTag = pieTag['pie_chart'].lastChild.getContext('2d'); // doughnut_chart
            const cdef = this.pieChartTag.createLinearGradient(100, 0, 300, 0);
            cdef.addColorStop(0, '#4caf50');
            cdef.addColorStop(1, '#4caf50');
            const wxyz = this.pieChartTag.createLinearGradient(100, 0, 300, 0);
            wxyz.addColorStop(0, '#FF9800');
            wxyz.addColorStop(1, '#FF9800');

            this.CountByMonth = {
                labels: ['LeadCountByMonth'],
                datasets: [
                    {
                        data: this.LeadCountByMonth,
                        backgroundColor: [cdef, wxyz, '#f44336'],
                        hoverBackgroundColor: [cdef, wxyz, '#f44336']
                    }
                ]
            };
            this.CountByQuater = {
                labels: ['LeadCountByQuater'],
                datasets: [
                    {
                        data: this.LeadCountByQuater,
                        backgroundColor: [cdef, wxyz, '#f44336'],
                        hoverBackgroundColor: [cdef, wxyz, '#f44336']
                    }
                ]
            };
            // this.CountByQuater = {
            //     labels: ['Cold','Hot','Warm'],
            //     datasets: [
            //         {
            //             data: this.LeadCountByQuater,
            //             backgroundColor: [cdef, wxyz, '#f44336'],
            //             hoverBackgroundColor: [cdef, wxyz, '#f44336']
            //         }
            //     ]
            // };
            this.LstSalesPersoncount = {
                labels: ['Cold', 'Hot', 'Warm'],
                datasets: [
                    {
                        data: this.SalesPersoncount,
                        backgroundColor: [cdef, wxyz, '#f44336'],
                        hoverBackgroundColor: [cdef, wxyz, '#f44336']
                    }
                ]
            };
            this.Opportunity = {
                labels: ['Total Activites'],
                datasets: [
                    {
                        data: this.OpportunityCount,
                        backgroundColor: [cdef, wxyz, '#f44336'],
                        hoverBackgroundColor: [cdef, wxyz, '#f44336']
                    }
                ]
            };
        });
    }

}
