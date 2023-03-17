import Model from './Model';


export default class UnitOfMeasurement extends Model {
    id: number;
    code: string;
    name: string;
    baseUoM?: number;
    collections?: [];


    constructor(json: any) {
        super();
        this.id = json['Id'];
        this.code = json['Code'];
        this.name = json['Name'];
        this.collections= json['UoMGroupDefinitionCollection'];
    }
    
    
    toJson(update: boolean) {
       return {}
    }
}


export class UOMCollection extends Model {

    quantity: number;
    active: boolean;

    constructor(json:any) {
        super()

        this.quantity = json['AlternateQuantity']
        this.active = json['Active']
    }

    toJson(update: boolean) {
        throw new Error('Method not implemented.');
    }
}