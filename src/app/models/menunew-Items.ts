import {Injectable} from '@angular/core';

export interface BadgeItemNew {
  type: string;
  value: string;
}

export interface ChildrenItemsNew {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItemsNew[];
}

export class MainMenuItemsNew {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItemNew[];
  children?: ChildrenItemsNew[];
  CanShow:boolean;
  CanRead:boolean;
  CanCreate:boolean;
  CanEdit:boolean;
  CanDelete:boolean;
  NavigateURL:string;
}

export class MenuNew {
  label: string;
  main: MainMenuItemsNew[];
}

// const MENUITEMSNew = [
//   {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'home',
//         short_label: 'H',
//         name: 'Home',
//         type: 'link',
//         icon: 'fa fa-home'
//       },
//       {
//         state: 'dashboard',
//         short_label: 'D',
//         name: 'Dashboard',
//         type: 'link',
//         icon: 'fa fa-tachometer',   
//       },
//       {
//         state: 'CRM',
//         short_label: 'C',
//         name: 'CRM',
//         type: 'sub',
//         icon: 'fa fa-th',
//         children: [
//           {
//             state: 'leads',
//             name: 'Leads'
//           },
//           {
//             state: 'companies',
//             name: 'Companies'
//           },
//           {
//             state: 'contacts',
//             name: 'Contacts'
//           },  
//           {
//             state: 'opportunities',
//             name: 'Opportunities'
//           },
//           {
//             state: 'activities',
//             name: 'Activities'
//           },
//           {
//             state: 'notifications',
//             name: 'Notifications'
//           }           
//         ]
//       },
//       {
//         state: 'Setup',
//         short_label: 'C',
//         name: 'Setup',
//         type: 'sub',
//         icon: 'fa fa-cog',
//         children: [
//           {
//             state: 'users',
//             name: 'Users'
//           },
//           {
//             state: 'accessmenussetup',
//             name: 'Access Menus Setup'
//           },
//           {
//             state: 'userroles',
//             name: 'User Roles'
//           },  
//           {
//             state: 'leadopportunitysource',
//             name: 'Lead/Opportunity Source'
//           },
//           {
//             state: 'buyingstageleadstatus',
//             name: 'Buying Stage/Lead Status'
//           },
//           {
//             state: 'opportunitytype',
//             name: 'Opportunity Type'
//           },
//           {
//             state: 'prioritytype',
//             name: 'Priority'
//           },  
//           {
//             state: 'contacttype',
//             name: 'Contact Type'
//           },
//           {
//             state: 'activitytype',
//             name: 'Activity Type'
//           },
//           {
//             state: 'companytype',
//             name: 'Company Type'
//           },
//           {
//             state: 'companyindustry',
//             name: 'Company Industry'
//           },
//           {
//             state: 'status',
//             name: 'Status'
//           },
//           {
//             state: 'companyownershiptype',
//             name: 'Ownership Type'
//           },
//           {
//             state: 'department',
//             name: 'Department'
//           }                         
//         ]
//       },
//       {
//         state: 'Manage',
//         short_label: 'm',
//         name: 'Manage',
//         type: 'sub',
//         icon: 'fa fa-wrench',
//         children: [
//           {
//             state: 'customfields',
//             name: 'Custom Fields'
//           }          
//         ]
//       },

//       {
//         state: 'Email',
//         short_label: 'E',
//         name: 'Email',
//         type: 'sub',
//         icon: 'fa fa-inbox',
//         children: [
//           {
//             state: 'emaildashboard',
//             name: 'Email DashBoard'
//           },
//           {
//             state: 'triggeredcampaigns',
//             name: 'Triggered Campaigns'
//           },
//           {
//             state: 'list',
//             name: 'Lists'
//           }            
//         ]
//       }
//     ],
//   },
// ];

const MENUITEMSNew= [
  {
    label: 'Navigation',
    main: [         
      {
        state: 'admin',
        short_label: 'S',
        main_state: 'admin',
        name: 'ClientManager',
        type: 'link',
        icon: 'feather icon-home'
      }  
    ]     
  }
];
@Injectable()
export class MenuItemsNew {
    

  getAll(MENUITEMSNEW): MenuNew[] {
    //this.MenuNew.label="ggg";
    return MENUITEMSNEW;
  }
}
// export class MenuItemsNew {
//   getAll(): MenuNew[] {
//     return MENUITEMSNew;
//   }
// }
