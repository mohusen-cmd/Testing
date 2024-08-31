export class ListDetailViewModel {
  ListID: number;
  APIListID: string;
  ListName: string;
  Description: string;
  TargetAudience: string;
  NumberOfContacts: string;
  userID: string;
  ID: string;
  APIID: string;
  TotalCount: string;
}


export class contactEmailDomain {

  ListID: number = 0;
  APIListID: string
  ListName: string;
  Description: string;
  TargetAudience: string = "Contacts";
  NumberOfContacts: any;
  userID: string = null;
  ID: any = [];
  APIID: any
  TotalCount: string;
}


export class OpportunityEmailDomain {

  ListID: number = 0;
  APIListID: string
  ListName: string;
  Description: string;
  TargetAudience: string = "Opportunities";
  NumberOfContacts: any;
  userID: string = null;
  ID: any = [];
  APIID: any = "90";
  TotalCount: string;
}
export class opportunitysearchdetailsmodel {
  OpporFilterID: 0
  ListID: null
  OppKeyword: null
  OppOwner: null
  OppName: null
  OppExBudget: null
  OppCompanyName: null
  StageID: null
  BusinessTypeI: null
  OppState: null
  OppurtunitySourceID: null
  OppContact: null
  TargetAudience: null
  NumberOfContacts: null
  Id: null
  ApiID: null
  ApiOpportunityId: null
  TotalCount: null
  CandListID: null
  EditTargetAudience: null
  ListName: null
  Description: null
  APIListID: null
  Mode: null
}

export class contactsearchdetailsmodel {
  ContactFilterID: number
  ListID: number
  ContactKeyword: string
  ContactOwner: string
  ContactCompanyName: string
  ContactEmail: string
  ContactFirstName: string
  ContactLastName: string
  ContactCity: string
  ContactState: string
  ContactZipCode: number
  ContactTypeID: number
  TargetAudience: string
  NumberOfContacts: string
  Id: number
  ApiID: number
  TotalCount: number
  CandListID: number
  ApiContactId: string
  EditTargetAudience: string
  ListName: string
  Description: string
  APIListID: any
  Mode: string = "Insert"
}
export class leadsearchdetailsmodel {
  LeadFilterID: number
  ListID: number
  LeadKeyword: string
  LeadLeadOwner: string
  LeadCompanyName: string
  LeadEmail: string
  LeadFirstName: string
  LeadLastName: string
  LeadCity: string
  LeadState: string
  LeadZipCode: number
  LeadCountry: string
  LeadID: number
  LeadAPIID: string
  ApiLeadId: number
  LeadTotalCount: number
  TargetAudience: string
  NumberOfContacts: number
  ID: any
  APIID: number
  TotalCount: number
  CandListID: number
  EditTargetAudience: string
  ListName: string
  Description: string
  APIListID: number
  Mode: string = "Insert"
}
export class UpdateListDomainModel {
  ListMasterID: number
  ListName: string
  ListDesc: string
  ListOwner: string
  AllMembers: number
  ValidMembers: number
  CreatedDate: string
  ContactID: number
  UserType: string
  NumberOfContact: string
  ExceptionMsg: string
}
export class APIContactViewModel {
  ContactId: number
  EmailAddress: string
  FirstName: string
  LastName: string
  Address1: string
  Address2: string
  City: string
  State: string
  PostalCode: number
  Country: string
  WorkPhone: string
  HomePhone: string
  MobilePhone: string
  Fax: number
  MaritalStatus: string
  Gender: string
  EmailContentType: string
  BirthDate: number
  CompanyName: string
  Casl_signupdate: string
  Casl_signup_method: string
  Casl_signup_url: null
  Casl_ipaddress: string
  CustomFields: string
  CustomFieldName: string
  CustomFieldValue: string
}
