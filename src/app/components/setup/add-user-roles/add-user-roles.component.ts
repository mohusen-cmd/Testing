import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRolesDomainModel } from 'src/app/models/IUserRoleModel';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-user-roles',
  templateUrl: './add-user-roles.component.html',
  styleUrls: ['./add-user-roles.component.scss']
})
export class AddUserRolesComponent implements OnInit {
  @ViewChild('f') userForm = NgForm

  userrolesobj: UserRolesDomainModel = new UserRolesDomainModel()
  startIndex: any = 0;
  pageSize: any = 100;
  orderByClause: any = "RoleId desc";
  totalCount: any = 0;
  isExits: boolean = false;
  datasource: any;
  submitted = false

  constructor(public authentication: AuthenticationService, public router: Router,
    private spinner: NgxSpinnerService) {
    this.userrolesobj.RoleId = 0

  }

  ngOnInit(): void {
    this.getUserRole();
    this.userForm
  }
  getUserRole() {
    this.spinner.show()
    this.authentication.getuserrolesapi(this.startIndex, this.pageSize, this.orderByClause, this.totalCount).subscribe(data => {
      this.spinner.hide()
      this.datasource = data
    }, (error) => {
      this.spinner.hide()
    })
  }
  
  onSubmit() {
    this.userrolesobj.RoleId = 0
    if (this.userrolesobj.RoleId == 0) {
      // this.dataSource.data.some(res => res.RoleName === this.roleDM.RoleName);
      this.isExits = this.datasource.some(res => res.RoleName == this.userrolesobj.RoleName)
      if (this.isExits == false && this.userForm) {
        this.authentication.postUserRole(this.userrolesobj).subscribe((res) => {
          console.log(res)
          if (res) {
            this.router.navigate(['Setup/UserRoles/UserRolesList'])
          }
        })
      }
    }
  }
  backtopage() {
    this.router.navigate(['Setup/UserRoles/UserRolesList'])
  }
}
