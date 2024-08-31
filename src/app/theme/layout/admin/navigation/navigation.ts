import { Injectable } from '@angular/core';

export interface NavigationItem {
    id: string;
    title: string;
    type: 'item' | 'collapse' | 'group';
    translate?: string;
    icon?: string;
    hidden?: boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    external?: boolean;
    target?: boolean;
    breadcrumbs?: boolean;
    function?: any;
    badge?: {
        title?: string;
        type?: string;
    };
    children?: Navigation[];
}

export interface Navigation extends NavigationItem {
    children?: NavigationItem[];
}

const NavigationItems = [
    {
        id: 'navigation',
        title: 'Navigation',
        type: 'group',
        icon: 'feather icon-monitor',
        children: [
            {
                id: 'dashboard',
                title: 'Home',
                type: 'collapse',
                icon: 'feather icon-home',
                 
                children: [
                    {
                        id: 'default',
                        title: 'Default',
                        type: 'item',
                        url: '/membership/mshp-coupons'
                    },
              
                ]
            },
            {
                id: 'page-layouts',
                title: 'DashBoard',
                type: 'collapse',
                icon: 'feather icon-layout',
                children: [
                    {
                        id: 'vertical',
                        title: 'Main Dashboard',
                        type: 'item',
                        url: '/CRM/Dashboard/DashboardIndex',
                       
                    },
                    {
                        id: 'vertical',
                        title: 'Admin Dashboard',
                        type: 'item',
                        url: '/advance/notification',
                        breadcrumbs: false,
                        target: false
                    },
                    {
                        // id: 'horizontal-l2',
                        // title: 'Horizontal v2',
                        // type: 'item',
                        // url: '/layout/horizontal-l2',
                        // target: true
                    },
                    {
                        // id: 'horizontal-rtl',
                        // title: 'Horizontal RTL',
                        // type: 'item',
                        // url: '/layout/horizontal-rtl',
                        // target: true
                    },
                    {
                        // id: 'box-layout',
                        // title: 'Box Layout',
                        // type: 'item',
                        // url: '/layout/box',
                        // target: true
                    },
                    {
                        // id: 'light-layout',
                        // title: 'Light Layout',
                        // type: 'item',
                        // url: '/layout/light',
                        // target: true
                    },
                    {
                        // id: 'dark-layout',
                        // title: 'Dark Layout',
                        // type: 'item',
                        // url: '/layout/dark',
                        // target: true,
                        // badge: {
                        //     title: 'Hot',
                        //     type: 'badge-danger'
                        // }
                    }
                ]
            },
            {
                id: 'widget',
                title: 'CRM',
                type: 'collapse',
                icon: 'feather icon-grid',
                // badge: {
                //     title: '100+',
                //     type: 'badge-success'
                // },
                children: [
                    {
                        id: 'statistic',
                        title: 'Leads',
                        type: 'item',
                        url: '/CRM/Leads/List'
                    },
                    {
                        id: 'data',
                        title: 'Companies',
                        type: 'item',
                        url: '/CRM/ManageCompany/CompaniesList'
                        
                    },
                    {
                        id: 'chart',
                        title: 'Contacts',
                        type: 'item',
                        url: '/CRM/Contact/ContactList'
                    },
                    {
                        id: 'alert',
                        title: 'Opportunities',
                        type: 'item',
                        url: '/CRM/Opportunities/OpportunitiesList'
                    },
                    //temporarly commented activities and notifications
                    {
                        id: 'chart',
                        title: 'Activities',
                        type: 'item',
                        url: '/CRM/ManageCompany/ActivitygridBind'
                    },
                    {
                        id: 'chart',
                        title: 'Notifications',
                        type: 'item',
                        url: '/CRM/DashBoard/GetNotificationList'
                    }
                    
                ]
            },
             //temporarly commented users
            {
                id: 'users',
                title: 'Setup',
                type: 'collapse',
                icon: 'feather icon-settings',
                children: [
                    {
                        id: 'profile',
                        title: 'Users',
                        type: 'item',
                        url: 'Setup/User/UserList',
                        breadcrumbs: true
                    },
                    {
                        id: 'cards',
                        title: 'Access Menu Setup',
                        type: 'item',
                        url: '/Setup/AccessMenus/AccessMenuSetUp'
                    },
                    {
                        id: 'list',
                        title: 'User Roles',
                        type: 'item',
                        url: '/crm/list'
                    },
                    {
                        id: 'list',
                        title: 'Lead Sources/Opportunity Source',
                        type: 'item',
                        url: '/sis/sis-circular'
                    },
                    {
                        id: 'list',
                        title: 'Buying Stage/Lead Status',
                        type: 'item',
                        url: '/sis/sis-course'
                    },
                    {
                        id: 'list',
                        title: 'Opportunity Type',
                        type: 'item',
                        url: '/crypto/cp-ico'
                    },
                    {
                        id: 'list',
                        title: 'Priority',
                        type: 'item',
                        url: '/editor/wysiwyg'
                    },
                    {
                        id: 'list',
                        title: 'Contact Type',
                        type: 'item',
                        url: '/editor/tinymce'
                    },
                    {
                        id: 'list',
                        title: 'Activity Type',
                        type: 'item',
                        url: '/CRM/mshp-membership'
                    },
                    {
                        id: 'list',
                        title: 'Company Type',
                        type: 'item',
                        url: '/CRM/mshp-user'
                    },
                    {
                        id: 'list',
                        title: 'Company Industry',
                        type: 'item',
                        url: '/sample-page'
                    },
                    {
                        id: 'list',
                        title: 'Status',
                        type: 'item',
                        url: '/CRM/dashboard/alert'
                    },
                    {
                        id: 'list',
                        title: 'Company Ownership Type ',
                        type: 'item',
                        url: '/advance/rating'
                    },
                    {
                        id: 'list',
                        title: 'Campaign Email ',
                        type: 'item',
                        url: '/crypto/cp-dashboard'
                    },
                    {
                        id: 'list',
                        title: 'Department ',
                        type: 'item',
                        url: '/project-crm/pc-project'
                    }
                    
                ]
            },
            {
                id: 'users',
                title: 'Manage',
                type: 'collapse',
                icon: 'fa fa fa-wrench',
                children: [
                    {
                        id: 'profile',
                        title: 'Custom Fields ',
                        type: 'item',
                        url: '/helpdesk/hd-customer-detail',
                        breadcrumbs: false
                    },
                    
                ]
            },
            {
                id: 'users',
                title: 'Billing',
                type: 'collapse',
                icon: 'fa fa-inbox',
                children: [
                    {
                        id: 'profile',
                        title: 'Estimate Invoice',
                        type: 'item',
                        url: '/helpdesk/hd-ticket',
                        breadcrumbs: false
                    },
                    {
                        id: 'profile',
                        title: 'Invoice',
                        type: 'item',
                        url: '/helpdesk/hd-customer-list/Invoice',
                        breadcrumbs: false
                    },
                    {
                        id: 'profile',
                        title: 'payments',
                        type: 'item',
                        url: '/school/sch-student',
                        breadcrumbs: false
                    },
                    {
                        id: 'profile',
                        title: 'Items',
                        type: 'item',
                        url: '/school/sch-teacher',
                        breadcrumbs: false
                    }
                   
                    
                ]
            },
            {
                id: 'users',
                title: 'Reports',
                type: 'collapse',
                icon: 'fa fa-book',
                // url: '/users/profile',
                children: [
                    {
                        id: 'profile',
                        title: 'Default Reports',
                        type: 'item',
                        url: '/hospital/hosp-laboratory',
                        breadcrumbs: false
                     },
                    // {
                    //     id: 'cards',
                    //     title: 'Notifications',
                    //     type: 'item',
                    //     url: '/users/card'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'User Roles',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Lead Sources/Opportunity Source',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Buying Stage/Lead Status',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Opportunity Type',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Priority',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Contact Type',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Activity Type',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Company Type',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Company Industry',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Status',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Company Ownership Type ',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'Campaign Email ',
                    //     type: 'item',
                    //     url: '/users/list'
                    // },
                    // {
                    //     id: 'list',
                    //     title: 'User Roles',
                    //     type: 'item',
                    //     url: '/users/list'
                    // }
                    
                ]
            },
            {
                id: 'users',
                title: 'Email',
                type: 'collapse',
                icon: 'fa fa-envelope',
                children: [
                    {
                        id: 'profile',
                        title: 'Email Dashboard',
                        type: 'item',
                        url: '/CRM/dashboard/emailDashboard',
                        breadcrumbs: false
                    },
                    {
                        id: 'profile',
                        title: 'Triggered Campaigns',
                        type: 'item',
                        url: '/CRM/dashboard/emailDashboard/triggeredCampaigns',
                        breadcrumbs: false
                    },
                    {
                        id: 'profile',
                        title: 'List',
                        type: 'item',
                        url: '/advance/light-box',
                        breadcrumbs: false
                    },
                 
                   
                    
                ]
            },
        ]
    },
  
];

@Injectable()
export class NavigationItem {
    public get() {
        return NavigationItems;
    }
}
