import Model from "./Model";


export default class BusinessPartner extends Model {

    cardCode?: string;
    cardName?: string;
    cardType?: string;
    groupCode?: string;
    address?: string;
    mailAddress?: string;
    phone?: string;
    contactPerson?: string;
    salePersonCode?: string;
    note?: string;
    paymentTermTypeCode?: string;
    federalTaxId?: string;
    currency?: string;
    city?: string;
    country?: string;
    email?: string;
    picture?: string;
    defaultAccount?: string;
    defaultBranch?: string;
    defaultBankCode?: string;
    currentBalance?: number;
    deliveryNoteBalance?: number;
    openOrderBalance?: number;
    vatGroup?: string;
    shippingType?: number;
    indicator?: string;
    paymentMethod?: string;
    shipToDefault?: string;
    billToDefault?: string;
    website?: string;
    bpAddress?: BPAddress[];
    contactEmployee?: ContactEmployee[];
    bpPaymentMethod?: [];
    internalCode?: number;

    constructor (json: any) {
        super();

        this.cardCode = json['CardCode'];
        this.cardCode = json['CardCode'];
        this.internalCode = json['InternalCode'];
        this.cardType = json['CardType'];
        this.groupCode = json['GroupCode'];
        this.address = json['Address'];
        this.mailAddress = json['MailAddress'];
        this.phone = json['Phone1'];
        this.contactPerson = json['ContactPerson'];
        this.salePersonCode = json['SalesPersonCode'];
        this.note = json['Notes'];
        this.paymentTermTypeCode = json['PayTermsGrpCode'];
        this.federalTaxId = json['FederalTaxID'];
        this.currency = json['Currency'];
        this.city = json['City'];
        this.country = json['Country'];
        this.email = json['EmailAddress'];
        this.picture = json['Picture'];
        this.defaultAccount = json['DefaultAccount'];
        this.defaultBranch = json['DefaultBranch'];
        this.defaultBankCode = json['DefaultBankCode'];
        this.currentBalance = json['CurrentAccountBalance'];
        this.deliveryNoteBalance = json['OpenDeliveryNotesBalance'];
        this.openOrderBalance = json['OpenOrdersBalance'];
        this.vatGroup = json['VatGroup'];
        this.shippingType = json['ShippingType'];
        this.indicator = json['Indicator'];
        this.paymentMethod = json['PeymentMethodCode'];
        this.shipToDefault = json['ShipToDefault'];
        this.billToDefault = json['BilltoDefault'];
        this.website = json['Website'];
        this.bpAddress = json['BPAddresses']?.map((e: any) => new BPAddress(e));
        this.contactEmployee = json['ContactEmployees']?.map((e: any) => new ContactEmployee(e));
        this.bpPaymentMethod = [];
    }


    toJson(update: boolean) {
        throw new Error("Method not implemented.");
    }


    public getShippingToAddress() : string {
        const shipAddress = this.bpAddress?.find((e: BPAddress) => e.addressName === this.shipToDefault);
        
        if (!shipAddress) return '';

        return `${shipAddress.street}, ${shipAddress.city}, ${shipAddress.country}.`;
    }

    public getBillToAddress() : string {
        const shipAddress = this.bpAddress?.find((e: BPAddress) => e.addressName === this.shipToDefault);
        
        if (!shipAddress) return '';

        return `${shipAddress.street}, ${shipAddress.city}, ${shipAddress.country}.`;
    }
}


export class BPAddress extends Model {

    addressName?: string;
    street?: string;
    city?: string;
    country?: string;
    federalTaxId?: string;
    addressType?: string;

    constructor(json: any) {
        super();

        this.addressName = json['AddressName'];
        this.street = json['Street'];
        this.city = json['City'];
        this.country = json['Country'];
        this.federalTaxId = json['FederalTaxID'];
        this.addressType = json['AddressType'];
    }


    toJson(update: boolean) {
        throw new Error("Method not implemented.");
    }

}


export class ContactEmployee extends Model {
    
    id?: number;
    name?: string;

    constructor(json: any) {
        super();

        this.id = json['InternalCode'];
        this.name =json['Name']
    }

    
    toJson(update: boolean) {
        throw new Error("Method not implemented.");
    }

}