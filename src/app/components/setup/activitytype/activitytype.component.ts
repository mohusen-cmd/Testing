import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ActivityService } from 'src/app/services/activity.service';
import { ActivityTypeservice } from 'src/app/services/activitytype.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-activitytype',
  templateUrl: './activitytype.component.html',
  styleUrls: ['./activitytype.component.scss']
})
export class ActivitytypeComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  dtOptions: any = {};
  activities: any = [];
  jtSorting: any = "";
  RecordCount: any = 0;
  deletedids: any = [];
  marked:boolean= false;
  checkedrowdata: any = [];
  statusval: any;
  titleforpopup: any;
  textforpopup: any;
  constructor(private spinner: NgxSpinnerService,private activityservice: ActivityTypeservice, private router: Router, public toastr: ToastrManager) { }

  ngOnInit() {


    this.GetActivityDataTableBinding();

  }

  GetActivityDataTableBinding() {

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
this.spinner.show();
        if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 0) {
          this.jtSorting = "Aid" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 1) {
          this.jtSorting = "Name" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 2) {
          this.jtSorting = "Type" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 3) {
          this.jtSorting = "Status" + " " + dataTablesParameters.order[0].dir;
        }

        // that.contactservice.GetAllContacts("FirstName",this.AlphanumericSort, 1,this.searchmodel.Keyword,this.searchmodel.Owner,this.searchmodel.CompanyName, -1, this.userid, dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
        that.activityservice.GetActivityTypeInfo(dataTablesParameters.start, dataTablesParameters.length, this.jtSorting, this.RecordCount).subscribe(resp => {

          var count = 0;
          that.activities = resp;
          if (that.activities.length > 0) {
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
          title: ' ',
          
        },
        {
          title: 'Activity Name',
          data: 'Name'
        },
        {
          title: 'Type',
          data: 'Type'
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


  ActivitityStatus() {

    
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
    // this.setPage({ offset: 0 });
  }


  //[edit] BY vamshi


  ActivityCrudEventHandler(ActivityTypeId, Activitytype) {

    if (Activitytype == "status") {
      if (this.marked || this.checkedrowdata.length > 0) {
        if (this.statusval == "Active") {
          this.statusval = 1;
        }
        else {
          this.statusval = 0;
        }
        this.activityservice.UpdateactivityStatusByIds(this.checkedrowdata, this.statusval).subscribe(res => {
          if (res != null) {
            this.checkedrowdata = []
            this.marked = false;
            this.ActivitityStatus()
            this.toastr.successToastr("ActivityType Status has been Changed Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("ActivityType Status Can't  Changed  !!!.", "Failed!", {
              timeOut: 3000
            });
          }
        });
      }
      else {
        this.titleforpopup = 'Please select  Record to change status!';
        this.textforpopup = '';
        this.Swa1alerts(Activitytype, this.titleforpopup, this.textforpopup);
      }

    }
    else {

      this.router.navigate(["Setup/Activitytype/addnewactivity/", Activitytype, ActivityTypeId]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    }
  }

  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;

    if (this.marked) {
      this.checkedrowdata.push(rowdata.AID);
    } else {
      const index = this.checkedrowdata.indexOf(rowdata.AID);
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }

    this.statusval = rowdata.Status;
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


