import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyTypeService } from 'src/app/services/companytype.service';

@Component({
  selector: 'app-addnewcompany',
  templateUrl: './addnewcompany.component.html',
  styleUrls: ['./addnewcompany.component.scss']
})
export class AddnewcompanyComponent implements OnInit {
  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;
  companyTypeForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  companyType: any;
  companytypeId: any;
  companytypedetails: any = {};
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute,
    public companytypeservice: CompanyTypeService,
    private router: Router, private toastr: ToastrManager,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {debugger

      this.companyType = routeParams.Companytype;
      this.companytypeId = routeParams.CompanyTypeId;
      this.GetcompanytypeinfoId(this.companytypeId, this.companyType);
    });

    this.companyTypeForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl('')

    });
  }
  get f() { return this.companyTypeForm.controls; }




  GetcompanytypeinfoId(comtypeid, Type) {
    this.spinner.show()
    if (comtypeid == " ") {
      comtypeid = 0;
    }

    this.companytypeservice.GetcompanytypeDetailsbyid(comtypeid).subscribe(
      (result: any) => {
        this.companytypedetails = result
        this.spinner.hide()
        this.showsavebtn(Type);

      },
      (err: AppError) => {
        this.spinner.hide()
        if (err instanceof NotFoundError) {
          this.toastr.errorToastr("404 Error Occured!", "Failed", {
            timeOut: 3000
          });
        }
        else {
          this.toastr.errorToastr("An unexpected Error Occured!", "Failed", {
            timeOut: 3000
          });

        }
      }
    );

  }

  showsavebtn(type) {

    if (type == "New") {
      this.showbtn = true;
      this.titleOfbtn = "Save";
      this.companytypedetails.Active = 1;
    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "View") {
      this.showbtn = false;
      this.companyTypeForm.disable();
    }


  }
  backtoCompanyTypePage() {

    this.router.navigate(["/Setup/CompanyType/CompanyTypeList"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

  OnCompanytypeSubmit(companydetails) {

    this.submitted = true;
    if (this.companyTypeForm.invalid) {
      return;
    }
    else {
      if (this.companyType == "New") {
        this.companytypeservice.insertcompanytype(companydetails).subscribe(res => {

          if (res != null) {

            this.backtoCompanyTypePage();
            this.toastr.successToastr("CompanyType added Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("Can't Added  !!!..", "Failed", {
              timeOut: 3000
            });
          }
        });
      }
      else if (this.companyType == "Edit") {

        this.companytypeservice.Updatecompanytype(companydetails).subscribe(res => {

          if (res != null) {
            this.backtoCompanyTypePage();
            this.toastr.successToastr("CompanyType Updated Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("Update Failed  !!!..", "Failed", {
              timeOut: 3000
            });
          }
        });
      }
    }

  }

}
