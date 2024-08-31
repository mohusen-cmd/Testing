import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sadmin-component',
  templateUrl: './sadmin-component.component.html',
  styleUrls: ['./sadmin-component.component.scss']
})
export class SadminComponentComponent implements OnInit {
  displayedColumns: string[] = ['delete', 'position', 'name', 'weight'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);
  resultLength: any;
  size: any = 10;
  p: any = 1;
  pagedata: any;
  isLoading: boolean;
  constructor(public service: AuthenticationService,
    private adminService: AdminService,
    public router: Router,
    public toastrService: ToastrManager) { }
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    this.dataSource.sort = value;
    console.log(this.dataSource.sort);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data;
    console.log(this.dataSource.data);
  }
  ngOnInit(): void {
    this.GetClientDetails()
  }

  showlogoutbutton(){
    
  }
  GetClientDetails() {
    this.adminService.GetClientManagerApi().subscribe((data) => {
      this.isLoading = false;
      this.pagedata = data;
      this.dataSource.data = this.pagedata;
      this.resultLength = data.length;
      this.dataSource.data = this.pagedata;
      this.dataSource.paginator = this.paginator;

    })
  }
  DeleteClient(clientId) {
    if (confirm("Are you sure you to delete this Client?")) {
      this.adminService.DeleteClient(`CRM_${clientId}`).subscribe((data: any) => {
        this.toastrService.successToastr("Client Inactivated Successfully");
        this.GetClientDetails()
      });
    }
    else {
      this.toastrService.warningToastr("Client Already in Inacive");
    }
  }
  Logout() {
    this.router.navigate(['/login'])
    localStorage.clear()
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
