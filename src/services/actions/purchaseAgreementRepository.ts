import Repository from '../../astractions/repository';
import PurchaseAgreement from '../../models/PurchaseAgreement';
import request from '../../utilies/request';

export default class PurchaseAgreementRepository extends Repository<PurchaseAgreement> {
    url: string = '/BlanketAgreements';
    
    
    async get<T>(query?: string): Promise<T[]> {
        const response: any = await request('GET', this.url).then((res: any) => {
            const data = res?.data?.value?.map((e: any) => new PurchaseAgreement(e));
            return data;
        }).catch((e) => {
            throw new Error(e);
        });

        return response;
    }


    async post(payload: any): Promise<PurchaseAgreement> {
        throw new Error('Method not implemented.');
    }


    async patch(id: any, payload: any): Promise<PurchaseAgreement> {
        throw new Error('Method not implemented.');
    }


    async delete(id: any): Promise<PurchaseAgreement> {
        throw new Error('Method not implemented.');
    }

}