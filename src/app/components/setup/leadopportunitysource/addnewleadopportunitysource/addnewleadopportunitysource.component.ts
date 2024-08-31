import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { LeadsourcetypeService } from 'src/app/services/leadsourcetype.service';

@Component({
  selector: 'app-addnewleadopportunitysource',
  templateUrl: './addnewleadopportunitysource.component.html',
  styleUrls: ['./addnewleadopportunitysource.component.scss']
})
export class AddnewleadopportunitysourceComponent implements OnInit {
  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;
  lsourceTypeForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  lsourceType: any;
  lsourceId: any;
  lsourcetypedetails: any = {};
  // @Input() Contacttypemodel: ContactTypeModel;
  constructor(private formBuilder: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private leadsourcetypeservice: LeadsourcetypeService,
     private router: Router,
     private toastr:ToastrManager,
     private spinner: NgxSpinnerService ) { }
  

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {

      this.lsourceType = routeParams.LeadSourcetype;
      this.lsourceId = routeParams.LeadSourceId;
      this.GetleadsourcetypeinfoId(this.lsourceId, this.lsourceType);
    });

    this.lsourceTypeForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl('')

    });
  }
  get f() { return this.lsourceTypeForm.controls; }

  GetleadsourcetypeinfoId(leadtypeid, Type) {
     this.spinner.show()
    if (leadtypeid == " ") {
      leadtypeid = 0;
    }
    
    this.leadsourcetypeservice.GetleadsourcetypeDetailsbyid(leadtypeid).subscribe(
      (result: any) => {
        this.spinner.hide()
        this.lsourcetypedetails = result
       
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
      this.lsourcetypedetails.Status=1;
    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "View") {
      this.showbtn = false;
      this.lsourceTypeForm.disable();
    }


  }
  backtoleadsourceTypePage() {

    this.router.navigate(["/Setup/LeadSource/LeadSourceList"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }
 
  OnLeadsourcetypeSubmit(lsourcedetails) {

    this.submitted = true;
    if (this.lsourceTypeForm.invalid) {
      return;
    }
    else {
      if (this.lsourceType == "New") {
        this.leadsourcetypeservice.insertleadsourcetype(lsourcedetails).subscribe(res => {

          if (res != null) {

            this.backtoleadsourceTypePage();
            this.toastr.successToastr("Lead/Opportunity  added Successfully.", "success", {
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
      else if (this.lsourceType == "Edit") {

        this.leadsourcetypeservice.Updateleadsourcetype(lsourcedetails).subscribe(res => {

          if (res != null) {
          

            this.backtoleadsourceTypePage();
            
            this.toastr.successToastr("Lead/Opportunity Updated Successfully.", "success", {
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
