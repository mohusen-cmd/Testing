import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as XLSX from 'xlsx';///excel

@Component({
  selector: 'app-leadownerreport',
  templateUrl: './leadownerreport.component.html',
  styleUrls: ['./leadownerreport.component.scss'],
  providers: [DatePipe]
})
export class LeadownerreportComponent implements OnInit {
 
  exportActive: boolean = false;
 
  
  startDate: any = '2022-01-01';
  endDate: any;
  myDate: any;
  leadOwner: any = 'Select Value';

  SignUpFrom: FormGroup;
  
  
  userName: any;

  
  
 
  drpList: any;
  rowData=[]


  gridOptions:GridOptions
  columnDefs:ColDef[]=[
    { headerName: ' Lead Owner  ', field: 'OwnerShip' },
    { headerName: ' Company Name ', field: 'CompanyName' },
    { headerName: '  Lead Name ', field: 'Name' },
    { headerName: 'Phone ', field: 'Phone' },
    { headerName: 'Lead Source   ', field: 'LeadSourceText' },
    { headerName: ' Lead Status  ', field: 'BuyingStageText' },
    { headerName: 'Created Date ', field: 'CreatedDate' },
    { headerName: 'Email ', field: 'Email' },
   
  
   
  ]

  defaultColDef:ColDef={
    sortable: true,
    filter: true,
  }
  
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
    this.endDate = this.myDate
    this.getDrpList()
    this.getLeadByLeadOwnerReport()
    this.LeadDetailsForm();
  }
  LeadDetailsForm() {
    this.SignUpFrom = this.fb.group({
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.myDate),
      leadOwner: new FormControl(this.leadOwner),

    });
  }
  getDrpList() {
    this.as.getLeadOwnerReportDropdown().subscribe(res => {
      console.log(res)
      this.drpList = res
    })
  }
  // @ViewChild(MatPaginator, { static: false })
  // set paginator(value: MatPaginator) {
  //   debugger
  //   this.dataSource.paginator = value;
  // }

 
  onSubmit() {

    this.getLeadByLeadOwnerReport()

  }
  getLeadByLeadOwnerReport() {
   
    this.as.getLeadByLeadOwnerReport(this.startDate, this.endDate, this.leadOwner).subscribe(res => {
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