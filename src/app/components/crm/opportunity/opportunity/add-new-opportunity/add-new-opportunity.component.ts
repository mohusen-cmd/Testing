import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CompanyDetailsViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { APIContactViewModel } from 'src/app/models/IContactsViewModel';
import { AccountListDomainModel } from 'src/app/models/ILeadsDetailsDomainModel';
import { OpportunitiesDetailsDomainModel } from 'src/app/models/IOpportunitiesDetailsViewModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContactService } from 'src/app/services/contact.service';
import { OpportunityService } from 'src/app/services/opportunity.service';

@Component({
  selector: 'app-add-new-opportunity',
  templateUrl: './add-new-opportunity.component.html',
  styleUrls: ['./add-new-opportunity.component.scss']
})
export class AddNewOpportunityComponent implements OnInit {
  oppdetails:OpportunitiesDetailsDomainModel=new OpportunitiesDetailsDomainModel(); 
  localoppId=0;
  registerForm:FormGroup;
  myFiles: string[] = [];
  @ViewChild('myuploadInput') myInputVariable: any;
  disableSubmitButton:boolean=false;
  submitted = false;
  LeadId: string;
  OpportunityId: any;
  CompanyID:any;
  ShowCompanyListModal: boolean = false;
  ShowContactListModal:boolean = false;
  showSearchUsersmodal: boolean = false;
  EmailAPIKey: any;
  EmailAPILink: any;
  ModuleId: string;
  ModuleName: string;
  OpportunityClone: string;
  constructor(private router: Router,private contactservice:ContactService,private route: ActivatedRoute,private oppService: OpportunityService,private activeRoute: ActivatedRoute,private fb: FormBuilder,private claimHelper: ClaimsHelper,public toastr: ToastrManager ) { 
    this.oppdetails.AccountObj=new AccountListDomainModel() 
    this.oppdetails.LeadSourceList;
    this.oppdetails.StageList;
    this.oppdetails.StateList;
    this.oppdetails.CountryList;
    this.oppdetails.listCustomfields;
    this.oppdetails.lstcustomVM;
    this.oppdetails.AllNotesObj;
    this.oppdetails.OppotypeList;
  }
  ngOnInit() {
    
    this.registerForm = this.fb.group({
        ownership      : new FormControl('') , 
        oppname      : new FormControl('',Validators.required)  ,
        oppclosedate      : new FormControl(''),  
        companyname      : new FormControl('',Validators.required),  
        stage      : new FormControl('',Validators.required),  
        businesstypeid : new FormControl('',Validators.required), 
        probability : new FormControl(''),
        revenue : new FormControl(''),
        oppsource: new FormControl(''),
        oppcontactname : new FormControl(''), 
        email : new FormControl(''),
        phone : new FormControl(''),
        ext : new FormControl('')
      });
      this.route.paramMap.subscribe(params => {
        
        this.OpportunityId = params.get("Id");
        this.ModuleId = params.get("MId");
        this.ModuleName = params.get("MName");
       })
      if(this.ModuleName == "Companies")
       {
        this.oppService.getCreateCompanyOpportunity(this.OpportunityId).subscribe((res:OpportunitiesDetailsDomainModel) => {
          
          this.oppdetails =res;
          if (this.oppdetails.AccountObj == null)
          {
            this.oppdetails.AccountObj = new AccountListDomainModel();
          }
          this.oppdetails.AccountObj.AccountTypeId = 4;
          this.oppdetails.AccountObj.RoleID =this.claimHelper.GetRoleIdAPIKeyFromClaims();
          if  (this.oppdetails.AccountObj.StageID==null)
          this.oppdetails.AccountObj.StageID=""; 
          if  (this.oppdetails.AccountObj.BusinessTypeID==null)
          this.oppdetails.AccountObj.BusinessTypeID ="";
          if  (this.oppdetails.AccountObj.OppurtunitySourceID==null)
          this.oppdetails.AccountObj.OppurtunitySourceID ="";       
        })
       }
      else if(this.OpportunityId != "0")
       {debugger
        var AccountTypeId=4;
     this.oppService.GetOpportunityDetailsById(this.OpportunityId,AccountTypeId).subscribe((res:any)=> {
       
       this.oppdetails.CountryList      = res["CountryList"];                                   
       this.oppdetails.LeadSourceList   = res["LeadSourceList"];                                       
       this.oppdetails.StageList        = res["StageList"];                                  
       this.oppdetails.StateList        = res["StateList"];                                     
       this.oppdetails.listCustomfields = res["listCustomfields"];
       this.oppdetails.OppotypeList= res["OppotypeList"];
       this.oppdetails.AccountObj=res["AccountObj"];
       this.oppdetails.AccountObj.RoleID = this.claimHelper.GetRoleIdAPIKeyFromClaims(); //1;// Convert.ToInt32(GlobalVariables.RoleID); // need to implement[MOULI]
       this.oppdetails.AccountObj.Ownership = this.claimHelper.GetUserNameAPIKeyFromClaims();
       this.oppdetails.AccountObj.OwnerID = this.claimHelper.GetUserIdAPIKeyFromClaims();
       this.oppdetails.AccountObj.CompanyID = 0; 
       this.oppdetails.AccountObj.ID = 0;
       this.oppdetails.AccountObj.AccountTypeId = 4;
       if  (this.oppdetails.AccountObj.StageID==null)
         this.oppdetails.AccountObj.StageID=""; 
      if  (this.oppdetails.AccountObj.BusinessTypeID==null)
         this.oppdetails.AccountObj.BusinessTypeID ="";
         if  (this.oppdetails.AccountObj.OppurtunitySourceID==null)
         this.oppdetails.AccountObj.OppurtunitySourceID ="";               
       })
       }
       else 
       {
        this.LoadOpportunityDetailsById(0) ;
       }
    
  }
  get f() { return this.registerForm.controls; }
  LoadOpportunityDetailsById(OppId)
  {
     var AccountTypeId=4;
     this.oppService.GetOpportunityDetailsById(OppId,AccountTypeId).subscribe((res:any)=> {
       
       this.oppdetails.CountryList      = res["CountryList"];                                   
       this.oppdetails.LeadSourceList   = res["LeadSourceList"];                                       
       this.oppdetails.StageList        = res["StageList"];                                  
       this.oppdetails.StateList        = res["StateList"];                                     
       this.oppdetails.listCustomfields = res["listCustomfields"];
       this.oppdetails.OppotypeList= res["OppotypeList"];
       this.oppdetails.AccountObj=res["AccountObj"];
       this.oppdetails.AccountObj.RoleID = this.claimHelper.GetRoleIdAPIKeyFromClaims(); //1;// Convert.ToInt32(GlobalVariables.RoleID); // need to implement[MOULI]
       this.oppdetails.AccountObj.Ownership = this.claimHelper.GetUserNameAPIKeyFromClaims();
       this.oppdetails.AccountObj.OwnerID = this.claimHelper.GetUserIdAPIKeyFromClaims();
       this.oppdetails.AccountObj.CompanyID = 0; 
       this.oppdetails.AccountObj.AccountTypeId = 4;
       if  (this.oppdetails.AccountObj.StageID==null)
         this.oppdetails.AccountObj.StageID=""; 
      if  (this.oppdetails.AccountObj.BusinessTypeID==null)
         this.oppdetails.AccountObj.BusinessTypeID ="";
         if  (this.oppdetails.AccountObj.OppurtunitySourceID==null)
         this.oppdetails.AccountObj.OppurtunitySourceID ="";               
    })
  }
  getFileDetails(e) {
    for (var i = 0; i < this.myInputVariable.nativeElement.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
     } 
  }
  GetSearchCompanyListModal(event)
  {
    if(event.clientX != 0 && event.clientY != 0 )
    {
      this.ShowCompanyListModal = true;  
    }
  }
  companyliststatus(event)
  {
    
    if(this.CompanyID != event.CompanyID)
    {
      this.oppdetails.AccountObj.ContactName = "";
      this.oppdetails.AccountObj.ContactID =""
    }
    this.oppdetails.AccountObj.CompanyID = event.CompanyID;
    this.CompanyID = event.CompanyID;
    this.oppdetails.AccountObj.CompanyName = event.CompanyName;
    this.ShowCompanyListModal=false; 
  }
  GetSearchContactListModal(event) {
    if (event.clientX != 0 && event.clientY != 0) {
      if (this.oppdetails.AccountObj.CompanyID != undefined && this.oppdetails.AccountObj.CompanyID != 0) {
        this.ShowContactListModal = true;
      }
      else {
        this.toastr.errorToastr('Please Select Company !', 'error!');
      }
    }
  }
  GetSearchUsersList(event)
  {
    if(event.clientX != 0 && event.clientY != 0 )
    {
    this.showSearchUsersmodal = true;  
    }
  }
  activitydetailsStatus(event)
  {
    
    this.oppdetails.AccountObj.ContactName = event.FirstName;
    this.oppdetails.AccountObj.ContactID = event.ID;
    this.oppdetails.AccountObj.Email = event.Email,
    this.oppdetails.AccountObj.Phone = event.Phone,
    this.oppdetails.AccountObj.PhoneExt = event.PhoneExt,
    this.ShowCompanyListModal =false;
    this.ShowContactListModal =false; 
  }
  saveStatus(){
     
    this.ShowCompanyListModal =false;
    this.ShowContactListModal =false;
     
  }

  ClearFiles()
  {
    this.myInputVariable.nativeElement.value = "";
    this.myFiles = [];
  }
  createOrUpdateOpportunity(savestatus)
   {
    
    this.submitted=true;
    if (this.registerForm.valid) 
    {
      
      this.disableSubmitButton=true;
      if (this.oppdetails.AccountObj.ID != 0)
      {
          this.oppdetails.AccountObj.ModifiedBy = this.claimHelper.GetUserIdAPIKeyFromClaims();
      }
      else
      {
        this.oppdetails.AccountObj.CreatedBy = this.claimHelper.GetUserIdAPIKeyFromClaims();
      }
      this.oppService.InsertOppDetails(this.oppdetails).subscribe(  
        (result:any)=>
        {
        let  OpportunityId =result;
            
            this.disableSubmitButton=false; 
            const formData = new FormData();
            for (var i = 0; i < this.myFiles.length; i++) {
              formData.append("files", this.myFiles[i]);
            }
            formData.append("uesrid", this.claimHelper.GetUserIdAPIKeyFromClaims());
            formData.append("username",this.claimHelper.GetUserNameAPIKeyFromClaims());
            formData.append("module",'Opportunities');
            formData.append("accountId", OpportunityId);
            formData.append("filetype", "Opportunities");
            this.contactservice.PostAttachment(formData).subscribe(res => {
            })    
         this.EmailAPILink = this.claimHelper.GetEmailapilinkFromClaims();
         this.EmailAPIKey = this.claimHelper.GetEmailAPIKeyFromClaims(); 
          if ((this.EmailAPIKey != "") && (this.EmailAPILink != ""))
          {
                this.oppdetails.AccountObj.ID  = OpportunityId;
                this.oppdetails.AccountObj.EmailAPIKey = this.EmailAPIKey;
                this.oppdetails.AccountObj.EmailAPILink = this.EmailAPILink;
                this.contactservice.InsertUpdateAPIContactIDs(this.oppdetails.AccountObj).subscribe(result => {
              })
          }
          this.toastr.successToastr("Opportunity Created  Successfully.","success")
          if (savestatus == "savenew")
          {
            
            if( this.ModuleName == "Companies")
            {
             let ModuleId="3",ModuleName="Companies";
             this.router.navigate(["CRM/opportunities/addopportunities/",this.OpportunityId,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
              
                 console.log(nav); 
               }, err => {
                 console.log(err) 
             });  
            }
            else{
              let Id = 0,ModuleId="4",ModuleName="Opportunities";
              this.router.navigate(["CRM/opportunities/addopportunities/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
                    
                     console.log(nav); 
                   }, err => {
                    console.log(err) 
              }); 
            }
            this.LoadOpportunityDetailsById(0);
           }
          else
          {
            if(this.ModuleName == "Companies")
            {
              return this.router.navigate(["CRM/companies/viewcompany/",this.oppdetails.AccountObj.CompanyID,{vname:"Companies", tname:'Opportunities'}]).then(nav => { 
                console.log(nav); // true if navigation is successful
              }, err => {     
                console.log(err)  // when there's an error
              }); 
            }
            else{
            this.router.navigate(["CRM/opportunities/viewopportunity/",OpportunityId,{vname:"Opportunities", tname:'Opportunities'}]).then(nav => { 
              console.log(nav); 
            }, err => {     
              console.log(err) 
            }); 
           }
          }
        }, (err: AppError) => {
          if (err instanceof NotFoundError) {
            window.alert("404 Error Occured!");
          }
          else {
            window.alert("An unexpected Error Occured!");
          }
        }); 
    }
    else
    {
      return;
    }  
   }
   usersStatus(event)
   {
     this.oppdetails.AccountObj.OwnerID =event.UserId;
     this.oppdetails.AccountObj.Ownership = event.FullName;
     this.showSearchUsersmodal=false;  
     this.ShowCompanyListModal =false;
     this.ShowContactListModal =false;
   }
   NavigateOpportunityBackList()
   {
     
    if(this.ModuleName == "Companies")
    {
      return this.router.navigate(["CRM/companies/viewcompany/",this.OpportunityId,{vname:"Companies", tname:'Opportunities'}]).then(nav => { 
        console.log(nav); // true if navigation is successful
      }, err => {     
        console.log(err)  // when there's an error
      }); 
    }
    else
    {
      this.router.navigate(["CRM/opportunities/"]).then(nav => { 
        console.log(nav); // true if navigation is successful
      }, err => {     
        console.log(err)  // when there's an error
      });  
    }
   }
   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  } 
}

