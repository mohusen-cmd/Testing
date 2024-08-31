import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';


@Injectable({
    providedIn: 'root'
})
export class ListsService extends DataService {
    constructor(httpclient: HttpClient) {
        super(httpclient);
    }
    GetLists(lisname, targetaudience, description, numberOfContacts, SearchColumn, AlphanumericSort, orderByClause, totalCount) {
        var url = this.ListsAPI.listsapi + lisname + "/" + targetaudience + "/" + description + "/" + numberOfContacts + "/" + SearchColumn + "/" + AlphanumericSort + "/" + orderByClause + "/" + totalCount;
        return this.getAsync(url);
    }
    DeleteListById(formData) {
        return this.postAsync(this.ListsAPI.deleteListById, formData);
    }
    ListsAPI = {
        listsapi: '/api/1/emailapi/emailcampaignlist/',
        deleteListById: '/api/1/emailapi/deletelist'
    }
}
