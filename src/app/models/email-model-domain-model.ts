
export class EmailModelDomainModel {
    JBCampaign: JBCampaignDomainViewModel;
    TriggerTemplateList: AdminisTemplateResultViewModel[];
    lstContactType: ContactTypeViewModel[];
    ManagebleValueList_From: GetManagebleValueResultViewModel[];
    ManagebleValueList_To: GetManagebleValueResultViewModel[];
    TransactionalTemplateList: JBCampaignDomainViewModel[];
    JBTemplate: AdminisTemplateResultViewModel;
    LeadSearch: EmailLeadSearchViewModel;
    ContactSearch: EmailContactSearchViewModel;
    OpporSearch: EmailOpporSearchViewModel;
    ListDetails: ListDetailViewModel;
    ListDetailInfoModel: ListViewModel;
    lstUserCountResultViewModel: GetUserCountResultViewModel;
    EmailAPILink: string;
    EmailAPIKey: string;

}
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
export class GetManagebleValueResultViewModel {
    Mid: number | null;
    manageable_Id: number | null;
    manageable_FieldText: string;
    manageable_FieldValue: string;
    ynDelete: boolean | null;
    status: string;
}
export class ContactTypeViewModel {
    ID: number;
    Name: string;
    Description: string;
    Active: number;
    RecordsCount: number;
    Status: string;
    CreatedDate: Date | null;
    ModifiedDate: Date | null;
    Createdby: number | null;
    DuplicateName: string;
}
export class AdminisTemplateResultViewModel {
    //emaildrpdown: CampaignEmailViewModel;

    emaildrpdownID: string;
    Temp_ID: number;
    Role_ID: string;
    UserType: string;
    Template_name: string;
    Template_html: string;
    Campaign_description: string;
    Cc: string;
    Bcc: string;
    SubjectLine: string;
    FromName: string;
    FromEmailAddress: string;
    ReplyToEmailAddress: string;



    ID: number;
    Name: string;
    Email: string;
    Active: number;
    CreatedDate: Date | null;
    ModifiedDate: Date | null;
    Createdby: number | null;
    UserId: number;

    Status: string;
    RecordsCount: number;
    DuplicateName: string;
}
export class JBCampaignDomainViewModel {
    camp_ID: number;
    Temp_ID: string;
    CampaignName: string;
    CampaignDescription: string;
    Status: string;
    Cc: string;
    Bcc: string;
    SubjectLine: string;
    FromName: string;
    FromEmailAddress: string;
    ReplyToEmailAddress: string;
    UnsubscribeInfo: string;
    userId: string;
    ImagePath: string;
    SelectCondition: string;
    APISelectCondition: string;
    UserType: string;
    HTMLContent: string;
    TextContent: string;
    IsActive: boolean | null;
    IsTrigger: boolean | null;
    UsedTrigger: string;
    SendType: string;
    ScheduledDatetime: Date | null;
    CreatedDate: Date | null;
    ModifiedDate: Date | null;
    CreatedBy: string;
    ModifiedBy: string;
    campAPI_ID: string;
    totalRecipient: string;

    // extra fields
    RecordsCount: number;
    ContactTargeted: string;
    SuccessfullDelivered: string;
    Bounced: string;
    TotalOpens: string;
    TotalClicks: string;
    CampStatus: boolean;
}
export class ListViewModel {
    ListMasterID: number;
    ListName: string;
    ListDesc: string;
    ListOwner: string;
    AllMembers: number;
    ValidMembers: number;
    CreatedDate: string;
    ContactID: string;
    userType: string;
    numberOfContact: string;
    exceptionMsg: string;
}
export class GetUserCountResultViewModel {
    RowID: number;
    LeadsCount: number | null;
    ContactsCount: number | null;
    OpportunitiesCount: number | null;
}

export class EmailLeadSearchViewModel {
    LeadFilterID: number;
    ListID: string;
    LeadKeyword: string;
    LeadLeadOwner: string;
    LeadCompanyName: string;
    LeadEmail: string;
    LeadFirstName: string;
    LeadLastName: string;
    LeadCity: string;
    LeadState: string;
    LeadZipCode: string;
    LeadCountry: string;
    LeadID: string;
    LeadAPIID: string;
    APILeadId: string;
    LeadTotalCount: string;
    TargetAudience: string;
    NumberOfContacts: string;
    ID: string;
    ApiID: string;
    TotalCount: string;
    candListID: string;
    EditTargetAudience: string;
    ListName: string;
    Description: string;
    APIListID: string;
    Mode: string;
}

export class EmailContactSearchViewModel {
    ContactFilterID: number;
    ListID: string;
    ContactKeyword: string;
    ContactOwner: string;
    ContactCompanyName: string;
    ContactEmail: string;
    ContactFirstName: string;
    ContactLastName: string;
    ContactCity: string;
    ContactState: string;
    ContactZipCode: string;
    ContactTypeID: string;

    TargetAudience: string;
    NumberOfContacts: string;
    ID: string;
    ApiID: string;
    TotalCount: string;
    candListID: string;
    APIContactId: string;
    EditTargetAudience: string;

    ListName: string;
    Description: string;
    APIListID: string;
    Mode: string;
}
export class EmailOpporSearchViewModel {
    OpporFilterID: number;
    ListID: string;
    OppKeyword: string;
    OppOwner: string;
    OppName: string;
    OppExBudget: string;
    OppCompanyName: string;
    StageID: string;
    BusinessTypeID: string;
    OppState: string;
    OppurtunitySourceID: string;
    OppContact: string;

    TargetAudience: string;
    NumberOfContacts: string;
    ID: string;
    ApiID: string;
    TotalCount: string;
    candListID: string;
    APIOpportunityId: string;
    EditTargetAudience: string;

    ListName: string;
    Description: string;
    APIListID: string;

    Mode: string;
}