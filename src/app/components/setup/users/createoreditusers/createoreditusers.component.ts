import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { UserModel } from 'src/app/models/IUser';
import { IuserDetailsModel } from 'src/app/models/iuser-details-model';
import { InvoiceService } from 'src/app/services/Invoice.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createoreditusers',
  templateUrl: './createoreditusers.component.html',
  styleUrls: ['./createoreditusers.component.scss']
})
export class CreateoreditusersComponent implements OnInit {
  registerForm: FormGroup
  usersDetails: any = [];
  userid: any;
  usermodel: UserModel = new UserModel();
  list: any;
  submitted: boolean = false
  constructor(
    public activatedRoute: ActivatedRoute,
    public routerlink: Router,
    public fb: FormBuilder,
    public toastr: ToastrManager,
    private userService: UserService,
    public commonservice: CommonService,
    public claimsHelper: ClaimsHelper,
    public invoiceservice: InvoiceService,
    private spinner: NgxSpinnerService) {
    this.usersDetails.Users = {};
    this.usersDetails.Users.Rolelist = [];
    this.usersDetails.Users = {};
    this.usersDetails.Users.Rolelist = [];
    this.activatedRoute.queryParamMap.subscribe(queryparams => {

      this.userid = queryparams.get("UserId")
      if (this.userid == 0) {
        this.spinner.show()
        this.userService.GetUserDetailsById(this.userid).subscribe((result) => {
          this.spinner.hide()
          this.usersDetails = result;
          this.usersDetails.Users = this.usersDetails.Users;
          if (this.usersDetails.Users.UserId == 0) {
            this.usersDetails.Users.QId = "1";
            this.usersDetails.Users.Country = 1
            this.usersDetails.Users.RoleId = 3
            this.usersDetails.Users.StateCode = "AL"
          }
        }, (error) => {
          this.spinner.hide()
        })
      }

      if (this.userid != 0) {
        this.spinner.show()
        this.userService.GetUserDetailsById(this.userid).subscribe((result) => {
          this.spinner.hide()
          this.usersDetails = result;
          //this.usersDetails.Users = this.usersDetails.Users;
          if (this.usersDetails['Users'].Password != null || this.usersDetails['Users'].Password != undefined) {

            const formData = new FormData();
            formData.append("Decrypt", this.usersDetails['Users'].Password);
            this.commonservice.PostDecrypt(formData).subscribe((resepone: any) => {
              this.usersDetails['Users'].Password = resepone
            })
          }

          if (this.usersDetails.Users.IsCorporate == true) {


            var ClientName = localStorage.getItem("ClientId")
            var JsonQBUserModel;
            if (this.userid == 1) {
              this.commonservice.GetQBLoginIncomeAcct(this.userid, ClientName).subscribe((response: any) => {
                JsonQBUserModel = response
                if (JsonQBUserModel != null) {
                  var userQBModel = JsonQBUserModel
                  this.usersDetails.QBClientID = userQBModel.QBClientID;
                  // this.usersDetails.QBSecretID = SecretManager.Decrypt(userQBModel.QBSecretID);
                  this.usersDetails.QBSalesAcct = userQBModel.QBSalesAcct;
                  this.usersDetails.QBBankAccnt = userQBModel.QBBankAccnt;
                  this.usersDetails.QBAcctReceivable = userQBModel.QBAcctReceivable;
                  this.usersDetails.QBSaleTaxAcct = userQBModel.QBSaleTaxAcct;
                  this.usersDetails.QBSalesAcct = userQBModel.QBSalesAcct;
                  this.usersDetails.BankAcctNum = userQBModel.BankAcctNum;
                  this.usersDetails.SalesAcctNum = userQBModel.SalesAcctNum;
                  this.usersDetails.SalesTaxAcctNum = userQBModel.SalesTaxAcctNum;
                  this.usersDetails.ReceivableAcctNum = userQBModel.ReceivableAcctNum;
                  this.usersDetails.IsCorporate = true;
                  this.usersDetails.QBId = userQBModel.QBId;
                  const formData = new FormData();
                  formData.append("Decrypt", userQBModel.QBSecretID);
                  this.commonservice.PostDecrypt(formData).subscribe((resepone: any) => {
                    this.usersDetails.QBSecretID = resepone

                  },
                  )

                }
              })
            }
            else {
              this.invoiceservice.GetQBLoginUserAcct(this.userid, ClientName).subscribe((response: any) => {
                JsonQBUserModel = response
                if (JsonQBUserModel != null) {
                  var userQBModel = JsonQBUserModel
                  this.usersDetails.QBClientID = userQBModel.QBClientID;
                  // this.usersDetails.QBSecretID = SecretManager.Decrypt(userQBModel.QBSecretID);
                  this.usersDetails.QBSalesAcct = userQBModel.QBSalesAcct;
                  this.usersDetails.QBBankAccnt = userQBModel.QBBankAccnt;
                  this.usersDetails.QBAcctReceivable = userQBModel.QBAcctReceivable;
                  this.usersDetails.QBSaleTaxAcct = userQBModel.QBSaleTaxAcct;
                  this.usersDetails.QBSalesAcct = userQBModel.QBSalesAcct;
                  this.usersDetails.BankAcctNum = userQBModel.BankAcctNum;
                  this.usersDetails.SalesAcctNum = userQBModel.SalesAcctNum;
                  this.usersDetails.SalesTaxAcctNum = userQBModel.SalesTaxAcctNum;
                  this.usersDetails.ReceivableAcctNum = userQBModel.ReceivableAcctNum;
                  this.usersDetails.IsCorporate = true;
                  this.usersDetails.QBId = userQBModel.QBId;
                  const formData = new FormData();
                  formData.append("Decrypt", userQBModel.QBSecretID);
                  this.commonservice.PostDecrypt(formData).subscribe((resepone: any) => {
                    this.usersDetails.QBSecretID = resepone
                  },
                  )
                }
              })
            }
          }

        }, (error) => {
          this.spinner.hide()
        })
      }
    })
  }

  ngOnInit(): void {
    //this.usersDetails.Users = new IuserDetailsModel()

    this.registerForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      middlename: new FormControl(''),
      role: new FormControl('', Validators.required),
      //phone : new FormControl('',) ,  
      phone: new FormControl('', Validators.required,),
      phoneext: new FormControl(''),
      address1: new FormControl('', Validators.required),
      address2: new FormControl(''),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      email: new FormControl('', { validators: [Validators.required], updateOn: "blur" }),
      zipcode: new FormControl(''),
      fax: new FormControl(''),
      cellno: new FormControl(''),
      additionalemail: new FormControl(''),
      loginid: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
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

  }

  get f() {
    return this.registerForm.controls
  }

  onSaveClick() {

    this.usersDetails.Users;
    this.usersDetails.Users.LoginId = this.usersDetails.Users.Email;
    this.submitted = true;
    var Statetoken = this.generateGuid().replace(/-/g, 'R');
    var ClientName = localStorage.getItem("ClientId")
    this.usersDetails.QBStateToken = Statetoken;
    if (ClientName != null) {
      this.commonservice.GetClientDetailsById(ClientName).subscribe((JsonClientdetails: ClientViewModel) => {
        this.usersDetails.ClientNumber = JsonClientdetails.ClientNumber;
        this.usersDetails.ClientName = ClientName
        if (this.usersDetails.IsCorporate == true) {
          this.usersDetails.Users.IsCorporate = true;
          this.usersDetails.IsCorporate = this.usersDetails.Users.IsCorporate;
        }
       if (this.usersDetails.IsCorporate == null ?? false) {
          this.usersDetails.Users.IsCorporate = false;
          this.usersDetails.IsCorporate = this.usersDetails.Users.IsCorporate;
        }
        if (this.usersDetails.Users.UserId == 0) {

          if (this.usersDetails.IsCorporate == true) {
            this.usersDetails.IsCorporate = true;
          }
          if (this.usersDetails.IsCorporate == null) {
            this.usersDetails.IsCorporate = false;
          }
          if (this.usersDetails.Users.UserId == 0 && this.registerForm.valid) {

            // this.usersDetails.Users = this.usermodel.users

            this.usersDetails.IsCorporate = (this.usersDetails.QBClientID === "" || this.usersDetails.QBClientID === null) &&
              (this.usersDetails.QBSecretID === "" || this.usersDetails.QBSecretID === null) ? false : this.usersDetails.IsCorporate;

            this.userService.AddorEditUser(this.usersDetails).subscribe((result: any) => {

              this.usersDetails.Userid = result.Userid
              if (this.usersDetails.IsCorporate == true) {
                result.Userid = result.Userid > 0 ? result.Userid : result.Userid;
                this.usersDetails.QBBankAccnt = this.usersDetails.QBBankAccnt == null ? null : this.usersDetails.QBBankAccnt.trim();
                this.usersDetails.QBAcctReceivable = this.usersDetails.QBAcctReceivable == null ? null : this.usersDetails.QBAcctReceivable.trim();
                this.usersDetails.QBSaleTaxAcct = this.usersDetails.QBSaleTaxAcct == null ? null : this.usersDetails.QBSaleTaxAcct.trim();
                this.usersDetails.QBSalesAcct = this.usersDetails.QBSalesAcct == null ? null : this.usersDetails.QBSalesAcct.trim();
                this.usersDetails.BankAcctNum = this.usersDetails.BankAcctNum == null ? null : this.usersDetails.BankAcctNum.trim();
                this.usersDetails.ReceivableAcctNum = this.usersDetails.ReceivableAcctNum == null ? null : this.usersDetails.ReceivableAcctNum.trim();
                this.usersDetails.SalesTaxAcctNum = this.usersDetails.SalesTaxAcctNum == null ? null : this.usersDetails.SalesTaxAcctNum.trim();
                this.usersDetails.SalesAcctNum = this.usersDetails.SalesAcctNum == null ? null : this.usersDetails.SalesAcctNum.trim();
                this.usersDetails.QBClientID = this.usersDetails.QBClientID == null ? null : this.usersDetails.QBClientID.trim();
                this.usersDetails.QBSecretID = this.usersDetails.QBSecretID == null ? null : this.usersDetails.QBSecretID.trim();
                this.usersDetails.ClientName = ClientName;
                this.usersDetails.ClientNumber = this.usersDetails.ClientNumber;
                this.usersDetails.QBStateToken = Statetoken;
                this.usersDetails.UserID = result.Userid;
                this.userService.QBIncomeAcct(this.usersDetails).subscribe((response: any) => { })
              }
              this.routerlink.navigate(["/Setup/User/UserList"]).then(nav => {
                console.log(nav); // true if navigation is successful
                this.toastr.successToastr("User Details Created Successfully", 'success')
              }, err => {
                // when there's an error
              });
            });
          }
        }
        else if (this.usersDetails.Users.UserId != 0 && this.registerForm.valid) {
          //this.usersDetails.Users = this.usersDetails.users
          this.usersDetails.QBStateToken = null
          this.userService.updateuserdata(this.usersDetails).subscribe((result: any) => {

            this.usersDetails.ClientName = ClientName;
            this.usersDetails.ClientNumber = this.usersDetails.ClientNumber;
            this.usersDetails.QBStateToken = Statetoken;
            this.usersDetails.UserID = result.Users.UserId;
            this.usersDetails.IsCorporate = (this.usersDetails.QBClientID == "" || this.usersDetails.QBClientID == null) &&
              (this.usersDetails.QBSecretID == "" || this.usersDetails.QBSecretID == null) ? false : this.usersDetails.IsCorporate;
            if (this.usersDetails.IsCorporate == true) {
              this.userService.QBIncomeAcct(this.usersDetails).subscribe((response) => { })
            }
            this.routerlink.navigate(["/Setup/User/UserList"]).then(nav => {
              console.log(nav); // true if navigation is successful
              this.toastr.successToastr("User Details Updated Successfully", 'success')
            }, err => {
              // when there's an error
            });
          });
        }
      })
    }
  }

  onBacktoMain() {
    this.routerlink.navigate(['/Setup/User/UserList']);
  }
  onchange(event) {
    this.usersDetails.Users.LoginId = event.target.value
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

