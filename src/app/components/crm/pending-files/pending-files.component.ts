import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ImportService } from 'src/app/services/Import.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-pending-files',
  templateUrl: './pending-files.component.html',
  styleUrls: ['./pending-files.component.scss']
})
export class PendingFilesComponent implements OnInit {
  isLoading: boolean = true;
  status1: any = 'Pending'
  status2: any = "InProcess"
  clientid: any
  refdata: any;
  pagedata: any;
  resultLength: any;
  recorded: number = 0;
  type: string;
  tiltle: string;

  completedHistory: any = [];
  resultCompleted: any = [];
  @Input() moduleTypename:any




  constructor(public authenticationservice: AuthenticationService,
    public router: Router,
    public _DomSanitizer: DomSanitizer,
    public userService: AuthenticationService,
    public claimsHelper: ClaimsHelper,
    public route:ActivatedRoute,
    private importservice: ImportService) {

  }

  displayedColumns = ['File', 'name', 'weight', 'symbol', 'download'];
  dataSource = new MatTableDataSource<Element>();


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
   this.GetPendingFiles()
  }

  GetPendingFiles(){
    this.clientid=this.claimsHelper.GetClientDbAPIKeyFromClaims()
    this.importservice.GetPendingHistory(this.status1, this.status2, this.moduleTypename, this.clientid).subscribe((data:any) => {
      this.isLoading = false;
      this.pagedata = data;
      this.dataSource.data = this.pagedata;
      this.resultLength = data.length;
      this.dataSource.data = this.pagedata;
      this.dataSource.paginator = this.paginator;
    })
    let RoleId = this.claimsHelper.GetRoleIdAPIKeyFromClaims()
    //this.GetMenusbyRoleid(RoleId)
  }
  onBackToLeads() {
    this.router.navigate(['/CRM/Leads/List']).then(nav => { console.log(nav) });
  }
  refreshPage() {
    this.isLoading = true;
    this.ngOnInit();
  }


 

}
