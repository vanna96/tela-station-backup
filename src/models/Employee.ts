import { dateFormat } from '../utilies';
import { ContactEmployee } from './BusinessParter';
import Model from './Model';
import { MasterDocument, DocumentLine } from './interface/index';
import moment from 'moment';

export interface EmployeeProps {
  id: any;
  employeeID?: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
}


export default class Employees extends Model {
  id: any;
  employeeID?: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  constructor(json: any) {
    super();
    this.id = json['EmployeeID'];
    this.employeeID = json['EmployeeID'];
    this.firstName = json['FirstName'];
    this.lastName = json['LastName'];
    this.middleName = json['MiddleName'];

  }
  toJson(update: boolean) {
    throw new Error('Method not implemented.');
  }

  public static toCreate(json: any) {
    console.log(json)

    return {
      "DocumentStatus": json['documentStatus'],
      "ImportFileNum": json['importFileNum'],
      "FederalTaxID": json['federalTaxID'],
      "Indicator": json['indicator'],
      "CancelDate": json['cancelDate'],
      "SalesPersonCode": json['salesPersonCode'],
      "DocTotalSys": json['docTotalSys'],
      "CashDiscountDateOffset": json['cashDiscountDateOffset'],
      "ExtraMonth": json['extraMonth'],
      "ExtraDays": json['extraDay'],
      "JournalMemo": json['journalMemo'],
      "VatSum": json['vatSum'],
      "CardCode": json['cardCode'],
      "CardName": json['cardName'],
      "NumAtCard": json['numAtCard'],
      "Comments": json['comments'],
      "DocType": json['docType'],
      "Address": json['address'],
      "Address2": json['address2'],
      "ContactPersonCode": json['contactPersonCode'],
      "DocDate": json['docDate'],
      "DocDueDate": json['docDueDate'],
      "RequriedDate": json['requriedDate'],
      "TerminateDate": json['terminateDate'],
      "Description": json['description'],
      "Status": json['status'],
      "DocumentsOwner": json['documentsOwner'],
      "Remarks": json['remarks'],
      "UoMcode": json['uomCode'],
      "AttachmentEntry": json['attachmentEntry'],
      "PaymentGroupCode":  json['paymentGroupCode'],
      "Series": json['series'],
      "PaymentMethod": json['paymentMethod'],
      "TransportationCode": json['transportationCode'],
      "Project": json['project'],
      "DocNum": json['docNum'],
      "DocCurrency": json['docCurrency'],
      "TaxDate": json['taxDate'],
      "CreateQRCodeFrom": json['createQRCodeFrom'],
    };
  }


  public static toUpdate(json: any) {
    return {
      "DocumentStatus": json['documentStatus'],
      "ImportFileNum": json['importFileNum'],
      "FederalTaxID": json['federalTaxID'],
      "Indicator": json['indicator'],
      "CancelDate": json['cancelDate'],
      "CashDiscountDateOffset": json['cashDiscountDateOffset'],
      "JournalMemo": json['journalMemo'],
      "Address": json['address'],
      "Address2": json['address2'],
      "NumAtCard": json['numAtCard'],
      "VatSum": json['vatSum'],
      "UoMCode": json['uomCode'],
      "SalesPersonCode": json['salesPersonCode'],
      "DocType": json['docType'],
      "DocTotalSys": json['docTotalSys'],
      "Comments": json['comments'],
      "RequriedDate": json['requriedDate'],
      "TaxDate": json['taxDate'],
      "CardCode": json['cardCode'],
      "CardName": json['cardName'],
      "ContactPersonCode": json['contactPersonCode'],
      "DocDate": json['docDate'],
      "DocDueDate": json['docDueDate'],
      "TerminateDate": json['terminateDate'],
      "Description": json['description'],
      "Status": json['status'],
      "DocumentsOwner": json['documentsOwner'],
      "Remarks": json['remarks'],
      "AttachmentEntry": json['attachmentEntry'],
      "PaymentGroupCode":  json['paymentGroupCode'],
      "Series": json['series'],
      "DocNum": json['docNum'],
      "PaymentMethod": json['paymentMethod'],
      "TransportationCode": json['transportationCode'],
      "Project": json['project'],
      "DocCurrency": json['docCurrency'],
      "CreateQRCodeFrom": json['createQRCodeFrom'],
    };
  }


}
