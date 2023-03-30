import {  } from '../utilies';
import Model from './Model';
import { MasterDocument, DocumentLine } from './interface/index';
import moment from 'moment';
import { ContactEmployee } from './BusinessParter';
import GLAccountRepository from '@/services/actions/GLAccountRepository';

export interface PurchaseQoutationProps {
  id: any;
  docNum: any;
  cardCode?: string;
  cardName?: string;
  contactPersonCode?: number;
  docDate?: string;
  docDueDate?: string;
  requriedDate?: string
  terminateDate?: string;
  description?: string;
  status?: string;
  documentsOwner?: string;
  remark?: string;
  attachmentEntry?: number;
  paymentGroupCode?: string;
  priceList?: number;
  serie: string;
  paymentMethod?: string;
  shippingType?: string | undefined;
  journalMemo?: string;
  taxDate: string;
  comments: string;
  docType: string;
  address: string;
  address2: string;
  extraMonth: string;
  extraDays: string;
  cashDiscountDateOffset: number;
  createQRCodeFrom: string;
  cancelDate: string;
  indicator: string;
  federalTaxID: string;
  importFileNum: string;
  docCurrency: string;
  documentStatus: string;
  documentLine: PurchaseQoutationDocumentLineProps[];
  requiredDate: string;
  discountPercent?: string;
  itemName?: string;
  uomCode?: string
  transportationCode?: string;
  contactPersonList?: ContactEmployee[];
  numAtCard?: string;
  vatSum?: number;
  docTotalSys?: number;
  salesPersonCode?: number;
  accountNameD?: string;
}

export interface PurchaseQoutationDocumentLineProps {
  itemCode?: string | undefined;
  itemDescription?: string | undefined;
  quantity?: number | undefined;
  unitPrice?: number | undefined;
  currency?: string | undefined;
  lineDiscount?: number;
  uomEntry?: number | undefined;
  uomCode?: string | undefined;
  TransportationCode?: string | undefined;
  project?: string | undefined;
  taxCode?: string | undefined;
  taxRate?: number | undefined;
  vatGroup?: string | undefined;
  lineTotal?: string | undefined;
  requiredDate?: string | undefined
  shipDate?: string | undefined;
  accountCode?: number | undefined;
  accountName?: string | undefined;
  blanketAgreementNumber?: string | undefined;
  discountPercent?: string;
  itemName?: string;
  saleVatGroup?: string

}
export default class PurchaseQouatation extends Model implements MasterDocument {

  id: any;
  docNum: any;
  salesPersonCode?: number
  cardCode?: string;
  cardName?: string;
  docDate?: string;
  docDueDate?: string;
  requriedDate?: string
  terminateDate?: string;
  description?: string;
  status?: string;
  documentsOwner?: string;
  remark?: string;
  attachmentEntry?: number;
  paymentGroupCode?: string;
  priceList?: number;
  serie: string;
  paymentMethod?: string;
  shippingType?: string | undefined;
  journalMemo?: string;
  items: PurchaseQoutationDocumentLine[];
  taxDate: string;
  comments: string;
  docType: string;
  address: string;
  contactPersonList?: ContactEmployee[];
  address2: string;
  extraMonth: string;
  extraDays: string;
  cashDiscountDateOffset: number;
  createQRCodeFrom: string;
  cancelDate: string;
  indicator: string;
  federalTaxID: string;
  importFileNum: string;
  docCurrency: string;
  documentStatus: string;
  project: string;
  discountPercent?: string;
  itemName?: string;
  uomCode?: string;
  transportationCode?: string;
  contactPersonCode?: number;
  numAtCard?: string;
  vatSum?: number;
  docTotalSys?: number;
  accountNameD?: string;
  constructor(json: any) {
    super();
    this.salesPersonCode = json['SalesPersonCode']
    this.id = json['DocEntry'];
    this.docTotalSys = json['DocTotalSys']
    this.vatSum = json['VatSum'];
    this.numAtCard = json['NumAtCard']
    this.documentStatus = json['DocumentStatus'];
    this.federalTaxID = json['FederalTaxID']
    this.extraMonth = json['ExtraMonth'];
    this.extraDays = json['ExtraDays'];
    this.serie = json['Series'];
    this.docType = json['DocType'] === "dDocument_Service" ? "S" : "I";
    this.docNum = json['DocNum'];
    this.contactPersonList = json['contactPersonList'];
    this.journalMemo = json['JournalMemo']
    this.cardName = json['CardName'];
    this.cardCode = json['CardCode'];
    this.documentsOwner = json['DocumentsOwner'];
    this.cardCode = json['CardCode'];
    this.contactPersonCode = json['ContactPersonCode'];
    this.docDate = (json['DocDate']);
    this.docDueDate = (json['DocDueDate']);
    this.terminateDate = (json['TernimatedDate']);
    this.description = json['Description'];
    this.shippingType = json['TransportationCode'];
    this.paymentGroupCode = json['PaymentGroupCode'];
    this.taxDate = (json['TaxDate']);
    this.requriedDate = (json['RequriedDate']);
    this.comments = json['Comments'];
    this.address = json['Address'];
    this.address2 = json['Address2'];
    this.cashDiscountDateOffset = json['CashDiscountDateOffset'];
    this.items = json['DocumentLines']?.map((e: any) => new PurchaseQoutationDocumentLine(e));
    this.createQRCodeFrom = json['CreateQRCodeFrom'];
    this.cancelDate = json['CancelDate'];
    this.indicator = json['Indicator'];
    this.importFileNum = json['ImportFileNum'];
    this.paymentMethod = json['PaymentMethod'];
    this.docCurrency = json['DocCurrency'];
    this.project = json['Project'];
    this.discountPercent = json['DiscountPercent'];
    this.itemName = json['ItemDescription'];
    this.uomCode = json['UoMCode'];
    this.transportationCode = json['TransportationCode'];
    this.accountNameD = new GLAccountRepository().find(json["AccountCode"])?.Name

  }
  toJson(update: boolean) {
    throw new Error('Method not implemented.');
  }

  public static toCreate(json: any) {
    console.log(json)

    return {
      "SalesPersonCode": json['salesPersonCode'],
      "VatSum": json['vatSum'],
      "DocNum": json['docNum'],
      "NumAtCard": json['numAtCard'],
      "DocumentsOwner": json['documentsOwner'],
      "DocumentStatus": json['documentStatus'],
      "ImportFileNum": json['importFileNum'],
      "FederalTaxID": json['federalTaxID'],
      "Indicator": json['indicator'],
      "CancelDate": json['cancelDate'],
      "CashDiscountDateOffset": json['cashDiscountDateOffset'],
      "ExtraMonth": json['extraMonth'],
      "ExtraDays": json['extraDay'],
      "JournalMemo": json['journalMemo'],
      "CardCode": json['cardCode'],
      "CardName": json['cardName'],
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
      "Owner": json['owner'],
      "Remarks": json['remarks'],
      "AttachmentEntry": json['attachmentEntry'],
      "PaymentGroupCode": json['paymentGroupCode'],
      "Series": json['series'],
      "PaymentMethod": json['paymentMethod'],
      "TransportationCode": json['transportationCode'],
      "Project": json['project'],
      "DocCurrency": json['docCurrency'],
      "TaxDate": json['taxDate'],
      "CreateQRCodeFrom": json['createQRCodeFrom'],
      "DocumentLines": json['items'].map((e: any) => PurchaseQoutationDocumentLine.toCreate(e, json['docType']))
    };
  }


  public static toUpdate(json: any) {
    return {
      "SalesPersonCode": json['salesPersonCode'],
      "VatSum": json['vatSum'],
      "NumAtCard": json['numAtCard'],
      "DocumentsOwner": json['documentsOwner'],
      "DocumentStatus": json['documentStatus'],
      "ImportFileNum": json['importFileNum'],
      "FederalTaxID": json['federalTaxID'],
      "Indicator": json['indicator'],
      "CancelDate": json['cancelDate'],
      "CashDiscountDateOffset": json['cashDiscountDateOffset'],
      "ExtraMonth": json['extraMonth'],
      "ExtraDays": json['extraDay'],
      "JournalMemo": json['journalMemo'],
      "CardCode": json['cardCode'],
      "CardName": json['cardName'],
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
      "Owner": json['owner'],
      "Remarks": json['remarks'],
      "AttachmentEntry": json['attachmentEntry'],
      "PaymentGroupCode": json['paymentGroupCode'],
      "Series": json['series'],
      "PaymentMethod": json['paymentMethod'],
      "TransportationCode": json['transportationCode'],
      "Project": json['project'],
      "DocCurrency": json['docCurrency'],
      "TaxDate": json['taxDate'],
      "CreateQRCodeFrom": json['createQRCodeFrom'],
      "DocumentLines": json['items'].map((e: any) => PurchaseQoutationDocumentLine.toCreate(e, json['docType']))
    };
  }


}



export class PurchaseQoutationDocumentLine extends Model implements DocumentLine {
  itemCode?: string | undefined;
  itemDescription?: string | undefined;
  quantity?: number | undefined;
  unitPrice?: number | undefined;
  currency?: string | undefined;
  lineDiscount?: number;
  uomEntry?: number | undefined;
  uomCode?: string | undefined;
  TransportationCode?: string | undefined;
  project?: string | undefined;
  taxCode?: string | undefined;
  taxRate?: number | undefined;
  vatGroup?: string | undefined;
  lineTotal?: string | undefined;
  requiredDate?: string | undefined
  shipDate?: string | undefined;
  accountCode?: number | undefined;
  accountName?: string | undefined;
  blanketAgreementNumber?: string | undefined;
  discountPercent?: number;
  requriedDate?: string;
  itemName?: string;
  saleVatGroup?: string;
 
  constructor(json: any) {
    super();
    this.saleVatGroup = json['VatGroup']
    this.itemCode = json['ItemCode'];
    this.itemDescription = json['ItemDescription'];
    this.quantity = json['Quantity'];
    this.unitPrice = json['UnitPrice'];
    this.currency = json['PriceCurrency'];
    this.lineDiscount = json['LineDiscount'];
    this.uomEntry = json['UoMEntry'];
    this.uomCode = json['UoMCode'];
    this.project = json['Project'];
    this.vatGroup = json['VatGroup'];
    this.requriedDate = (json['RequriedDate']);
    this.discountPercent = json['DiscountPercent'];
    this.shipDate = (json['ShipDate']);
    this.accountCode = json['AccountCode'];
    this.accountName = json['AccountName'];
    this.lineTotal = json['LineTotal'];
    this.itemName = json['ItemDescription'];
    this.blanketAgreementNumber = json['BlanketAgreementNumber'];
 
  }
  toJson(update: boolean) {
    throw new Error('Method not implemented.');
  }

  public static toCreate(json: any, type: any) {

    let line = {
      "Quantity": json['quantity'],
      "ItemCode": json["itemCode"],
      "ItemDescription": json['itemDescription'],
      "ItemName": json['itemName'],
      "UnitPrice": json['unitPrice'],
      "LineDiscount": 0.0,
      "DocEntry": json['uomGroupEntry'],
      "UoMCode": json["uomCode"],
      "TransportationCode": 1,
      "Project": null,
      "TaxCode": null,
      "TAXRate": null,
      "VatGroup": json["vatGroup"],
      "LineTotal": json["lineTotal"],
      "RequiredDate": json["requiredDate"],
      "ShipDate": json["shipDate"],
      "AccountCode": json["accountCode"],
      "AccountName": json["accountName"],
      "BlanketAgreementNumber": json["blanketAgreementNumber"],
      "DiscountPercent": json["discountPercent"],
    };

    if (type === 'S') {
      delete line.ItemCode;
      delete line.UnitPrice;
    }

    return line;
  }


}


