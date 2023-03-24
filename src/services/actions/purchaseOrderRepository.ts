import Repository from '../../astractions/repository';
import PurchaseOrder from '@/models/PurchaseOrder';
import request from '../../utilies/request';

export default class PurchaseOrderRepository extends Repository<PurchaseOrder> {
    
    url: string = '/PurchaseOrders';
    
    public static documentSerie = {
        Document: "1250000025",
        DocumentSubType: "S"
    }
    
    async get<T>(query?: string): Promise<T[]> {
        const response: any = await request('GET', this.url).then((res: any) => {
            const data = res?.data?.value?.map((e: any) => new PurchaseOrder(e));
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
        return await request('POST', this.url, PurchaseOrder.toCreate(payload));
    }


    async patch(id: any, payload: any): Promise<any> {
         return await request('PATCH', this.url, PurchaseOrder.toUpdate(payload));
    }


    async delete(id: any): Promise<PurchaseOrder> {
        throw new Error('Method not implemented.');
    }

}