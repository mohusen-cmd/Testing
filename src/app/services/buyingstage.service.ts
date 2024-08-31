import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable(
    {
        providedIn: 'root'
    }
)
export class BuyingstageService extends DataService {

    constructor(public httpclient: HttpClient) {
        super(httpclient);
    }
    GetbuyingstagetypeInfo(pageindex, pagesize, orderby, totalrecordcount) {

        var getbuyingstagetypeInfo = this.BuyingStageAPI.getbuyingstagetypeApi + pageindex + "/" + pagesize + "/" + orderby + "/" + totalrecordcount;
        return this.getAsync(getbuyingstagetypeInfo);
    }

    insertbuyingstagetype(model) {
        return this.postAsync(this.BuyingStageAPI.insertbuyingstagetypedetails, model);
    }

    Updatebuyingstagetype(model) {
        return this.postAsync(this.BuyingStageAPI.updatebuyingstagetypedetails, model)
    }

    GetbuyingstagetypeDetailsbyid(ID) {
        let getbuyingtypeUrl = this.BuyingStageAPI.getbuyingstagetypeApi + ID;
        return this.getAsync(getbuyingtypeUrl);
    }
    UpdatebuyingstageStatusByIds(ID, status) {

        return this.postAsync(this.BuyingStageAPI.updatebuyingstagetypestatus + status, ID);
    }
    DuplicateBuyingstagetype(sourceName: any) {
        var getbuyingstagetypeInfoDuplicate = `${this.BuyingStageAPI.getbuyingstagetypeduplicateApi}/${sourceName}`
        return this.getAsync(getbuyingstagetypeInfoDuplicate);
    }
    createbuyingstagetype() {
        return this.getAsync(this.BuyingStageAPI.insertbuyingstagetypedetails);
    }

    BuyingStageAPI =
        {
            getbuyingstagetypeApi: '/api/1/stageapi/',
            insertbuyingstagetypedetails: '/api/1/stageapi',
            updatebuyingstagetypedetails: '/api/1/stageapi/update',
            updatebuyingstagetypestatus: '/api/1/stageapi/update/',
            getbuyingstagetypeduplicateApi: `/api/1/stageapi/isduplicatestagefromangular`
            // createAPI: ''
        }

}