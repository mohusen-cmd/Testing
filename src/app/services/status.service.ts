import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class StatusService extends DataService {

    constructor(httpclient: HttpClient) {
        super(httpclient);

    }
    StatusAPI = {
        getallstatus: '/api/1/statusapi/',
        updatestatus: '/api/1/statusapi/update/',
        save: '/api/1/statusapi/  ',
    }
    GetStatusList(SearchColumn, AlphanumericSort, orderByClause, totalCount) {
        var getstatuslist = this.StatusAPI.getallstatus + SearchColumn + "/" + AlphanumericSort + "/" + orderByClause + "/" + totalCount;
        return this.getAsync(getstatuslist);
    }

    UpdateStatusByIds(ID, status) {

        return this.postAsync(this.StatusAPI.updatestatus + status, ID);
    }
    GetStatusDetailsbyid(id) {

        let getcontacttypeUrl = this.StatusAPI.getallstatus + id;
        return this.getAsync(getcontacttypeUrl);
    }
    UpdateStatus(model) {
        return this.postAsync(this.StatusAPI.updatestatus, model);
    }
   
    SaveStatusTypeDetails(model) {
        return this.postAsync(this.StatusAPI.save, model);
    }
}
