import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';
import { ToastrManager } from 'ng6-toastr-notifications';

import { CompanyOwnershipDomainModel } from 'src/app/models/ICompanyOwnershipDomainModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { PeriodicElement } from '../activitytype/activitytype.component';
import { CompanyownershiptypeService } from 'src/app/services/companyownershiptype.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { throwError } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-companyownershiptype',
  templateUrl: './companyownershiptype.component.html',
  styleUrls: ['./companyownershiptype.component.scss']
})
export class CompanyownershiptypeComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  dtOptions: any = {};
  companyownershiplist: any = [];
  jtSorting: any = "";
  RecordCount: any = 0;
  deletedids: any;
  marked:boolean= false;
  checkedrowdata: any = [];
  statusval: any;
  titleforpopup:any;
  textforpopup:any;

  constructor(private companyownershiptypeService:CompanyownershiptypeService,private router: Router,public toastr: ToastrManager,private spinner: NgxSpinnerService) {  }


  ngOnInit() {
    this.GetCompanyownershiptypeTableBinding()
  }
  GetCompanyownershiptypeTableBinding() {

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
          this.jtSorting = "ActiveStatus" + " " + dataTablesParameters.order[0].dir;
        }

        // that.contactservice.GetAllContacts("FirstName",this.AlphanumericSort, 1,this.searchmodel.Keyword,this.searchmodel.Owner,this.searchmodel.CompanyName, -1, this.userid, dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
        this.companyownershiptypeService.GetCompanyownerList(dataTablesParameters.start, dataTablesParameters.length, this.jtSorting, this.RecordCount).subscribe(resp => {

          var count = 0;
          that.companyownershiplist = resp;
          if (that.companyownershiplist.length > 0) {
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

          //  title:'<input type="checkbox" class="editor-active" style="">'
        },
        {
          title: 'Company Ownership Type Name',
          data: 'Name'
        },
        {
          title: 'Notes',
          data: 'Description'
        },
        {
          title: 'Status',
          data: 'ActiveStatus',

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
      if (rowdata.ActiveStatus == "Active") {
        this.statusval = 0;
      } else {
        this.statusval = 1;
      }
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.ID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
  }

  companyownershipCrudEventHandler(Id, Type) {

    if (Type == "status") {
      if (this.marked || this.checkedrowdata.length > 0) {

        this.companyownershiptypeService.UpdateStatusByIds(this.checkedrowdata, this.statusval).subscribe(res => {
          if (res != null) {
            this.checkedrowdata = [];
            this.Status();
            this.marked = false;
            this.toastr.successToastr("Companyownershiptype Status has been Changed Successfully.", "success", {
              timeOut: 5000
            });
          }
          else {
            this.toastr.errorToastr("Companyownershiptype Status Can't  Changed  !!!.", "Failed", {
              //timeOut: 5000
            });
          }
        });
      }
      else {

        this.titleforpopup = 'Please select  Record to change status!';
        this.textforpopup = '';
        this.Swa1alerts(Type, this.titleforpopup, this.textforpopup);

      }

    }
    else {
      this.router.navigate(["Setup/Companyownershiptype/ownershipcreateoredit/", Type, Id]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });

    }


  }
  Status(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  Swa1alerts(type, title, text) {

    if (type == "status") {
      Swal.fire({
        title: title,
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





}





