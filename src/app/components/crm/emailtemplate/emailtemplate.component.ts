import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ToastrComponent } from 'ng6-toastr-notifications/lib/toastr.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-emailtemplate',
  templateUrl: './emailtemplate.component.html',
  styleUrls: ['./emailtemplate.component.scss']
})
export class EmailtemplateComponent implements OnInit {
  @Input() FirstName: any;
  @Input() Email: any;
  @Input() Id: any;
  @Output() status = new EventEmitter();
  @ViewChild('modalLarge', { static: true }) modal
  ShowSendMail: boolean = false;
  ShowOutLookMail: boolean = false;
  disabled: boolean = false;
  Subject: any;
  ToEmail: any;
  MailBody: any;
  OutlookEmail: any;
  public editorConfig = {
    placeholder: 'Put your things hear'
  };
  editorContent: string;
  constructor(public toastr: ToastrManager, 
    public service: AuthenticationService,
     public dialog: MatDialog,
     public commonservice:CommonService) {
    //  
    //
  }

  ngOnInit(): void {


    this.modal.show()
    this.ToEmail = this.Email;
    this.ShowSendMail = true;
    this.disabled = true;
  }
  MailChange(elem) {
    if (elem.target.value == "1") {
      this.ShowSendMail = true;
      this.ShowOutLookMail = false;
    }
    else {
      this.ShowSendMail = false;
      this.ShowOutLookMail = true;
      let txtLeadName = this.FirstName;
      let body = "Dear " + txtLeadName + " \r\n \n\n\n\n\n" + "Regards," + " \r\n" + "CRM Team" + " \r\n" + "support@crm.com";
      this.OutlookEmail = body;
    }
  }
  SendEmail(event) {
    if (this.Subject == "" || this.Subject == undefined) {
      this.toastr.warningToastr("Subject Is Required", 'warning');
    }
    else if (this.MailBody == "" || this.MailBody == undefined) {
      this.toastr.warningToastr("Body/Content Is Required", 'warning');
    }
    else {
      const formData = new FormData();
      formData.append("Email", this.Email);
      formData.append("Subject", this.Subject);
      formData.append("Emailbody",this.MailBody);
      formData.append("FirstName",this.FirstName);
      this.commonservice.Sendmail(formData).subscribe((response) => {
        if (response) {
          debugger
          this.toastr.successToastr("Mail Success", 'success');
          this.modal.hide();
          this.status.emit(false);
        }
      })


    }
  }
  SendOutlookEmail() {
    if (this.Subject == "" || this.Subject == undefined) {
      this.toastr.warningToastr("Subject Is Required", 'warning');
    }
    else if (this.OutlookEmail == "" || this.OutlookEmail == undefined) {
      this.toastr.warningToastr("Body/Content Is Required", 'warning');
    }
    else {

      window.location.href = "mailto:" + this.ToEmail + "?body=" + encodeURIComponent(this.OutlookEmail) + "&subject=" + this.Subject;
      this.modal.hide();
      this.status.emit(false);
    }
  }
  close() {
    this.modal.hide();
    this.status.emit(false);
  }
  onfocus(event) {
    event.preventDefault()
  }
}
