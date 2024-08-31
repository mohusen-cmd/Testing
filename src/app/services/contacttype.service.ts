import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";


@Injectable(
    {
        providedIn: 'root'
    }
)
export class ContactTypeService extends DataService {
    constructor(public httpclient: HttpClient) {
        super(httpclient);
    }
    GetContactTypeInfo(pageindex, pagesize, orderby, totalrecordcount) {
        var  getContactTypeInfo = this.ContactTypeAPI.getContactTypeeApi + pageindex + "/" + pagesize + "/" + orderby + "/" + totalrecordcount;
        return this.getAsync(getContactTypeInfo);
    }
    insertContactType(model) {
        return this.postAsync(this.ContactTypeAPI.insertContactTypedetails, model);
    }
    UpdateContactType(model) {
        return this.postAsync(this.ContactTypeAPI.updateContactTypedetails, model)
    }
    UpdateContactTypeStatusByIds(ID, status) {
        return this.postAsync(this.ContactTypeAPI.updateContactTypestatus + status, ID);
    }
    GetContacttypeDetailsbyid(ID) {
        let getcontacttypeUrl = this.ContactTypeAPI.getContactTypeeApi + ID;
        return this.getAsync(getcontacttypeUrl);
    }
    ContactTypeAPI =
        {
            getContactTypeeApi: '/api/1/contacttypeapi/',
            insertContactTypedetails: '/api/1/contacttypeapi',
            updateContactTypedetails: '/api/1/contacttypeapi/update',
            updateContactTypestatus: '/api/1/contacttypeapi/update/',
            createAPI: ''
        }
}