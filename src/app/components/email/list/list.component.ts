import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ListsService } from 'src/app/services/lists.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  size: any = 10;
  lisname: any;
  targetaudience: any;
  description: any;
  numberOfContacts: any;
  startIndex: any = 0;
  pageSize: any = this.size;
  orderByClause: any = "list_ID desc";
  totalCount: any = 0;
  resultLength: any;
  deletedids: any
  dtOptions: any = {};
  listdata:any

  constructor(
    public router: Router,
    private spinner: NgxSpinnerService,
    private listsservice: ListsService,
    private claimsHelper: ClaimsHelper) {
  }
  ngOnInit() {
    this.getEmailList();
  }

  add() {
    this.router.navigate(['/Email/CreateNewList/EditNewList']).then(nav => console.log(nav))
  }

  getEmailList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
          this.spinner.show();
    this.listsservice.GetLists(this.lisname, this.targetaudience, this.description, this.numberOfContacts, dataTablesParameters.start, dataTablesParameters.length, this.orderByClause, this.totalCount).subscribe((data: any) => {
      this.spinner.hide()
        this.listdata = data;
        console.log(data)
        var count = 0;

        if (this.listdata.length > 0) {
            count = data[0].RecordsCount;
        } else {
            count = 0;
        }
        callback({
            recordsTotal: count,
            recordsFiltered: count,
            data: []
        });
        this.spinner.hide();
    },
    (err: AppError) => {
        this.spinner.hide();
        if (err instanceof BadInputError) {
            window.alert('Bad Request:' + err.originalError);
        } else if (err instanceof NotFoundError) {
            window.alert('404 Error Occured!');
        } else {
            return throwError(err);
        }
    }
);
},
columns: [
 
  {
      title: 'Delete'
  },
  {
      title: 'EDIT',
  },
  {
      title: 'LIST NAME',
  },
  {
      title: 'TARGET AUDIENCE',
  },
  {
      title: 'DESCRIPTION',
  },
  {
    title: 'NO OF CONTACTS',
}
],
columnDefs: [
  {
      targets: [0,1] /* column index */,
      orderable: false /* true or false */
  }
],
responsive: true,
      language: {
            emptyTable: "", // Set to empty string to hide the "No matching records found" message
            zeroRecords: "" // Also set zeroRecords to an empty string to hide the message
          },
};
  }

  
  DeleteListConfirm(id) {
    Swal.fire({
      title: 'Are you sure you want to delete this record?',
      text: "You are about to delete permanently!",
      backdrop: false,
      imageUrl: '',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonColor: '#ef4d4d',
      confirmButtonColor: '#448aff',
    }).then((result) => {
      if (result.value) {
        this.deletedids = [];
        this.deletedids.push(id);
        const formData = new FormData();
        formData.append("listId", this.deletedids);
        formData.append("EmailAPIKey", this.claimsHelper.GetEmailAPIKeyFromClaims());
        formData.append("Emailapilink", this.claimsHelper.GetEmailapilinkFromClaims());
        this.listsservice.DeleteListById(formData).subscribe(res => {
          if (res) {
            this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.draw();
            })
            Swal.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success'
            ).then((result) => {
              this.router.navigate(["/Email", "Lists"]).then(nav => {
                console.log(nav);
              }, err => {
                console.log(err)
              });
            });
          }
        })
      }
    })
  }


  CompanyCrudEventHandler(list_ID){
    this.router.navigate(['/Email','GetEditlist'],{queryParams:{ListID:list_ID}})
  }
}


