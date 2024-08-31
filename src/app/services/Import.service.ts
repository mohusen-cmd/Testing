import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ImportService extends DataService {
    constructor(public httpclient: HttpClient) {
        super(httpclient);

    }

    GetCompletedHistory(module, clientId) {
        let getCompletedHistoryUrl = this.ImportApi.GetCompletedHistory + module + '/' + clientId;
        return this.getAsync(getCompletedHistoryUrl);
    }
    GetPendingHistory(StatusPending, StatusInProgress, module, clientId) {
        let getCompletedHistoryUrl = this.ImportApi.GetPendingHistory + StatusPending + '/' + StatusInProgress + '/' + module + '/' + clientId;
        return this.getAsync(getCompletedHistoryUrl);
    }

    DownloadFile(filename, Originalfilename, clientId,module,username,uesrid) {
        let getCompletedHistoryUrl = `${this.ImportApi.GetDownloadFile}${filename}/${Originalfilename}/${clientId}/${module}/${username}/${uesrid}`;
        return this.getDownloadFileAsync(getCompletedHistoryUrl);
    }

    ImportApi = {
        GetCompletedHistory: '/api/1/loginapi/getcompletedhistory/',
        GetPendingHistory: '/api/1/loginapi/getpendinghistory/',
        GetDownloadFile: '/api/1/loginapi/downloadfile/',
    }
}
