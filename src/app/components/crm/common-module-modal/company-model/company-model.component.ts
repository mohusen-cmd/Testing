import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-model',
  templateUrl: './company-model.component.html',
  styleUrls: ['./company-model.component.scss']
})
export class CompanyModelComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  searchcolumn: any = "FirstName";
  alphanumericsort: any = undefined;
  companykeyword: any = undefined;
  ownername: any = undefined;
  userId: any = 6155;
  startindex: any = 0;
  pagesize: any = 10;
  SortingColumns: any = "ID desc";
  recordcount: any = 0;
  @Output() companylistmodalstatus = new EventEmitter()
  @Output() status = new EventEmitter();
  @ViewChild('content', { static: true }) modal: any
  companyList: any[];
  dtOptions: { };
  constructor(
    private modalService: NgbModal,
    public toastr: ToastrManager,
    public companyservice: CompanyService,
    public claimsHelper: ClaimsHelper,
    private spinner: NgxSpinnerService) {
      this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims()      
     }

  ngOnInit() {
    this.GetCompanyDataTableBinding()
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
      sorting:false, 
     ajax: (dataTablesParameters: any, callback) => {
       
       this.spinner.show();
      
       if( this.ownername == "")
       {
        this.ownername =undefined;
       }
       if(this.companykeyword == "")
       {
        this.companykeyword = undefined;
       }
       this.companyservice.GetCompanyapi(this.searchcolumn, this.alphanumericsort, this.companykeyword, this.ownername, this.userId, dataTablesParameters.start , dataTablesParameters.length, this.SortingColumns, this.recordcount).subscribe(
        (result:   any[]) =>  {
          
          this.companyList = result;
          let count=0;
           if(that.companyList.length > 0)
           {
             count = result[0].RecordsCount;
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
         
         } 
           ,(err:AppError) => 
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
      title: 'CompanyID',    
    },
    { 
      title: 'Company Name', 
    }, 
    {
      title: 'Phone', 
    },
   ],
    columnDefs: [   
      {
      targets: [0,1,2], /* column index */
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

  openDialog(data) {
    this.companylistmodalstatus.emit(data)
    this.modalService.dismissAll()
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg',backdrop: 'static', keyboard: false });
  }
  close() {
    this.modalService.dismissAll()
    this.status.emit(false)
  }
  searchEventHandler(){
     
    if((this.companykeyword === undefined || this.companykeyword.trim() == "") && (this.ownername === undefined || this.ownername.trim() == "")) 
    {
      this.toastr.errorToastr('Please Enter atleast one Search criteria.', 'error!');
    }
    else
    {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
          }); 
    }
  }
  clearSeach()
  { 
    
    if(this.companykeyword != undefined  || this.ownername != undefined) 
    {
      this.ownername="";
      this.companykeyword="";
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      }); 
    }
  }
  
}
