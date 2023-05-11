import { LineDocumentModel, MasterDocumentModel } from './Model';
import { ContactEmployee } from './BusinessParter';
import { getValueDocumentStatus } from '@/constants';


export default class PurchaseAgreement extends MasterDocumentModel {
    DocEntry: any;
    Series: string;
    DocNum: any;
    CardCode?: string;
    CardName?: string;
    ContactPersonCode?: number;
    StartDate?: string;
    EndDate?: string;
    TerminateDate?: string;
    Description?: string;
    AgreementType?: string;
    Status?: string;
    Owner?: string;
    Renewal?: boolean;
    RemindUnit?: string;
    RemindTime?: string;
    Remark?: string;
    AttachmentEntry?: number;
    SettlementProbability?: number;
    AgreementMethod?: string;
    PaymentTermType?: string;
    PriceList?: number;
    SigningDate?: string;
    Email?: string | undefined | null;
    Phone?: string | undefined | null;
    Project?: string | undefined | null;
    ContactPersonList?: ContactEmployee[];
    IsEditable?: boolean;
    Items: PurchaseAgreementDocumentLine[];

    constructor(json: any) {
        super();
        this.DocEntry = json['AgreementNo'];
        this.Series = json['Series'];
        this.DocNum = json['DocNum'];
        this.CardCode = json['CardCode'] ?? json['BPCode'];
        this.CardName = json['CardName'] ?? json['BPName'];
        this.ContactPersonCode = json['ContactPersonCode'];
        this.StartDate = json['StartDate'];
        this.EndDate = json['EndDate'];
        this.TerminateDate = json['TerminateDate'];
        this.Description = json['Description'];
        this.AgreementType = json['AgreementType']?.replace('at', "")?.charAt(0);
        this.Status = getValueDocumentStatus(json['Status']);
        this.Owner = json['Owner'];
        this.Renewal = json['Renewal'] === 'tYES';
        this.RemindUnit = json['RemindUnit']?.replace('reu_', "")?.charAt(0);
        this.RemindTime = json['RemindTime'];
        this.Remark = json['Remarks'];
        this.AttachmentEntry = json['AttachmentEntry'];
        this.SettlementProbability = json['SettlementProbability'];
        this.AgreementMethod = json['AgreementMethod']?.replace('am', "")?.charAt(0);;
        this.PaymentTermType = json['PaymentTerms'];
        this.PriceList = json['PriceList'];
        this.SigningDate = json['SigningDate'];
        this.PaymentMethod = json['PaymentMethod'];
        this.Email = json['Email'];
        this.Phone = json['Phone'];
        this.ContactPersonList = json['contactPersonList'];
        this.Project = json['Project'];
        this.IsEditable = !json['Status']?.replace('as', "")?.charAt(0)?.includes('A');
        this.Items = (json['BlanketAgreements_ItemsLines'] ?? json['Items'])?.map((e: any) => new PurchaseAgreementDocumentLine(e));
    }

    setItem(items: any[]) {
        this.Items = items;
    }

    toJson(update = false) {
        return {
            "BPCode": this.CardCode,
            "BPName": this.CardName,
            "ContactPersonCode": this.ContactPersonCode,
            "StartDate": this.StartDate,
            "EndDate": this.EndDate,
            "TerminateDate": this.TerminateDate,
            "Description": this.Description,
            "AgreementType": this.AgreementType,
            "Status": this.Status,
            "Owner": this.Owner === '' ? null : this.Owner,
            "IgnorePricesInAgreement": true ? 'Y' : 'N',
            "Renewal": this.Renewal ? 'Y' : 'N',
            "RemindUnit": this.RemindUnit,
            "RemindTime": this.RemindTime,
            "Remarks": this.Remark,
            "AttachmentEntry": this.AttachmentEntry === 0 ? null : this.AttachmentEntry,
            "SettlementProbability": this.SettlementProbability,
            "AgreementMethod": this.AgreementMethod,
            "PaymentTerms": this.PaymentTerm,
            "SigningDate": this.SigningDate,
            "Series": this.Series,
            "PaymentMethod": this.PaymentMethod,
            "ShippingType": this.ShippingType,
            // "NumAtCard": this.,
            // "Project": json['project'],
            // "BPCurrency": this.Cur,
            "BlanketAgreements_ItemsLines": this.Items.map((e) => e.toJson(this.AgreementMethod))
        };
    }


    public static getRemindUnit(remindUnit: string | null): string {
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

export class PurchaseAgreementDocumentLine extends LineDocumentModel {
    ItemCode?: string | undefined;
    ItemName?: string | undefined;
    ItemGroup?: string | undefined;
    Quantity?: number | undefined;
    UnitPrice?: number | undefined;
    Currency?: string | undefined;
    CumulativeQuantity?: number | undefined;
    CumulativeAmount?: number | undefined;
    PlannedAmount?: number;
    LineDiscount?: number;
    UomEntry?: number | undefined;
    UomCode?: string | undefined;
    ShippingType?: string | undefined;
    Project?: string | undefined;
    TaxCode?: string | undefined;
    TaxRate?: number | undefined;
    ItemDescription?: string | undefined;
    ItemGroupName?: string | undefined;
    CumilativeQuantity?: number | undefined;
    CumilativeAmount?: number | undefined;
    UomGroupEntry?: number | undefined;
    UomGroupName?: number | undefined;
    VatGroup?: string | undefined;
    AccountName?: string | undefined;
    UnitsOfMeasurement: number | undefined;

    constructor(json: any) {
        super();
        this.ItemCode = json['ItemNo'] ?? json['ItemCode'];
        this.ItemName = json['ItemDescription'];
        this.ItemGroup = json['ItemGroup'];
        this.Quantity = json['PlannedQuantity'] ?? json['Quantity'];
        this.UnitPrice = json['UnitPrice'];
        this.Currency = json['PriceCurrency'];
        this.CumulativeQuantity = json['CumulativeQuantity'];
        this.CumulativeAmount = json['CumulativeAmountFC'];
        this.PlannedAmount = json['PlannedAmountFC'];
        this.LineDiscount = json['LineDiscount'];
        this.UomEntry = json['UoMEntry'];
        this.UomCode = json['UoMCode'];
        this.ShippingType = json['ShippingType'];
        this.Project = json['Project'];
        this.TaxCode = json['TaxCode'] ?? json['VatGroup'];
        this.TaxRate = json['TAXRate'];
        this.UnitsOfMeasurement = json['UnitsOfMeasurement']
    }

    setUOMGroup(uomGroup: any): void {
        this.UomGroupEntry = uomGroup.AbsEntry;
        this.UomGroupName = uomGroup?.Code;
    }

    setItemGroup(itemGroup: any): void {
        //   this.itemGroup = itemGroup.
    }

    toJson(type = 'I', update = false) {
        let body = {
            "ItemNo": this.ItemCode,
            "ItemDescription": this.ItemName,
            "ItemGroup": this.ItemGroup,
            "PlannedQuantity": this.Quantity,
            "UnitPrice": this.UnitPrice,
            "UoMEntry": this.UomEntry,
            "UoMCode": this.UomCode,
            // "UnitsOfMeasurement": 0,
            // "FreeText": this ?? null,
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
            "ShippingType": this.ShippingType,
            "Project": null,
            "TaxCode": this.TaxCode,
            // "TAXRate": null,
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
        }

        return body;
    }
}

