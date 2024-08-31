import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable(
    {
        providedIn: 'root'
    }
)

export class QuickBookDataService {
    readonly _QBbaseUrl: string = '';
    readonly _url: string = '';
    readonly QBAccessToken = localStorage.getItem('QBAccessToken')
    readonly QBRealmID = localStorage.getItem('realmId')
    public http: HttpClient;
    constructor(public httpclient: HttpClient, public httpBackend: HttpBackend) {
        this._QBbaseUrl = environment.apiQBserver
        this.http = new HttpClient(httpBackend);
    }
    getAsync(_url) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${this.QBAccessToken}`,
            'Content-Type': 'application/json',
        })
        return this.http.get(this._QBbaseUrl + _url, { headers: headers })
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    postAsync(_url, resource) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${this.QBAccessToken}`,
            'Content-Type': 'application/json',
        })
        return this.http.post(this._QBbaseUrl + _url, resource, { headers: headers })
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