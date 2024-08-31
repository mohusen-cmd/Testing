import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LeadService } from 'src/app/services/lead.service';
import { OpportunityService } from 'src/app/services/opportunity.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OpportunityComponent implements OnInit {
  @ViewChild('tblOpportunity') tableele:ElementRef; 
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  oppList:any[]; 
  stageList:any ;
  dtOptions:any =  {}; 
  searchmodel:any = {};
  jtSorting:any="";
  showtable: boolean=false; 
  selectedStageId;
  companyid:any;
   searchcolumn:string="Name";
   alphanumericsort:string=undefined;
  deletedids: any=[];
  marked: boolean = false;
  checkedrowdata: any = [];
  titleforpopup: string;
  textforpopup: string;
  constructor(private leadService:LeadService, 
    private oppservice: OpportunityService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private router: Router,
    public climesHelper: ClaimsHelper,) { 
    this.searchmodel.keyword="";
    this.searchmodel.companyname="";
    this.searchmodel.companyowner="";
    this.searchmodel.selectedStageId=-1;

  }

  ngOnInit() {
     
    this.LoadStageDropdownlist(); 
   
  }
  oppCrudEventHanlder(opp,type)
  {
     
    alert(type);
    

  }
  clearEventHandler()
  {
    
     this.searchmodel.keyword="";
     this.searchmodel.companyname="";
     this.searchmodel.companyowner=""
     this.searchmodel.selectedStageId=-1; 
     this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
          });  
  }
  searchEventHandler()
  {
    
     var companykeyword=this.searchmodel.keyword;
     var companyname=this.searchmodel.companyname;
     var owner=this.searchmodel.companyowner;
     var stage=this.searchmodel.selectedStageId;
     if ((companykeyword == "" || companykeyword==undefined )  && (companyname=="" || companyname==undefined)      
     && (owner=="" || owner==undefined ) && (stage==-1  || stage==undefined  ))
     {
      this.toastr.errorToastr('Please select one search criteria', 'Error!');
      return;
     } 
     else
     {
       this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
             dtInstance.draw();
           }); 
     }

     

  }
  LoadStageDropdownlist()
  { 
    this.oppservice.GetStageList().subscribe((res:any)=> {
           
          this.searchmodel.selectedStageId=  res["StageID"]="null" ? -1 : res["StageID"];
       // this.searchmodel.selectedStageId=res["StageID"];
       // this.selectedStageId=res["StageID"];
        this.stageList=res["StageListDM"];
        this.LoadOppTable();
    })
  }

  LoadOppTable()
  {
    
   
    var userid=this.climesHelper.GetUserIdAPIKeyFromClaims()
    var stageid=-1;
    var jtstartindex=0;
    var jtpagesize=10;
    var jtsorting="ID desc";
    var recordcount=0;



    const that = this;
    this.showtable=true; 
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching:false,
      pageLength: 10,
      serverSide: true,
      processing: true,   
     
     ajax: (dataTablesParameters: any, callback) => {
      this.spinner.show();
      
       if(dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 1)
       {
          this.jtSorting ="ID" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 2)
       { 
          this.jtSorting ="Name" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 3)
       { 
          this.jtSorting ="Name" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 4)
       { 
         this.jtSorting ="Name" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 5)
       { 
          this.jtSorting ="Name" +" "+ dataTablesParameters.order[0].dir;
       }

       this.searchmodel.keyword = this.searchmodel.keyword == ""? undefined : this.searchmodel.keyword;
       this.searchmodel.companyname = this.searchmodel.companyname == ""? undefined : this.searchmodel.companyname;

        this.companyid = 0;    
        this.searchmodel.companyowner = this.searchmodel.companyowner  == ""? undefined : this.searchmodel.companyowner;
        this.searchmodel.selectedStageId = this.searchmodel.selectedStageId == -1 ? -1 : this.searchmodel.selectedStageId;
       
       that.oppservice.GetOpportunityList(this.searchcolumn,this.alphanumericsort,this.searchmodel.keyword,this.companyid,this.searchmodel.companyname,userid,this.searchmodel.selectedStageId,dataTablesParameters.start,dataTablesParameters.length,jtsorting,recordcount).
        subscribe((resp : any[]) => {
         
         var count=0;
         that.oppList = resp;
         if(that.oppList.length > 0)
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
          $('table thead tr th').unbind('click');
          $('table thead tr th').on('click', (evt) => {
            
            var column =evt.target.textContent.replace(" ","");
            if (this.alphanumericsort == "All" || this.alphanumericsort == "undefined")
            {
              this.searchcolumn = "FirstName";  
              var ele=document.getElementById("tblOpportunity");
              var elem=$(ele).find("thead tr th").css("background-color","");
              $("thead tr th:eq(3)").css("background-color","orange");    
            }
            else
            {
              
               if (column == "CompanyName")
              { 
                this.searchcolumn ="CompanyName"; 
              }
              else if (column == "ContactName")
              { 
                this.searchcolumn ="FirstName";          
              }
              else if (column == "OpportunityOwner")
              { 
                this.searchcolumn ="Ownership";          
              }
              else {
                this.searchcolumn ="undefined"; 
              }
              var ele=document.getElementById("tblOpportunity");
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
 //columns: [{  title: 'Delete',data: 'id' }, {title: 'View/Edit', data: 'FirstName' }, {title: 'Contact Name', data: 'ContactName' },{title: 'Company Name', data: 'ContactCompanyName' },{title: 'Contact Owner', data: 'OwnerfirstName' },{title: 'Department', data: 'DepartmentText' }],
   columns: [
    {
      title: 'Select',
      data: 'ContactID'
    }, 
    {
      title: 'Delete',
      data: 'ContactID'
    }, 
    {
      title: 'View/Edit',
      data: 'ContactID',
    }, 
    { 
      title: 'Opportunity Name', 
      data: 'OpporName'
    }, 
    {
      title: 'Stage Name', 
      data: 'StageName'
    },
    {
      title: 'Company Name',
      data: 'CompanyName',
    },
    {
      title: 'Contact Name',
      data: 'OpporContactName' ,
    },
    {
      title: 'Opportunity Owner',
      data: 'OwnerfirstName' ,
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
  OppCrudEventHandler(row,type)
  {
    
    // this.router.navigate(["CRM/opportunities/viewopportunity/",row.opporID,{viewtype:"Opportunity"}]).then(nav => { 
    //   console.log(nav); 
    // }, err => {
    //   console.log(err)
    // }); 
    this.router.navigate(["CRM/opportunities/viewopportunity/",row.opporID,{vname:"Opportunities", tname:'Opportunities'}]).then(nav => { 
      console.log(nav); 
    }, err => {     
      console.log(err) 
    }); 
  }


  // LoadOpportunities()
  // { 
  //   var searchcolumn="Name";
  //   var alphanumericsort=undefined;
  //   var keyword=undefined;
  //   var companyid=-1;
  //   var companyname=undefined;
  //   var userid=1;
  //   var stageid=-1;
  //   var jtstartindex=0;
  //   var jtpagesize=10;
  //   var jtsorting="ID desc";
  //   var recordcount=0;
  //   this.spinner.show();
  //    this.oppservice.GetOpportunityList(searchcolumn,alphanumericsort,keyword,companyid,companyname,userid,stageid,jtstartindex,jtpagesize,jtsorting,recordcount).
  //     subscribe(
  //       (result:   any[]) =>        
  //       {  
  //         this.spinner.hide();
  //         this.oppList=result;        
  //       },(err:AppError) => 
  //       {                                 
  //         this.spinner.hide();
  //           if(err instanceof BadInputError)
  //             {
  //                 window.alert("Bad Request:" + err.originalError)
  //             }
  //             else if (err instanceof NotFoundError) 
  //             {
  //                 window.alert("404 Error Occured!")
  //             }
  //             else
  //             {
  //               return throwError(err); 
  //             }                                
  //         }                              
  //         );
  // }
  GetdataByAlphaSearch($event){
   
    if($event=="All"){
      this.searchcolumn="Name";
      $event="undefined";
    }
    if(this.searchcolumn=="Name"){
      var ele=document.getElementById("tblOpportunity");
      var elem=$(ele).find("thead tr th").css("background-color","");
      $("thead tr th:eq(3)").css("background-color","orange");
    }
    
    this.alphanumericsort=$event;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    }); 
    
  }
  AddNewOpportunity()
  {
   

  let Id = 0,ModuleId="4",ModuleName="Opportunities";
    this.router.navigate(["CRM/opportunities/addopportunities/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
    }, err => {
      console.log(err) 
  }); 
  }
  DeleteOpportunitys(opporID)
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
        
        this.deletedids.push(opporID);
        this.leadService.deleteAccountDetails(this.deletedids).subscribe(res =>{
          
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

  Deleteuser() {
    if (this.marked == true || this.checkedrowdata.length != 0) {
      this.oppservice.deleteProjectOpper(this.checkedrowdata).subscribe((res) => {
        if (res) {
          this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
          }); 
          this.marked = false;
          this.toastr.successToastr("Your Record has been deleted Successfully.", "success", {
            timeOut: 3000
          });
        }
      })
    }
    else {
      this.titleforpopup = 'Please select record to delete !';
      this.textforpopup = '';
      this.Swa1alerts('delete', this.titleforpopup, this.textforpopup);
    }
    this.checkedrowdata = []
  }
  Swa1alerts(type, title, text) {
    Swal.fire({
      title: `<span style=" font-weight: normal;">${title}</span>`,
      text: text,
      backdrop: false,
      imageUrl: '',
      reverseButtons: true,
      showCancelButton: false,
      cancelButtonColor: '#ef4d4d',
      confirmButtonColor: '#448aff',
    }).then((result) => {
      if (result.value) {

      }
      else {

      }
    })
  }
  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.opporID);
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.opporID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
  }
}


