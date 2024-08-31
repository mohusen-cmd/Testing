import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventEmitter } from 'protractor';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { CompanyTypeDomainModel } from 'src/app/models/ICompanyTypeDomainModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyTypeService } from 'src/app/services/companytype.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-companytype',
  templateUrl: './companytype.component.html',
  styleUrls: ['./companytype.component.scss']
})
export class CompanytypeComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  dtOptions: any = {};
  searchmodel: any = {};
  companytypes: any = [];
  jtSorting: any = "";
  RecordCount: any = 0;
  deletedids: any;
  Companytype: any;
  marked: false;
  checkedrowdata: any = [];
  statusval: any;
  titleforpopup:any;
  textforpopup:any;
  constructor( private companytypeservice: CompanyTypeService,
    private router: Router, public toastr: ToastrManager,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.GetCompanytypeDataTableBinding();
  }
  GetCompanytypeDataTableBinding() {

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
        this.companytypeservice.GetcompanytypeInfo(dataTablesParameters.start, dataTablesParameters.length, this.jtSorting, this.RecordCount).subscribe(resp => {

          var count = 0;
          that.companytypes = resp;
          if (that.companytypes.length > 0) {
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
          title: 'CompanyType Name',
          data: 'Name'
        },
        {
          title: 'Type',
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

  companytypeCrudEventHandler(CompanyTypeId, Companytype) {

    if (Companytype == "status") {
      if (this.marked || this.checkedrowdata.length > 0) {
        if (this.statusval == "Active") {
          this.statusval = 1;
        }
        else {
          this.statusval = 0;
        }

        this.companytypeservice.UpdatecompanytypeStatusByIds(this.checkedrowdata, this.statusval).subscribe(res => {

          if (res != null) {
            this.checkedrowdata = []
            this.CompanyStatus();
            this.marked = false;
            this.toastr.successToastr("CompanyType Status has been Changed Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("CompanyType Status Can't  Changed  !!!.", "Failed", {
              //timeOut: 5000
            });
          }
        });
      }
      else {
        this.titleforpopup = 'Please select  Record to change status!';
        this.textforpopup = '';
        this.Swa1alerts(Companytype, this.titleforpopup, this.textforpopup);
      }

    }
    else {

      this.router.navigate(["Setup/Companytype/addnewcompany/", Companytype, CompanyTypeId]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });

    }


  }

  CompanyStatus() {

   
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
    // this.setPage({ offset: 0 });
  }
  activeInActiveToggle(e, rowdata) {

    this.marked = e.target.checked;
    if (this.marked) {
      this.checkedrowdata.push(rowdata.ID);
    } else {
      const index = this.checkedrowdata.indexOf(rowdata.ID);
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
    this.statusval = rowdata.ActiveStatus;
  }

  Swa1alerts(type, title, text) {

    if (type == "status") {
      Swal.fire({
        title: `<span style=" font-weight: normal;">${title}</span>`,
        text: text,
        type: "warning",
        backdrop: false,
        imageUrl: '',
        reverseButtons: true,
        showCancelButton: false,
        cancelButtonColor: '#ef4d4d',
        confirmButtonColor: '#448aff'

      }).then((result) => {
        if (result.value) {

        }
        else {

        }
      })
    }
  }



}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

