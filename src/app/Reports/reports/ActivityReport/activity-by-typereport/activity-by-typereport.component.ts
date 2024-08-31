import { DatePipe } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ReportsService } from 'src/app/services/reports.service';
import * as XLSX from 'xlsx';//excel

@Component({
  selector: 'app-activity-by-typereport',
  templateUrl: './activity-by-typereport.component.html',
  styleUrls: ['./activity-by-typereport.component.scss'],
 providers:[DatePipe]
})
export class ActivityByTypereportComponent implements OnInit {
DropApiData:any
TypeApiResult = [];

startDate:any= '2022-01-01';
endDate:any
myDate:string
ActivityTypeID:number=0

gridOptions: GridOptions;
columnDefs:ColDef[]=[
  {headerName:'Activity Type',field:'ActivityName'},
  {headerName:'Priority ',field:'PriorityName'},
  {headerName:'Status ',field:'StatusName'},
  {headerName:'Contact Name',field:'ContactName'},
  {headerName:'Phone ',field:'ContactPhone'},
  {headerName:'Subject ',field:'Subject'},
  {headerName:'Activity ',field:'ActivityName'},
  {headerName:'Owner ',field:'OwnerName'},
  
]

defaultColDef:ColDef={
  sortable: true,
    filter: true,
}

SignUpFrom:FormGroup
  exportActive: boolean=false;


  constructor(
    public reportservcie:ReportsService,
    public fb:FormBuilder,
    public datePipe:DatePipe,
  ){
this.myDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
this.gridOptions={
  columnDefs: this.columnDefs,
  defaultColDef:this.defaultColDef,
  paginationPageSize: 12, // Number of rows Per Page
   pagination: true, // Enable pagination

}
  }

  ngOnInit(): void {
   this.endDate=this.myDate
   this.ActivitiesForm()
   this.getActivitesTypeReportDropdown()
   this. getActivitesTypeReport()
  }

  ActivitiesForm(){
    this.SignUpFrom=this.fb.group({
      startDate:new FormControl(this.startDate),
      endDate:new FormControl(this.myDate),
      ActivityTypeID:new FormControl(this.ActivityTypeID)
    })
  }

  getActivitesTypeReportDropdown(){
    this.reportservcie.GetActivitesTypeReportDropdown().subscribe((res:any)=>{
      console.log(res)
      this.DropApiData=res
    })
  }
 getActivitesTypeReport(){
  this.reportservcie.GetactivitesByActivityTypeIDReport(this.startDate, this.endDate, this.ActivityTypeID).subscribe((res:any)=>{
    console.log(res)
    this.TypeApiResult=res
  })
}
onSubmit(){
  this.getActivitesTypeReport()
}

print(){
  window.print()
}


exportAsExcel() {
  this.exportActive = true;
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.TypeApiResult);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'ActivityReport.xlsx');
  
}

}