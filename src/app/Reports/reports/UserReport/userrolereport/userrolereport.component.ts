import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as XLSX from 'xlsx';///excel
import { DatePipe } from '@angular/common';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-userrolereport',
  templateUrl: './userrolereport.component.html',
  styleUrls: ['./userrolereport.component.scss'],
  providers:[DatePipe]
})
export class UserrolereportComponent implements OnInit {
  startDate:any= '2022-01-01';
  endDate:any;
  roleid: number = 0;
  myDate:string

  SignUpFrom:FormGroup

  UserRoleApiResult=[]


  gridOptions:GridOptions

  columnDefs:ColDef[]=[
    {headerName:'Role Name ',field:'RoleName'},
    {headerName:' User Name  ',field:'FullName'},
    {headerName:'Phone  ',field:'Phone'},
    {headerName:'Email  ',field:'Email'},
    {headerName:'  City ',field:'City'},
    {headerName:'Created Date ',field:'CreatedDate'},
    {headerName:'State Name ',field:'StateName'},
  

  ]

  defaultColDef:any={
    sortable: true,
    filter: true,
  }
  exportActive: boolean=false;


  
  constructor(
    public as:AuthenticationService,
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
   this.getUserRoleReport()
   this.UserForm()
  }

  UserForm(){
   this.SignUpFrom=this.fb.group({
    startDate:new FormControl(),
    endDate:new FormControl(),

   })
  }

 getUserRoleReport(){
   this.as.getUserRoleReport(this.startDate, this.endDate, this.roleid).subscribe((res:any)=>{
    console.log(res)
    this.UserRoleApiResult=res
   })
  }

  print(){
    window.print()
  }

  exportAsExcel(){
    this.exportActive = true;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.UserRoleApiResult);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ActivityReport.xlsx');

  }
  onSubmit(){
    this.getUserRoleReport()
  }
}