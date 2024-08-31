import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ActivityService } from 'src/app/services/activity.service';
import { ActivityTypeservice } from 'src/app/services/activitytype.service';

@Component({
  selector: 'app-addnewactivity',
  templateUrl: './addnewactivity.component.html',
  styleUrls: ['./addnewactivity.component.scss']
})
export class AddnewactivityComponent implements OnInit {
  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;
  activityTypeForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  activityType: any;
  activitytypeId: any;
  activitytypedetails: any = {};
  // @Input() Contacttypemodel: ContactTypeModel;
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, 
   private activityservice: ActivityTypeservice,
     private router: Router,private toastr:ToastrManager,
     private spinner: NgxSpinnerService,) {
      
      }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {

      this.activityType = routeParams.Activitytype;
      this.activitytypeId = routeParams.ActivityTypeId;
      this.GetactivitytypeinfoId(this.activitytypeId, this.activityType);
    });

    this.activityTypeForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl('')

    });
  }
  get f() { return this.activityTypeForm.controls; }




  GetactivitytypeinfoId(acttypeid, Type) {
    this.spinner.show();
    if (acttypeid == " ") {
      acttypeid = 0;
    }
    
    this.activityservice.GetActivityTypeDetailsbyid(acttypeid).subscribe(
      (result: any) => {
        this.activitytypedetails = result
        this.spinner.hide();
        this.showsavebtn(Type);
      
      },
      (err: AppError) => {
        this.spinner.hide();
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

  showsavebtn(type) {debugger
    if (type == "New") {
      this.showbtn = true;
      this.titleOfbtn = "Save";
      this.activitytypedetails.Status=1;
    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "View") {
      this.showbtn = false;
      this.activityTypeForm.disable();
    }


  }
  backtoActivityTypePage() {

    this.router.navigate(["/Setup/ActivityType/ActivityTypeList"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }
 
  OnActivitytypeSubmit(activitydetails) {
debugger
    this.submitted = true;
    if (this.activityTypeForm.invalid) {
      return;
    }
    else {
      if (this.activityType == "New") {
        this.activityservice.insertActivityType(activitydetails).subscribe(res => {

          if (res != null) {

            this.backtoActivityTypePage();
            this.toastr.successToastr("ActivityType added Successfully.", "success", {
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
      else if (this.activityType == "Edit") {

        this.activityservice.UpdateActivityType(activitydetails).subscribe(res => {

          if (res != null) {
          

            this.backtoActivityTypePage();
            
            this.toastr.successToastr("ActivityType Updated Successfully.", "success", {
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
