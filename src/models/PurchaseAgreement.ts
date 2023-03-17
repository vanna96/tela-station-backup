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
}

