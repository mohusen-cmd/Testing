import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as XLSX from 'xlsx';//excel
import { DatePipe } from '@angular/common';
import { ReportsService } from 'src/app/services/reports.service';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-activity-by-priorityreport',
  templateUrl: './activity-by-priorityreport.component.html',
  styleUrls: ['./activity-by-priorityreport.component.scss'],
  providers: [DatePipe]
})
export class ActivityByPriorityreportComponent implements OnInit {
  private gridApi: GridApi;
  myDate: string;
  startDate: any = '2022-01-01';
  endDate: any;
  SignUpFrom: FormGroup;
  userName: any;
  PriorityID: number = 0;
  drpList: any;

  exportActive: boolean = false;
  isLoading: boolean = false;

  gridOptions: GridOptions;
  columnDefs: ColDef[] = [
    { headerName: 'Priority Name', field: 'PriorityName' },
    { headerName: 'Status Name', field: 'StatusName' },
    { headerName: 'Contact Name', field: 'ContactName' },
    { headerName: 'Owner Name', field: 'OwnerName' },
    { headerName: 'Due Date', field: 'DueDate' },
    { headerName: 'Created Date', field: 'CreatedDate' },
    { headerName: 'Module', field: 'AccountTypeName' },
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };


  rowData = [];
  constructor(
    public as: AuthenticationService,
    private fb: FormBuilder,
    private claimsHelper: ClaimsHelper,
    private datePipe: DatePipe,
    public reportsservice: ReportsService) {
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.ActivitiesForm();
    this.userName = this.claimsHelper.GetUserNameAPIKeyFromClaims();
    this.gridOptions = {columnDefs: this.columnDefs,defaultColDef: this.defaultColDef,
                         paginationPageSize: 12, // Number of rows Per Page
                        pagination: true, // Enable pagination

    };
  }

  ngOnInit(): void {
    this.endDate = this.myDate;
    this.getActivitesPriorityReportDropdown()
    this.getActivitesPriorityReport()
    this.ActivitiesForm()

  }
  ActivitiesForm() {
    this.SignUpFrom = this.fb.group({
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.myDate),
      PriorityID: new FormControl(this.PriorityID),
    });
  }



  // for getting only priority response dropdownlist
  getActivitesPriorityReportDropdown() {
    this.reportsservice.GetActivitesPriorityReportDropdown().subscribe((res: any) => {
      console.log(res)
      this.drpList = res
      
    })
  }


  

  onSubmit() {
    this.getActivitesPriorityReport()
  }
  getActivitesPriorityReport() {
    this.reportsservice.GetactivitesPriorityIDReport(this.startDate, this.endDate, this.PriorityID).subscribe((res: any) => {
      console.log(res)
      this.rowData = res
    })
  }
  TostartDate($event) {
    const year = $event.getFullYear();
    const month = String($event.getMonth() + 1).padStart(2, '0');
    const day = String($event.getDate()).padStart(2, '0');
    this.startDate = `${year}-${month}-${day}`;
  }
  ToEndDate($event) {
    const year = $event.getFullYear();
    const month = String($event.getMonth() + 1).padStart(2, '0');
    const day = String($event.getDate()).padStart(2, '0');
    this.endDate = `${year}-${month}-${day}`;
  }



  print(){
    window.print()
  }
  





  exportAsExcel() {
    this.exportActive = true;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ActivityReport.xlsx');
    
  }

  
  // public downloadPDF(): void {
  //   const grid = document.getElementById('TABLE');
  
  //   // Wait for the grid to be fully rendered
  //   this.gridOptions.api?.addEventListener('firstDataRendered', () => {
  //     html2canvas(grid).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size
  //       pdf.save('ActivityReport.pdf');
  //     });
  //   });
  // }
  
}
