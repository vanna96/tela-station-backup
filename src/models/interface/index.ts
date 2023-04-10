

export  interface MasterDocument {
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
    discountPercent?: number;
    vatGroup?: string;
    accountName?: string;
    accountCode?: string;
}