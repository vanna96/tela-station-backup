



export const documentStatusList = (status: string, edit: boolean  | undefined) => {
    if (status !== 'D' && edit) {
        return [
            {value : 'A', label : 'Approved'},
            {value : 'F', label : 'On Hold'},
            {value : 'T', label : 'Terminated'},
        ]
    }


    return [
        { value: 'D', label: 'Draft' },
        { value: 'A', label: 'Approved' },
    ];
}

export const getValueDocumentStatus = (status: string | undefined): string => {
    switch (status) {
        case 'asOnHold':
            return 'F';
        case 'asTerminated':
            return 'T';
        case 'asApproved':
            return 'A';
        case 'asCanceled':
            return 'C';
        default:
            return 'D';
    }

}