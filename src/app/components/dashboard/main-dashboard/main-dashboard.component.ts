import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";
import { ChartComponent } from "ng-apexcharts";
import { DashboardService } from 'src/app/services/dashboard.service';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    title: any;

};
@Component({
    selector: 'app-main-dashboard',
    templateUrl: './main-dashboard.component.html',
    styleUrls: ['./main-dashboard.component.scss'],
    providers: [DatePipe]
})
export class MainDashboardComponent implements OnInit {
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    series: any = []
    chartlist: any = []
    labels: any = []
    dataActivity: any[] = [];
    dateObj = new Date();
    yearMonth = this.dateObj.getUTCFullYear() + '-' + (this.dateObj.getUTCMonth() + 1);
    data = {

    }

    public barBasicChartData: any;

    public barBasicChartOption: any;
    @ViewChild('calendar') calendarComponent: FullCalendarComponent;
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

    public pieChartData: any;
    @ViewChild('pieChart', { static: false }) pieChart: ElementRef; // doughnut
    public pieChartTag: CanvasRenderingContext2D;



    dataSource: any;
    Companies: any;
    IsContact: any;
    IsLeads: any;
    IsOpportunity: any;
    doughnutChartData: { labels: string[]; datasets: { data: any[]; backgroundColor: (string | CanvasGradient)[]; hoverBackgroundColor: (string | CanvasGradient)[]; }[]; };
    CompanyActCount: any[] = [];
    CompanypieChartData: { labels: string[]; datasets: { data: any[]; backgroundColor: (string | CanvasGradient)[]; hoverBackgroundColor: (string | CanvasGradient)[]; }[]; };
    ContactChartData: { labels: string[]; datasets: { data: number[]; backgroundColor: (string | CanvasGradient)[]; hoverBackgroundColor: (string | CanvasGradient)[]; }[]; };
    totalActivity: any;
    otherActivity: number;
    ContactActCount: any[] = [];
    LeadChartData: { labels: string[]; datasets: { data: any[]; backgroundColor: (string | CanvasGradient)[]; hoverBackgroundColor: (string | CanvasGradient)[]; }[]; };
    leadActCount: any[] = [];
    OppChartData: { labels: string[]; datasets: { data: any[]; backgroundColor: (string | CanvasGradient)[]; hoverBackgroundColor: (string | CanvasGradient)[]; }[]; };
    OppActCount: any[] = [];
    AgentCount: any[] = [];
    activeItemId: any = 1
    @ViewChild('navPills') navPills?: NgbNav;

    constructor(public dashboardservice: DashboardService,
        public claims: ClaimsHelper,
        private datePipe: DatePipe,
        public routerlink: Router,
        public route: ActivatedRoute,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private spinner: NgxSpinnerService) {

    }

    ngOnInit() {
        this.route.queryParams.subscribe((queryParams) => {
            
            if (queryParams.back == "scheduler") {
                this.activeItemId = 2
                this.activateTab('2'); //t the activeItemId to '2' when the "back" query parameter is "scheduler"
            } else {
                // Set the activeItemId to the default value or another value if needed
                this.activeItemId = 1
                this.activateTab('1'); // For example, set to '1' when "back" is not "scheduler"
            }
            this.getAdminDashboard();
            this.GetDashBoard()
        })


    }
    activateTab(tabId: string): void {
        if (this.navPills) {
            this.navPills.select(tabId);
        }
    }
    GetDashBoard() {
        let loginid = this.claims.GetUserIdAPIKeyFromClaims()
        let RoleId = this.claims.GetRoleIdAPIKeyFromClaims()
        this.dashboardservice.GetDashboardData(loginid, RoleId).subscribe((response) => {
           
        })
    }
    getAdminDashboard() {
        this.spinner.show()
        let loginid = this.claims.GetUserIdAPIKeyFromClaims()
        let RoleId = 1

        this.dashboardservice.GetAdminDashboard(loginid, RoleId).subscribe((response) => {
            this.spinner.hide()
            this.dataSource = response;
            this.Companies = this.dataSource.LstModulesCount[0]?.Companies;
            this.IsContact = this.dataSource.LstModulesCount[0]?.IsContact;
            this.IsLeads = this.dataSource.LstModulesCount[0]?.IsLeads;
            this.IsOpportunity = this.dataSource.LstModulesCount[0]?.IsOpportunity;

            this.totalActivity = this.dataSource.LstActivityDshCount[0]?.CompanyActCount +
                this.dataSource.LstActivityDshCount[0]?.ContactActCount +
                this.dataSource.LstActivityDshCount[0]?.OpportunityActCount +
                this.dataSource.LstActivityDshCount[0]?.AgentCount +
                this.dataSource.LstActivityDshCount[0]?.LeadCount
            console.log(this.totalActivity)
            this.otherActivity = this.totalActivity - (this.dataSource.LstActivityDshCount[0]?.OpenCount + this.dataSource.LstActivityDshCount[0]?.CompCount)
            this.dataActivity.push(this.dataSource.LstActivityDshCount[0]?.OpenCount)
            this.dataActivity.push(this.dataSource.LstActivityDshCount[0]?.CompCount)
            this.dataActivity.push(this.otherActivity)
            this.series.push(this.dataActivity)


            this.CompanyActCount.push(this.dataSource.LstActivityDshCount[0]?.CompanyActCount);
            this.CompanyActCount.push(this.totalActivity);
            this.series.push(this.CompanyActCount)


            this.ContactActCount.push(this.dataSource.LstActivityDshCount[0]?.ContactActCount);
            this.ContactActCount.push(this.totalActivity);
            this.series.push(this.ContactActCount)


            this.leadActCount.push(this.dataSource.LstActivityDshCount[0]?.LeadCount);
            this.leadActCount.push(this.totalActivity);
            this.series.push(this.leadActCount)


            this.OppActCount.push(this.dataSource.LstActivityDshCount[0]?.OpportunityActCount);
            this.OppActCount.push(this.totalActivity);
            this.series.push(this.OppActCount)


            this.AgentCount.push(this.dataSource.LstActivityDshCount[0]?.AgentCount);
            this.AgentCount.push(this.totalActivity);
            this.series.push(this.AgentCount)

            for (let i = 0; i < this.series.length; i++) {

                this.chartOptions = {
                    series: this.series[i],
                    chart: {
                        width: 380,
                        type: "pie"
                    },
                    labels: [],
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
                this.chartlist.push(this.chartOptions)
                if (i == 0) {
                    this.chartlist[i].labels.push("Open")
                    this.chartlist[i].labels.push("Completed")
                    this.chartlist[i].labels.push("Total Activities")
                    this.chartlist[i].title.push('Activity Status')
                }
                if (i == 1) {
                    this.chartlist[i].labels.push("Companies")
                    this.chartlist[i].labels.push("Total Activities")
                    this.chartlist[i].title.push('Company')
                }
                if (i == 2) {
                    this.chartlist[i].labels.push("Contact")
                    this.chartlist[i].labels.push("Total Activities")
                    this.chartlist[i].title.push('Contact')
                }
                if (i == 3) {
                    this.chartlist[i].labels.push("Lead")
                    this.chartlist[i].labels.push("Total Activities")
                    this.chartlist[i].title.push('Leads')
                }
                if (i == 4) {
                    this.chartlist[i].labels.push("Opportunity")
                    this.chartlist[i].labels.push("Total Activities")
                    this.chartlist[i].title.push('Opportunity')
                }
                if (i == 5) {
                    this.chartlist[i].labels.push("Converted")
                    this.chartlist[i].labels.push("Total Activities")
                    this.chartlist[i].title.push('Converted')
                    this.chartlist[i].chart.type = 'donut'
                }
            }
            this.chartOptions = this.chartlist
        })
    }
}
