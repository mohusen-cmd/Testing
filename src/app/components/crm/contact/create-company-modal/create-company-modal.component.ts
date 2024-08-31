import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CompanyDetailsViewModel, CompanyViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-create-company-modal',
  templateUrl: './create-company-modal.component.html',
  styleUrls: ['./create-company-modal.component.scss']
})
export class CreateCompanyModalComponent implements OnInit {

  public maskUsMobile = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  @Output() status = new EventEmitter();
  @Output() companystatus = new EventEmitter();
  registerForm: FormGroup;
  submitted = false;
  Urlvalidator = "https?://.+";
  CompanyDetailsModel: CompanyDetailsViewModel = new CompanyDetailsViewModel();
  @ViewChild('content', { static: true }) modal: any
  constructor(private contactservice: ContactService, private fb: FormBuilder, private claimsHelper: ClaimsHelper, private modalService: NgbModal) {
    this.CompanyDetailsModel.CompanyObj = new CompanyViewModel();
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      companyName: new FormControl('', Validators.required),
      phone: new FormControl('',),
      website: new FormControl('', Validators.pattern(this.Urlvalidator)),
    });
    this.openLg(this.modal)
  }
  get f() { return this.registerForm.controls; }
  close() {
   
    this.status.emit(false)
    this.modalService.dismissAll()
    this.companystatus.emit("");
  }

  CreateNewCompany() {
    
    this.submitted = true;

    if (this.registerForm.valid) {
      this.CompanyDetailsModel.CompanyObj.CreatedBy = this.claimsHelper.GetUserIdAPIKeyFromClaims();
      this.CompanyDetailsModel.CompanyObj.OwnerID = this.CompanyDetailsModel.CompanyObj.CreatedBy;
      this.CompanyDetailsModel.CompanyObj.Ownership = this.claimsHelper.GetUserNameAPIKeyFromClaims();
      this.contactservice.CreateNewCompanyDetails(this.CompanyDetailsModel).subscribe(res => {
        
        if (+res > 0) {
          this.CompanyDetailsModel.CompanyObj.CompanyID = + res;
          this.CompanyDetailsModel.CompanyObj.CompanyName = this.CompanyDetailsModel.CompanyObj.Name == undefined ? "" : this.CompanyDetailsModel.CompanyObj.Name;
          this.CompanyDetailsModel.CompanyObj.Phone = this.CompanyDetailsModel.CompanyObj.Phone == undefined ? "" : this.CompanyDetailsModel.CompanyObj.Phone;
          this.CompanyDetailsModel.CompanyObj.Website = this.CompanyDetailsModel.CompanyObj.Website == undefined ? "" : this.CompanyDetailsModel.CompanyObj.Website;
          this.companystatus.emit(this.CompanyDetailsModel.CompanyObj);
          this.modalService.dismissAll()
        }
        else {
          this.companystatus.emit("");
          this.modalService.dismissAll()
        }
      });
    }
  }
  onPhoneChange(ele, type) {

    var value = ele.target.value.replace(/[^a-zA-Z 0-9]+/g, '').trim();
    if (value.length < 10 || value.length > 10) {
      if (type == 'phone') {
        this.CompanyDetailsModel.CompanyObj.Phone = "";
      }
    }
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg',backdrop:'static',keyboard:false });
  }

 

}
