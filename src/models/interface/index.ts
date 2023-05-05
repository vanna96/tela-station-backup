

export interface MasterDocument {
    serie: string;
    docNum: any;
    paymentMethod?: string;
    paymentTerm?: string;
    shippingType?: string;
    items: Array<any>;
}


export interface DocumentLine {
    itemNo?: string;
    itemDescription?: string;
    itemGroup?: string;
    quantity?: number;
    unitPrice?: number;
    currency?: string;
    cumilativeQuantity?: number;
    cumilativeAmount?: number;
    plannedAmount?: number;
    lineDiscount?: number;
    uomEntry?: number;
    uomCode?: string;
    shippingType?: string;
    project?: string;
    taxCode?: string;
    taxRate?: number;
    // discountPercent?: number;
    vatGroup?: string;
    accountName?: string;
    // accountCode?: number;
}
export interface ContactEmployees {
    name?: string 
    cardCode?: number 
    position?: string 
    address?: string 
    phone1?: number 
    phone2?: number 
    mobilePhone?: number 
    fax?: string 
    e_Mail?: string 
    pager?: string 
    remarks1?: string 
    remarks2?: string 
    password?: number 
    internalCode?: number 
    placeOfBirth?: string 
    dateOfBirth?: string 
    gender?: string | string;
    profession?: string 
    title?: string 
    cityOfBirth?: string 
    firstName?: string 
    middleName?: string 
    lastName?: string 
    emailGroupCode?: number 
    connectedAddressName?: string 
    connectedAddressType?: string 
    foreignCountry?: string
}

export interface BPAddresses {
    addressName?: string;
    addressName2?: string;
    addressName3?: string;
}
