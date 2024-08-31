import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { EmailLeadSearchViewModel, EmailModelDomainModel, ListDetailViewModel, ListViewModel } from 'src/app/models/email-model-domain-model';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-createsavepopup',
  templateUrl: './createsavepopup.component.html',
  styleUrls: ['./createsavepopup.component.scss']
})
export class CreatesavepopupComponent implements OnInit {
  @Input() checkIdslist: any;
  @Input() emailModel: EmailModelDomainModel;
  @Input() checkApiIdslist: any;
  @Input() modulename: any;
  @Output() status = new EventEmitter();
  @ViewChild('content', { static: true }) modal: any

  listname: any;
  description: any;
  targetaudience: any;
  numberofcontacts: any;
  constructor(private modalService: NgbModal, public emailService: EmailService, public router: Router, public claimsHelper: ClaimsHelper) {

  }

  ngOnInit(): void {
    this.openLg(this.modal)
    this.emailModel.EmailAPIKey = this.claimsHelper.GetEmailAPIKeyFromClaims();
    this.emailModel.EmailAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
  }
  openLg(content) {
    this.modalService.open(content, { size: '' });
  }
  close() {
    this.status.emit(false)
    this.modalService.dismissAll()
  }
  SaveList() {
    
    this.emailModel.EmailAPIKey = this.claimsHelper.GetEmailAPIKeyFromClaims();
    this.emailModel.EmailAPILink = this.claimsHelper.GetEmailapilinkFromClaims();
    this.emailService.SaveEmailList(this.emailModel).subscribe((responce: any) => {
      if (responce) {
        this.close()
        this.router.navigate(["Email", "Lists"]).then(nav => {
          console.log(nav);
        }, err => {
          console.log(err)
        });
      }
    });
  }
}
