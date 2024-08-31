import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { StatusDomainModel } from 'src/app/models/IStatusDomainModel';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-createoreditstatus',
  templateUrl: './createoreditstatus.component.html',
  styleUrls: ['./createoreditstatus.component.scss']
})
export class CreateoreditstatusComponent implements OnInit {
  titleOfbtn: string;
  lsourceTypeForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  statustypedetailslist: StatusDomainModel = new StatusDomainModel();
  Id: any;
  Type: any = {};
  constructor(private statusservices: StatusService, private formBuilder: FormBuilder, private activeRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrManager,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {

      this.Type = routeParams.Type;
      this.Id = routeParams.Id;
      this.GetStatusDetailsbyid(this.Id, this.Type)
    })

    this.lsourceTypeForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl('')

    });
  }
  get f() { return this.lsourceTypeForm.controls; }

  GetStatusDetailsbyid(id, Type) {
    this.spinner.show()
    if (id == " ") {
      id = 0;
    }
    this.statusservices.GetStatusDetailsbyid(id).subscribe((data: StatusDomainModel) => {
      this.statustypedetailslist = data;
      this.spinner.hide()
      this.showsavebtn(Type);
    }, (error: any) => {
      this.spinner.hide()
    })
  }

  showsavebtn(type) {

    if (type == "New") {
      this.showbtn = true;
      this.titleOfbtn = "Save";
      this.statustypedetailslist.Active = 1
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
  savetostatusPage(titleOfbtn) {

    this.submitted = true;
    if (this.lsourceTypeForm.invalid) {
      return;
    }
    else {

      //this.statustypedetailslist={};
      if (titleOfbtn == "Save") {
        this.statusservices.SaveStatusTypeDetails(this.statustypedetailslist).subscribe((data) => {
          this.toastr.successToastr("Staus Type Name added  Successfully.", "success", {
            timeOut: 5000
          });
        })
      } else {
        this.statusservices.UpdateStatus(this.statustypedetailslist).subscribe((data) => {
          this.toastr.successToastr("Staus Type Name Updated  Successfully.", "success", {
            timeOut: 5000
          });
        })
      }

      this.backtoContactTypePage();
    }
  }
  backtoContactTypePage() {
    this.router.navigate(["Setup/Status/StatusList"]).then(nav => {

      console.log(nav); // true if navigation is successful
    }, err => {

      console.log(err) // when there's an error
    });
  }

}
