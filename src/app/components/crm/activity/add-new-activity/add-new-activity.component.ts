import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { debounce, debounceTime } from 'rxjs/operators';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ActivityViewModel } from 'src/app/models/IActivityViewModel';
import { ActivityService } from 'src/app/services/activity.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { ContactService } from 'src/app/services/contact.service';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';

@Component({
  selector: 'app-add-new-activity',
  templateUrl: './add-new-activity.component.html',
  styleUrls: ['./add-new-activity.component.scss']
})
export class AddNewActivityComponent implements OnInit {
  public maskUsMobile = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskDateAuto = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public maskDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');
  @ViewChild('myuploadInput') myInputVariable: any;
  registerForm: FormGroup;
  submitted = false;
  LeadId: any;
  DueDate: any;
  loadedDate: Date;
  ModuleName: any;
  ModuleId: any;
  showSearchUsersmodal: boolean = false;
  ShowCompanyListModal: boolean = false;
  ShowContactListModal: boolean = false;
  ShowCompanyContactListModal: boolean = false;
  ShowCommomListModel: boolean = false;
  ShowOpperListModal:boolean=false
  showsentMail: boolean = false;
  accountType: string;
  myFiles: string[] = [];
  RoldId: any;
  updatetext: any;
  accountTypename: any;
  activitydetails: ActivityViewModel = new ActivityViewModel();
  userName: any;
  userId: any;
  modeltype: number;
  ActivityClone: string;
  constructor(private commonService: CommonService, private route: ActivatedRoute, private claimsHelper: ClaimsHelper, private contactservice: ContactService, public toastr: ToastrManager, private fb: FormBuilder, private activityService: ActivityService, private router: Router) {
    this.userName = this.claimsHelper.GetUserNameAPIKeyFromClaims();
    this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    this.activitydetails.ListAccounttype;
    this.activitydetails.TypeList;
    this.activitydetails.StatusList;
    this.activitydetails.ListPriority;
    this.activitydetails.ActiLstNotes;
    this.route.paramMap.subscribe(params => {
      this.LeadId = params.get("Id");
      this.ModuleId = params.get("MId");
      this.ModuleName = params.get("MName");
      this.ActivityClone = params.get("ActivityClone");
      this.activitydetails.AccountTypeID = this.ModuleId
      if (this.activitydetails.AccountTypeID == 1) { this.accountType = "Create Lead Activity"; }
      else if (this.activitydetails.backofscheduler != null) { this.accountType = "Create Scheduler Activity"; }
      else if (this.activitydetails.AccountTypeID == 2) { this.accountType = "Create Contact Activity"; }
      else if (this.activitydetails.AccountTypeID == 3) { this.accountType = "Create Company Activity"; }
      else if (this.activitydetails.AccountTypeID == 4) { this.accountType = "Create Opportunities Activity"; }
    })
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      accounttypeid: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      ownerName: new FormControl('', Validators.required),
      activitytypeid: new FormControl('', Validators.required),
      priorityid: new FormControl(''),
      statusid: new FormControl(''),
      duedate: new FormControl('', Validators.required),
      deminddate: new FormControl(''),
      companyName: new FormControl('', Validators.required),
      contactname: new FormControl(''),
      phone: new FormControl(''),
      phoneExt: new FormControl(''),
      email: new FormControl('', Validators.email),
      attachment: new FormControl(''),
      description: new FormControl(''),
      sendnotice: new FormControl(''),
      opporcontactName: new FormControl(''),
    });
    this.RoldId = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
    if ((this.LeadId == null) || (this.LeadId == "") || (this.LeadId == undefined))
      this.LeadId = "0";

    if (this.DueDate != "" && this.DueDate != null) {
      if (this.DueDate != null || this.DueDate != "" || this.DueDate != undefined) {
        this.loadedDate = new Date(this.DueDate);
      }
    }
    switch (this.ModuleId) {
      case "1":
        this.accountTypename = "Lead";
        break;
      case "2":
        this.accountTypename = "Contact";
        break;
      case "3":
        this.accountTypename = "Company ";
        break;
      case "4":
        this.accountTypename = "Opportunities";
        break;
    }

    if (this.ActivityClone == "clone") {
      this.contactservice.GetActivityDetails(this.LeadId, this.ModuleId).subscribe((result: ActivityViewModel) => {

        this.activitydetails = result;
        this.activitydetails.ActivityID = 0;
        this.activitydetails.RoleName = this.claimsHelper.GetRoleNameAPIKeyFromClaims();
      });
    }
    else {
      this.activityService.GetActivitytypebyid(this.LeadId, this.ModuleId).subscribe((result: ActivityViewModel) => {

        this.activitydetails = result;

        this.activitydetails.TypeList = result["TypeList"];
        this.activitydetails.StatusList = result["StatusList"];
        this.activitydetails.ListPriority = result["ListPriority"];
        this.activitydetails.ListAccounttype = result["ListAccounttype"];
        this.activitydetails.AccountTypeID = result["AccountTypeID"];
        this.activitydetails.AccountID = result["AccountID"];
        if (this.activitydetails.StatusID == 0) {
          this.activitydetails.StatusID = 1;
        }
        else if (this.activitydetails.PriorityID == 0) {
          this.activitydetails.PriorityID = 6;
        }
        this.activitydetails.ActivityTypeID ="";
        // if (this.activitydetails.ActivityTypeID == 0) {
        //   this.activitydetails.ActivityTypeID = 1;
        // }

        this.activitydetails.modulename = this.ModuleName;
        this.activitydetails.RoleID = this.claimsHelper.GetRoleIdAPIKeyFromClaims();
        if (this.activitydetails.AccountName == "NoCompany" || this.activitydetails.AccountName == "No Company")
          this.activitydetails.AccountName = "";

        if (this.activitydetails.Leadid == 0) {
          let UserId = this.claimsHelper.GetUserIdAPIKeyFromClaims(); //Convert.ToInt32(Session["UserID"]);// Convert.ToInt32(GlobalVariables.UserID);
          this.activitydetails.OwnerID = UserId;
          this.activitydetails.OwnerName = this.claimsHelper.GetUserNameAPIKeyFromClaims();
        }
      })
    }

  }
  get f() { return this.registerForm.controls; }
  GetSearchUserListModal(event) {
    if(event.clientX != 0 && event.clientY != 0 )
    {
    this.showSearchUsersmodal = true;
    }
  }
  ChangeModuleType(event)
  {
    ;
    switch (event) {
      case "1":
        this.accountTypename = "Lead";
        break;
      case "2":
        this.accountTypename = "Contact";
        break;
      case "3":
        this.accountTypename = "Company ";
        break;
      case "4":
        this.accountTypename = "Opportunities";
        break;
    }
    this.activitydetails.ContactName = "";
    this.activitydetails.AccountName = "";
    this.activitydetails.OpporContactName =""
    this.activitydetails.ActCompanyID = "";
    this.activitydetails.Phone = "";
    this.activitydetails.Email = "";
    this.activitydetails.PhoneExt = "";
  }

  // usersStatus(event) {
  //   this.activitydetails.OwnerName = event.FullName;
  //   //this.activitydetails.OwnerID    = event.UserId;
  //   this.showSearchUsersmodal = false;
  //   this.ShowCompanyListModal = false;
  //   this.ShowContactListModal = false;
  // }
 
  onPhoneChange(ele, type) {
    var value = ele.target.value.replace(/[^a-zA-Z 0-9]+/g, '').trim();
    if (value.length < 10 || value.length > 10) {
      if (type == 'phone') {
        this.activitydetails.Phone = "";
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
  companyliststatus(event) {
    this.activitydetails.AccountName = event.CompanyName;
    this.activitydetails.ActCompanyID = event.CompanyID;
    this.activitydetails.ContactName = "";
    this.activitydetails.Phone = "";
    this.activitydetails.PhoneExt=""
    this.activitydetails.Email = "";
    this.ShowCompanyListModal = false;
  }
  GetSearchCompanyListModal(event) {
    if(event.clientX != 0 && event.clientY != 0 )
    {
    this.ShowCompanyListModal = true;
    }
  }
  GetSearchContactListModal(event) {
    if(event.clientX != 0 && event.clientY != 0 )
    {
    this.ShowCompanyContactListModal = false;
    if ((this.activitydetails.ActCompanyID != "0" && this.activitydetails.ActCompanyID != undefined)) {
      this.ShowCompanyContactListModal = true;
    }
    else {
      this.toastr.errorToastr('Please Select Company !', 'error!');
    }
  }
  }
  activitydetailsStatus(event) {
    if (event.Phone != "null") {
      this.activitydetails.Phone = event.Phone;
    }
    else {
      this.activitydetails.Phone;
    }
    if (event.Email != "null") {
      this.activitydetails.Email = event.Email;
    }
    else {
      this.activitydetails.Email = "";
    }
    if (event.PhoneExt != "null") {
      this.activitydetails.PhoneExt = event.PhoneExt;
    }
    else {
      this.activitydetails.PhoneExt = "";
    }
    //this.activitydetails.ContactId    =  event.ID;
    //this.activitydetails.ActContactID = event.ID;
    this.activitydetails.ContactName = event.FirstName;
    this.showSearchUsersmodal = false;
    this.ShowCompanyListModal = false;
    this.ShowContactListModal = false;
    this.ShowCompanyContactListModal = false
  }
  CreateNewActivity(status) {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.showsentMail = true;
      if (this.activitydetails.AccountTypeID == 6) {
        this.activitydetails.AccountID = this.activitydetails.ContactId;
        this.activitydetails.modulename = "Activity";
      }
      let ModulePkID = "0";
      if (this.activitydetails.AccountTypeID == 1 || this.activitydetails.AccountTypeID == 2) {
        ModulePkID = this.activitydetails.ContactId.toString();
      }
      else if (this.activitydetails.AccountTypeID == 4) {
        ModulePkID = this.activitydetails.AccountID.toString();
      }
      else if (this.activitydetails.AccountTypeID == 3) {
        ModulePkID = this.activitydetails.ActCompanyID.toString();
      }
      //this.activitydetails.ActCompanyID =  this.LeadId;
      this.activitydetails.Createdby = this.claimsHelper.GetUserIdAPIKeyFromClaims();// Convert.ToInt32(Session["UserID"]);
      this.activitydetails.Modifiedby = this.claimsHelper.GetUserIdAPIKeyFromClaims(); //Convert.ToInt32(Session["UserID"]);
      this.activitydetails.NotificationFlag = false;
      let activityID;
      this.activityService.InsertActivityDetails(this.activitydetails).subscribe(result => {
        activityID = result;
        const formData = new FormData();
        for (var i = 0; i < this.myFiles.length; i++) {
          formData.append("files", this.myFiles[i]);
        }
        formData.append("uesrid", this.userId);
        formData.append("username", this.userName);
        formData.append("module", 'Activities');
        formData.append("accountId", activityID);
        formData.append("filetype", "Activities");
        this.contactservice.PostAttachment(formData).subscribe(() => {
        })
        if (this.activitydetails.Sendnotice == true) {
          let ModuleId: number = this.activitydetails.AccountTypeID;
          this.contactservice.sendEmail(ModuleId, activityID).subscribe(() => {
          })
        }
        this.toastr.successToastr("Lead Created Successfully.", 'success');
        if (status == "savenew") {
          if (this.ModuleName == "Companies") {
            let ModuleId = "3", ModuleName = "Companies";
            this.router.navigate(["CRM/activities/activityaddnew/", this.LeadId, { MId: ModuleId, MName: ModuleName }]).then(nav => {
              console.log(nav);
            }, err => {
              console.log(err)
            });
          }
          if (this.ModuleName == "Leads") {
            let ModuleId = "3", ModuleName = "Leads";
            this.router.navigate(["CRM/activities/activityaddnew/", this.LeadId, { MId: ModuleId, MName: ModuleName }]).then(nav => {
              console.log(nav);
            }, err => {
              console.log(err)
            });
          }
          if (this.ModuleName == "Contacts") {
            let ModuleId = "3", ModuleName = "Contacts";
            this.router.navigate(["CRM/activities/activityaddnew/", this.LeadId, { MId: ModuleId, MName: ModuleName }]).then(nav => {

              console.log(nav);
            }, err => {
              console.log(err)
            });
          }
          if (this.ModuleName == "Opportunities") {
            let ModuleId = "4", ModuleName = "Opportunities";
            this.router.navigate(["CRM/activities/activityaddnew/", this.LeadId, { MId: ModuleId, MName: ModuleName }]).then(nav => {

              console.log(nav);
            }, err => {
              console.log(err)
            });
          }
          else {
            let Id = 0, ModuleId = "3", ModuleName = "Activities";
            this.router.navigate(["CRM/activities/activityaddnew/", Id, { MId: ModuleId, MName: ModuleName }]).then(nav => {
              console.log(nav);
            }, err => {
              console.log(err)
            });
          }
        }
        else {
          if (this.ModuleName == "Companies") {
            return this.router.navigate(["CRM/companies/viewcompany/", ModulePkID, { vname: "Companies", tname: 'Activities' }]).then(nav => {
              console.log(nav); // true if navigation is successful
            }, err => {
              console.log(err)  // when there's an error
            });
          }
          if (this.ModuleName == "Leads") {
            return this.router.navigate(["CRM/leads/viewleads/", ModulePkID, { vname: "Leads", tname: 'Activities' }]).then(nav => {
              console.log(nav); // true if navigation is successful
            }, err => {
              console.log(err)  // when there's an error
            });
          }
          if (this.ModuleName == "Contacts") {
            return this.router.navigate(["CRM/contacts/contactview/", ModulePkID, { vname: "Contacts", tname: 'Activities' }]).then(nav => {
              console.log(nav); // true if navigation is successful
            }, err => {
              console.log(err)  // when there's an error
            });
          }
          if (this.ModuleName == "Opportunities") {
            return this.router.navigate(["CRM/opportunities/viewopportunity/", ModulePkID, { vname: "Opportunities", tname: 'Activities' }]).then(nav => {
              console.log(nav); // true if navigation is successful
            }, err => {
              console.log(err)  // when there's an error
            });
          }
          else {
            this.router.navigate(["CRM/activities/activityview/", activityID, this.ModuleId, "Activities", { viewtype: "Activity" }]).then(nav => {
              console.log(nav); // true if navigation is successful
            }, err => {
              console.log(err) // when there's an error
            });
          }
        }
      })
    }
    else {
      return;
    }
  }
  NavigateBackleadlist() {

    if (this.ModuleName == "Companies") {
      return this.router.navigate(["CRM/companies/viewcompany/", this.LeadId, { vname: "Companies", tname: 'Activities' }]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err)  // when there's an error
      });
    }
    if (this.ModuleName == "Leads") {
      return this.router.navigate(["CRM/leads/viewleads/", this.LeadId, { vname: "Leads", tname: 'Activities' }]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err)  // when there's an error
      });
    }
    if (this.ModuleName == "Contacts") {
      return this.router.navigate(["CRM/contacts/contactview/", this.LeadId, { vname: "Contacts", tname: 'Activities' }]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err)  // when there's an error
      });
    }
    if (this.ModuleName == "Opportunity") {
      return this.router.navigate(["CRM/opportunities/viewopportunity/", this.LeadId, { vname: "Opportunity", tname: 'Activities' }]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err)  // when there's an error
      });
    }
    else {
      this.router.navigate(["CRM/activities/"]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err)  // when there's an error
      });
    }
  }
  SendemailNotification(event) {

    if (event) {
      this.activitydetails.Sendnotice = true;
    }
    else {
      this.activitydetails.Sendnotice = false;
    }
  }
  statusMail() {

  }
  getFileDetails(e) {
    for (var i = 0; i < this.myInputVariable.nativeElement.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
  ClearFiles() {
    this.myInputVariable.nativeElement.value = "";
    this.myFiles = [];
  }
  GetCommonListModal(type,event) {
    if(event.clientX != 0 && event.clientY != 0 )
    {
    if (type == "4") {
      this.modeltype = 4;
      this.ShowOpperListModal = true;
    }
    else if (type == "1") {
      this.modeltype = 1;
      this.ShowCommomListModel = true;
    }
    else if (type == "2") {
      this.modeltype = 2;
      this.ShowContactListModal = true;
    }
    
  }
  }
  CommomListModalStatus(event) {
    if (event == true) {
    }
    else {
      if (event.modeltype == 4) {
        this.activitydetails.Phone = this.activitydetails.Phone == "null" ? "" : event.Phone;
        this.activitydetails.Email = this.activitydetails.Email == "null" ? "" : event.Email;
        this.activitydetails.PhoneExt = this.activitydetails.PhoneExt == "null" ? "" : event.PhoneExt;
        this.activitydetails.ContactName = event.OpporName;
        this.activitydetails.ActOpportunityID = event.opporID;
        this.activitydetails.AccountID = event.opporID;
        this.activitydetails.OpporContactName = this.activitydetails.OpporContactName == "null" ? "" : event.OpporContactName;
        this.activitydetails.ActContactID = event.ContactID;
        this.activitydetails.AccountName = this.activitydetails.AccountName == "null" ? "" : event.CompanyName;
        this.activitydetails.ActCompanyID = event.CompanyID;
      }
      else if (event.modeltype == 1) {
        this.activitydetails.ContactName = "";
        this.activitydetails.ActCompanyID = "";
        this.activitydetails.AccountName = "";
        this.activitydetails.Phone = "";
        this.activitydetails.Email = "";
        this.activitydetails.PhoneExt = "";
        if (event.ContactID != "null") {
          this.activitydetails.ContactId = event.ContactID;
          this.activitydetails.ActContactID = event.ContactID;
        }
        if (event.LeadFullName != "null") {
          this.activitydetails.ContactName = event.LeadFullName;
        }
        if (event.CompanyName != "null") {
          this.activitydetails.AccountName = event.CompanyName;
        }
        if (event.CompanyID != "null") {
          this.activitydetails.ActCompanyID = event.CompanyID;
        }
        if (event.Phone != "null") {
          this.activitydetails.Phone = event.Phone;
        }
        if (event.Email != "null") {
          this.activitydetails.Email = event.Email;
        }
        if (event.PhoneExt != "null") {
          this.activitydetails.PhoneExt = event.PhoneExt;
        }
      }
      else if (event.modeltype == 2) {
        if (event.CompanyID == null) {
          this.commonService.GetCompanyIdbyCompanyName(event.ContactCompanyName).subscribe(res => {
            this.activitydetails.ActCompanyID = res;
            this.activitydetails.Phone = event.Phone == "null" ? "" : event.Phone;
            this.activitydetails.Email = event.Email == "null" ? "" : event.Email;
            this.activitydetails.AccountName = event.ContactCompanyName == "null" || event.ContactCompanyName == "NoCompany" || event.ContactCompanyName == "No Company" ? "" : event.ContactCompanyName;
            this.activitydetails.ContactId = event.ContactID;
            this.activitydetails.ActContactID = event.ContactID;
            this.activitydetails.PhoneExt = event.PhoneExt == "null" ? "" : event.PhoneExt;
            this.activitydetails.ContactName = event.ContactName;
          });
        }
        else {
          this.activitydetails.ActCompanyID = event.CompanyID;
          this.activitydetails.Phone = event.Phone == "null" ? "" : event.Phone;
          this.activitydetails.Email = event.Email == "null" ? "" : event.Email;
          this.activitydetails.AccountName = event.ContactCompanyName == "null" || event.ContactCompanyName == "NoCompany" || event.ContactCompanyName == "No Company" ? "" : event.ContactCompanyName;
          this.activitydetails.ContactId = event.ContactID;
          this.activitydetails.ActContactID = event.ContactID;
          this.activitydetails.PhoneExt = event.PhoneExt == "null" ? "" : event.PhoneExt;
          this.activitydetails.ContactName = event.ContactName;
        }
      }
    }
    this.ShowCommomListModel = false;
  }

  commomlistmodalstatus(event) {
     // this.activitydetails.ContactName = event.LeadFullName,
     // this.activitydetails.AccountName = event.CompanyName
     // this.activitydetails.Phone = event.Phone,
     // this.activitydetails.PhoneExt = event.PhoneExt,
     //  this.activitydetails.Email = event.Email,
     // this.activitydetails.ActContactID = event.ContactID,
      //this.activitydetails.ContactId = event.ContactID,
      this.activitydetails.ContactName = "";
      this.activitydetails.ActCompanyID = "";
      this.activitydetails.AccountName = "";
      this.activitydetails.Phone = "";
      this.activitydetails.Email = "";
      this.activitydetails.PhoneExt = "";
      if (event.ContactID != "null") {
        this.activitydetails.ContactId = event.ContactID;
        this.activitydetails.ActContactID = event.ContactID;
      }
      if (event.LeadFullName != "null") {
        this.activitydetails.ContactName = event.LeadFullName;
      }
      if (event.CompanyName != "null") {
        this.activitydetails.AccountName = event.CompanyName;
      }
      if (event.CompanyID != "null") {
        this.activitydetails.ActCompanyID = event.CompanyID;
      }
      if (event.Phone != "null") {
        this.activitydetails.Phone = event.Phone;
      }
      if (event.Email != "null") {
        this.activitydetails.Email = event.Email;
      }
      if (event.PhoneExt != "null") {
        this.activitydetails.PhoneExt = event.PhoneExt;
      }
      this.ShowCommomListModel = false
  }
  companylistmodalstatus(event) {
      this.activitydetails.AccountName = event.CompanyName,
      this.activitydetails.Phone = event.Phone
      this.activitydetails.PhoneExt = event.PhoneExt
      this.activitydetails.Email = event.Email
      this.activitydetails.ActContactID = event.ContactID,
      this.activitydetails.ContactId = event.ContactID
      this.activitydetails.AccountTypeName = 'Companies'
      this.activitydetails.ActCompanyID = event.CompanyID
      this.ShowCompanyListModal= false
  }
  Contactlistmodalstatus(event) {
      this.activitydetails.ContactName = event.ContactName
      this.activitydetails.AccountName = event.ContactCompanyName,
      this.activitydetails.Phone = event.Phone,
      this.activitydetails.PhoneExt = event.PhoneExt,
      this.activitydetails.Email = event.Email,
      this.activitydetails.ActContactID = event.ContactID,
      this.activitydetails.ContactId = event.ContactID,
      this.ShowContactListModal = false
  }
  opperlistmodalstatus(event) {
      this.activitydetails.ContactName = event.OpporName,
      this.activitydetails.OpporContactName = event.OpporContactName,
      this.activitydetails.AccountName = event.CompanyName,
      this.activitydetails.Phone = event.Phone,
      this.activitydetails.PhoneExt = event.PhoneExt,
      this.activitydetails.Email = event.Email,
      this.activitydetails.AccountID = event.opporID,
      this.activitydetails.ActOpportunityID = event.opporID
      this.ShowOpperListModal = false
  }
  usersstatus(event) {
    this.activitydetails.OwnerName = event.FullName
    this.activitydetails.OwnerID = event.UserId
    this.showSearchUsersmodal = false
  }
  saveStatus() {
    this.showSearchUsersmodal = false;
    this.ShowCompanyListModal = false;
    this.ShowContactListModal = false;
    this.ShowCommomListModel  = false
    this.ShowOpperListModal   = false
    this.ShowCompanyContactListModal = false
  }
}
