import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/error/app-error';
import { BadInputError } from 'src/app/error/bad-input-error';
import { NotFoundError } from 'src/app/error/not-found-error';

import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-note-tab',
  templateUrl: './note-tab.component.html',
  styleUrls: ['./note-tab.component.scss']
})
export class NoteTabComponent implements OnInit {
  @Input () Notes;
  @Output() valueChange = new EventEmitter();
    NoteText;
    buttonText;
    NoteList;
    NoteId;
  constructor(private companyservice:CompanyService,private spinner: NgxSpinnerService,public toastr: ToastrManager,public claimsHelper:ClaimsHelper) { 
  }
  SaveNotes(notes) {   
    
    this.spinner.show();
    if (this.NoteText=="" || this.NoteText===undefined)
    {
      this.spinner.hide();
      this.toastr.warningToastr('Please Enter Notes', 'warning!');
      return ;
    }  
    notes.CreatedBy=+ this.claimsHelper.GetUserIdAPIKeyFromClaims();
    notes.Description=this.NoteText;
    notes.NotesId=this.NoteId; 
    this.companyservice.SaveNotes(notes).subscribe( res=> {
      
      this.valueChange.emit({notecompanyid:notes.ContactID,module:notes.ContactTypeID,pageindex:0,pagesize:10,orderbyclause:"NoteId desc",totalpagecount:0});
      this.spinner.hide();
      this.toastr.successToastr('Updated Successfully', 'Success!');
    },
    (err:AppError) => 
     {
       this.spinner.hide();
       if(err instanceof NotFoundError)
       {
         window.alert("404 Error Occured!")
       }
       else
       {
        window.alert("An unexpected Error Occured!")
       } 
    }
    )   
}
  ngOnInit() {debugger
    
    console.log(this.Notes);
    this.NoteList=this.Notes.noteslist;
    this.buttonText="Add";
  }
  editnotedetails (noteid,note)
  {
    
    this.NoteText=note;
    this.NoteId=noteid;
    this.buttonText="Update";
    console.log(noteid + "  " + note) 
  }
}
