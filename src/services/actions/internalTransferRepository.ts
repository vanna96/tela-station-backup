import Repository from "@/astractions/repository";
import request from "@/utilies/request";
import StockTransfer from "../../models/StockTransfer";

export default class InternalTransferRepository extends Repository<StockTransfer> {
  url: string = "/InventoryTransferRequests";
   query: string = "?$filter=U_TRANSTYPE eq 'I'";

  public static documentSerie = {
    Document: "1470000113",
  };

  async get<T>(query?: string): Promise<T[]> {
    const response: any = await request("GET", this.url + this.query)
      .then((res: any) => {
        const data = res?.data?.value?.map((e: any) => new StockTransfer(e));
        return data;
      })
      .catch((e) => {
        throw new Error(e);
      });
    console.log(response)
    return response;
  }

  async find<T>(id: any): Promise<any> {
    const stockTransfer = await request("GET", `${this.url}(${id})`)
      .then((res: any) => new StockTransfer(res.data))
      .catch((e: Error) => {
        throw new Error(e.message);
      });

    return StockTransfer;
  }

  async post(payload: any, isUpdate?: boolean, id?: any): Promise<any> {
    if (isUpdate)
      return await request(
        "PATCH",
        this.url + "(" + id + ")",
        StockTransfer.toUpdate(payload)
      );

    return await request("POST", this.url, StockTransfer.toCreate(payload));
  }

  async patch(id: any, payload: any): Promise<any> {
    return await request("PATCH", this.url, StockTransfer.toUpdate(payload));
  }

  async delete(id: any): Promise<StockTransfer> {
    throw new Error("Method not implemented.");
  }
}
