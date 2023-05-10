import Model from './Model';

export default class Driver extends Model {

  code: string;
  name: string;


  constructor(json: any) {
    super()

    this.code = json['EmployeeID']
    this.name = json['LastName'] + json['FirstName']
  }

  toJson(update: boolean) {
    throw new Error('Method not implemented.');
  }

}