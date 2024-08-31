import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { de } from 'date-fns/locale';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AttachmentDomainModel } from 'src/app/models/AttachmentViewModel';
import { ActivityViewModel, AllNoteViewModel } from 'src/app/models/IActivityViewModel';
import { AccountListDomainModel } from 'src/app/models/ILeadsDetailsDomainModel';
import { NotesListViewModel } from 'src/app/models/INotesModel';
import { ActivityService } from 'src/app/services/activity.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactService } from 'src/app/services/contact.service';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-viewactivity',
    templateUrl: './viewactivity.component.html',
    styleUrls: ['./viewactivity.component.scss'],
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
export class ViewactivityComponent implements OnInit {
    public maskDateAuto = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    public maskDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');
    registerForm: FormGroup;
    submitted = false;
    activitydetails: ActivityViewModel = new ActivityViewModel();
    ActivityID: any;
    AccountType: any;
    ModuleId: any;
    accountType: string;
    disabledata: boolean = false;
    editabledata: boolean = false;
    showviewdetails: boolean = false;
    showeditdetails: boolean = true;
    updatetext: string;
    Module: any;
    BackMode: any;
    ActivityAccountId: any;
    ActivityCompanyId: any;
    ModuleName: any;
    myFiles: string[] = [];
    showsentMail: boolean = false;
    showNote: boolean = false;
    showAttachment: boolean = false;
    modulename: any;
    TabData: any = {};
    Tab: any;
    ViewBackMId: any;
    ViewBackName: string;
    maildetails: AccountListDomainModel;
    ShowEmail: boolean = false;
    deletedids: any = [];
    showSearchUsersmodal: boolean = false;
    ShowCompanyListModal: boolean = false;
    ShowContactListModal: boolean = false;
    ShowCommomListModel: boolean = false;
    ShowOpperListModal: boolean = false;
    ShowCompanyContactlist:boolean=false
    selectedtab = 'tab-Activity';
    @ViewChild('nav', { static: true }) nav: NgbNav;
    constructor(
        private toastr: ToastrManager,
        private spinner: NgxSpinnerService,
        private companyservice: CompanyService,
        private router: Router,
        private activityService: ActivityService,
        private route: ActivatedRoute,
        private commonService: CommonService,
        private contactservice: ContactService,
        private fb: FormBuilder
    ) {
        this.activitydetails.ListAccounttype;
        this.activitydetails.TypeList;
        this.activitydetails.StatusList;
        this.activitydetails.ListPriority;
        this.activitydetails.ActiLstNotes;
        this.route.paramMap.subscribe((params) => {
            this.ActivityID = params.get('Id');
            this.ModuleId = params.get('ModuleId');
            this.AccountType = params.get('AccountType');
            this.ViewBackMId = params.get('VMId');
            this.ViewBackName = params.get('VMName');
            this.activitydetails.AccountTypeID = this.ModuleId;
            // if(this.activitydetails.AccountTypeID == 1)
            // { this.accountType = "Create Lead Activity"; }
            // else if(this.activitydetails.backofscheduler != null)
            // { this.accountType = "Create Scheduler Activity"; }
            // else if(this.activitydetails.AccountTypeID == 2)
            // { this.accountType = "Create Contact Activity"; }
            // else if(this.activitydetails.AccountTypeID == 3)
            // { this.accountType = "Create Company Activity"; }
            // else if(this.activitydetails.AccountTypeID == 4)
            // { this.accountType = "Create Opportunities Activity"; }
        });
    }

    ngOnInit() {
        

        this.registerForm = this.fb.group({
            accounttypeid: new FormControl('', Validators.required),
            subject: new FormControl('', Validators.required),
            ownerName: new FormControl('', Validators.required),
            activitytypeid: new FormControl(),
            priorityid: new FormControl(''),
            statusid: new FormControl(''),
            duedate: new FormControl('', Validators.required),
            deminddate: new FormControl(''),
            companyName: new FormControl('', Validators.required),
            contactname: new FormControl('', Validators.required),
            phone: new FormControl(''),
            phoneExt: new FormControl(''),
            email: new FormControl('', Validators.email),
            attachment: new FormControl(''),
            description: new FormControl(''),
            sendnotice: new FormControl(''),
            opporcontactName: new FormControl(''),
        });
        this.disabledata = true;
        this.editabledata = true;
        this.showeditdetails = false;
        this.showviewdetails = true;
        if (this.ModuleId == null) this.ModuleId = 6;
        switch (this.ModuleId) {
            case 1:
                this.updatetext = 'Lead';
                break;
            case 2:
                this.updatetext = 'Contact';
                break;
            case 3:
                this.updatetext = 'Company ';
                break;
            case 4:
                this.updatetext = 'Opportunity';
                break;
            case 6:
                this.updatetext = 'Company ';
                break;
        }
        this.GetActivitydetails(this.ActivityID, this.ModuleId);
    }
    ChangeModuleType(event)
  {
    ;
    switch (event) {
      case "1":
       this.activitydetails.AccountTypeID = 1;
        break;
      case "2":
       this.activitydetails.AccountTypeID = 2
        break;
      case "3":
       this.activitydetails.AccountTypeID = 3;
        break;
      case "4":
       this.activitydetails.AccountTypeID = 4;
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
    GetActivitydetails(ActivityID, ModuleId) {
        this.contactservice.GetActivityDetails(ActivityID, ModuleId).subscribe((res: any) => {
            this.activitydetails = res;
            this.activitydetails.TypeList = res['TypeList'];
            this.activitydetails.StatusList = res['StatusList'];
            this.activitydetails.ListPriority = res['ListPriority'];
            this.activitydetails.ListAccounttype = res['ListAccounttype'];
            if (this.activitydetails.AccountName == 'NoCompany' || this.activitydetails.AccountName == 'No Company')
                this.activitydetails.AccountName = '';
            if (this.Module != '') {
                // To Get according Module  details
                if (this.ModuleId == 1 || this.ModuleId == 2) {
                    if (this.Module == 'Schedular') {
                        this.BackMode = 'Schedular';
                    } else if (this.Module == 'notifications') {
                        this.activitydetails.backofnotifications = 'backofnotifications';
                    } else {
                        this.ActivityAccountId = this.activitydetails.ContactId;
                    }
                } else if (this.ModuleId == 3) {
                    if (this.Module == 'Schedular') {
                        this.BackMode = 'Schedular';
                    } else if (this.Module == 'notifications') {
                        this.activitydetails.backofnotifications = 'backofnotifications';
                    } else {
                        this.ActivityCompanyId = this.activitydetails.ActCompanyID;
                    }
                } else if (this.ModuleId == 4) {
                    if (this.Module == 'Schedular') {
                        this.BackMode = 'Schedular';
                    } else if (this.Module == 'notifications') {
                        this.activitydetails.backofnotifications = 'backofnotifications';
                    } else this.ActivityAccountId = this.activitydetails.ActOpportunityID;
                } else if (this.ModuleId == 6) {
                    this.ModuleName = 'ConvertedLead';
                    if (this.Module == 'OpportunityHistory') {
                        this.BackMode = 'Opportunity';
                        this.ActivityAccountId = this.activitydetails.ActOpportunityID;
                    }

                    if (this.Module == 'CompanyHistory') {
                        this.BackMode = 'Company';
                        this.ActivityCompanyId = this.activitydetails.ActCompanyID;
                    }

                    if (this.Module == 'ContactHistory') {
                        this.BackMode = 'Contact';
                        this.ActivityAccountId = this.activitydetails.ContactId;
                    }
                    if (this.Module == 'Schedular') {
                        this.BackMode = 'Schedular';
                    }
                    if (this.Module == 'notifications') {
                        this.activitydetails.backofnotifications = 'backofnotifications';
                    }
                }
            } else {
                if (this.AccountType == null) this.activitydetails.backofnotifications = 'backofnotifications';
            }
            if (this.AccountType == 'notifications') this.activitydetails.backofnotifications = 'backofnotifications';
            this.activitydetails.accounttypenamecheck = this.AccountType;
        });
    }
    get f() {
        return this.registerForm.controls;
    }

    onPhoneChange(ele, type) {
        var value = ele.target.value.replace(/[^a-zA-Z 0-9]+/g, '').trim();
        if (value.length < 10 || value.length > 10) {
            if (type == 'phone') {
                this.activitydetails.Phone = '';
            }
        }
    }
    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    private GetAttachments(attContactId, Modules, pageindex, pagesize, orderbyclause, totalpagecount) {
        this.companyservice
            .GetAttachmentsList(attContactId, Modules, pageindex, pagesize, orderbyclause, totalpagecount)
            .subscribe((res) => {
                this.TabData = res;
                this.modulename = Modules;
                this.showAttachment = true;

                this.showNote = false;
                this.spinner.hide();
            }),
            (err: AppError) => {
                this.spinner.hide();
                if (err instanceof NotFoundError) {
                    window.alert('404 Error Occured!');
                } else {
                    window.alert('An unexpected Error Occured!');
                }
            };
    }
    SendemailNotification(event) {
        if (event) {
            this.activitydetails.Sendnotice = true;
        } else {
            this.activitydetails.Sendnotice = false;
        }
    }
    private GetNotes(
        notecompanyid: any,
        modules: number,
        pageindex: number,
        pagesize: number,
        orderbyclause: string,
        totalpagecount: number
    ) {
        this.companyservice
            .GetNoteList(notecompanyid, 0, pageindex, pagesize, orderbyclause, totalpagecount)
            .subscribe((res: AllNoteViewModel[]) => {
                this.showNote = true;
                this.showAttachment = false;
                var mds = new NotesListViewModel();
                mds.ActivityID = +notecompanyid;
                mds.ContactID = +notecompanyid;
                mds.ContactTypeID = modules;
                //  mds.ID = notecompanyid;
                mds.ContactTypeID = modules;
                mds.ModuleName = 'Activities';
                mds.noteslist = res;
                this.TabData = mds;
                this.spinner.hide();
            }),
            (err: AppError) => {
                this.spinner.hide();
                if (err instanceof NotFoundError) {
                    window.alert('404 Error Occured!');
                } else {
                    window.alert('An unexpected Error Occured!');
                }
            };
    }
    EditActivityDetails() {
        this.editabledata = false;
        this.showeditdetails = true;
        this.showviewdetails = false;
    }
    updateDate(event) {
        return event;
    }
    updateDateremain(event) {
        return event;
    }
    fetchTabData(type: any) {
        if (type == 'note') {
            this.spinner.show();
            var notecompanyid = this.ActivityID;
            var module = this.ModuleId;
            var pageindex = 0;
            var pagesize = 10;
            var orderbyclause = 'NotesId desc';
            var totalpagecount = 0;
            this.GetNotes(notecompanyid, module, pageindex, pagesize, orderbyclause, totalpagecount);
        } else if (type == 'attachment') {
            this.spinner.show();
            var attContactId = this.ActivityID;
            var Module = this.AccountType;
            var pageindex = 0;
            var pagesize = 10;
            var orderbyclause = 'AttachmentID asc';
            var totalpagecount = 0;
            this.GetAttachments(attContactId, Module, pageindex, pagesize, orderbyclause, totalpagecount);
        }
    }

    LoadNotes($event) {
        this.showNote = false;
        this.GetNotes($event.notecompanyid, $event.module, $event.pageindex, $event.pagesize, $event.orderbyclause, $event.totalpagecount);
    }
    LoadAttachments($event) {
        this.showAttachment = false;
        this.GetAttachments(
            $event.attContactId,
            $event.Module,
            $event.pageindex,
            $event.pagesize,
            $event.orderbyclause,
            $event.totalpagecount
        );
    }

    CreateNewActivity(status) {
        this.submitted = true;
        if (this.registerForm.valid) {
            this.showsentMail = true;
            if (this.activitydetails.AccountTypeID == 6) {
                this.activitydetails.AccountID = this.activitydetails.ContactId;
                this.activitydetails.modulename = 'Activity';
            }
            if (this.activitydetails.AccountTypeID == 1 || this.activitydetails.AccountTypeID == 2) {
            } else if (this.activitydetails.AccountTypeID == 4) {
            } else if (this.activitydetails.AccountTypeID == 3) {
            }
            let activityID;
            this.activityService.InsertActivityDetails(this.activitydetails).subscribe((result) => {
                activityID = result;
                const formData = new FormData();
                for (var i = 0; i < this.myFiles.length; i++) {
                    formData.append('files', this.myFiles[i]);
                }
                if (this.myFiles.length > 0) {
                    formData.append('uesrid', localStorage.getItem('Userid'));
                    formData.append('username', localStorage.getItem('UserName'));
                    formData.append('module', 'Activities');
                    formData.append('accountId', activityID);
                    this.contactservice.PostAttachment(formData).subscribe(() => {});
                }
                if (this.activitydetails.Sendnotice == true) {
                    let ModuleId: number = this.activitydetails.AccountTypeID;
                    this.contactservice.sendEmail(ModuleId, activityID).subscribe(() => {});
                }
                this.toastr.successToastr('Company Details Updated Successfully.', 'success');
                if (status == 'savenew') {
                    let Id = 0,
                        ModuleId = '3',
                        ModuleName = 'Activities';
                    this.router.navigate(['CRM/activities/activityaddnew/', Id, { MId: ModuleId, MName: ModuleName }]).then(
                        (nav) => {
                            console.log(nav);
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
                } else {
                    this.disabledata = true;
                    this.editabledata = true;
                    this.showeditdetails = false;
                    this.showviewdetails = true;
                    this.GetActivitydetails(activityID, this.ModuleId);
                }
            });
        } else {
            return;
        }
    }

    TabClickEvent($event) {
        if ($event === 'tab-Attachments') {
           this.selectedtab=$event
            this.fetchTabData('attachment');
        } else if ($event === 'tab-Notes') {
          this.selectedtab=$event
            this.fetchTabData('note');
        }else{
          this.selectedtab='tab-Activity'
        }
    }
    NavigateBacktoScheduler() {
        this.Tab = 'tab-scheduler';
        this.router.navigate(['/DashBoard/DashboardIndex'], { queryParams: { back: 'scheduler' } }).then(
            (nav) => {
                console.log(nav); // true if navigation is successful
            },
            (err) => {
                console.log(err); // when there's an error
            }
        );
    }

    NavigateBackActivitieslist() {
        if (this.ViewBackName == 'Leads') {
            this.router.navigate(['CRM/leads/viewleads/', this.ViewBackMId, { vname: 'Leads', tname: 'Leads' }]).then(
                (nav) => {
                    console.log(nav);
                },
                (err) => {
                    console.log(err);
                }
            );
        }
        if (this.ViewBackName == 'Contacts') {
            this.router.navigate(['CRM/contacts/contactview/', this.ViewBackMId, { vname: 'Contacts', tname: 'Contacts' }]).then(
                (nav) => {
                    console.log(nav);
                },
                (err) => {
                    console.log(err);
                }
            );
        } else if (this.ViewBackName == 'Companies') {
            this.router.navigate(['CRM/leads/viewleads/', this.ViewBackMId, { vname: 'Companies', tname: 'Companies' }]).then(
                (nav) => {
                    console.log(nav);
                },
                (err) => {
                    console.log(err);
                }
            );
        } else if (this.ViewBackName == 'Opportunities') {
            this.router
                .navigate(['CRM/opportunities/viewopportunity/', this.ViewBackMId, { vname: 'Opportunities', tname: 'Opportunities' }])
                .then(
                    (nav) => {
                        console.log(nav);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
        } else {
            return this.router.navigate(['CRM/activities']).then(
                (nav) => {
                    console.log(nav); // true if navigation is successful
                },
                (err) => {
                    console.log(err); // when there's an error
                }
            );
        }
    }
    ActivityEmail() {
        this.ShowEmail = true;
        this.commonService.GetAccountDetailsByID(this.ActivityID).subscribe((res: AccountListDomainModel) => {
            this.maildetails = res;

        });
    }
    OutPutStatus(value) {
        this.ShowEmail = false;
    }
    CloneActivitiesDetails() {
        let ModuleName = 'Activities';
        this.router
            .navigate([
                'CRM/activities/activityaddnew/',
                this.ActivityID,
                { MId: this.ModuleId, MName: ModuleName, ActivityClone: 'clone' }
            ])
            .then(
                (nav) => {
                    console.log(nav);
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    DeleteRecord(ActivityId, functionstatus) {
        Swal.fire({
            title: 'Are you sure you want to ' + functionstatus + ' this record?',
            text: 'You are about to delete permanently!',
            backdrop: false,
            imageUrl: '',
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: '#ef4d4d',
            confirmButtonColor: '#448aff'
        }).then((result) => {
            if (result.value) {
                this.deletedids.push(ActivityId);
                if (functionstatus == 'Complete') {
                    this.activityService.ActivityComplete(this.deletedids).subscribe((res) => {
                        if (res) {
                            Swal.fire('' + functionstatus + '!', 'Your Record has been ' + functionstatus + '.', 'success').then(
                                (result) => {
                                    this.router.navigate(['CRM/activities/']).then(
                                        (nav) => {
                                            console.log(nav);
                                        },
                                        (err) => {
                                            console.log(err);
                                        }
                                    );
                                }
                            );
                        }
                    });
                } else {
                    this.activityService.deleteActivityById(this.deletedids).subscribe((res) => {
                        if (res) {
                            Swal.fire('' + functionstatus + '!', 'Your Record has been ' + functionstatus + '.', 'success').then(
                                (result) => {
                                    this.router.navigate(['CRM/activities/']).then(
                                        (nav) => {
                                            console.log(nav);
                                        },
                                        (err) => {
                                            console.log(err);
                                        }
                                    );
                                }
                            );
                        }
                    });
                }
            }
        });
    }
    GetSearchUserListModal() {
        this.showSearchUsersmodal = true;
    }
    
   
    GetSearchCompanyListModal() {
        this.ShowCompanyListModal = true;
    }
    GetSearchContactListModal() {
        this.ShowCompanyContactlist = false;
        if (this.activitydetails.ActCompanyID && this.activitydetails.ActCompanyID != '0' && this.activitydetails.ActCompanyID != undefined) {
            this.ShowCompanyContactlist = true;
        } else {
            this.toastr.errorToastr('Please Select Company !', 'error!');
        }
    }
    companyliststatus(event) {
        this.activitydetails.AccountName = event.CompanyName;
        this.activitydetails.ActCompanyID = event.CompanyID;
        this.activitydetails.ContactName = '';
        this.activitydetails.Phone = '';
        this.activitydetails.Email = '';
        this.ShowCompanyListModal = false;
    }
   

    GetCommonListModal(type,event) {
        if(event.clientX != 0 && event.clientY != 0 )
        {
        if (type == "4") {
        
          this.ShowOpperListModal = true;
        }
        else if (type == "1") {
          
          this.ShowCommomListModel = true;
        }
        else if (type == "2") {
          
          this.ShowContactListModal = true;
        }
      }
    }
    usersStatus(event) {
        this.activitydetails.OwnerName = event.FullName;
        this.activitydetails.OwnerID    = event.UserId;
        this.showSearchUsersmodal = false;
        this.ShowCompanyListModal = false;
        this.ShowContactListModal = false;
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
    opperlistmodalstatus(event) {        this.activitydetails.ContactName = event.OpporName,
        this.activitydetails.OpporContactName = event.OpporContactName,
        this.activitydetails.AccountName = event.CompanyName,
        this.activitydetails.Phone = event.Phone,
        this.activitydetails.PhoneExt = event.PhoneExt,
        this.activitydetails.Email = event.Email,
        this.activitydetails.AccountID = event.opporID,
        this.activitydetails.ActOpportunityID = event.opporID
        this.ShowOpperListModal = false
    }
    activitydetailsStatus(event) {
        if (event.Phone != 'null') {
            this.activitydetails.Phone = event.Phone;
        } else {
            this.activitydetails.Phone;
        }
        if (event.Email != 'null') {
            this.activitydetails.Email = event.Email;
        } else {
            this.activitydetails.Email = '';
        }
        if (event.PhoneExt != 'null') {
            this.activitydetails.PhoneExt = event.PhoneExt;
        } else {
            this.activitydetails.PhoneExt = '';
        }
        //  this.activitydetails.ContactId    =  event.ID;
        //this.activitydetails.ActContactID = event.ID;
        this.activitydetails.ContactName = event.FirstName;
        this.showSearchUsersmodal = false;
        this.ShowCompanyListModal = false;
        this.ShowContactListModal = false;
        this.ShowCompanyContactlist=false
    }
    saveStatus() {
        this.showSearchUsersmodal = false;
        this.ShowCompanyListModal = false;
        this.ShowContactListModal = false;
        this.ShowCommomListModel = false;
        this.ShowOpperListModal = false;
        this.ShowCompanyContactlist=false
    }
    onComplete() {
        //console.log(this.activitydetails.ActivityID)
        let ActivityID = []
        ActivityID.push(this.activitydetails.ActivityID)
        let result = confirm(`Are you sure you want to Complete the Activity?`)
        if (result) {
          this.activityService.CompleteActivitybyIds(ActivityID).subscribe((response) => {
            if (response) {
            }
            this.GetActivitydetails(this.ActivityID, this.ModuleId);
          })
        }
    
      }
}
