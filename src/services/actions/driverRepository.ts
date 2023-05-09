import Repository from "@/astractions/repository";
import request from "@/utilies/request";
import Driver from "../../models/Driver";

export default class DriverRepository extends Repository<Driver> {
  url: string = "/EmployeesInfo?$filter=U_Driver eq 'Yes'";

  public static documentSerie = {
    Document: "1470000113",
  };

  async get<T>(query?: string): Promise<T[]> {
    const response: any = await request("GET", this.url)
      .then((res: any) => {
        const data = res?.data?.value?.map((e: any) => new Driver(e));
        return data;
      })
      .catch((e) => {
        throw new Error(e);
      });
    return response;
  }

  async find<T>(id: any): Promise<any> {
    const data = await request("GET", `${this.url}(${id})`)
      .then((res: any) => new Driver(res.data))
      .catch((e: Error) => {
        throw new Error(e.message);
      });

    return data;
  }

  async post(payload: any, isUpdate?: boolean, id?: any): Promise<any> {
    if (isUpdate)
      return await request(
        "PATCH",
        this.url + "(" + id + ")",
        Driver.toUpdate(payload)
      );

    return await request("POST", this.url, Driver.toCreate(payload));
  }

  async patch(id: any, payload: any): Promise<any> {
    return await request("PATCH", this.url, Driver.toUpdate(payload));
  }

  async delete(id: any): Promise<Driver> {
    throw new Error("Method not implemented.");
  }
}
