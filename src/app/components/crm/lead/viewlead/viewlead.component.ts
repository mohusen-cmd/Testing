import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventEmitter } from 'protractor';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AttachmentDomainModel } from 'src/app/models/AttachmentViewModel';
import { CompanyDetailsViewModel, CompanyViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { AccountListDomainModel, APIContactViewModel, LeadDispositionDomainModel, LeadsDetailsDomainModel, MailingInfoDomainModel } from 'src/app/models/ILeadsDetailsDomainModel';
import { AllNoteViewModel, NotesListViewModel } from 'src/app/models/INotesModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactService } from 'src/app/services/contact.service';
import { LeadService } from 'src/app/services/lead.service';
import { CustomvalidatorsService } from 'src/app/validators/customvalidators.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-viewlead',
  templateUrl: './viewlead.component.html',
  styleUrls: ['./viewlead.component.scss'],
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
export class ViewleadComponent implements OnInit {
  public maskUsMobile = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  Urlvalidator= "https?://.+";
  disabledata:boolean=false;
  editabledata:boolean=false;
  showviewdetails:boolean=false;
  showeditdetails:boolean =true;
  showSearchUsersmodal: boolean = false;
  ShowCreateCompanyModal: boolean = false  
  ShowCompanyListModal: boolean = false;
  registerForm:FormGroup;
  submitted = false;
  LeadId:any;
  AccountTypeID:any;
  EmailAPILink: string;
  EmailAPIKey: string; 
  myFiles: string[] = [];
  modulename:any;
  showActivity = false; 
  showNote = false; 
  showAttachment:boolean=false;
  ShowEmail:boolean=false;
  selectedtab:any;
  MailName:any;
  @ViewChild('navPills', { static: false }) tabs: NgbNav;
  leadsdetails:LeadsDetailsDomainModel=new LeadsDetailsDomainModel();
  TabData:any={};
  ViewTab: any;
  deletedids: any=[];
  @ViewChild('nav', { static: true }) nav: NgbNav;
   constructor(private toastr: ToastrManager,private companyservice:CompanyService,private fb: FormBuilder,private leadService:LeadService,private spinner: NgxSpinnerService,private claimsHelper:ClaimsHelper,private router: Router,private contactservice:ContactService,private route: ActivatedRoute) { 
    this.leadsdetails.AccountObj=new AccountListDomainModel()
    this.leadsdetails.LeadDispoObj;
    this.leadsdetails.LeadSourceList;
    this.leadsdetails.StageList;
    this.leadsdetails.StateList;
    this.leadsdetails.CountryList;
    this.leadsdetails.listCustomfields;
    this.leadsdetails.lstcustomVM;
    this.leadsdetails.AllNotesObj;
    this.route.paramMap.subscribe(params => {
      
      this.LeadId = params.get("Id");
      this.AccountTypeID = 1;
      this.ViewTab = params.get("tname");
     })
   }
   ngOnInit() {
    

    this.disabledata =true;
    this.editabledata=true;
    this.showeditdetails =false;
    this.showviewdetails = true; 
    this.registerForm = this.fb.group({
      ownership         : new FormControl('') ,
      firstName         : new FormControl('',Validators.required) ,
      lastName          : new FormControl('') ,
      companyName       : new FormControl('',Validators.required) ,
      title             : new FormControl('') ,  
      email             : new FormControl('', [Validators.email]) ,
      phone             : new FormControl('', ) , 
      phoneext          : new FormControl('',) ,    
      fax               : new FormControl('', ) ,
      mobile            : new FormControl('', ) ,   
      website           : new FormControl('', Validators.pattern(this.Urlvalidator)) ,        
      leadSource        : new FormControl('', Validators.required) ,     
      contacttype       : new FormControl('') ,        
      department        : new FormControl('') ,     
      optemailout       : new FormControl('') ,  
      CopyCompanyAddress: new FormControl('') ,    
      mailingAddress    : new FormControl('') ,    
      mailingAddress2   : new FormControl('') ,         
      mailingcity       : new FormControl('') ,       
      mailingstateid    : new FormControl('') ,                 
      mailingzip        : new FormControl('', ) ,             
      mailingcountryid  : new FormControl('') ,                 
      copymailing       : new FormControl('') ,               
      billingaddress    : new FormControl('') ,                 
      billingaddress2   : new FormControl('') ,               
      billingcity       : new FormControl('') ,            
      billingstateid    : new FormControl('') ,                
      billingzip        : new FormControl('', ) ,                     
      billingcountryid  : new FormControl('') ,    
      facebookusername  : new FormControl('') , 
      twitterusername   : new FormControl('') ,
      linkedinusername  : new FormControl('') ,  
      skypeusername     : new FormControl('') ,    
      description       : new FormControl('') ,
      attachment        : new FormControl('') ,          
      companydba        : new FormControl('') ,                                                      
      middlename        : new FormControl('') ,    
      leadstageid       : new FormControl('') , 
     });
     this.leadService.GetLeadDetailsByLeadId(this.LeadId,this.AccountTypeID).subscribe(res => {
      this.leadsdetails.AccountObj       = res["AccountObj"]; 
      this.leadsdetails.CountryList      = res["CountryList"];                                   
      this.leadsdetails.LeadSourceList   = res["LeadSourceList"];                                       
      this.leadsdetails.StageList        = res["StageList"];                                  
      this.leadsdetails.StateList        = res["StateList"];                                     
      this.leadsdetails.listCustomfields = res["listCustomfields"];
      this.leadsdetails.lstcustomVM      = res["lstcustomVM"];
      this.leadsdetails.AccountObj.RoleID=1;
     let firstname =this.leadsdetails.AccountObj.LastName == null ?"":this.leadsdetails.AccountObj.LastName;

      this.MailName =this.leadsdetails.AccountObj.FirstName +" "+ firstname;
      // if(this.leadsdetails.AccountObj.LastName!=null)
      // this.MailName =this.leadsdetails.AccountObj.FirstName +" "+ this.leadsdetails.AccountObj.LastName;
      // else
      // this.MailName=this.leadsdetails.AccountObj.FirstName;
     })
     
     if(this.ViewTab == "Activities")
     {
      this.selectedtab='tab-Activity';
     }
     else{
      this.selectedtab="tab-Leads";
     }
     this.TabClickEvent(this.selectedtab)
     
    
   }
   ngAfterViewChecked(): void {
    if(this.tabs) {
        this.tabs.select(this.selectedtab);
    }
  } 
   get f() { return this.registerForm.controls; }
   NavigateBackleadlist()
   {
     
     this.router.navigate(["CRM/leads/"]).then(nav => { 
       console.log(nav); 
     }, err => {     
       console.log(err) 
     });  
   }
   EditLeadDetails()
  {
    this.editabledata = false;
    this.showeditdetails = true;
    this.showviewdetails = false; 
  }
  NavigateActivitiesList()
  {
    
    this.router.navigate(["CRM/activities/"]).then(nav => { 
      console.log(nav); // true if navigation is successful
    }, err => {     
      console.log(err)  // when there's an error
    });  
  }
  NavigateEmail()
  {
    
    this.ShowEmail=true;
   
  }
  OutPutStatus(value){
    
    this.ShowEmail=false;

  }
  onPhoneChange(ele,type){
    
    var value=ele.target.value.replace(/[^a-zA-Z 0-9]+/g,'').trim();
    if(value.length<10 || value.length>10){
      if(type=='phone'){
        this.leadsdetails.AccountObj.Phone="";  
      }
      else if(type=='fax'){
        this.leadsdetails.AccountObj.Fax=""; 
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
  NavigateBackCompanylist()
  {
    
    this.router.navigate(["CRM/leads/"]).then(nav => { 
      console.log(nav); 
    }, err => {     
      console.log(err) 
    });  
  }
  onChange(FieldId,DrpValueId,isChecked)
  {
    
    // const modelFormArray = <FormArray>this.myForm.controls.modeldata;
    for (let fileditems of this.leadsdetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal) {
        if(fileditems.DrpValueId == DrpValueId)
        {
          this.leadsdetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault = true;
          this.leadsdetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].DefaultValue = DrpValueId;
        }
        else
        {
          this.leadsdetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal.filter(item1 => item1.DrpValueId == + fileditems.DrpValueId)[0].IsDefault = false;
        }
     }

  }

  onChangeCheckBox(FieldId,DrpValueId,isChecked)
  {
    
    if (isChecked) 
    {
      this.leadsdetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault=true;
    } 
    else 
    {
      this.leadsdetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault=false;
    }
  }
  GetSearchUsersList()
  {
    
    this.showSearchUsersmodal = true;  
  }
  GetCreateCompanyModal()
  {
    this.ShowCreateCompanyModal = true;  
  }
  AddAndnewLeads(type)
  {
    
    this.submitted=true;

    if (this.registerForm.valid) 
    {
      if(this.leadsdetails.AccountObj.ID != 0)
      {
        this.leadsdetails.AccountObj.ModifiedBy = this.claimsHelper.GetUserIdAPIKeyFromClaims();
      }
      else{
        this.leadsdetails.AccountObj.CreatedBy  = this.claimsHelper.GetUserIdAPIKeyFromClaims();
      }
        let accountId ;
        this.leadService.InsertLeadDetails(this.leadsdetails).subscribe(result => {
            
            accountId = result;
            const formData = new FormData();
            for (var i = 0; i < this.myFiles.length; i++) {
              formData.append("files", this.myFiles[i]);
            }
            formData.append("uesrid", this.claimsHelper.GetUserIdAPIKeyFromClaims());
            formData.append("username",localStorage.getItem("UserName"));
            formData.append("module",'Leads');
            formData.append("accountId",accountId);
            formData.append("filetype", "leads");
            this.contactservice.PostAttachment(formData).subscribe(res => {
              
            }) 
         this.EmailAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
         this.EmailAPIKey = this.claimsHelper.GetEmailAPIKeyFromClaims();  
         if ((this.EmailAPIKey != "") && (this.EmailAPILink != ""))
         {
          this.leadsdetails.AccountObj.ID = accountId;
          this.leadsdetails.AccountObj.EmailAPIKey = this.EmailAPIKey;
          this.leadsdetails.AccountObj.EmailAPILink = this.EmailAPILink;
          this.leadService.InsertUpdateAPIContactIDs(this.leadsdetails.AccountObj).subscribe(result => {
            
          })
          this.toastr.successToastr("Leads Updated Successfully.",'success');
         if (type == "savenew")
         { 
           let Id = 0,ModuleId="1",ModuleName="Leads";
           this.router.navigate(["CRM/lead/addnewlead/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
            
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
         }
        }
      })
     }
     else
     {
       return;
     }
  }
  TabClickEvent($event: any)
    {
      
      if ($event === 'tab-Attachments') {
        this.fetchTabData('attachment');
        this.selectedtab='tab-Attachments';
      }
      else if($event === 'tab-Notes')
      {
        this.fetchTabData('note');
        this.selectedtab='tab-Notes';
      }
      else if($event === 'tab-Activity')
      {
        this.fetchTabData('activity');
        this.selectedtab='tab-Activity';
      }
      else
      {
        this.selectedtab = "tab-Leads";
      }
   }
 fetchTabData(type:any) {
   
  if (type =='activity') { 

   
   this.spinner.show();
    var companyid=this.LeadId ;
    var accountype=this.claimsHelper.GetUserIdAPIKeyFromClaims(); 
    var module=1;
    var pageIndex=0;
    var pageSize=10;
    var orderbyclause="DueDate asc";
    var recordcount=0; 

    this.GetActList(companyid, accountype, pageIndex, pageSize, orderbyclause, recordcount);
    //console.log(type);  
  }
  else if (type == 'note') {
    
    this.spinner.show();
    var notecompanyid=this.LeadId;;
    var module=1;
    var pageindex=0;
    var pagesize=10;
    var orderbyclause="NotesId desc";
    var totalpagecount=0;
    this.GetNotes(notecompanyid, module, pageindex, pagesize, orderbyclause, totalpagecount);  
  }
  else if(type == 'attachment')
  {
    this.spinner.show();
    var attContactId = this.LeadId;;
    var Module = "Leads";
    var pageindex = 0;
    var pagesize = 10;
    var orderbyclause = "AttachmentID asc";
    var totalpagecount = 0;
    this.GetAttachments(attContactId,Module,pageindex,pagesize,orderbyclause,totalpagecount); 
  } 
}
private GetActList(leadid: any, userid: number, startindex: number, pagesize: number, orderByClause: string, totalPageCount: number) {
  this.leadService.GetActivityList(leadid,userid,startindex,pagesize,orderByClause,totalPageCount).subscribe(res => {
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
    mds.ModuleName = "Leads"; 
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
LoadAtivities($event)
{
  
  this.showActivity = false;
  this.GetActList($event.leadid,$event.userid,$event.pageIndex,$event.pageSize,$event.orderbyclause,$event.totalPageCount)
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
  NavigateAddLeads()
  {
    
    let Id = 0,ModuleId="1",ModuleName="Leads";
    this.router.navigate(["CRM/lead/addnewlead/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
    }, err => {
      console.log(err) 
  }); 
  }
  DeleteRecord(ID)
  {

if(this.leadsdetails.AccountObj.IsActivity !=0 )
{
  this.toastr.errorToastr('Lead is in use','Error')
}
else 
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
      
      this.deletedids.push(ID);
      this.leadService.deleteAccountDetails(this.deletedids).subscribe(res =>{
        if(res)
        {
             Swal.fire(
               'Deleted!',
               'Your Record has been deleted.',
               'success'
             ).then((result) => {
              this.router.navigate(["CRM/leads/"]).then(nav => { 
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
  }
  CloneLeadDetails()
  {
    let ModuleId="1",ModuleName="Leads";
    this.router.navigate(["CRM/lead/addnewlead/",this.LeadId,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
    }, err => {
      console.log(err) 
  });  
  }
  saveStatus(){
    this.showSearchUsersmodal=false;  
    this.ShowCreateCompanyModal =false;
    this.ShowCompanyListModal =false;
  }
  usersStatus(event)
  {
    this.leadsdetails.AccountObj.OwnerID =event.UserId;
    this.leadsdetails.AccountObj.Ownership = event.FullName;
    this.showSearchUsersmodal=false;  
  }
  ConvertLead()
  {
    this.router.navigate(["CRM/contacts/convertlead/",this.leadsdetails.AccountObj.ID]).then(nav => { 
      console.log(nav); 
    }, err => {     
      console.log(err) 
    });  
  }
  CompanyStatus(event)
  {
    if(event != "")
    {
      this.leadsdetails.AccountObj.CompanyID = event.CompanyID;
      this.leadsdetails.AccountObj.CompanyName = event.CompanyName;
    }
    this.showSearchUsersmodal=false;  
    this.ShowCreateCompanyModal =false;
    this.ShowCompanyListModal =false;
  }
}
