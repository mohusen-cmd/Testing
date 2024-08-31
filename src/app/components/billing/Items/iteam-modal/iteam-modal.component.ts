import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { ItemService } from 'src/app/services/item.service';



@Component({
  selector: 'app-iteam-modal',
  templateUrl: './iteam-modal.component.html',
  styleUrls: ['./iteam-modal.component.scss']
})
export class IteamModalComponent implements OnInit {
  @ViewChild(DataTableDirective)  datatableElement: DataTableDirective;
  @ViewChild('content', { static: true }) modal: any
  @Output() itemmodelstatus = new EventEmitter();
  @Output() status = new EventEmitter()
  dtOptions: any = {};
  orderByClause: string = "ItemID desc";
  totalCount: number = 0;
  mode: number = 1;
  SearchColumn: any = "ItemName";
  AlphanumericSort: any = undefined;
  Itemkeyword: any = undefined;
  itemslist: any;
 
  constructor(
    private modalService: NgbModal,
    public itemsService: ItemService,
    private spinner: NgxSpinnerService,
    ) {

  }
  ngOnInit(): void {
    this.GetAllItemsListTableBinding();
    this.openLg(this.modal)
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
          this.orderByClause = "ItemID desc";
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
      responsive: true,
      language: {
        emptyTable: "", // Set to empty string to hide the "No matching records found" message
        zeroRecords: "" // Also set zeroRecords to an empty string to hide the message
      },
    };
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg',backdrop: 'static', keyboard: false});
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  emititem(event) {
    this.itemmodelstatus.emit(event)
    this.modalService.dismissAll()
  }
  close() {
    this.modalService.dismissAll()
    this.status.emit(false)
  }
  Status(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

}



