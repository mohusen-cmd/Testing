export class NotesListViewModel
    {
        
        ID: number;
        NotesId: number;
        ContactTypeID: number;
        Description: string;
        ContactID: number;       
        LeadID: number;
        OpportunityID: number;
        ActivityID: number;
        ModuleName: string;
        CreatedBy: number;
        ModifiedBy: number;       

        noteslist: AllNoteViewModel[];

    }

    export class AllNoteViewModel
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

        //Metadata properties
        Module: string;
        Creator: string;
        Modifier: string;
        CreDate: string;
        CreTime: string;
        Moduleid: number;
        pagesize: number;
    }