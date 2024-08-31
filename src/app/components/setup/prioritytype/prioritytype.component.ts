import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AnyForUntypedForms, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { PriorityDomainModel } from 'src/app/models/PriorityDomainModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PriorityService } from 'src/app/services/priority.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-prioritytype',
  templateUrl: './prioritytype.component.html',
  styleUrls: ['./prioritytype.component.scss']
})
export class PrioritytypeComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  dtOptions: any = {};
  priorities: any = [];
  jtSorting: any = "";
  RecordCount: any = 0;
  deletedids: any = [];
  marked:boolean= false;
  checkedrowdata: any = [];
  statusval: any;
  titleforpopup:any;
  textforpopup:any;
  constructor(private priorityserivce: PriorityService,
    private router: Router,public toastr: ToastrManager,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.GetPriorityDataTableBinding();
  }
  GetPriorityDataTableBinding() {
    this.spinner.show();
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        
        if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 0) {
          this.jtSorting = "ID" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 1) {
          this.jtSorting = "PriorityName" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 2) {
          this.jtSorting = "Description" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 3) {
          this.jtSorting = "ActiveStatus" + " " + dataTablesParameters.order[0].dir;
        }

        // that.contactservice.GetAllContacts("FirstName",this.AlphanumericSort, 1,this.searchmodel.Keyword,this.searchmodel.Owner,this.searchmodel.CompanyName, -1, this.userid, dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
        that.priorityserivce.GetPrioritytypeInfo(dataTablesParameters.start, dataTablesParameters.length, this.jtSorting, this.RecordCount).subscribe(resp => {
          
          var count = 0;
          that.priorities = resp;
          if (that.priorities.length > 0) {
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
      //columns: [{  title: 'Delete',data: 'id' }, {title: 'View/Edit', data: 'FirstName' }, {title: 'Contact Name', data: 'ContactName' },{title: 'Company Name', data: 'ContactCompanyName' },{title: 'Contact Owner', data: 'OwnerfirstName' },{title: 'Department', data: 'DepartmentText' }],
      columns: [
        {

          //  title:'<input type="checkbox" class="editor-active" style="">'
        },

        {
          title: 'Priority Name',
          data: 'PriorityName'
        },
        {
          title: 'Type',
          data: 'Description'
        },
        {
          title: 'Status',
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
 



  PriorityCrudEventHandler(PriorityTypeId, PriorityType) {
    if (PriorityType == "status") {
      if (this.marked || this.checkedrowdata.length > 0) {
        if (this.statusval == "Active") {
          this.statusval = 1;
        }
        else {
          this.statusval = 0;
        }
        this.priorityserivce.UpdatePriorityStatusByIds(this.checkedrowdata, this.statusval).subscribe(res => {
          if (res != null) {
            this.checkedrowdata = []
            this.marked = false;
            this.PriorityStatus();
            this.toastr.successToastr("PriorityType Status has been Changed Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("PriorityType Status Can't  Changed  !!!.", "Failed!", {
              timeOut: 3000
            });
          }
        });
      }
      else {
        this.titleforpopup = 'Please select  Record to change status!';
        this.textforpopup = '';
        this.Swa1alerts(PriorityType, this.titleforpopup, this.textforpopup);
      }
    }
    else {
      this.router.navigate(["Setup/Prioritytype/addnewprioritytype/", PriorityType, PriorityTypeId]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    }
  }
  PriorityStatus() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
    // this.setPage({ offset: 0 });
  }
  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.ID);
      this.statusval = rowdata.ActiveStatus;
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.ID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
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



