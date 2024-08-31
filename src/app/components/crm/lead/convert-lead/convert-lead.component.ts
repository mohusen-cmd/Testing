import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AccountListDomainModel, LeadsDetailsDomainModel, StageDomainModel } from 'src/app/models/ILeadsDetailsDomainModel';
import { LeadService } from 'src/app/services/lead.service';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';

@Component({
  selector: 'app-convert-lead',
  templateUrl: './convert-lead.component.html',
  styleUrls: ['./convert-lead.component.scss']
})
export class ConvertLeadComponent implements OnInit {
  public maskDateAuto = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public maskDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');
  AccModel: LeadsDetailsDomainModel = new LeadsDetailsDomainModel();
  LeadId: any;
  newopportunityshow: boolean = false;
  attachPathList: any = [];
  constructor(private toastr: ToastrManager, private claimsHelper: ClaimsHelper, private router: Router, private route: ActivatedRoute, private leadService: LeadService) {

  }

  ngOnInit(): void {
    this.AccModel.AccountObj = new AccountListDomainModel()
    this.AccModel.LeadDispoObj;
    this.route.paramMap.subscribe(params => {
      this.LeadId = params.get("Id");
     })
    this.leadService.GetLeadsLeadsApiLeadDetailsEdit(this.LeadId, 1).subscribe((res: LeadsDetailsDomainModel) => {
      this.AccModel = res;
    })
    let isStatus = 0;
    let actTypeId = 1;
    let attachmentid = this.LeadId;
    let module = "Leads";
    this.leadService.GetFilePathList(attachmentid, module).subscribe(res => { })
    this.leadService.GetStageList(isStatus, actTypeId).subscribe((res: StageDomainModel[]) => {
      this.AccModel.StageList = res;
    })
  }



  ConvertLeads() {
    this.AccModel.RoleId =this.claimsHelper.GetRoleIdAPIKeyFromClaims();
    this.AccModel.UserId =this.claimsHelper.GetUserIdAPIKeyFromClaims();
    this.AccModel.UserName =this.claimsHelper.GetUserNameAPIKeyFromClaims();
    this.AccModel.attachmentfileslist =this.attachPathList;
    this.AccModel.AccountObj.AccountTypeId = 2
    this.AccModel.AccountObj.IsContactActive = true;
    this.AccModel.AccountObj.IsOpportunity = true;
    this.leadService.InsertLeadDetails(this.AccModel).subscribe(res => {
      this.toastr.successToastr("Lead Converted Successfully.",'success'); 
      this.router.navigate(["CRM/leads/"]).then(nav => { 
        console.log(nav); 
      }, err => {     
        console.log(err) 
      });  
      
      
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  updateDate(event) {
    return event;
  }

  IsOpprtunitycheck(event) {
    if (event) {
      this.newopportunityshow = true;
      let isStatus = 0;
      let actTypeId = 4;
      this.leadService.GetStageList(isStatus, actTypeId).subscribe((res: StageDomainModel[]) => {

        this.AccModel.StageList = res;
        this.AccModel.AccountObj.OppName = this.AccModel.AccountObj.CompanyName + " -";
        this.AccModel.AccountObj.StageID = 4124;
        this.AccModel.AccountObj.IsOpportunity = true;
      })
    }
    else {
      this.newopportunityshow = false;
    }
  }

  BackToLeadView()
  {
    
    this.router.navigate(["CRM/leads/viewleads/",this.LeadId,{vname:"Leads", tname:'Leads'}]).then(nav => { 
      console.log(nav); 
    }, err => {     
      console.log(err) 
    }); 
  }

}
