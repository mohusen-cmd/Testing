import { AccountListDomainModel, StageDomainModel, StateDomainModel, CountryDomainModel, LeadSourceDomainModel, AllNoteDomainModel, CustomManageMasterDomainModel, CustomValueMasterDomainModel } from './ILeadsDetailsDomainModel';

export class OpportunitiesDetailsDomainModel
{
    AccountObj: AccountListDomainModel;
    StageList: StageDomainModel[];
    StateList: StateDomainModel[];
    CountryList: CountryDomainModel[];
    LeadSourceList: LeadSourceDomainModel[];
    OppotypeList: OpportunityTypeDomainModel[];
    AllNotesObj: AllNoteDomainModel;
    ProdOppor: ProductOpportunityDomainMdel;
    listCustomfields: CustomManageMasterDomainModel[];
    lstcustomVM: CustomValueMasterDomainModel[];
}
export class OpportunityTypeDomainModel
{
    OTId: number;
    TypeName: string;
    Description: string;
    Status: string;
    RecordsCount: number;
    DuplicateTypeName: string;
}
export class ProductOpportunityDomainMdel
{
    POID: number;
    ACCOppID: number | null;
    MerchantServices: boolean | null;
    SEO: boolean | null;
    CashAdvance: boolean | null;
    ACHChecks: boolean | null;
    Agents: boolean | null;
    NotApplicable: boolean | null;
    NewMerchantSer: boolean;
    NewSEO: boolean;
    NewcashAdvance: boolean;
    NewACH: boolean;
    NewAgent: boolean;
    NOP: boolean;
}