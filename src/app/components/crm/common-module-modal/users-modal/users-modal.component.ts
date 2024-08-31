import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {
  @ViewChild('content', { static: true }) modal: any
  @Output() status = new EventEmitter();
  @Output() usersstatus = new EventEmitter()
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  SearchColumn: any = "FirstName";
  AlphanumericSort: any = undefined;
  name: any = undefined;
  email: any = undefined;
  city: any = undefined;
  phone: any = undefined;
  keyword: any = undefined;
  state: any = undefined;
  zip: any = undefined;
  level: any = undefined;
  branch: any = "ALL";
  loginId: string = "1";
  roleId: number = 1;
  jtStartIndex: any = 0;
  jtPageSize: any =10;
  jtSorting: any = "UserId desc";
  RecordCount: number = 0;
  FirstName: any
  dtOptions: { };
  usersList: any;

  constructor(
    private modalService: NgbModal,
    public claimesHelper: ClaimsHelper ,
    private userService: UserService,

    private spinner: NgxSpinnerService
  ) {
    
  }

  ngOnInit(): void {
    this.loginId = this.claimesHelper.GetUserIdAPIKeyFromClaims()
    this.roleId = this.claimesHelper.GetUserIdAPIKeyFromClaims()
    
    this.Getuserdetails()
    this.openLg(this.modal)
  }
  Getuserdetails() {
    const that = this;
    //this.ShowContact=true;
    that.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.spinner.show();
        if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 0) 
        {
          that.jtSorting = "FullName" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 1) 
        {
          that.jtSorting = "Email" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 2)
        {
          that.jtSorting = "Phone" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 3)
        {
          that.jtSorting = "StateName" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 4)
        {
          that.jtSorting = "RoleId" + " " + dataTablesParameters.order[0].dir;
        }

        // that.contactservice.GetAllContacts("FirstName",that.AlphanumericSort, 1,that.searchmodel.Keyword,that.searchmodel.Owner,that.searchmodel.CompanyName, -1, that.userid, dataTablesParameters.start , dataTablesParameters.length, that.jtSorting , that.RecordCount).subscribe(resp => {
          that.userService.GetuserDetails(that.SearchColumn, that.AlphanumericSort, that.FirstName, that.email, that.city, that.phone, that.keyword, that.state, that.zip, that.level, that.branch, that.loginId, that.roleId, dataTablesParameters.start, dataTablesParameters.length, that.jtSorting, that.RecordCount).subscribe((result: any) => {
            
            that.usersList = result;

            var count = 0;

            if (that.usersList.length > 0) {
              count = result[0].RecordCount;
            }
            else {
              count = 0;
            }
            callback({

              recordsTotal: count,
              recordsFiltered: count,
              data: []
            });
            that.spinner.hide();
          },
          (err: AppError) => {
            that.spinner.hide();
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

      columns: [
        
        {
          title: 'User Name',
          data: 'FullName'
        },
        {
          title: 'E-mail',
          data: 'Email'
        },
        {
          title: 'Phone',
          data: 'Phone',

        },
        {
          title: 'State',
          data: 'StateName',

        },
        {
          title: 'Role',
          data: 'RoleName',
        }

      ],
      columnDefs: [
        {
          targets: [0, 5], /* column index */
          orderable: false, /* true or false */
        }
      ],
      responsive: true,
      language: {
        emptyTable: "", // Set to empty string to hide the "No matching records found" message
        zeroRecords: "" // Also set zeroRecords to an empty string to hide the message
      },

    };


  }
  
  emitUser(data) {
    this.usersstatus.emit(data)
    this.modalService.dismissAll()
  }

 
  

  openLg(content) {
    this.modalService.open(content, { size: 'lg',backdrop: 'static', keyboard: false });
  }
  
  close() {
    this.modalService.dismissAll()
    this.status.emit(false)
  }
}

