import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { UserrolesService } from 'src/app/services/userroles.service';

@Component({
  selector: 'app-createoredituserroles',
  templateUrl: './createoredituserroles.component.html',
  styleUrls: ['./createoredituserroles.component.scss']
})
export class CreateoredituserrolesComponent implements OnInit {
  userroledetails: any = {};
  disabledValue: boolean = true;
  showbtn = false;
  titleOfbtn: string;
  userroleTypeForm: FormGroup;
  UseroleType: any;

  public constructor(private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userservice: UserService,
    private userrolesservice: UserrolesService,
    private router: Router,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService) {

  }
  ngOnInit() {

    this.activeRoute.params.subscribe(routeParams => {
      // var companyId =routeParams.companyId;
      this.UseroleType = routeParams.type
      if (routeParams.type == "New") {
        this.showsavebtn(routeParams.type);
        this.userroledetails.RoleId = 0;

      } else {
        this.GetUserrolesInfoCompanyId(routeParams.roleId, routeParams.type);

      }


    })
    this.userroleTypeForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl(''),
      checkbox: new FormControl('')
    });
  }

  get f() { return this.userroleTypeForm.controls; }

  GetUserrolesInfoCompanyId(roleId, type) {
    this.spinner.show()
    //this.companyservice.GetCompanyInfoCompanyId(companyId).subscribe(
    this.userservice.GetRolebyid(roleId).subscribe(

      (result: any) => {
        this.spinner.hide()
        this.userroledetails = result;
        this.showsavebtn(type)
        // this.userroledetails.SwitchPermission = this.userroledetails.SwitchPermission == '1' ? true : false;
      },
      (err) => {
        this.spinner.hide()
      }
    );

  }
  showsavebtn(type) {

    if (type == "New") {
      this.showbtn = true;
      this.titleOfbtn = "Save";
      this.userroledetails.Status = 1;
    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "View") {
      this.showbtn = false;
      this.userroleTypeForm.disable();
    }


  }
  // OnUserRoleSubmit(rolesdetails) {

  //   this.userservice.SaveUserRoleInfo(rolesdetails).subscribe((data) => {
  //     this.router.navigate(["/Setup/UserRoles/UserRolesList"]).then(nav => {
  //       console.log(nav); // true if navigation is successful
  //     }, err => {
  //       console.log(err) // when there's an error
  //     });
  //   });
  // }
  OnUserRoleSubmit(rolesdetails) {
    var status;
    if (rolesdetails.RoleId == 0) {
      this.userservice.GetUserRoleIsDuplicate(rolesdetails.RoleName).subscribe((response: any) => {
        if (!response) {
          this.userroledetails.RoleName = ''
          this.toastr.errorToastr("Role already exists", "error")
        } else {
          status = 'Created'
          this.userservice.SaveUserRoleInfo(rolesdetails).subscribe((data: any) => {
            if (data) {
              this.toastr.successToastr(`Your Role has been ${status} Successfully`, `success`);
              this.backtoUserroleTypePage()
            }
          });
        }
      })
    } else {
      status = 'Updated'
      this.userroledetails.DuplicateRoleName = this.userroledetails.RoleName
      this.userservice.SaveUserRoleInfo(rolesdetails).subscribe((data: any) => {
        if (data) {
          this.toastr.successToastr(`Your Role has been ${status} Successfully`, `success`);
          this.backtoUserroleTypePage()
        }
      });
    }
  }


  SaveUserRoles(userroledetails) {

    this.userrolesservice.SaveUserRoles(userroledetails).subscribe((data) => {
      this.router.navigate(["/Setup/UserRoles/UserRolesList"]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    })

  }

  backtoUserroleTypePage() {
    this.router.navigate(["/Setup/UserRoles/UserRolesList"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

}
