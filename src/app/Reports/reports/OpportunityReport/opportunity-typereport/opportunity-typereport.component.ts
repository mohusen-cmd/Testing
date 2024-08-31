import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as XLSX from 'xlsx';///excel
import { DatePipe } from '@angular/common';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-opportunity-typereport',
  templateUrl: './opportunity-typereport.component.html',
  styleUrls: ['./opportunity-typereport.component.scss'],
  providers: [DatePipe]
})
export class OpportunityTypereportComponent implements OnInit {
  exportActive: boolean = false;

  myDate: string;
  startDate: any = '2022-01-01';
  endDate: any;
  BusinessTypeID: number = 0;

  SignUpFrom: FormGroup;

  drpList: any;
  rowData=[];

  userName: any;
  
  gridOptions:GridOptions;

  columnDefs:ColDef[]=[
    { headerName: 'Opportunity Type', field: 'TypeName' },
    { headerName: 'Opportunity Name', field: 'OpportunityName' },
    { headerName: 'Buying Stage', field: 'StageName' },
    { headerName: 'Contact Name', field: 'ContactName' },
    { headerName: 'Phone', field: 'ContactPhone' },
    { headerName: 'Probability', field: 'TypeName' },
    { headerName: 'Expected Budget', field: 'ExpectedRevenue' },
    { headerName: 'Estimated Closing Date', field: 'CloseDate' },
    { headerName: 'Created Date', field: 'CreatedDate' },
    
  ]
 

  defaultColDef:ColDef={
    sortable: true,
    filter: true,
  }

  //myDate = Date.now();
  constructor(public as: AuthenticationService,
     private fb: FormBuilder, 
     private claimsHelper: ClaimsHelper,
      private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
   this.gridOptions={
    columnDefs:this.columnDefs,
    defaultColDef:this.defaultColDef,
    paginationPageSize: 12, // Number of rows Per Page
    pagination: true, // Enable pagination
  
   }   
   
    this.userName = this.claimsHelper.GetUserNameAPIKeyFromClaims();
  }

  ngOnInit(): void {
    
    this.endDate = this.myDate;
    this.getOpportunityTypeReportDropdown()
    this.getOpportunityTypeReport()
    this.OpportunityForm()
 
  }
  OpportunityForm() {
    this.SignUpFrom = this.fb.group({
      startDate: new FormControl(),
      endDate: new FormControl(),
      BusinessTypeID: new FormControl(),
    });
  }
  getOpportunityTypeReportDropdown() {
    this.as.getOpportunityTypeReportDropdown().subscribe(res => {
      console.log(res);
      this.drpList = res;
    })
  }

 
  onSubmit() {
    this. getOpportunityTypeReport()

  }
  getOpportunityTypeReport() {
    this.as.getOpportunityTypeReport(this.startDate, this.endDate, this.BusinessTypeID).subscribe(res => {
      console.log(res);
     this.rowData=res
    })
    
  }
 


  public print() {
    window.print();
  }

  ////excel download
  export() {
   this.exportActive = true;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ActivityReport.xlsx');

  }

}