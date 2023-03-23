import Model from './Model';

export default class Users extends Model {
    
    id: number;
    name: string;
    userCode : string;
    userName : string;
    email: string;
    branch: any[];
    department: any[];
    
    constructor(json : any) {
        super()

        this.id = json['EmployeeID']
        this.name = `${json['FirstName']}, ${ json['LastName']} `
        this.userCode = json['UserCode']
        this.userName= json['UserName']
        this.email = json['eMail']
        this.branch = json['Branch']
        this.department = json['Department']

    }
    
    toJson(update?: boolean) {
        return {
            id: this.id,
            name: this.name,
            userCode: this.userCode,
            userName: this.userName,
            email: this.email,
            branch: this.branch,
            department: this.department
        }
    }

}
