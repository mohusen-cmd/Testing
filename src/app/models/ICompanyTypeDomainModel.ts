export class CompanyTypeDomainModel {
    ID: number = 0;
    Name: string;
    Description: string;
    Active: number = 1;
    CreatedDate: string = null;
    ModifiedDate: string = null;
    Createdby: number = null;
    ActiveStatus: string = null;
    RecordsCount: number = 0;
    DuplicateName: string = null;
}