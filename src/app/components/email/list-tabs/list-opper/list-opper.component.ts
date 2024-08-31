import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { EmailModelDomainModel, EmailOpporSearchViewModel, ListDetailViewModel } from 'src/app/models/email-model-domain-model';
import { OpportunityService } from 'src/app/services/opportunity.service';

@Component({
  selector: 'app-list-opper',
  templateUrl: './list-opper.component.html',
  styleUrls: ['./list-opper.component.scss']
})
export class ListOpperComponent implements OnInit {
  size: number = 10
  searchcolumn: string = "Name";
  alphanumericsort: string = undefined;
  keyword: any = undefined;
  companyid: any = -1;
  companyname: any = undefined;
  userid: any
  stageid: any = -1;
  jtstartindex: any = 0;
  jtpagesize: any = this.size;
  jtsorting: any = "ID desc";
  recordcount: any = 0;
  resultLength: any;
  p: number;
  stageList: any = []
  emailModel: EmailModelDomainModel = new EmailModelDomainModel();
  OpporSearch: EmailOpporSearchViewModel = new EmailOpporSearchViewModel();
  ShowAdvanceSearchModal: boolean = false;
  checkedApiIds: any = [];
  checkedIds: any = [];
  constructor(
    public claimsHelper: ClaimsHelper,
    public opperservice: OpportunityService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService) {
    this.emailModel.OpporSearch = new EmailOpporSearchViewModel();
    this.emailModel.ListDetails = new ListDetailViewModel()
  }

  ngOnInit(): void {
    this.userid = this.claimsHelper.GetUserIdAPIKeyFromClaims()
    this.getopp();
    this.LoadStageDropdownlist()
  }
  
  LoadStageDropdownlist() {
    this.opperservice.GetStageList().subscribe((res: any) => {
      this.stageList = res["StageListDM"];
    })
  }

  getopp() {
    this.spinner.show()
    this.opperservice.GetOpportunityList(this.searchcolumn, this.alphanumericsort, this.keyword, this.companyid, this.companyname, this.userid, this.stageid, this.jtstartindex, this.jtpagesize, this.jtsorting, this.recordcount).subscribe((data: any) => {
      this.spinner.hide()
      this.dataSource.data = data
      this.resultLength = data[0].RecordCount;
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
    })
  }
  searchEventHandler() {

    this.searchcolumn = "Name";
    this.alphanumericsort = undefined;
    this.keyword = (this.keyword == undefined) ? undefined : this.keyword;
    this.companyid = -1;
    this.companyname = (this.companyname == undefined) ? undefined : this.companyname;
    this.userid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    this.stageid = (this.stageid == -1) ? -1 : this.stageid;
    this.jtstartindex = 0;
    this.jtpagesize = this.size;
    this.jtsorting = "ID desc";
    this.recordcount = 0;
    this.p = 1
    this.getopp();
  }
  OnClear() {

    this.searchcolumn = "Name";
    this.alphanumericsort = undefined;
    this.keyword = undefined;
    this.companyid = -1;
    this.companyname = undefined;
    this.userid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    this.stageid = -1;
    this.jtstartindex = 0;
    this.jtpagesize = this.size;
    this.jtsorting = "ID desc";
    this.recordcount = 0;
    this.p = 1
    this.getopp();
  }
  onPageChange(event) {
    this.searchcolumn = "Name";
    this.alphanumericsort = this.alphanumericsort;
    this.keyword = this.keyword;
    this.companyid = -1;
    this.companyname = this.companyname
    this.userid = this.claimsHelper.GetUserIdAPIKeyFromClaims()
    this.stageid = this.stageid;
    this.jtstartindex =  (event - 1) * this.size;
    this.jtpagesize = this.size;
    this.jtsorting = "ID desc";
    this.recordcount = 0;
    this.getopp()
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
      this.emailModel.ListDetails.TargetAudience = "Opportunities"
      this.emailModel.ListDetails.TotalCount = this.checkedIds.length
      this.emailModel.ListDetails.userID = null
      this.ShowAdvanceSearchModal = true
    } else {
      this.toastr.errorToastr("Please select at least one Opportunities", 'Error')
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

  saveStatus(event) {
    this.ShowAdvanceSearchModal = false
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

