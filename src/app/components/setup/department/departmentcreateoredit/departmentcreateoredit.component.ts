import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departmentcreateoredit',
  templateUrl: './departmentcreateoredit.component.html',
  styleUrls: ['./departmentcreateoredit.component.scss']
})
export class DepartmentcreateoreditComponent implements OnInit {


  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;
  lsourceTypeForm: FormGroup;


  departmentForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  Type: any;
  Id: any;
  departmentdetailsList: any = {};
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private departmentService: DepartmentService,
    private router: Router, private toastr: ToastrManager, private spinner: NgxSpinnerService) { }


  ngOnInit() {

    this.activeRoute.params.subscribe(routeParams => {

      this.Type = routeParams.Type;
      this.Id = routeParams.Id;
      this.GetDepartmentList(this.Id, this.Type);
    })
    // this.departmentForm = this.formBuilder.group({

    //   name: new FormControl('', Validators.required),
    //   active: new FormControl(''),
    //   description: new FormControl('')

    // });
    this.lsourceTypeForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl('')

    });
  }
  get f() { return this.lsourceTypeForm.controls; }

  GetDepartmentList(Id, Type) {
   this.spinner.show()
    if (Id == " ") {
      Id = 0;
    }
    this.departmentService.GetDepartmentDetailsbyid(Id).subscribe(
      (result: any) => {
        this.departmentdetailsList = result
        this.spinner.hide()

        this.showsavebtn(Type);

      },
      (err: AppError) => {
        this.spinner.hide()
        if (err instanceof NotFoundError) {
          this.toastr.errorToastr("404 Error Occured!", "Failed", {
            timeOut: 5000
          });
        }
        else {
          this.toastr.errorToastr("An unexpected Error Occured!", "Failed", {
            timeOut: 5000
          });

        }
      }
    );

  }

  showsavebtn(type) {
    if (type == "New") {
      this.showbtn = true;
      this.titleOfbtn = "Save";
      this.departmentdetailsList.Active = 1;
    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "View") {
      this.showbtn = false;
      //this.contactTypeForm.disable();
    }


  }

  savetoCompanyIndustryPage(titleOfbtn) {

    this.submitted = true;

    if (this.lsourceTypeForm.invalid) {
      return;
    }
    else {
      this.departmentService.SaveNewDepartment(this.departmentdetailsList).subscribe((result: any) => {

        //this.departmentdetailsList={};
        // this.toastr.successToastr("Department Status has been Changed Successfully.", "success", {
        //   timeOut: 5000
        // });

        if (titleOfbtn == "Save") {
          this.toastr.successToastr("Department type Name added  Successfully.", "success", {
            timeOut: 5000
          });
        } else {
          this.toastr.successToastr("Department type Name Updated  Successfully.", "success", {
            timeOut: 5000
          });
        }
      });
      this.backtoContactTypePage();
    }
  }

  backtoContactTypePage() {
    this.router.navigate(["/Setup/User/DepartmentIndex/"]).then(nav => {

      console.log(nav); // true if navigation is successful
    }, err => {

      console.log(err) // when there's an error
    });
  }

}
