


export default class DocumentStatus {

    constructor() {
        
    }

    public static getFullNameStatus(status: string | null) : string{
        switch (status) {
            case 'A':
                return 'Approved';
            case 'D':
                return 'Draft';
            case 'C':
                return 'Cancelled';
            case 'T':
                return 'Terminated';
            default:
                return '';
        }
    }
}