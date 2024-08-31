import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-contact-import',
  templateUrl: './contact-import.component.html',
  styleUrls: ['./contact-import.component.scss']
})
export class ContactImportComponent implements OnInit {

  fileFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  @ViewChild('myuploadInput') myInputVariable: any;
  disabledfile = true;
  myFiles = []
  dtOptions: any = {};
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
  constructor(public service: AuthenticationService, public _formBuilder: FormBuilder, public toastr: ToastrManager, public claimsHelper: ClaimsHelper, public router: Router,
    public commonservice:CommonService) { }

  ngOnInit(): void {
    this.fileFormGroup = this._formBuilder.group({
      fileCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  getFileDetails(event) {
    if (this.myInputVariable.nativeElement.files.length != 0) {
      if (this.myInputVariable.nativeElement.files[0].name.split('.').pop().toLowerCase() == 'csv') {
        this.disabledfile = false
        for (let i = 0; i < this.myInputVariable.nativeElement.files.length; i++) {
          this.myFiles.push(event.target.files[i])
        }
      } else {
        this.myInputVariable.nativeElement.value = ''
        this.disabledfile = true;
        this.toastr.warningToastr('Please select file with CSV Extension', 'warning')
        this.myFiles = []
      }
    }
  }
  ImportFile() {
    debugger;
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
          this.commonservice.ImportFilesContact(formData).subscribe(res => {

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

              if (!item.includes("ID") || item.includes("ContactTypeID")) {
                if (!item.includes("Id") || item.includes("ContactTypeID")) {
                  if (item.includes("TotalEmployees")) {
                    this.ActualColumnNamesObj.ColumnNames = "No of Employees";
                    this.ActualColumnNamesObj.SelectedColumnName = item;
                  }
                  else if (item.includes("ContactTypeID")) {
                    this.ActualColumnNamesObj.ColumnNames = "Contact Type";
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
                  else if (item.includes("Description")) {
                    this.ActualColumnNamesObj.ColumnNames = "Notes";
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

  ImportContact() {
    debugger;
    var value;
    var opt = [];
    this.ActualColumnNames.forEach(item => {
      if (item.ColumnNames == "No of Employees") { item.ColumnNames = "TotalEmployees"; }
      else if (item.ColumnNames == "Contact Type") { item.ColumnNames = "ContactType"; }
      else if (item.ColumnNames == "Mailing Country") { item.ColumnNames = "MailingCountryText"; }
      else if (item.ColumnNames == "Mailing State") { item.ColumnNames = "MailingStateText"; }
      else if (item.ColumnNames == "Billing Country") { item.ColumnNames = "BillingCountryText"; }
      else if (item.ColumnNames == "Billing State") { item.ColumnNames = "BillingStateText"; }
      else if (item.ColumnNames == "Notes") { item.ColumnNames = "Description"; }
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
          this.toastr.warningToastr("please select FirstName before Importing", 'warning')
        }
        else {
          let userId = this.claimsHelper.GetUserIdAPIKeyFromClaims()
          let ClientId = this.claimsHelper.GetClientDbAPIKeyFromClaims()
          this.mappingdata = this.GetcommaseparatedIds(opt);
          const formData = new FormData()
          for (let i = 0; i < this.myFiles.length; i++) {
            formData.append("files", this.myFiles[i])
          }
          formData.append("uesrid", userId)
          formData.append("clientdb", ClientId)
          formData.append("mappingdata", this.mappingdata)
          formData.append("generatedfilename", this.generatedfilename);
          this.commonservice.ImportContact(formData).subscribe(res => {
            if (res) {
              this.router.navigate(["CRM/import/importhistory/","Contact"]).then(nav => { 
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

  GetcommaseparatedIds(data) {
    debugger
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

  BackFunction() {
    this.myInputVariable.nativeElement.value = ''
    this.myFiles = [];
    this.disabledfile = true;
  }
  RemoveMapping(model) {

    model.SelectedColumnName = "";

  }

}
