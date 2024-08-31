import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountListViewModel, ContactDetailsViewModel } from 'src/app/models/IContactsViewModel';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() status = new EventEmitter()
  @ViewChild('content', { static: true }) modal: any
  accountMdl: ContactDetailsViewModel = new ContactDetailsViewModel()
  constructor(private modalService: NgbModal,) {
    this.accountMdl.AccountObj=new  AccountListViewModel();

   }

  ngOnInit(): void {
    this.openLg(this.modal)
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
 
  validationMessage: string = '';

  register() {
    this.modalService.dismissAll()
    // Implement your registration logic here
    // You can access form values through this.accountObj, this.password, and this.reenterpassword
    // You can also perform validation and display error messages in this.validationMessage
  }
  close() {
    this.modalService.dismissAll()
    this.status.emit(false)

  }
}
