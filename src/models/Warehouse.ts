import Model from './Model';


export default class Warehouse extends Model {
    code: string;
    name: string;


    constructor(json: any) {
        super();

        this.code = json['WarehouseCode'];
        this.name = json['WarehouseName'];
    }
    
    
    toJson(update: boolean) {
       return {}
    }
}