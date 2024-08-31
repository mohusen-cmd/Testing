import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as XLSX from 'xlsx';///excel
import { DatePipe } from '@angular/common';
import { ReportsService } from 'src/app/services/reports.service';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-contact-by-ownerreport',
  templateUrl: './contact-by-ownerreport.component.html',
  styleUrls: ['./contact-by-ownerreport.component.scss'],
  providers: [DatePipe]
})
export class ContactByOwnerreportComponent implements OnInit {
 


  
  exportActive: boolean = false;
 
  
  myDate: string;
  startDate: any = '2022-01-01';
  endDate: any;
  Ownership: any = 'Select Value';

  SignUpFrom: FormGroup;
  
  
  userName: any;

  drpList: any;
  RowData=[]
 

  gridOptions: GridOptions;
 columnDefs:ColDef[]=[
      {headerName:'Ownership  ',field:'Ownership'},
      {headerName:' Contact Name ',field:'Name'},
      {headerName:'Company Name  ',field:'CompanyName'},
      {headerName:' Phone ',field:'Phone'},
      {headerName:'Lead Source  ',field:'LeadSource'},
      {headerName:'Contact Type  ',field:'ContactType'},
      {headerName:'Created Date  ',field:'CreatedDate'},
      {headerName:' Email ',field:'Email'},
      
     
                  
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
      columnDefs: this.columnDefs,
      defaultColDef:this.defaultColDef,
      paginationPageSize: 12, // Number of rows Per Page
       pagination: true, // Enable pagination
    }
   
    this.userName = this.claimsHelper.GetUserNameAPIKeyFromClaims();
  }

  ngOnInit(): void {
    
    this.endDate = this.myDate;
    this.getContactOwnerReportDropdown()
    this.getContacatByContactOwnerReport()
    this.ContactDetailsForm();
  }
  ContactDetailsForm() {
    this.SignUpFrom = this.fb.group({
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.myDate),
      Ownership: new FormControl(this.Ownership),


    });
  }
  getContactOwnerReportDropdown() {
    this.reportservice.GetContactOwnerReportDropdown().subscribe(res => {
      //console.log(res);
      this.drpList = res;
    })
  }
 
 
  
  onSubmit() {
   
     
    this.getContacatByContactOwnerReport()

  }
  getContacatByContactOwnerReport() {
    
   

    this.reportservice.GetContacatByContactOwnerReport(this.startDate, this.endDate, this.Ownership).subscribe((res:any) => {
      console.log(res);
      this.RowData = res;
     
    })
    
  }
 
  public print() {
    window.print();
  }

  ////excel download
  export() {
    
    this.exportActive = true;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.RowData);
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