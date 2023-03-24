import Repository from '../../astractions/repository';
import PurchaseQouatation from '@/models/PurchaseQouatation';
import request from '../../utilies/request';

export default class purchaseQoutationRepository extends Repository<PurchaseQouatation> {

  url: string = '/PurchaseQuotations';

  public static documentSerie = {
    Document: "1250000025",
    DocumentSubType: "S"
  }

  async get<T>(query?: string): Promise<T[]> {
    const response: any = await request('GET', this.url).then((res: any) => {
      const data = res?.data?.value?.map((e: any) => new PurchaseQouatation(e));
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
    return await request('POST', this.url, PurchaseQouatation.toCreate(payload));
  }


  async patch(id: any, payload: any): Promise<any> {
    return await request('PATCH', this.url, PurchaseQouatation.toUpdate(payload));
  }


  async delete(id: any): Promise<PurchaseQouatation> {
    throw new Error('Method not implemented.');
  }

}