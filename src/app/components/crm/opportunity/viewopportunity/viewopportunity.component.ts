import { animate, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { APIContactViewModel } from 'src/app/models/IContactsViewModel';
import { AccountListDomainModel } from 'src/app/models/ILeadsDetailsDomainModel';
import { AllNoteViewModel, NotesListViewModel } from 'src/app/models/INotesModel';
import { OpportunitiesDetailsDomainModel } from 'src/app/models/IOpportunitiesDetailsViewModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactService } from 'src/app/services/contact.service';
import { LeadService } from 'src/app/services/lead.service';
import { OpportunityService } from 'src/app/services/opportunity.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-viewopportunity',
  templateUrl: './viewopportunity.component.html',
  styleUrls: ['./viewopportunity.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ViewopportunityComponent implements OnInit {
  registerForm:FormGroup;
  OpportunityId:any;
  disabledata:boolean=false;
  editabledata:boolean=false;
  showviewdetails:boolean=false;
  showeditdetails:boolean =true;
  ShowCompanyListModal: boolean = false;
  ShowContactListModal:boolean = false;
  CompanyID:any;
  disableSubmitButton:boolean=false;
  submitted = false;
  oppdetails:OpportunitiesDetailsDomainModel=new OpportunitiesDetailsDomainModel(); 
  selectedtab: string="tab-Opportunity";
  TabData: any={};
  modulename: any;
  showActivity = false; 
  showNote = false; 
  showAttachment:boolean=false;
  showSearchUsersmodal: boolean = false;
  ViewTab: string;
  EmailAPILink: any;
  EmailAPIKey: any;
  myFiles: string[] = [];
  maildetails: AccountListDomainModel;
  ShowEmail: boolean=false;
  deletedids: any=[];
  @ViewChild('navPills', { static: false }) tabs: NgbNav;
  constructor(private leadService:LeadService,private claimHelper:ClaimsHelper,private commonService:CommonService,private contactservice:ContactService,private spinner: NgxSpinnerService,private companyservice:CompanyService, private oppService: OpportunityService,public toastr: ToastrManager ,private router: Router, private activeRoute: ActivatedRoute,private fb: FormBuilder)
   {  
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
        companyname      : new FormControl(''),  
        stage      : new FormControl('',Validators.required),  
        businesstypeid : new FormControl('',Validators.required), 
        probability : new FormControl(''),
        revenue : new FormControl(''),
        oppsource: new FormControl(''),
        oppcontactname : new FormControl('',Validators.required), 
        email : new FormControl(''),
        phone : new FormControl(''),
        ext : new FormControl('')
      // ownership            : new FormControl('') , 
      // billingcountryid     : new FormControl('')   
  });
    this.disabledata =true;
    this.editabledata=true;
    this.showeditdetails =false;
    this.showviewdetails = true; 
    this.activeRoute.params.subscribe(routeParams => {
      
      this.OpportunityId =routeParams.Id; 
      this.ViewTab = routeParams.tname;
  })
  if(this.ViewTab == "Activities")
  {
   this.selectedtab='tab-Activity';
  }
  else{
   this.selectedtab="tab-Opportunity";
  } 
  this.TabClickEvent(this.selectedtab)
  this.LoadOpportunityDetailsById(this.OpportunityId)   
  }
  ngAfterViewChecked(): void {
    if(this.tabs) {
        this.tabs.select(this.selectedtab);
        
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
       this.oppdetails.lstcustomVM = res["lstcustomVM"];
       this.oppdetails.OppotypeList= res["OppotypeList"];
       this.oppdetails.AccountObj=res["AccountObj"];
       this.registerForm.get("oppclosedate").setValue(this.oppdetails.AccountObj.CloseDate);              
      
    })
      
  }
  OpportunityEmail()
  {
    this.ShowEmail = true;
    this.commonService.GetAccountDetailsByID(this.OpportunityId).subscribe((res:AccountListDomainModel)=>{
     this.maildetails =res;
     
     
    })
  }
  EditOpportunityDetails()
  {
     
    this.EditMode(true);
  }

  EditMode(flag)
  {
    this.editabledata = !flag;
    this.showeditdetails = flag;
    this.showviewdetails = !flag; 
  }
  
  GetSearchCompanyListModal()
  {
    this.ShowCompanyListModal = true;  
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
  GetSearchContactListModal()
  {
    
    if(this.oppdetails.AccountObj.CompanyID != undefined )
    {
      this.ShowContactListModal = true;
    }
    else{
      this.toastr.errorToastr('Please Select Company !', 'error!');
    }
  }
  usersStatus(event)
  {
    this.oppdetails.AccountObj.OwnerID =event.UserId;
    this.oppdetails.AccountObj.Ownership = event.FullName;
    this.showSearchUsersmodal=false;  
  }
  activitydetailsStatus(event)
  {
    
    this.oppdetails.AccountObj.ContactName = event.FirstName;
    this.oppdetails.AccountObj.ContactID = event.ID;
    this.oppdetails.AccountObj.ContactName = event.ContactName
    this.oppdetails.AccountObj.ContactID = event?.ContactID
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
  GetSearchUsersList()
  {
    
    this.showSearchUsersmodal = true;  
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
         this.toastr.successToastr("Opportunity Updated  Successfully.","success")
         if (savestatus == "savenew")
         {
           this.LoadOpportunityDetailsById(0);
             let Id = 0,ModuleId="4",ModuleName="Opportunities";
             this.router.navigate(["CRM/opportunities/addopportunities/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
              
               console.log(nav); 
             }, err => {
               console.log(err) 
           }); 

          }
         else
         {
          this.disabledata =true;
          this.editabledata=true;
          this.showeditdetails =false;
          this.showviewdetails = true; 
          this.LoadOpportunityDetailsById(this.OpportunityId)   
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
private GetAttachments(attContactId,Module,pageindex,pagesize,orderbyclause,totalpagecount)
{
  
  this.companyservice.GetAttachmentsList(attContactId, Module , pageindex, pagesize, orderbyclause, totalpagecount).subscribe(res => {
    this.TabData = res;
    this.modulename = Module;
    this.showAttachment = true;
    this.showActivity = false;
    this.showNote = false;
    this.spinner.hide();
  }), (err: AppError) => {
    this.spinner.hide();
    if (err instanceof NotFoundError) {
      window.alert("404 Error Occured!");
    }
    else {
      window.alert("An unexpected Error Occured!");
    }
  };
}
private GetActList(companyid: any, accountype: number,Keyword:string, module: string, pageIndex: number, pageSize: number, orderbyclause: string, recordcount: number) {
  this.oppService.GetActivityList(companyid, accountype,Keyword, module, pageIndex, pageSize, orderbyclause, recordcount).subscribe(res => {
    this.TabData = res;

    this.showActivity = true;
    this.showAttachment = false;
    this.showNote = false;
    this.spinner.hide();
  }), (err: AppError) => {
    this.spinner.hide();
    if (err instanceof NotFoundError) {
      window.alert("404 Error Occured!");
    }
    else {
      window.alert("An unexpected Error Occured!");
    }
  };
}
private GetNotes(notecompanyid: any, module: number, pageindex: number, pagesize: number, orderbyclause: string, totalpagecount: number) {
  this.companyservice.GetNoteList(notecompanyid, module, pageindex, pagesize, orderbyclause, totalpagecount).subscribe((res:AllNoteViewModel[]) => {
    
    this.showNote = true;
    this.showActivity = false;
    this.showAttachment = false;
    var mds=new NotesListViewModel();
    (module ==  0) ?  mds.ActivityID = +notecompanyid :mds.ContactID = +notecompanyid; 
    mds.ContactTypeID = module; 
    mds.ID = notecompanyid;
    mds.ContactTypeID = module;
    mds.ModuleName = "Contact"; 
    mds.noteslist=  res;
    this.TabData = mds;
    this.spinner.hide();
  }), (err: AppError) => {
    this.spinner.hide();
    if (err instanceof NotFoundError) {
      window.alert("404 Error Occured!");
    }
    else {
      window.alert("An unexpected Error Occured!");
    }
  };
}
   fetchTabData(type:any) {
     
  if (type =='activity') { 
     
     this.spinner.show();
      var companyid = this.OpportunityId;
      var accountype = 4; 
      let modules = "Opportunities";
      let Keyword = undefined;
      var pageIndex=0;
      var pageSize=10;
      var orderbyclause="ID asc";
      var recordcount=0; 
      this.GetActList(companyid, accountype,Keyword, modules, pageIndex, pageSize, orderbyclause, recordcount); 
      //console.log(type);  
    }
    else if (type == 'note') {
      
      this.spinner.show();
      var notecompanyid=this.OpportunityId;;
      var module=4;
      var pageindex=0;
      var pagesize=10;
      var orderbyclause="NotesId desc";
      var totalpagecount=0;
       
      this.GetNotes(notecompanyid, module, pageindex, pagesize, orderbyclause, totalpagecount);  
    }
    else if(type == 'attachment')
    {
      this.spinner.show();
      var attContactId = this.OpportunityId;;
      var Module = "Opportunities";
      var pageindex = 0;
      var pagesize = 10;
      var orderbyclause = "AttachmentID asc";
      var totalpagecount = 0;
      this.GetAttachments(attContactId,Module,pageindex,pagesize,orderbyclause,totalpagecount); 
    } 
   } 
   TabClickEvent($event)
   {
     
     if ($event === 'tab-Attachments') {
       this.selectedtab='tab-Attachments';
       this.fetchTabData('attachment')
     }
     else if($event=== 'tab-Notes')
     {
       this.selectedtab='tab-Notes';
       this.fetchTabData('note');
     }
     else if($event === 'tab-Activity')
     {
       this.selectedtab='tab-Activity';
       this.fetchTabData('activity');
     }
     else{
       this.selectedtab ="tab-Opportunity";
     }
    }
    LoadAtivities($event)
    {
      this.showActivity = false;
      this.GetActList($event.companyid,$event.accountype,$event.Keyword,$event.module,$event.pageIndex,$event.pageSize,$event.orderbyclause,$event.recordcount)
 
    }
    LoadNotes($event)
    {
      this.showNote = false;
      this.GetNotes($event.notecompanyid,
        $event.module,
        $event.pageindex,
        $event.pagesize,
        $event.orderbyclause,
        $event.totalpagecount) 
    }
    LoadAttachments($event)
    {
      this.showAttachment =false;
      this.GetAttachments($event.attContactId,$event.Module,$event.pageindex,$event.pagesize,$event.orderbyclause,$event.totalpagecount);
    }
    NavigateBackOpportunitylist()
    {
      this.router.navigate(["CRM/opportunities"]).then(nav => { 
        console.log(nav); 
      }, err => {     
        console.log(err) 
      }); 
    }
    OutPutStatus(value){
      
      this.ShowEmail=false;
  
    }
    CloneOpportunitiesDetails()
    {
      let ModuleId="4",ModuleName="Opportunities";
      this.router.navigate(["CRM/opportunities/addopportunities/",this.OpportunityId,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
       
        console.log(nav); 
      }, err => {
        console.log(err) 
      }); 
    }
    DeleteOpportunitys(opporID)
    {
  
      Swal.fire({
        title: 'Are you sure you want to delete this record?',
        text: "You are about to delete permanently!",
        backdrop:false,
        imageUrl:'',
        reverseButtons:true,
        showCancelButton: true,
        cancelButtonColor: '#ef4d4d',
        confirmButtonColor: '#448aff',         
      }).then((result) => {
        if (result.value) {
          
          this.deletedids.push(opporID);
          this.leadService.deleteAccountDetails(this.deletedids).subscribe(res =>{
            
            if(res)
            {
                 Swal.fire(
                   'Deleted!',
                   'Your Record has been deleted.',
                   'success'
                 ).then((result) => {
                  this.router.navigate(["CRM/opportunities"]).then(nav => { 
                    console.log(nav); 
                  }, err => {     
                    console.log(err) 
                  }); 
                 });
            }
          })
        }
      })
    }
    NavigateActivitiesList()
    {
      
      this.router.navigate(["CRM/activities/"]).then(nav => { 
        console.log(nav); // true if navigation is successful
      }, err => {     
        console.log(err)  // when there's an error
      });  
    }
    NavigateAddOpportunity()
    {
      let Id = 0,ModuleId="4",ModuleName="Opportunities";
      this.router.navigate(["CRM/opportunities/addopportunities/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
       
        console.log(nav); 
       }, err => {
         console.log(err) 
     }); 
 }
 numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
}


