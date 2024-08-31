import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends DataService  {
  readonly _baseUrl: string = '';
  constructor(public httpclient: HttpClient,) {
    super(  httpclient,);
    this._baseUrl = environment.apiserver
}

GetNotificationDetails(loginid,startIndex,pageSize,orderByClause,TotalCount)
{
  let GetallNotification = this.NotificationApi.getNotificationdetails +loginid +"/"+ startIndex +"/"+pageSize +"/"+orderByClause+"/"+TotalCount;
  return this.getAsync(GetallNotification);
}

  NotificationApi = {
    getNotificationdetails :'/api/1/dashboardapi/'
  }
}
