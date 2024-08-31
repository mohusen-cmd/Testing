import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { OppotunityTypeService } from 'src/app/services/oppotunitytype.service';

@Component({
  selector: 'app-addnewopportunity',
  templateUrl: './addnewopportunity.component.html',
  styleUrls: ['./addnewopportunity.component.scss']
})
export class AddnewopportunityComponent implements OnInit {
  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;
  opportunityTypeForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  opportunityType: any;
  opportunitytypeId: any;
  opportunitytypedetails: any = {};
  constructor(private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private oppotunityservice: OppotunityTypeService,
    private router: Router,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.activeRoute.params.subscribe(routeParams => {

      this.opportunityType = routeParams.Opportunitytype;
      this.opportunitytypeId = routeParams.OpportunitytypeId;
      this.GetopportunitytypeinfoId(this.opportunitytypeId, this.opportunityType);
    });

    this.opportunityTypeForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl('')

    });
  }
  get f() { return this.opportunityTypeForm.controls; }

  OnOpportunitytypeSubmit(typedetails) {

    this.submitted = true;
    //var obj={ID:0,Name:"",Description:"",Active:false,RecordsCount:0,Status:"",CreatedDate:null,ModifiedDate:null,Createdby:0,DuplicateName:"",};
    if (this.opportunityTypeForm.invalid) {
      return;
    }
    else {
      if (this.opportunityType == "New") {
        this.oppotunityservice.insertOpportunitytype(typedetails).subscribe(res => {

          if (res != null) {

            this.backtoOpportunityTypePage();
            this.toastr.successToastr("Opportunitytype Added Successfully.", "success", {
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
      else if (this.opportunityType == "Edit") {

        this.oppotunityservice.UpdateOpportunitytype(typedetails).subscribe(res => {

          if (res != null) {
            // this.modal.hide();

            this.backtoOpportunityTypePage();
            this.toastr.successToastr("OpportunityType Updated Successfully.", "success", {
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
  GetopportunitytypeinfoId(oppotypeid, Type) {
    this.spinner.show()
    if (oppotypeid == " ") {
      oppotypeid = 0;
    }
    this.oppotunityservice.GetopportunitytypeDetailsbyid(oppotypeid).subscribe(

      (result: any) => {
        this.spinner.hide()
        this.opportunitytypedetails = result

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
      this.opportunitytypedetails.Status = 1;
    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "View") {
      this.showbtn = false;
      this.opportunityTypeForm.disable();
    }
  }
  backtoOpportunityTypePage() {

    this.router.navigate(["/Setup/OpportunityType/OpportunityList/"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }
}
