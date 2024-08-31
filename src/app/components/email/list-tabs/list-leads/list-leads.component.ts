import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CampaignListDomainModel } from 'src/app/models/CampaignListDomainModel';
import { EmailLeadSearchViewModel, EmailModelDomainModel, ListDetailViewModel, ListViewModel } from 'src/app/models/email-model-domain-model';

import { CommonService } from 'src/app/services/common.service';
import { EmailService } from 'src/app/services/email.service';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-list-leads',
  templateUrl: './list-leads.component.html',
  styleUrls: ['./list-leads.component.scss']
})
export class ListLeadsComponent implements OnInit {
  size: number = 10
  SearchColumn: string = "FirstName";
  AlphanumericSort: string = undefined;
  Keyword: string = undefined;
  OwnerName: any = undefined;
  userId: any = 0;
  Leadid: any = "0";
  StageId: any = 0;
  jtStartIndex: any = 0;
  jtPageSize: number = this.size
  jtSorting: string = "ID desc";
  RecordCount: any = 0;
  resultLength: number;
  p: number;
  @ViewChild('content', { static: true }) modal: any
  emailModel: EmailModelDomainModel = new EmailModelDomainModel();
  LeadSearch: EmailLeadSearchViewModel = new EmailLeadSearchViewModel();
  CampaignObj: CampaignListDomainModel = new CampaignListDomainModel()
  ShowAdvanceSearchModal: boolean = false;
  checkedApiIds: any = [];
  checkedIds: any = [];
  moduleName: any;
  
  constructor(
    public leadservice: LeadService,
    private modalService: NgbModal,
    public climes: ClaimsHelper,
    public commonservice: CommonService,
    public toastr: ToastrManager,
    public emailservice: EmailService,
    private spinner: NgxSpinnerService,) {
    this.emailModel.ListDetails = new ListDetailViewModel()
    this.emailModel.LeadSearch = new EmailLeadSearchViewModel();


  }

  ngOnInit() {
    this.userId = this.climes.GetUserIdAPIKeyFromClaims();
    this.getLeads();
    // if (this.Id) {
    //   this.emailservice.GetCampaignListByID(this.Id).subscribe((responce: CampaignListDomainModel) => {
    //     this.CampaignObj = responce
    //     this.moduleName=responce["target_audience"]
    //     console.log(this.moduleName)
    //     this.emailservice.GetLeadsListByID(this.Id).subscribe((responce: EmailLeadSearchViewModel) => {
    //       this.emailModel.LeadSearch = responce

    //     })
    //   })
    // }
  }
  getLeads() {
    this.spinner.show()
    this.userId = this.climes.GetUserIdAPIKeyFromClaims()
    this.leadservice.GetLeads(this.SearchColumn, this.AlphanumericSort, this.Keyword, this.OwnerName, this.userId, this.Leadid, this.StageId,
      this.jtStartIndex, this.jtPageSize, this.jtSorting, this.RecordCount).subscribe((result: any) => {
        this.spinner.hide()
        this.dataSource.data = result;
        this.resultLength = result[0].RecordsCount
      }, (err: AppError) => {
        this.spinner.hide()
        if (err instanceof BadInputError) {
          window.alert("Bad Request:" + err.originalError)
        }
        else if (err instanceof NotFoundError) {
          window.alert("404 Error Occured!")
        }
        else {
          window.alert("An unexpected Error Occured!")
        }
      }
      )

  }
  searchEventHandler() {
    this.SearchColumn = (this.SearchColumn == "") ? undefined : "FirstName";
    this.AlphanumericSort = (this.AlphanumericSort == "") ? undefined : this.AlphanumericSort;
    this.Keyword = (this.Keyword == "") ? undefined : this.Keyword;
    this.OwnerName = (this.OwnerName == "") ? undefined : this.OwnerName
    this.getLeads();
  }

  OnClear() {
    this.p = 1
    this.SearchColumn = "FirstName";
    this.AlphanumericSort = undefined;
    this.Keyword = undefined;
    this.OwnerName = undefined;
    this.userId = this.userId
    this.Leadid = 0;
    this.StageId = 0;
    this.jtStartIndex = 0;
    this.jtPageSize = this.size;
    this.jtSorting = "ID desc";
    this.RecordCount = 0;
    this.getLeads();
  }

  NavigatetonewPop() {
    if (this.checkedApiIds.length != 0) {
      this.emailModel.ListDetails.APIID = this.checkedApiIds.toString()
      this.emailModel.ListDetails.APIListID = null
      this.emailModel.ListDetails.Description = null
      this.emailModel.ListDetails.ID = this.checkedIds.toString()
      this.emailModel.ListDetails.ListID = 0
      this.emailModel.ListDetails.ListName = null
      this.emailModel.ListDetails.NumberOfContacts = this.checkedIds.length
      this.emailModel.ListDetails.TargetAudience = "Leads"
      this.emailModel.ListDetails.TotalCount = this.checkedIds.length
      this.emailModel.ListDetails.userID = null
      this.ShowAdvanceSearchModal = true
    } else {
      this.toastr.errorToastr("Please select at least one Leads", 'Error')
    }

  }
  activeInActiveToggle(event, rowdata, index) {
    if (event) {
      this.checkedApiIds.push(rowdata.APIContactID)
      this.checkedIds.push(rowdata.ContactID)
    } else {
      this.checkedApiIds.splice(index, 1)
      this.checkedIds.splice(index, 1)
    }

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; optherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  paginate(event: any) {
    this.SearchColumn = "FirstName";
    this.AlphanumericSort = this.AlphanumericSort;
    this.Keyword = this.Keyword;
    this.OwnerName = this.OwnerName;
    this.userId = this.userId = this.climes.GetUserIdAPIKeyFromClaims()
    this.Leadid = "0";
    this.StageId = 0;
    this.jtStartIndex =  (event - 1) * this.size
    this.jtPageSize = this.size
    this.jtSorting = "ID desc";
    this.RecordCount = 0;
    this.getLeads()
  }

  saveStatus($event: any) {
    this.ShowAdvanceSearchModal = $event
  }

  displayedColumns: string[] = ['select', 'CreatedDate', 'LeadName', 'Company', 'Email', 'Phone', 'LeadSource', 'LeadOwner', 'LeadStatus'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);









}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


