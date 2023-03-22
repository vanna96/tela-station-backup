import Repository from '../../astractions/repository';
import PurchaseAgreement from '../../models/PurchaseAgreement';
import request from '../../utilies/request';

export default class PurchaseAgreementRepository extends Repository<PurchaseAgreement> {
    
    url: string = '/BlanketAgreements';
    
    public static documentSerie = {
        Document: "1250000025",
        DocumentSubType: "S"
    }
    
    async get<T>(query?: string): Promise<T[]> {
        const response: any = await request('GET', this.url).then((res: any) => {
            const data = res?.data?.value?.map((e: any) => new PurchaseAgreement(e));
            return data;
        }).catch((e) => {
            throw new Error(e);
        });

        return response;
    }

    async find<T>(query?: string | undefined): Promise<T> {
        throw new Error('Method not implemented.');
    }


    async post(payload: any): Promise<any> {
        return await request('POST', this.url, PurchaseAgreement.toCreate(payload));
    }


    async patch(id: any, payload: any): Promise<any> {
         return await request('PATCH', this.url, PurchaseAgreement.toUpdate(payload));
    }


    async delete(id: any): Promise<PurchaseAgreement> {
        throw new Error('Method not implemented.');
    }

}