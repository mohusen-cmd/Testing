import { IuserDetailsModel } from './iuser-details-model';
import { UserRolesDomainModel } from './IUserRoleModel';

export class UserModel {
    users: IuserDetailsModel;
    UserId: any;
    LoginId: string;
    Password: string;
    ConfirmPassword: string;
    FirstName: string;
    LastName: string;
    MiddelName: string;
    Email: string;
    RoleId: number;
    RepId: number;
    DealerId: number;
    Primary: boolean;
    Active: boolean;
    securitylevel: boolean;
    SetPassWords: boolean;
    InviteNewUser: boolean;
    Type: string;
    QId: any;
    Answer: string;
    ClientSecurityQuestion: string;
    ClientDB: string;
    Level: string;
    MiddleInitial: string;
    ClientFirstName: string;
    ClientLastName: string;
    ClientEmailId: string;
    Name: string;
    City: string;
    Phone: string;
    Keyword: string;
    State: string;
    Zip: string;
    Branch: string;
    AbbrevIation: string;
    Cellno: string;
    Fax: string;
    AdditionalEmail: string;
    CountryId: number;
    PortalCode: string;
    Address2: string;
    Address1: string;
    Extension: string;
    Rolelist: UserRolesDomainModel
    SecurityQueslist = SecurityQuestionDomainModel
    StateList: StateDomainModel[];
    Zipcode:any


    FullName: string;


    StateName: string;

    RoleName: string;
    BranchId: string;
    Branchname: string;
    RecordCount: number;

    PhoneExt: string;
    AddressLine1: string;
    AddressLine2: string;

    StateCode: string;
    PostalCode: string;
    Country: number | null;

    OutlookEmail: string;

    CreatedDate: string;
    Status: boolean | null;
    Comment: string;
    ModifiedBy: string;
    IsAllowsedingSMS: boolean | null;
    SMTPEmail: string;
    SMTPPassword: string;
    SMTPAddress: string;
    SMTPPort: string;
    IsCorporate: boolean | null;
    ApiUsername: string;
    ApiPassword: string;
    ApiMerchantkey: number;

    CountryList: CountryDomainModel[];
    Userslist: UserModel[];


}
class SecurityQuestionDomainModel {
    QId: any
    QName: any
}
class CountryDomainModel {
    CountryId: any
    CountryName: any
}
class StateDomainModel {
    ID: any
    StateName: any
    AbbrevIation: any
    FullStateName: any

}