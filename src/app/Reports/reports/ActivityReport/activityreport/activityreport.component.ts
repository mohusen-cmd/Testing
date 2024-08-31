import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ColDef , GridApi, GridOptions,} from "ag-grid-community";
import { ClaimsHelper } from "src/app/login/claimshelper";
import { ReportsService } from "src/app/services/reports.service";
import * as XLSX from 'xlsx';///excel

@Component({
  selector: 'app-activityreport',
  templateUrl: './activityreport.component.html',
  styleUrls: ['./activityreport.component.scss'],
  providers: [DatePipe]
})
export class ActivityreportComponent implements OnInit {

   private gridApi: GridApi;
  myDate: string;
  startDate: any = '2022-01-01';
  endDate: any;
  SignUpFrom: FormGroup;
  userName: any;
  StatusID: number = 0;
 
 
  //myDate = Date.now();
  gridOptions: GridOptions;
  columnDefs:ColDef[]=[
    {headerName:'Type',field:''},
    {headerName:'Priority',field:'PriorityName'},
    {headerName:'Status ',field:'StatusName'},
    {headerName:'Contact Name',field:'ContactName'},
    {headerName:'Phone ',field:'ContactPhone'},
    {headerName:'Subject ',field:'Subject'},
    {headerName:'Activity ',field:'ActivityName'},
    {headerName:'Owner  ',field:'OwnerName'},
    {headerName:' Due Date ',field:'DueDate'},
    {headerName:'Created Date ',field:'CreatedDate'},
    {headerName:'Module ',field:'AccountTypeName'},
  ];

  
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  rowData = [];
  exportActive: boolean;
  constructor(
    private fb: FormBuilder,
    private claimsHelper: ClaimsHelper,
    private datePipe: DatePipe,
    public reportsservice:ReportsService) {
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.ActivitiesForm();
    this.userName = this.claimsHelper.GetUserNameAPIKeyFromClaims();
    this.gridOptions = {
      columnDefs: this.columnDefs,
      defaultColDef: this.defaultColDef,
      paginationPageSize: 12, // Number of rows Per Page
      pagination: true, // Enable pagination

    };
  }

  ngOnInit(): void {
    this.endDate = this.myDate
    this.getActivitesReport()
   this.ActivitiesForm()
  }

  ActivitiesForm() {
    this.SignUpFrom = this.fb.group({
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.myDate),
      StatusID: new FormControl(this.StatusID),
    });
  }
  
 
  
  onSubmit() {
    this.getActivitesReport()
  }
  getActivitesReport(){
    this.reportsservice.GetActivitesReport(this.startDate, this.endDate).subscribe((res:any)=>{
      console.log(res)
      this.rowData=res
    });
    
  }

  /** Selects all rows if they are not all selected; optherwise clear selection. */
  
  // public print() {
  //   window.print();
  // }

  ////excel download
  // export() {
    
  //   this.exportActive = true;
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table?.nativeElement);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, 'ActivityReport.xlsx');

  // }
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

  

  TostartDate($event) {
    const year = $event.getFullYear();
    const month = String($event.getMonth() + 1).padStart(2, '0');
    const day = String($event.getDate()).padStart(2, '0');
    this.startDate = `${year}-${month}-${day}`;
  }
  ToEndDate($event) {
    const year = $event.getFullYear();
    const month = String($event.getMonth() + 1).padStart(2, '0');
    const day = String($event.getDate()).padStart(2, '0');
    this.endDate = `${year}-${month}-${day}`;
  }
 

  exportAsExcel() {
    this.exportActive = true;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ActivityReport.xlsx');
  
  }
  print() {
    if (this.rowData.length > 0) {
      window.print();
    } else {
      console.log('No data to print');
    }
  }
}