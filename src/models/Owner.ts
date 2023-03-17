import Model from './Model';

export default class Owner extends Model {
    
    id: number;
    name: string;

    
    constructor(json : any) {
        super()

        this.id = json['EmployeeID']
        this.name = `${json['FirstName']}, ${ json['LastName']} `
    }
    
    toJson(update: boolean) {
        throw new Error('Method not implemented.');
    }

}