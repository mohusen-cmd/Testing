
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { BuyingstageService } from 'src/app/services/buyingstage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { throwError } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
    selector: 'app-buyingstageleadstatus',
    templateUrl: './buyingstageleadstatus.component.html',
    styleUrls: ['./buyingstageleadstatus.component.scss']
})
export class BuyingstageleadstatusComponent implements OnInit {
    ShowStage: boolean = false;
    @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
    dtOptions: any = {};
    stagetypes: any = [];
    jtSorting: any = '';
    RecordCount: any = 0;
    AlphanumericSort: any = 'undefined';
    deletedids: any;
    stagetype: any;
    marked: false;
    checkedrowdata: any = [];
    statusval: any;
    titleforpopup: any;
    textforpopup: any;
    constructor(
        private buyingservice: BuyingstageService,
        private router: Router,
        public toastr: ToastrManager,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.GetBuyingStageDataTableBinding();
    }
    GetBuyingStageDataTableBinding() {
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
                if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 0) 
                {
                    this.jtSorting = 'StageId' + ' ' + dataTablesParameters.order[0].dir;
                } else if (dataTablesParameters.order[0].column == 1) 
                {
                    this.jtSorting = 'StageName' + ' ' + dataTablesParameters.order[0].dir;
                } else if (dataTablesParameters.order[0].column == 2) 
                {
                    this.jtSorting = 'Description' + ' ' + dataTablesParameters.order[0].dir;
                } else if (dataTablesParameters.order[0].column == 3) 
                {
                    this.jtSorting = 'Status' + ' ' + dataTablesParameters.order[0].dir;
                } else if (dataTablesParameters.order[0].column == 4) 
                {
                   this.jtSorting = 'AccountName' + ' ' + dataTablesParameters.order[0].dir;
                }

                // that.contactservice.GetAllContacts("FirstName",this.AlphanumericSort, 1,this.searchmodel.Keyword,this.searchmodel.Owner,this.searchmodel.CompanyName, -1, this.userid, dataTablesParameters.start , dataTablesParameters.length, this.jtSorting , this.RecordCount).subscribe(resp => {
                this.buyingservice.GetbuyingstagetypeInfo(dataTablesParameters.start, dataTablesParameters.length, this.jtSorting, this.RecordCount).subscribe((resp) => {
                            var count = 0;
                            that.stagetypes = resp;
                            if (that.stagetypes.length > 0) {
                                count = resp[0].RecordsCount;
                            } else {
                                count = 0;
                            }
                            callback({
                                recordsTotal: count,
                                recordsFiltered: count,
                                data: []
                            });
                            this.spinner.hide();
                        },
                        (err: AppError) => {
                            this.spinner.hide();
                            if (err instanceof BadInputError) {
                                window.alert('Bad Request:' + err.originalError);
                            } else if (err instanceof NotFoundError) {
                                window.alert('404 Error Occured!');
                            } else {
                                return throwError(err);
                            }
                        }
                    );
            },

            columns: [
                {
                    //  title:'<input type="checkbox" class="editor-active" style="">'
                },
                {
                    title: 'Name',
                    data: 'StageName'
                },
                {
                    title: 'Notes',
                    data: 'Description'
                },
                {
                    title: 'Status',
                    data: 'Status'
                },
                {
                    title: 'Account Type',
                    data: 'AccountName'
                }
            ],
            columnDefs: [
                {
                    targets: [0, 5] /* column index */,
                    orderable: false /* true or false */
                }
            ],
            responsive: true
        };
    }

    buyingstageCrudEventHandler(stageTypeId, stagetype) {
        if (stagetype == 'status') {
            if (this.marked || this.checkedrowdata.length > 0) {
                if (this.statusval == 'Active') {
                    this.statusval = 1;
                } else {
                    this.statusval = 0;
                }

                this.buyingservice.UpdatebuyingstageStatusByIds(this.checkedrowdata, this.statusval).subscribe((res) => {
                    if (res != null) {
                        this.checkedrowdata = [];
                        this.marked = false;
                        this.StageStatus();
                        this.toastr.successToastr('Stage Status has been Changed Successfully.', 'success', {
                            timeOut: 3000
                        });
                    } else {
                        this.toastr.errorToastr("Stage Status Can't  Changed  !!!.", 'Failed', {
                            timeOut: 3000
                        });
                    }
                });
            } else {
                this.titleforpopup = 'Please select  Record to change status!';
                this.textforpopup = '';
                this.Swa1alerts(stagetype, this.titleforpopup, this.textforpopup);
            }
        } else {
            this.router.navigate(['Setup/Buyingstageleadstatus/addnewbuyingleads/', stagetype, stageTypeId]).then(
                (nav) => {
                    console.log(nav); // true if navigation is successful
                },
                (err) => {
                    console.log(err); // when there's an error
                }
            );
        }
    }
    StageStatus() {
        this.ShowStage = false;
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
        // this.setPage({ offset: 0 });
    }

    activeInActiveToggle(e, rowdata) {
        this.marked = e.target.checked;

        if (this.marked) {
            this.checkedrowdata.push(rowdata.StageId);
        } else {
            this.checkedrowdata.pop(rowdata.StageId);
        }
        this.statusval = rowdata.Status;
    }
    Swa1alerts(type, title, text) {
        if (type == 'status') {
            Swal.fire({
                title: title,
                text: text,
                type: 'warning',
                backdrop: false,
                imageUrl: '',
                reverseButtons: true,
                showCancelButton: false,
                cancelButtonColor: '#ef4d4d',
                confirmButtonColor: '#448aff'
            }).then((result) => {
                if (result.value) {
                } else {
                }
            });
        }
    }
}
