import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CampaignListDomainModel } from 'src/app/models/CampaignListDomainModel';
import { EmailContactSearchViewModel, EmailLeadSearchViewModel, EmailModelDomainModel, EmailOpporSearchViewModel, ListDetailViewModel } from 'src/app/models/email-model-domain-model';
import { CommonService } from 'src/app/services/common.service';
import { ContactService } from 'src/app/services/contact.service';
import { EmailService } from 'src/app/services/email.service';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-editlist-tab',
  templateUrl: './editlist-tab.component.html',
  styleUrls: ['./editlist-tab.component.scss']
})
export class EditlistTabComponent implements OnInit {
  SearchColumn: string = "FirstName";
  AlphanumericSort: string = undefined;
  Keyword: string = undefined;
  OwnerName: any = undefined;
  userId: any = 0;
  Leadid: any = "0";
  StageId: any = 0;
  jtStartIndex: any = 0;
  jtPageSize: number = 10
  jtSorting: string = "ID desc";
  RecordCount: any = 0;
  resultLength: number;
  size: number = 10
  p: number;
  emailModel: EmailModelDomainModel = new EmailModelDomainModel();
  LeadSearch: EmailLeadSearchViewModel = new EmailLeadSearchViewModel();
  CampaignObj: CampaignListDomainModel = new CampaignListDomainModel()
  ContactSearch: EmailContactSearchViewModel = new EmailContactSearchViewModel();
  OpporSearch: EmailOpporSearchViewModel = new EmailOpporSearchViewModel();
  ShowAdvanceSearchModal: boolean = false;
  checkedApiIds: any = [];
  checkedIds: any = [];
  moduleName: any;
  @Input() Id: any
  oppList: any[];
  companyid: any;
  stageList: any;
  selectedtab: any;
  checkedlistid: any = [];
  displayedColumns: string[] = ['select', 'CreatedDate', 'LeadName', 'Company', 'Email', 'Phone', 'LeadSource', 'LeadOwner', 'LeadStatus'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);
  constructor(private activeRoute: ActivatedRoute,
    public emailservice: EmailService,
    public leadservice: LeadService,
    public contactservice: ContactService,
    public climes: ClaimsHelper,
    public commonservice: CommonService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService,
  ) {
    this.emailModel.ListDetails = new ListDetailViewModel()
    this.emailModel.LeadSearch = new EmailLeadSearchViewModel();
    this.emailModel.ContactSearch = new EmailContactSearchViewModel();
    this.emailModel.OpporSearch = new EmailOpporSearchViewModel();
  }

  ngOnInit(): void {
    // this.activeRoute.queryParamMap.subscribe((params) => {
    //   this.Id = params.get("ListID");
    // })
    if (this.Id != undefined) {
      this.emailservice.GetLeadsListByID(this.Id).subscribe(res => {
        this.moduleName = res["ModuleName"];
        if (this.moduleName == "Leads") {
          this.LeadSearch = res["LeadSearch"];
          this.checkedIds = res["LeadSearch"].candListID.split(',');
          if (res["LeadSearch"].APILeadId) {
            this.checkedApiIds = res["LeadSearch"].APILeadId.split(',');
          }
          if (this.moduleName) {
            this.getLeads();
          }
        }

      });
    }
    this.userId = this.climes.GetUserIdAPIKeyFromClaims();
  }

  getLeads() {
    this.spinner.show()
    this.userId = this.climes.GetUserIdAPIKeyFromClaims()
    this.leadservice.GetLeads(this.SearchColumn, this.AlphanumericSort, this.Keyword, this.OwnerName, this.userId, this.Leadid, this.StageId,
      this.jtStartIndex, this.jtPageSize, this.jtSorting, this.RecordCount).subscribe((result: any) => {
        this.spinner.hide()
        result.forEach((item) => {
          item.IsCheck = false; // Add an IsCheck property to each item and set it to false
        });

        result.forEach((item) => {
          // Mark items as checked based on their IDs in the checkedIds array
          this.checkedIds.forEach((item1) => {
            if (item.ContactID == item1) {
              item.IsCheck = true;
            }
          });
        });
        this.dataSource.data = result;
        this.resultLength = result[0]?.RecordsCount
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
    if (this.moduleName == "Leads") {
      this.SearchColumn = (this.SearchColumn == "") ? undefined : "FirstName";
      this.AlphanumericSort = (this.AlphanumericSort == "") ? undefined : this.AlphanumericSort;
      this.Keyword = (this.Keyword == "") ? undefined : this.Keyword;
      this.OwnerName = (this.OwnerName == "") ? undefined : this.OwnerName
      this.jtStartIndex = 0
      this.jtPageSize = 5
      this.getLeads();
    }


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
      if (this.moduleName == "Leads") {
        this.LeadSearch.NumberOfContacts = this.checkedIds.length;
        this.LeadSearch.ApiID = checkedapiids;
        this.LeadSearch.ID = checkedids;
        this.emailModel.ListDetails.TargetAudience = this.LeadSearch.TargetAudience;
        this.emailModel.ListDetails.NumberOfContacts = this.LeadSearch.NumberOfContacts;
        this.emailModel.ListDetails.APIID = this.LeadSearch.ApiID;
        this.emailModel.ListDetails.ID = this.LeadSearch.ID;
        this.emailModel.ListDetails.TotalCount = this.LeadSearch.TotalCount ? this.LeadSearch.TotalCount : this.LeadSearch.NumberOfContacts;

        if (this.LeadSearch.ListID != "" && this.LeadSearch.ListID != "0" && this.LeadSearch.ListID != null) {
          this.emailModel.ListDetails.ListID = + this.LeadSearch.ListID;
        }
        if (this.emailModel.ListDetails.ListID != 0) {
          this.emailModel.ListDetails.ListName = this.LeadSearch.ListName;
          this.emailModel.ListDetails.Description = this.LeadSearch.Description;
          this.emailModel.ListDetails.APIListID = this.LeadSearch.APIListID;
        }
        this.emailModel.LeadSearch.LeadFilterID = + this.LeadSearch.LeadFilterID;
        this.emailModel.LeadSearch.LeadKeyword = this.LeadSearch.LeadKeyword;
        this.emailModel.LeadSearch.LeadLeadOwner = this.LeadSearch.LeadLeadOwner;
        this.emailModel.LeadSearch.LeadCompanyName = this.LeadSearch.LeadCompanyName;
        this.emailModel.LeadSearch.LeadEmail = this.LeadSearch.LeadEmail;
        this.emailModel.LeadSearch.LeadFirstName = this.LeadSearch.LeadFirstName;
        this.emailModel.LeadSearch.LeadLastName = this.LeadSearch.LeadLastName;
        this.emailModel.LeadSearch.LeadCity = this.LeadSearch.LeadCity;
        this.emailModel.LeadSearch.LeadState = this.LeadSearch.LeadState;
        this.emailModel.LeadSearch.LeadZipCode = this.LeadSearch.LeadZipCode;
        this.emailModel.LeadSearch.LeadCountry = this.LeadSearch.LeadCountry;
      }
      this.ShowAdvanceSearchModal = true
    }
    else {
      this.toastr.errorToastr("Please select at least one Leads", 'Error')
    }

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
    }
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


}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
