import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ActivityViewModel } from 'src/app/models/IActivityViewModel';
import { ActivityService } from 'src/app/services/activity.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-activity-tab',
  templateUrl: './activity-tab.component.html',
  styleUrls: ['./activity-tab.component.scss']
})
export class ActivityTabComponent implements OnInit,AfterViewInit {
  @Input() activitysdata;
  @Output() valueChange = new EventEmitter();
  showtable:boolean=false;
  deletedids: any=[];
  Activitylist:ActivityViewModel[];
  viewName: any;
  tabName: any;
  companyId:any;
  
  constructor(private activityService:ActivityService,private activeRoute: ActivatedRoute,private router: Router,private claimsHelper:ClaimsHelper) { 
    
    this.showtable =false;
    this.activeRoute.params.subscribe(routeParams => {
      this.viewName = routeParams.vname;
      this.tabName =  routeParams.tname;
      this.companyId = routeParams.Id;
  });
  }
  ngOnInit() {
    
    this.Activitylist = this.activitysdata;
    this.showtable =true;;
  
  }
  
  ngAfterViewInit(): void {
    $('#activitiesTable').DataTable({
      paging: true,
      pageLength: 10,
      lengthChange: true,
      lengthMenu: [5, 10, 15, 20],
      searching: true,
      ordering: true,
      order: [[1, 'asc']] // Adjust column index based on your sorting preference
    });
  }
  DeleteActivities(ActivityID,CompanyID)
  {
    
    Swal.fire({
      title: 'Are you sure you want to delete this record?',
      text: "You are about to delete permanently!",
      backdrop:false,
      imageUrl:'',
      reverseButtons:true,
      showCancelButton: true,
      cancelButtonColor: '#ef4d4d',
      confirmButtonColor: '#448aff',         
    }).then((result) => {
      
      if (result.value) {
        this.deletedids.push(ActivityID);
        this.activityService.deleteActivityById(this.deletedids).subscribe(res =>{
          
          if(res)
          {
            Swal.fire({
              backdrop:false,
              title: 'Your Record has been deleted.',
              type: 'success',
              confirmButtonColor: '#448aff',
            }).then((result) => {
              
              if (result.value) {
                if(this.viewName == "Leads")
                {
                        let userid=this.claimsHelper.GetUserIdAPIKeyFromClaims();
                  this.valueChange.emit({leadid:this.companyId,userid:userid,pageIndex:0,pageSize:10,orderbyclause:"DueDate asc",totalPageCount:0});
                }
                else{
                  this.valueChange.emit({companyid:this.companyId,accountype:3,module:3,pageIndex:0,pageSize:10,orderbyclause:"DueDate asc",recordcount:0});
                }
               
              }
            })
          }
        })
      }
    })
  }
  NavigateAddNewActivity()
  {
 
  
  let companyid = this.activeRoute.snapshot.url[2].path
   if(this.viewName =="Contacts" )
   {
      let ModuleId="2",ModuleName="Contacts";
      this.router.navigate(["CRM/activities/activityaddnew/",companyid,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
       
        console.log(nav); 
       }, err => {
        console.log(err) 
      }); 
   }
   else if(this.viewName  == "Companies") {

    let ModuleId="3",ModuleName="Companies";
    this.router.navigate(["CRM/activities/activityaddnew/",companyid,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
     }, err => {
      console.log(err) 
    }); 
  
   }
   else if(this.viewName  == "Opportunities")
   {
    let ModuleId="4",ModuleName="Opportunities";
    this.router.navigate(["CRM/activities/activityaddnew/",companyid,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
     }, err => {
      console.log(err) 
    }); 
   }
   else if(this.viewName  == "Leads")
   {
    let Id = 0,ModuleId="1",ModuleName="Leads";
    this.router.navigate(["CRM/activities/activityaddnew/",companyid,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
     }, err => {
      console.log(err) 
    }); 
   }
   
  }

  NavigateViewActivities(event)
  {
    
    var moduleId;
    if (event.AccountTypeName == 'Leads') {
        moduleId = 1
    }
    else if (event.AccountTypeName == 'Contacts') {
        moduleId = 2
    }
    else if (event.AccountTypeName == 'Companies') {
        moduleId = 3
    }
    else if (event.AccountTypeName == 'Opportunities') {
        moduleId = 4
    }
    else { }
    this.router.navigate(["CRM/activities/activityview/",event.ActivityID,moduleId,event.AccountTypeName,{VMId:this.companyId,VMName:this.viewName}]).then(nav => { 
      console.log(nav); // true if navigation is successful
    }, err => {     
      console.log(err) // when there's an error
    }); 

  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [


];