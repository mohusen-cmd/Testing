import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';

@Component({
  selector: 'app-createoreditclient',
  templateUrl: './createoreditclient.component.html',
  styleUrls: ['./createoreditclient.component.scss']
})
export class CreateoreditclientComponent implements OnInit {
  registerForm: FormGroup
  ClientViewModel: ClientViewModel = new ClientViewModel()
  ClientHeader: string = null
  clientId: string = ''
  Urlvalidator = "https?://.+";
  disabledValue = true;
  actionName: string;
  userheaderName: string;
  submitted: boolean = false
  fileName: string = ""
  ClientDetail: any
  private base64textString: string = "";
  constructor(public activatedroute: ActivatedRoute,
    public fb: FormBuilder,
    public service: AuthenticationService,
    public toester: ToastrManager,
    public router: Router,
    public commonservice: CommonService,
    public claimsHelper: ClaimsHelper,
    private adminService: AdminService,) { }


  ngOnInit(): void {

    this.clientId = this.activatedroute.snapshot.paramMap.get("Id")
    if (this.clientId == null || this.clientId == undefined) {
      this.registerForm = this.fb.group({
        clientId: new FormControl('', [Validators.required]),
        companyName: new FormControl('', Validators.required),
        companyType: new FormControl(''),
        companyWebsite: new FormControl('', Validators.pattern(this.Urlvalidator)),
        companyLogo: new FormControl(''),
        authKey: new FormControl(''),
        sendApiDetail: new FormControl(''),
        firstName: new FormControl('', Validators.required),
        middleInitial: new FormControl(''),
        lastName: new FormControl('', Validators.required),
        email: ['', [Validators.required, Validators.email]],
        level: new FormControl(''),
        loginId: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        question: new FormControl('', Validators.required),
        answer: new FormControl('', Validators.required),
        emailApiLink: new FormControl(''),
        emailApiKey: new FormControl(''),
        emailApiUserName: new FormControl(''),
        apiUsername: new FormControl(''),
        apiPassword: new FormControl(''),
        apiMerchantkey: new FormControl(''),
        isCorporate: new FormControl(null),
        qbClientID: new FormControl(''),
        qbSecretID: new FormControl(),
        qbBankAccnt: new FormControl(''),
        qbBankAccntNum: new FormControl(''),
        qbAcctReceivable: new FormControl(''),
        qbReceivableAcctNum: new FormControl(''),
        qbSaleTaxAcct: new FormControl(''),
        qbSalesTaxAcctNum: new FormControl(''),
        qbSalesAcct: new FormControl(''),
        salesAcctNum: new FormControl(''),
      })
    } else {
      this.registerForm = this.fb.group({
        clientId: new FormControl('',),
        companyName: new FormControl('', Validators.required),
        companyType: new FormControl(''),
        companyWebsite: new FormControl('', Validators.pattern(this.Urlvalidator)),
        companyLogo: new FormControl(''),
        authKey: new FormControl(''),
        sendApiDetail: new FormControl(''),
        firstName: new FormControl('',),
        middleInitial: new FormControl(''),
        lastName: new FormControl('',),
        email: new FormControl('',),
        level: new FormControl(''),
        loginId: new FormControl('',),
        password: new FormControl('',),
        question: new FormControl('',),
        answer: new FormControl('',),
        emailApiLink: new FormControl(''),
        emailApiKey: new FormControl(''),
        emailApiUserName: new FormControl(''),
        apiUsername: new FormControl(''),
        apiPassword: new FormControl(''),
        apiMerchantkey: new FormControl(''),
        isCorporate: new FormControl(''),
        qbClientID: new FormControl(''),
        qbSecretID: new FormControl(''),
        qbBankAccnt: new FormControl(''),
        qbBankAccntNum: new FormControl(''),
        qbAcctReceivable: new FormControl(''),
        qbReceivableAcctNum: new FormControl(''),
        qbSaleTaxAcct: new FormControl(''),
        qbSalesTaxAcctNum: new FormControl(''),
        qbSalesAcct: new FormControl(''),
        salesAcctNum: new FormControl(''),
      })

    }

    if (this.clientId != "" && this.clientId != undefined) {
      this.adminService.GetByIdClientManagerApi(this.clientId).subscribe((data: ClientViewModel) => {

        this.disabledValue = true;
        this.ClientViewModel = data
        this.ClientViewModel.Users.Level = "Master Admin";
        this.ClientViewModel.Level = "Master Admin";
        this.actionName = "Edit Client";
        this.userheaderName = "Login Information";
        this.ClientDetail = `Client Detail`

        if (this.ClientViewModel.ApiPassword != null) {
          const formData = new FormData();
          formData.append("Decrypt", this.ClientViewModel.ApiPassword);
          this.commonservice.PostDecrypt(formData).subscribe((ApiPassword: any) => {
            this.ClientViewModel.ApiPassword = ApiPassword
          })
        }

        if (this.ClientViewModel.Users.Password != null) {
          const formData = new FormData();
          formData.append("Decrypt", this.ClientViewModel.Users.Password);
          this.commonservice.PostDecrypt(formData).subscribe((Password: any) => {
            this.ClientViewModel.Users.Password = Password
          })
        }

        let UserID = this.claimsHelper.GetRoleIdAPIKeyFromClaims()
        this.commonservice.GetQBLoginIncomeAcct(UserID, this.ClientViewModel.ClientID).subscribe((response) => {

          if (response != null) {
            this.ClientViewModel.BankAcctNum = response['BankAcctNum']
            this.ClientViewModel.ClientName = response['ClientName']
            this.ClientViewModel.ClientNumber = response['ClientNumber']
            this.ClientViewModel.IsCorporate = response['IsCorporate'] ?? true
            this.ClientViewModel.QBAcctReceivable = response['QBAcctReceivable']
            this.ClientViewModel.QBBankAccnt = response['QBBankAccnt']
            this.ClientViewModel.QBClientID = response['QBClientID']
            this.ClientViewModel.QBId = response['QBId']
            this.ClientViewModel.QBSaleTaxAcct = response['QBSaleTaxAcct']
            this.ClientViewModel.QBSalesAcct = response['QBSalesAcct']
            this.ClientViewModel.QBSecretID = response['QBSecretID']
            this.ClientViewModel.ReceivableAcctNum = response['ReceivableAcctNum']
            this.ClientViewModel.SalesAcctNum = response['SalesAcctNum']
            this.ClientViewModel.SalesTaxAcctNum = response['SalesTaxAcctNum']
            this.ClientViewModel.Sendnotice = response['Sendnotice']
            this.ClientViewModel.State = response['State']
            this.ClientViewModel.Userid = response['Userid']
            this.ClientViewModel.QBStateToken = response['State'];

            this.commonservice.PostDecrypt(this.ClientViewModel.QBSecretID).subscribe((QBSecretID: any) => {
              this.ClientViewModel.QBSecretID = QBSecretID
            })
          }
        })
      })
    } else {
      this.adminService.GetAutoAPIKey().subscribe((data: any) => {
        this.ClientViewModel.Users.Level = "Master Admin";
        this.ClientViewModel.Users.QId = 0;
        this.ClientViewModel.AuthKey = data;
        this.ClientViewModel.ClientNumber = 0;
        this.ClientViewModel.ApiMerchantkey = 0
        this.ClientViewModel.Users.QId = "";
        this.userheaderName = "User Details";
        this.actionName = "Create New Client";
        this.ClientDetail = `New Client Detail`
      })
    }

  }

  get f() { return this.registerForm.controls }
  ChangeCompanyLogo(evt) {

    var files = evt.target.files
    var file = files[0]
    this.fileName = file.name
    this.ClientViewModel.CompanyLogo = file.name
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {

    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  OnClientSubmit() {

    this.submitted = true
    if (this.registerForm.valid) {

      if (this.ClientViewModel.ClientNumber > 0) {
        if (this.fileName != "" && this.base64textString != "") {
          this.ClientViewModel.CompanyLogo = this.fileName;
          this.ClientViewModel.LogoContent = this.base64textString;
        }
        if (this.ClientViewModel.ApiPassword != null) {
          const formData = new FormData();
          formData.append("Encrypt", this.ClientViewModel.ApiPassword);
          this.commonservice.PostEncrypt(formData).subscribe((ApiPassword: any) => {
            this.ClientViewModel.ApiPassword = ApiPassword
          })
          this.ClientViewModel.ApiPassword = this.ClientViewModel.ApiPassword
        }
        else {
          this.ClientViewModel.ApiPassword = this.ClientViewModel.ApiPassword;
        }
        this.ClientViewModel.Users.UserId = 1;
        this.ClientViewModel.IsCorporate = (this.ClientViewModel.QBClientID === "" || this.ClientViewModel.QBClientID === null) && (this.ClientViewModel.QBSecretID === "" || this.ClientViewModel.QBSecretID === null) ? false : this.ClientViewModel.IsCorporate;
        this.adminService.UpdateClientManager(this.ClientViewModel).subscribe((data) => {
          if (this.ClientViewModel.QBClientID != null) {
            this.ClientViewModel.ClientName = this.ClientViewModel.ClientName;
            this.ClientViewModel.UserID = this.ClientViewModel.Users.UserId;
            this.commonservice.QBIncomeAcct(this.ClientViewModel).subscribe(() => { })
          }
          this.toester.successToastr('Client Updated Successfully')
          this.router.navigate(['/admin'])
        })
      } else {

        // let prefix = "CRMV4_";
        // let ClientDBName = prefix + this.ClientViewModel.ClientID.toLowerCase();
        // this.service.IsDataBaseExists(ClientDBName).subscribe((data) => { console.log(data) })
        let prefix = "CRMV4_" + this.ClientViewModel.ClientID
        this.ClientViewModel.CompanyLogo = this.fileName
        this.ClientViewModel.LogoContent = this.base64textString
        this.ClientViewModel.ClientDBName = prefix;
        this.ClientViewModel.ClientID = prefix;
        this.ClientViewModel.Users.ClientDB = prefix;
        this.ClientViewModel.Users.RoleId = 1;

        if (this.ClientViewModel.Users.UserId == 0) {
          if (this.ClientViewModel?.IsCorporate == true) {
            this.ClientViewModel.IsCorporate = true;
          }
          if (this.ClientViewModel.IsCorporate == null) {
            this.ClientViewModel.IsCorporate = false;
          }
        }
        this.ClientViewModel.IsCorporate = (this.ClientViewModel.QBClientID === "" || this.ClientViewModel.QBClientID === null) && (this.ClientViewModel.QBSecretID === "" || this.ClientViewModel.QBSecretID === null) ? false : this.ClientViewModel.IsCorporate;
        this.adminService.postClientManager(this.ClientViewModel).subscribe((data) => {
          if (data != null) {
            if (this.ClientViewModel.ClientID != null) {
              this.commonservice.GetClientDetailsById(this.ClientViewModel.ClientID).subscribe((JsonClientdetails: any) => {

                this.ClientViewModel.ClientNumber = JsonClientdetails.ClientNumber;
                this.ClientViewModel.ClientName = JsonClientdetails.ClientID;
              })
            }
            if (this.ClientViewModel.QBClientID != null && this.ClientViewModel.QBSecretID != null) {


              this.ClientViewModel.QBClientID = this.ClientViewModel.QBClientID,
                this.ClientViewModel.QBSecretID = this.ClientViewModel.QBSecretID,
                this.ClientViewModel.ClientName = this.ClientViewModel.ClientName,
                this.ClientViewModel.QBBankAccnt = this.ClientViewModel.QBBankAccnt,
                this.ClientViewModel.QBAcctReceivable = this.ClientViewModel.QBAcctReceivable,
                this.ClientViewModel.QBSaleTaxAcct = this.ClientViewModel.QBSaleTaxAcct,
                this.ClientViewModel.QBSalesAcct = this.ClientViewModel.QBSalesAcct,
                this.ClientViewModel.BankAcctNum = this.ClientViewModel.BankAcctNum,
                this.ClientViewModel.ReceivableAcctNum = this.ClientViewModel.ReceivableAcctNum,
                this.ClientViewModel.SalesAcctNum = this.ClientViewModel.SalesAcctNum,
                this.ClientViewModel.SalesTaxAcctNum = this.ClientViewModel.SalesTaxAcctNum,
                this.ClientViewModel.ClientNumber = this.ClientViewModel.ClientNumber,
                this.ClientViewModel.UserID = '1',
                this.ClientViewModel.QBId = this.ClientViewModel.QBId,
                this.ClientViewModel.IsCorporate = true
              this.GetQBAuthorizationClientcode(this.ClientViewModel);
            }
            this.toester.successToastr("Client Created Successfully");
            this.router.navigate(["/admin"]);
          }
          else {
            this.toester.errorToastr("Client Created Failed");
          }
        })
      }
    }

  }

  CheckDbExists(clientId) {
    let prefix = "CRM_"
    let ClientDBName = prefix + clientId
    // this.ClientViewModel.ClientDBName = ClientDBName;
    this.adminService.IsDataBaseExists(ClientDBName).subscribe((data) => {
      console.log(data)
    })
  }

  onEmailChange(event) {
    this.ClientViewModel.Users.LoginId = event
  }
  GetQBAuthorizationClientcode(clientObj: ClientViewModel) {

    var Accoutid = "undefined";
    var AccountName = "undefined";
    clientObj.QBBankAccnt = clientObj.QBBankAccnt == null ? null : clientObj.QBBankAccnt.trim();
    clientObj.QBAcctReceivable = clientObj.QBAcctReceivable == null ? null : clientObj.QBAcctReceivable.trim();
    clientObj.QBSaleTaxAcct = clientObj.QBSaleTaxAcct == null ? null : clientObj.QBSaleTaxAcct.trim();
    clientObj.QBSalesAcct = clientObj.QBSalesAcct == null ? null : clientObj.QBSalesAcct.trim();
    clientObj.BankAcctNum = clientObj.BankAcctNum == null ? null : clientObj.BankAcctNum
    clientObj.ReceivableAcctNum = clientObj.ReceivableAcctNum == null ? null : clientObj.ReceivableAcctNum
    clientObj.SalesTaxAcctNum = clientObj.SalesTaxAcctNum == null ? null : clientObj.SalesTaxAcctNum
    clientObj.SalesAcctNum = clientObj.SalesAcctNum == null ? null : clientObj.SalesAcctNum
    clientObj.QBClientID = clientObj.QBClientID == null ? null : clientObj.QBClientID.trim();
    clientObj.QBSecretID = clientObj.QBSecretID == null ? null : clientObj.QBSecretID.trim();

    if (clientObj.ClientName != null) {
      this.commonservice.GetClientDetailsById(clientObj.ClientName).subscribe((objclienttype: any) => {

        clientObj.ClientNumber = objclienttype.ClientNumber;
      })
    }
    clientObj.QBStateToken = this.generateGuid()
    this.commonservice.QBIncomeAcct(clientObj).subscribe((resepone) => { })
  }

  generateGuid(): string {
    // This function generates a GUID.
    // You can use a library for this purpose or implement your own logic.
    // Here, I'm providing a simple example.
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    return `${s4()}${s4()}-R${s4()}-R${s4()}-R${s4()}-R${s4()}${s4()}${s4()}`;
  }
}


