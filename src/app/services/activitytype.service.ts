import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";

@Injectable(
    {
        providedIn:'root'
    }
)
export class ActivityTypeservice extends DataService {

    constructor(public httpclient: HttpClient) {
        super(httpclient);
    }

    GetActivityTypeInfo(pageindex, pagesize, orderby, totalrecordcount) {
        var getActivityTypeInfo = this.ActivityTypeAPI.getActivityTypeApi + pageindex + "/" + pagesize + "/" + orderby + "/" + totalrecordcount;
        return this.getAsync(getActivityTypeInfo);
    }
    insertActivityType(model) {
        return this.postAsync(this.ActivityTypeAPI.insertActivityTypedetails, model);
    }
    GetActivityTypeDetailsbyid(ID) {
        let getcontacttypeUrl = this.ActivityTypeAPI.getActivityTypeApi + ID;
        return this.getAsync(getcontacttypeUrl);
    }
    UpdateactivityStatusByIds(ID, status) {
        return this.postAsync(this.ActivityTypeAPI.updateActivityTypestatus + status, ID);
    }
    UpdateActivityType(model) {
        return this.postAsync(this.ActivityTypeAPI.updateActivityTypedetails, model)
    }

    ActivityTypeAPI =
        {
            getActivityTypeApi: '/api/1/activitytypeapi/',
            insertActivityTypedetails: '/api/1/activitytypeapi',
            updateActivityTypedetails: '/api/1/activitytypeapi/update',
            updateActivityTypestatus: '/api/1/activitytypeapi/update/',
            createAPI: ''
        }
}