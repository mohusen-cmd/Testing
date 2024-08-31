// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiserver: 'http://localhost/CRMHostNew',//by postman || crm local
  //apiserver:'https://dev.psplhyd.com/Crmangular13-API',
apiserver: 'https://dev.psplhyd.com/CRMServicesHost',
  apiQBserver: `https://sandbox-quickbooks.api.intuit.com`,
  redirectURLCRMLocal: 'https://localhost:4200/verifyotp',
  redirectURLCRMQA: 'https://crm.psplhyd.com/verifyotp',
  onePointBaseUrl: 'https://api2.1pointinteractive.com'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
