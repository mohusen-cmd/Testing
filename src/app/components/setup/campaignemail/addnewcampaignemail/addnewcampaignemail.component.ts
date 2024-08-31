import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CampaignService } from 'src/app/services/campaign.service';
import { CampaignemailService } from 'src/app/services/campaignemail.service';

@Component({
  selector: 'app-addnewcampaignemail',
  templateUrl: './addnewcampaignemail.component.html',
  styleUrls: ['./addnewcampaignemail.component.scss']
})
export class AddnewcampaignemailComponent implements OnInit {
  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;
  CampaignemailForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  EmailType: any;
  EmailId: any;
  Emaildetails: any = {};
  userId: any;
  constructor(private claimsHelper: ClaimsHelper,
    private campainemailservice: CampaignService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService) {
    this.userId = + claimsHelper.GetUserIdAPIKeyFromClaims();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {

      this.EmailType = routeParams.Emailtype;
      this.EmailId = routeParams.EmailId;
      this.GetCampaigninfoId(this.EmailId, this.EmailType);
    });

    this.CampaignemailForm = this.formBuilder.group({

      name: new FormControl(''),
      active: new FormControl(''),
      email: new FormControl('', Validators.required),

    });
  }
  get f() { return this.CampaignemailForm.controls; }
  GetCampaigninfoId(emailtypeid, Type) {
    this.spinner.show()
    if (emailtypeid == " ") {
      emailtypeid = 0;
    }

    this.campainemailservice.GetCampaignbyid(emailtypeid).subscribe(
      (result: any) => {
        this.spinner.hide()
        this.Emaildetails = result
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
      this.Emaildetails.Status = 0;
    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "View") {
      this.showbtn = false;
      this.CampaignemailForm.disable();
    }


  }
  backtocampaignemailPage() {

    this.router.navigate(["/Setup/Common/CampaignEmailIndex"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

  OnCampaignemailSubmit(emaildatadetails) {

    this.submitted = true;
    if (this.CampaignemailForm.invalid) {
      return;
    }
    else {
      emaildatadetails.UserId = this.userId;
      var toastermsg = "";
      if (this.EmailType == "New") {
        toastermsg = "added";
        this.campainemailservice.insertCampaign(emaildatadetails).subscribe((res: any) => {
          if (res != null) {

            this.backtocampaignemailPage();
            this.toastr.successToastr("Campaign Email '" + toastermsg + "' Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("Can't '" + toastermsg + "'  !!!..", "Failed", {
              timeOut: 3000
            });
          }
        })
      }
      else {
        toastermsg = "updated";
        this.campainemailservice.UpdateCampaign(emaildatadetails).subscribe(res => {

          if (res != null) {

            this.backtocampaignemailPage();
            this.toastr.successToastr("Campaign Email '" + toastermsg + "' Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("Can't '" + toastermsg + "'  !!!..", "Failed", {
              timeOut: 3000
            });
          }
        });
      }

    }

  }

}
