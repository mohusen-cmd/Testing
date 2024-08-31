import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ContactService } from 'src/app/services/contact.service';
import { ContactTypeService } from 'src/app/services/contacttype.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.scss']
})
export class AddnewComponent implements OnInit {
  titleOfPage: string;
  titleOfbtn: string;
  disableSubmitButton: boolean = false;

  // @ViewChild('modalLarge') modal ;
  // @Input('Contact') contacttype;
  // @Input('contacttype') contactval;
  // @Output('status') Status = new EventEmitter();
  contactTypeForm: FormGroup;
  submitted = false;
  isdisabled = false;
  FirstName: any;
  selectedValue: any;
  showbtn = false;
  deletedids: any = [];
  contactType: any;
  contacttypeId: any;
  contacttypedetails: any = {};
  // @Input() Contacttypemodel: ContactTypeModel;
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute,  private contactservice: ContactTypeService,
    private router: Router, private toastr: ToastrManager,private spinner: NgxSpinnerService) { }

  ngOnInit() {



    this.activeRoute.params.subscribe(routeParams => {

      this.contactType = routeParams.Contacttype;
      this.contacttypeId = routeParams.ContactTypeId;
      this.GetcontacttypeinfoId(this.contacttypeId, this.contactType);
    });

    this.contactTypeForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      active: new FormControl(''),
      description: new FormControl('')

    });

  }
  get f() { return this.contactTypeForm.controls; }



  OnContacttypeSubmit(typedetails) {

    this.submitted = true;
    //var obj={ID:0,Name:"",Description:"",Active:false,RecordsCount:0,Status:"",CreatedDate:null,ModifiedDate:null,Createdby:0,DuplicateName:"",};
    if (this.contactTypeForm.invalid) {
      return;
    }
    else {
      if (this.contactType == "New") {
        this.contactservice.insertContactType(typedetails).subscribe(res => {

          if (res != null) {

            this.backtoContactTypePage();
            this.toastr.successToastr("ContactType Added Successfully.", "success", {
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
      else if (this.contactType == "Edit") {

        this.contactservice.UpdateContactType(typedetails).subscribe(res => {

          if (res != null) {
            // this.modal.hide();

            this.backtoContactTypePage();
            this.toastr.successToastr("ContactType Updated Successfully.", "success", {
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
  GetcontacttypeinfoId(contypeid, Type) {
    this.spinner.show()
    if (contypeid == " ") {
      contypeid = 0;
    }
    this.contactservice.GetContacttypeDetailsbyid(contypeid).subscribe(
      (result: any) => {
        
        this.contacttypedetails = result;
        
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

    }
    if (type == "Edit") {
      this.showbtn = true;
      this.titleOfbtn = "Update";
    }
    else if (type == "view") {
      this.showbtn = false;
      this.contactTypeForm.disable();
    }


  }
  backtoContactTypePage() {

    this.router.navigate(["/Setup/ContactType/ContactTypeList"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

}
