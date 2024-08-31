import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-contacts-tab',
  templateUrl: './contacts-tab.component.html',
  styleUrls: ['./contacts-tab.component.scss']
})
export class ContactsTabComponent implements OnInit,AfterViewInit {
   @Input() ContactsData;
  @Output() valueChange = new EventEmitter();
  dtOptions:any = {};
  showtable:boolean=false;
  deletedids: any=[];
  contactList:any
  companyid:any;
  type: string;
  constructor(private contactservice:ContactService,private router: Router,private _Activatedroute: ActivatedRoute) { 
    
    
  }
  ngOnInit() {
    
    this.contactList = this.ContactsData;
    this.showtable =true;
   
  }
 
  DeleteContacts(ContactID,CompanyID)
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
        
        this.deletedids.push(ContactID);
        this.contactservice.DeleteAccountsById(this.deletedids).subscribe(res =>{
          if(res)
          {
            Swal.fire({
              backdrop:false,
              title: 'Your Record has been deleted.',
              type: 'success',
              confirmButtonColor: '#448aff',
            }).then((result) => {
              if (result.value) {
                this.valueChange.emit({companyid:CompanyID,pageindex:0,pagesize:10,orderby:"OwnerShip asc",totalrecordcount:0});
              }
            })
          }
        })

      }
    })
  }
  NavigateContactView(ContactID)
  {
    
    this.router.navigate(["CRM/contacts/contactview/",ContactID,{vname:"Contacts", tname:'Contacts'}]).then(nav => { 
      console.log(nav); 
    }, err => {     
      console.log(err) 
    }); 
  }
  AddNewContact()
  {
    
    //this.companyid = this._Activatedroute.snapshot.url[2].path
    // this.router.navigate(["CRM/contacts/AddNew/",this.companyid,'company']).then(nav => { 
    //   console.log(nav); 
    // }, err => {     
    //   console.log(err) 
    // });  
    // this._Activatedroute.paramMap.subscribe(params => {
    //   this.type = params.get("MName");
    //   this.companyid = params.get("MId");
    // });
    let Id = this._Activatedroute.snapshot.url[2].path;
    this.router.navigate(["CRM/contacts/AddNew/",Id,{MId:3,MName:"Companies"}]).then(nav => { 
     
        console.log(nav); 
      }, err => {
        console.log(err) 
    }); 
  
  }

  ngAfterViewInit(): void {debounce
    jQuery(function ($) {
      $('#contactsTable').DataTable({
        "paging": true, // Enable paging
        "lengthChange": true, // Disable page size change
        "searching": true, // Enable search box
        "ordering": true, // Enable sorting
        "info": true, // Show table information
        "autoWidth": true, // Disable auto width
        "responsive": true // Enable responsive mode
      });
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