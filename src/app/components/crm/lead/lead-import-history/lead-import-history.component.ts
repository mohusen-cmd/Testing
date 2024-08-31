import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { RoleMenuModel } from 'src/app/models/IRoleMenuModel';
import { UserModel } from 'src/app/models/IUser';
import { MainMenuItemsNew, MenuNew } from 'src/app/models/menunew-Items';
import { ImportService } from 'src/app/services/Import.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-lead-import-history',
  templateUrl: './lead-import-history.component.html',
  styleUrls: ['./lead-import-history.component.scss'],
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'visible',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        width: '280px',
        // transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '0',
        // transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class LeadImportHistoryComponent implements OnInit {
  moduleTypename: string="Leads"
  type: string;
  tiltle: string;
  
 




  constructor(public authenticationservice: AuthenticationService,
    public router: Router,
    public _DomSanitizer: DomSanitizer,
    public userService: AuthenticationService,
    public claimsHelper: ClaimsHelper,
    public route:ActivatedRoute,
    private importservice: ImportService) {

  }

  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get("type")
    })
    if (this.type == "Company") {
      this.tiltle = "Companies History";
      this.moduleTypename = 'Company';
    }
    else if (this.type == "Leads") {
      this.tiltle = "Leads History";
      this.moduleTypename = 'Leads';
    }
    else {
      this.tiltle = "Contacts History";
      this.moduleTypename = 'Contact';
    }
   // this.clientid=this.claimsHelper.GetClientDbAPIKeyFromClaims()
    // this.importservice.GetCompletedHistory(this.type, this.clientid).subscribe(res => {
    //   this.resultCompleted = res;
    //   this.resultCompleted.forEach(item => {
    //     if (item.ClientId == this.clientid) {
    //       this.completedHistory.push(item);
    //     }
    //   });
    // }
    // )
    // this.authenticationservice.getpendinghistory(this.status1, this.status2, this.moduleTypename, this.clientid).subscribe((data) => {
    //   console.log(data);
    //   this.isLoading = false;
    //   this.pagedata = data;
    //   this.dataSource.data = this.pagedata;
    //   this.resultLength = data.length;
    //   this.dataSource.data = this.pagedata;
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort

    // })
    // let RoleId = this.claimsHelper.GetRoleIdAPIKeyFromClaims()
    // //this.GetMenusbyRoleid(RoleId)
  }

 


 

}
