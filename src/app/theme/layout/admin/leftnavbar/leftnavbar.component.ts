import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import de from 'date-fns/esm/locale/de/index';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-leftnavbar',
  templateUrl: './leftnavbar.component.html',
  styleUrls: ['./leftnavbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', display: 'block' }),
        animate('250ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [animate('250ms ease-in', style({ transform: 'translateY(-100%)' }))])
    ])
  ]
})
export class LeftnavbarComponent implements OnInit {
  roleId: any;
  accessMenufilter: any;
  ismenuID: any;
  isHide: any;
  isHome: boolean = false;
  isDash: boolean = false;
  isCRM: boolean;
  isSetup: boolean;
  isManage: boolean;
  isBilling: boolean;
  isEmail: boolean;
  isReports: boolean;

  public visible;

  public themeLayout: string;
  isLeads: boolean;
  isCompanies: boolean;
  isContacts: boolean;
  isOpportunities: boolean;
  isCustomFields: boolean;
  isActivities: boolean;
  isNotifications: boolean;
  isEmailDashBoard: boolean;
  isTriggeredCampaigns: boolean;
  isLists: boolean;
  isUsers: boolean;
  isAMS: boolean;
  isContactType: boolean;
  isUserRoles: boolean;
  isLeadSources: boolean;
  isBuyingStage: boolean;
  isOppType: boolean;
  isActivityType: boolean;
  isPriority: boolean;
  isCompanyType: boolean;
  isCompanyIndustry: boolean;
  isStatus: boolean;
  isCompanyOwnershipType: boolean;
  isDepartment: boolean;
  isCampaignEmails: boolean;
  isEstimateInvoice: boolean;
  isInvoice: boolean;
  isPayments: boolean;
  isItems: boolean;
  constructor(private route: Router, private as: AuthenticationService, private cr: ClaimsHelper) {
    this.roleId = this.cr.GetRoleIdAPIKeyFromClaims();
  }

  ngOnInit(): void {
    this.GetAllmenuesbyroleid()
  }

  GetAllmenuesbyroleid() {
    this.as.getAccessmenuApiGetMenuByRoleId(this.roleId).subscribe(res => {
      this.accessMenufilter = res;
      if (res) {
        // Define the mapping between MenuId and boolean variables
        const menuIdMap = {
          1: 'isHome',
          2: 'isDash',
          3: 'isCRM',
          5: 'isSetup',
          6: 'isManage',
          7: 'isLeads',
          8: 'isCompanies',
          9: 'isContacts',
          10: 'isOpportunities',
          12: 'isUsers',
          13: 'isCustomFields',
          14: 'isAMS',
          16: 'isActivities',
          19: 'isContactType',
          20: 'isNotifications',
          21: 'isUserRoles',
          22: 'isLeadSources',
          23: 'isReports',
          24: 'isBuyingStage',
          25: 'isOppType',
          26: 'isContactType',
          27: 'isActivityType',
          28: 'isPriority',
          29: 'isCompanyType',
          30: 'isCompanyIndustry',
          31: 'isStatus',
          32: 'isCompanyOwnershipType',
          33: 'isEmail',
          35: 'isEmailDashBoard',
          36: 'isTriggeredCampaigns',
          37: 'isLists',
          38: 'isBilling',
          39: 'isEstimateInvoice',
          40: 'isInvoice',
          41: 'isPayments',
          42: 'isItems',
          43: 'isDepartment',
          45: 'isCampaignEmails'
        };

        // Iterate over accessMenufilter and update the corresponding boolean variables
        this.accessMenufilter.forEach(data => {
          const menuId = data.MenuId;
          const propertyName = menuIdMap[menuId];
          if (propertyName) {
            this[propertyName] = true;
          }
        });

      }

    })
  }

  navCollapse(e) {
    

    let parent = e.target;
    if (this.themeLayout === 'vertical') {
      parent = parent.parentElement;
    }
    
    let firstParent = parent.parentElement;
    let preParent = parent.parentElement.parentElement;
    
    const sections = document.querySelectorAll('.pcoded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] !== firstParent && sections[i] !== preParent) {
        sections[i].classList.remove('pcoded-trigger');
      }
    }
    
    if (firstParent.classList.contains('pcoded-hasmenu')) {
      firstParent.classList.toggle('pcoded-trigger');
      firstParent = firstParent.parentElement.parentElement.parentElement;
    } else if (preParent.classList.contains('pcoded-submenu')) {
      preParent.parentElement.classList.toggle('pcoded-trigger');
      preParent = preParent.parentElement.parentElement.parentElement;
    }
   

  }


}

