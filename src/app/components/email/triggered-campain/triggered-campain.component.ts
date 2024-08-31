
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';

import { TriggeredcampaignsService } from 'src/app/services/triggeredcampaigns.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-triggered-campain',
  templateUrl: './triggered-campain.component.html',
  styleUrls: ['./triggered-campain.component.scss']
})
export class TriggeredCampainComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  size: any = 10

  resultLength: any;
  startIndex: any = 0;
  pageSize: any = this.size;
  orderByClause: any = "camp_ID desc";
  totalCount: any = 0;
  dtOptions: any = {};
  triggeredresult:any
  constructor(
    private spinner: NgxSpinnerService,
    public router: Router,
    public triggeredcampaignsService: TriggeredcampaignsService) { }
  ngOnInit() {
    this.getTrigCompaign()

  }


  getTrigCompaign() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
          this.spinner.show();

    this.triggeredcampaignsService.GetTriggercampaignsList(dataTablesParameters.start, dataTablesParameters.length, this.orderByClause, this.totalCount).subscribe((data: any) => {
      this.spinner.hide()
      this.triggeredresult = data;
      console.log(data)
      var count = 0;

      if (this.triggeredresult.length > 0) {
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
    title: 'DELETE'
},
{
    title: 'EDIT',
},
{
    title: 'COMPAIGN ID',
},
{
    title: 'COMPAIGN NAME',
},
{
    title: 'CREATION DATE',
},
{
  title: 'SCHEDULED DATE',
},
{
  title: 'STATUS',
},
{
  title: 'CONTACTS TARGETED',
},
{
  title: 'SUCCESSFULLY DELIVERED',
},
{
  title: 'BOUNCED',
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

  onTragger() {
    this.router.navigate(["/Email/CreateTriggerCampaign/EditTriggerCampaign"])

  }
  
  DeleteCampaignbyCampaignID(campID) {
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
        this.triggeredcampaignsService.DeleteCampaignbyId(campID).subscribe(res => {
          if (res) {
            this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.draw();
            })
            Swal.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success'
            ).then((result) => {
              this.router.navigate(["/Email/TriggeredCampaigns"]).then(nav => {
                console.log(nav);
              }, err => {
                console.log(err)
              });
            });
          }
        });
      }
    })
  }

  onEditview(rowdata: any) {

    if (rowdata.Status === 'Pending') {
      alert(`This Campaign is already Schedule.`)
      return;
    }
    else if (rowdata.Status === 'Draft') {
      this.router.navigate([`/Email/CreateTriggerCampaign/EditTriggerCampaign`], { queryParams: { camp_ID: rowdata.camp_ID } })
    }


  }
}
