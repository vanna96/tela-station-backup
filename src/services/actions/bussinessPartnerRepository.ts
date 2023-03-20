import Repository from "@/astractions/repository";
import BusinessPartner from "@/models/BusinessParter";
import request from "@/utilies/request";



export default class BusinessPartnerRepository extends Repository<BusinessPartner> {
    url = '/BusinessPartners';

    queryList = [
    "ShipToDefault",
    "ShippingType",
    "CardName",
    "CardCode",
    "CurrentAccountBalance",
    "Currency",
    "PriceListNum",
    "ContactEmployees",
    "SalesPersonCode",
    "OwnerCode",
    "VatGroup",
    'BPAddresses',
    'BPAccountReceivablePaybleCollection',
    'CardType',
    'BPBankAccounts',
    'PeymentMethodCode',
    'BPPaymentMethods',
    'PayTermsGrpCode',
    "BilltoDefault",
    "EmailAddress",
    "Phone1"
  ];

    async get<BusinessPartner>(query?: string | undefined): Promise<BusinessPartner[]> {
        return await request('GET', this.url + "?$top=8&$select=" + this.queryList.join(',')).then((res: any) => res?.data?.value).catch((e) => {
            throw new Error(e);
        });
    }

    async find<T>(query?: string | undefined): Promise<T> {
        throw new Error("Method not implemented.");
    }

    post(payload: any): Promise<BusinessPartner> {
        throw new Error("Method not implemented.");
    }
    patch(id: any, payload: any): Promise<BusinessPartner> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): Promise<BusinessPartner> {
        throw new Error("Method not implemented.");
    }

}