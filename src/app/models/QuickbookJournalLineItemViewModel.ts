export class QuickbookJournalLineItemViewModel {
    Id?: string;
    Description: string;
    Amount: number;
    DetailType: string;
    JournalEntryLineDetail: QBJournalEntryLineDetailViewModel;
}
export class QBJournalEntryLineDetailViewModel {
    PostingType: string;
    AccountRef: IncomeAccountsRefViewModel;
    Entity?: QBJournalEntryEntity;
}
export class IncomeAccountsRefViewModel {
    value: any
    name: any
}

export class QBJournalEntryEntity {
    Type: any
    EntityRef: IncomeAccountsRefViewModel
}
export class QBJournalEntryViewModel {
    DocNumber: any
    Line: QuickbookJournalLineItemViewModel[];
    QBRealmID:any
    QBBearerToken:any
}