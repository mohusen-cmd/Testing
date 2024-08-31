import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { EmailModelDomainModel, EmailOpporSearchViewModel, ListDetailViewModel } from 'src/app/models/email-model-domain-model';
import { EmailService } from 'src/app/services/email.service';
import { OpportunityService } from 'src/app/services/opportunity.service';

@Component({
  selector: 'app-editopperlist',
  templateUrl: './editopperlist.component.html',
  styleUrls: ['./editopperlist.component.scss']
})
export class EditopperlistComponent implements OnInit {

  searchcolumn: string = "Name";
  alphanumericsort: string = undefined;
  keyword: any = undefined;
  companyid: any = -1;
  companyname: any = undefined;
  userid: any
  stageid: any = -1;
  jtstartindex: any = 0;
  jtpagesize: any = 10;
  jtsorting: any = "ID desc";
  recordcount: any = 0;
  resultLength: any;
  size: number = 10
  p: number;
  stageList: any = []
  emailModel: EmailModelDomainModel = new EmailModelDomainModel();
  OpporSearch: EmailOpporSearchViewModel = new EmailOpporSearchViewModel();
  ShowAdvanceSearchModal: boolean = false;
  checkedApiIds: any = [];
  checkedIds: any = [];
  @Input() Id: any
  moduleName: string;
  constructor(
    public emailservice: EmailService,
    public claimsHelper: ClaimsHelper,
    public opperservice: OpportunityService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService,) {
    this.emailModel.OpporSearch = new EmailOpporSearchViewModel();
    this.emailModel.ListDetails = new ListDetailViewModel()
  }

  ngOnInit(): void {
    if (this.Id != undefined || this.Id != null) {
      this.emailservice.GetLeadsListByID(this.Id).subscribe(res => {
        this.moduleName = res["ModuleName"];
        if (this.moduleName == "Opportunities") {
          this.OpporSearch = res["OpporSearch"];
          this.checkedIds = res["OpporSearch"].candListID.split(',');
          this.userid = this.claimsHelper.GetUserIdAPIKeyFromClaims()
          if (res["OpporSearch"].APIOpportunityId) {
            this.checkedApiIds = res["OpporSearch"].APIOpportunityId.split(',');
          }
          if (this.moduleName) {
            this.getopp();
          }
        }
      });
    }
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
      data.forEach((item) => {
        item.IsCheck = false; // Add an IsCheck property to each item and set it to false
      });

      data.forEach((item) => {
        // Mark items as checked based on their IDs in the checkedIds array
        this.checkedIds.forEach((item1) => {
          if (item.ContactID == item1) {
            item.IsCheck = true;
          }
        });
      });
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
    if (this.checkedIds.length != 0) {

      let checkedids = "";
      let checkedapiids = "";
      this.checkedIds.forEach(element => {
        ;
        let cama = checkedids == "" ? "" : ","
        checkedids = checkedids + cama + element;
      });
      this.checkedApiIds.forEach(item => {
        let cama = checkedapiids == "" ? "" : ","
        checkedapiids = checkedids + cama + item;
      })

      if (this.moduleName == "Opportunities") {
        this.OpporSearch.NumberOfContacts = this.checkedIds.length;
        this.OpporSearch.ApiID = checkedapiids;
        this.OpporSearch.ID = checkedids;
        this.emailModel.ListDetails.TargetAudience = this.OpporSearch.TargetAudience;
        this.emailModel.ListDetails.NumberOfContacts = this.OpporSearch.NumberOfContacts;
        this.emailModel.ListDetails.APIID = this.OpporSearch.ApiID;
        this.emailModel.ListDetails.ID = this.OpporSearch.ID;
        this.emailModel.ListDetails.TotalCount = this.OpporSearch.TotalCount;
        if (this.OpporSearch.ListID != "" && this.OpporSearch.ListID != "0" && this.OpporSearch.ListID != null) {
          this.emailModel.ListDetails.ListID = + this.OpporSearch.ListID;
        }
        if (this.emailModel.ListDetails.ListID != 0) {
          this.emailModel.ListDetails.ListName = this.OpporSearch.ListName;
          this.emailModel.ListDetails.Description = this.OpporSearch.Description;
          this.emailModel.ListDetails.APIListID = this.OpporSearch.APIListID;
        }
        this.emailModel.OpporSearch.OpporFilterID = + this.OpporSearch.OpporFilterID;
        this.emailModel.OpporSearch.ListID = this.OpporSearch.ListID;
        this.emailModel.OpporSearch.OppKeyword = this.OpporSearch.OppKeyword;
        this.emailModel.OpporSearch.OppOwner = this.OpporSearch.OppOwner;
        this.emailModel.OpporSearch.OppName = this.OpporSearch.OppName;
        this.emailModel.OpporSearch.OppExBudget = this.OpporSearch.OppExBudget;
        this.emailModel.OpporSearch.OppCompanyName = this.OpporSearch.OppCompanyName;
        this.emailModel.OpporSearch.StageID = this.OpporSearch.StageID;
        this.emailModel.OpporSearch.BusinessTypeID = this.OpporSearch.BusinessTypeID;
        this.emailModel.OpporSearch.OppState = this.OpporSearch.OppState;
        this.emailModel.OpporSearch.OppurtunitySourceID = this.OpporSearch.OppurtunitySourceID;
        this.emailModel.OpporSearch.OppContact = this.OpporSearch.OppContact;
      }

      this.ShowAdvanceSearchModal = true
    } else {
      this.toastr.errorToastr("Please select at least one Opportunities", 'Error')
    }



  }
  saveStatus(event) {
    this.ShowAdvanceSearchModal = false
  }

  activeInActiveToggle(event, rowdata, index) {
    if (event) {
      this.checkedApiIds.push(rowdata.APIContactID)
      this.checkedIds.push(rowdata.ContactID)
    } else {
      let APIContactIDindex = this.checkedApiIds.findIndex(item => item == rowdata.APIContactID)
      if (APIContactIDindex !== -1) {
        this.checkedApiIds.splice(APIContactIDindex, 1);
      }
      let ContactIDindex = this.checkedIds.findIndex(item => item == rowdata.ContactID)
      if (ContactIDindex !== -1) {
        this.checkedIds.splice(ContactIDindex, 1)
      }
      //  this.checkedApiIds.splice(index, 1)
      //  this.checkedIds.splice(index, 1)
      // this.checkedApiIds.splice(index, 1)
      // this.checkedIds.splice(index, 1)
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

