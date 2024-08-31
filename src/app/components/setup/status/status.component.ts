import { Component,  OnInit, ViewChild } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StatusService } from 'src/app/services/status.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { throwError } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  dtOptions: any = {};
  searchmodel: any = {};
  statuslist: any = [];
  jtSorting: any = "";
  RecordCount: any = 0;
  deletedids: any;
  marked:boolean= false;
  checkedrowdata: any = [];
  statusval: any;
  titleforpopup:any;
  textforpopup:any;
  constructor(private statusservice:StatusService,private router: Router,public toastr: ToastrManager,private spinner: NgxSpinnerService) { }

  ngOnInit() {
this.GetStatusListTableBinding();

  }


  GetStatusListTableBinding() {

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
          this.jtSorting = "StatusName" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 2) {
          this.jtSorting = "Description" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 3) {
          this.jtSorting = "ActiveStatus" + " " + dataTablesParameters.order[0].dir;
        }

        // that.contactservice.GetAllContacts("FirstName",this.AlphanumericSort, 1,this.searchmodel.Keyword,this.searchmodel.Owner,this.searchmodel.CompanyName, -1, this.userid, dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
        this.statusservice.GetStatusList(dataTablesParameters.start, dataTablesParameters.length, this.jtSorting, this.RecordCount).subscribe(resp => {

          var count = 0;
          that.statuslist = resp;
          if (that.statuslist.length > 0) {
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

        },
        {
          title: 'Status Type Name',
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
  Status(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  StatusCrudEventHandler(Id, Type) {

    if (Type == "status") {
      if (this.marked || this.checkedrowdata.length > 0) {

        this.statusservice.UpdateStatusByIds(this.checkedrowdata, this.statusval).subscribe(res => {
          if (res != null) {
            this.checkedrowdata = []
            this.Status();
            this.marked = false;
            this.toastr.successToastr(" Status has been Changed Successfully.", "success", {
              timeOut: 5000
            });
          }
          else {
            this.toastr.errorToastr(" Status Can't  Changed  !!!.", "Failed", {
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
      this.router.navigate(["Setup/Status/createoreditstatus/", Type, Id]).then(nav => {
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

}




