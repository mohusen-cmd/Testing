import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { InvoiceDomainModel } from 'src/app/models/IInvoiceDomainModel';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { EstimateInvoiceDomainModel, ItemsDomainModel } from 'src/app/models/IEstimateInvoiceDomainModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CompanyDetailsViewModel } from 'src/app/models/ICompanyDetailsViewModel';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { InvoiceService } from 'src/app/services/Invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { OnepointMailingtemplateComponent } from '../../onepoint-mailingtemplate/onepoint-mailingtemplate.component';
import { CompanyService } from 'src/app/services/company.service';
import { DataTableDirective } from 'angular-datatables';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.scss']
})
export class EstimateComponent implements OnInit {
  @ViewChild(OnepointMailingtemplateComponent) OnepointMailingtemplateComponent: OnepointMailingtemplateComponent;
  estinvoicedetails: EstimateInvoiceDomainModel = new EstimateInvoiceDomainModel()
  companydetails: CompanyDetailsViewModel = new CompanyDetailsViewModel()
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  clientObj: ClientViewModel = new ClientViewModel()
  invoicedomain = new InvoiceDomainModel()
  orderByClause: any = "EstInvoiceID desc";
  MailingInfolist: any = {};
  userDetails: any = {}
  dtOptions: any = {};
  model: any = {}
  billingadrees: any
  CreateByUserID: any
  TotalCount = 0
  datainvoice: any;
  companylogo: any
  Estlist;
  marked: any=false;
  checkedrowdata: any=[];
  titleforpopup: string;
  textforpopup: string;
  constructor(public claimshelper: ClaimsHelper,
    public service: AuthenticationService,
    public toaster: ToastrManager,
    public EstService: InvoiceService,
    private spinner: NgxSpinnerService,
    private _companyservice:CompanyService,
    private cdr: ChangeDetectorRef) {
    this.estinvoicedetails.listItemsModel = new ItemsDomainModel()
  }


  async ngOnInit() {
      this.GetAllESTListTableBinding()
      let ClientId = localStorage.getItem("ClientId");
      const clientDetails = await this.service.GetClientDetailsById(ClientId).toPromise();
      this.model = { ...clientDetails };
      this.companylogo = this.model["CompanyLogo"];
      
      let userid = this.claimshelper.GetUserIdAPIKeyFromClaims();
      const userDetails = await this.service.GetUserDetailsById(userid).toPromise();
      this.userDetails = userDetails["Users"];
      
  }

  GetAllESTListTableBinding() {
    const that = this;
    //this.ShowContact=true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.spinner.show()
        this.CreateByUserID = this.claimshelper.GetUserIdAPIKeyFromClaims()
        if (dataTablesParameters.order[0].column == 2) {
          this.orderByClause = "EstInvoiceNo" + " " + dataTablesParameters.order[0].dir;
        }
        else if(dataTablesParameters.order[0].column == 3){
          this.orderByClause = "Name" + " " + dataTablesParameters.order[0].dir;
        }
        else if(dataTablesParameters.order[0].column == 4){
          this.orderByClause = "GrandTotal" + " " + dataTablesParameters.order[0].dir;
        }
        else if(dataTablesParameters.order[0].column == 5){
          this.orderByClause = "EstInvStatus" + " " + dataTablesParameters.order[0].dir;
        }
        else if(dataTablesParameters.order[0].column == 6){
          this.orderByClause = "Email" + " " + dataTablesParameters.order[0].dir;
        }
        this.EstService.GetEstimatList(this.CreateByUserID, dataTablesParameters.start, dataTablesParameters.length, this.orderByClause, this.TotalCount).subscribe((data: any) => {
          var count = 0;
          that.Estlist = data;
          if (that.Estlist.length > 0) {
            count = data[0].RecordsCount;
          }
          else {
            count = 0;
          }
          callback({

            recordsTotal: count,
            recordsFiltered: count,
            data: []
          });
          this.spinner.hide();
        },
        (err:AppError) => 
        { 
          this.spinner.hide();
          if(err instanceof BadInputError)
          {
            window.alert("Bad Request:" + err.originalError)
          }
          else if (err instanceof NotFoundError) 
          {
            window.alert("404 Error Occured!")
          }
          else
          {
           return throwError(err); 
          }
          });
      },

      columns: [
        {
          title: ''
        },
        {
          title: 'Delete'
        },
        {
          title: 'Estimate number ',
        },
        {
          title: 'Customer',
        },
        {
          title: 'Amount ($)',
        },
        {
          title: 'Status',
        },
        {
          title: 'Email',
        }
      ],
      columnDefs: [
        {
          targets: [0, 7], /* column index */
          orderable: false, /* true or false */
        }
      ],
      responsive: true
    };
  }
 

  

 

  ConverttoInvoicesid(obj, type) {
    this.getEstimatebyId(obj)
    // if (type == 'ConverttoInvoice') {
    //   this.OnEmail(obj)
    // }
  }

  getEstimatebyId(obj) {
    this.EstService.GetEstimateinvoiceDetailsbyId(obj.EstInvoiceID).subscribe((res: any) => {
      this.estinvoicedetails = res
      const now = new Date();
      var myDate = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
      res.CreatedDate = now.toLocaleDateString();
      res.DueDate = myDate
      this.invoicedomain = res
      this.invoicedomain.Listinvoiceitems = res.ListEstimateitems
      this.invoicedomain.InvoiceType = "Estimate"
      var BalanceAmount = this.invoicedomain.MaterialAmount;
      var LaborAmount = this.invoicedomain.MaterialAmount;
      this.EstService.GetLastInvoicenumber().subscribe((res: any) => {
        var lstinvoiceno
        lstinvoiceno = 'INV-' + String(res + 1).padStart(6, '0');
        this.datainvoice = lstinvoiceno
        this.invoicedomain.CreateByUserID = this.claimshelper.GetUserIdAPIKeyFromClaims()
        this.invoicedomain.InvoiceNo = this.datainvoice
        this.invoicedomain.BalanceAmount = BalanceAmount
        this.invoicedomain.InvoiceAmount = BalanceAmount
        this.EstService.InsertInvoice(this.invoicedomain).subscribe((res) => {
          this.invoicedomain.InvoiceID = +res
          if (res) {
            this.estinvoicedetails.Posted = 1
            this.EstService.UpdateEstimateInvoicePost(this.estinvoicedetails).subscribe((res) => {
              if (res) {
                this.OnEmail(obj)
                this.Status()
              }
            })
          }
        })

      })
    })
  }

  
 

  deletemsg(data) {
    const deleteid = [];
    deleteid.push(data)
    Swal.fire({
      title: "Are you sure?",
      text: "All data related to this Leads ID will be parmanently deleted",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, DELETE it!",
      cancelButtonText: "No, cancel please!",
      closeOnConfirm: false,
      closeOnCancel: false
    }).then((response) => {
      if (response.isConfirmed) {

        this.EstService.DeleteEstInvids(deleteid).subscribe((response) => {

          //need to check backend both cased getting true
          if (response) {
            this.toaster.successToastr(`Deleted!, Your Record  has been archived`, `success`)
            this.Status()
          } else {
            this.toaster.errorToastr(`Estimated Invoice Not Deleted `, "error")
            this.Status()
          }
        }, (error) => {
          console.log(error);
        })

      } else if (response.isDenied) {
        Swal.fire(`Cancelled`)
      }
    });

  }
  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.EstInvoiceID);
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.EstInvoiceID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
  }
  Delete() {
    if (this.marked == true || this.checkedrowdata.length != 0) {
      this.EstService.DeleteEstInvids(this.checkedrowdata).subscribe((response) => {
        if (response) {
          this.toaster.successToastr(`Deleted!, Your Record  has been archived`, `success`)
          this.Status()
        } else {
          this.toaster.errorToastr(`Estimated Invoice Not Deleted `, "error")
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

  async OnEmail(event: any) {
    try {
      // Get Client ID from localStorage
      
      // Fetch Estimate Invoice Details
      const estInvoiceDetails = await this.service.getestimateinvoiceDetailsbyId(event.EstInvoiceID).toPromise();
      this.estinvoicedetails = estInvoiceDetails;
      this.estinvoicedetails.ListEstimateitems = estInvoiceDetails["ListEstimateitems"];
  
      // Fetch Company Details
      const companyDetails = await this._companyservice.GetCompanyDetailsById(event.CustomerID).toPromise();
      this.companydetails = companyDetails as CompanyDetailsViewModel;
      this.billingadrees = `${this.estinvoicedetails.Fname}  \n ${this.companydetails.CompanyObj.MailingAddress} \n ${this.companydetails.CompanyObj.Shippingstreet} \n ${this.companydetails.CompanyObj.Shippingcity} , ${this.companydetails.CompanyObj.MailingStateText} ,${this.companydetails.CompanyObj.Shippingzip}  \n ${this.companydetails.CompanyObj.MailingCountryText}`;
      this.cdr.markForCheck();
      this.EstmateOnePointMail();
     
    } catch (error) {
      console.error("Error in OnEmail:", error);
    }
  }
  

  
  async EstmateOnePointMail() {
    this.MailingInfolist.EmailAPIKey = this.claimshelper.GetEmailAPIKeyFromClaims();
    this.MailingInfolist.EmailAPILink = this.claimshelper.GetEmailapilinkFromClaims();
    this.MailingInfolist.FromName = "Digital55";
    this.MailingInfolist.FromAddress = "noreply@piltd.com"
    this.MailingInfolist.ReplytoAddress = "noreply@piltd.com";
    this.MailingInfolist.Subject = "Estimate Invoice Details.";
    this.MailingInfolist.AssignedCampaign = ''
    this.MailingInfolist.Recipients = this.companydetails['CompanyObj'].Email
    this.MailingInfolist.BccEmails = this.estinvoicedetails.Email == "0" ? "" : this.estinvoicedetails.Email
    this.MailingInfolist.EnableTracking = "1"
    this.MailingInfolist.VMTAName = "";
    this.MailingInfolist.Tokens = "";
    this.MailingInfolist.ContactXMLData = "";
    this.MailingInfolist.Template = this.OnepointMailingtemplateComponent.childTemplateRef.nativeElement.innerHTML;
    var CompaignObj;
    this.EstService.EstmateInvoiceOnePointMail(this.MailingInfolist).subscribe((CompaignObj: any) => {
      CompaignObj = JSON.parse(CompaignObj)
      if (CompaignObj) {
        this.estinvoicedetails.CompaignID = CompaignObj['Data'].CampaignId
        this.estinvoicedetails.pointmailStatus = CompaignObj['status']
        this.EstService.UpdateEstimateInvoicePost(this.estinvoicedetails).subscribe(() => {
          this.toaster.successToastr("Email sent successfully", "success")
        })
      }
    })
  }


  Status(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }



}

