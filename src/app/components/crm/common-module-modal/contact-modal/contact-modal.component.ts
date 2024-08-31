import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {
  @Output() Contactlistmodalstatus = new EventEmitter()
  @Output() status = new EventEmitter();
  SearchColumn: string = undefined;
  AlphanumericSort: string = undefined;
  Createdby: any = 1;
  Contactkeyword: any = undefined
  OwnerName: any = undefined;
  CompanyName: any = undefined
  @Input() CompanyId: any = -1;
  userId: any = 6155;
  jtStartIndex: any = 0;
  jtPageSize: any = 10;
  jtSorting: string = "ID desc";
  RecordCount: any = 0;
  @ViewChild('content', { static: true }) modal: any
  dtOptions: { };
  contacts:any =[];

  constructor(
    private modalService: NgbModal,
    public claimsHelper: ClaimsHelper,
    public contactservice: ContactService,
    private spinner: NgxSpinnerService) { 
      this.userId=this.claimsHelper.GetUserIdAPIKeyFromClaims()
    }
  ngOnInit(): void {
    this.GetDataTableBinding()
    this.openLg(this.modal)
  }
  GetDataTableBinding()
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
      that.contactservice.GetContacts(this.SearchColumn, this.AlphanumericSort, this.Createdby, this.Contactkeyword,
        this.OwnerName, this.CompanyName, this.CompanyId, this.userId, this.jtStartIndex, this.jtPageSize, this.jtSorting, this.RecordCount).subscribe((resp: any) => {
         var count=0;
         that.contacts = resp;
         if(that.contacts.length > 0)
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
         
        },(err:AppError) => 
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
      title: 'ContactID',
      data: 'ContactID'
    },
    { 
      title: 'Contact Name', 
      data: 'ContactName'
    }, 
    {
      title: 'Company Name', 
      data: 'ContactCompanyName'
    },
    {
      title: 'Department Text',
      data: 'DepartmentText',
    },
    ],
    columnDefs: [   
      {
      targets: [0,1],
      orderable: false,
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


  emitContactdata(data) {
    this.Contactlistmodalstatus.emit(data)
    this.modalService.dismissAll()
  }

  close() {
    this.modalService.dismissAll()
    this.status.emit(false)
  }

 


}

