import { Inject, Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClaimsHelper } from '../login/claimshelper';
import { CommonService } from './common.service';
import { DOCUMENT, PlatformLocation } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class OAuthQuickBookService {
    public readonly _baseUrl = environment.apiserver;
    public redirectUrl = "";
    public readonly scopes = 'com.intuit.quickbooks.accounting';
    public readonly authEndpoint = 'https://appcenter.intuit.com/connect/oauth2';
    public readonly tokenEndpoint = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';

    constructor(
        public http: HttpClient,
        public claimsHelper: ClaimsHelper,
        public commonservice: CommonService,
        @Inject(PlatformLocation) private platformLocation: PlatformLocation
    ) {
        const currentOrigin = (this.platformLocation as any)._doc.location.origin;
        this.redirectUrl = currentOrigin + '/verifyotp';
    }

    getAuthorizationUrl(QBClientID): any {
        const url = `${this.authEndpoint}`;
        const queryParams = {
            response_type: 'code',
            client_id: QBClientID,
            redirect_uri: this.redirectUrl,
            scope: this.scopes,
            state: this.generateGuid() // optional, used for CSRF protection
        };
        return `${url}?${this.encodeQueryParams(queryParams)}`;
    }

    GettingQuickBookAuthenticationToken(code: string, clientId: any, clientsecret: any) {
        if (this.redirectUrl == environment.redirectURLCRMLocal) {
            var Status = `AngularUI`;
            return this.http.get(`${this._baseUrl}/api/1/loginapi/QuickbookAuthentication/${code}/${clientId}/${clientsecret}/${Status}`);
        } else if (this.redirectUrl == environment.redirectURLCRMQA) {
            var Status = `AngularQA`;
            return this.http.get(`${this._baseUrl}/api/1/loginapi/QuickbookAuthentication/${code}/${clientId}/${clientsecret}/${Status}`);
        }
    }
    private encodeQueryParams(params: any): string {
        return Object.keys(params)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
    }
    generateGuid(): string {
        // This function generates a GUID.
        // You can use a library for this purpose or implement your own logic.
        // Here, I'm providing a simple example.
        const s4 = () =>
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        return `${s4()}${s4()}-R${s4()}-R${s4()}-R${s4()}-R${s4()}${s4()}${s4()}`;
    }
}
