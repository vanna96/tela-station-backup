import Repository from '@/astractions/repository';
import GoodReturn from '@/models/GoodReturn';
import request from '@/utilies/request';

export default class GoodReturnRepository extends Repository<GoodReturn> {
    
    url: string = '/PurchaseReturns';
    
    public static documentSerie = {
        Document: "234000032"
    }
    
    async get<T>(query?: string): Promise<T[]> {
        const response: any = await request('GET', this.url).then((res: any) => {
            const data = res?.data?.value?.map((e: any) => new GoodReturn(e));
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
        return await request('POST', this.url, GoodReturn.toCreate(payload));
    }


    async patch(id: any, payload: any): Promise<any> {
         return await request('PATCH', this.url, GoodReturn.toUpdate(payload));
    }


    async delete(id: any): Promise<GoodReturn> {
        throw new Error('Method not implemented.');
    }

}