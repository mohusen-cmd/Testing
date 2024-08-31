
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ContactTypeService } from 'src/app/services/contacttype.service';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { NgxSpinnerService } from 'ngx-spinner';
import { BadInputError } from 'src/app/error/bad-input-error';
import { throwError } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-contacttype',
  templateUrl: './contacttype.component.html',
  styleUrls: ['./contacttype.component.scss']
})
export class ContacttypeComponent implements OnInit {
   @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
   contacttypes: any = [];
  jtSorting: any = "";
  RecordCount: any = 0;
   deletedids: any;
  marked:boolean= false;
  checkedrowdata: any = [];
  statusval: any;
  titleforpopup: any;
  textforpopup: any;
  constructor(private contactTypeservice: ContactTypeService,
    private router: Router, public toastr: ToastrManager,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.GetContacttypeDataTableBinding();
    // this.setPage({ offset: 0 });
  }

  GetContacttypeDataTableBinding() {

    const that = this;
    //this.ShowContact=true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.spinner.show();
        if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 0) {
          this.jtSorting = "ID" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 1) {
          this.jtSorting = "Name" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 2) {
          this.jtSorting = "Description" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 3) {
          this.jtSorting = "Status" + " " + dataTablesParameters.order[0].dir;
        }

        // that.contactservice.GetAllContacts("FirstName",this.AlphanumericSort, 1,this.searchmodel.Keyword,this.searchmodel.Owner,this.searchmodel.CompanyName, -1, this.userid, dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
        this.contactTypeservice.GetContactTypeInfo(dataTablesParameters.start, dataTablesParameters.length, this.jtSorting, this.RecordCount).subscribe(resp => {

          var count = 0;
          that.contacttypes = resp;
          if (that.contacttypes.length > 0) {
            count = resp[0].RecordsCount;
          }
          else {
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
        //title:'<input type="checkbox" class="editor-active" (change)="SelectAllcheck($event)">'
        
        },
        {
          title: 'ContactType Name',
          data: 'Name'
        },
        {
          title: 'Type',
          data: 'Description'
        },
        {
          title: 'Activity Status',
          data: 'Status',

        }

      ],
      columnDefs: [
        {
          targets: [0, 4], /* column index */
          orderable: false, /* true or false */
        }
      ],
      responsive: true
    };

  }





  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.ID);
      this.statusval = rowdata.Status;
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.ID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
  }

  contactCrudEventHandler(ContactTypeId, Contacttype) {
    if (Contacttype == "status") {
      if (this.marked || this.checkedrowdata.length > 0) {
        if (this.statusval == "Active") {
          this.statusval = 1;
        }
        else {
          this.statusval = 0;
        }

        this.contactTypeservice.UpdateContactTypeStatusByIds(this.checkedrowdata, this.statusval).subscribe((res: any) => {
          if (res != null) {
            this.marked = false;
            this.checkedrowdata = []
            this.Status()
            this.toastr.successToastr("ContactType Status has been Changed Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("ContactType Status Can't  Changed  !!!.", "Failed", {
              //timeOut: 5000
            });
          }
        });
      }
      else {
        this.titleforpopup = 'Please select  Record to change status!';
        this.textforpopup = '';
        this.Swa1alerts(Contacttype, this.titleforpopup, this.textforpopup);
      }
    }
    else {
      this.router.navigate(["Setup/Contacttype/addnew/", Contacttype, ContactTypeId]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });

    }
  }

  Swa1alerts(type, title, text) {
    if (type == "status") {
      Swal.fire({
        title: `<span style=" font-weight: normal;">${title}</span>`,
        text: text,
        backdrop: false,
        imageUrl: '',
        reverseButtons: true,
        showCancelButton: false,
        cancelButtonColor: '#ef4d4d',
        confirmButtonColor: '#448aff',
      }).then((result) => {
        if (result.value) {

        }
        else {

        }
      })
    }
  }
  Status() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
    // this.setPage({ offset: 0 });
  }
}




