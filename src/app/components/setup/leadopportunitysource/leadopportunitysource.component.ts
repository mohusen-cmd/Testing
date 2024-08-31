import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { LeadsourcetypeService } from 'src/app/services/leadsourcetype.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
    selector: 'app-leadopportunitysource',
    templateUrl: './leadopportunitysource.component.html',
    styleUrls: ['./leadopportunitysource.component.scss']
})
export class LeadopportunitysourceComponent implements OnInit {
    @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
    dtOptions:any = {};
    startIndex: any = 0;
    pageSize: any = 10;
    orderByClause: string = 'OSId desc';
    Keyword: string = undefined;
    totalCount: any = 0;
    marked: false;
    checkedrowdata: any = [];
    statusval: any;
    titleforpopup: any;
    textforpopup: any;
    leadsoppsourcelist: any[];
    constructor(
        public router: Router,
        public toastr: ToastrManager,
        public leadssource: LeadsourcetypeService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.GetDataTableBinding();
    }

   

    LeadoppertunityCrudEventHandler(LeadSourceId, LeadSourcetype) {
        // row.push(type);
        if (LeadSourcetype == 'status') {
            if (this.marked || this.checkedrowdata.length > 0) {
                if (this.statusval == 'Active') {
                    this.statusval = 1;
                } else {
                    this.statusval = 0;
                }
                this.leadssource.UpdateleadsourceStatusByIds(this.checkedrowdata, this.statusval).subscribe((res) => {
                    if (res != null) {
                        this.checkedrowdata = [];
                        this.marked = false;
                        
                        this.toastr.successToastr('Lead/Opportunity Status has been Changed Successfully.', 'success', {
                            timeOut: 3000
                        });
                    } else {
                        this.toastr.errorToastr("Lead/Opportunity Status Can't  Changed  !!!.", 'Failed!', {
                            timeOut: 3000
                        });
                    }
                    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                        dtInstance.draw();
                      });
                });
            } else {
                this.titleforpopup = 'Please select  Record to change status!';
                this.textforpopup = '';
                this.Swa1alerts(LeadSourcetype, this.titleforpopup, this.textforpopup);
            }
        } else {
            this.router.navigate(['Setup/leadopportunitysource/addnewleadopportunitysource/', LeadSourcetype, LeadSourceId]).then(
                (nav) => {
                    console.log(nav); // true if navigation is successful
                },
                (err) => {
                    console.log(err); // when there's an error
                }
            );
        }
       
    }
    activeInActiveToggle(e, rowdata) {
        this.marked = e.target.checked;
        if (this.marked) {
            this.checkedrowdata.push(rowdata.OSId);
        } else {
            this.checkedrowdata.pop(rowdata.OSId);
        }
        this.statusval = rowdata.Status;
    }
    Swa1alerts(type, title, text) {
        if (type == 'status') {
            Swal.fire({
                title: `<span style=" font-weight: normal;">${title}</span>`,
                text: text,
                backdrop: false,
                imageUrl: '',
                reverseButtons: true,
                showCancelButton: false,
                cancelButtonColor: '#ef4d4d',
                confirmButtonColor: '#448aff'
            }).then((result) => {
                if (result.value) {
                } else {
                }
            });
        }
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
      if (dataTablesParameters.order[0].column == 0) 
      {
        this.orderByClause = "OSId" + " " + dataTablesParameters.order[0].dir;
      } else if (dataTablesParameters.order[0].column == 1)
      {
        this.orderByClause ="SourceName" + " " + dataTablesParameters.order[0].dir;
      } else if (dataTablesParameters.order[0].column == 2)
      {
        this.orderByClause ="Description" + " " + dataTablesParameters.order[0].dir;
      } 
      else if (dataTablesParameters.order[0].column == 3) {
        this.orderByClause = "Status" + " " + dataTablesParameters.order[0].dir;
      }
      this.startIndex=dataTablesParameters.start
      this.pageSize=dataTablesParameters.length
      that.leadssource.GetleadsourcetypeInfo(this.startIndex, this.Keyword, this.pageSize, this.orderByClause, this.totalCount).subscribe((resp:any[]) => {
         var count=0;
         this.leadsoppsourcelist = resp;
         if(that.leadsoppsourcelist.length > 0)
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
      title: 'Select',
    }, 
    {
      title: 'SOURCE NAME',
    }, 
    { 
      title: 'NOTES', 
    }, 
    {
      title: 'STATUS', 
    },
   
  ],
  columnDefs: [
    {
      targets: [0, 4] /* column index */,
      orderable: false /* true or false */,
    },
  ],
      responsive: true,
      language: {
        emptyTable: "", // Set to empty string to hide the "No matching records found" message
        zeroRecords: "" // Also set zeroRecords to an empty string to hide the message
      },
    };
  }
}

