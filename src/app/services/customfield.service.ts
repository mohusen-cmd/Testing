import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class CustomfieldService extends DataService {

    constructor(public httpclient: HttpClient) {
        super(httpclient);

    }

    GetcustomfiledtypeList(userid, moduleid) {
        debugger
        let getfiledlistUrl = this.CustomfiledApi.getcustomfiledlistAPI + moduleid + "/" + userid;
        //let getfiledlistUrl= this.CustomfiledApi.getcustomfiledlistAPI+moduleid;
        return this.getAsync(getfiledlistUrl);
    }
    GetcustomfiledtypeListbymodule(moduleid) {

        let getfiledlistUrl = this.CustomfiledApi.getcustomfiledlistAPI + moduleid;
        return this.getAsync(getfiledlistUrl);
    }

    GetcustomfiledListbyid(ID) {

        let getactivitytypeUrl = this.CustomfiledApi.getcustomfiledlistbyidAPI + ID;
        return this.getAsync(getactivitytypeUrl);
    }
    Insertcustomfiled(model) {
        return this.postAsync(this.CustomfiledApi.insertcustomdetails, model);
    }
    Updatecustomfiled(model) {
        return this.postAsync(this.CustomfiledApi.updateCustomdetails, model);
    }

    UpdatecustomfieldstatusByIds(ID) {

        return this.postAsync(this.CustomfiledApi.updatecustomstatus, ID);
    }
    DeletecustomfieldByIds(ID) {
        debugger
        return this.getAsync(this.CustomfiledApi.deletecustomfield + ID);
    }
    GetAllcustomoptions(FieldID: any) {
        let getcustomoptions = `${this.CustomfiledApi.getcustomoptions}/${FieldID}`
        return this.getAsync(getcustomoptions);
    }
    Updatecustomoptions(model: any) {
        return this.postAsync(this.CustomfiledApi.Insertcustomoptions, model);
    }
    Deletecustomoption(ID: any) {
        debugger
        return this.getAsync(this.CustomfiledApi.deletecustomoption + ID);
    }
    CustomfiledApi = {
        getcustomfiledlistAPI: '/api/1/customfieldapi/',
        getcustomfiledlistAPIbymodule: '/api/1/customfieldapi/',
        insertcustomdetails: '/api/1/customfieldapi',
        updateCustomdetails: '/api/1/customfieldapi/update',
        updatecustomstatus: '/api/1/customfieldapi/inactivatefields/',
        getcustomfiledlistbyidAPI: '/api/1/customfieldapi/getcustomfielddetails/',
        deletecustomfield: '/api/1/customfieldapi/deletecustomfield/',
        getcustomoptions: `/api/1/customfieldapi/getcustomoptions`,
        Insertcustomoptions: `/api/1/customfieldapi/postcustomoptions`,
        deletecustomoption: `/api/1/customfieldapi/deletecustomoption/`
    }
}
