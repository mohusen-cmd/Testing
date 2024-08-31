
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';
import { Page, UserRoleModel } from 'src/app/models/IUserRoleModel';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
    selector: 'app-userroles',
    templateUrl: './userroles.component.html',
    styleUrls: ['./userroles.component.scss']
})
export class UserrolesComponent implements OnInit {
    userRoleInfo = [];
    UserRole: UserRoleModel = new UserRoleModel();
    page = new Page();
    ShowModel: boolean = false;
    ShowDeleteModel: boolean = false;
    type: string = '';
    @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
    dtOptions: any = {};
    marked: boolean = false;
    title = 'Role';
    RoleId: string;
    ModalHeader: string;
    totalCount: Number = 0;
    localkeyword: any;
    localowner: any;
    role: any = [];
    selectedrole: any = [];
    titleforpopup: any;
    textforpopup: any;
    jtSorting: any = '';
    RecordCount: any = 0;
    constructor(
        private router: Router,
        private userSerice: UserService,
        private toastr: ToastrManager,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit() {
        // this.setPage({ offset: 0 });
        this.GetUserRoleInfo();
    }

    setPage(pageInfo) {
        this.page.pageNumber = pageInfo.offset;
        this.page.size = 10;
    }

    GetUserRoleInfo() {
        //const that = this;
        //this.ShowContact=true;
        this.dtOptions = {
            pagingType: 'full_numbers',
            searching: false,
            pageLength: 10,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                debugger;
                this.spinner.show();

                if (dataTablesParameters.order[0].column == 0 || dataTablesParameters.order[0].column == 1) 
                {
                    this.jtSorting = 'RoleId' + ' ' + dataTablesParameters.order[0].dir;
                } else if (dataTablesParameters.order[0].column == 2) 
                {
                    this.jtSorting = 'RoleName' + ' ' + dataTablesParameters.order[0].dir;
                } else if (dataTablesParameters.order[0].column == 3)
                {
                    this.jtSorting = 'Description' + ' ' + dataTablesParameters.order[0].dir;
                } else if (dataTablesParameters.order[0].column == 4)
                {
                    this.jtSorting = 'Status' + ' ' + dataTablesParameters.order[0].dir;
                } else if (dataTablesParameters.order[0].column == 5)
                {
                    this.jtSorting = 'MasterpermissionStatus' + ' ' + dataTablesParameters.order[0].dir;
                }

                this.userSerice.GetRoleList(dataTablesParameters.start, dataTablesParameters.length, this.jtSorting, this.RecordCount).subscribe((data: any) => {
                            this.userRoleInfo = data;
                            var count = 0;

                            if (this.userRoleInfo.length > 0) {
                                count = data[0].RecordsCount;
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
                    title: ''
                },
                {
                    title: 'Delete'
                },
                {
                    title: 'Role',
                    data: 'RoleName'
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
                    title: 'Master Permission',
                    data: 'MasterpermissionStatus'
                }
            ],
            columnDefs: [
                {
                    targets: [0, 1] /* column index */,
                    orderable: false /* true or false */
                }
            ],
            responsive: true
        };
    }

    addorEditUserRoleModel(row, type) {
        this.router.navigate(['Setup/Userroles/createoreditroles/', row, type]).then(
            (nav) => {
                console.log(nav); // true if navigation is successful
            },
            (err) => {
                row;
                console.log(err); // when there's an error
            }
        );
    }
    searchEventHandler() {}
    clearSeach() {}

    Deleteuserroles() {
        if (this.marked == true) {
            this.userSerice.DeleteuserRolesinfo(this.selectedrole).subscribe((res) => {
                if (res == true) {
                    this.rolesStatus();
                    this.marked = false;
                    this.toastr.successToastr('Your Record has been deleted Successfully.', 'success', {
                        timeOut: 3000
                    });
                } else {
                    this.marked = false;
                    this.toastr.errorToastr("Can't Deleted !!! Role is in use.", 'success', {
                        timeOut: 3000
                    });
                    this.rolesStatus();
                }
            });
        } else {
            this.titleforpopup = 'Please select record to delete !';
            this.textforpopup = '';
            this.Swa1alerts('Delete', this.titleforpopup, this.textforpopup);
        }
    }
    activeInActiveToggle(e, rowdata) {
        this.marked = e.target.checked;
        this.selectedrole.push(rowdata);
    }

    DeleteUserRoleModel(Role, Active) {
        // this.RoleId = Role.RoleId;
        // // this.title="Delete User Role";
        // this.ModalHeader =
        //   "Are you sure you want to delete " + Role.RoleName + " Role?";
        //  this.ShowDeleteModel = true;
        this.role.push(Role.RoleId);
        Swal.fire({
            title: 'Are you sure you want to delete this record?',
            text: 'You are about to delete permanently!',
            backdrop: false,
            imageUrl: '',
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: '#ef4d4d',
            confirmButtonColor: '#448aff'
        }).then((result) => {
            if (result.value) {
                this.userSerice.DeleteuserRolesinfo(this.role).subscribe((res) => {
                    if (res) {
                        Swal.fire('Deleted!', 'Your Record has been deleted.', 'success').then((result) => {
                            this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                                dtInstance.draw();
                            });
                        });
                    }
                });
            }
        });
    }

    saveStatus(rStatus) {
        this.ShowModel = false;
        if (rStatus == true) {
            this.toastr.successToastr('Role Saved Successfuly', 'success', {
                timeOut: 3000
            });
            this.setPage({ offset: 0 });
        }
    }
    deleteStatus(rStatus) {
        this.ShowDeleteModel = false;
        if (rStatus == true) {
            this.toastr.successToastr('Role Deleted Successfuly', 'success', {
                timeOut: 3000
            });
            this.setPage({ offset: 0 });
        } else {
        }
    }

    updateFilter(type) {
        return null;
    }
    onPage(type) {
        return null;
    }
    Swa1alerts(type, title, text) {
        Swal.fire({
            title: title,
            text: text,
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
    rolesStatus() {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
        // this.setPage({ offset: 0 });
    }
}
