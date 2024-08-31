import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { NotFoundError } from 'src/app/error/not-found-error';

import { ClaimsHelper } from 'src/app/login/claimshelper';

import { AccountListDomainModel } from 'src/app/models/ILeadsDetailsDomainModel';
import { AllNoteViewModel, NotesListViewModel } from 'src/app/models/INotesModel';

import { CommonService } from 'src/app/services/common.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactService } from 'src/app/services/contact.service';
import { CustomvalidatorsService } from 'src/app/validators/customvalidators.service';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-viewcontacts',
    templateUrl: './viewcontacts.component.html',
    styleUrls: ['./viewcontacts.component.scss'],
    animations: [
        trigger('fadeInOutTranslate', [
            transition(':enter', [style({ opacity: 0 }), animate('400ms ease-in-out', style({ opacity: 1 }))]),
            transition(':leave', [style({ transform: 'translate(0)' }), animate('400ms ease-in-out', style({ opacity: 0 }))])
        ])
    ]
})
export class ViewcontactsComponent implements OnInit {
    public place: any;
    public maskUsMobile = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    Urlvalidator = 'https?://.+';
    AccountTypeID: any;
    ContactId: any;
    disabledata: boolean = false;
    editabledata: boolean = false;
    showviewdetails: boolean = false;
    showeditdetails: boolean = true;
    showSearchUsersmodal: boolean = false;
    ShowCreateCompanyModal: boolean = false;
    ShowCompanyListModal: boolean = false;
    myForm: FormGroup;
    myFiles: string[] = [];
    token: any;
    EmailAPILink: string;
    EmailAPIKey: string;
    checkbox: boolean;
    decodedToken: any;
    contactdetailslist: any = {};
    origindata: any;
    destinationdata: any;
    geocoder: any;
    ListOfaddress;
    any;
    deletedids: any = [];
    CopyCompanyAddressCheck: boolean = false;
    showClonedetails: boolean = false;
    registerForm: FormGroup;
    submitted = false;
    showActivity = false;
    showNote = false;
    showAttachment: boolean = false;
    TabData: any = {};
    modulename: any;
    @ViewChild('tabs') tabs: any;
    ViewTab: string;
    maildetails: AccountListDomainModel;
    ShowEmail: boolean = false;
    selectedtab: any;
    MailName: string;
    constructor(
        private mapsApiLoader: MapsAPILoader,
        private spinner: NgxSpinnerService,
        private commonService: CommonService,
        private ngZone: NgZone,
        private companyservice: CompanyService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private contactservice: ContactService,
        public toastr: ToastrManager,
        private claimsHelper: ClaimsHelper
    ) {
        this.contactdetailslist.AccountObj = {};
        this.contactdetailslist.LeadSourceList = [{}];
        this.contactdetailslist.StateList = [{}];
        this.contactdetailslist.lstDepartment = [{}];
        this.contactdetailslist.lstContactType = [{}];
        this.contactdetailslist.CountryList = [{}];
        this.contactdetailslist.lstcustomVM = [{}];
    }
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.ContactId = +params.get('Id');
            this.ViewTab = params.get('tname');
            this.AccountTypeID = 2;
        });

        if (this.ViewTab == 'Activities') {
            this.selectedtab = 'tab-Activity';
        } else {
            this.selectedtab = 'tab-Contact';
        }
        this.TabClickEvent(this.selectedtab)
        this.disabledata = true;
        this.editabledata = true;
        this.showeditdetails = false;
        this.showviewdetails = true;
        this.registerForm = this.fb.group({
            ownership: new FormControl(''),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl(''),
            companyName: new FormControl(''),
            title: new FormControl(''),
            email: new FormControl('', [Validators.email]),
            phone: new FormControl(''),
            phoneExt: new FormControl(''),
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
            mailingzip: new FormControl('', CustomvalidatorsService.zipCodeValidator),
            mailingcountryid: new FormControl(''),
            copymailing: new FormControl(''),
            billingaddress: new FormControl(''),
            billingaddress2: new FormControl(''),
            billingcity: new FormControl(''),
            billingstateid: new FormControl(''),
            billingzip: new FormControl('', CustomvalidatorsService.zipCodeValidator),
            billingcountryid: new FormControl(''),
            facebookusername: new FormControl(''),
            twitterusername: new FormControl(''),
            linkedinusername: new FormControl(''),
            skypeusername: new FormControl(''),
            description: new FormControl(''),
            attachment: new FormControl('')
        });
        this.GetContactDetailsById(this.ContactId);
    }

    GetContactDetailsById(ContactID) {
        this.spinner.show();
        const accounttypeid = 2;
        this.contactservice.GetContactDetails(ContactID, accounttypeid).subscribe((res: any) => {
            this.spinner.hide();
            this.contactdetailslist = res;
            this.contactdetailslist.AccountObj.OwnerID = this.claimsHelper.GetUserIdAPIKeyFromClaims();
            this.contactdetailslist.AccountObj.Ownership = this.claimsHelper.GetUserNameAPIKeyFromClaims();
            this.contactdetailslist.AccountObj.AccountTypeId = 2;
            this.contactdetailslist.AccountObj = res['AccountObj'];
            this.contactdetailslist.CountryList = res['CountryList'];
            this.contactdetailslist.LeadSourceList = res['LeadSourceList'];
            this.contactdetailslist.LstNotes = res['LstNotes'];
            this.contactdetailslist.StageList = res['StageList'];
            this.contactdetailslist.StateList = res['StateList'];
            this.contactdetailslist.listCustomfields = res['listCustomfields'];
            this.contactdetailslist.lstContactType = res['lstContactType'];
            this.contactdetailslist.lstDepartment = res['lstDepartment'];
            this.contactdetailslist.lstcustomVM = res['lstcustomVM'];
            if (this.contactdetailslist.AccountObj.IsContactActive == true) {
                this.contactdetailslist.AccountObj.Activestatus = '1';
            } else {
                this.contactdetailslist.AccountObj.Activestatus = '0';
            }
            let firstname = this.contactdetailslist.AccountObj.LastName == null ? '' : this.contactdetailslist.AccountObj.LastName;
            this.MailName = this.contactdetailslist.AccountObj.FirstName + ' ' + firstname;
        });
    }

    ngAfterViewChecked(): void {
        if (this.tabs) {
            this.tabs.select(this.selectedtab);
        }
    }

    get f() {
        return this.registerForm.controls;
    }
    EditContactDetails() {
        this.editabledata = false;
        this.showeditdetails = true;
        this.showviewdetails = false;
    }
    public show: boolean = true;
    public removeDirection() {
        this.show = false;
    }
    public showDirection() {
        this.show = true;
    }
    CloneContactsDetails() {
        let ModuleId = '2',
            ModuleName = 'Contacts';
        this.router.navigate(['CRM/contacts/AddNew/', this.ContactId, { MId: ModuleId, MName: ModuleName }]).then(
            (nav) => {
                console.log(nav);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    onPhoneChange(ele, type) {
        var value = ele.target.value.replace(/[^a-zA-Z 0-9]+/g, '').trim();
        if (value.length < 10 || value.length > 10) {
            if (type == 'phone') {
                this.contactdetailslist.AccountObj.Phone = '';
            } else if (type == 'fax') {
                this.contactdetailslist.AccountObj.Fax = '';
            }
        }
    }
    NavigateAddContact() {
        let ModuleId = '2',
            ModuleName = 'Contacts';
        this.router.navigate(['CRM/contacts/AddNew/', 0, { MId: ModuleId, MName: ModuleName }]).then(
            (nav) => {
                console.log(nav);
            },
            (err) => {
                console.log(err);
            }
        );
    }
    DeleteRecord(Id) {
        Swal.fire({
            title: 'Are you sure you want to delete this record?',
            text: 'You are about to delete permanently!',
            backdrop: false,
            imageUrl: '',
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: '#ef4d4d',
            confirmButtonColor: '#448aff'
        }).then((result) => {
            if (result.value) {
                this.deletedids.push(Id);
                this.contactservice.DeleteAccountsById(this.deletedids).subscribe((res) => {
                    if (res) {
                        Swal.fire('Deleted!', 'Your Record has been deleted.', 'success').then((result) => {
                            return this.router.navigate(['CRM/contacts']).then(
                                (nav) => {
                                    console.log(nav); // true if navigation is successful
                                },
                                (err) => {
                                    console.log(err); // when there's an error
                                }
                            );
                        });
                    }
                });
            }
        });
    }

    GetSearchCompanyListModal() {
        this.ShowCompanyListModal = true;
    }
    GetCreateCompanyModal() {
        this.ShowCreateCompanyModal = true;
    }
    GetSearchUsersList() {
        this.showSearchUsersmodal = true;
    }
    companyliststatus(event) {
        this.contactdetailslist.AccountObj.CompanyID = event.CompanyID;
        this.contactdetailslist.AccountObj.CompanyName = event.CompanyName;
        this.ShowCompanyListModal = false;
    }

    SaveAndnew(savestatus) {
        let accountId;
        this.submitted = true;

        if (this.registerForm.valid) {
            this.contactservice.insertContactDetails(this.contactdetailslist).subscribe((result) => {
                accountId = result;
                const formData = new FormData();
                for (var i = 0; i < this.myFiles.length; i++) {
                    formData.append('files', this.myFiles[i]);
                }
                formData.append('uesrid', this.claimsHelper.GetUserIdAPIKeyFromClaims());
                formData.append('username', this.claimsHelper.GetUserNameAPIKeyFromClaims());
                formData.append('module', 'Contact');
                formData.append('accountId', accountId);
                formData.append('filetype', 'contact');
                this.contactservice.PostAttachment(formData).subscribe((res) => {});

                this.EmailAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
                this.EmailAPIKey = this.claimsHelper.GetEmailAPIKeyFromClaims();
                if (this.EmailAPIKey != '' && this.EmailAPILink != '') {
                    this.contactdetailslist.AccountObj.EmailAPIKey = this.EmailAPIKey;
                    this.contactdetailslist.AccountObj.EmailAPILink = this.EmailAPILink;
                    this.contactservice.InsertUpdateAPIContactIDs(this.contactdetailslist.AccountObj).subscribe((result) => {});
                }
                this.toastr.successToastr('Contact Details Updated Successfully.', 'success');
                if (savestatus == 'savenew') {
                    let Id = 0,
                        ModuleId = '3',
                        ModuleName = 'Companies';
                    this.router.navigate(['CRM/companies/addnewcompany/', Id, { MId: ModuleId, MName: ModuleName }]).then(
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
                    this.GetContactDetailsById(this.ContactId);
                }
            });
        } else {
            return;
        }
    }
    NavigateActivitiesList() {
        this.router.navigate(['CRM/activities/']).then(
            (nav) => {
                console.log(nav); // true if navigation is successful
            },
            (err) => {
                console.log(err); // when there's an error
            }
        );
    }
    onChange(FieldId, DrpValueId, isChecked) {
        // const modelFormArray = <FormArray>this.myForm.controls.modeldata;
        for (let fileditems of this.contactdetailslist['lstcustomVM'].filter((item) => item.FieldId == +FieldId)[0].lstCustomOptionsVal) {
            if (fileditems.DrpValueId == DrpValueId) {
                this.contactdetailslist['lstcustomVM']
                    .filter((item) => item.FieldId == +FieldId)[0]
                    .lstCustomOptionsVal.filter((item1) => item1.DrpValueId == +DrpValueId)[0].IsDefault = true;
                this.contactdetailslist['lstcustomVM'].filter((item) => item.FieldId == +FieldId)[0].DefaultValue = DrpValueId;
            } else {
                this.contactdetailslist['lstcustomVM']
                    .filter((item) => item.FieldId == +FieldId)[0]
                    .lstCustomOptionsVal.filter((item1) => item1.DrpValueId == +fileditems.DrpValueId)[0].IsDefault = false;
            }
        }
        // if (isChecked)
        // {
        //   // modelFormArray.push(new FormControl(item));
        //   this.contactdetailslist["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault=true;
        // }
        // else
        // {
        //   // let index = DrpValueIdFormArrayName.controls.findIndex(x => x.value == DrpValueId);
        //   // FieldIdFormArray.removeAt(index);
        //   // DrpValueIdFormArrayName.removeAt(index);
        //   // DrpValueFormArrayName.removeAt(index);
        //   // IsDefaultFormArrayName.removeAt(index);
        //   this.contactdetailslist["listCustomfields"].filter(item => item.FieldId == + FieldId)[0].lstCustomOptions.filter(item1 => item1.DrpValueId == + DrpValueId)[0].IsDefault=false;
        // }
    }

    onChangeCheckBox(FieldId, DrpValueId, isChecked) {
        if (isChecked) {
            this.contactdetailslist['lstcustomVM']
                .filter((item) => item.FieldId == +FieldId)[0]
                .lstCustomOptionsVal.filter((item1) => item1.DrpValueId == +DrpValueId)[0].IsDefault = true;
        } else {
            this.contactdetailslist['lstcustomVM']
                .filter((item) => item.FieldId == +FieldId)[0]
                .lstCustomOptionsVal.filter((item1) => item1.DrpValueId == +DrpValueId)[0].IsDefault = false;
        }
    }
    saveStatus() {
        this.showSearchUsersmodal = false;
        this.ShowCreateCompanyModal = false;
        this.ShowCompanyListModal = false;
    }
    usersStatus(event) {
        this.contactdetailslist.AccountObj.OwnerID = event.UserId;
        this.contactdetailslist.AccountObj.Ownership = event.FullName;
        this.showSearchUsersmodal = false;
    }
    CompanyStatus(event) {
        debugger;
        if (event != '') {
             this.contactdetailslist.AccountObj.CompanyID = event.CompanyID;
            this.contactdetailslist.AccountObj.CompanyName = event.CompanyName;
        }
        this.ShowCreateCompanyModal = false;
        this.showSearchUsersmodal = false;
        this.ShowCompanyListModal = false;
        this.ShowEmail = false;
    }

    onChangeCopyMailing(event) {
        if (event == true) {
            this.contactdetailslist.AccountObj.BillingAddress = this.contactdetailslist.AccountObj.MailingAddress;
            this.contactdetailslist.AccountObj.BillingAddress2 = this.contactdetailslist.AccountObj.MailingAddress2;
            this.contactdetailslist.AccountObj.Billingcity = this.contactdetailslist.AccountObj.Mailingcity;
            this.contactdetailslist.AccountObj.BillingstateID = this.contactdetailslist.AccountObj.MailingstateID;
            this.contactdetailslist.AccountObj.Billingzip = this.contactdetailslist.AccountObj.Mailingzip;
            this.contactdetailslist.AccountObj.BillingcountryID = this.contactdetailslist.AccountObj.MailingcountryID;
        } else {
            this.contactdetailslist.AccountObj.BillingAddress = '';
            this.contactdetailslist.AccountObj.BillingAddress2 = '';
            this.contactdetailslist.AccountObj.Billingcity = '';
            this.contactdetailslist.AccountObj.BillingstateID = 0;
            this.contactdetailslist.AccountObj.Billingzip = '';
            this.contactdetailslist.AccountObj.BillingcountryID = 0;
        }
    }
    onChangeCopyCompanyAddress(event) {
        if (event == true) {
            let CompanyID = this.contactdetailslist.AccountObj.CompanyID;
            if (CompanyID == null || CompanyID == 0 || CompanyID == undefined) {
                this.CopyCompanyAddressCheck = false;
                this.toastr.errorToastr('Please Select Company', 'error!');
            } else {
                this.contactservice.GetCompanyDetailsforMaillingAddress(CompanyID).subscribe((res) => {
                    if (res['CompanyObj'].CompanyObj.MailingAddress != null)
                        res['CompanyObj'].CompanyObj.MailingAddress = res['CompanyObj'].CompanyObj.MailingAddress;
                    else res['CompanyObj'].CompanyObj.MailingAddress = ' ';

                    if (res['CompanyObj'].CompanyObj.Shippingstreet != null)
                        res['CompanyObj'].CompanyObj.Shippingstreet = res['CompanyObj'].CompanyObj.Shippingstreet;
                    else res['CompanyObj'].CompanyObj.Shippingstreet = ' ';

                    if (res['CompanyObj'].CompanyObj.Shippingcity != null)
                        res['CompanyObj'].CompanyObj.Shippingcity = res['CompanyObj'].CompanyObj.Shippingcity;
                    else res['CompanyObj'].CompanyObj.Shippingcity = ' ';

                    if (res['CompanyObj'].CompanyObj.MailingStateText != null)
                        res['CompanyObj'].CompanyObj.MailingStateText = res['CompanyObj'].CompanyObj.MailingStateText;
                    else res['CompanyObj'].CompanyObj.MailingStateText = ' ';

                    if (res['CompanyObj'].CompanyObj.MailingCountryText != null)
                        res['CompanyObj'].CompanyObj.MailingCountryText = res['CompanyObj'].CompanyObj.MailingCountryText;
                    else res['CompanyObj'].CompanyObj.MailingCountryText = ' ';

                    if (res['CompanyObj'].CompanyObj.Shippingzip != null)
                        res['CompanyObj'].CompanyObj.Shippingzip = res['CompanyObj'].CompanyObj.Shippingzip;
                    else res['CompanyObj'].CompanyObj.Shippingzip = ' ';

                    // ObjCompany.BillingFullAddress = ObjCompany.BillingAddress + ObjCompany.Billingstreet + ObjCompany.Billingcity + ObjCompany.BillingStateText + ObjCompany.BillingCountryText + ObjCompany.Billingzip;
                    if (res['CompanyObj'].BillingAddress != null) res['CompanyObj'].BillingAddress = res['CompanyObj'].BillingAddress;
                    else res['CompanyObj'].BillingAddress = ' ';

                    if (res['CompanyObj'].Billingstreet != null) res['CompanyObj'].Billingstreet = res['CompanyObj'].Billingstreet;
                    else res['CompanyObj'].Billingstreet = ' ';

                    if (res['CompanyObj'].Billingcity != null) res['CompanyObj'].Billingcity = res['CompanyObj'].Billingcity;
                    else res['CompanyObj'].Billingcity = ' ';

                    if (res['CompanyObj'].BillingStateText != null) res['CompanyObj'].BillingStateText = res['CompanyObj'].BillingStateText;
                    else res['CompanyObj'].BillingStateText = ' ';

                    if (res['CompanyObj'].BillingCountryText != null)
                        res['CompanyObj'].BillingCountryText = res['CompanyObj'].BillingCountryText;
                    else res['CompanyObj'].BillingCountryText = ' ';

                    if (res['CompanyObj'].Billingzip != null) res['CompanyObj'].Billingzip = res['CompanyObj'].Billingzip;
                    else res['CompanyObj'].Billingzip = ' ';
                    this.contactdetailslist.AccountObj.MailingAddress = res['CompanyObj'].CompanyObj.MailingAddress;
                    this.contactdetailslist.AccountObj.MailingAddress2 = res['CompanyObj'].CompanyObj.Shippingstreet;
                    this.contactdetailslist.AccountObj.Mailingcity = res['CompanyObj'].CompanyObj.Shippingcity;
                    this.contactdetailslist.AccountObj.MailingstateID = res['CompanyObj'].CompanyObj.ShippingstateID;
                    this.contactdetailslist.AccountObj.Mailingzip = res['CompanyObj'].CompanyObj.Shippingzip;
                    this.contactdetailslist.AccountObj.MailingcountryID = res['CompanyObj'].CompanyObj.ShippingcountryID;
                });
            }
        } else {
            this.contactdetailslist.AccountObj.MailingAddress = '';
            this.contactdetailslist.AccountObj.MailingAddress2 = '';
            this.contactdetailslist.AccountObj.Mailingcity = '';
            this.contactdetailslist.AccountObj.MailingstateID = 0;
            this.contactdetailslist.AccountObj.Mailingzip = '';
            this.contactdetailslist.AccountObj.MailingcountryID = 0;
        }
    }

    NavigateBackContactslist() {
        this.router.navigate(['CRM/contacts/']).then(
            (nav) => {
                console.log(nav); // true if navigation is successful
            },
            (err) => {
                console.log(err); // when there's an error
            }
        );
    }
    fetchTabData(type: any) {
        if (type == 'activity') {
            this.spinner.show();
            var companyid = this.ContactId;
            var accountype = 2;
            var modules = 2;
            var pageIndex = 0;
            var pageSize = 10;
            var orderbyclause = 'DueDate asc';
            var recordcount = 0;
            this.GetActList(companyid, accountype, modules, pageIndex, pageSize, orderbyclause, recordcount);
            //console.log(type);
        } else if (type == 'note') {
            this.spinner.show();
            var notecompanyid = this.ContactId;
            var module = 2;
            var pageindex = 0;
            var pagesize = 10;
            var orderbyclause = 'NotesId desc';
            var totalpagecount = 0;

            this.GetNotes(notecompanyid, module, pageindex, pagesize, orderbyclause, totalpagecount);
        } else if (type == 'attachment') {
            this.spinner.show();
            var attContactId = this.ContactId;
            var Module = 'Contact';
            var pageindex = 0;
            var pagesize = 10;
            var orderbyclause = 'AttachmentID asc';
            var totalpagecount = 0;
            this.GetAttachments(attContactId, Module, pageindex, pagesize, orderbyclause, totalpagecount);
        }
    }
    private GetAttachments(attContactId, Module, pageindex, pagesize, orderbyclause, totalpagecount) {
        this.companyservice
            .GetAttachmentsList(attContactId, Module, pageindex, pagesize, orderbyclause, totalpagecount)
            .subscribe((res) => {
                this.TabData = res;
                this.modulename = Module;
                this.showAttachment = true;
                this.showActivity = false;
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
    private GetActList(
        companyid: any,
        accountype: number,
        module: number,
        pageIndex: number,
        pageSize: number,
        orderbyclause: string,
        recordcount: number
    ) {
        this.companyservice
            .GetActivityList(companyid, accountype, module, pageIndex, pageSize, orderbyclause, recordcount)
            .subscribe((res) => {
                this.TabData = res;

                this.showActivity = true;
                this.showAttachment = false;
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
    private GetNotes(
        notecompanyid: any,
        module: number,
        pageindex: number,
        pagesize: number,
        orderbyclause: string,
        totalpagecount: number
    ) {
        this.companyservice
            .GetNoteList(notecompanyid, module, pageindex, pagesize, orderbyclause, totalpagecount)
            .subscribe((res: AllNoteViewModel[]) => {
                this.showNote = true;
                this.showActivity = false;
                this.showAttachment = false;
                var mds = new NotesListViewModel();
                module == 0 ? (mds.ActivityID = +notecompanyid) : (mds.ContactID = +notecompanyid);
                mds.ContactTypeID = module;
                mds.ID = notecompanyid;
                mds.ContactTypeID = module;
                mds.ModuleName = 'Contact';
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
    TabClickEvent($event) {
        if ($event === 'tab-Attachments') {
            this.selectedtab = 'tab-Attachments';
            this.fetchTabData('attachment');
        } else if ($event === 'tab-Notes') {
            this.selectedtab = 'tab-Notes';
            this.fetchTabData('note');
        } else if ($event === 'tab-Activity') {
            this.selectedtab = 'tab-Activity';
            this.fetchTabData('activity');
        } else {
            this.selectedtab = 'tab-Contact';
        }
    }

    LoadAtivities($event) {
        this.showActivity = false;
        this.GetActList(
            $event.companyid,
            $event.accountype,
            $event.module,
            $event.pageIndex,
            $event.pageSize,
            $event.orderbyclause,
            $event.recordcount
        );
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
    ContactEmail() {
        this.ShowEmail = true;
        this.commonService.GetAccountDetailsByID(this.ContactId).subscribe((res: AccountListDomainModel) => {
            this.maildetails = res;
        });
    }
    OutPutStatus(value) {
        this.ShowEmail = false;
    }
    NavigateCompanyDetails() {debugger
        this.router.navigate(['CRM/companies/viewcompany/',this.contactdetailslist.AccountObj.CompanyID,{ vname: 'Companies', tname: 'Companies' }]).then((nav) => {console.log(nav)},
                (err) => {
                    console.log(err);
                }
            );
    }
}
