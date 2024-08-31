import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OpportunityService } from 'src/app/services/opportunity.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Output() status = new EventEmitter()
  @Output() activitydetailsStatus = new EventEmitter();
  @ViewChild('content', { static: true }) modal: any
  @Input() companyid: any
  orderbyclause = `Mobile asc`
  recordcount = 0
  dtOptions: {};
  contactList: any;
  constructor(public opperservice: OpportunityService,
     private modalService: NgbModal,
     public claimsHelper:ClaimsHelper,
     public spinner:NgxSpinnerService) {
  }

  ngOnInit(): void {
   this.LoadContactListTable();
    this.openLg(this.modal)

  }
 

  openLg(content) {
    this.modalService.open(content, { size: 'lg',backdrop: 'static', keyboard: false  });
  }
  emitcontact(event: any) {
    this.activitydetailsStatus.emit(event)
    this.modalService.dismissAll()
  }
  close() {
    this.modalService.dismissAll()
    this.status.emit(false)
  }

  LoadContactListTable()
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
      this.opperservice.getCompanyApiGetConatctlistForCompanyId(this.companyid, dataTablesParameters.start, dataTablesParameters.length, this.orderbyclause, this.recordcount).subscribe((response: any) => {debugger
         var count=0;
         that.contactList = response;
         if(that.contactList.length > 0)
         {
           count = response[0].RecordsCount;
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
     title:'ContactID'
   },
    { 
      title: 'ContactName', 
    }, 
    {
      title: 'Phone',
    },
    {
      title: 'Email',
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
}
