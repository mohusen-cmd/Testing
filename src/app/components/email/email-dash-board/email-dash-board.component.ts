import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TriggeredcampaignsService } from 'src/app/services/triggeredcampaigns.service';

@Component({
  selector: 'app-email-dash-board',
  templateUrl: './email-dash-board.component.html',
  styleUrls: ['./email-dash-board.component.scss']
})
export class EmailDashBoardComponent implements OnInit {
  dtOptions: any = {};
  size: any = 10
  p: any
  resultLength: any;
  startIndex: any = 0;
  pageSize: any = this.size;
  orderByClause: any = "camp_ID desc";
  totalCount: any = 0;
  comp: Array<any> = []
  compaid: Array<any> = []
  emailresult:any
  constructor(private triggeredcampaignsService: TriggeredcampaignsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getEmailDashboard()
  }
  displayedColumns: string[] = ['invoicetype', 'status'];

  getEmailDashboard() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
          this.spinner.show();

    this.triggeredcampaignsService.GetEmailDashBoard(dataTablesParameters.start, dataTablesParameters.length, this.orderByClause, this.totalCount).subscribe((data: any) => {
      this.spinner.hide()
      this.emailresult = data;
      console.log(data)
      var count = 0;

      if (this.emailresult.length > 0) {
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
    title: 'compaign ID'
},
{
    title: 'compaigns',
},
{
    title: 'scheduled date',
},
{
    title: 'status',
},
{
    title: 'contacts targeted',
},
{
  title: 'successfully delivered',
},
{
  title: 'bounced',
},
{
  title: 'Total Opens',
},
{
  title: 'Clicks',
},


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
}
