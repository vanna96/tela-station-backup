import Model from './Model';


export default class VatGroup extends Model {
    code: number;
    name: string;
    vatRate: number;

    constructor(json: any) {
        super();

        this.code = json['Code'];
        this.name = json['Name'];
        this.vatRate = json['VatGroups_Lines'][0]?.Rate
    }
    
    
    toJson(update: boolean) {
       return {}
    }
}