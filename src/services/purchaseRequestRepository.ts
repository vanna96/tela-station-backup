import Repository from '@/astractions/repository';
import request from '@/utilies/request';
import PurchaseRequest from '../models/PurchaseRequest';
import PurchaseAgreement from '../models/PurchaseAgreement';

export default class PurchaseRequestRepository extends Repository<PurchaseRequest> {
    
    url: string = '/PurchaseRequests';
    
    public static documentSerie = {
        Document: "1250000025",
        DocumentSubType: "S"
    }
    
    async get<T>(query?: string): Promise<T[]> {
        const response: any = await request('GET', this.url).then((res: any) => {
            const data = res?.data?.value?.map((e: any) => new PurchaseRequest(e));
            return data;
        }).catch((e) => {
            throw new Error(e);
        });

        return response;
    }

    async find<T>(id: any): Promise<any> {
        const purchasRequest = await request('GET', `${this.url}(${id})`).then((res: any) => new PurchaseRequest(res.data))
            .catch((e: Error) => {
            throw new Error(e.message)
            })
        
        // const businessPartner: BusinessPartner = await new BusinessPartnerRepository().findContactEmployee(purchaseAgreement.cardCode!);

        // purchaseAgreement.email = businessPartner.email;
        // purchaseAgreement.phone = businessPartner.phone;
        // purchaseAgreement.contactPersonList = businessPartner.contactEmployee ?? [];

        return PurchaseRequest;
    }



   
    async post(payload: any, isUpdate?: boolean, id?: any): Promise<any> {

        if(isUpdate) return await request('PATCH', this.url + "("+id+")", PurchaseRequest.toUpdate(payload));

        return await request('POST', this.url, PurchaseRequest.toCreate(payload));
    }


    async patch(id: any, payload: any): Promise<any> {
         return await request('PATCH', this.url, PurchaseRequest.toUpdate(payload));
    }


    async delete(id: any): Promise<PurchaseRequest> {
        throw new Error('Method not implemented.');
    }

}