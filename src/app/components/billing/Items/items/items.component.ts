import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  dtOptions: any = {};
  orderByClause: string = "ItemID desc";
  totalCount: number = 0;
  mode: number = 1;
  SearchColumn: any = "ItemName";
  AlphanumericSort: any = undefined;
  Itemkeyword: any = undefined;
  itemslist: any;
  constructor(
    public router: Router,
    public itemsService: ItemService,
    private spinner: NgxSpinnerService,
    public toaster: ToastrManager,) {

  }
  ngOnInit() {
    this.GetAllItemsListTableBinding()
  }




  addIteams() {
    this.router.navigate(['/Invoice/EditorAddItemsDetail'], { queryParams: { ItemID: 0 } })
  }
 
  GetAllItemsListTableBinding() {

    const that = this;
    //this.ShowContact=true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.spinner.show();
        if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 1) {
          this.orderByClause = "ItemID" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 2) {
          this.orderByClause = "ItemCode" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 3) {
          this.orderByClause = "ItemDesc" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 4) {
          this.orderByClause = "ItemName" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 5) {
          this.orderByClause = "RateperUnit" + " " + dataTablesParameters.order[0].dir;
        }
        else if (dataTablesParameters.order[0].column == 6) {
          this.orderByClause = "Saleprice" + " " + dataTablesParameters.order[0].dir;
        }

        // that.contactservice.GetAllContacts("FirstName",this.AlphanumericSort, 1,this.searchmodel.Keyword,this.searchmodel.Owner,this.searchmodel.CompanyName, -1, this.userid, dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
          this.itemsService.GetItemsInventory(this.SearchColumn, this.AlphanumericSort, this.Itemkeyword, this.mode, dataTablesParameters.start, dataTablesParameters.length, this.orderByClause, this.totalCount).subscribe((data: any) => {

          var count = 0;
          that.itemslist = data;
          if (that.itemslist.length > 0) {
            count = data[0].RecordsCount;
          }
          else {
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
          title: ''
        },
        {
          title: 'Delete'
        },
        {
          title: 'Item/Part # ',
          data: 'ItemCode'
        },
        {
          title: 'Item Type',
        },
        {
          title: 'Item Name',
        },
        {
          title: 'Cost/Unit',
        },
        {
          title: 'Sales Price',
        }
      ],
      columnDefs: [
        {
          targets: [0, 7], /* column index */
          orderable: false, /* true or false */
        }
      ],
      responsive: true
    };
  }
  



  delete(e: any) {
    console.log(e)
    Swal.fire({
      title: "Are you sure?",
      text: "All data related to this  will be parmanently deleted",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, DELETE it!",
      cancelButtonText: "No, cancel please!",
      closeOnConfirm: false,
      closeOnCancel: false
    }).then((response) => {
      /* Read more about isConfirmed, isDenied below */
      if (response.isConfirmed) {
        this.itemsService.DeleteItem(e.ItemID).subscribe(res => {
         
          if (res) {
            this.toaster.successToastr(" Successfully deleted the record", "success");
            this.Status()
          }
        }, (error) => {
         
        })

      } else if (response.isDenied) {
        Swal.fire(`Cancelled`)
      }
    });
  }
  Status(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}



