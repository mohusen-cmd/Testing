import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as XLSX from 'xlsx';///excel
import { DatePipe } from '@angular/common';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-opportunity-by-buyingstage',
  templateUrl: './opportunity-by-buyingstage.component.html',
  styleUrls: ['./opportunity-by-buyingstage.component.scss'],
  providers: [DatePipe]
})
export class OpportunityByBuyingstageComponent implements OnInit {
  userName:any;

  startDate:any= '2022-01-01';
  endDate:any
  StageID:any = 0;
  myDate: string;

  drpList:any
  rowData=[]

  SignUpFrom:FormGroup
  exportActive: boolean=false;

  gridOptions:GridOptions;

  columnDefs:ColDef[]=[
    { headerName: 'Buying Stage', field: 'StageName' },
    { headerName: 'Opportunity Name', field: 'OpportunityName' },
    { headerName: 'Contact Name', field: 'ContactName' },
    { headerName: 'Phone', field: 'ContactPhone' },
    { headerName: 'Probability', field: 'TypeName' },
    { headerName: 'Expected Budget', field: 'ExpectedRevenue' },
    { headerName: 'Estimated Closing Date', field: 'CloseDate' },
    { headerName: 'Created Date ', field: 'CreatedDate' },
  ]

  defaultColDef:ColDef={
    sortable: true,
    filter: true,
  }

  

constructor(
  public as:AuthenticationService,
  public fb:FormBuilder,
  public datePipe:DatePipe,
  public ClaimsHelper:ClaimsHelper
){
this.myDate=this.datePipe.transform(new Date(),'yyyy-MM-dd');
this.gridOptions={
  columnDefs:this.columnDefs,
  defaultColDef:this.defaultColDef,
  paginationPageSize: 12, // Number of rows Per Page
  pagination: true, // Enable pagination


}
this.userName=this.ClaimsHelper.GetUserNameAPIKeyFromClaims();
}

  ngOnInit(): void {
  this.endDate=this.myDate;
  this.OpportunityForm();
  this.getOpportunityBuyingStageReportDropdown();
  this.getOpportunityByBuyingStageReport();
  }

  OpportunityForm(){
 this.SignUpFrom=this.fb.group({
  startDate:new FormControl(),
  endDate:new FormControl(),
  StageID:new FormControl(),
 })
  }

  getOpportunityBuyingStageReportDropdown(){
 this.as.getOpportunityBuyingStageReportDropdown().subscribe((res:any)=>{
  console.log(res)
 this.drpList=res
 })
  }

  getOpportunityByBuyingStageReport(){
this.as.getOpportunityByBuyingStageReport(this.startDate, this.endDate, this.StageID).subscribe((res:any)=>{
  console.log(res)
 this.rowData=res
})
  }
  
  print(){
    window.print()
  }
  exportAsExcel(){
    this.exportActive = true;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ActivityReport.xlsx');
  }
  onSubmit(){
    this. getOpportunityByBuyingStageReport();
  }
}
