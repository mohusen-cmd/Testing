import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { tr } from 'date-fns/locale';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { JBCampaignDomainModel, ListViewModel, MailingInfoViewModel } from 'src/app/models/ICampaignDomainModel';
import { CampaignsModule } from 'src/app/models/campaigns.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmailService } from 'src/app/services/email.service';
import { TriggeredcampaignsService } from 'src/app/services/triggeredcampaigns.service';

@Component({
  selector: 'app-triggered-createoredit',
  templateUrl: './triggered-createoredit.component.html',
  styleUrls: ['./triggered-createoredit.component.scss']
})
export class TriggeredCreateoreditComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  @ViewChild('step3') step3: MatStep;
  companyindustryForm: FormGroup;
  submitted = false;
  editcompaingnlist: any = []
  ddllist: any = {};
  editcompaingnlist1: any = []
  userId: number;
  userDetails: CampaignsModule = new CampaignsModule();
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  ShowAdvanceSearchModal: boolean = false
  Modeltitle: any;
  divLeadsView: any;
  divDoitView: any;
  roleid: any;
  compaignlist: any = {};
  MailingInfolist: any = {};
  tempFormat1Point: string;
  Schedule: any = {};
  editdetailslist: any = {};
  marked: false;
  checkedrowdata: any = [];
  checkedrow: any = [];
  checkedcontacts: any = [];
  statusval: any
  leadslist = "NULL"
  conatctlist = "NULL"
  opperlist = "NULL"
  list = []
  TargetListIds = []
  SelectCondition = []
  listName: any = [];
  isLeadsChecked: boolean = false
  isContactChecked: boolean = false
  isopperChecked: boolean = false

  JBCampObj = new JBCampaignDomainModel();
  ListDetailInfoModel = new ListViewModel();
  objlstMail = new MailingInfoViewModel();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  third: FormGroup
  isEditable = false;
  txtPLAINAreaEditor: any;
  tinymcetetx: any = '';
  linktext: boolean = true
  changebutton: boolean = false
  CampSelectList: any;
  camp_ID: any = '';
  showStep: boolean = true


  lisname: any = "undefined";
  targetaudience: any = "undefined";
  description: any = "undefined";
  numberOfContacts: any = "undefined";
  startIndex: any = 0;
  pageSize: any = 10;
  orderByClause: any = "list_ID desc";
  totalCount: any = 0;

  resultLength: any;

  ScheduleCampaign: boolean = false
  showlist: boolean = true
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<PeriodicElement>(true, []);

  isChecked: boolean = false;
  isCheckedlist: boolean = false
  objlist: any = [];
  aPIListID: any = []

  Campaigndetails: any = {};
  trigerlist: any;
  emaillist: Array<any> = []
  count: any
  campinamedup: any;
  allEmail: any;
  isSendimmediately: boolean = true;
  checkedlistname: any;
  TestmailId: any;


  constructor(public dialog: MatDialog,
    private elRef: ElementRef,
    public authentication: AuthenticationService,
    public activRoute: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public claimsHelper: ClaimsHelper,
    public emailservice: EmailService,
    public toastr: ToastrManager,
    public triggeredcampaignsService: TriggeredcampaignsService,
    ) {
    this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
  }
  get f() { return this.companyindustryForm.controls; }


  ngOnInit(): void {
    this.activRoute.queryParamMap.subscribe((queryParams) => {
      this.userDetails.camp_ID = +queryParams.get('camp_ID')
    })

    this.companyindustryForm = this.formBuilder.group({
      campaignname: new FormControl('', Validators.required),
      fromMail: new FormControl('', Validators.required),
      toMail: new FormControl(''),
      campaigndescription: new FormControl(''),
      formName: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required)
    });
    this.roleid = 2;
    this.bindLeadsData(this.roleid);
    if (this.userDetails.camp_ID != 0) {
      this.EditTriggercampaign();
    }

  }

  tabChangedEvent(event: MatTabChangeEvent) {
    if (event.tab.textLabel === "Lead") {
      this.roleid = 2;
      this.bindLeadsData(this.roleid);
    } else if (event.tab.textLabel === "Contact") {
      this.roleid = 10;
      this.bindLeadsData(this.roleid);
    } else if (event.tab.textLabel === "Opportunity") {
      this.roleid = 18;
      this.bindLeadsData(this.roleid);
    }
  }

  bindLeadsData(Roleid) {
    this.emailservice.GetJobSeeTemplatebyroleid(Roleid).subscribe((res: any) => {
      var AllTemplatesArray = [];
      res.forEach((html) => AllTemplatesArray.push(html.Template_html))
      this.divLeadsView = AllTemplatesArray[0];
      this.divDoitView = AllTemplatesArray[1];
    });
  }



  divclick(event, value) {

    this.ShowAdvanceSearchModal = true;
    if (event == "lead1") {
      this.show1 = true;
      if (value == 'createlead') {
        this.Modeltitle = "Preview Template- Leads Creation";
      }
      else if (value == 'createcontact') {
        this.Modeltitle = " Preview Template- Contact Creation";
      }
      else if (value == 'createoppertunity') {
        this.Modeltitle = "Opportunity Creation";
      }

      //this.show2=false;
    }
    else if (event == "lead2") {
      this.show2 = true;
      this.Modeltitle = "Do-it Yourself";
    }
    else if (event == "testmail") {

      this.show3 = true;
      this.Modeltitle = "SEND TEST EMAIL";
    }

  }


  ngAfterViewInit() {
    this.stepper.selectionChange.subscribe(event => {
      if (event.selectedIndex === 2) { // Index of Step 3 (0-based)
        this.getEmailList();
      }
    });
  }

  getEmailList() {
    var list = []
    this.authentication.getEmailList(this.lisname, this.targetaudience, this.description, this.numberOfContacts, this.startIndex, this.pageSize, this.orderByClause, this.totalCount).subscribe((data: any) => {
      if (this.SelectCondition.length != 0) {
        data.forEach((item) => {
          item.IsCheck = false; // Add an IsCheck property to each item and set it to false
        });
        data.forEach((item) => {
          this.SelectCondition.forEach((item1) => {
            if (item.list_ID == item1) {
              item.IsCheck = true;
              list.push(item.list_name.trim())
              this.ListDetailInfoModel.numberOfContact += Number(item.number_of_contacts.trim())
            }
          })
        })
        this.ListDetailInfoModel.userType = list.toString()
        this.dataSource= data;
        console.log( this.dataSource)
      }else{
        this.dataSource= data;
      }
    })
  }
  EditTriggercampaign() {
    var splitlist = []
    this.triggeredcampaignsService.ConformToSendDetails(this.userDetails.camp_ID).subscribe((data) => {



      this.editdetailslist = data;
      this.userDetails = this.editdetailslist;

      splitlist = this.userDetails.UserType.split(",")
      this.isLeadsChecked = splitlist.includes("Leads")
      this.isContactChecked = splitlist.includes("Contacts")
      this.isopperChecked = splitlist.includes("Opportunities")

      if (this.isLeadsChecked || this.isContactChecked || this.isopperChecked) {
        this.tabGroup.selectedIndex = 0;
        this.isChecked = true
      } else {
        this.isChecked = false
      }

      if (!splitlist.includes("Leads") && !splitlist.includes("Contacts") && !splitlist.includes("Opportunities")) {
        this.SelectCondition = this.userDetails.SelectCondition.split(",")
        this.tabGroup.selectedIndex = 1;
      }

      if (this.SelectCondition.length != 0) {
        this.isCheckedlist = true
      } else {
        this.isCheckedlist = false
      }

      if (this.isLeadsChecked) {
        this.activeInActiveToggleList(this.isLeadsChecked, "Leads")
      }
      if (this.isContactChecked) {
        this.activeInActiveToggleList(this.isLeadsChecked, "Contacts")
      }
      if (this.isopperChecked) {
        this.activeInActiveToggleList(this.isLeadsChecked, "Opportunities")
      }
      this.stepper.next()
      this.GetEditCampaignContentddl(1);

    })

    //this.stepper.selectedIndex = 1; 
  }

  goForward(stepper: MatStepper) {

    this.GetEditCampaignContentddl();
    this.userDetails.ReplyToEmailAddress = '0'
    this.userDetails.FromEmailAddress = '0'
    this.userDetails.FromName = 'CRM Team'
    stepper.next();
  }

  goForwardselectlist(stepper) {
    //this.stepper.selectedIndex=-1;

    this.submitted = true;
    if (this.companyindustryForm.invalid) {
      return;
    }
    else {
      //UserId:number = Convert.ToInt32(RoleMenuAccess.GetUserID());
      var day = new Date();
      this.userDetails.Temp_ID = "1";
      this.userDetails.ImagePath = "";
      this.userDetails.SelectCondition = (this.userDetails.SelectCondition == "") ? "" : this.userDetails.SelectCondition;
      this.userDetails.APISelectCondition = (this.userDetails.APISelectCondition == "") ? "" : this.userDetails.APISelectCondition;
      this.userDetails.UserType = (this.userDetails.UserType == "") ? "" : this.userDetails.UserType;
      this.userDetails.TextContent = "";
      this.userDetails.Status = "Draft";
      this.userDetails.Temp_ID = (this.userDetails.Temp_ID).toString();
      this.userDetails.UnsubscribeInfo = "";
      this.userDetails.userId = (this.userId).toString();
      this.userDetails.UsedTrigger = "";
      this.userDetails.SendType = "";
      this.userDetails.ScheduledDatetime = day;
      this.userDetails.CreatedDate = day;
      this.userDetails.ModifiedDate = day;
      this.userDetails.CreatedBy = this.userId;
      this.userDetails.ModifiedBy = this.userId;
      this.userDetails.userId = this.userId
      this.userDetails.campAPI_ID = "";
      this.userDetails.totalRecipient = "";
      this.userDetails.camp_ID;
      this.userDetails.HTMLContent = this.divLeadsView
      this.triggeredcampaignsService.Insertcompaingncontent(this.userDetails).subscribe((data) => {

        this.Campaigndetails = data;
        this.userDetails.camp_ID = this.Campaigndetails;

      })
      stepper.next();

    }
  }

  GetListCount(stepper) {

    if (this.isChecked) {
      this.triggeredcampaignsService.GetListCount(this.leadslist, this.conatctlist, this.opperlist).subscribe((response: any) => {
        var APISelectConditionLeads = []
        var SelectConditionLeads = []

        var APISelectConditionContacts = []
        var SelectConditionContacts = []

        var APISelectConditionopper = []
        var SelectConditionopper = []

        this.userDetails.number_of_contacts = 0
        response.forEach((item) => {
          if (item.target_audience.trim() == this.leadslist) {
            APISelectConditionLeads.push(item.APIListID)
            SelectConditionLeads.push(item.cand_list_ID)
            this.userDetails.number_of_contacts += Number(item.number_of_contacts.trim())
            this.userDetails.totalRecipient = this.userDetails.number_of_contacts
            this.userDetails.APISelectCondition = APISelectConditionLeads.toString()
            this.userDetails.SelectCondition = SelectConditionLeads.toString()
          }
          if (item.target_audience.trim() == this.conatctlist) {
            APISelectConditionContacts.push(item.APIListID)
            SelectConditionContacts.push(item.cand_list_ID)
            this.userDetails.number_of_contacts += Number(item.number_of_contacts.trim())
            this.userDetails.totalRecipient = this.userDetails.number_of_contacts
            this.userDetails.APISelectCondition = APISelectConditionContacts.toString()
            this.userDetails.SelectCondition = SelectConditionContacts.toString()
          }
          if (item.target_audience.trim() == this.opperlist) {
            APISelectConditionopper.push(item.APIListID)
            SelectConditionopper.push(item.cand_list_ID)
            this.userDetails.number_of_contacts += Number(item.number_of_contacts.trim())
            this.userDetails.totalRecipient = this.userDetails.number_of_contacts
            this.userDetails.APISelectCondition = APISelectConditionopper.toString()
            this.userDetails.SelectCondition = SelectConditionopper.toString()
          }
        })

        this.InsertupdateCamp()
      })
    }
    if (this.isCheckedlist) {
      this.InsertupdateCamp()
    }
    stepper.next();
  }








  onfocus(event: any) {
    event.preventDefault();
  }



  GetEditCampaignContentddl(tempid = 1) {
    this.triggeredcampaignsService.GetEditCampaignContentddl(this.userId).subscribe((data) => {

      this.editcompaingnlist = data;
      this.getdata(tempid);
    })
  }

  getdata(tempid) {
    this.triggeredcampaignsService.GetEditcompaingncontent(tempid).subscribe((data) => {

      this.editcompaingnlist1 = data;

    })
  }

  CampaignNameExists(event: any) {
    this.triggeredcampaignsService.CampaignNameExists(this.userDetails.CampaignName, this.userDetails.camp_ID).subscribe((response: any) => {
      if (!response) {
        this.userDetails.CampaignName = ''
        this.toastr.warningToastr("Campaign name is already exist.", "warning")

      }
    })
  }

  saveasdraft() {
    this.triggeredcampaignsService.Insertcompaingncontent(this.userDetails).subscribe((data: any) => {
      if (data) {
        this.router.navigate(["/Email", "TriggeredCampaigns"])
      }
    })
  }

  saveStatus(Status) {

    this.ShowAdvanceSearchModal = false;
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;

  }
  ConformToSendDetails() {

    this.triggeredcampaignsService.ConformToSendDetails(this.userDetails.camp_ID).subscribe((data) => {
      this.compaignlist = data;
      if (data) {

        this.MailingInfolist.EmailAPIKey = this.claimsHelper.GetEmailAPIKeyFromClaims();
        this.MailingInfolist.EmailAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
        this.MailingInfolist.FromName = this.compaignlist.FromName;
        this.MailingInfolist.FromAddress = this.compaignlist.FromEmailAddress;
        this.MailingInfolist.ReplytoAddress = this.compaignlist.ReplyToEmailAddress;
        this.MailingInfolist.Subject = this.compaignlist.SubjectLine;
        this.MailingInfolist.Template = this.compaignlist.HTMLContent;
        this.MailingInfolist.TargetListIds = this.compaignlist.APISelectCondition;
        this.tempFormat1Point = this.userDetails.CampaignDescription
        this.tempFormat1Point = this.tempFormat1Point + this.MailingInfolist.Template;
        this.tempFormat1Point = this.tempFormat1Point + "</body></html >";
        this.MailingInfolist.Template = this.tempFormat1Point;
        this.MailingInfolist.CampaignName = this.compaignlist.CampaignName;
        this.MailingInfolist.CcEmails = this.compaignlist.Cc;
        this.MailingInfolist.BccEmails = this.compaignlist.Bcc;
        this.MailingInfolist.TargetListIds = this.compaignlist.APISelectCondition;
        if (this.Schedule.immediately == "immediately") {
          var date = new Date();  
          this.MailingInfolist.LaunchDateTime =  this.convertToFormattedDateTime('IMMEDIATE', date);
        } else {
          this.MailingInfolist.LaunchDateTime = this.convertToFormattedDateTime('LATER', this.Schedule.schedule);

        }
        this.triggeredcampaignsService.ConfirmSendMail(this.MailingInfolist).subscribe((campApiID) => {
          if (campApiID) {
            this.userDetails.campAPI_ID = campApiID;
            this.userDetails.Status = 'Pending'
            this.triggeredcampaignsService.UpdateCampaignScheduleStatus(this.userDetails).subscribe((response) => {
              if (response) {

                this.router.navigate(['/Email', 'TriggeredCampaigns'])
              }
            })
          }
        })
      }

    })

    // For Eastern Standard Time
    //string ZoneId = "Eastern Standard Time";
  }



  onChecked(obj: any, isChecked: boolean, index: any) {




    if (isChecked) {
      this.TargetListIds.push(obj.APIListID)
      this.SelectCondition.push(obj.list_ID)
      this.listName.push(obj.list_name.trim())
      this.ListDetailInfoModel.numberOfContact = (this.ListDetailInfoModel.numberOfContact + +obj.number_of_contacts)
    }
    else {
      const index = this.TargetListIds.indexOf(obj.APIListID);
      const index1 = this.SelectCondition.indexOf(obj.list_ID)
      const index2 = this.listName.indexOf(obj.list_name)
      this.ListDetailInfoModel.numberOfContact = (this.ListDetailInfoModel.numberOfContact - +obj.number_of_contacts)
      if (index !== -1 || index1 !== -1 || index2 !== -1) {
        this.TargetListIds.splice(index, 1);
        this.SelectCondition.splice(index1, 1)
        this.listName.splice(index2, 1)
      }
    }
    if (this.SelectCondition.length != 0) {
      this.isCheckedlist = true
    } else {
      this.isCheckedlist = false
    }

    this.userDetails.APISelectCondition = this.TargetListIds.toString();
    this.userDetails.SelectCondition = this.SelectCondition.toString();
    this.userDetails.totalRecipient = this.SelectCondition.length
    this.userDetails.UserType = ""
    this.ListDetailInfoModel.userType = this.listName.toString()
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    const data = this.dataSource.data
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  activeInActiveToggleList(event, listname) {
    if (event) {
      if (listname === 'Leads') {
        this.leadslist = listname;
      } else if (listname === 'Contacts') {
        this.conatctlist = listname;
      } else if (listname === 'Opportunities') {
        this.opperlist = listname;
      }
      this.list.push(listname);
    } else {
      const index = this.list.indexOf(listname);
      if (index !== -1) {
        this.list.splice(index, 1);
      }
    }

    this.userDetails.UserType = this.list.toString();

    if (this.list.length != 0) {
      this.isChecked = true
    } else {
      this.isChecked = false
    }
  }




  InsertupdateCamp() {
    this.triggeredcampaignsService.Insertcompaingncontent(this.userDetails).subscribe((data) => {
      this.Campaigndetails = data;
      this.userDetails.camp_ID = this.Campaigndetails;
    })
  }
  Radio(type) {


    if (type == "immediately") {
      $(".date1").prop('readonly', true);
      $(".date1").val(" ");
      this.Schedule.immediately = "immediately"
      this.userDetails.SendType = "IMMEDIATE"
    }
    else {
      $(".date1").prop('readonly', false);
      this.userDetails.SendType = "LATER"
    }
  }
  UpdateCampaignSendType(stepper) {

    this.triggeredcampaignsService.UpdateCampaignSendType(this.userDetails).subscribe((data) => {
      var d1 = data;
    })
    stepper.next();
  }
  convertToFormattedDateTime(sendType, scheduledDateTime) {

    const ZoneId = "Eastern Standard Time";
    let localtime;
    let dataTimeByZoneId;

    if (sendType === "IMMEDIATE") {
      localtime = new Date();
      const timeZoneOffset = -localtime.getTimezoneOffset();
      dataTimeByZoneId = new Date(localtime.getTime() + timeZoneOffset * 60 * 1000 + 5 * 60 * 1000);
    } else if (sendType === "LATER" && scheduledDateTime) {
      localtime = new Date(scheduledDateTime);
      const timeZoneOffset = -localtime.getTimezoneOffset();
      dataTimeByZoneId = new Date(localtime.getTime() + timeZoneOffset * 60 * 1000 + 2 * 60 * 1000);
    } else {
      this.toastr.errorToastr("Invalid sendType or missing scheduledDateTime.","error");
    }

    const formattedDateTime = dataTimeByZoneId.toLocaleString('en-US', { hour12: true });
    return formattedDateTime;
  }

  // Example usage:



 
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];



