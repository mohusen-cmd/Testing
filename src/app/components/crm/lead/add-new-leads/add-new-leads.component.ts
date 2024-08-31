import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StorageHelper } from 'src/app/login/StorageHelper';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AccountListDomainModel, LeadDispositionDomainModel, LeadsDetailsDomainModel } from 'src/app/models/ILeadsDetailsDomainModel';
import { ContactService } from 'src/app/services/contact.service';
import { LeadService } from 'src/app/services/lead.service';
@Component({
  selector: 'app-add-new-leads',
  templateUrl: './add-new-leads.component.html',
  styleUrls: ['./add-new-leads.component.scss']
})
export class AddNewLeadsComponent implements OnInit {
  public maskUsMobile = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  registerForm: FormGroup;
  submitted = false;
  showSearchUsersmodal: boolean = false;
  ShowCreateCompanyModal: boolean = false
  ShowCompanyListModal: boolean = false;
  myFiles: string[] = [];
  EmailAPILink: string;
  EmailAPIKey: string;
  leadsdetails: LeadsDetailsDomainModel = new LeadsDetailsDomainModel();
  @ViewChild('myuploadInput') myInputVariable: any;
  LeadId: any;
  Urlvalidator = "https?://.+";
  showcustomfileds: boolean = false;
  stageDetails: any = [];
  constructor(private toastr: ToastrManager, private route: ActivatedRoute, private contactservice: ContactService, private fb: FormBuilder, private router: Router, private leadService: LeadService, private claimsHelper: ClaimsHelper, private storageHelper: StorageHelper) {
    this.leadsdetails.AccountObj = new AccountListDomainModel()
    this.leadsdetails.LeadDispoObj = new LeadDispositionDomainModel();
    this.leadsdetails.LeadSourceList;
    this.leadsdetails.StageList;
    this.leadsdetails.StateList;
    this.leadsdetails.CountryList;
    this.leadsdetails.listCustomfields;
    this.leadsdetails.lstcustomVM;
    this.leadsdetails.AllNotesObj;
  }
  ngOnInit() {
    
    this.registerForm = this.fb.group({
      ownership: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      companyName: new FormControl('', Validators.required),
      title: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl(''),
      phoneext: new FormControl(''),
      fax: new FormControl(''),
      mobile: new FormControl(''),
      website: new FormControl('', Validators.pattern(this.Urlvalidator)),
      leadSource: new FormControl('', Validators.required),
      contacttype: new FormControl(''),
      department: new FormControl(''),
      optemailout: new FormControl(''),
      CopyCompanyAddress: new FormControl(''),
      mailingAddress: new FormControl(''),
      mailingAddress2: new FormControl(''),
      mailingcity: new FormControl(''),
      mailingstateid: new FormControl(''),
      mailingzip: new FormControl(''),
      mailingcountryid: new FormControl(''),
      copymailing: new FormControl(''),
      billingaddress: new FormControl(''),
      billingaddress2: new FormControl(''),
      billingcity: new FormControl(''),
      billingstateid: new FormControl(''),
      billingzip: new FormControl(''),
      billingcountryid: new FormControl(''),
      facebookusername: new FormControl(''),
      twitterusername: new FormControl(''),
      linkedinusername: new FormControl(''),
      skypeusername: new FormControl(''),
      description: new FormControl(''),
      attachment: new FormControl(''),
      companydba: new FormControl(''),
      middlename: new FormControl(''),
      leadstageid: new FormControl('', Validators.required),
    });
    this.route.paramMap.subscribe(params => {
      this.LeadId = params.get("Id");
    })
    if (this.LeadId != "0") {
      let accountTypeId = 1;
      this.leadService.GetLeadsLeadsApiLeadDetailsEdit(this.LeadId, accountTypeId).subscribe(res => {
        this.leadsdetails.AccountObj = res["AccountObj"];
        this.leadsdetails.CountryList = res["CountryList"];
        this.leadsdetails.LeadSourceList = res["LeadSourceList"];
        this.leadsdetails.StageList = res["StageList"];
        this.leadsdetails.StateList = res["StateList"];
        this.leadsdetails.listCustomfields = res["listCustomfields"];
        this.leadsdetails.lstcustomVM = res["lstcustomVM"];
        this.showcustomfileds = true;
        this.leadsdetails.AccountObj.RoleName = this.claimsHelper.GetRoleNameAPIKeyFromClaims();
        
      })
    }
    else {
      let accountTypeId = 1;
      this.leadService.GetLeadDetailsByLeadId(this.LeadId, accountTypeId).subscribe(res => {
        ;
        this.leadsdetails.CountryList = res["CountryList"];
        this.leadsdetails.LeadSourceList = res["LeadSourceList"];
        this.leadsdetails.StageList = res["StageList"];
        this.leadsdetails.StateList = res["StateList"];
        this.leadsdetails.listCustomfields = res["listCustomfields"];
        this.leadsdetails.AccountObj.MailingstateID = 0;
        this.leadsdetails.AccountObj.LeadSource = "";
        this.leadsdetails.AccountObj.StageID = "";
        this.leadsdetails.AccountObj.MailingcountryID = 0;
        this.leadsdetails.AccountObj.RoleID = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
        this.leadsdetails.AccountObj.RoleName =this.claimsHelper.GetRoleNameAPIKeyFromClaims();
        this.leadsdetails.AccountObj.Ownership = this.claimsHelper.GetUserNameAPIKeyFromClaims();
        this.leadsdetails.AccountObj.OwnerID = this.claimsHelper.GetUserIdAPIKeyFromClaims();
        this.leadsdetails.AccountObj.CompanyID = 0;
        this.leadsdetails.AccountObj.AccountTypeId = 1;
        this.showcustomfileds = false;
      })
    }
  }
  get f() { return this.registerForm.controls; }
  AddAndnewLeads(type) {
    ;

    this.submitted = true;
    if (this.registerForm.valid) {
      this.stageDetails = this.leadsdetails.StageList.filter(item => item.StageId == this.leadsdetails.AccountObj.StageID);
      this.leadsdetails.AccountObj.BuyingStageText = this.stageDetails[0].StageName;
      if (this.leadsdetails.AccountObj.ID != 0 && this.leadsdetails.AccountObj.ID != undefined) {
        this.leadsdetails.AccountObj.ModifiedBy = this.claimsHelper.GetUserIdAPIKeyFromClaims();
      }
      else {
        this.leadsdetails.AccountObj.CreatedBy = this.claimsHelper.GetUserIdAPIKeyFromClaims();
      }
      let accountId;
      this.leadService.InsertLeadDetails(this.leadsdetails).subscribe(result => {
        accountId = result
        accountId = accountId.split('&')[0]
        const formData = new FormData();
        for (var i = 0; i < this.myFiles.length; i++) {
          formData.append("files", this.myFiles[i]);
        }
        formData.append("uesrid", this.claimsHelper.GetUserIdAPIKeyFromClaims());
        formData.append("username", this.claimsHelper.GetUserNameAPIKeyFromClaims());
        formData.append("module", 'Leads');
        formData.append("accountId", accountId);
        formData.append("filetype", "Leads");
        this.contactservice.PostAttachment(formData).subscribe(res => {
        })
        this.EmailAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
        this.EmailAPIKey = this.claimsHelper.GetEmailAPIKeyFromClaims();
        if ((this.EmailAPIKey != "") && (this.EmailAPILink != "")) {
          this.leadsdetails.AccountObj.ID = accountId;
          this.leadsdetails.AccountObj.EmailAPIKey = this.EmailAPIKey;
          this.leadsdetails.AccountObj.EmailAPILink = this.EmailAPILink;
          this.contactservice.InsertUpdateAPIContactIDs(this.leadsdetails.AccountObj).subscribe(result => {
          })
          this.toastr.successToastr("Lead Created Successfully.", 'success');
          if (type == "savenew") {
            let ModuleId = "1", ModuleName = "Leads";
            this.router.navigate(["CRM/lead/addnewlead/", 0, { MId: ModuleId, MName: ModuleName }]).then(nav => {
              console.log(nav);
            }, err => {
              console.log(err)
            });
            this.registerForm.reset();
            this.submitted=false
          }
          else {
            this.router.navigate(["CRM/leads/viewleads/", accountId, { vname: "Leads", tname: 'Leads' }]).then(nav => {
              console.log(nav);
            }, err => {
              console.log(err)
            });
          }
        }
      })
    }
    else {
      return;
    }
  }
  onPhoneChange(ele, type) {
    var value = ele.target.value.replace(/[^a-zA-Z 0-9]+/g, '').trim();
    if (value.length < 10 || value.length > 10) {
      if (type == 'phone') {
        this.leadsdetails.AccountObj.Phone = "";
      }
      else if (type == 'fax') {
        this.leadsdetails.AccountObj.Fax = "";
      }
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  usersStatus(event) {
    ;
    this.leadsdetails.AccountObj.OwnerID = event.UserId;
    this.leadsdetails.AccountObj.Ownership = event.FullName;
    this.showSearchUsersmodal = false;
  }
  saveStatus() {
    ;
    this.showSearchUsersmodal = false;
    this.ShowCreateCompanyModal = false;
    this.ShowCompanyListModal = false;
  }
  GetSearchUsersList(event) {
    ;
    if (event.clientX != 0 && event.clientY != 0) {
      this.showSearchUsersmodal = true;
    }
  }
  GetCreateCompanyModal(event) {
    if (event.clientX != 0 && event.clientY != 0) {
      this.ShowCreateCompanyModal = true;
    }
  }
  CompanyStatus(event) {
    ;
    if (event != "") {
      this.leadsdetails.AccountObj.CompanyID = event.CompanyID;
      this.leadsdetails.AccountObj.CompanyName = event.CompanyName;
    }
    this.showSearchUsersmodal = false;
    this.ShowCreateCompanyModal = false;
    this.ShowCompanyListModal = false;
  }
  ClearFiles() {
    this.myInputVariable.nativeElement.value = "";
    this.myFiles = [];
  }
  getFileDetails(e) {
    for (var i = 0; i < this.myInputVariable.nativeElement.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
  onChange(FieldId, DrpValueId, isChecked) {
    for (let fileditems of this.leadsdetails["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions) {
      if (fileditems.DrpValueId == DrpValueId) {
        this.leadsdetails["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault = true;
        this.leadsdetails["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].DefaultValue = DrpValueId;
      }
      else {
        this.leadsdetails["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + fileditems.DrpValueId)[0].IsDefault = false;
      }
    }
  }
  onChangeCheckBox(FieldId, DrpValueId, isChecked) {
    if (isChecked) {
      this.leadsdetails["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault = true;
    }
    else {
      this.leadsdetails["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault = false;
    }
  }
  NavigateBackleadlist() {
    this.router.navigate(["CRM/leads/"]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err)  // when there's an error
    });
  }

}
