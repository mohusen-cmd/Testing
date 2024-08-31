import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(public router: Router,private spinner: NgxSpinnerService,) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    if (localStorage.getItem("token") != null) {
      var token = "Bearer " + localStorage.getItem("token");
      const Clonedreq = request.clone({
        headers: request.headers.set("Authorization", token)
      });
      return next.handle(Clonedreq).pipe(
        // Hide spinner when the request is completed (either success or error)
        finalize(() => this.spinner.hide())
      );
    }
    else {
      return next.handle(request)
    }
  }
}
