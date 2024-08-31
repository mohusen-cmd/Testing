import { Component, Input, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingService } from '../services/Loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() detectroutingOngoing: boolean = false
  constructor(public loadingservice: LoadingService, public router: Router) { }

  ngOnInit(): void {
    if (this.detectroutingOngoing) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart || event instanceof RouteConfigLoadStart) {
          this.loadingservice.loadingOn()
        }
        else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError || event instanceof RouteConfigLoadEnd) {
          this.loadingservice.loadingOf()
        }
      })
    }
  }

}
