import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReportsService } from 'src/app/services/reports.service';
import * as XLSX from 'xlsx';///excel
@Component({
  selector: 'app-companydetailreport',
  templateUrl: './companydetailreport.component.html',
  styleUrls: ['./companydetailreport.component.scss'],
  providers: [DatePipe]
})
export class CompanydetailreportComponent implements OnInit {
  
  exportActive: boolean = false;

  rowData=[]

  myDate: string;
  startDate: any = '2022-01-01';
  endDate: any ;
 
  SignUpFrom: FormGroup;
 
  userName: any;
 
  gridOptions:GridOptions
  columnDefs:ColDef[]=[
    { headerName: ' Company Name ', field: 'CompanyName' },
    { headerName: ' Company Type', field: 'CompanyType' },
    { headerName: ' Phone ', field: 'Phone' },
    { headerName: ' Company Industry', field: 'CompanyIndustry' },
    { headerName: ' Company OwnerShip   ', field: 'CompanyOwnership' },
    { headerName: 'Created Date ', field: 'CreatedDate' },
    { headerName: 'Email  ', field: 'Email' },

  ]

  defaultColDef:ColDef={
    sortable: true,
    filter: true,
  }
  
  constructor(public as: AuthenticationService,
     private fb: FormBuilder,
     private claimsHelper: ClaimsHelper,
     private datePipe: DatePipe,
     public reportservice:ReportsService) {
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
    this.endDate = this.myDate
    this.getCompanyDetailReport()
    this.CompanyDetailsForm();
  }
  CompanyDetailsForm() {
    this.SignUpFrom = this.fb.group({
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.myDate),
      

    });
  }

  onSubmit() {
  
    this.getCompanyDetailReport()
   
  }
  getCompanyDetailReport() {
 
    
    this.reportservice.GetCompanyDetailReport(this.startDate, this.endDate).subscribe((res:any) => {
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
  ////pdf download
  // public downloadAsPDF() {
  //   const doc = new jsPDF();

  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   const pdfTable = this.pdfTable?.nativeElement;

  //   doc.fromHTML(pdfTable.innerHTML, 15, 15, {
  //     width: 190,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('tableToPdf.pdf');
  // }

  // public onExport() {
  //   //const jsPDF= any;
  //   const doc = new jsPDF("p", "pt", "a4");
  //   const source = document.getElementById("content");
  //   // doc.text("Test", 40, 20);
  //   doc.setFontSize(12)
  //   doc.html(source, {
  //     callback: function(pdf) {
  //       doc.output("dataurlnewwindow"); // preview pdf file when exported
  //     }
  //   });
  //   // autotable(doc, {
  //   //   html: '#content',
  //   //   useCss: true
  //   // })
  // }
}