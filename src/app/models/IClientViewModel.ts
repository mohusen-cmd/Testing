import { UserModel } from "./IUser";

export class ClientViewModel{

    ClientNumber:number;
    ClientID:any;
    ClientDBName:any;
    CompanyName:any;
    CompanyLogo:any;
    CompanyType:any;
    CompanyWebsite:any;
    EmailAPILink:string;
    EmailAPIKey:string;
    EmailAPIUserName:string;
    AuthKey:string;
    ConnectionString:string;
    ServerName:string;
    SalesTax:any;
    Sendnotice:boolean;
    LogoContent:string;
    Level:string;
    ApiPassword:any;
    ApiUsername:any;
    ApiMerchantkey:any
    Users= new UserModel();
    Address1: string;
    Address2: string;
    City: string;
    Country: string;
    PostalCode: string;   
    
    CreatedDate: Date | null;
    IsCorporate: boolean;
    Userid: number;
    QBAcctId: number;
    QBAcctName: string;
    QBAcctType: string;
    AccountName: string;
    AccountID: string;
    UserID: string;
    QBClientID: string;
    QBSecretID: string;
    QBRealmID: string;
    QBRefToken: string;
    ClientName: string;
    QBBankAccnt: string;
    QBAcctReceivable: string;
    QBSaleTaxAcct: string;
    QBStateToken: string;
    BankAcctNum: string;
    ReceivableAcctNum: string;
    SalesTaxAcctNum: string;
    SalesAcctNum: string;
    QBSalesAcct: string;
    State: string;
    access_token: string;
    QBId: number;
}