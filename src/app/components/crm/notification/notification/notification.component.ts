import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  dtOptions:any = {};
  jtSorting:any="";
  RecordCount:any=0;
  AlphanumericSort:any="undefined";
  loginid:any;
  notifications: any=[];
  constructor(private router: Router,private notificationService: NotificationService,private claimsHelper:ClaimsHelper,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    
    this.GetNotificationDataTableBinding()
  }
  GetNotificationDataTableBinding()
  {
    
    
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching:false,
      pageLength: 10,
      serverSide: true,
      processing: true,   
      autoWidth:false,
      
     ajax: (dataTablesParameters: any, callback) => {
      this.spinner.show();
       if(dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 1)
       {
          this.jtSorting ="CreatedDate" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 2)
       { 
          this.jtSorting ="DueDate" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 3)
       { 
          this.jtSorting ="CompanyName" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 4)
       { 
         this.jtSorting ="PriorityName" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 5)
       { 
          this.jtSorting ="StatusName" +" "+ dataTablesParameters.order[0].dir;
       } 
       else if (dataTablesParameters.order[0].column == 6)
       { 
          this.jtSorting ="Subject" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 7)
       { 
          this.jtSorting ="ContactName" +" "+ dataTablesParameters.order[0].dir;
       }  
       else if (dataTablesParameters.order[0].column == 8)
       { 
          this.jtSorting ="CompanyName" +" "+ dataTablesParameters.order[0].dir;
       } 
       else if (dataTablesParameters.order[0].column == 9)
       { 
          this.jtSorting ="Phone" +" "+ dataTablesParameters.order[0].dir;
       } 
       else if (dataTablesParameters.order[0].column == 10)
       { 
          this.jtSorting ="Email" +" "+ dataTablesParameters.order[0].dir;
       } 
       else if (dataTablesParameters.order[0].column == 11)
       { 
          this.jtSorting ="AccountTypeName" +" "+ dataTablesParameters.order[0].dir;
       } 
       this.loginid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
        that.notificationService.GetNotificationDetails(this.loginid,dataTablesParameters.start , dataTablesParameters.length,this.jtSorting,this.RecordCount).subscribe(resp => {
         
          var count=0;
         that.notifications = resp;
         if(that.notifications.length > 0)
         {
           count = resp[0].RecordCount;
         }
         else
         {
           count = 0;
         }        
          callback({
            recordsTotal: count,
            recordsFiltered: count,
            data: []
          });
          this.spinner.hide();
        },
        (err:AppError) => 
        { 
          this.spinner.hide();
          if(err instanceof BadInputError)
          {
            window.alert("Bad Request:" + err.originalError)
          }
          else if (err instanceof NotFoundError) 
          {
            window.alert("404 Error Occured!")
          }
          else
          {
           return throwError(err); 
          }
          });     
      },     
   columns: [
    {
      title: 'Activity Type',
      data: 'Name',
      width:1,
    }, 
    {
      title: 'Due Date',
      data: 'DueDate',
    }, 
    { 
      title: 'Priority', 
      data: 'PriorityName'
    }, 
    {
      title: 'Status', 
      data: 'StatusName'
    },
    {
      title: 'Subject',
      data: 'Subject',
      width:1,
    },
    {
      title: 'Contact',
      data: 'ContactName' ,
    },
    {
      title: 'Company',
      data: 'CompanyName' ,
    },
    {
      title: 'Phone',
      data: 'Phone' ,
    },
    {
      title: 'Email',
      data: 'Email' ,
    },
    {
      title: 'Module',
      data: 'AccountTypeName' ,
    }],
      responsive: true
    };
  }
  OpenNotificationDetail(notificationId,Moduleid)
  {
    
    let param = notificationId;
    let accounttype = "notifications";
    let moduleid = Moduleid;
     this.router.navigate(["CRM/activities/activityview/",param,moduleid,accounttype]).then(nav => { 
       console.log(nav); // true if navigation is successful
     }, err => {     
       console.log(err) // when there's an error
     }); 
  }

}

