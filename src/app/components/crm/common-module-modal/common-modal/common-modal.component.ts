import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  SearchColumn: string = undefined;
  AlphanumericSort: string = undefined;
  leadkeyword: string = undefined;
  SortingColumns:  string = "ID desc"
  leadownername: any = undefined;
  leadslist: any[];
  userId: any = 6155;
  LeadSource: any=0;
  StageId: any = 0;
  jtStartIndex: any = 0;
  jtPageSize: number = 10;
  RecordCount: any = 0;
  @Input() modeltype: any
  @Output() commomlistmodalstatus = new EventEmitter();
  @Output() status = new EventEmitter();
  @ViewChild('content', { static: true }) modal: any
  dtOptions: {  };

  constructor(
    private spinner: NgxSpinnerService,
    private claimsHelper: ClaimsHelper,
    private modalService: NgbModal,
    public leadservice: LeadService) {
      this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims()
     }


  ngOnInit(): void {
    this.GetCompanyDataTableBinding();
    this.openLg(this.modal)
  }
  GetCompanyDataTableBinding()
  {
    
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching:false,
      pageLength: 10,
      serverSide: true,
      processing: true,   
     ajax: (dataTablesParameters: any, callback) => {
      this.spinner.show();
       
        that.LeadSource ="0";
        that.StageId = "0";
        this.leadkeyword = this.leadkeyword == "" ? undefined:this.leadkeyword;
        this.leadownername = this.leadownername == "" ? undefined:this.leadownername; 
        that.leadservice.GetLeads(this.SearchColumn, this.AlphanumericSort, this.leadkeyword, this.leadownername,this.userId,this.LeadSource,this.StageId, dataTablesParameters.start , dataTablesParameters.length, this.SortingColumns, this.RecordCount).subscribe((resp:any[]) => {
         
         var count=0;
         this.leadslist = resp;
         if(that.leadslist.length > 0)
         {
           count = resp[0].RecordsCount;
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
    columns: [
   
    { 
      title: 'Lead Name', 
    }, 
    {
      title: 'Company', 
    },
    {
      title: 'Email',
      
    },
    {
      title:'Phone',
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
 

  openpop(data) {
    this.commomlistmodalstatus.emit(data)
    this.modalService.dismissAll()
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg',backdrop: 'static', keyboard: false });
  }

  

  close() {
    this.modalService.dismissAll()
    this.status.emit(false)

  }
 

}

