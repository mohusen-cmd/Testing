import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { ImportFilesModel } from 'src/app/models/IImportFilesModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-lead-import',
  templateUrl: './lead-import.component.html',
  styleUrls: ['./lead-import.component.scss']
})
export class LeadImportComponent implements OnInit {


  fileFormGroup: FormGroup
  secondFormGroup: FormGroup
  myFiles: string[] = []
  filenames: any = [];
  ExcelObj = new ImportFilesModel()
  public tableData: any;
  public tableTitle: any;
  public customPagination = 1;
  public recordsPerPage = 10;
  public tableRecords = [];
  public pageStartCount = 0;
  public pageEndCount = 10;
  public totalPageCount = 0;
  public currentPage = 0;
  headerdata: any | string = [];
  headervalue: any = 1;
  staticTable: { text: string; value: number; }[];
  listmatched: Array<any> = [];
  mappingArr: Array<any> = []
  isdisabled: boolean = true;
  items: Array<any> = []
  color: string;
  ishidden: Boolean = false
  File: any;
  url;
  isEdit: boolean = false
  allSelected = false;
  @ViewChild('mySel') skillSel: MatSelect;
  @ViewChild('myuploadInput') myInputVariable: any;
  disabledfile: boolean = true
  headerColumnNames: any = [];
  ImportFiledata: any = [{}]
  dynamicColumnamsObj: any = {};
  dynamicColumnams: any = [];
  columnsNames: any = []
  dbCustomColumns: any = [];
  ActualColumnNames: any = [];
  ActualColumnNamesObj: any = {}
  generatedfilename: any;
  showtable: boolean = false;
  dtOptions: any = {};
  mappingdata: string;
  constructor(private sanitizer: DomSanitizer,
    public claimsHper: ClaimsHelper,
    public service: AuthenticationService,
    private http: HttpClient,
    public _formBuilder: FormBuilder,
    public router: Router,
    public claimsHelper: ClaimsHelper,
    public toastr: ToastrManager,
    public commonservice:CommonService) { }

  ngOnInit(): void {

    this.fileFormGroup = this._formBuilder.group({
      fileCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: []
    });


  }






  export() {
    let userId = this.claimsHper.GetUserIdAPIKeyFromClaims();
    let ClientId = this.claimsHper.GetClientDbAPIKeyFromClaims();
    const formData = new FormData();
    formData.append("files", this.File)
    formData.append("uesrid", userId);
    formData.append("clientdb", ClientId);
    formData.append("mappingdata", this.mappingArr.toString());
    formData.append("generatedfilename", this.ExcelObj.ActualFName);
    formData.append("Excelfile", '');

    this.commonservice.ImportHistory(formData).subscribe((response) => {
      if (response) {
        this.router.navigate(["CRM/import/importhistory/", "Leads"]).then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });
      }
    })
  }





  BackFunction() {
    this.disabledfile = true;
    this.myFiles = [];
    this.myInputVariable.nativeElement.value = "";
  }

  getFileDetails(e) {

    if (this.myInputVariable.nativeElement.files.length != 0) {
      if (this.myInputVariable.nativeElement.files[0].name
        .split(".")
        .pop()
        .toLowerCase() == "csv") {
        this.disabledfile = false
        for (let i = 0; i < this.myInputVariable.nativeElement.files.length; i++) {
          this.myFiles.push(e.target.files[i])
        }
      }
      else {
        this.disabledfile = true
        this.myFiles = []
        this.myInputVariable.nativeElement.value = ''
        this.toastr.warningToastr('Please select file with CSV Extension', 'warning!')
      }
    }

  }
  ImportFile() {
    
    this.filenames = this.myFiles[0];
    if (this.myInputVariable.nativeElement.files.length != 0) {
      if (this.myInputVariable.nativeElement.files[0].name
        .split(".")
        .pop()
        .toLowerCase() == "csv") {
        if (this.myFiles.length > 0) {
          const formData = new FormData();
          for (var i = 0; i < this.myFiles.length; i++) {
            formData.append("files", this.myFiles[i]);
          }
          formData.append("uesrid", this.claimsHelper.GetUserIdAPIKeyFromClaims());
          formData.append("clientdb", this.claimsHelper.GetClientDbAPIKeyFromClaims());
          this.commonservice.ImportFilesLeads(formData).subscribe(res => {
            this.headerColumnNames = res["headerColumnNames"];

            this.ImportFiledata = JSON.parse(res["contactdata"]);
            this.columnsNames = res["columnsName"];
            this.dbCustomColumns = res["customproperty"];
            this.generatedfilename = res["generatedfilename"];
            this.ActualColumnNames = [];
            this.ActualColumnNamesObj.ColumnNames = "";
            this.ActualColumnNamesObj.SelectedColumnName = "";
            this.headerColumnNames.forEach(item => {
              this.dynamicColumnamsObj = {};
              this.dynamicColumnamsObj.title = item;
              this.dynamicColumnams.push(this.dynamicColumnamsObj);
            })

            this.columnsNames.forEach(item => {
              
              if (!item.includes("ID")) {
                if (!item.includes("Id")) {
                  if (item.includes("Stage")) {
                    this.ActualColumnNamesObj.ColumnNames = "Lead Status";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("CompanyName")) {
                    this.ActualColumnNamesObj.ColumnNames = "Company Legal Name";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("CompanyDBA")) {
                    this.ActualColumnNamesObj.ColumnNames = "Company DBA Name";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("Description")) {
                    this.ActualColumnNamesObj.ColumnNames = "Notes";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("MailingAddress2")) {
                    this.ActualColumnNamesObj.ColumnNames = "Address 2";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("MailingAddress")) {
                    this.ActualColumnNamesObj.ColumnNames = "Address 1";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("Mailingcity")) {
                    this.ActualColumnNamesObj.ColumnNames = "City";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("Mailingzip")) {
                    this.ActualColumnNamesObj.ColumnNames = "Zip/Postal Code";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("MailingStateText")) {
                    this.ActualColumnNamesObj.ColumnNames = "State";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("MailingCountryText")) {
                    this.ActualColumnNamesObj.ColumnNames = "Country";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else {
                    this.ActualColumnNamesObj.ColumnNames = item;
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  let headercolumnName = this.headerColumnNames.filter(item1 => item1 == item);
                  this.ActualColumnNamesObj.SelectedColumnName = headercolumnName.length == 0 ? "" : headercolumnName[0];
                  this.ActualColumnNames.push(this.ActualColumnNamesObj);
                  this.ActualColumnNamesObj = {};
                }
              }
            })

            this.dbCustomColumns.forEach(item => {
              this.ActualColumnNamesObj.ColumnNames = item.Column_Label;
              this.ActualColumnNamesObj.SelectedColumnName = "";
              this.ActualColumnNamesObj.Column_Id = item.Column_Id;
              this.ActualColumnNamesObj.FieldId = item.FieldId;
              this.ActualColumnNames.push(this.ActualColumnNamesObj);
              this.ActualColumnNamesObj = {};
            })
            console.log(this.ActualColumnNames)
            console.log(this.dynamicColumnams)
            this.showtable = true;
            this.dtOptions = {
              pagingType: 'full_numbers',
              paging: false,
              searching: false,
              pageLength: 10,
              columns: this.dynamicColumnams
            };
          })
        }
        else {
          this.toastr.errorToastr('Please Select File', 'error!');
        }
      }
      else {
        this.toastr.warningToastr('Please select file with CSV Extension', 'warning!');
      }
    }
    else {
      this.toastr.warningToastr('Please select file with CSV Extension', 'warning!');
    }
  }
  RemoveMapping(model) {
    console.log(model)
    model.SelectedColumnName = "";

  }
  GetcommaseparatedIds(data) {
    var strval = "";
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        strval += data[i] + ",";
      }
      return strval.substring(0, strval.length - 1);
    }
    else
      return null;
  }
  ImportLeads() {
    var value;
    var opt = [];
    this.ActualColumnNames.forEach(item => {
      if (item.ColumnNames == "Company DBA Name") { item.ColumnNames = "CompanyDBA"; }
      else if (item.ColumnNames == "Company Legal Name") { item.ColumnNames = "CompanyName"; }
      else if (item.ColumnNames == "Notes") { item.ColumnNames = "Description"; }
      else if (item.ColumnNames == "Address 2") { item.ColumnNames = "MailingAddress2"; }
      else if (item.ColumnNames == "Address 1") { item.ColumnNames = "MailingAddress"; }
      else if (item.ColumnNames == "City") { item.ColumnNames = "Mailingcity"; }
      else if (item.ColumnNames == "Zip/Postal Code") { item.ColumnNames = "Mailingzip"; }
      else if (item.ColumnNames == "Country") { item.ColumnNames = "MailingCountryText"; }
      else if (item.ColumnNames == "State") { item.ColumnNames = "MailingStateText"; }
      else if (item.ColumnNames == "Lead Status") { item.ColumnNames = "Stage"; }
      if (item.ColumnNames != "") {
        if (item.FieldId) {
          value = item.FieldId + "~" + item.ColumnNames + "+" + item.SelectedColumnName;
        }
        else {
          value = item.ColumnNames + "+" + item.SelectedColumnName;
        }
      }

      opt.push(value);
    })
    this.ActualColumnNames.forEach(item => {
      if (item.ColumnNames == "FirstName") {
        if (item.SelectedColumnName == "") {
          this.toastr.warningToastr('please select Company Name before Importing', 'warning!');
        }
        else {
          let userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
          let ClientId = this.claimsHelper.GetClientDbAPIKeyFromClaims();
          this.mappingdata = this.GetcommaseparatedIds(opt)
          const formData = new FormData();
          for (var i = 0; i < this.myFiles.length; i++) {
            formData.append("files", this.myFiles[i]);
          }
          formData.append("uesrid", userId);
          formData.append("clientdb", ClientId);
          formData.append("mappingdata", this.mappingdata);
          formData.append("generatedfilename", this.generatedfilename);
          formData.append("Excelfile", "")
          this.commonservice.ImportHistory(formData).subscribe(res => {
            if (res) {
              this.router.navigate(["CRM/import/importhistory/", "Leads"]).then(nav => {
                console.log(nav); // true if navigation is successful
              }, err => {
                console.log(err) // when there's an error
              });
            }
          })
        }
      }
    })

  }

}
