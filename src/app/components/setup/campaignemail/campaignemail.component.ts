import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CampaignService } from 'src/app/services/campaign.service';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { PeriodicElement } from '../activitytype/activitytype.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { CampaignemailService } from 'src/app/services/campaignemail.service';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-campaignemail',
  templateUrl: './campaignemail.component.html',
  styleUrls: ['./campaignemail.component.scss']
})
export class CampaignemailComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  dtOptions: any = {};
  emailslist: any = [];
  jtSorting: any = "";
  RecordCount: any = 0;
  deletedids: any = [];
  marked:boolean= false;
  checkedrowdata: any = [];
  statusval: any;
  titleforpopup: any;
  textforpopup: any;
  userId: any
  constructor(private claimsHelper: ClaimsHelper, private spinner: NgxSpinnerService,   public campaignService: CampaignService, private router: Router, public toastr: ToastrManager) {
    this.userId = + claimsHelper.GetUserIdAPIKeyFromClaims();
  }

  ngOnInit() {
    this.GetEmailDataTableBinding();
  }
  GetEmailDataTableBinding() {

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {debugger
        this.spinner.show();
        if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 0) {
          this.jtSorting = "ID" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 1) {
          this.jtSorting = "Name" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 2) {
          this.jtSorting = "Email" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 3) {
          this.jtSorting = "Status" + " " + dataTablesParameters.order[0].dir;
        }

        // that.contactservice.GetAllContacts("FirstName",this.AlphanumericSort, 1,this.searchmodel.Keyword,this.searchmodel.Owner,this.searchmodel.CompanyName, -1, this.userid, dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
        that.campaignService.GetCampaignInfo(dataTablesParameters.start, dataTablesParameters.length, this.jtSorting, this.userId, this.RecordCount).subscribe(resp => {

          var count = 0;
          that.emailslist = resp;
          if (that.emailslist.length > 0) {
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
          (err: AppError) => {
            this.spinner.hide();
            if (err instanceof BadInputError) {
              window.alert("Bad Request:" + err.originalError)
            }
            else if (err instanceof NotFoundError) {
              window.alert("404 Error Occured!")
            }
            else {
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
          title: 'Name',
          data: 'Name'
        },
        {
          title: 'Email',
          data: 'Email'
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


  CampaignemailCrudEventHandler(EmailId, Emailtype) {

    // row.push(type);  
    if (Emailtype == "status") {
      if (this.marked || this.checkedrowdata.length > 0) {

        if (this.statusval == "Active") {
          this.statusval = 1;
        }
        else {
          this.statusval = 0;
        }
        this.campaignService.UpdateCampaignStatusByIds(this.checkedrowdata, this.statusval).subscribe(res => {

          if (res != null) {

            this.checkedrowdata = []
            this.marked = false;
            this.Status();
            this.toastr.successToastr("Campaignemail Status has been Changed Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("Campaignemail Status Can't  Changed  !!!.", "Failed!", {
              timeOut: 3000
            });
          }
        });
      }
      else {
        this.titleforpopup = 'Please select  Record to change status!';
        this.textforpopup = '';
        this.Swa1alerts(Emailtype, this.titleforpopup, this.textforpopup);
      }
    }
    else {

      this.router.navigate(["Setup/Campaignemails/addnewcampaignemail/", Emailtype, EmailId]).then(nav => {
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
  
  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.ID);
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.ID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
    this.statusval = rowdata.Status;
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



  

  deleteMsg(rowdata: any, index: number) {
    const deleteid = (JSON.stringify(rowdata.ID))
    var result = confirm(`You are about to Delete the Campaign Email.Are you sure you want to Delete the Record ?`)
    if (result) {
      this.campaignService.DeleteCampaignID(deleteid).subscribe((response) => {
       
      })
    }

  }






}



