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
  selector: 'app-opportunityreport',
  templateUrl: './opportunityreport.component.html',
  styleUrls: ['./opportunityreport.component.scss'],
  providers:[DatePipe]
})
export class OpportunityreportComponent implements OnInit {
  @ViewChild('paginator', {read: MatPaginator}) paginator: MatPaginator;
	
  
  
  exportActive: boolean = false;
 

  myDate: string;
  startDate: any = '2022-01-01';
  endDate: any ;


  SignUpFrom: FormGroup;
 
  rowData=[]

  userName: any;


  gridOptions:GridOptions
  columnDefs:ColDef[]=[
    { headerName: 'Opportunity Name ', field: 'OpportunityName' },
    { headerName: ' Buying Stage', field: 'StageName' },
    { headerName: 'Contact Name ', field: 'ContactName' },
    { headerName: 'Company Name ', field: 'CompanyName' },
    { headerName: ' Phone', field: 'ContactPhone' },
    { headerName: 'Probability ', field: 'TypeName' },
    { headerName: ' Expected Budget', field: 'ExpectedRevenue' },
    { headerName: 'Estimated Closing Date ', field: 'CloseDate' },
    { headerName: ' Created Date', field: 'CreatedDate' },
   
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
    this.endDate = this.myDate
    this. OpportunityForm() 
    this.getOpportunityReport()
  }
  OpportunityForm() {
    this.SignUpFrom = this.fb.group({
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.myDate),
      

    });
  }
  onSubmit() {
   this.getOpportunityReport()
   
  }
  getOpportunityReport() {
    
    this.as.getOpportunityReport(this.startDate, this.endDate).subscribe(res => {
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