import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ClaimsHelper } from 'src/app/login/claimshelper';

@Component({
  selector: 'app-invoicemailing-template',
  templateUrl: './invoicemailing-template.component.html',
  styleUrls: ['./invoicemailing-template.component.scss']
})
export class InvoicemailingTemplateComponent implements OnInit  {
  @ViewChild('InvoiceMailTemplate') InvoiceMailTemplateRef: ElementRef;
  @Input() companylogo: string;
  @Input() model: any = {}; // Replace 'any' with the actual type of your model data
  @Input() userDetails: any = {}; // Replace 'any' with the actual type of user details data
  @Input() InvoceObj: any = {}; // Replace 'any' with the actual type of estimate invoice details data
  @Input() billingaddress: string; // Replace 'string' with the actual type of billing address
  @Input() clientDetails:any={}
  UserId:number
  BearerToken:string
  constructor(private claimsHelper: ClaimsHelper ) {
    this.UserId= +claimsHelper.GetUserIdAPIKeyFromClaims()
    this.BearerToken= localStorage.getItem("token")
  }

  ngOnInit() {
    // Initialize userDetails with default values if not provided
    this.userDetails = this.userDetails || {};
  }
}
