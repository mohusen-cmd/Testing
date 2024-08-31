import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { QuickBookDataService } from "./qbdata.service";
import { Observable } from "rxjs";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class QBApis extends QuickBookDataService {
  readonly _QBbaseUrl = environment.apiQBserver
  readonly QBAccessToken = localStorage.getItem('QBAccessToken')
  readonly QBRealmID = localStorage.getItem('realmId')


  constructor(public httpclient: HttpClient, public handler: HttpBackend) {
    super(httpclient, handler)
  }

  PostCompanywithQuickBook(QBObj: any) {
    return this.postAsync(`${this.QuickBooksAPI.CompanyQBAPI}`, QBObj)
  }
  

  postInvoiceListFromQuickBook(): Observable<any> {
    return new Observable((observer) => {
      const queryUrl = `${this._QBbaseUrl}${this.QuickBooksAPI.ItemListAPI}`;
      const request = new XMLHttpRequest();
      request.open("POST", queryUrl);
      request.setRequestHeader("Accept", "application/json");
      request.setRequestHeader("Authorization", "Bearer " + this.QBAccessToken);
      request.setRequestHeader("Content-Type", "application/text");
      request.send("select * from Account");
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status >= 200 && request.status < 400) {
            const body = request.responseText;
            observer.next(body);
            observer.complete();
          } else {
            observer.error(new Error(`Request failed with status: ${request.status}`));
          }
        }
      };
    });
  }

  PostItemsFromQuickBook(ItemObj: any) {
    return this.postAsync(this.QuickBooksAPI.ItemPostAPI, ItemObj)
  }



  QuickBooksAPI = {
    CompanyQBAPI: `/v3/company/${this.QBRealmID}/customer`,
    ItemListAPI: `/v3/company/${this.QBRealmID}/query?minorversion=40`,
    ItemPostAPI: `/v3/company/${this.QBRealmID}/item?minorversion=65`
    
  }
  //  CompanyQBAPI: `/v3/company/${this.QBRealmID}/customer?minorversion=65`,

}


//promise this is workingfine
  // PpostInvoiceListFromQuickBook(): Promise<any> {debugger
  //     return new Promise<any>((resolve, reject) => {
  //       var queryUrl = `${this._QBbaseUrl}${this.QuickBooksAPI.ItemListAPI}`;
  //       var request = new XMLHttpRequest();
  //       request.open("POST", queryUrl);
  //       request.setRequestHeader("Accept", "application/json");
  //       request.setRequestHeader("Authorization", "Bearer " + this.QBAccessToken);
  //       request.setRequestHeader("Content-Type", "application/text");
  //       request.send("select * from Account");
  //       request.onreadystatechange = function () {
  //         if (request.readyState === XMLHttpRequest.DONE) {debugger
  //           if (request.status >= 200 && request.status < 400) {
  //             var body = request.responseText;
  //             resolve(body);
  //           } else {
  //             reject(new Error("Request failed with status: " + request.status));
  //           }
  //         }
  //       };
  //     });
  //   }