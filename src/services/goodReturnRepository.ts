import BusinessPartner from '@/models/BusinessParter';
import Repository from '@/astractions/repository';
import PurchaseQouatation from '@/models/PurchaseQoutation';
import GoodReturn from '@/models/GoodReturn';
import request from '@/utilies/request';
import BusinessPartnerRepository from './actions/bussinessPartnerRepository';

export default class GoodReturnRepository extends Repository<GoodReturn> {

  url: string = '/PurchaseQuotations';

  public static documentSerie = {
    Document: "540000006"
  }

  async get<T>(query?: string): Promise<T[]> {
    const response: any = await request('GET', this.url).then((res: any) => {
      const data = res?.data?.value?.map((e: any) => new GoodReturn(e));
      return data;
    }).catch((e: Error) => {
      throw new Error(e.message);
    });

    return response;
  }

  async find<T>(id: any): Promise<any> {
    const goodReturn = await request('GET', `${this.url}(${id})`).then((res: any) => new GoodReturn(res.data))
      .catch((e: Error) => {
        throw new Error(e.message)
      })

    const businessPartner: BusinessPartner = await new BusinessPartnerRepository().findContactEmployee(goodReturn.cardCode!);

    // purchaseQoutation.email = businessPartner.email;
    // purchaseQoutation.phone = businessPartner.phone;
    goodReturn.contactPersonList = businessPartner.contactEmployee ?? [];

    return goodReturn;
  }

  async post(payload: any, isUpdate?: boolean, id?: any): Promise<any> {

    if (isUpdate) return await request('PATCH', this.url + "(" + id + ")", GoodReturn.toUpdate(payload));

    return await request('POST', this.url, GoodReturn.toCreate(payload));
  }


  async patch(id: any, payload: any): Promise<any> {
    return await request('PATCH', this.url, GoodReturn.toUpdate(payload));
  }


  async delete(id: any): Promise<GoodReturn> {
    throw new Error('Method not implemented.');
  }

}