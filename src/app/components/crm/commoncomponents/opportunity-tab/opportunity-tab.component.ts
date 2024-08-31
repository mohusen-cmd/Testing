import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactService } from 'src/app/services/contact.service';
import { LeadService } from 'src/app/services/lead.service';
import { OpportunityService } from 'src/app/services/opportunity.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-opportunity-tab',
  templateUrl: './opportunity-tab.component.html',
  styleUrls: ['./opportunity-tab.component.scss']
})
export class OpportunityTabComponent implements OnInit {
  @Input() OpportunitysData;
  @Output() valueChange = new EventEmitter();
  dtOptions:any = {};
  showtable:boolean=false;
  deletedids: any=[];
  companyid: any;
  constructor(private leadService:LeadService,private _Activatedroute: ActivatedRoute,private router: Router,private opportunityService:OpportunityService,private claimsHelper:ClaimsHelper) { 
    
    this._Activatedroute.paramMap.subscribe(params => {
      this.companyid = params.get("Id");
    });
  }
  ngOnInit() {

      this.showtable =true;
  
  }
  
  AddNewOpportunitiesByCompany()
  {
    
    this.router.navigate(["CRM/opportunities/addopportunities/",this.companyid,{MId:3,MName:"Companies"}]).then(nav => { 
     
        console.log(nav); 
      }, err => {
        console.log(err) 
    }); 
  }
  DeleteOpportunitys(opporID,CompanyID,CompanyName)
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
               Swal.fire(
                 'Deleted!',
                 'Your Record has been deleted.',
                 'success'
               ).then((result) => {
                let userid:number = +localStorage.getItem("Userid");
                this.valueChange.emit({searchcolumn:"Name",alphanumericsort:undefined,companykeyword:undefined,companyid:CompanyID,companyname:undefined,userid:userid,stageid:0,startindex:0,psize:10,orderbyclasue:"closedate asc",recordcount:0});
               });
          }
        })
      }
    })
  }
  NavigateOpportunityView(opporID)
  {
    
    this.router.navigate(["CRM/opportunities/viewopportunity/",opporID,{vname:"Opportunities", tname:'Opportunities'}]).then(nav => { 
      console.log(nav); 
    }, err => {     
      console.log(err) 
    }); 
  }

  ngAfterViewInit(): void {
    jQuery(function ($) {
      $('#opportunitiesTable').DataTable({
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
