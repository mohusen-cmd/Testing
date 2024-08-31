export class JBCampaignDomainModel {
    camp_ID: number = 0;
    Temp_ID: string = '5';
    CampaignName: string='';
    CampaignDescription: string;
    Status: string;
    Cc: string = null;
    Bcc: string = "sales@jobarto.com";
    SubjectLine: string='';
    FromName: string = 'CRM Team';
    FromEmailAddress: string = 'crm-qa@priyanet.com';
    ReplyToEmailAddress: string = 'crm-qa@priyanet.com';
    UnsubscribeInfo: string = null;
    userId: string = '1';
    ImagePath: string = '';
    SelectCondition: any = '';
    APISelectCondition: string = '';
    UserType: string ='';
    HTMLContent: string;
    TextContent: string = '';
    IsActive: boolean | null = true;
    IsTrigger: boolean | null = false;
    UsedTrigger: string = '';
    SendType: string = '';
    ScheduledDatetime: any | null;
    CreatedDate: string | null;
    ModifiedDate: any | null;
    CreatedBy: string = "1";
    ModifiedBy: string = '1';
    campAPI_ID: string = '';
    totalRecipient: string = '';
    RecordsCount: number = 0;
    ContactTargeted: string = null;
    SuccessfullDelivered: string = null;
    Bounced: string = null;
    TotalOpens: string = null;
    TotalClicks: string = null;
    CampStatus: boolean = false;

}

export class MailingInfoViewModel {
    CampaignName: any;
    Subject: string;
    SubjectLine: string;
    FromName: string;
    FromAddress: string;
    ReplytoAddress: string;
    AssignedCampaign: string;
    Template: string;
    Tokens: string;
    TargetListIds: string;
    VMTAName: string;
    SupressListIds: string;
    Domainsupress: string;
    DomainSuppressionListIds: string;
    MD5SuppressListIds: string;
    LaunchDateTime: any;
    Recipients: string;
    EnableTracking: string;
    UnsubLink: string;
    TrackLinks: boolean;
    Toemails: string;
    CcEmails: string;
    BccEmails: string;
    TempID: any;
    TemplateName: string;
}

export class ListViewModel {
    listMasterID: number;
    listName: string;
    listDesc: string;
    listOwner: string;
    allMembers: number;
    validMembers: number;
    createdDate: string;
    contactID: string;
    userType: string;
    numberOfContact: any = 0;
    exceptionMsg: string;
}