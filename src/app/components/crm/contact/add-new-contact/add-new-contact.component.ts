import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactdepartmentDirective, contactDepartmentValidator } from 'src/app/directives/contactdepartment.directive';

import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CompanyDetailsViewModel, CompanyViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { AccountListViewModel, AccountViewModel, APIContactViewModel, Attachment, ContactDetailsViewModel } from 'src/app/models/IContactsViewModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactService } from 'src/app/services/contact.service';
import { CustomvalidatorsService } from 'src/app/validators/customvalidators.service';
@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss']
})
export class AddNewContactComponent implements OnInit {
  public maskUsMobile = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  helper = new JwtHelperService();
  contactdetailslist : ContactDetailsViewModel = new ContactDetailsViewModel();
  showSearchUsersmodal: boolean = false;
  ShowCreateCompanyModal: boolean = false  
  ShowCompanyListModal: boolean = false;
  registerForm:FormGroup;
  submitted = false;
  myForm: FormGroup;
  myFiles: string[] = [];
  token:any;
  EmailAPILink: string;
  EmailAPIKey: string;  
  checkbox: boolean;
  radioSelected:string;
  decodedToken: any;
  expirationDate: Date;
  isExpired:boolean;
  ModuleName:any;
  companyid:any;
  Urlvalidator= "https?://.+";

  @ViewChild('myuploadInput') myInputVariable: any;
  Moduleid: string;
  constructor(private _Activatedroute: ActivatedRoute, private fb: FormBuilder,private router: Router,private contactservice:ContactService,public toastr: ToastrManager,private claimsHelper:ClaimsHelper) {
    this.contactdetailslist.AccountObj = new AccountListViewModel()
     this.contactdetailslist.lstcustomVM
     this.contactdetailslist.listCustomfields
     this.contactdetailslist.lstContactType
     this.contactdetailslist.StageList
     this.contactdetailslist.StateList
     this.contactdetailslist.CountryList
     this.contactdetailslist.LeadSourceList
     this.contactdetailslist.LstNotes
     this.contactdetailslist.AllNotesObj
   }

  ngOnInit() {
    
    this.myForm = this.fb.group({
      modeldata: this.fb.array([{}]),
    });
    this.registerForm = this.fb.group({
      ownership         : new FormControl('') ,
      firstName         : new FormControl('',Validators.required) ,
      lastName          : new FormControl('') ,
      companyName       : new FormControl('') ,
      title             : new FormControl('') ,  
      email             : new FormControl('',Validators.email) ,
      phone             : new FormControl('', ), 
      phoneExt          : new FormControl('' ) ,    
      fax               : new FormControl('',) ,
      mobile            : new FormControl('', ) ,   
      website           : new FormControl('',Validators.pattern(this.Urlvalidator) ) ,        
      leadSource        : new FormControl('', Validators.required) ,     
      contacttype       : new FormControl('') ,        
      department        : new FormControl('') ,     
      optemailout       : new FormControl('') ,  
      CopyCompanyAddress: new FormControl('') ,    
      mailingAddress    : new FormControl('') ,    
      mailingAddress2   : new FormControl('') ,         
      mailingcity       : new FormControl('') ,       
      mailingstateid    : new FormControl('') ,                 
      mailingzip        : new FormControl('', CustomvalidatorsService.zipCodeValidator) ,             
      mailingcountryid  : new FormControl('') ,                 
      copymailing       : new FormControl('') ,               
      billingaddress    : new FormControl('') ,                 
      billingaddress2   : new FormControl('') ,               
      billingcity       : new FormControl('') ,            
      billingstateid    : new FormControl('') ,                
      billingzip        : new FormControl('', CustomvalidatorsService.zipCodeValidator) ,                     
      billingcountryid  : new FormControl('') ,    
      facebookusername  : new FormControl('') , 
      twitterusername   : new FormControl('') ,
      linkedinusername  : new FormControl('') ,  
      skypeusername     : new FormControl('') ,    
      description       : new FormControl('') ,
      attachment        : new FormControl('') ,         
  });
  this._Activatedroute.paramMap.subscribe(params => {
    this.ModuleName = params.get("MName");
    this.companyid = params.get("Id");
    this.Moduleid = params.get("MId");
  });
  if( this.ModuleName == "Companies")
  {
    
    this.contactservice.getcontactdetailsByCompanyId(this.companyid).subscribe((res:ContactDetailsViewModel) =>{
      
      this.contactdetailslist = res;
      this.contactdetailslist.AccountObj.OwnerID =this.claimsHelper.GetUserIdAPIKeyFromClaims();
      this.contactdetailslist.AccountObj.Ownership = this.claimsHelper.GetUserNameAPIKeyFromClaims();
      this.contactdetailslist.AccountObj.AccountTypeId = 2;
      this.contactdetailslist.lstContactType = res["lstContactType"];
      this.contactdetailslist.LeadSourceList = res["LeadSourceList"];
      this.contactdetailslist.lstDepartment = res["lstDepartment"];
      this.contactdetailslist.StateList = res["StateList"];
      this.contactdetailslist.CountryList = res["CountryList"];
      this.contactdetailslist.listCustomfields = res["listCustomfields"];
      // this.contactdetailslist.AccountObj.LeadSource = 0;
      // this.contactdetailslist.AccountObj.ContactTypeID = 0;
      // this.contactdetailslist.AccountObj.DepartmentID = 0;
      // this.contactdetailslist.AccountObj.MailingstateID =0;
      // this.contactdetailslist.AccountObj.MailingcountryID = 0;
      // this.contactdetailslist.AccountObj.BillingstateID = 0;
      // this.contactdetailslist.AccountObj.BillingcountryID = 0;
      this.contactdetailslist.AccountObj.RoleID = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
    });
  }
  else if(this.companyid != "0")
  {
     this.contactservice.GetContactDetails(this.companyid,2).subscribe((res:ContactDetailsViewModel) => {
      this.contactdetailslist =res;
      this.contactdetailslist.AccountObj.RoleID = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
      this.contactdetailslist.AccountObj.ID = 0
      this.contactdetailslist.AccountObj.RoleName = this.claimsHelper.GetRoleNameAPIKeyFromClaims(); 
    })
  }
  else{
    this.contactservice.GetContactDetails(0,2).subscribe(res => {
      
      this.contactdetailslist.AccountObj.OwnerID =+ this.claimsHelper.GetUserIdAPIKeyFromClaims();
      this.contactdetailslist.AccountObj.Ownership = this.claimsHelper.GetUserNameAPIKeyFromClaims();
      this.contactdetailslist.AccountObj.AccountTypeId = 2;
      this.contactdetailslist.lstContactType = res["lstContactType"];
      this.contactdetailslist.LeadSourceList = res["LeadSourceList"];
      this.contactdetailslist.lstDepartment = res["lstDepartment"];
      this.contactdetailslist.StateList = res["StateList"];
      this.contactdetailslist.CountryList = res["CountryList"];
      this.contactdetailslist.listCustomfields = res["listCustomfields"];
      this.contactdetailslist.AccountObj.LeadSource = "";
      this.contactdetailslist.AccountObj.ContactTypeID = 0;
      this.contactdetailslist.AccountObj.DepartmentID = 0;
      this.contactdetailslist.AccountObj.MailingstateID =0;
      this.contactdetailslist.AccountObj.MailingcountryID = 0;
      this.contactdetailslist.AccountObj.BillingstateID = 0;
      this.contactdetailslist.AccountObj.BillingcountryID = 0;
      this.contactdetailslist.AccountObj.RoleID = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
     
    });
  }
}
  get f() { return this.registerForm.controls; }

  decodeToken(tkn: string): void {
    if(tkn) {
    this.token = tkn;
       return this.decodedToken = this.helper.decodeToken(tkn);
    }
  }
  onChangeCopyMailing(event)
  {
    
    if(event == true)
    {
      this.contactdetailslist.AccountObj.BillingAddress   = this.contactdetailslist.AccountObj.MailingAddress  ;
      this.contactdetailslist.AccountObj.BillingAddress2  = this.contactdetailslist.AccountObj.MailingAddress2 ;
      this.contactdetailslist.AccountObj.Billingcity      = this.contactdetailslist.AccountObj.Mailingcity     ;
      this.contactdetailslist.AccountObj.BillingstateID   = this.contactdetailslist.AccountObj.MailingstateID  ;
      this.contactdetailslist.AccountObj.Billingzip       = this.contactdetailslist.AccountObj.Mailingzip      ;
      this.contactdetailslist.AccountObj.BillingcountryID = this.contactdetailslist.AccountObj.MailingcountryID; 
    }
    else
    {
      this.contactdetailslist.AccountObj.BillingAddress   = "";
      this.contactdetailslist.AccountObj.BillingAddress2  = "";
      this.contactdetailslist.AccountObj.Billingcity      = "";
      this.contactdetailslist.AccountObj.BillingstateID   = 0;
      this.contactdetailslist.AccountObj.Billingzip       = "";
      this.contactdetailslist.AccountObj.BillingcountryID = 0;
    }   
  }
  onChangeCopyCompanyAddress(event)
  {
    
    if(event == true)
    {
      let CompanyID:any= this.contactdetailslist.AccountObj.CompanyID;
      if(CompanyID == null || CompanyID == ""|| CompanyID == undefined)
      {
        this.toastr.errorToastr('Please Select Company', 'error!');
        this.checkbox=false;
      }
      else
      {
      this.contactservice.GetCompanyDetailsforMaillingAddress(CompanyID).subscribe(res => {
          if (res["CompanyObj"].MailingAddress != null)
            res["CompanyObj"].MailingAddress = res["CompanyObj"].MailingAddress;
          else res["CompanyObj"].MailingAddress = " ";
      
          if (res["CompanyObj"].Shippingstreet != null)
              res["CompanyObj"].Shippingstreet = res["CompanyObj"].Shippingstreet;
          else res["CompanyObj"].Shippingstreet = " ";
      
          if (res["CompanyObj"].Shippingcity != null)
              res["CompanyObj"].Shippingcity = res["CompanyObj"].Shippingcity;
          else res["CompanyObj"].Shippingcity = " ";
      
          if (res["CompanyObj"].MailingStateText != null)
              res["CompanyObj"].MailingStateText = res["CompanyObj"].MailingStateText;
          else res["CompanyObj"].MailingStateText = " ";
      
          if (res["CompanyObj"].MailingCountryText != null)
              res["CompanyObj"].MailingCountryText = res["CompanyObj"].MailingCountryText;
          else res["CompanyObj"].MailingCountryText = " ";
      
          if (res["CompanyObj"].Shippingzip != null)
              res["CompanyObj"].Shippingzip = res["CompanyObj"].Shippingzip
          else res["CompanyObj"].Shippingzip = " ";
      
          // ObjCompany.BillingFullAddress = ObjCompany.BillingAddress + ObjCompany.Billingstreet + ObjCompany.Billingcity + ObjCompany.BillingStateText + ObjCompany.BillingCountryText + ObjCompany.Billingzip;
          if (res["CompanyObj"].BillingAddress != null)
              res["CompanyObj"].BillingAddress = res["CompanyObj"].BillingAddress;
          else res["CompanyObj"].BillingAddress = " ";
      
          if (res["CompanyObj"].Billingstreet != null)
              res["CompanyObj"].Billingstreet = res["CompanyObj"].Billingstreet;
          else res["CompanyObj"].Billingstreet = " ";
      
          if (res["CompanyObj"].Billingcity != null)
              res["CompanyObj"].Billingcity = res["CompanyObj"].Billingcity;
          else res["CompanyObj"].Billingcity = " ";
      
          if (res["CompanyObj"].BillingStateText != null)
              res["CompanyObj"].BillingStateText = res["CompanyObj"].BillingStateText;
          else res["CompanyObj"].BillingStateText = " ";
      
          if (res["CompanyObj"].BillingCountryText != null)
              res["CompanyObj"].BillingCountryText = res["CompanyObj"].BillingCountryText;
          else res["CompanyObj"].BillingCountryText = " ";
      
          if (res["CompanyObj"].Billingzip != null)
              res["CompanyObj"].Billingzip = res["CompanyObj"].Billingzip;
          else res["CompanyObj"].Billingzip = " ";
          
          this.contactdetailslist.AccountObj.MailingAddress   = res["CompanyObj"].MailingAddress;
          this.contactdetailslist.AccountObj.MailingAddress2  = res["CompanyObj"].Shippingstreet;
          this.contactdetailslist.AccountObj.Mailingcity      = res["CompanyObj"].Shippingcity;
          this.contactdetailslist.AccountObj.MailingstateID   = res["CompanyObj"].ShippingstateID;
          this.contactdetailslist.AccountObj.Mailingzip       = res["CompanyObj"].Shippingzip;
          this.contactdetailslist.AccountObj.MailingcountryID = res["CompanyObj"].ShippingcountryID;
    
      })
    }
    }
    else{
      this.contactdetailslist.AccountObj.MailingAddress   = "";
      this.contactdetailslist.AccountObj.MailingAddress2  = "";
      this.contactdetailslist.AccountObj.Mailingcity      = "";
      this.contactdetailslist.AccountObj.MailingstateID   = 0;
      this.contactdetailslist.AccountObj.Mailingzip       = "";
      this.contactdetailslist.AccountObj.MailingcountryID = 0;
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onPhoneChange(ele,type){
    
    var value=ele.target.value.replace(/[^a-zA-Z 0-9]+/g,'').trim();
    if(value.length<10 || value.length>10){
      if(type=='phone'){
        this.contactdetailslist.AccountObj.Phone="";  
      }
      else if(type=='fax'){
        this.contactdetailslist.AccountObj.Fax=""; 
      }
           
    }
  }
  getFileDetails(e) {
    for (var i = 0; i < this.myInputVariable.nativeElement.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
     } 
  }
  ClearFiles()
  {
    this.myInputVariable.nativeElement.value = "";
    this.myFiles = [];
  }


  GetSearchUsersList(event)
  {
    if(event.clientX != 0 && event.clientY != 0 )
    {
      this.showSearchUsersmodal = true;  
    }
  }
  companyliststatus(event)
  {
   // this.contactdetailslist.AccountObj.CompanyID = event.CompanyID;
    this.contactdetailslist.AccountObj.CompanyName = event.CompanyName;
    this.ShowCompanyListModal=false; 
  }
  CompanyStatus(event)
  {
 ;
  if(event != "")
  {
    this.contactdetailslist.AccountObj.CompanyID = event.CompanyID;
    this.contactdetailslist.AccountObj.CompanyName = event.CompanyName;
  }
    
    this.ShowCreateCompanyModal=false; 
    this.showSearchUsersmodal=false;  
    this.ShowCompanyListModal =false;
  }
  NavigateBackContactslist()
  {
    if(this.ModuleName == "Companies")
    {
      return this.router.navigate(["CRM/companies/viewcompany/",this.companyid,{vname:"Companies", tname:'Contacts'}]).then(nav => { 
        console.log(nav); // true if navigation is successful
      }, err => {     
        console.log(err)  // when there's an error
      }); 
    }
    else if(this.ModuleName == "Leads")
    {
      return this.router.navigate(["CRM/leads/viewleads/",this.companyid,{vname:"Leads", tname:'Contacts'}]).then(nav => { 
        console.log(nav); // true if navigation is successful
      }, err => {     
        console.log(err)  // when there's an error
      }); 
    }
  else if(this.ModuleName == "Opportunity")
    {
      return this.router.navigate(["CRM/opportunities/viewopportunity/",this.companyid,{vname:"Opportunity", tname:'Contacts'}]).then(nav => { 
        console.log(nav); // true if navigation is successful
      }, err => {     
        console.log(err)  // when there's an error
      }); 
    }
    else
    {
      this.router.navigate(["CRM/contacts/"]).then(nav => { 
        console.log(nav); // true if navigation is successful
      }, err => {     
        console.log(err)  // when there's an error
      });  
    }
  }
  GetSearchCompanyListModal(event)
  {
    if(event.clientX != 0 && event.clientY != 0 )
    {
       this.ShowCompanyListModal = true;
    }  
  }
  GetCreateCompanyModal(event)
  {
    if(event.clientX != 0 && event.clientY != 0 )
    {
       this.ShowCreateCompanyModal = true;  
    }
  }
  usersStatus(event)
  {
    this.contactdetailslist.AccountObj.OwnerID = event.UserId
    this.contactdetailslist.AccountObj.Ownership = event.FullName;
    this.showSearchUsersmodal=false;  
    this.ShowCreateCompanyModal =false;
    this.ShowCompanyListModal =false;
  }
  saveStatus(){
    this.showSearchUsersmodal=false;  
    this.ShowCreateCompanyModal =false;
    this.ShowCompanyListModal =false;
  }
  SaveAndnew(savestatus)
  {
    this.contactdetailslist
    this.submitted=true;
    if (this.registerForm.valid) 
    {
          let accountId ;
          this.contactdetailslist.AccountObj.CompanyID = this.companyid;
          let Department=  this.contactdetailslist.lstDepartment.filter(item =>item.DepartmentID == this.contactdetailslist.AccountObj.DepartmentID)
          this.contactdetailslist.AccountObj.DepartmentID =Department[0].DepartmentID
          this.contactdetailslist.AccountObj.DepartmentText=Department[0].DepartmentName
          this.contactservice.insertContactDetails(this.contactdetailslist).subscribe(result => {
            accountId = result;
            const formData = new FormData();
            for (var i = 0; i < this.myFiles.length; i++) {
              formData.append("files", this.myFiles[i]);
            }
            formData.append("uesrid", this.claimsHelper.GetUserIdAPIKeyFromClaims());
            formData.append("username",this.claimsHelper.GetUserNameAPIKeyFromClaims());
            formData.append("module",'Contacts');
            formData.append("accountId", accountId);
            formData.append("filetype", "Contacts");
            this.contactservice.PostAttachment(formData).subscribe(res => {
              
            })   
            this.contactdetailslist.AccountObj.ID  =accountId;
         this.EmailAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
         this.EmailAPIKey = this.claimsHelper.GetEmailAPIKeyFromClaims();  
         if ((this.EmailAPIKey != "") && (this.EmailAPILink != ""))
         {
          this.contactdetailslist.AccountObj.EmailAPIKey = this.EmailAPIKey;
          this.contactdetailslist.AccountObj.EmailAPILink = this.EmailAPILink;
          this.contactservice.InsertUpdateAPIContactIDs(this.contactdetailslist.AccountObj).subscribe(result => {

          })
         }
         this.toastr.successToastr("Contacts Created Successfully.",'success'); 
         if (savestatus == 'savenew')
         {
          if( this.ModuleName == "Companies")
          {
           let ModuleId="3",ModuleName="Companies";
           this.router.navigate(["CRM/contacts/AddNew/",this.companyid,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
            
               console.log(nav); 
             }, err => {
               console.log(err) 
           });  
          }
        else if( this.ModuleName == "Leads")
          {
           let ModuleId="1",ModuleName="Leads";
           this.router.navigate(["CRM/contacts/AddNew/",this.companyid,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
            
               console.log(nav); 
             }, err => {
               console.log(err) 
           });  
  
          }
       else   if( this.ModuleName == "Contacts")
          {
            let Id = 0,ModuleId="2",ModuleName="Contacts";
            this.router.navigate(["CRM/contacts/AddNew/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
             
              console.log(nav); 
            }, err => {
              console.log(err) 
          });  
   
          }
          }
         else
         {
          if(this.ModuleName == "Companies")
          {
            return this.router.navigate(["CRM/companies/viewcompany/",this.contactdetailslist.AccountObj.CompanyID,{vname:"Companies", tname:'Contacts'}]).then(nav => { 
              console.log(nav); // true if navigation is successful
            }, err => {     
              console.log(err)  // when there's an error
            }); 
          }
          if(this.ModuleName == "Leads")
          {
            return this.router.navigate(["CRM/leads/viewleads/",accountId,{vname:"Leads", tname:'Contacts'}]).then(nav => { 
              console.log(nav); // true if navigation is successful
            }, err => {     
              console.log(err)  // when there's an error
            }); 
          }
          if(this.ModuleName == "Contacts")
          {
            return this.router.navigate(["CRM/contacts/contactview/",accountId,{vname:"Contacts", tname:'Contacts'}]).then(nav => { 
              console.log(nav); // true if navigation is successful
            }, err => {     
              console.log(err)  // when there's an error
            }); 
          }
          if(this.ModuleName == "Opportunity")
          {
            return this.router.navigate(["CRM/opportunities/viewopportunity/",accountId,{vname:"Opportunity", tname:'Contacts'}]).then(nav => { 
              console.log(nav); // true if navigation is successful
            }, err => {     
              console.log(err)  // when there's an error
            }); 
          }
         }
          })
     }
     else
     {
       return;
     }  
  }
  onChange(FieldId,DrpValueId,isChecked)
  {
    
    for (let fileditems of this.contactdetailslist["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions) {
        if(fileditems.DrpValueId == DrpValueId)
        {
          this.contactdetailslist["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault = true;
          this.contactdetailslist["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].DefaultValue = DrpValueId;
        }
        else
        {
          this.contactdetailslist["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + fileditems.DrpValueId)[0].IsDefault = false;
        }
     }
  }

  onChangeCheckBox(FieldId,DrpValueId,isChecked)
  {
    
    if (isChecked) 
    {
      this.contactdetailslist["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault=true;
    } 
    else 
    {

      this.contactdetailslist["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault=false;
    }
  }
  companylistmodalstatus(event) {
    this.contactdetailslist.AccountObj.CompanyName = event.CompanyName
    this.contactdetailslist.AccountObj.CompanyID = event.CompanyID
    this.ShowCompanyListModal = false
  }
}
