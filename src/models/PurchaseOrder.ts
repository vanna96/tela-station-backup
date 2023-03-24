import { dateFormat } from '../utilies';
import Model from './Model';
import { MasterDocument, DocumentLine } from './interface/index';


export default class PurchaseOrder extends Model implements MasterDocument {
    id: any;
    docNum: any;
    cardCode?: string;
    docType?: string;
    cardName?: string;
    journalMemo?: string;
    constactPersonCode?: number;
    docDate?: number;
    docDueDate?: number;
    taxDate?: number;
    description?: string;
    indicator?: number;
    status?: string;
    owner?: string;
    ship?: string;
    cashDiscountDateOffset?: number;
    createQRCodeFrom?: string;
    address?: string;
    address2?: string;
    comments?: string;
    extraMonth?: number;
    extraDays?: number;
    discountPercent?: string;
    cancelDate?: string;
    requiredDate?: string;
    attachmentEntry?: number;
    paymentTerm?: string;
    salesPersonCode?: string;
    federalTaxID?: string;
    importFileNum?: string;
    serie: string;
    paymentMethod?: string;
    documentLine: PurchaseOrderDocumentLine[];

    constructor(json: any) {
        super();
        this.id = json['DocEntry'];
        this.serie = json['Series'];
        this.docNum = json['DocNum'];
        this.owner = json['DocumentsOwner'];
        this.comments = json['Comments'];
        this.ship = json['TransportationCode'];
        this.paymentTerm = json['PaymentGroupCode'];
        this.paymentMethod = json['PaymentMethod'];
        this.federalTaxID = json['FederalTaxID'];
        this.cashDiscountDateOffset = json['CashDiscountDateOffset'];
        this.createQRCodeFrom = json['CashDiscountDateOffset'];
        this.cancelDate = json['CancelDate'];
        this.requiredDate = json['RequiredDate'];
        this.indicator = json['Indicator'];
        this.importFileNum = json['ImportFileNum'];
        this.docDate = json['DocDate'];
        this.docDueDate = json['DocDueDate'];
        this.taxDate = json['TaxDate'];
        this.address = json['Address'];
        this.address2 = json['Address2'];
        this.extraMonth = json['ExtraMonth'];
        this.extraDays = json['ExtraDays'];
        this.docType = json['DocType'];
        this.salesPersonCode = json['TaxDate'];
        this.cardName = json['BPName'];
        this.journalMemo = json['JournalMemo'];
        this.cardCode = json['CardCode'];
        this.cardName = json['cardName'],
        this.constactPersonCode = json['SalesPersonCode'];
        this.description = json['Description'];
        this.documentLine = []
    }
    

    toJson(update: boolean) {
        throw new Error('Method not implemented.');
    }

    public static toCreate(json: any) {
        console.log(json)

        return {
            "CardCode": json['cardCode'],
            "CardName": json['cardName'],
            "LineTotal": json['lineTotal'],
            "ContactPersonCode": json['contactPersonCode'],
            "JournalMemo": json['journalMemo'],
            "Description": json['description'],
            "Address": json['address'],
            "Address2": json['address2'],
            "ExtraMonth": json['extraMonth'],
            "ExtraDays": json['extraDays'],
            "CashDiscountDateOffset": json['cashDiscountDateOffset'],
            "CreateQRCodeFrom": json['createQRCodeFrom'],
            "CancelDate": json['cancelDate'],
            "RequiredDate": json['requiredDate'],
            "Indicator": json['indicator'],
            "FederalTaxID": json['federalTaxID'],
            "ImportFileNum": json['importFileNum'],
            "Status": json['status'],
            "Owner": json['owner'],
            "Remarks": json['remarks'],
            "VatGroup": json['vatGroup'],
            "AttachmentEntry": json['attachmentEntry'],
            "PaymentTerms":  json['paymentTerms'],
            "DocType":  json['docType'],
            "Series": json['series'],
            "PaymentMethod": json['paymentMethod'],
            "TransportationCode": json['transportationCode'],
            "Project": json['project'],
            "AccountCode": json['AccountCode'],
            "DocCurrency": json['currency'],
            "DocumentLines": json['items'].map((e:any) => PurchaseOrderDocumentLine.toCreate(e))
        };
    }


    public static toUpdate(json: any) {
        return {
            "CardCode": json['cardCode'],
            "CardName": json['cardName'],
            "LineTotal": json['lineTotal'],
            "ContactPersonCode": json['contactPersonCode'],
            "JournalMemo": json['journalMemo'],
            "Description": json['description'],
            "Status": json['status'],
            "VatGroup": json['VatGroup'],
            "Address": json['address'],
            "Address2": json['address2'],
            "ExtraMonth": json['extraMonth'],
            "ExtraDays": json['extraDays'],
            "Owner": json['owner'],
            "Remarks": json['remarks'],
            "AttachmentEntry": json['attachmentEntry'],
            "PaymentTerms":  json['paymentTerms'],
            "RequiredDate": json['requiredDate'],
            "FederalTaxID": json['federalTaxID'],
            "Indicator": json['indicator'],
            "ImportFileNum": json['importFileNum'],
            "DocType":  json['docType'],
            "CashDiscountDateOffset": json['cashDiscountDateOffset'],
            "CancelDate": json['cancelDate'],
            "SigningDate": json['signingDate'],
            "Series": json['series'],
            "DocNum": json['docNum'],
            "PaymentMethod": json['paymentMethod'],
            "TransportationCode": json['TransportationCode'],
            "NumAtCard": json['numAtCard'],
            "Project": json['project'],
            "AccountCode": json['AccountCode'],
            "DocCurrency": json['currency'],
            "DocumentLines": []
        };
    }
    

}

export class PurchaseOrderDocumentLine extends Model implements DocumentLine {
    itemNo?: string | undefined;
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
    AccountCode?: string | undefined;
    toJson(update: boolean) {
        throw new Error('Method not implemented.');
    }

    public static toCreate(json: any) {
        
        return {
            "ItemCode": json["ItemCode"],
            "ItemDescription": json['ItemName'],
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
            "AccountCode": json["AccountCode"],
        };
    }
}

