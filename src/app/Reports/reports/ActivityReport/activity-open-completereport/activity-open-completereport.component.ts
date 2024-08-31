import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ColDef, GridOptions } from "ag-grid-community";
import { ReportsService } from "src/app/services/reports.service";
import * as XLSX from 'xlsx';//excel

@Component({
  selector: 'app-activity-open-completereport',
  templateUrl: './activity-open-completereport.component.html',
  styleUrls: ['./activity-open-completereport.component.scss'],
 providers:[DatePipe]
})
export class ActivityOpenCompletereportComponent implements OnInit {

  startDate:any='2022-01-01';
   endDate:any
   status:any
   myDate:string;

   OpenApiResult=[]

   SignUpFrom:FormGroup

   gridOptions:GridOptions
   columnDefs:ColDef[]=[
    {headerName:'Company Name ',field:'CompanyName'},
    {headerName:'Priority ',field:'PriorityName'},
    {headerName:'Status  ',field:'StatusName'},
    {headerName:'Contact/Lead Name',field:'ContactName'},
    {headerName:'Phone ',field:'ContactPhone'},
    {headerName:'Subject ',field:'Subject'},
    {headerName:'Activity Name',field:'ActivityName'},
    {headerName:' Activity Owner',field:'OwnerName'},
    {headerName:' Due Date',field:'DueDate '},
    {headerName:'Created Date',field:'CreatedDate'},
    {headerName:'Module ',field:'AccountTypeName'},
   ]

   defaultColDef:any={
    sortable: true,
    filter: true,
  }

  
  exportActive: boolean=false;

    constructor(
      public reportservice:ReportsService,
      public fb:FormBuilder,
      public datePipe:DatePipe,
      public route:ActivatedRoute,

    ){ 
      this.myDate=this.datePipe.transform(new Date(),'yyyy-MM-dd');
      this.route.paramMap.subscribe(params=>{
        const ii=params.get("Id")
        this.status=ii
      })
      this.gridOptions={
        columnDefs:this.columnDefs,
        defaultColDef:this.defaultColDef,
        paginationPageSize: 12, // Number of rows Per Page
        pagination: true, // Enable pagination
      }
    }
  ngOnInit(): void {
    this.endDate=this.myDate
    this.getActivitesPriorityReport();
    this.ActivitiesForm();
}

ActivitiesForm(){
this.SignUpFrom=this.fb.group({
  startDate:new FormControl(),
  endDate:new FormControl(),
 
})
}

getActivitesPriorityReport(){
this.reportservice.GetopenCompleteActivitesReport(this.startDate, this.endDate, this.status).subscribe((res:any)=>{
  console.log(res)
  this.OpenApiResult=res
})
}

print(){
  window.print()
}

exportAsExcel(){
  this.exportActive = true;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.OpenApiResult);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ActivityReport.xlsx');
}
onSubmit(){
  this.getActivitesPriorityReport()
}
}