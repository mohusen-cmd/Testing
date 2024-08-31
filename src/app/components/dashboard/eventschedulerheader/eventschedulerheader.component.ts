import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-eventschedulerheader',
  templateUrl: './eventschedulerheader.component.html',
  styleUrls: ['./eventschedulerheader.component.scss']
})
export class EventschedulerheaderComponent implements OnInit {
  @Input()  view: string;

  @Input()  viewDate: Date;

  @Input()  locale: string = 'en';

  @Output()  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()  viewDateChange: EventEmitter<Date> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
