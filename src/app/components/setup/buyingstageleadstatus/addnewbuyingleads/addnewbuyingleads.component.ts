import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { StageDomainModel } from 'src/app/models/IStageDomainModel';
import { BuyingstageService } from 'src/app/services/buyingstage.service';

@Component({
  selector: 'app-addnewbuyingleads',
  templateUrl: './addnewbuyingleads.component.html',
  styleUrls: ['./addnewbuyingleads.component.scss']
})
export class AddnewbuyingleadsComponent implements OnInit {
  buyingtypedetails = new StageDomainModel()
  buyingTypeForm: FormGroup;
  buyingtype: any;
  buyingtypeId: any;
  titleOfPage: string;
  titleOfbtn: string;
  showbtn = false;
  submitted: boolean = false
  constructor(private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private buyingservice: BuyingstageService,
    private router: Router,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.buyingtype = routeParams.stagetype;
      this.buyingtypeId = routeParams.stageTypeId;
      this.GetbuyingtypeinfoId(this.buyingtypeId, this.buyingtype);
    });
    this.buyingTypeForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      accountname: new FormControl(''),
      description: new FormControl('')
    });
  }

  get f() { return this.buyingTypeForm.controls; }

  GetbuyingtypeinfoId(buytypeid, Type) {
    this.spinner.show()
    if (buytypeid == " ") {
      buytypeid = 0;
    }

    if (Type == "New") {
      this.buyingservice.createbuyingstagetype().subscribe(
        (result: any) => {
          this.spinner.hide()
          this.buyingtypedetails = result
          this.buyingtypedetails.AccountTypeID = 1;
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
    else {
      this.buyingservice.GetbuyingstagetypeDetailsbyid(buytypeid).subscribe(
        (result: any) => {
          this.spinner.hide()
          this.buyingtypedetails = result;
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

  }
  showsavebtn(type) {
    if (type == "New") {
      this.showbtn = true;
      this.titleOfbtn = "Save";
      this.buyingtypedetails.Status = 1;
    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "View") {
      this.showbtn = false;
      this.buyingTypeForm.disable();
    }
  }


  backtoBuyingTypePage() {
    this.router.navigate(["/Setup/Stage/StageList"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

  OnbuyingtypeSubmit(buyingdetails) {

    this.submitted = true;
    if (this.buyingTypeForm.invalid) {
      return;
    }
    else {
      if (this.buyingtype == "New") {
        this.buyingservice.DuplicateBuyingstagetype(buyingdetails.StageName).subscribe((response: boolean) => {
          var result = response
          if (result) {
            this.buyingservice.insertbuyingstagetype(buyingdetails).subscribe(res => {

              if (res != null) {
                this.backtoBuyingTypePage();
                this.toastr.successToastr("Buying Stage/Lead Status added Successfully.", "success", {
                  timeOut: 3000
                });
              }
              else {
                this.toastr.errorToastr("Can't Added  !!!..", "Failed", {
                  timeOut: 3000
                });
              }
            });
          } else {
            this.toastr.warningToastr("StageName Already Exists.", "warning");
          }

        })

      }
      else if (this.buyingtype == "Edit") {

        this.buyingservice.Updatebuyingstagetype(buyingdetails).subscribe(res => {
          if (res != null) {
            this.backtoBuyingTypePage();
            this.toastr.successToastr("Buying Stage/Lead Status Updated Successfully.", "success", {
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
