import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { PriorityService } from 'src/app/services/priority.service';

@Component({
  selector: 'app-addnewprioritytype',
  templateUrl: './addnewprioritytype.component.html',
  styleUrls: ['./addnewprioritytype.component.scss']
})
export class AddnewprioritytypeComponent implements OnInit {
  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;
  priorityTypeForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  priorityType: any;
  prioritytypeId: any;
  prioritytypedetails: any = {};
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute,
    private priorityservice: PriorityService,
    private router: Router,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.priorityType = routeParams.PriorityType;
      this.prioritytypeId = routeParams.PriorityTypeId;
      this.GetcompanytypeinfoId(this.prioritytypeId, this.priorityType);
    });

    this.priorityTypeForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl('')
    });
  }
  get f() { return this.priorityTypeForm.controls; }
  GetcompanytypeinfoId(pritypeid, Type) {
    this.spinner.show()
    if (pritypeid == " ") {
      pritypeid = 0;
    }

    this.priorityservice.GetPrioritytypeDetailsbyid(pritypeid).subscribe(
      (result: any) => {
        this.spinner.hide()
        this.prioritytypedetails = result

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
      this.prioritytypedetails.Status = 1;
    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "View") {
      this.showbtn = false;
      this.priorityTypeForm.disable();
    }


  }
  backtoPriorityTypePage() {

    this.router.navigate(["/Setup/Priority/PriorityList"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

  OnPrioritytypeSubmit(prioritydetails) {

    this.submitted = true;
    if (this.priorityTypeForm.invalid) {
      return;
    }
    else {
      if (this.priorityType == "New") {
        this.priorityservice.insertPrioritytype(prioritydetails).subscribe(res => {

          if (res != null) {

            this.backtoPriorityTypePage();
            this.toastr.successToastr("PriorityType added Successfully.", "success", {
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
      else if (this.priorityType == "Edit") {

        this.priorityservice.UpdatePrioritytype(prioritydetails).subscribe(res => {

          if (res != null) {
            this.backtoPriorityTypePage();
            this.toastr.successToastr("PriorityType Updated Successfully.", "success", {
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
