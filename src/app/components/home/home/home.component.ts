import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ClientViewModel } from 'src/app/models/IClientViewModel';
import { OAuthQuickBookService } from 'src/app/services/OAuthquickbook.Service';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  clientObj: ClientViewModel = new ClientViewModel()
  constructor(private oauthquckbookService: OAuthQuickBookService,
    public route: ActivatedRoute,
    public claimsHelper: ClaimsHelper,
    public commonservice: CommonService,
    private spinner: NgxSpinnerService) {
    this.spinner.show()
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner.hide()
    }, 5000)
    // if (localStorage.getItem("QBAccessToken") == null || localStorage.getItem("QBAccessToken") == "undefined") {

    //   this.GetQuickBookParamsAuthication()
    // }
  }
  GetQuickBookParamsAuthication() {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      const state = params['state'];
      const realmId = params['realmId'];
      localStorage.setItem('code', code)
      localStorage.setItem('state', state)
      localStorage.setItem('realmId', realmId)
      if (code) {
        var Userid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
        var clientId = localStorage.getItem("ClientId")
        this.commonservice.GetQBLoginIncomeAcct(Userid, clientId).subscribe((userModel: ClientViewModel) => {
          this.clientObj = userModel
          if (this.clientObj.QBClientID != null && this.clientObj.QBSecretID != null && this.clientObj.IsCorporate == true) {
            const formData = new FormData();
            formData.append("Decrypt", this.clientObj.QBSecretID);
            this.commonservice.PostDecrypt(formData).subscribe((QBSecretID: any) => {
              this.clientObj.QBSecretID = QBSecretID
              this.oauthquckbookService.GettingQuickBookAuthenticationToken(code, this.clientObj.QBClientID, this.clientObj.QBSecretID).subscribe((data: any) => {
                var QBObj = JSON.parse(data)
                localStorage.setItem("QBAccessToken", QBObj['access_token'])
              })
            })
          }
        })
      }
    });
  }

}
