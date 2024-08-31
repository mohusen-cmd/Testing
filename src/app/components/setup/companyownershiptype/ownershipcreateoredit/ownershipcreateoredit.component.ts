import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { CompanyOwnershipDomainModel } from 'src/app/models/ICompanyOwnershipDomainModel';
import { CompanyownershiptypeService } from 'src/app/services/companyownershiptype.service';

@Component({
  selector: 'app-ownershipcreateoredit',
  templateUrl: './ownershipcreateoredit.component.html',
  styleUrls: ['./ownershipcreateoredit.component.scss']
})
export class OwnershipcreateoreditComponent implements OnInit {

  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;


  companyindustryForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  Type: any;
  Id: any;
  companyownershiptypedetails: CompanyOwnershipDomainModel = new CompanyOwnershipDomainModel();
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private companyownershiptypeService: CompanyownershiptypeService,
    private router: Router, private toastr: ToastrManager, private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {

      this.Type = routeParams.Type;
      this.Id = routeParams.Id;
      this.Getcompanyownershiptype(this.Id, this.Type);
    })
    this.companyindustryForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl('')

    });
  }
  get f() { return this.companyindustryForm.controls; }

  Getcompanyownershiptype(Id, Type) {
    this.spinner.show()
    if (Id == " ") {
      Id = 0;
    }
    this.companyownershiptypeService.GetCompanyOwnershipDetailsbyid(Id).subscribe(
      (result: CompanyOwnershipDomainModel) => {

        this.companyownershiptypedetails = result
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
      this.companyownershiptypedetails.Active = 1;
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

  savetoCompanyOwnershipPage(titleOfbtn) {

    this.submitted = true;
    if (this.companyindustryForm.invalid) {
      return;
    }
    else {
      if (titleOfbtn == "Save") {
        this.companyownershiptypeService.SaveNewCompanyIndustry(this.companyownershiptypedetails).subscribe((result: any) => {
          this.toastr.successToastr("Company Ownership type Name added  Successfully.", "success", {
            timeOut: 5000
          });
        })

      } else {
        this.companyownershiptypeService.updatecompanyownership(this.companyownershiptypedetails).subscribe((result: any) => {
          this.toastr.successToastr("Company Ownership type Name Updated  Successfully.", "success", {
            timeOut: 5000
          });
        })
      }
      this.backtoContactTypePage();
    }
  }

  backtoContactTypePage() {
    this.router.navigate(["/Setup/CompanyOwnership/CompanyOwnershipList/"]).then(nav => {

      console.log(nav); // true if navigation is successful
    }, err => {

      console.log(err) // when there's an error
    });
  }

}
