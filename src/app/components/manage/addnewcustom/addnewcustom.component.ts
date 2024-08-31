import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { CustomDrpChkValuesDomainModel, ICustommodel } from 'src/app/models/ICustommodel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomfieldService } from 'src/app/services/customfield.service';

@Component({
  selector: 'app-addnewcustom',
  templateUrl: './addnewcustom.component.html',
  styleUrls: ['./addnewcustom.component.scss']
})
export class AddnewcustomComponent implements OnInit {

  modulename: any;
  customTypeForm: FormGroup;
  columnID: any;
  decodedData: any;
  RequiredField: boolean = false
  IsActive: boolean = false
  IsShowInJoinNow: boolean = false
  IsDefault: boolean = false
  Customstatus: any;
  customfieldId: any;
  customdetails: ICustommodel = new ICustommodel()
  CustomOptionsDomainModel: any = []
  ddlcolumntype: any;
  ddlisrequired: any;
  ddlstatus: any; any;
  userId: any;
  ddlvalue: any;
  submitted = false
  //router: any;flag
  // module: any ='SelcetAll';
  // userid: any =1;
  // dataSource: any;
  IsCustomFieldAddOptions = false
  addcustomOptions: FormGroup
  lstCustomOptionsForm: FormGroup

  displayedColumns: string[] = ['select', 'delete', 'username', 'email'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  constructor(private sr: AuthenticationService,
    public router: Router,
    public activated: ActivatedRoute,
    public toastr: ToastrManager,
    public claimsHelper: ClaimsHelper,
    public fb: FormBuilder,
    public customservice: CustomfieldService,) {
    this.modulename = JSON.parse(localStorage.getItem('customdetails') || '{}');
    this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    ///// this columnID is taken based on order(LIFO) , if order change it will not work
    this.columnID = JSON.parse(localStorage.getItem('columnID') || '{}');
    //   console.log(this.dataSource.data.length);
    //   localStorage.setItem('columnID',JSON.stringify(this.dataSource.data.length))
    //  // )JSON.parse(localStorage.getItem('user')||'{}');
    this.activated.queryParamMap.subscribe((queryParam) => {debugger
      this.customfieldId = queryParam.get("FieldidfrmView")
      this.ddlvalue = queryParam.get("module")
      this.Customstatus = queryParam.get("Type")
    })


  }

  ngOnInit(): void {
debugger
    this.customTypeForm = this.fb.group({
      Module: new FormControl('', Validators.required),
      ColumnId: new FormControl(''),
      ActualColumnName: new FormControl(''),
      ColumnLabel: new FormControl('', Validators.required),
      ColumnType: new FormControl(''),
      ColumnDescription: new FormControl(''),
      IsRequired: new FormControl(''),
      MouseHoverText: new FormControl(''),
      Status: new FormControl(''),
      DefaultValue: new FormControl(''),
      MaxLength: new FormControl(''),
      lstCustomOptions: this.fb.array([])
    })

    if (this.Customstatus == "New") {
      
      this.customservice.GetcustomfiledtypeList(this.userId, this.ddlvalue).subscribe((response: any) => {
        var newcolid;
        
        if (response.length > 0) {
          newcolid = response[0].Column_Id + 1;
        }
        else {
          newcolid = 1;
        }
        this.customdetails.Module = this.ddlvalue
        this.customdetails.Column_Id = newcolid
        this.customdetails.ActualColumnName = `CustomField${newcolid}`
        this.customdetails.Column_Type = "textbox";
        this.customdetails.IsActive = false
      })
    }
    else if (this.Customstatus == "Edit") {debugger
      this.customservice.GetcustomfiledListbyid(this.customfieldId).subscribe((res: ICustommodel) => {
        this.customdetails = res
        if (res.IsActive == false) {
          this.customdetails.IsActive = false
        } else {
          this.customdetails.IsActive = true
        }

        if (res.RequiredField == false) {
          this.customdetails.RequiredField = false
        } else {
          this.customdetails.RequiredField = true
        }
      })
    }

    this.ddlcolumntype = [
      { Value: "textbox", Text: "Text Box", Selected: true },
      { Value: "textarea", Text: "Text Area" },
      { Value: "numeric", Text: "Numeric" },
      { Value: "date", Text: "Date" },
      { Value: "checkbox", Text: "Check Box" },
      { Value: "radiobutton", Text: "Radio Button" },
      { Value: "dropdown", Text: "Drop Down" }

    ]
    this.ddlisrequired = [
      { Text: "YES", Value: true },
      { Text: "NO", Value: false, Selected: true },
    ]
    this.ddlstatus = [
      { Text: "Active", Value: true },
      { Text: "In-Active", Value: false, Selected: true }
    ]
    this.customTypeForm.get("Module").disable()
    this.customTypeForm.get("ColumnId").disable()
    this.customTypeForm.get("ActualColumnName").disable()

    this.GetcustomOptionsList()
    

  }
  get f() {
    return this.customTypeForm.controls;
  }

  get lstCustomOptions() {
    return this.customTypeForm.controls["lstCustomOptions"] as FormArray
  }

  GetcustomOptionsList() {debugger
    this.customservice.GetAllcustomoptions(this.customfieldId).subscribe((response: any) => {
      console.log(response)
      this.dataSource = response.lstCustomOptions
      console.log(this.dataSource)
      if (response.lstCustomOptions.length != 0) {
        
        this.IsCustomFieldAddOptions = true
      } else {
        this.IsCustomFieldAddOptions = false
      }
    })
  }
  addcontoles() {debugger
    this.lstCustomOptionsForm = this.fb.group({
      DrpValueId: [0],
      FieldId: [0],
      DrpValue: [''],
      IsDefault: [false],
      CreatedDate: [new Date()]
    })
    this.lstCustomOptions.push(this.lstCustomOptionsForm)
    this.customdetails.lstCustomOptions = (this.lstCustomOptions.value)
    console.log(this.customdetails.lstCustomOptions)
    console.log(this.customTypeForm.value.lstCustomOptions)
  }
  textUpdate(event, index) {debugger
    this.customTypeForm.value.lstCustomOptions[index].DrpValue = event

  }

  DeleteContols(index: any) {debugger
    this.lstCustomOptions.removeAt(index)
  }

  onChangeCheckbox(event, index) {debugger
    const lstCustomOptions = this.customTypeForm.get('lstCustomOptions') as FormArray;
  // Iterate through the controls and uncheck others
  lstCustomOptions.controls.forEach((control, i) => {debugger
    control.get('IsDefault').setValue(i === index && event);
  });
  }

  onChangeCustom(event) {
    
    if (event.value == "checkbox" || event.value == "radiobutton" || event.value == "dropdown") {
      this.IsCustomFieldAddOptions = true
      this.lstCustomOptions.clear()
    } else {
      this.IsCustomFieldAddOptions = false
    }
  }


  Save() {
    this.submitted = true
    if (this.customTypeForm.valid) {
      this.customdetails.UserID = this.userId;
      if (this.Customstatus == "New") {
        this.customdetails.flag = 1;
        this.customdetails.FieldId = 0
        this.customdetails.DrpValueId = 0
        var status = 'Created'
      }
      else if (this.Customstatus == "Edit") {
        this.customdetails.flag = 2;
        var status = 'Updated'
        if (this.customTypeForm.value.lstCustomOptions.length != 0) {
          
          for (let i = 0; i < this.customTypeForm.value.lstCustomOptions.length; i++) {
            this.customTypeForm.value.lstCustomOptions[i].FieldId = this.customdetails.FieldId
            this.customservice.Updatecustomoptions(this.customTypeForm.value.lstCustomOptions[i]).subscribe(() => { })
          }

        }
      }
      this.customservice.Insertcustomfiled(this.customdetails).subscribe((res: any) => {
        if (res != 0) {
          
          this.customdetails.FieldId = res
          for (let i = 0; i < this.customTypeForm.value.lstCustomOptions.length; i++) {
            console.log(this.customTypeForm.value)
            this.customTypeForm.value.lstCustomOptions[i].FieldId = this.customdetails.FieldId
            this.customservice.Updatecustomoptions(this.customTypeForm.value.lstCustomOptions[i]).subscribe(() => { })
          }
        }
      })
      this.toastr.successToastr(`Custom Field(s) ${status}  Successfully.`, "success");
      this.router.navigate(['/CustomField/ViewCustomFields'])
    } else {
      return null;
    }

  }

  DeleteCustomOptionById(OptionById, index) {debugger
    const result = confirm(`You are about to delete permanently.Are you sure you want to delete this Option?`)
    if (result) {
      this.customservice.Deletecustomoption(OptionById).subscribe((response) => {
        if (response) {
          this.GetcustomOptionsList()
          this.toastr.successToastr("Custom Filed Details Updated Successfully", "success")
        }
      })
    }

  }

}

