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
  selector: 'app-imported-files',
  templateUrl: './imported-files.component.html',
  styleUrls: ['./imported-files.component.scss']
})
export class ImportedFilesComponent implements OnInit {
  isLoading: boolean = true;
  @Input() moduleTypename: any
  pagedata = []




  constructor(public authenticationservice: AuthenticationService,
    public router: Router,
    public _DomSanitizer: DomSanitizer,
    public userService: AuthenticationService,
    public claimsHelper: ClaimsHelper,
    public route: ActivatedRoute,
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
    this.GetFiles()
  }

  GetFiles() {
    var clientid = this.claimsHelper.GetClientDbAPIKeyFromClaims()
    this.importservice.GetCompletedHistory(this.moduleTypename, clientid).subscribe((res: any) => {
      res.forEach(item => {
        this.isLoading = false
        if (item.ClientId == clientid) {
          this.pagedata.push(item);
          this.dataSource.data = this.pagedata
        }
      });
    })
  }
  onBackToLeads() {
    this.router.navigate(['/CRM/Leads/List']).then(nav => { console.log(nav) });
  }
  DownloadComplatedFile(Filepath: any, ExcelFile: any) {debugger
    debugger
    let ClientId = this.claimsHelper.GetClientDbAPIKeyFromClaims()
    let Module, Username, Uesrid;
    if(this.moduleTypename=='Company'){
      this.moduleTypename=`Companies`
    }
    Module = this.moduleTypename
    Username = this.claimsHelper.GetUserNameAPIKeyFromClaims()
    Uesrid = this.claimsHelper.GetUserIdAPIKeyFromClaims()
    this.importservice.DownloadFile(ExcelFile, ExcelFile, ClientId, Module, Username, Uesrid).subscribe((data: Blob) => {
      if (data.size !== 0) {
        let blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = ExcelFile;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    });
  }
  refreshPage() {
    this.isLoading = true;
    this.ngOnInit();
  }



}
