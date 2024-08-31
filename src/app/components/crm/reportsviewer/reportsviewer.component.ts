import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportsviewer',
  templateUrl: './reportsviewer.component.html',
  styleUrls: ['./reportsviewer.component.scss']
})
export class ReportsviewerComponent implements OnInit {

  constructor() { }
  panelOpenState = false;
  ngOnInit(): void {
  }

}
