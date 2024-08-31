import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AttachmentDomainModel } from 'src/app/models/AttachmentViewModel';
import { CompanyDetailsViewModel, CompanyViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { AllNoteViewModel, NotesListViewModel } from 'src/app/models/INotesModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },

];
@Component({
  selector: 'app-viewcompany',
  templateUrl: './viewcompany.component.html',
  styleUrls: ['./viewcompany.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ViewcompanyComponent implements OnInit {
  public maskUsMobile = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  companydetails:any={}; 
  Urlvalidator= "https?://.+";

  TabData:any={};
  registerForm:FormGroup;
  submitted = false;
  myFiles: string[] = []; 
  disabledata:boolean=false;
  editabledata:boolean=false;
  showviewdetails:boolean=false;
  showeditdetails:boolean =true;
  showContact = false; 
  showOpportunity = false; 
  showActivity = false; 
  showNote = false; 
  showAttachment:boolean=false;
  showCompany = false;   
  viewMode=true;
  editMode=false;
  localcompanyid:any;
  modulename:any;
  selectedtab:any;

  @ViewChild('tabs') tabs: any;
  ViewTab: string;
  showSearchUsersmodal: boolean = false;
  ShowCompanyListModal: boolean = false;
  deletedids: any[];
  constructor(private companyservice:CompanyService,private toastr: ToastrManager,private contactService:ContactService,private claimsHelper:ClaimsHelper,private fb: FormBuilder,private activeRoute: ActivatedRoute,private router: Router,private spinner: NgxSpinnerService) { 
    this.spinner.show();
    this.companydetails.listCustomfields=[{}];
    this.companydetails.lstcustomVM =[{}];
    this.companydetails.lstCustomOptions=[{}];
    this.companydetails.LstCompany =[{}];
    this.companydetails.LstCompanyType =[{}];
    this.companydetails.lstcmpnyindustry=[{}];
    this.companydetails.LstOwnerShipType=[{}];
    this.companydetails.AccoutnList  =[{}];
    this.companydetails.LstNotes =[{}];
    this.companydetails.CompanyObj = {};
    this.companydetails.customVM =[{}];
    this.companydetails.CustomDrpObj =[{}];
    this.companydetails.AllNotesObj =[{}];
    this.companydetails.AccountObj =[{}];
    this.companydetails.StateList  =[{}];
    this.companydetails.CountryList =[{}];
    this.companydetails.CompanyObj.Name="";
  }

  ngOnInit() {
     

     this.activeRoute.paramMap.subscribe(params => {
      
      this.localcompanyid = params.get("Id");
      this.ViewTab = params.get("tname");
     })
    this.registerForm = this.fb.group({
      ownership            : new FormControl('') ,
      phoneext             : new FormControl('',),
      phone                : new FormControl('',) ,  
      companydba           : new FormControl('') ,  
      name                 : new FormControl('',Validators.required) ,     
      email                : new FormControl('',Validators.email) ,        
      website              : new FormControl('',Validators.pattern(this.Urlvalidator)) ,            
      fax                  : new FormControl('',) ,        
      parentcompanyname    : new FormControl('') ,           
      companytypeid        : new FormControl('') ,              
      companyindustryid    : new FormControl('') ,                
      companystatusid      : new FormControl('') ,                             
      employees            : new FormControl('') ,           
      annualrevenue        : new FormControl('',Validators.maxLength(15)) ,             
      siccode              : new FormControl('',Validators.maxLength(25)) ,  
      mailingaddress       : new FormControl('') ,  
      shippingstreet       : new FormControl('') ,      
      shippingcity         : new FormControl('') ,        
      shippingstateid      : new FormControl('') ,           
      shippingzip          : new FormControl('',Validators.maxLength(9)) ,       
      shippingcountryId    : new FormControl('') ,              
      billingaddress       : new FormControl('') ,            
      billingstreet        : new FormControl('') ,             
      billingcity          : new FormControl('') ,            
      billingstateid       : new FormControl('') ,                
      billingzip           : new FormControl('',Validators.maxLength(9)) ,       
      billingcountryid     : new FormControl('') ,
      description          : new FormControl('') ,    
      attachment           : new FormControl('') , 
      companyindustry      : new FormControl('') , 
      copymailing       : new FormControl('') ,   
  });

    this.disabledata =true;
    this.editabledata=true;
    this.showeditdetails =false;
    this.showviewdetails = true; 
    this.GetCompanyInfoCompanyId(this.localcompanyid);  
    
   if(this.ViewTab == "Activities")
    {
     this.selectedtab='tab-Activity';
    }
    else if(this.ViewTab == "Contacts")
    {
      this.selectedtab='tab-Contacts';
    }
    else if(this.ViewTab == "Opportunities")
    {
      this.selectedtab="tab-Opportunities";
    }
    else{
     this.selectedtab="tab-Company";
    }
    this.TabClickEvent(this.selectedtab)
  }
  ngAfterViewChecked(): void {
    if(this.tabs) {
        this.tabs.select(this.selectedtab);
    }
  } 
  get f() { return this.registerForm.controls; }
  GetCompanyInfoCompanyId (companyId) {
      this.companyservice.GetCompanyDetailsById(companyId).subscribe( 
      (result:any) =>  {  
         this.companydetails = result
        this.spinner.hide();}, 
      (err:AppError) => 
       {
         this.spinner.hide();
         if(err instanceof NotFoundError)
         {
           window.alert("404 Error Occured!")
         }
         else
         {
           window.alert("An unexpected Error Occured!")
         } 
      }
    ); 
  }

  private GetContactList(companyid: any, pageindex: number, pagesize: number, orderby: string, totalrecordcount: number) {
    this.companyservice.GetContactInfo(companyid, pageindex, pagesize, orderby, totalrecordcount).subscribe(result => {
      
      this.showContact = true;
      this.showOpportunity = false;
      this.showActivity = false;
      this.showNote = false;
      this.TabData = result;
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
      this.showOpportunity = false;
      this.showContact = false;
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
  private GetActList(companyid: any, accountype: number, module: number, pageIndex: number, pageSize: number, orderbyclause: string, recordcount: number) {
    this.companyservice.GetActivityList(companyid, accountype, module, pageIndex, pageSize, orderbyclause, recordcount).subscribe(res => {
      this.TabData = res;

      this.showActivity = true;
      this.showAttachment = false;
      this.showOpportunity = false;
      this.showContact = false;
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

  private GetOppList(searchcolumn: string, alphanumericsort: string, companykeyword: string, companyid: any, companyname: string, userid: number, stageid: number, startindex: number, psize: number, orderbyclasue: string, recordcount: number) {
    this.companyservice.GetOpportunityList(searchcolumn, alphanumericsort, companykeyword, companyid, companyname, userid, stageid, startindex, psize, orderbyclasue, recordcount).subscribe(res => {
      
      this.TabData = res;
      this.showOpportunity = true;
      this.showContact = false;
      this.showAttachment = false;
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
      this.showOpportunity = false;
      this.showAttachment = false;
      this.showContact = false;
      var mds=new NotesListViewModel();
      (module ==  0) ?  mds.ActivityID = +notecompanyid :mds.ContactID = +notecompanyid; 
      mds.ContactTypeID = module; 
      mds.ID = notecompanyid;
      mds.ContactTypeID = module;
      mds.ModuleName = "Company"; 
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
    this.GetActList($event.companyid,$event.accountype,$event.module,$event.pageIndex,$event.pageSize,$event.orderbyclause,$event.recordcount)
  }

  LoadOpportunities($event)
   {
    this.showOpportunity = false;
    this.GetOppList($event.searchcolumn, $event.alphanumericsort,$event.companykeyword,$event.companyid,$event.companyname,$event.userid,$event.stageid,$event.startindex,$event.psize,$event.orderbyclasue,$event.recordcount);
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
  LoadContacts($event)
  {
      this.showContact =false;
   this.GetContactList($event.companyid, $event.pageindex, $event.pagesize, $event.orderby, $event.totalrecordcount); 
  }
  LoadAttachments($event)
  {
      this.showAttachment =false;
    this.GetAttachments($event.attContactId,$event.Module,$event.pageindex,$event.pagesize,$event.orderbyclause,$event.totalpagecount);
  }
  NavigateBackCompanylist()
  {
    
    this.router.navigate(["CRM/companies/"]).then(nav => { 
      console.log(nav); // true if navigation is successful
    }, err => {     
      console.log(err)  // when there's an error
    });  
  }

  NavigateEditCompany(companyId)
  {

    this.editabledata = false;
    this.showeditdetails = true;
    this.showviewdetails = false; 
  }

  onChange(FieldId,DrpValueId,isChecked)
  {
    
    for (let fileditems of this.companydetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal) {
        if(fileditems.DrpValueId == DrpValueId)
        {
          this.companydetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault = true;
          this.companydetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].DefaultValue = DrpValueId;
        }
        else
        {
          this.companydetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal.filter(item1 => item1.DrpValueId == + fileditems.DrpValueId)[0].IsDefault = false;
        }
     }
  }
  NavigateActivitiesList()
  {
    
    this.router.navigate(["CRM/activities/"]).then(nav => { 
      console.log(nav); // true if navigation is successful
    }, err => {     
      console.log(err)  // when there's an error
    });  
  }
  onChangeCheckBox(FieldId,DrpValueId,isChecked)
  {
    
    if (isChecked) 
    {
      this.companydetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault=true;
    } 
    else 
    {
      this.companydetails["lstcustomVM"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptionsVal.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault=false;
    }
  }
  fetchTabData(type:any) {
     
 
  if (type == 'contact') {
        console.log(type); 
        this.spinner.show();
        var companyid=this.localcompanyid; 
        var pageindex=0;
        var pagesize=10;
        var orderby="OwnerShip asc";
        var totalrecordcount=0;  
        this.GetContactList(companyid, pageindex, pagesize, orderby, totalrecordcount); 
    }
    else if (type == 'opportunity') {
      
      this.spinner.show();
      var searchcolumn= "Name";
      var alphanumericsort="undefined";
      var companykeyword="undefined"; 
      var companyid=this.localcompanyid; 
      var companyname="undefined"; 
      var stageid=0; 
      var userid:number = +localStorage.getItem("Userid");//1043; 
      var startindex=0;
      var psize=10;
      var orderbyclasue = "closedate asc"
      var recordcount=0; 
      this.GetOppList(searchcolumn, alphanumericsort, companykeyword, companyid, companyname, userid, stageid, startindex, psize, orderbyclasue, recordcount); 

    }
   
    else if (type =='activity') { 

     
     this.spinner.show();
      var companyid=this.localcompanyid;
      var accountype=3; 
      var module=3;
      var pageIndex=0;
      var pageSize=10;
      var orderbyclause="DueDate asc";
      var recordcount=0; 
      this.GetActList(companyid, accountype, module, pageIndex, pageSize, orderbyclause, recordcount); 
      //console.log(type);  
    }
    else if (type == 'note') {
      
      this.spinner.show();
      var notecompanyid=this.localcompanyid;;
      var module=3;
      var pageindex=0;
      var pagesize=10;
      var orderbyclause="NotesId desc";
      var totalpagecount=0;
      this.GetNotes(notecompanyid, module, pageindex, pagesize, orderbyclause, totalpagecount);  
    }
    else if(type == 'attachment')
    {
      this.spinner.show();
      var attContactId = this.localcompanyid;;
      var Module = "Company";
      var pageindex = 0;
      var pagesize = 10;
      var orderbyclause = "AttachmentID asc";
      var totalpagecount = 0;
      this.GetAttachments(attContactId,Module,pageindex,pagesize,orderbyclause,totalpagecount); 
    } 
  } 
TabClickEvent($event)
{debugger
  if ($event=== 'tab-Attachments') {
    this.fetchTabData('attachment');
    this.selectedtab='tab-Attachments';
  }
  else if($event === 'tab-Notes')
  {
    this.fetchTabData('note');
    this.selectedtab='tab-Notes';
  }
  else if($event=== 'tab-Opportunities')
  {
    this.fetchTabData('opportunity');
    this.selectedtab='tab-Opportunities';
  }
  else if($event === 'tab-Contacts')
  {
    this.fetchTabData('contact');
    this.selectedtab='tab-Contacts';
  }
  else if($event=== 'tab-Activity')
  {
    this.fetchTabData('activity');
    this.selectedtab='tab-Activity';
  }
  else
  {
    this.selectedtab='tab-Company';
  }
 }
 SaveAndnewCompany(SaveNew)
  {
      
     this.submitted=true;
     if (this.registerForm.valid) 
     {
           let CompanyID ;
           this.companyservice.InsertCompanyDetails(this.companydetails).subscribe(result => {
             
             CompanyID = result;

             const formData = new FormData();
             for (var i = 0; i < this.myFiles.length; i++) {
               formData.append("files", this.myFiles[i]);
             }
             formData.append("uesrid", this.claimsHelper.GetUserIdAPIKeyFromClaims());
             formData.append("username",this.claimsHelper.GetUserNameAPIKeyFromClaims());
             formData.append("module",'Company');
             formData.append("accountId",CompanyID);
             formData.append("filetype", "Company");
             this.contactService.PostAttachment(formData).subscribe(res => {
               
             })       
             this.toastr.successToastr("Company Details Updated Successfully.",'success');
             if (SaveNew == "savenew")
             {
                 let Id = 0,ModuleId="3",ModuleName="Companies";
                 this.router.navigate(["CRM/companies/addnewcompany/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
                  
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
              this.GetCompanyInfoCompanyId(this.localcompanyid);  
             }
           })
      }
      else
      {
        return;
      }  
  }
  NavigateAddCompany()
  {
    
    let Id = 0,ModuleId="3",ModuleName="Companies";
    this.router.navigate(["CRM/companies/addnewcompany/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
    }, err => {
      console.log(err) 
  }); 
  }
  NavigateCloneCompanyDetails()
  {
    
    let ModuleId="3",ModuleName="Companies";
    this.router.navigate(["CRM/companies/addnewcompany/",this.localcompanyid,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
    }, err => {
      console.log(err) 
  }); 
   
}
GetSearchUsersList()
{
  
  this.showSearchUsersmodal = true;  
}
GetSearchCompanyListModal()
{
  this.ShowCompanyListModal = true;  
}
saveStatus(){
  this.showSearchUsersmodal = false;  
  this.ShowCompanyListModal = false;
}
usersStatus(event)
{
  
  this.companydetails.CompanyObj.OwnerID = event.UserId;
  this.companydetails.CompanyObj.Ownership  = event.FullName;
  this.showSearchUsersmodal=false;  
}
companyliststatus(event)
{
  
  this.companydetails.CompanyObj.ParentCompanyID = event.CompanyID;
  this.companydetails.CompanyObj.ParentCompanyName = event.CompanyName;
  this.ShowCompanyListModal=false; 
}
CompanyDelete(CompanyID,status)
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
      
      this.deletedids =[];
      this.deletedids.push(CompanyID);
      this.companyservice.deleteCompanyDetails(this.deletedids).subscribe(res =>{
        
        if(res)
        {
             Swal.fire(
               'Deleted!',
               'Your Record has been deleted.',
               'success'
             ).then((result) => {
               
               
               this.router.navigate(["CRM/companies"]).then(nav => { 
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
onChangeCopyMailing(event)
  {
    
    if(event == true)
    {
      this.companydetails.CompanyObj.BillingAddress  =  this.companydetails.CompanyObj.MailingAddress;  
      this.companydetails.CompanyObj.Billingstreet   =  this.companydetails.CompanyObj.Shippingstreet; 
      this.companydetails.CompanyObj.Billingcity     =  this.companydetails.CompanyObj.Shippingcity;     
      this.companydetails.CompanyObj.BillingstateID  =  this.companydetails.CompanyObj.ShippingstateID;      
      this.companydetails.CompanyObj.Billingzip      =  this.companydetails.CompanyObj.Shippingzip;   
      this.companydetails.CompanyObj.BillingcountryID=  this.companydetails.CompanyObj.ShippingcountryID; 
    }
    else
    {
      this.companydetails.CompanyObj.BillingAddress  = "";
      this.companydetails.CompanyObj.Billingstreet   = "";
      this.companydetails.CompanyObj.Billingcity     = "";
      this.companydetails.CompanyObj.BillingstateID  = 0 ;
      this.companydetails.CompanyObj.Billingzip      = "";
      this.companydetails.CompanyObj.BillingcountryID= 0 ;
    }  
  }
  onPhoneChange(ele,type){
    
    var value=ele.target.value.replace(/[^a-zA-Z 0-9]+/g,'').trim();
    if(value.length<10 || value.length>10){
      if(type=='phone'){
        this.companydetails.CompanyObj.Phone="";  
      }
      else if(type=='fax'){
        this.companydetails.CompanyObj.Fax=""; 
      }
           
    }
  }
  updateModuleValue(event)
  {
    return event;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
