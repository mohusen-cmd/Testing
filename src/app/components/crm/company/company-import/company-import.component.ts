import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-company-import',
  templateUrl: './company-import.component.html',
  styleUrls: ['./company-import.component.scss']
})
export class CompanyImportComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  myFiles: string[] = [];
  disabledfile: boolean = true
  @ViewChild('myuploadInput') myInputVariable: any;
  dtOptions: any = {};

  fileName: string = 'SheetJS.xlsx';

  tableTitle = []
  headerColumnNames: any = [];
  ImportFiledata: any = [{}];
  dynamicColumnams: any = [];
  dbCustomColumns: any = [];
  columnsNames: any = [];
  ActualColumnNames: any = [];
  ActualColumnNamesObj: any = {};
  dynamicColumnamsObj: any = {};
  showtable: boolean = false;
  mappingdata: string;
  generatedfilename: string;

  constructor(private _formBuilder: FormBuilder, public claimsHelper: ClaimsHelper, public service: AuthenticationService, public router: Router, public toastr: ToastrManager,
    public commonservice:CommonService
    ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      fileCtrl: ['',]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['',]
    });
  }
  getFileDetails(e: any) {

    if (this.myInputVariable.nativeElement.files.length != 0) {
      if (this.myInputVariable.nativeElement.files[0].name
        .split(".")
        .pop()
        .toLowerCase() == "csv") {
        this.disabledfile = false;
        for (var i = 0; i < this.myInputVariable.nativeElement.files.length; i++) {
          this.myFiles.push(e.target.files[i]);
        }
      } else {
        this.disabledfile = true;
        this.myFiles = [];
        this.myInputVariable.nativeElement.value = "";
        this.toastr.warningToastr('Please select file with CSV Extension','warning!');
      }
    }
  }
  ImportFile() {
    
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
          this.commonservice.ImportFilesCompanies(formData).subscribe(res => {
            
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
              if (!item.includes("ID") || item.includes("CompanytypeID") || item.includes("CompanyIndustryID") || item.includes("CompanyStatusID")) {
                if (!item.includes("Id") || item.includes("CompanytypeID") || item.includes("CompanyIndustryID") || item.includes("CompanyStatusID")) {
                  if (item.includes("CompanytypeID")) {
                    this.ActualColumnNamesObj.ColumnNames = "Company Type";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("CompanyIndustryID")) {
                    this.ActualColumnNamesObj.ColumnNames = "Company Industry";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("Employees")) {
                    this.ActualColumnNamesObj.ColumnNames = "No of Employees";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("CompanyStatusID")) {
                    this.ActualColumnNamesObj.ColumnNames = "Company Ownership Type";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("Description")) {
                    this.ActualColumnNamesObj.ColumnNames = "Notes";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("MailingFullAddress")) {
                    this.ActualColumnNamesObj.ColumnNames = "MailingAddress 2";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("BillingFullAddress")) {
                    this.ActualColumnNamesObj.ColumnNames = "BillingAddress 2";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("Shippingzip")) {
                    this.ActualColumnNamesObj.ColumnNames = "Mailing Zip";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("Shippingcity")) {
                    this.ActualColumnNamesObj.ColumnNames = "Mailing City";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("ParentCompanyName")) {
                    this.ActualColumnNamesObj.ColumnNames = "ParentCompanyName";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("Name")) {
                    this.ActualColumnNamesObj.ColumnNames = "Company Name";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("CompanyDBA")) {
                    this.ActualColumnNamesObj.ColumnNames = "Company DBA Name";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("MailingcountryText")) {
                    this.ActualColumnNamesObj.ColumnNames = "Mailing Country";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("MailingstateText")) {
                    this.ActualColumnNamesObj.ColumnNames = "Mailing State";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("BillingcountryText")) {
                    this.ActualColumnNamesObj.ColumnNames = "Billing Country";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("BillingstateText")) {
                    this.ActualColumnNamesObj.ColumnNames = "Billing State";
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
            this.showtable = true;
            this.dtOptions = {
              pagingType: 'full_numbers',
              paging: false,
              searching: false,
              pageLength: 10,
              columns: this.dynamicColumnams
            };
            this.ActualColumnNames = this.removeDuplicates(this.ActualColumnNames, 'ColumnNames');
          })
        }
        else {
          this.toastr.errorToastr('Please Select File','error');
        }
      }
      else {
        this.toastr.warningToastr('Please select file with CSV Extension','warning');
      }
    }
    else {
      this.toastr.warningToastr('Please select file with CSV Extension','warning');
    }

  }
  RemoveMapping(model) {
    model.SelectedColumnName = "";

  }
  BackFunction() {
    this.disabledfile = true;
    this.myFiles = [];
    this.myInputVariable.nativeElement.value = "";
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
  ImportCompany() {
    

    var value;
    var opt = [];
    this.ActualColumnNames.forEach(item => {
      if (item.ColumnNames == "No of Employees") { item.ColumnNames = "Employees"; }
      else if (item.ColumnNames == "Mailing Country") { item.ColumnNames = "ShippingcountryID"; }
      else if (item.ColumnNames == "Mailing State") { item.ColumnNames = "ShippingstateID"; }
      else if (item.ColumnNames == "Billing Country") { item.ColumnNames = "BillingcountryID"; }
      else if (item.ColumnNames == "Billing State") { item.ColumnNames = "BillingstateID"; }
      else if (item.ColumnNames == "Notes") { item.ColumnNames = "Description"; }
      else if (item.ColumnNames == "Company Type") { item.ColumnNames = "CompanyType"; }
      else if (item.ColumnNames == "Company Industry") { item.ColumnNames = "CompanyIndustry"; }
      else if (item.ColumnNames == "Company Ownership Type") { item.ColumnNames = "CompanyOwnershipType"; }
      else if (item.ColumnNames == "Company DBA Name") { item.ColumnNames = "CompanyDBA"; }
      else if (item.ColumnNames == "Company Name") { item.ColumnNames = "Name"; }
      else if (item.ColumnNames == "MailingAddress 2") { item.ColumnNames = "MailingFullAddress"; }
      else if (item.ColumnNames == "BillingAddress 2") { item.ColumnNames = "BillingFullAddress"; }
      else if (item.ColumnNames == "Mailing City") { item.ColumnNames = "Shippingcity"; }
      else if (item.ColumnNames == "Mailing Zip") { item.ColumnNames = "Shippingzip"; }
      else if (item.ColumnNames == "Mailing Country") { item.ColumnNames = "MailingCountryText"; }
      else if (item.ColumnNames == "Mailing State") { item.ColumnNames = "MailingStateText"; }
      else if (item.ColumnNames == "Billing Country") { item.ColumnNames = "BillingCountryText"; }
      else if (item.ColumnNames == "Billing State") { item.ColumnNames = "BillingStateText"; }
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
      if (item.ColumnNames == "Name") {
        if (item.SelectedColumnName == "") {
          this.toastr.errorToastr("please select Company Name before Importing",'error!')
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
          this.commonservice.ImportCompany(formData).subscribe(res => {
            if (res) {
              if (res) {
                this.router.navigate(["CRM/import/importhistory/", "Company"]).then(nav => {
                  console.log(nav); // true if navigation is successful
                }, err => {
                  console.log(err) // when there's an error
                });
              }
            }
          })
        }
      }
    })
  }
  removeDuplicates(array, key) {
    return array.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t[key] === item[key]
      ))
    );
  }
  
}
