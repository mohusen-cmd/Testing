import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { LoginDomainModel, ForgotPasswordDomainModel } from 'src/app/models/LoginDomainModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('content', { static: true }) modal: any
  @ViewChild('contentsub', { static: true }) submodal: any
  @Output() status = new EventEmitter();
  form: FormGroup
  Model: LoginDomainModel = new LoginDomainModel()
  constructor(private modalService: NgbModal,
    public commonservice: CommonService,
    public router: Router) {
    this.Model.PVM = new ForgotPasswordDomainModel()
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      ClientDBName: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      QID: new FormControl('', Validators.required),
      SecurityAnswer: new FormControl('', Validators.required)
    })
    this.openLg(this.modal)
  }
  openLg(content) {
    this.modalService.open(content, { centered: true });
  }
  onChangeClientId() {
    this.commonservice.GetClientDetails(this.Model.PVM.ClientDBName).subscribe((response: LoginDomainModel) => {
      this.Model = response
      this.Model.PVM = response['PVM']
      if (this.Model.PVM.ClientDBName != null) {
        this.modalService.dismissAll()
        this.Model.PVM.QId = 1
        this.Model.PVM.ClientDBName = this.Model.PVM.ClientDBName.replace('CRM_', '')
        this.openLg(this.submodal)
      }
    })
  }
  close() {
    this.modalService.dismissAll()
    this.status.emit(false)
  }

  submit() {
    if (this.form.valid) {
      this.commonservice.GetLoginDetails(this.Model.PVM.ClientDBName, this.Model.PVM.Email, this.Model.PVM.Answer, this.Model.PVM.QId).subscribe((response: ForgotPasswordDomainModel) => {
        debugger
        this.Model.PVM = response
        this.commonservice.SendMailForgotPass(this.Model.PVM).subscribe((response) => {
          this.modalService.dismissAll()
          if (response) {
            alert("Password Sent to your Registered Email")
          }
        })
      })
    } else {
           this.router.navigate(['/login'])
    }
  }

  Cancel() {
    this.modalService.dismissAll()
  }
}
