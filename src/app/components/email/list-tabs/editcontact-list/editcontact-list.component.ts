import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { EmailContactSearchViewModel, EmailLeadSearchViewModel, EmailModelDomainModel, ListDetailViewModel } from 'src/app/models/email-model-domain-model';
import { CommonService } from 'src/app/services/common.service';
import { ContactService } from 'src/app/services/contact.service';
import { EmailService } from 'src/app/services/email.service';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-editcontact-list',
  templateUrl: './editcontact-list.component.html',
  styleUrls: ['./editcontact-list.component.scss']
})
export class EditcontactListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'CreatedDate', 'LeadName', 'Company', 'Email', 'Phone'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<PeriodicElement>(true, []);
  size: any = 10;
  SearchColumn: string = "FirstName";
  AlphanumericSort: string = undefined;
  Createdby: any = 1;
  Contactkeyword: any = undefined//
  OwnerName: any = undefined;
  CompanyName: any = undefined//
  CompanyId: any = -1;
  userId: any
  jtStartIndex: any = 0;
  jtPageSize: any = this.size;
  jtSorting: string = "ID desc";
  RecordCount: any = 0;
  resultLength: any;
  p: any
  ShowAdvanceSearchModal: boolean = false
  emailModel: EmailModelDomainModel = new EmailModelDomainModel();
  ContactSearch: EmailContactSearchViewModel = new EmailContactSearchViewModel();
  checkedApiIds: any = [];
  checkedIds: any = [];
  moduleName: any;
  @Input() Id: any
  constructor(public climesHelper: ClaimsHelper,
    private activeRoute: ActivatedRoute,
    public emailservice: EmailService,
    public leadservice: LeadService,
    public contactservice: ContactService,
    public climes: ClaimsHelper,
    public commonservice: CommonService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService,) {
    this.userId = this.climesHelper.GetUserIdAPIKeyFromClaims()
    this.Createdby = this.climesHelper.GetUserIdAPIKeyFromClaims()
    this.emailModel.ContactSearch = new EmailContactSearchViewModel();
    this.emailModel.ListDetails = new ListDetailViewModel()
    this.emailModel.ListDetails = new ListDetailViewModel()
    this.emailModel.LeadSearch = new EmailLeadSearchViewModel();
    this.emailModel.ContactSearch = new EmailContactSearchViewModel();
  }

  ngOnInit(): void {
    // this.activeRoute.queryParamMap.subscribe((params) => {
    //   this.Id = params.get("ListID");
    // })
    if (this.Id != undefined) {
      this.emailservice.GetLeadsListByID(this.Id).subscribe(res => {

        this.moduleName = res["ModuleName"];
        if (this.moduleName == "Contacts") {
          this.ContactSearch = res["ContactSearch"];
          this.checkedIds = res["ContactSearch"].candListID.split(',');
          if (res["ContactSearch"].APIContactId) {
            this.checkedApiIds = res["ContactSearch"].APIContactId.split(',');
          }
          if (this.moduleName) {
            this.getContact()
          }
        }
      });
    }
    this.userId = this.climes.GetUserIdAPIKeyFromClaims();
  }

  getContact() {
    this.spinner.show()
    this.userId = this.climes.GetUserIdAPIKeyFromClaims()
    this.contactservice.GetContacts(this.SearchColumn, this.AlphanumericSort, this.Createdby, this.Contactkeyword,
      this.OwnerName, this.CompanyName, this.CompanyId, this.userId, this.jtStartIndex, this.jtPageSize, this.jtSorting, this.RecordCount).subscribe((data: any) => {

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
        this.dataSource.data = data;
        this.resultLength = data[0].RecordsCount
        this.spinner.hide()
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
    this.Contactkeyword = (this.Contactkeyword == undefined) ? undefined : this.Contactkeyword;
    this.CompanyName = (this.CompanyName == undefined) ? undefined : this.CompanyName;
    this.OwnerName = (this.OwnerName == undefined) ? undefined : this.OwnerName;
    this.getContact();
  }

  OnClear() {
    this.AlphanumericSort = undefined
    this.Contactkeyword = undefined
    this.CompanyName = undefined
    this.userId = this.climesHelper.GetUserIdAPIKeyFromClaims();
    this.OwnerName = undefined
    this.jtStartIndex = 0
    this.p = 1
    this.getContact();
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
      if (this.moduleName == "Contacts") {
        this.ContactSearch.NumberOfContacts = this.checkedIds.length;
        this.ContactSearch.ApiID = checkedapiids;
        this.ContactSearch.ID = checkedids;
        this.emailModel.ListDetails.TargetAudience = this.ContactSearch.TargetAudience;
        this.emailModel.ListDetails.NumberOfContacts = this.ContactSearch.NumberOfContacts;
        this.emailModel.ListDetails.APIID = this.ContactSearch.ApiID;
        this.emailModel.ListDetails.ID = this.ContactSearch.ID;
        this.emailModel.ListDetails.TotalCount = this.ContactSearch.TotalCount;
        if (this.ContactSearch.ListID != "" && this.ContactSearch.ListID != "0" && this.ContactSearch.ListID != null) {
          this.emailModel.ListDetails.ListID = + this.ContactSearch.ListID;
        }
        if (this.emailModel.ListDetails.ListID != 0) {
          this.emailModel.ListDetails.ListName = this.ContactSearch.ListName;
          this.emailModel.ListDetails.Description = this.ContactSearch.Description;
          this.emailModel.ListDetails.APIListID = this.ContactSearch.APIListID;
        }
        this.emailModel.ContactSearch.ContactFilterID = + this.ContactSearch.ContactFilterID;
        this.emailModel.ContactSearch.ListID = this.ContactSearch.ListID;
        this.emailModel.ContactSearch.ContactKeyword = this.ContactSearch.ContactKeyword;
        this.emailModel.ContactSearch.ContactOwner = this.ContactSearch.ContactOwner;
        this.emailModel.ContactSearch.ContactCompanyName = this.ContactSearch.ContactCompanyName;
        this.emailModel.ContactSearch.ContactEmail = this.ContactSearch.ContactEmail;
        this.emailModel.ContactSearch.ContactFirstName = this.ContactSearch.ContactFirstName;
        this.emailModel.ContactSearch.ContactLastName = this.ContactSearch.ContactLastName;
        this.emailModel.ContactSearch.ContactCity = this.ContactSearch.ContactCity;
        this.emailModel.ContactSearch.ContactState = this.ContactSearch.ContactState;
        this.emailModel.ContactSearch.ContactZipCode = this.ContactSearch.ContactZipCode;
        this.emailModel.ContactSearch.ContactTypeID = this.ContactSearch.ContactTypeID;
      }

      this.ShowAdvanceSearchModal = true
    } else {
      this.toastr.errorToastr("Please select at least one Contacts", 'Error')
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
  paginate(event) {
    this.SearchColumn = "FirstName";
    this.AlphanumericSort = this.AlphanumericSort;
    this.Createdby = this.climesHelper.GetUserIdAPIKeyFromClaims()
    this.Contactkeyword = this.Contactkeyword
    this.OwnerName = this.OwnerName;
    this.CompanyName = this.CompanyName
    this.CompanyId = -1;
    this.userId = 0;
    this.jtStartIndex =  (event - 1) * this.size;
    this.jtPageSize = this.size;
    this.jtSorting = "ID desc";
    this.RecordCount = 0;
    

    this.getContact()
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