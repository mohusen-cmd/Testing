import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ContactService } from 'src/app/services/contact.service';
import { EmailContactSearchViewModel, EmailModelDomainModel, ListDetailViewModel } from 'src/app/models/email-model-domain-model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements OnInit {
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
  constructor(public climesHelper: ClaimsHelper,
    public contactservice: ContactService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService) {
    this.userId = this.climesHelper.GetUserIdAPIKeyFromClaims()
    this.Createdby = this.climesHelper.GetUserIdAPIKeyFromClaims()
    this.emailModel.ContactSearch = new EmailContactSearchViewModel();
    this.emailModel.ListDetails = new ListDetailViewModel()
  }

  ngOnInit(): void {
    this.getContact()
  }

  getContact() {
    this.spinner.show()
    this.userId = this.climesHelper.GetUserIdAPIKeyFromClaims()
    this.contactservice.GetContacts(this.SearchColumn, this.AlphanumericSort, this.Createdby, this.Contactkeyword,
      this.OwnerName, this.CompanyName, this.CompanyId, this.userId, this.jtStartIndex, this.jtPageSize, this.jtSorting, this.RecordCount).subscribe((data: any) => {
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
    if (this.checkedApiIds.length != 0) {
      
      this.emailModel.ListDetails.APIID = this.checkedApiIds.toString()
      this.emailModel.ListDetails.APIListID = null
      this.emailModel.ListDetails.Description = null
      this.emailModel.ListDetails.ID = this.checkedIds.toString()
      this.emailModel.ListDetails.ListID = 0
      this.emailModel.ListDetails.ListName = null
      this.emailModel.ListDetails.NumberOfContacts = this.checkedIds.length
      this.emailModel.ListDetails.TargetAudience = "Contacts"
      this.emailModel.ListDetails.TotalCount = this.checkedIds.length
      this.emailModel.ListDetails.userID = null
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
  paginate(event) {
    this.SearchColumn = "FirstName";
    this.AlphanumericSort = this.AlphanumericSort;
    this.Createdby = this.climesHelper.GetUserIdAPIKeyFromClaims()
    this.Contactkeyword = this.Contactkeyword
    this.OwnerName = this.OwnerName;
    this.CompanyName = this.CompanyName
    this.CompanyId = -1;
    this.userId = 0;
    this.jtStartIndex = (event - 1) * this.size;
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
