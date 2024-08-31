export class ActivityViewModel 
{
    ActivityID: number | null;
    ActivityTypeID: any;
    ActivityName: string;
    StatusID: number | null;
    StatusName: string;
    PriorityID: number | null;
    PriorityName: string;
    AccountTypeID: number | null;
    AccountTypeName: string;
    ContactId: number | null;
    ContactName: string;
    AccountID: number | null;
    AssignedTo: number | null;
    AssignedFirstName: string;
    AssignedLastName: string;
    OwnerID: number | null;
    OwnerName: string;
    OwnerEmail: string;
    CreatedDate: Date | null;
    ModifiedDate: Date | null;
    DueDate:any | Date;
    RemindDate: any | Date;
    CompletedDate: Date | null;
    Createdby: number | null;
    creator: string;
    Modifiedby: number | null;
    modifier: string;
    DueTime: string;
    RemindTime: string;
    NotificationFlag: any;
    Notes: string;
    RecordsCount: number;
    ActCompanyName: string;
    AccountName: string;
    Phone: string;
    PhoneExt: string;
    Email: string;
    AssignedName: string;
    Leadid: number;
    RoleID: number;
    Subject: string;
    ActContactID: number;
    ActCompanyID: any;
    Sendnotice: boolean;
    Keyword: string;
    ActivitySubject: string;
    TypeList: ActivityTypeViewModel[];
    ListAccounttype: AccountTypeViewModel[];
    StatusList: StatusViewModel[];
    ListPriority: PriorityViewModel[];
    ActiLstNotes: AllNoteViewModel[];
    ActOpportunityID: number;
    OpporContactName: string;
    LeadConvert: number;
    OpporCompanyName: string;
    modulename: string;
    backofscheduler: any;
    backofnotifications: string;
    accounttypenamecheck: string;
    Description:string;
    RoleName:string;
    Attachment:any
    Switchrole:any
}
export class ActivityTypeViewModel
{
    AID: number;
    Name: string;
    Type: string;
    Status: string;
    RecordsCount: number;
    DuplicateName: string;
}
export class AccountTypeViewModel
{
    ID: number;
    AccountTypeName: string;
    Description: string;
    Active: boolean | null;
    lstAccountType: AccountTypeViewModel[];
}
export class StatusViewModel
{
    ID: number;
    StatusName: string;
    Description: string;
    Active: number | null;
    ActiveStatus: string;
    RecordsCount: number;
    DuplicateName: string;
}
export class PriorityViewModel
{
    ID: number;
    PriorityName: string;
    Description: string;
    Status: number | null;
    RecordsCount: number;
    ActiveStatus: string;
    DuplicateName: string;
}
export interface AllNoteViewModel
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
}