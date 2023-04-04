import Model from './Model';

export default class Users extends Model {

  code: string;
  name: string;


  constructor(json: any) {
    super()

    this.code = json['UserCode']
    this.name = json['UserName']
  }

  toJson(update: boolean) {
    throw new Error('Method not implemented.');
  }

}