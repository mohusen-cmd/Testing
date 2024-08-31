import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TriggeredcampaignsService } from 'src/app/services/triggeredcampaigns.service';

@Component({
  selector: 'app-viewtriggeredpopup',
  templateUrl: './viewtriggeredpopup.component.html',
  styleUrls: ['./viewtriggeredpopup.component.scss']
})
export class ViewtriggeredpopupComponent implements OnInit {
  @Output() status = new EventEmitter();
  @Output() emailmethod = new EventEmitter();
  @Input() viewone = new EventEmitter();
  @Input() viewtwo = new EventEmitter();
  @Input() show1 = new EventEmitter();
  @Input() show2 = new EventEmitter();
  @Input() show3 = new EventEmitter();
  @Input() Modeltitle = new EventEmitter();
  Obj: any;
  @ViewChild('modalLarge', { static: true }) modal
  constructor(private triggeredcampaignsService: TriggeredcampaignsService,) { }

  ngOnInit() {
    this.modal.show();
  }

  close() {
    this.modal.hide()
    this.status.emit(false);
  }

  submitemail() {
    this.emailmethod.emit();
    this.close();
  }

}
