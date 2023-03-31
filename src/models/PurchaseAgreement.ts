import { dateFormat } from '../utilies';
import Model from './Model';
import { MasterDocument, DocumentLine } from './interface/index';
import moment from 'moment';
import { IContactPersonList } from '../astractions/index';
import { ContactEmployee } from './BusinessParter';
import ShippingTypeRepository from '../services/actions/shippingTypeRepository';
import PaymentTermTypeRepository from '../services/actions/paymentTermTypeRepository';
import OwnerRepository from '../services/actions/ownerRepository';
import { getValueDocumentStatus } from '@/constants';

export interface PurchaseAgreementProps {
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
    signingDate?: string;
    serie: string;
    paymentMethod?: string;
    shippingType?: string | undefined;
    documentLine: PurchaseAgreementDocumentLineProps[];
}

export interface PurchaseAgreementDocumentLineProps {
    itemNo?: string | undefined;
    itemDescription?: string | undefined;
    itemGroup?: string | undefined;
    quantity?: number | undefined;
    unitPrice?: number | undefined;
    currency?: string | undefined;
    cumulativeQuantity?: number | undefined;
    cumulativeAmount?: number | undefined;
    plannedAmount?: number;
    lineDiscount?: number;
    uomEntry?: number | undefined;
    uomCode?: string | undefined;
    shippingType?: string | undefined;
    project?: string | undefined;
    taxCode?: string | undefined;
    taxRate?: number | undefined;
}


export default class PurchaseAgreement extends Model implements MasterDocument {
    id: any;
    docNum: any;
    cardCode?: string;
    cardName?: string;
    contactPersonCode?: number;
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
    paymentTermType?: string;
    priceList?: number;
    signingDate?: string;
    serie: string;
    paymentMethod?: string;
    shippingType?: string | undefined;
    items: PurchaseAgreementDocumentLine[];
    email?: string | undefined | null;
    phone?: string | undefined | null;
    project?: string | undefined | null;
    contactPersonList?: ContactEmployee[];
    isEditable?: boolean;

    constructor(json: any) {
        super();
        
        this.id= json['AgreementNo'];
        this.docNum= json['DocNum'];
        this.cardCode= json['BPCode'];
        this.cardName= json['BPName'];
        this.contactPersonCode= json['ContactPersonCode'];
        this.startDate= json['StartDate'];
        this.endDate= json['EndDate'];
        this.terminateDate= json['TerminateDate'];
        this.description= json['Description'];
        this.agreementType= json['AgreementType']?.replace('at',"")?.charAt(0);
        this.status= getValueDocumentStatus(json['Status']);
        this.owner= json['Owner'];
        this.renewal= json['Renewal'] === 'tYES';
        this.remindUnit= json['RemindUnit']?.replace('reu_',"")?.charAt(0);
        this.remindTime= json['RemindTime'];
        this.remark= json['Remarks'];
        this.attachmentEntry= json['AttachmentEntry'];
        this.settlementProbability= json['SettlementProbability'];
        this.agreementMethod= json['AgreementMethod']?.replace('am',"")?.charAt(0);;
        this.paymentTermType= json['PaymentTerms'];
        this.priceList= json['PriceList'];
        this.signingDate= json['SigningDate'];
        this.serie= json['Series'];
        this.paymentMethod= json['PaymentMethod'];
        this.shippingType = json['ShippingType'];
        this.email = json['Email'];
        this.phone = json['Phone'];
        this.contactPersonList = json['contactPersonList'];
        this.project = json['Project'];
        this.isEditable = !json['Status']?.replace('as', "")?.charAt(0)?.includes('A');
        this.items= json['BlanketAgreements_ItemsLines']?.map((e:any) => new PurchaseAgreementDocumentLine(e));
    }

    toJson(update: boolean) {
        throw new Error('Method not implemented.');
    }


    public static toCreate(json: any) {
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
            "PaymentTerms":  json['paymentTermType'],
            "SigningDate": json['signingDate'],
            "Series": json['serie'],
            "PaymentMethod": json['paymentMethod'],
            "ShippingType": json['shippingType'],
            "NumAtCard": json['numAtCard'],
            "Project": json['project'],
            "BPCurrency": json['currency'],
            "BlanketAgreements_ItemsLines": json['items'].map((e:any) => PurchaseAgreementDocumentLine.toCreate(e, json['agreementMethod']))
        };
    }


    public static toUpdate(json: any) {
        return {
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
            "PaymentTerms":  json['paymentTermType'],
            "SigningDate": json['signingDate'],
            "PaymentMethod": json['paymentMethod'],
            "ShippingType": json['shippingType'],
            "NumAtCard": json['numAtCard'],
            "Project": json['project'],
            "BPCurrency": json['currency'],
            "BlanketAgreements_ItemsLines": json['items'].map((e:any) => PurchaseAgreementDocumentLine.toCreate(e, json['agreementMethod']))
        };
    }
    


    public static getRemindUnit(remindUnit : string | null): string {
        switch (remindUnit) {
            case 'D':
                return 'Days'
            case 'W':
                return 'Weeks'
            case 'M':
               return 'Months'
            default:
                return '';
        }
    } 

    public static getType(status: string | null): string {
        switch (status) {
            case 'M':
                return 'Monetary Method'
            default:
                return 'Items Method';
        }
    } 
}

export class PurchaseAgreementDocumentLine extends Model implements DocumentLine {
    itemCode?: string | undefined;
    itemName?: string | undefined;
    itemGroup?: string | undefined;
    quantity?: number | undefined;
    unitPrice?: number | undefined;
    currency?: string | undefined;
    cumulativeQuantity?: number | undefined;
    cumulativeAmount?: number | undefined;
    plannedAmount?: number;
    lineDiscount?: number;
    uomEntry?: number | undefined;
    uomCode?: string | undefined;
    shippingType?: string | undefined;
    project?: string | undefined;
    taxCode?: string | undefined;
    taxRate?: number | undefined;

    constructor(json: any) {
        super();
        this.itemCode = json['ItemNo'];
        this.itemName = json['ItemDescription'];
        this.itemGroup = json['ItemGroup'];
        this.quantity = json['PlannedQuantity'];
        this.unitPrice = json['UnitPrice'];
        this.currency = json['PriceCurrency'];
        this.cumulativeQuantity = json['CumulativeQuantity'];
        this.cumulativeAmount = json['CumulativeAmountFC'];
        this.plannedAmount = json['PlannedAmountFC'];
        this.lineDiscount =json['LineDiscount'];
        this.uomEntry = json['UoMEntry'];
        this.uomCode = json['UoMCode'];
        this.shippingType = json['ShippingType'];
        this.project = json['Project'];
        this.taxCode = json['TaxCode'];
        this.taxRate = json['TAXRate'];
    }


    toJson(update: boolean) {
        throw new Error('Method not implemented.');
    }


    public static toCreate(json: any, type: string) {
        
        let body = {
            "ItemNo": json["itemCode"],
            "ItemDescription": json['itemName'],
            "ItemGroup": json["itemsGroupCode"],
            "PlannedQuantity": json['quantity'],
            "UnitPrice": json['unitPrice'],
            "UoMEntry": json['uoMGroupEntry'],
            "UoMCode": null,
            "UnitsOfMeasurement": 1.0,
            "FreeText": json['freeText'] ?? null,
            "InventoryUoM": json['inventoryUOM'],
            "CumulativeQuantity": null,
            "CumulativeAmountLC": null,
            "CumulativeAmountFC": 0.0,
            "PortionOfReturns": null,
            "EndOfWarranty": null,
            "PlannedAmountLC": 0.0,
            "PlannedAmountFC": 0.0,
            "LineDiscount": 0.0,
            "UndeliveredCumulativeQuantity": null,
            "UndeliveredCumulativeAmountLC": null,
            "UndeliveredCumulativeAmountFC": 0.0,
            "ShippingType": json['shippingType'],
            "Project": null,
            "TaxCode": null,
            "TAXRate": null,
            "PlannedVATAmountLC": null,
            "PlannedVATAmountFC": null,
            "CumulativeVATAmountLC": null,
            "CumulativeVATAmountFC": null,
        };

        if (type === 'M') {
            delete body.ItemNo;
            delete body.ItemDescription;
            delete body.ItemGroup;
            delete body.UnitPrice;
            delete body.UoMEntry;
            delete body.InventoryUoM;
        }
        
        return body;
    }
}

