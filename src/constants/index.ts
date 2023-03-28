




export const documentStatusList = (isApproved: boolean) => {
    if (isApproved) {
        return [
            {value : 'A', label : 'Approved'},
            {value : 'F', label : 'On Hold'},
            {value : 'T', label : 'Terminated'},
        ]
    }


    return [
        { value: 'D', label: 'Draft' },
        { value: 'A', label: 'Approved' },
        { value: 'T', label: 'Terminated' },
    ];
}