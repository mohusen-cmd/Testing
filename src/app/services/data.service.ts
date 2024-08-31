import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly _baseUrl: string = '';
  readonly _url: string = '';
  readonly _onepointbaseUrl: any = ''
  constructor(public httpclient: HttpClient,) {
    this._baseUrl = environment.apiserver;
    this._onepointbaseUrl = environment.onePointBaseUrl
  }

  getbyId(_url, Id) {
    //   
    return this.httpclient.get(this._baseUrl + _url + Id).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getDownloadFileAsync(_url) {
    return this.httpclient.get(this._baseUrl + _url, { responseType: 'blob' })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAsync(_url) {
    return this.httpclient.get(this._baseUrl + _url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  postAsync(_url, resource) {
    //return this.http.post(this.url, JSON.stringify(resource))
    return this.httpclient.post(this._baseUrl + _url, resource).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  putAsync(_url, resource) {
    return this.httpclient.put(this._baseUrl + _url, resource).pipe(
      retry(1),
      catchError(this.handleError)
    );

  }
  OnePointpostAsync(_url, resource) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpclient.post(this._onepointbaseUrl + _url, resource,httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteAsync(_url, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpclient.post(this._baseUrl + _url, id, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteMultipleAsync(_url) {
    return this.httpclient.delete(this._baseUrl + _url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  deleteOnePointAPIKeyByIdAsync(_url) {
    return this.httpclient.delete(_url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {

    if (error.status === 400)
      return throwError(error.error);
    else if (error.status === 404)
      return throwError(error.error);

    else if (error.status === 500)
      return throwError(error.error);

    else
      return throwError(error.error);

  }
  handleError1(error: HttpErrorResponse) {

    let errorMessage = '';
    if (error.error instanceof Error) {
      // client-side error
      errorMessage = `Error:$ {error.error["Message"].toString()}`;
    } else {
      // server-side error
      errorMessage = `Error Code:$ {error.status}\nMessage:$ {error.error["Message"].toString()}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}


