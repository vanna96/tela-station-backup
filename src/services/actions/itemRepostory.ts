import Repository from "@/astractions/repository";
import Item from "@/models/Item";
import request from "@/utilies/request";


export default class itemRepository extends Repository<Item> {
    url = '/Items';

    select = [
        'ItemName',
        'ItemCode',
        "PurchaseVATGroup",
        "SalesVATGroup",
        "UoMGroupEntry",
        "ItemsGroupCode",
        "PurchaseItem",
        "SalesItem",
        "InventoryItem",
        "InventoryUoMEntry",
        "InventoryUOM",
        "DefaultSalesUoMEntry",
        "DefaultPurchasingUoMEntry"
    ];

    private static url1 = '/Items';

    private static select1 = [
        'ItemName',
        'ItemCode',
        "PurchaseVATGroup",
        "SalesVATGroup",
        "UoMGroupEntry",
        "ItemsGroupCode",
        "PurchaseItem",
        "SalesItem",
        "InventoryItem",
        "InventoryUoMEntry",
        "InventoryUOM",
        "DefaultSalesUoMEntry",
        "DefaultPurchasingUoMEntry"
    ];

    async get<Item>(query?: string | undefined): Promise<Item[]> {
        const response = await request('GET', this.url + '?$select=' + this.select.join(','))
            .then((res: any) => res?.data?.value)
            .catch((e: Error) => {
                throw new Error(e.message);
            });

        if (!response) return [];

        
        return response;
    } 


    public static async getAll<Item>(query?: string | undefined): Promise<Item[]> {
        const response = await request('GET', this.url1 + '?$select=' + this.select1.join(','))
            .then((res: any) => res?.data?.value)
            .catch((e: Error) => {
                throw new Error(e.message);
            });

        if (!response?.data) throw new Error('No Data');
        return response.data?.map((e: any) => new Item(e));
    }

    find<T>(query?: string | undefined): Promise<T> {
        throw new Error("Method not implemented.");
    }


    post(payload: any): Promise<Item> {
        throw new Error("Method not implemented.");
    }


    patch(id: any, payload: any): Promise<Item> {
        throw new Error("Method not implemented.");
    }


    delete(id: any): Promise<Item> {
        throw new Error("Method not implemented.");
    }

}