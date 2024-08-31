import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ColDef, GridOptions } from "ag-grid-community";
import { ReportsService } from "src/app/services/reports.service";
import * as XLSX from 'xlsx';//excel


@Component({
  selector: 'app-activity-modelreport',
  templateUrl: './activity-modelreport.component.html',
  styleUrls: ['./activity-modelreport.component.scss'],
  providers:[DatePipe]
})
export class ActivityModelreportComponent implements OnInit {
  SignUpFrom:FormGroup

  startDate:any= '2022-01-01';
 endDate:any
 AccountTypeID:number =0
 myDate:string


 ModelApiResult=[]
 DropApiData:any
  exportActive: boolean=false;


  gridOptions:GridOptions
  columnDefs:ColDef[]=[
    {headerName:'Activity Type ',field:'ActivityName'},
    {headerName:'Priority ',field:'PriorityName'},
    {headerName:'Status  ',field:'StatusName'},
    {headerName:'Contact Name',field:'ContactName'},
    {headerName:'Phone ',field:'ContactPhone'},
    {headerName:'Subject ',field:'Subject'},
    {headerName:' Activity Name',field:'ActivityName'},
    {headerName:'Activity Owner',field:'OwnerName'},
    {headerName:'Due Date',field:'DueDate'},
    {headerName:'Created Date',field:'CreatedDate'},
    {headerName:'Module',field:'AccountTypeName'},
  ]

  defaultColDef:any={
    sortable: true,
    filter: true,
  }

  
  constructor(
    public reportservice:ReportsService,
    public fb:FormBuilder,
    public datePipe:DatePipe,
  ){
  this.myDate=this.datePipe.transform(new Date(),'yyyy-MM-dd')
  this.gridOptions={
    columnDefs:this.columnDefs,
    defaultColDef:this.defaultColDef,
    paginationPageSize: 12, // Number of rows Per Page
    pagination: true, // Enable pagination
  }
  }

  ngOnInit(): void {
    this.endDate=this.myDate
    this.ActivitiesForm()
   this.getActivitesModelReport()
   this.getActivitesModelReportDropdown()
   
  }
  
  ActivitiesForm(){
  this.SignUpFrom=this.fb.group({
    startDate:new FormControl(this.startDate),
    endDate:new FormControl(this.myDate),
    AccountTypeID:new FormControl(this.AccountTypeID)

  })
  }

  getActivitesModelReportDropdown(){
 this.reportservice.GetActivitesModelReportDropdown().subscribe((res:any)=>{
  console.log(res)
  this.DropApiData=res
 })
  }

  getActivitesModelReport(){
    this.reportservice.GetactivitesModelReport(this.startDate, this.endDate, this.AccountTypeID).subscribe((res:any)=>{
      console.log(res)
    this.ModelApiResult=res
    })
  }

  print(){
    window.print()
  }
  onSubmit(){
    this. getActivitesModelReport()
  }
  exportAsExcel(){
    this.exportActive = true;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ModelApiResult);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ActivityReport.xlsx');
  }
}