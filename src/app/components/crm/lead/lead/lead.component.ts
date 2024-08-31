import {  Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LeadService } from 'src/app/services/lead.service';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { throwError } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LeadComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions:any = {};
  leadkeyword:string = undefined; 
  alphanumericsort:string = "undefined"; 
  searchcolumn:string = "FirstName"; 
  SortingColumns:string = "ID Desc"; 
  recordcount:number = 0; 
  leadslist:any[]; 
  leadownername  :any; 
  LeadSource :any;
  StageId    :any; 
  deletedids:any=[];
  userId:number ;
  @ViewChild('tblLead') tableele:ElementRef; 
  constructor(private leadservice:LeadService,public commonservice:CommonService, private claimsHelper:ClaimsHelper,private router: Router,public toastr: ToastrManager,private spinner: NgxSpinnerService) { 
    this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
  }
  ngOnInit() {
    this.GetCompanyDataTableBinding();
  }
 
  
  GetCompanyDataTableBinding()
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
       
        that.LeadSource ="0";
        that.StageId = "0";
        this.leadkeyword = this.leadkeyword == "" ? undefined:this.leadkeyword;
        this.leadownername = this.leadownername == "" ? undefined:this.leadownername; 
        that.leadservice.GetLeads(this.searchcolumn, this.alphanumericsort, this.leadkeyword, this.leadownername,this.userId,this.LeadSource,this.StageId, dataTablesParameters.start , dataTablesParameters.length, this.SortingColumns, this.recordcount).subscribe((resp:any[]) => {
         
         var count=0;
         this.leadslist = resp;
         if(that.leadslist.length > 0)
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
              this.searchcolumn = "FirstName";  
              var ele=document.getElementById("tblLead");
              var elem=$(ele).find("thead tr th").css("background-color","");
              $("thead tr th:eq(2)").css("background-color","orange");    
            }
            else
            {
              
              if (column == "LeadName")
              { 
                this.searchcolumn ="FirstName";         
              }
              else if (column == "Company")
              { 
                this.searchcolumn ="CompanyName"; 
              }
              else if (column == "LeadSource")
              { 
                this.searchcolumn ="LeadSourceText"; 
              }
              else if (column == "LeadOwner")
              { 
                this.searchcolumn ="Ownership";          
              }
              else if (column == "LeadStatus")
              { 
                this.searchcolumn ="BuyingStageText";          
              }
              var ele=document.getElementById("tblLead");
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
      title: 'Lead Name', 
    }, 
    {
      title: 'Company', 
    },
    {
      title: 'Lead Source',
      
    },
    {
      title:'Lead Owner',
    },
    {
      title: 'Lead Status',
    }
  ],
    columnDefs: [   
      {
      targets: [0,1], /* column index */
      orderable: false, /* true or false */
      }
     ],
      responsive: true,
      language: {
        emptyTable: "", // Set to empty string to hide the "No matching records found" message
        zeroRecords: "" // Also set zeroRecords to an empty string to hide the message
      },
    };
  }
  UserCrudEventHandler(row)
  {
    
    this.router.navigate(["CRM/Lead/createlead/",row.ContactID]).then(nav => { 
      
      console.log(nav); 
    }, err => {
      console.log(err) 
    }); 
  }

  OnLeadClear()
  { 
      var ele=document.getElementById("tblLead");
      var elem=$(ele).find("thead tr th").css("background-color","");
      this.leadownername=undefined;
      this.leadkeyword=undefined;
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
          }); 
    
  }
  searchEventHandler(){
     
    if((this.leadkeyword === undefined || this.leadkeyword.trim() == "") && (this.leadownername === undefined || this.leadownername.trim() == "")) 
    {
      this.toastr.errorToastr('Please Enter atleast one Search criteria.', 'error!');
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      }); 
    }
    else
    {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
          }); 
    }
  }
  NavigateAddNewLeads()
  {
    
    let Id = 0,ModuleId="1",ModuleName="Leads";
    this.router.navigate(["CRM/lead/addnewlead/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
    }, err => {
      console.log(err) 
  }); 
  }

 

  DeleteLeadConfirmation(ContactID,APIContactID)
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
        
        this.deletedids =[];
        this.deletedids.push(ContactID);
        if(APIContactID != null && APIContactID != "null" && APIContactID != undefined)
        {
        this.commonservice.DeleteLeadbyId(this.deletedids,APIContactID).subscribe(res =>{})
        }
        this.leadservice.deleteAccountDetails(this.deletedids).subscribe(res =>{
          
          if(res)
          {
              
                 
                 this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  dtInstance.draw();
                }); 
               
          }
        })
      }
    })
  }
  
  NavigateImportHistory()
  {
    
    this.router.navigate(["CRM/import/importhistory/","Leads"]).then(nav => { 
      console.log(nav); 
    }, err => {     
      console.log(err) 
    });  
  }
  NavigateImport()
  {
    
    this.router.navigate(["CRM/leads/leadsimport/"]).then(nav => { 
      console.log(nav); 
    }, err => {     
      console.log(err) 
    });  
  }

  GetdataByAlphaSearch($event){
   
    if($event=="All"){
      this.searchcolumn="FirstName";
      $event="undefined";
    }
    if(this.searchcolumn=="FirstName"){
      var ele=document.getElementById("tblLead");
      var elem=$(ele).find("thead tr th").css("background-color","");
      $("thead tr th:eq(2)").css("background-color","orange");
    }
    
    
    if($event=="All" || $event=="undefined"){
    this.OnLeadClear()
    }
    this.alphanumericsort=$event;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    }); 
    
  }

  onInputChange(value: string, field: string): void {
    if (field === 'Keyword') {
      this.leadkeyword = value;
    } else if (field === 'OwnerName') {
      this.leadownername= value;
    }
  }
  
  CompanyCrudEventHandler(ContactID,type){
    
    if(type == 'view')
    {
     this.router.navigate(["CRM/leads/viewleads/",ContactID,{vname:"Leads", tname:'Leads'}]).then(nav => { 
       console.log(nav); 
     }, err => {     
       console.log(err) 
     }); 
    }
  }
  
}
