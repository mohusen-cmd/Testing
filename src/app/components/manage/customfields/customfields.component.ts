import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { da } from 'date-fns/locale';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomfieldService } from 'src/app/services/customfield.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-customfields',
  templateUrl: './customfields.component.html',
  styleUrls: ['./customfields.component.scss']
})
export class CustomfieldsComponent implements OnInit {
  module: any = "SelectAll";
  userid: any = 1;
  page: any;
  FieldID: any;
  data: any;
  resultLength: any;
  gridOptions: GridOptions;
  columnDefs: ColDef[] = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50 },
    { headerName: 'MODULE', field: 'Module', width: 150, headerClass: 'custom-header', },
    { headerName: 'ColumnID', field: 'Column_Id', width: 140 },
    { headerName: 'Column_Label', field: 'Column_Label', width: 170 },
    { headerName: 'Column_Description', field: 'Column_Description', width: 170 },
    { headerName: 'ActualColumnName', field: 'ActualColumnName', width: 150 },
    { headerName: 'Column_Type', field: 'Column_Type', width: 150 },
    { headerName: 'IsActive', field: 'IsActive', width: 130 },
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  rowData = [];

  public filterTypes = [
    { value: 'SelectAll', display: '--Select--' },
    { value: 'company', display: 'Company' },
    { value: 'Contact', display: 'Contacts' },
    { value: 'leads', display: 'Leads' },
    { value: 'Opportunities', display: 'Opportunities' },
  ];
  marked: boolean = false;
  checkedrowdata: any = []
  titleforpopup: string;
  textforpopup: string;

  constructor(
    public router: Router,
    public toastr: ToastrManager,
    public customservice: CustomfieldService,
    private claimsHelper: ClaimsHelper,
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.userid = this.claimsHelper.GetUserIdAPIKeyFromClaims()

  }

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: this.columnDefs,
      defaultColDef: this.defaultColDef,
      paginationPageSize: 10, // Number of rows Per Page
      pagination: true, // Enable pagination
      onRowSelected: this.activeInActiveToggle.bind(this),
      rowSelection: 'multiple', // Enables multiple row selection
      rowMultiSelectWithClick: true, // 
    };
    this.getCustomField(this.userid, this.module);
  }
  drpselected(event) {
    this.getCustomField(this.userid, event);
  }

  activeInActiveToggle(event) {
    this.marked = event.event.target.checked;
    if (this.marked == true) {
      this.checkedrowdata.push(event.node.data.FieldId);
    }
    else {
      let index = this.checkedrowdata.findIndex(item => item == event.node.data.FieldId)
      if (index !== -1) {
        this.checkedrowdata.splice(index, 1);
      }
    }
  }


  getCustomField(userid: any, module) {
    this.spinner.show()
    this.customservice.GetcustomfiledtypeList(this.userid, module).subscribe((data: any) => {
      this.spinner.hide()
      this.rowData = data
    }, (err: AppError) => {
      this.spinner.hide()
      if (err instanceof BadInputError) {
        window.alert("Bad Request:" + err.originalError)
      }
      else if (err instanceof NotFoundError) {
        window.alert("404 Error Occured!")
      }
      else {
        window.alert("An unexpected Error Occured!")
      }
    })

  }
  addCustom() {debugger
    if (this.module != 'SelectAll') {
      this.router.navigate(['/CustomField/AddEditCustomFields'], { queryParams: { module: this.module, Type: 'New' } });
    } else {
      this.toastr.warningToastr('Please Select Module', "warning")
    }
  }
  getCustomFieldDetails() {debugger
    this.customservice.GetcustomfiledListbyid(this.FieldID).subscribe(res => { console.log(res) })
  }

  InActiveCustom() {
    if (this.checkedrowdata.length == 0) {
      this.toastr.errorToastr("Please select item(s) to In-Activate.", "error",);
    } else {
      let result = confirm('You are about to Inactivate the Custom field .Are you sure you want to inactivate the field ?')
      if (result) {
        this.customservice.UpdatecustomfieldstatusByIds(this.checkedrowdata).subscribe(res => {
          if (res == true) {
            this.toastr.successToastr("CustomField Status has been Changed Successfully.", "success", {
              timeOut: 1000
            });
          }
          else if (res == false) {
            this.toastr.errorToastr("It is already in in-active.", "failed", {
              timeOut: 3000
            });
          } else {
            this.toastr.errorToastr("CustomField Status Can't  Changed  !!!.", "Failed!", {
              timeOut: 3000
            });
          }
          this.checkedrowdata = []
          this.getCustomField(this.userid, this.module)
        })

      }


    }
  }

  Deleteuser() {
    if (this.marked == true || this.checkedrowdata.length != 0) {
      this.customservice.DeletecustomfieldByIds(this.checkedrowdata).subscribe(res => {
        this.checkedrowdata = []
        if (res == true) {
          this.marked = false;
          this.getCustomField(this.userid, this.module)
          this.toastr.successToastr("CustomField deleted Successfully.", "success", {
            timeOut: 3000
          });
        }
        else if (res == false) {
          this.marked = false;
          this.getCustomField(this.userid, this.module)
          this.toastr.errorToastr("Can't delete.", "failed", {
            timeOut: 3000
          });
        }
        else {
          this.toastr.errorToastr("CustomField Delete Failed  !!!.", "Failed!", {
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
  onCellClicked(event) {
    
    if (event.column.colId === 'Module') {
      this.router.navigate(['/CustomField/AddEditCustomFields'], { queryParams: { FieldidfrmView: event.data.FieldId, Type: 'Edit' } }).then((nav) => { console.log(nav) })
    }
  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


