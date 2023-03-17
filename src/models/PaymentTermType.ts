import Model from './Model';


export default class PaymentTermType extends Model {
    id: number;
    name: string;

    constructor(json: any) {
        super();

        this.id = json['GroupNumber'];
        this.name = json['PaymentTermsGroupName'];
    }
    
    
    toJson(update: boolean) {
       return {}
    }
}