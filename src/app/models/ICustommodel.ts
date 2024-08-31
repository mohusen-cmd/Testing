
export class ICustommodel {
  FieldId: number;
  UserID: number;
  Module: string;

  Column_Id: number;

  flag : any;
  ActualColumnName: string;

  Column_Label: string;

  Column_Type: string;
  Field_Type: string;

  Column_Description: string;
  HoverText: string;
  InputDataType: string;
  DefaultValue: string;
  DisplayPosition: number | null;
  MaxLength: number | null;
  RequiredField: boolean | null;
  MultiValued: boolean | null;
  ColumnDrpChkValues: string;
  CreatedDate: Date
  ModifiedDate: Date
  IsActive: boolean |any;
  IsShowInJoinNow: boolean = false;
  lstCustomOptions: CustomDrpChkValuesDomainModel[];
  DrpValueId: number;
  drpFieldId: number=0;
  DrpValue: string;
  IsDefault: boolean;
  Fieldcount: number = 0;
}
export class CustomDrpChkValuesDomainModel {
  DrpValueId: number;
  FieldId: number;
  DrpValue: string;
  IsDefault: boolean;
  CreatedDate: string;
}