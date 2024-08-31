
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  dtOptions:any = {};
  departmentresult:any;
  size: number = 10;
  resultLength: any;
  startIndex: any = 0;
  pageSize: any = this.size;
  orderByClause: any = "DepartmentID desc";
  totalCount: any = 0;
  marked: boolean = false;
  checkedrowdata: any = [];
  statusval: any;
  titleforpopup: any;
  textforpopup: any;

  constructor(private departmentService: DepartmentService, private router: Router, public toastr: ToastrManager, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getdepartment()
  }



  getdepartment() {
    const that=this;
    this.dtOptions={
     pagingType: 'full_numbers',
     searching:false,
     pageLength: 10,
     serverSide: true,
     processing: true, 
     ajax:(dataTablesParameters:any,callback)=>{
       this.spinner.show();
     
       if (dataTablesParameters.order[0].column == 0) 
        {
          this.orderByClause = "DepartmentID" + " " + dataTablesParameters.order[0].dir;
        } else if (dataTablesParameters.order[0].column == 1)
        {
          this.orderByClause ="DepartmentName" + " " + dataTablesParameters.order[0].dir;
        } else if (dataTablesParameters.order[0].column == 2)
        {
          this.orderByClause ="Description" + " " + dataTablesParameters.order[0].dir;
        } 
        else if (dataTablesParameters.order[0].column == 3) {
          this.orderByClause = "Status" + " " + dataTablesParameters.order[0].dir;
        }

        this.startIndex=dataTablesParameters.start
        this.pageSize=dataTablesParameters.length
       that.departmentService.GetDepartmentList(this.startIndex,this.pageSize,this.orderByClause,this.totalCount).subscribe(res=>{
        var count=0;
         this.departmentresult=res;
        if(that.departmentresult.length >0)
        {
          count=res[0].RecordsCount;
        }
        else {
         count=0;
        }
        callback({
           recordsTotal: count,
           recordsFiltered: count,
           data: []
        });
        this.spinner.hide();
       },
       (err:AppError)=>
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
                 return throwError(err)
                }
       });
     },
     columns:[
       {
         title:'Select',
       },
       {
         title:'Department NAME',
       },
       {
         title:'NOTES',
       },
       {
         title:'STATUS',
       },
     ],
     columnDefs:[
       {
         targets: [0, 4] /* column index */,
         orderable: false /* true or false */,
       },
     ],
     responsive: true,
     language: {
       emptyTable: "", // Set to empty string to hide the "No matching records found" message
       zeroRecords: "" // Also set zeroRecords to an empty string to hide the message
     },
    }
  }

  activeInActiveToggle(e, rowdata) {
    this.marked = e.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(rowdata.DepartmentID);
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == rowdata.DepartmentID)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
    if (rowdata.ActiveStatus == "Active") {
      this.statusval = 0;
    } else {
      this.statusval = 1;
    }

  }



  DepartmentCrudEventHandler(Id, Type) {

    if (Type == "status") {
      if (this.marked || this.checkedrowdata.length > 0) {

        this.departmentService.UpdateStatusByIds(this.checkedrowdata, this.statusval).subscribe(res => {
          if (res != null) {
            this.checkedrowdata = [];
            this.marked = false;
            this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.draw();
            }); 
            this.toastr.successToastr("Department Status has been Changed Successfully.", "success", {
              timeOut: 3000
            });
          }
          else {
            this.toastr.errorToastr("Department Status Can't  Changed  !!!.", "Failed", {
              //timeOut: 5000
            });
          }
        });
      
      }
      else {
        this.titleforpopup = 'Please select  Record to change status!';
        this.textforpopup = '';
        this.Swa1alerts(Type, this.titleforpopup, this.textforpopup);
      }

    }
    else {
      this.router.navigate(["Setup/Department/departmentcreateoredit/", Type, Id]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });

    }


  }

  Swa1alerts(type, title, text) {

    if (type == "status") {
      Swal.fire({
        title: title,
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

