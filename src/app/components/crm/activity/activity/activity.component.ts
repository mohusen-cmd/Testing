import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ActivityService } from 'src/app/services/activity.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  dtOptions:any = {};
  alphanumericsort:string = "undefined"; 
  searchcolumn:string = "FirstName"; 
  SortingColumns:string = "ID Desc"; 
  Statusid=0
  activitykeyword:any;
  recordcount:number = 0; 
  userId:number ;
  activitylist:any[]; 
  ActivityIDs:any=[];
  @ViewChild('tblActivity') tableele:ElementRef; 
  constructor(private activityService:ActivityService,private claimsHelper:ClaimsHelper,private router: Router,public toastr: ToastrManager,private spinner: NgxSpinnerService) { 
    this.userId = + claimsHelper.GetUserIdAPIKeyFromClaims();

  }

  ngOnInit() {
    this.GetActivityDataTableBinding();
  }

  GetActivityDataTableBinding()
  {
    
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching:false,
      pageLength: 10,
      serverSide: true,
      processing: true,   
     ajax: (dataTablesParameters: any, callback) => {
       this.spinner.show();
        this.activitykeyword = this.activitykeyword == "" ? undefined:this.activitykeyword;
        
        that.activityService.GetActivityListDetails(this.searchcolumn, this.alphanumericsort, this.activitykeyword,this.userId,this.Statusid,dataTablesParameters.start , dataTablesParameters.length, this.SortingColumns, this.recordcount).subscribe((resp:any[]) => {
         
         var count=0;
         that.activitylist = resp;
         if(that.activitylist.length > 0)
         {
           count = resp[0].RecordsCount;
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
          $('table thead tr th').unbind('click');
          $('table thead tr th').on('click', (evt) => {
            
            var column =evt.target.textContent.replace(" ","");
            if (this.alphanumericsort == "All" || this.alphanumericsort == "undefined")
            {
              this.searchcolumn = "CompanyName";  
              var ele=document.getElementById("tblActivity");
              var elem=$(ele).find("thead tr th").css("background-color","");
              $("thead tr th:eq(3)").css("background-color","orange");    
            }
            else
            {
              
              if (column == "Company")
              { 
                this.searchcolumn ="CompanyName";         
              }
              else if (column == "Contact/LeadName")
              { 
                this.searchcolumn ="FirstName"; 
              }
              else if (column == "Type")
              { 
                this.searchcolumn ="ContactName"; 
              }
              else if (column == "Phone")
              { 
                this.searchcolumn ="Phone"; 
              }
              else if (column == "Email")
              { 
                this.searchcolumn ="Email"; 
              }
              else if (column == "Status")
              { 
                this.searchcolumn ="StatusName"; 
              }

              else if (column == "Priority")
              { 
                this.searchcolumn ="PriorityName"; 
              }
              else if (column == "Owner")
              { 
                this.searchcolumn ="Ownership";          
              }
             
              var ele=document.getElementById("tblActivity");
              $(ele).find("thead tr th").css("background-color","");
              $(evt.currentTarget).css("background-color","orange");

            }
          });
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
      title: 'Delete',
    }, 
    {
      title: 'View/Edit',
    }, 
    { 
      title: 'Due Date', 
    }, 
    {
      title: 'Company', 
    },
    {
      title: 'Contact/Lead Name',
    },
    {
      title: 'Type',
    },
    {
      title: 'Phone',
    },
    {
      title: 'Email',
    },
    {
      title: 'Status',
    },
    {
      title: 'Priority',
    },
    {
      title: 'Owner',
    }
  ],
    columnDefs: [   
      {
      targets: [0,1], /* column index */
      orderable: false, /* true or false */
      }
     ],
      responsive: true
    };
  }
  NavigateAddNewActivity()
  {
     let Id = 0,ModuleId="3",ModuleName="Activities";
     this.router.navigate(["CRM/activities/activityaddnew/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
      
       console.log(nav); 
      }, err => {
       console.log(err) 
     }); 
  }
  ActivityCrudEventHandler(ActivityID,Module,accounttype,Type)
  {
    
    if(Type == 'view')
    {
      let moduleId;
      if (Module == 'Leads') {
          moduleId = 1
      }
      else if (Module == 'Contacts') {
          moduleId = 2
      }
      else if (Module == 'Companies') {
          moduleId = 3
      }
      else if (Module == 'Opportunities') {
          moduleId = 4
      }
     this.router.navigate(["CRM/activities/activityview/",ActivityID,moduleId,accounttype,{viewtype:"Activity"}]).then(nav => { 
       console.log(nav); // true if navigation is successful
     }, err => {     
       console.log(err) // when there's an error
     }); 
    }
  
  }
  clearSeach()
  { 
    this.activitykeyword="";
 
    if((this.activitykeyword === undefined || this.activitykeyword.trim() == "")) 
    {
      this.activitykeyword="";
      return false
    }
    else
    {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
          }); 
    }
  }
  searchEventHandler(){
     
    if((this.activitykeyword === undefined || this.activitykeyword.trim() == "")) 
    {
      this.toastr.errorToastr('Please Enter atleast one Search criteria.', 'error!');
    }
    else
    {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
          }); 
    }
  }
  DeleteRecord(ActivityId,functionstatus)
  {
    
    Swal.fire({
      title: 'Are you sure you want to '+functionstatus+' this record?',
      text: "You are about to delete permanently!",
      backdrop:false,
      imageUrl:'',
      reverseButtons:true,
      showCancelButton: true,
      cancelButtonColor: '#ef4d4d',
      confirmButtonColor: '#448aff',         
    }).then((result) => {
      if (result.value) {
        
        this.ActivityIDs =[];
        this.ActivityIDs.push(ActivityId);
        if(functionstatus == "Complete")
        {
        this.activityService.ActivityComplete(this.ActivityIDs).subscribe(res =>{
          
          if(res)
          {
               Swal.fire(
                 ''+functionstatus+'!',
                 'Your Record has been '+functionstatus+'.',
                 'success'
               ).then((result) => {
                this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  dtInstance.draw();
                });  
               });
          }
        })
      }
      else{
        this.activityService.deleteActivityById(this.ActivityIDs).subscribe(res =>{
          
          if(res)
          {
               Swal.fire(
                 ''+functionstatus+'!',
                 'Your Record has been '+functionstatus+'.',
                 'success'
               ).then((result) => {
                this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  dtInstance.draw();
                }); 
               });
          }
        })
      }
      }
    })
  }
  GetdataByAlphaSearch($event){
   
    if($event=="All"){
      this.searchcolumn="CompanyName";
      $event="undefined";
    }
    if(this.searchcolumn=="CompanyName"){
      var ele=document.getElementById("tblActivity");
      var elem=$(ele).find("thead tr th").css("background-color","");
      $("thead tr th:eq(3)").css("background-color","orange");
    }
    
    this.alphanumericsort=$event;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    }); 
    
  }
}
