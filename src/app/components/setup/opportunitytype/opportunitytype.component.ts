
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { OppotunityTypeService } from 'src/app/services/oppotunitytype.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-opportunitytype',
  templateUrl: './opportunitytype.component.html',
  styleUrls: ['./opportunitytype.component.scss']
})
export class OpportunitytypeComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  dtOptions:any = {};
  Opportunitytypes:any=[];
  jtSorting:any="";
  RecordCount:any=0;
   deletedids:any;
   marked:boolean=false ;
   checkedrowdata:any=[];
   statusval:any;
   titleforpopup:any;
  textforpopup:any;
  constructor(private opportunityserivce: OppotunityTypeService,
    private router: Router,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.GetOpportunitytypeDataTableBinding();
  }
  GetOpportunitytypeDataTableBinding()
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
       if(dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 0)
       {
          this.jtSorting ="OTId" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 1)
       { 
          this.jtSorting ="TypeName" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 2)
       { 
          this.jtSorting ="Description" +" "+ dataTablesParameters.order[0].dir;
       }
       else if (dataTablesParameters.order[0].column == 3)
       { 
         this.jtSorting ="Status" +" "+ dataTablesParameters.order[0].dir;
       }
      
     
        this.opportunityserivce.GetOppotunitytypeInfo(dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
        
         var count=0;
         that.Opportunitytypes = resp;
         if(that.Opportunitytypes.length > 0)
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
     
    //  title:'<input type="checkbox" class="editor-active" style="">'
    },
    { 
      title: 'Opportunity Name', 
      data: 'TypeName'
    }, 
    {
      title: 'Notes', 
      data: 'Description'
    },
    {
      title: 'Status',
      data: 'Status',
      
    }
     
    ],
    columnDefs: [   
      {
      targets: [0,4], /* column index */
      orderable: false, /* true or false */
      }
     ],
      responsive: true
    };
    
  }


  






  OpportunityStatus(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   // this.setPage({ offset: 0 });
  }

  opportunityCrudEventHandler(OpportunitytypeId, Opportunitytype) {

    if (Opportunitytype == "Status") {
      if (this.marked || this.checkedrowdata.length > 0) {
        if (this.statusval == "Active") {
          this.statusval = 1;
        }
        else {
          this.statusval = 0;
        }
        this.opportunityserivce.UpdateOpportunityStatusByIds(this.checkedrowdata, this.statusval).subscribe(res => {

          if (res != null) {
            this.checkedrowdata = []
            this.OpportunityStatus();
            this.marked = false;
            this.toastr.successToastr("Opportunitytype Status has been Changed Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("Opportunitytype Status Can't  Changed  !!!.", "Failed", {
              //timeOut: 5000
            });
          }
        });
      }
      else {

        this.titleforpopup = 'Please select  Record to change status!';
        this.textforpopup = '';
        this.Swa1alerts(Opportunitytype, this.titleforpopup, this.textforpopup);

      }

    }
    else {
      this.router.navigate(["Setup/Opportunitytype/addnewopportunity/", Opportunitytype, OpportunitytypeId]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });

    }


  }

  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.OTId);
      this.statusval = rowdata.Status;
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.OTId)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
    
  }
  Swa1alerts(type, title, text) {

    if (type == "Status") {
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
  }
}



