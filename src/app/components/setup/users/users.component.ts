import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/IUser';
import { UserRolesDomainModel } from 'src/app/models/IUserRoleModel';
import { StateDomainModel } from 'src/app/models/ILeadsDetailsDomainModel';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
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
  Keyword: any
  FirstName: any
  Phone: any
  City: any
  Email: any
  Role: any
  StateCode: any = 'AA'
  marked: boolean = false;
  checkedrowdata: any = [];
  isUserHide: boolean = true;
  userId: any;
  dropdowndata: any[];
  usermodel: UserModel = new UserModel();
  titleforpopup: string;
  textforpopup: string;
  usersList: any[];
  dtOptions: { };
  constructor(
    public router: Router, 
    public claimesHelper: ClaimsHelper,
    private userService: UserService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService
  ) {
    this.usermodel.Rolelist = new UserRolesDomainModel()
    this.usermodel.StateList = []
  }

  ngOnInit(): void {
    this.loginId = this.claimesHelper.GetUserIdAPIKeyFromClaims()
    this.roleId = this.claimesHelper.GetUserIdAPIKeyFromClaims()
    this.userService.GetUserDropdownData().subscribe((result: any) => {
      this.usermodel = result
      this.usermodel.Rolelist = result['Rolelist']
      this.usermodel.StateList = (result['StateList'])
      this.dropdowndata = (result['Rolelist'])
    });
    this.Getuserdetails()
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
        if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 1) 
        {
          that.jtSorting = "FullName" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 2) 
        {
          that.jtSorting = "Email" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 3)
        {
          that.jtSorting = "Phone" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 4)
        {
          that.jtSorting = "StateName" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 5)
        {
          that.jtSorting = "RoleId" + " " + dataTablesParameters.order[0].dir;
        }

        // that.contactservice.GetAllContacts("FirstName",that.AlphanumericSort, 1,that.searchmodel.Keyword,that.searchmodel.Owner,that.searchmodel.CompanyName, -1, that.userid, dataTablesParameters.start , dataTablesParameters.length, that.jtSorting , that.RecordCount).subscribe(resp => {
          that.userService.GetuserDetails(that.SearchColumn, that.AlphanumericSort, that.FirstName, that.email, that.city, that.phone, that.keyword, that.state, that.zip, that.level, that.branch, that.loginId, that.roleId, dataTablesParameters.start, dataTablesParameters.length, that.jtSorting, that.RecordCount).subscribe((result: any) => {
            ;
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
            $('table thead tr th').unbind('click');
            $('table thead tr th').on('click', (evt) => {

              var column = evt.target.textContent.replace(" ", "");
              if (this.AlphanumericSort == "All" || this.AlphanumericSort == "undefined") {
                this.SearchColumn = "FirstName";
                var ele = document.getElementById("tblusers");
                var elem=$(ele).find("thead tr th").css("background-color","");
                $("thead tr th:eq(1)").css("background-color","orange");   
              }
              else {
                if (column == "E-mail") {
                  this.SearchColumn = "Email";
                }
                else if (column == "Phone") {
                  this.SearchColumn = "Phone";
                }
                else if (column == "City") {
                  this.SearchColumn = "City";
                }
                else if (column == "State") {
                  this.SearchColumn = "stateName";
                }
                else if (column == "Role") {
                  this.SearchColumn = "roleName";
                }
                else
                {
                    this.SearchColumn = "";
                }
                this.SearchColumn = this.SearchColumn == "" ? "undefined" : this.SearchColumn;
                var ele = document.getElementById("tblusers");
                $(ele).find("thead tr th").css("background-color", "");
                $(evt.currentTarget).css("background-color", "orange");

              }
            });
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
          title: 'Select',
          //  title:'<input type="checkbox" class="editor-active" style="">'
        },
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
          title: 'City',
          data: 'City',
        },
        {
          title: 'State',
          data: 'StateName',

        },
        {
          title: 'Role',
          data: 'RoleId',
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
  

  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.UserId);
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.UserId)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
  }

  Deleteuser() {
    if (this.marked == true || this.checkedrowdata.length != 0) {
      var checkedrowdata = this.checkedrowdata.toString()
      this.userService.deleteUser(checkedrowdata).subscribe((res) => {
        if (res == true) {
          this.marked = false;
          this.toastr.successToastr("Your Record has been deleted Successfully.", "success", {
            timeOut: 3000
          });
        }
        else {
          this.marked = false;
          this.toastr.errorToastr("Can't Deleted !!! Role is in use.", "success", {
            timeOut: 3000
          });
        }
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.draw();
        });
      })
    }
    else {
      this.titleforpopup = 'Please select record to delete !';
      this.textforpopup = '';
      this.Swa1alerts('delete', this.titleforpopup, this.textforpopup);
    }
    this.checkedrowdata = []

  }
  Swa1alerts(type, title, text) {


    Swal.fire({
      title: `<span style=" font-weight: normal;">${title}</span>`,
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
 
 
  UserCrudEventHandler(usersId, Type) {
    if(Type=="Edit"){
      this.router.navigate(["/Setup/User/CreateEditUser"],{ queryParams: { UserId: usersId }}).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    }else{
    this.router.navigate(["/Setup/User/CreateEditUser"],{ queryParams: { UserId: usersId }}).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }
  }

  search() {
    this.FirstName = (this.FirstName == "") ? undefined : this.FirstName;
    this.keyword = (this.Keyword == "") ? undefined : this.Keyword;
    this.phone = (this.Phone == "") ? undefined : this.Phone;
    this.city = (this.City == "") ? undefined : this.City;
    this.email = (this.Email == "") ? undefined : this.Email;
    this.state = (this.StateCode == "AA") ? undefined : this.StateCode;
    this.level = (this.Role == "") ? undefined : this.Role;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });

  }
  clear() {
    const resetFields = ['StateCode', 'name', 'email', 'city', 'phone', 'keyword', 
                         'state', 'level', 'zip', 'SearchColumn', 'AlphanumericSort', 
                         'FirstName', 'Keyword', 'Phone', 'City', 'Email', 'Role'];
  
    resetFields.forEach(field => this[field] = undefined);
    this.roleId = this.claimesHelper.GetUserIdAPIKeyFromClaims();
    this.loginId = this.claimesHelper.GetUserIdAPIKeyFromClaims();
    this.jtStartIndex = 0;
  
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  

 
  GetdataByAlphaSearch($event) {
    if ($event == "All") {
      this.SearchColumn == "FirstName"
      $event="undefined";
      var ele=document.getElementById("tblusers");
      var elem=$(ele).find("thead tr th").css("background-color","");
    } 
    if (this.SearchColumn == undefined || this.SearchColumn == "FirstName") {
        this.SearchColumn = "FirstName";
        var ele=document.getElementById("tblusers");
        var elem=$(ele).find("thead tr th").css("background-color","");
        $("thead tr th:eq(1)").css("background-color","orange");
    }
    this.AlphanumericSort=$event  
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
     });
  }

 
}


