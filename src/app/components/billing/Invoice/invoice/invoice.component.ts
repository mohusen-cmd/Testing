import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrManager } from "ng6-toastr-notifications";
import { NgxSpinnerService } from "ngx-spinner";
import { AppError } from "src/app/error/app-error";
import { BadInputError } from "src/app/error/bad-input-error";
import { NotFoundError } from "src/app/error/not-found-error";
import { ClaimsHelper } from "src/app/login/claimshelper";
import { ClientViewModel } from "src/app/models/IClientViewModel";
import { CompanyDetailsViewModel, CompanyViewModel } from "src/app/models/ICompanyDetailsViewModel";
import { InvoiceDomainModel } from "src/app/models/IInvoiceDomainModel";
import { InvoiceService } from "src/app/services/Invoice.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { CommonService } from "src/app/services/common.service";
import { CompanyService } from "src/app/services/company.service";
import { UserService } from "src/app/services/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { InvoicemailingTemplateComponent } from "../../invoicemailing-template/invoicemailing-template.component";
import { throwError } from "rxjs";
import { DataTableDirective } from "angular-datatables";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  @ViewChild(InvoicemailingTemplateComponent) InvoicemailingTemplateComponent: InvoicemailingTemplateComponent;
  companydetails: CompanyDetailsViewModel = new CompanyDetailsViewModel()
  clientObj: ClientViewModel = new ClientViewModel()
  InvoceObj: InvoiceDomainModel = new InvoiceDomainModel()
  UserId: any
  statustype: any = undefined
  invoice: any = "Invoice";
  jtSorting: any = "InvoiceId desc";
  RecordCount: any = 0;
  InvoiceId: any
  invNo: any;
  billingaddress: string;
  model: any = {};
  billingadrees: string;
  userDetails: any;
  companylogo: any;
  @ViewChild('pdftable') pdftable: ElementRef
  clientcompanyname: any
  Terms: string;
  MailingInfolist: any = {};
  marked: any = false
  checkedrowdata: any = [];
  titleforpopup: string;
  textforpopup: string;
  BearerToken: any;
  dtOptions: any = {};
  Invlist: any;
  constructor(
    public authenticationservice: AuthenticationService,
    public toastr: ToastrManager,
    public helper: ClaimsHelper,
    public invoiceService: InvoiceService,
    public companyservice: CompanyService,
    public commonservice: CommonService,
    public userservice: UserService,
    private spinner: NgxSpinnerService) {
    this.companydetails.CompanyObj = new CompanyViewModel()
    this.InvoceObj.Listinvoiceitems = []
    this.InvoceObj.TermsID 
  }

  teams = [
    { value: "null", Text: "select", selected: true },
    { value: "1", Text: "Due Now" },
    { value: "2", Text: "Net 15" },
    { Value: "3", Text: "Net 30" },
    { Value: "4", Text: "Net 45" },
    { Value: "5", Text: "Net 60" },
    { Value: "6", Text: "Net 90" },
  ]
  ngOnInit(): void {
  
    this.UserId = this.helper.GetUserIdAPIKeyFromClaims()
    this.BearerToken = localStorage.getItem('token')
    this.GetAllListTableBinding();
    this.invoiceService.GetLastInvoicenumber().subscribe((res) => {
      this.invNo = res
      this.InvoceObj.InvoiceNo = `INV-${String(this.invNo).padStart(6, '0')}`
    })
    this.InvoceObj.CreatedDate = new Date()
    var myDate = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
    this.InvoceObj.DueDate = myDate
    this.loadData();
  }

  async loadData() {
    try {
      const clientId = localStorage.getItem("ClientId");
      const clientDetails = await this.commonservice.GetClientDetailsById(clientId).toPromise();
      this.model = { ...clientDetails };
      this.companylogo = this.model['CompanyLogo'];
      this.clientcompanyname = this.model["CompanyName"];

      let userid = this.helper.GetUserIdAPIKeyFromClaims();
      const userDetails = await this.userservice.GetUserDetailsById(userid).toPromise();
      this.clientObj = userDetails as any;
      this.userDetails = userDetails["Users"];
    } catch (error) {
      console.error('Error loading data', error);
    }
  }

  Status(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }


  GetAllListTableBinding() {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.spinner.show();
        this.UserId = this.helper.GetUserIdAPIKeyFromClaims();
      if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 1) {
        this.jtSorting = "InvoiceId desc";
      }
      else if (dataTablesParameters.order[0].column == 2) {
        this.jtSorting = "InvoiceNo" + " " + dataTablesParameters.order[0].dir;
      }
      else if (dataTablesParameters.order[0].column == 3) {
        this.jtSorting = "Companyname" + " " + dataTablesParameters.order[0].dir;
      }
      else if (dataTablesParameters.order[0].column == 4) {
        this.jtSorting = "GrandTotal" + " " + dataTablesParameters.order[0].dir;
      }
      else if (dataTablesParameters.order[0].column == 5) {
        this.jtSorting = "DueDate" + " " + dataTablesParameters.order[0].dir;
      }
      else if (dataTablesParameters.order[0].column == 6) {
        this.jtSorting = "InvoiceType" + " " + dataTablesParameters.order[0].dir;
      }
      else if (dataTablesParameters.order[0].column == 7) {
        this.jtSorting = "Status" + " " + dataTablesParameters.order[0].dir;
      }
      else if (dataTablesParameters.order[0].column == 8) {
        this.jtSorting = "RecursTerm" + " " + dataTablesParameters.order[0].dir;
      }
      else if (dataTablesParameters.order[0].column == 9) {
        this.jtSorting = "Email" + " " + dataTablesParameters.order[0].dir;
      }
      
       that.invoiceService.GetInvoiceList(that.UserId,that.statustype,that.invoice,dataTablesParameters.start,dataTablesParameters.length,that.jtSorting,that.RecordCount).subscribe((res: any) => {
            that.Invlist = res;
            that.updateInvoiceDetails(res[0].InvoiceID);
            const count = res.length > 0 ? res[0].RecordCount : 0;
            callback({
              recordsTotal: count,
              recordsFiltered: count,
              data: []
            });
            this.spinner.hide();
          },
          (err: AppError) => {
            this.spinner.hide();
            if (err instanceof BadInputError) {
              window.alert("Bad Request:" + err.originalError);
            } else if (err instanceof NotFoundError) {
              window.alert("404 Error Occurred!");
            } else {
              return throwError(err);
            }
          }
        );
      },
      columns: [
        { title: '' },
        { title: 'Delete' },
        { title: 'Invoice number' },
        { title: 'Customer' },
        { title: 'Amount ($)' },
        { title: 'Due Date' },
        { title: 'Invoice Type' },
        { title: 'Status' },
        { title: 'Recurrence' },
        { title: 'Email' }
      ],
      columnDefs: [
        {
          targets: [0, 10],
          orderable: false,
        }
      ],
      responsive: true
    };
  }
  
  private updateInvoiceDetails(invoiceId: number) {
    this.authenticationservice.GetInvoiceDetailsByInvoiceId(invoiceId).subscribe((response) => {
      this.InvoceObj.TermsID = response.TermsID;
      this.Terms = this.getTerms(response.TermsID);
      this.InvoceObj = response;
      this.InvoceObj.Listinvoiceitems = response["listinvoiceitems"];
    });
  }

  private getTerms(termsId: number): string {
    switch (termsId) {
      case 1:
        return "Due Now";
      case 2:
        return "Net 15";
      case 3:
        return "Net 30";
      case 4:
        return "Net 45";
      case 5:
        return "Net 60";
      case 6:
        return "Net 90";
      default:
        return "";
    }
  }
  
  
 

  getcompanylogodetails() {
    let clientid = localStorage.getItem("ClientId")
    this.commonservice.GetClientDetailsById(clientid).subscribe((respones) => {
      this.model = { ...respones }

      this.companylogo = this.model['CompanyLogo']
      this.clientcompanyname = this.model["CompanyName"]
    })
  }

  getuserdetails() {
    this.UserId = this.helper.GetUserIdAPIKeyFromClaims()
    this.userservice.GetUserDetailsById(this.UserId).subscribe((response: ClientViewModel) => {
      this.clientObj = response
      this.userDetails = response.Users
    })
  }

  ConverttoPost(InvoiceId: any) {
    this.invoiceService.GetInvoiceDetailsByInvoiceId(InvoiceId).subscribe((response: any) => {
      
      this.InvoceObj = response
      this.InvoceObj.Listinvoiceitems = response["listinvoiceitems"]
      this.InvoceObj.Posted = 1
      this.InvoceObj.InvoiceType = "Invoice"
      this.InvoceObj.Memo = "True"
      this.OnePointMail(this.InvoceObj.CustomerID)
      this.invoiceService.UpdateInvoiceDetailsValue(this.InvoceObj).subscribe((resepone: any) => {
        if (resepone) {
          for (let i = 0; i < this.InvoceObj.Listinvoiceitems.length; i++) {
            this.invoiceService.insertUpdateInvoiceitems(this.InvoceObj.Listinvoiceitems[i]).subscribe(() => { })
          }
          this.toastr.successToastr('invoice Updated Successfully.', 'success',{
              timeOut: 3000 // 3 seconds timeout
            })
            this.Status()
        }
      })
    })
  }

  

  OnePointMail(CustomerID) {
    if(CustomerID){
      this.companyservice.GetCompanyDetailsById(CustomerID).subscribe((resepone:CompanyDetailsViewModel)=>{
        this.companydetails=resepone
        this.billingaddress = `${this.InvoceObj.Fname} \n ${this.companydetails.CompanyObj.MailingAddress} \n ${this.companydetails.CompanyObj.Shippingstreet} \n ${this.companydetails.CompanyObj.Shippingcity}   ${this.companydetails.CompanyObj.MailingStateText}  ${this.companydetails.CompanyObj.Shippingzip} \n${this.companydetails.CompanyObj.MailingCountryText}`;
        this.MailingInfolist.EmailAPIKey = this.helper.GetEmailAPIKeyFromClaims();
        this.MailingInfolist.EmailAPILink = this.helper.GetEmailapilinkFromClaims();
        this.MailingInfolist.FromName = "Digital55";
        this.MailingInfolist.FromAddress = "noreply@piltd.com"
        this.MailingInfolist.ReplytoAddress = "noreply@piltd.com";
        this.MailingInfolist.Subject = "Invoice  Details.";
        this.MailingInfolist.AssignedCampaign = ''
        this.MailingInfolist.Recipients = this.companydetails['CompanyObj'].Email
        this.MailingInfolist.BccEmails = this.InvoceObj.Email == "0" ? "" : this.InvoceObj.Email
        this.MailingInfolist.EnableTracking = "1"
        this.MailingInfolist.VMTAName = "";
        this.MailingInfolist.Tokens = "";
        this.MailingInfolist.ContactXMLData = "";
        this.MailingInfolist.Template = this.InvoicemailingTemplateComponent.InvoiceMailTemplateRef.nativeElement.innerHTML;
        var CompaignObj;
        this.invoiceService.EstmateInvoiceOnePointMail(this.MailingInfolist).subscribe((CompaignObj: any) => {
          CompaignObj = JSON.parse(CompaignObj)
          this.InvoceObj.CompaignID = CompaignObj['Data'].CampaignId
          this.InvoceObj.pointmailStatus = CompaignObj['status']
          this.invoiceService.UpdateSingleInvoiceBalanceAmount(this.InvoceObj).subscribe(() => {
            this.toastr.successToastr("Mail sent successfully", 'success', {
              timeOut: 3000 // 3 seconds timeout
            })
          })
        })
      })
    }
  }

  deletemsg(data) {
    let InvoiceIds = []
    InvoiceIds.push(data.InvoiceID)
    let result = confirm(`You are about to delete the Invoice permanently.Are you sure you want to delete Invoice ?`)
    if (result) {
      this.invoiceService.DeleteInvoiceIds(InvoiceIds).subscribe((response) => {
        if (response) {
          this.toastr.successToastr('Invoice Deleted Successfully', 'success',{
            timeOut: 3000 // 3 seconds timeout
          })
          this.Status()
          InvoiceIds = []
        }
      })
    }
  }

  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.InvoiceID);
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.InvoiceID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
  }

  Deleteuser() {
    if (this.marked == true || this.checkedrowdata.length != 0) {
      this.invoiceService.DeleteInvoiceIds(this.checkedrowdata).subscribe((response) => {
        if (response) {
          this.toastr.successToastr('Invoice Deleted Successfully', 'success',{
            timeOut: 3000 // 3 seconds timeout
          })
          this.marked = false;
          this.Status()

        }
      })
    }
    else {
      this.titleforpopup = 'Please select record to delete !';
      this.textforpopup = '';
      this.Swa1alerts('delete', this.titleforpopup, this.textforpopup);
    }
    this.checkedrowdata = []
  }

  Swa1alerts(type, title, text) {
    Swal.fire({
      title: `<span style=" font-weight: normal;">${title}</span>`,
      text: text,
      backdrop: false,
      imageUrl: '',
      reverseButtons: true,
      showCancelButton: false,
      cancelButtonColor: '#ef4d4d',
      confirmButtonColor: '#448aff',
    }).then((result) => {
      if (result.value) {

      }
      else {

      }
    })
  }


}
