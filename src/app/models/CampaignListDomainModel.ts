export class CampaignListDomainModel {
    list_ID: number;
    list_name: string;
    description: string;
    target_audience: string;
    number_of_contacts: string;
    cand_list_ID: string;
    CreatedDate: Date | null;
    ModifiedDate: Date | null;
    CreatedBy: string;
    ModifiedBy: string;
    IsActive: boolean;
    APIListID: string;
    APIContactID: string;
}
