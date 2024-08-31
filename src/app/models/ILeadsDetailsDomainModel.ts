import { AttachmentDomainModel } from './AttachmentViewModel';

export class LeadsDetailsDomainModel
{
    AccountObj: AccountListDomainModel;
    LeadDispoObj: LeadDispositionDomainModel;       
    StageList: StageDomainModel[];
    StateList: StateDomainModel[];
    CountryList: CountryDomainModel[];
    LeadSourceList: LeadSourceDomainModel[];
    AllNotesObj: AllNoteDomainModel;
    hdnsave1: boolean;
    listCustomfields: CustomManageMasterDomainModel[];
    lstcustomVM: CustomValueMasterDomainModel[];
    attachmentfileslist:AttachmentDomainModel[];
    UserName :any;
    RoleId   :any;
    UserId   :any; 
}
export class CustomManageMasterDomainModel
{
    FieldId: number;
    UserID: number;
    Module: string;
    Column_Id: number;
    ActualColumnName: string;
    Column_Label: string;
    Column_Type: string;
    Field_Type: string;
    Column_Description: string;
    HoverText: string;
    InputDataType: string;
    DefaultValue: string;
    DisplayPosition: number | null;
    MaxLength: number | null;
    RequiredField: boolean | null;
    MultiValued: boolean | null;
    ColumnDrpChkValues: string;
    CreatedDate: Date | null;
    ModifiedDate :Date | null;
    IsActive: boolean;
    IsShowInJoinNow: boolean;
    lstCustomOptions: CustomDrpChkValuesDomainModel[];
    DrpValueId: number;
    drpFieldId: number;
    DrpValue: string;
    IsDefault: boolean;
    flag: number;
    Fieldcount: number;
}
export class CustomValueMasterDomainModel
{
    CValueId: number;
    UserID: number;
    Module: string;
    ModuleRecordId: number | null;
    ModuleRecordIdTmp: number | null;
    MasterFieldId: number | null;
    CustomFieldvalue: string;
    CreatedDate: Date | null;
    ModifiedDate :Date | null;
    SearchIndex: string;          
    Column_Id: number;
    ActualColumnName: string;
    Column_Label: string;
    Column_Type: string;
    Field_Type: string;
    Column_Description: string;
    HoverText: string;
    InputDataType: string;
    DefaultValue: string | number;
    MaxLength: number | null;
    RequiredField: boolean | null;
    lstCustomOptionsVal: CustomDrpChkValuesDomainModel[];
    DrpValueId: number;
    drpFieldId: number;
    DrpValue: string;
    IsDefault: boolean;
    CMMFieldId: number;
    FieldId: number | null;
}
export class CustomDrpChkValuesDomainModel
{
    DrpValueId: number;
    FieldId: number;
    DrpValue: string;
    IsDefault: boolean;
    CreatedDate: Date | string;
}
export class StageDomainModel
{
    StageId: number;
    StageName: string;
    Description: string;
    Status: string;
    AccountTypeID: number | null;
    RecordsCount: number;
    AccountName: string;
    lstAccountType: AccountTypeDomainModel[];
    DuplicateStageName: string;
}
export class AccountTypeDomainModel
{
    ID: number;
    AccountTypeName: string;
    Description: string;
    Active: boolean | null;        
}
export class StateDomainModel
{
    ID: number;
    StateName: string;
    AbbrevIation: string;
    FullStateName: string; 
}
export class CountryDomainModel
{
    CountryId: number;
    CountryName: string;
}
export class LeadSourceDomainModel
{
    OSId: number;
    SourceName: string;
    Description: string;
    Status: string;
    RecordsCount: number;
    LeadSourceName: string;
}
export class AccountListDomainModel
{
    ID: number;
    Name: string;
    Title: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Phone: string;
    Fax: string;
    Email: string;
    Mobile: string;
    EmailOptOut: string;
    AccountTypeId: number | null;
    Website: string;
    Ownership: string;
    TotalEmployees: string;
    IndustryID: number | null;
    AnnualRevenue: string;
    Rating: string;
    LeadStatus: string;
    LeadSource: string;
    MailingAddress: string;
    MailingAddress2: string;
    Mailingcity: string;
    MailingstateID: number | null;
    Mailingzip: string;
    MailingcountryID: number | null;
    BillingAddress: string;
    BillingAddress2: string;
    Billingcity: string;
    BillingstateID: number | null;
    Billingzip: string;
    BillingcountryID: string;
    CreatedDate: Date | null;
    ModifiedDate: Date | null;
    CreatedBy: number | null;
    ModifiedBy: number | null;
    Description: string;
    SeachIndex: string;
    FacebookUsername: string;
    TwitterUsername: string;
    LinkedInUsername: string;
    SkypeUsername: string;
    ContactTypeID: number | null;
    CompanyID: any | null;
    CompanyName: string;
    CompanyDBA: string;
    OwnerID: number | null;
    EstimateBudget: number | null;
    CloseDate: Date | null;
    StageID: any | null;
    BusinessTypeID: any | null;
    BusinessTypeName: string;
    Probability: string;
    NextStep: string;
    ExpectedRevenue: any | null;
    OppurtunitySourceID: any | null;
    OpportunitySource: string;
    ContactID: any | null;
    IsLead: string;
    ProdOpporID: number | null;
    GenooSource: string;
    GenooID: string;
    IsGenoo: string;
    LeadSourceText: string;
    BuyingStageText: string;
    ContactTypeText: string;
    PhoneExt: string;
    MailingStateText: string;
    MailingCountryText: string;
    BillingStateText: string;
    BillingCountryText: string;
    OptEmailOut: boolean;
    LeadName: string;
    CompanyExists: string;
    IsOpportunity :boolean;
    OppAmount: number | null;
    OppName: string;
    ContactName: string;
    Owner: string;
    OwnerFirstName: string;
    OwnerLastName: string;
    Stage: string;
    LSource: string;
    BuyingStage: string;
    MaillingCountry: string;
    MaillingStateName: string;
    MaillingAbbreviation: string;
    BillingCountry: string;
    BillingStateName: string;
    BillingAbbreviation: string;
    Keyword: string;
    RoleID: number;
    ColumnName: string;
    Datatype: string;
    Maxlength: number;
    APIService: string;
    initialMailc: string;
    ContactCompanyName: string;
    OpporContactName: string;
    NotesId: number;
    OwnerShip1: string;
    Stage1: string;
    APIContactID: string;
    IsActivity: number;
    DepartmentID: number | null;
    DepartmentText: string;
    Activestatus: string;
    IsContactActive: boolean | null;
    FilePath: string;
    Radius: number;
    ZipCode: number;
    MaillingZip: string;
    RecordID: number;
    Distance: number;
    Postal: string;
    County: string;
    City1: string;
    Lat: string;
    Long: string;
    Country: string;
    Geo: string;
    Place: string;
    RecordsCount: number;
    EmailAPILink: string;
    EmailAPIKey: string;
    RoleName:string;
    Mailingcounty:any;
}
export class LeadDispositionDomainModel
{
    NewProspect: boolean;
    NewPMerchantService: boolean;
    NewPSEO: boolean;
    NewPcashAdvance: boolean;
    NewPACH: boolean;
    NewPAgent: boolean;
    NewSale: boolean;
    NewSMerchantService: boolean;
    NewSSEO: boolean;
    NewSCashAdvance: boolean;
    NewSACH: boolean;
    NewAgentAgreeCom: boolean;
    NewCallbackSchedule: boolean;
    NewNoInterest: boolean;
    NewDNC: boolean;
    NewLeftmessage: boolean;
    NewNotAvailable: boolean;
    Timee: string;
    LDID: number;
    ACCID: number | null;
    Prospect: boolean | null;
    PMerchantService: boolean | null;
    PSEO: boolean | null;
    PcashAdvance: boolean | null;
    PACH: boolean | null;
    PAgent: boolean | null;
    Sale: boolean | null;
    SMerchantService: boolean | null;
    SSEO: boolean | null;
    SCashAdvance: boolean | null;
    SACH: boolean | null;
    AgentAgreeCom: boolean | null;
    CallbackSchedule: boolean | null;
    Calendar: Date | null;
    Time: Date | null;
    NoInterest: boolean | null;
    DNC: boolean | null;
    Leftmessage: boolean | null;
    NotAvailable: boolean | null;
    dispotime: Date | string | null;
}
export class AllNoteDomainModel
{
    NotesID: number;
    AccounttypeID: number | null;
    IsActivity: boolean | null;
    ContactId: number | null;
    CompanyID: number | null;
    OpportunityID: number | null;
    LeadID: number | null;
    ActivityId: number | null;
    Notes: string;
    CreatedDate: Date | null;
    ModifiedDate: Date | null;
    CreatedBy: number | null;
    ModifiedBy: number | null;
    Module: string;
    Creator: string;
    Modifier: string;
    CreDate: string;
    CreTime: string;
    Moduleid: number;
    pagesize: number;
    RecordsCount: number;
}
export class APIContactViewModel {
    ContactId: string;
    EmailAddress: string;
    FirstName: string;
    LastName: string;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    PostalCode: string;
    Country: string;
    WorkPhone: string;
    HomePhone: string;
    MobilePhone: string;
    Fax: string;
    MaritalStatus: string;
    Gender: string;
    EmailContentType: string;
    BirthDate: string;
    CompanyName: string;
    casl_signupdate: string;
    casl_signup_method: string;
    casl_signup_url: string;
    casl_ipaddress: string;
    CustomFields: string;
    CustomFieldName: string;
    CustomFieldValue: string;
}
export class MailingInfoDomainModel {


    campaignName: string;
    subject: string;
    subjectLine: string="Course Registration Details ";
    fromName: string="Digital55";
    fromAddress: string="DrugFromAddress";
    replytoAddress: string="DrugReplytoAddress";
    assignedCampaign: string='';
    template: string;
    tokens: string='';
    targetListIds: string;
    vMTAName: string='';
    supressListIds: string;
    domainsupress: string;
    domainSuppressionListIds: string;
    mD5SuppressListIds: string;
    launchDateTime: string;
    recipients: string;
    enableTracking: string='1';
    unsubLink: string;
    trackLinks: boolean;
    toemails: string;
    ccEmails: string;
    bccEmails: string="DrugBccEmails";
    tempID: string;
    templateName: string;
    ContactXMLData: string = ""
    onePointAPI =``


}