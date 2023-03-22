import { dateFormat } from '../utilies';
import Model from './Model';
import { MasterDocument, DocumentLine } from './interface/index';


export default class PurchaseAgreement extends Model implements MasterDocument {
    id: any;
    docNum: any;
    cardCode?: string;
    cardName?: string;
    constactPersonCode?: number;
    startDate?: string;
    endDate?: string;
    terminateDate?: string;
    description?: string;
    agreementType?: string;
    status?: string;
    owner?: string;
    renewal?: boolean;
    remindUnit?: string;
    remindTime?: string;
    remark?: string;
    attachmentEntry?: number;
    settlementProbability?: number;
    agreementMethod?: string;
    paymentTerm?: string;
    priceList?: number;
    signeDate?: string;
    serie: string;
    paymentMethod?: string;
    shippingType?: string | undefined;
    documentLine: PurchaseAgreementDocumentLine[];

    constructor(json: any) {
        super();
        this.id = json['AgreementNo'];
        this.serie = json['Series'];
        this.docNum = json['DocNum'];
        this.cardName = json['BPName'];
        this.cardCode = json['BPCode'];
        this.constactPersonCode = json['ContactPersonCode'];
        this.startDate = dateFormat(json['StartDate']);
        this.endDate =  dateFormat(json['EnDate']);
        this.terminateDate = dateFormat(json['TernimatedDate']);
        this.signeDate = dateFormat(json['SignedDate']);
        this.description = json['Description'];
        this.documentLine = []
    }
    

    toJson(update: boolean) {
        throw new Error('Method not implemented.');
    }

    public static toCreate(json: any) {
        console.log(json)

        return {
            "BPCode": json['cardCode'],
            "BPName": json['cardName'],
            "ContactPersonCode": json['contactPersonCode'],
            "StartDate": json['startDate'],
            "EndDate": json['endDate'],
            "TerminateDate": json['terminateDate'],
            "Description": json['description'],
            "AgreementType": json['agreementType'],
            "Status": json['status'],
            "Owner": json['owner'],
            "IgnorePricesInAgreement": json['inorePricesInAgreement'] ? 'Y' : 'N',
            "Renewal": json['renewal'] ? 'Y' : 'N',
            "RemindUnit": json['remindUnit'],
            "RemindTime": json['remindTime'],
            "Remarks": json['remarks'],
            "AttachmentEntry": json['attachmentEntry'],
            "SettlementProbability": json['settlementProbability'],
            "AgreementMethod": json['agreementMethod'],
            "PaymentTerms":  json['paymentTerms'],
            "SigningDate": json['signingDate'],
            "Series": json['serie'],
            "PaymentMethod": json['paymentMethod'],
            "ShippingType": json['shippingType'],
            "NumAtCard": json['numAtCard'],
            "Project": json['project'],
            "BPCurrency": json['currency'],
            "BlanketAgreements_ItemsLines": json['items'].map((e:any) => PurchaseAgreementDocumentLine.toCreate(e))
        };
    }


    public static toUpdate(json: any) {
        return {
            "BPCode": json['cardCode'],
            "BPName": json['cardName'],
            "ContactPersonCode": json['contactPersonCode'],
            "StartDate": json['startDate'],
            "EndDate": json['endDate'],
            "TerminateDate": json['terminateDate'],
            "Description": json['description'],
            "AgreementType": json['agreementType'],
            "Status": json['status'],
            "Owner": json['owner'],
            "IgnorePricesInAgreement": json['inorePricesInAgreement'] ? 'Y' : 'N',
            "Renewal": json['renewal'] ? 'Y' : 'N',
            "RemindUnit": json['remindUnit'],
            "RemindTime": json['remindTime'],
            "Remarks": json['remarks'],
            "AttachmentEntry": json['attachmentEntry'],
            "SettlementProbability": json['settlementProbability'],
            "AgreementMethod": json['agreementMethod'],
            "PaymentTerms":  json['paymentTerms'],
            "SigningDate": json['signingDate'],
            "Series": json['serie'],
            "DocNum": json['docNum'],
            "PaymentMethod": json['paymentMethod'],
            "ShippingType": json['shippingType'],
            "NumAtCard": json['numAtCard'],
            "Project": json['project'],
            "BPCurrency": json['currency'],
            "BlanketAgreements_ItemsLines": []
        };
    }
    

}

export class PurchaseAgreementDocumentLine extends Model implements DocumentLine {
    itemNo?: string | undefined;
    itemDescription?: string | undefined;
    itemGroup?: string | undefined;
    quantity?: number | undefined;
    unitPrice?: number | undefined;
    currency?: string | undefined;
    cumilativeQuantity?: number | undefined;
    cumilativeAmount?: number | undefined;
    plannedAmount?: number;
    lineDiscount?: number;
    uomEntry?: number | undefined;
    uomCode?: string | undefined;
    shippingType?: string | undefined;
    project?: string | undefined;
    taxCode?: string | undefined;
    taxRate?: number | undefined;


    toJson(update: boolean) {
        throw new Error('Method not implemented.');
    }


    


    public static toCreate(json: any) {
        
        return {
            "ItemNo": json["ItemCode"],
            "ItemDescription": json['ItemName'],
            "ItemGroup": json["ItemsGroupCode"],
            "PlannedQuantity": json['Quantity'],
            "UnitPrice": json['UnitPrice'],
            "CumulativeQuantity": null,
            "CumulativeAmountLC": null,
            "CumulativeAmountFC": 0.0,
            "FreeText": json['freeText'] ?? null,
            "InventoryUoM": json['InventoryUOM'],
            "PortionOfReturns": null,
            "EndOfWarranty": null,
            "PlannedAmountLC": 0.0,
            "PlannedAmountFC": 0.0,
            "LineDiscount": 0.0,
            "UoMEntry": json['UoMGroupEntry'],
            "UoMCode": null,
            "UnitsOfMeasurement": 1.0,
            "UndeliveredCumulativeQuantity": null,
            "UndeliveredCumulativeAmountLC": null,
            "UndeliveredCumulativeAmountFC": 0.0,
            "ShippingType": 1,
            "Project": null,
            "TaxCode": null,
            "TAXRate": null,
            "PlannedVATAmountLC": null,
            "PlannedVATAmountFC": null,
            "CumulativeVATAmountLC": null,
            "CumulativeVATAmountFC": null,
        };
    }
}

