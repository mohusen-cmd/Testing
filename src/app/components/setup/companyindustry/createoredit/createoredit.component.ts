import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { CompanyIndustryService } from 'src/app/services/companyindustry.service';

@Component({
  selector: 'app-createoredit',
  templateUrl: './createoredit.component.html',
  styleUrls: ['./createoredit.component.scss']
})
export class CreateoreditComponent implements OnInit {
  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;
  lsourceTypeForm: FormGroup;
  // companyindustryForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  companyindustrytype: any;
  companyindustrytypeId: any;
  companyindustrytypedetails: any = {};
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private companyindustryservice: CompanyIndustryService,
    private router: Router, private toastr: ToastrManager,private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.activeRoute.params.subscribe(routeParams => {
      this.companyindustrytype = routeParams.CompanyindustryIdtype;
      this.companyindustrytypeId = routeParams.CompanyindustryId;
      this.GetcompanyindustrytypeinfoId(this.companyindustrytypeId, this.companyindustrytype);
    })
    // this.companyindustryForm = this.formBuilder.group({

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


  GetcompanyindustrytypeinfoId(companyindustrytypeId, companyindustrytype) {
    this.spinner.show()
    if (companyindustrytypeId == " ") {
      companyindustrytypeId = 0;
    }
    this.companyindustryservice.GetCompanyIndustryDetailsbyid(companyindustrytypeId).subscribe(
      (result: any) => {
        this.spinner.hide()
        this.companyindustrytypedetails = result

        this.showsavebtn(companyindustrytype);

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
      this.companyindustrytypedetails.Active = 1
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

      //this.companyindustrytypedetails={};
      if (titleOfbtn == "Save") {
        this.companyindustryservice.insertCompanyIndustry(this.companyindustrytypedetails).subscribe((result: any) => {

          this.toastr.successToastr("Company Industry Name added  Successfully.", "success", {
            timeOut: 5000
          });

        })

      } else {
        this.companyindustryservice.UpdateCompanyIndustry(this.companyindustrytypedetails).subscribe((result: any) => {

          this.toastr.successToastr("Company Industry Name Updated  Successfully.", "success", {
            timeOut: 5000
          });
        })

      }
      this.backtoContactTypePage()
    }
  }



  backtoContactTypePage() {
    this.router.navigate(["/Setup/CompanyIndustry/CompanyIndustryList"]).then(nav => {

      console.log(nav); // true if navigation is successful
    }, err => {

      console.log(err) // when there's an error
    });
  }

}
