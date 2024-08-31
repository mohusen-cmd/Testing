import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  searchcolumn: any = "Name";
  alphanumericsort: any = undefined;
  companykeyword: any = undefined;
  ownername: any = undefined;
  userId: any;
  startindex: any = 0;
  pagesize: any = 10
  SortingColumns: any="ID desc";
  recordcount: any = 0;
  dtOptions:any = {};
  @ViewChild('tblCompany') tableele:ElementRef; 
  companyList: any;
  deletedids: any[];
  titleforpopup: string;
  textforpopup: string;
  checkedrowdata=[];
  marked: boolean;
  constructor(
    public router: Router,
    public claimsHelper: ClaimsHelper,
    public companyservice: CompanyService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService) {
      this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();

  }
  ngOnInit() {
    this.GetCompanyDataTableBinding()
  }



  NavigateAddNewCompany()
  {
    // this.router.navigate(["crm/companies/aadnewcompany/"]).then(nav => { 
    //   console.log(nav); // true if navigation is successful
    // }, err => {     
    //   console.log(err) // when there's an error
    // });
    let Id = 0,ModuleId="3",ModuleName="Companies";
    this.router.navigate(["CRM/companies/addnewcompany/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
    }, err => {
      console.log(err) 
  }); 
    
  }
  NavigateImport()
  {
    
    this.router.navigate(["CRM/companies/companyimport/"]).then(nav => { 
      console.log(nav); // true if navigation is successful
    }, err => {     
      console.log(err) // when there's an error
    });  
  }
  NavigateImportHistory()
  {
    
    this.router.navigate(["CRM/import/importhistory/","Company"]).then(nav => { 
      console.log(nav); // true if navigation is successful
    }, err => {     
      console.log(err) // when there's an error
    });  
  }

  CompanyDelete(CompanyID,status)
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
        this.deletedids.push(CompanyID);
        this.companyservice.CompanyDelete(this.deletedids).subscribe(res =>{
          
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
 
 
  GetdataByAlphaSearch($event){
    
    if($event=="All"){
      this.searchcolumn="Name";
      $event="undefined";
    }
    if(this.searchcolumn=="Name"){
      var ele=document.getElementById("tblCompany");
      var elem=$(ele).find("thead tr th").css("background-color","");
      $("thead tr th:eq(3)").css("background-color","orange");
    }
    
    this.alphanumericsort=$event;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    }); 
    
  }

  searchEventHandler(){
     
    if((this.companykeyword === undefined || this.companykeyword.trim() == "") && (this.ownername === undefined || this.ownername.trim() == "")) 
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

  onInputChange(value: string, field: string): void {
    if (field === 'Keyword') {
      this.companykeyword = value;
    } else if (field === 'OwnerName') {
      this.ownername = value;
    }
  }

  CompanyCrudEventHandler(row)
  {
    
    this.router.navigate(["CRM/companies/viewcompany/",row.CompanyID,{vname:"Companies", tname:'Companies'}]).then(nav => { 
      console.log(nav); 
    }, err => {     
      console.log(err) 
    }); 
    // this.router.navigate(["crm/companies/viewcompany/",row.CompanyID,{viewtype:"Company"}]).then(nav => { 
    //   console.log(nav); // true if navigation is successful
    // }, err => {
    //   console.log(err) // when there's an error
    // }); 
  }
  clearSeach()
  { 
    
    if(this.companykeyword != undefined  || this.ownername != undefined) 
    {
      this.ownername="";
      this.companykeyword="";
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      }); 
    }
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
      sorting:false, 
     ajax: (dataTablesParameters: any, callback) => {
       
       this.spinner.show();
      
       if( this.ownername == "")
       {
        this.ownername =undefined;
       }
       if(this.companykeyword == "")
       {
        this.companykeyword = undefined;
       }
       this.companyservice.GetCompanyapi(this.searchcolumn, this.alphanumericsort, this.companykeyword, this.ownername, this.userId, dataTablesParameters.start , dataTablesParameters.length, this.SortingColumns, this.recordcount).subscribe(
        (result:   any[]) =>  {
          
          this.companyList = result;
          let count=0;
           if(that.companyList.length > 0)
           {
             count = result[0].RecordsCount;
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
              this.searchcolumn = "Name";  
              var ele=document.getElementById("tblCompany");
              var elem=$(ele).find("thead tr th").css("background-color","");
              $("thead tr th:eq(3)").css("background-color","orange");    
            }
            else
            {
              if (column == "CompanyName")
              { 
                this.searchcolumn ="Name";         
              }
              else if (column == "Phone")
              { 
                this.searchcolumn ="Phone"; 
              }
              else if (column == "CompanyWebSite")
              { 
                this.searchcolumn ="website"; 
              }
              else if (column == "CompanyOwner")
              { 
                this.searchcolumn ="Ownership";          
              }

              var ele=document.getElementById("tblCompany");
              $(ele).find("thead tr th").css("background-color","");
              $(evt.currentTarget).css("background-color","orange");

            }
          });
         } 
           ,(err:AppError) => 
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
      title:'Select'
    },
    {
      title: 'Delete',
    }, 
    {
      title: 'View/Edit',
    }, 
    { 
      title: 'Company Name', 
    }, 
    {
      title: 'Phone', 
    },
    {
      title: 'Company WebSite',    
    },
    {
      title: 'Company Owner',
    }],
    columnDefs: [   
      {
      targets: [0,1,2,3,4,5], /* column index */
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
  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.CompanyID);
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.CompanyID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
  }

  Deleteuser() {
    if (this.marked == true || this.checkedrowdata.length != 0) {
      this.companyservice.CompanyDelete(this.checkedrowdata).subscribe((res) => {
        if (res == true) {
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

    })

  }
}
