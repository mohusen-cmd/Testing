import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OpportunityService } from 'src/app/services/opportunity.service';

@Component({
  selector: 'app-opportunity-modal',
  templateUrl: './opportunity-modal.component.html',
  styleUrls: ['./opportunity-modal.component.scss']
})
export class OpportunityModalComponent implements OnInit {
  @ViewChild('tblOpportunity') tableele:ElementRef; 
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  oppList:any[]; 
  dtOptions:any =  {}; 
  searchcolumn: string = "Name";
  alphanumericsort: string = undefined;
  keyword: any = undefined;
  companyid: any = -1;
  companyname: any = undefined;
  userid: any = 6155;
  stageid: any = -1;
  jtsorting: any = "ID desc";
  recordcount: any = 0;
  @Output() opperlistmodalstatus = new EventEmitter()
  @Output() status = new EventEmitter();
  @ViewChild('content', { static: true }) modal: any
  constructor(
    private modalService: NgbModal,
    public opperservice: OpportunityService,
    public climesHelper: ClaimsHelper,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userid = this.climesHelper.GetUserIdAPIKeyFromClaims()
    this.LoadOppTable()
    this.openLg(this.modal)
  }


  LoadOppTable()
  {
    
   
    var userid=this.climesHelper.GetUserIdAPIKeyFromClaims()
    var stageid=-1;
    var jtstartindex=0;
    var jtpagesize=10;
    var jtsorting="ID desc";
    var recordcount=0;



    const that = this;
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching:false,
      pageLength: 10,
      serverSide: true,
      processing: true,   
     
     ajax: (dataTablesParameters: any, callback) => {
      this.spinner.show(); 
        this.opperservice.GetOpportunityList(this.searchcolumn, this.alphanumericsort, this.keyword, this.companyid, this.companyname, this.userid, this.stageid,dataTablesParameters.start,dataTablesParameters.length,this.jtsorting, this.recordcount).subscribe((resp: any) => {
         var count=0;
         that.oppList = resp;
         if(that.oppList.length > 0)
         {
           count = resp[0].RecordCount;
         }
         else
         {
           count = 0;
         }        
          callback({
            recordsTotal: count,
            recordsFiltered: count,
            data: []
          });
          this.spinner.hide();
         
        },
        (err:AppError) => 
        { 
          this.spinner.hide();
          if(err instanceof BadInputError)
          {
            window.alert("Bad Request:" + err.originalError)
          }
          else if (err instanceof NotFoundError) 
          {
            window.alert("404 Error Occured!")
          }
          else
          {
           return throwError(err); 
          }
          });      
      },     
 //columns: [{  title: 'Delete',data: 'id' }, {title: 'View/Edit', data: 'FirstName' }, {title: 'Contact Name', data: 'ContactName' },{title: 'Company Name', data: 'ContactCompanyName' },{title: 'Contact Owner', data: 'OwnerfirstName' },{title: 'Department', data: 'DepartmentText' }],
   columns: [
   {
     title:'opporID'
   },
    { 
      title: 'Opportunity Name', 
     
    }, 
    {
      title: 'Company Name',
      
    },
    {
      title: 'Contact Name',
      
    },
   
    
  ],
    columnDefs: [   
      {
      targets: [0,1], /* column index */
      orderable: false, /* true or false */
      }
     ],
      responsive: true,
      language: {
        emptyTable: "", // Set to empty string to hide the "No matching records found" message
        zeroRecords: "" // Also set zeroRecords to an empty string to hide the message
      },
    };
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg',backdrop: 'static', keyboard: false });
  }

  emitopper(data) {
    this.opperlistmodalstatus.emit(data)
    this.modalService.dismissAll()
  }
  close() {
    this.modalService.dismissAll()
    this.status.emit(false)
  }

 
}
