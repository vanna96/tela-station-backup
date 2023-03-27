import { dateFormat } from '../utilies';
import Model from './Model';
import { MasterDocument, DocumentLine } from './interface/index';
import moment from 'moment';

export interface PurchaseQoutationProps {
  id: any;
  docNum: any;
  cardCode?: string;
  cardName?: string;
  constactPersonCode?: number;
  docDate?: string;
  docDueDate?: string;
  requriedDate?: string
  terminateDate?: string;
  description?: string;
  status?: string;
  owner?: string;
  remark?: string;
  attachmentEntry?: number;
  paymentTerm?: string;
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
  requiredDate: string
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
  accountCode?: string | undefined;
  accountName?: string | undefined;
  blanketAgreementNumber?: string | undefined
  discountPercent?:string
}
export default class PurchaseQouatation extends Model implements MasterDocument {
  id: any;
  docNum: any;
  cardCode?: string;
  cardName?: string;
  constactPersonCode?: number;
  docDate?: string;
  docDueDate?: string;
  requriedDate?: string
  terminateDate?: string;
  description?: string;
  status?: string;
  owner?: string;
  remark?: string;
  attachmentEntry?: number;
  paymentTerm?: string;
  priceList?: number;
  serie: string;
  paymentMethod?: string;
  shippingType?: string | undefined;
  journalMemo?: string;
  documentLine: PurchaseQoutationDocumentLine[];
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
  project:string
  constructor(json: any) {
    super();
    this.id = json['DocEntry'];
    this.documentStatus = json['DocumentStatus'];
    this.federalTaxID = json['FederalTaxID']
    this.extraMonth = json['ExtraMonth'];
    this.extraDays = json['ExtraDays'];
    this.serie = json['Series'];
    this.docType = json['DocType']
    this.docNum = json['DocNum'];
    this.journalMemo = json['JournalMemo']
    this.cardName = json['CardName'];
    this.cardCode = json['CardCode'];
    this.owner = json['DocumentsOwner'];
    this.cardCode = json['CardCode'];
    this.constactPersonCode = json['ContactPersonCode'];
    this.docDate = dateFormat(json['DocDate']);
    this.docDueDate = dateFormat(json['DocDueDate']);
    this.terminateDate = dateFormat(json['TernimatedDate']);
    this.description = json['Description'];
    this.shippingType = json['TransportationCode'];
    this.paymentTerm = json['PaymentGroupCode'];
    this.taxDate = dateFormat(json['TaxDate']);
    this.requriedDate = dateFormat(json['RequriedDate']);
    this.comments = json['Comments'];
    this.address = json['Address'];
    this.address2 = json['Address2'];
    this.cashDiscountDateOffset = json['CashDiscountDateOffset'];
    this.documentLine = json['DocumentLines']?.map((e: any) => new PurchaseQoutationDocumentLine(e));
    this.createQRCodeFrom = json['CreateQRCodeFrom'];
    this.cancelDate = json['CancelDate'];
    this.indicator = json['Indicator'];
    this.importFileNum = json['ImportFileNum'];
    this.paymentMethod = json['PaymentMethod'];
    this.docCurrency = json['DocCurrency'];
    this.project = json['Project']
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
      "PaymentTerms": json['paymentTerms'],
      "Series": json['series'],
      "PaymentMethod": json['paymentMethod'],
      "TransportationCode": json['TransportationCode'],
      "Project": json['project'],
      "DocNum": json['docNum'],
      "DocCurrency": json['docCurrency'],
      "TaxDate": json['taxDate'],
      "CreateQRCodeFrom": json['createQRCodeFrom'],
      "DocumentLines": json['items'].map((e: any) => PurchaseQoutationDocumentLine.toCreate(e, json['docType']))
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
      "DocType": json['docType'],
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
      "Owner": json['owner'],
      "Remarks": json['remarks'],
      "AttachmentEntry": json['attachmentEntry'],
      "PaymentTerms": json['paymentTerms'],
      "Series": json['series'],
      "DocNum": json['docNum'],
      "PaymentMethod": json['paymentMethod'],
      "ShippingType": json['shippingType'],
      "Project": json['project'],
      "DocCurrency": json['docCurrency'],
      "CreateQRCodeFrom": json['createQRCodeFrom'],
      "DocumentLines": []
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
  accountCode?: string | undefined;
  accountName?: string | undefined;
  blanketAgreementNumber?: string | undefined;
  discountPercent?: string;
  requriedDate?: string;
  constructor(json: any) {
    super();
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
    this.requriedDate = dateFormat(json['RequriedDate']);
    this.discountPercent = json['DiscountPercent'];
    this.shipDate = dateFormat(json['ShipDate']);
    this.accountCode = json['AccountCode'];
    this.accountName = json['AccountName'];
    this.lineTotal = json['LineTotal'];
    this.blanketAgreementNumber = json['BlanketAgreementNumber']
  }
  toJson(update: boolean) {
    throw new Error('Method not implemented.');
  }

  public static toCreate(json: any, type: any) {

    let line = {
      "ItemCode": json["ItemCode"],
      "ItemDescription": json['ItemDescription'],
      "UnitPrice": json['UnitPrice'],
      "LineDiscount": 0.0,
      "DocEntry": json['UoMGroupEntry'],
      "UoMCode": json["UoMCode"],
      "TransportationCode": 1,
      "Project": null,
      "TaxCode": null,
      "TAXRate": null,
      "VatGroup": json["VatGroup"],
      "LineTotal": json["LineTotal"],
      "RequiredDate": json["RequiredDate"],
      "ShipDate": json["ShipDate"],
      "AccountCode": json["AccountCode"],
      "AccountName": json["AccountName"],
      "BlanketAgreementNumber": json["BlanketAgreementNumber"],
      "DiscountPercent": json["DiscountPercent"],
    };

    if (type === 'S') {
      delete line.ItemCode;
      delete line.UnitPrice;
    }

    return line;
  }


}


