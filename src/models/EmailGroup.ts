import Model from './Model';

export default class EmailGroup extends Model {

  code: string;
  name: string;


  constructor(json: any) {
    super()

    this.code = json['EmailGroupCode']
    this.name = json['EmailGroupCode']
  }

  toJson(update: boolean) {
    throw new Error('Method not implemented.');
  }

}