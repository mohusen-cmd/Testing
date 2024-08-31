import { Component, ElementRef,  OnInit,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ContactService } from 'src/app/services/contact.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { throwError } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContactsComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  searchmodel:any = {};
  SearchColumn: string = "FirstName";
  AlphanumericSort: string = undefined;
  Createdby: any = 1;
  Contactkeyword: any = undefined//
  OwnerName: any = undefined;
  CompanyName: any = undefined//
  CompanyId: any = -1;
  userId: any
  jtStartIndex: any = 0;
  jtPageSize: any = 10;
  jtSorting: string = "ID desc";
  RecordCount: any = 0;
  deleteids: any = []
  marked: boolean = false;
  checkedrowdata: any = [];
  titleforpopup: string;
  textforpopup: string;
  ShowAdvanceSearchModal: boolean = false
  deletedids: any[];
  contacts: any;
  dtOptions:any = {};
  constructor(private spinner: NgxSpinnerService,
    public router: Router,
    public elementRef: ElementRef,
    public climesHelper: ClaimsHelper,
    public contactservice: ContactService,
    public toastr: ToastrManager
  ) {

  }

  ngOnInit(): void {
    this.userId = this.climesHelper.GetUserIdAPIKeyFromClaims()
     this.GetDataTableBinding();
  }
 
 

  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.ContactID);
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.ContactID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
  }
  Deleteuser() {
    if (this.marked == true || this.checkedrowdata.length != 0) {
      this.contactservice.deleteProjectContact(this.checkedrowdata).subscribe((res) => {
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
      else {

      }
    })
  }

  

 
  AdvanceSearch() {
    this.ShowAdvanceSearchModal = true
  }
  Savestatus(event) {
    this.ShowAdvanceSearchModal = false
  }

 
  ContactCrudEventHandler(row,Type)
  {
     if(Type == 'view')
     {
      this.router.navigate(["CRM/contacts/contactview/",row,{vname:"Contacts", tname:'Contacts'}]).then(nav => { 
        console.log(nav); 
      }, err => {     
        console.log(err) 
      }); 
     }
     else if(Type == 'delete')
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
          this.deletedids.push(row);
          this.contactservice.deleteProjectContact(this.deletedids).subscribe(res =>{
            
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
    
  }
  NavigateImportHistory()
  {
    
    this.router.navigate(["CRM/import/importhistory/","Contact"]).then(nav => { 
      console.log(nav); // true if navigation is successful
    }, err => {     
      console.log(err) // when there's an error
    });  
  }
  NavigateImport()
  {
    

    this.router.navigate(["CRM/contacts/import"]).then(nav => { 
      console.log(nav); // true if navigation is successful
    }, err => {     
      console.log(err) // when there's an error
    });  
  }

  NavigateAddNew()
  {
    let Id = 0,ModuleId="2",ModuleName="Contacts";
    this.router.navigate(["CRM/contacts/AddNew/",Id,{MId:ModuleId,MName:ModuleName}]).then(nav => { 
     
      console.log(nav); 
    }, err => {
      console.log(err) 
  }); 
  }


  GetDataTableBinding()
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
        that.contactservice.GetContacts(this.SearchColumn,this.AlphanumericSort, 1,this.searchmodel.Keyword,this.searchmodel.Owner,this.searchmodel.CompanyName, -1, this.userId, dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
         
         var count=0;
         that.contacts = resp;
         if(that.contacts.length > 0)
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
            if (this.AlphanumericSort == "All" || this.AlphanumericSort == "undefined")
            {
              this.SearchColumn = "FirstName";  
              var ele=document.getElementById("tblContact");
              var elem=$(ele).find("thead tr th").css("background-color","");
              $("thead tr th:eq(3)").css("background-color","orange");    
            }
            else
            {
              
              if (column == "ContactName")
              { 
                this.SearchColumn ="FirstName";         
              }
              else if (column == "CompanyName")
              { 
                this.SearchColumn ="CompanyName"; 
              }
              else if (column == "ContactOwner")
              { 
                this.SearchColumn ="Ownership"; 
              }
              else if (column == "Department")
              { 
                this.SearchColumn ="DepartmentText";          
              }
            
              var ele=document.getElementById("tblContact");
              $(ele).find("thead tr th").css("background-color","");
              $(evt.currentTarget).css("background-color","orange");

            }
          });
        },(err:AppError) => 
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
      title: 'Contact Name', 
      data: 'ContactName'
    }, 
    {
      title: 'Company Name', 
      data: 'ContactCompanyName'
    },
    {
      title: 'Contact Owner',
      data: 'OwnerfirstName',
      
    },
    {
      title: 'Department',
      data: 'DepartmentText' ,
    }],
    columnDefs: [   
      {
      targets: [0,1],
      orderable: false,
      }
     ],
      responsive: true,
      language: {
        emptyTable: "", // Set to empty string to hide the "No matching records found" message
        zeroRecords: "" // Also set zeroRecords to an empty string to hide the message
      },
    };
  }

  showAdvanceSearchModel()
  {
    
    this.ShowAdvanceSearchModal = true;
  }
  OnContactSearch()
  {
    
   if((this.searchmodel.Keyword === undefined || this.searchmodel.Keyword.trim() == "") && (this.searchmodel.CompanyName === undefined || this.searchmodel.CompanyName.trim() == "") && (this.searchmodel.Owner === undefined || this.searchmodel.Owner.trim() == "")) 
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
  OnContactClear()
  {
    this.searchmodel.Keyword = this.searchmodel.CompanyName=this.searchmodel.Owner=this.AlphanumericSort=undefined;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });   
  }

  GetdataByAlphaSearch($event){
   
    if($event=="All"){
      this.SearchColumn="FirstName";
      $event="undefined";
    }
    if(this.SearchColumn=="FirstName"){
      var ele=document.getElementById("tblContact");
      var elem=$(ele).find("thead tr th").css("background-color","");
      $("thead tr th:eq(3)").css("background-color","orange");
    }
    
    this.AlphanumericSort=$event;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    }); 
    
  }
}
