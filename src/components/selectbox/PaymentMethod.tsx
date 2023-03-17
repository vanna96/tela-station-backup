import React, { useMemo, FC } from "react";

import MUISelect from "./MUISelect";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import QueryHook from "@/utilies/useQueryHook";
import InitializeData from "@/services/actions";

// type PAYMENT_TYPE = {
//     INCOMING: 'boptIncoming',
//     OUTGOING: 'boptOutgoing',
// }


interface PaymentMtehodProps<T = unknown> {
    type: 'outgoing' | 'incoming',
    name: string,
    defaultValue: any,
    value: any,
    onChange?: SelectInputProps<T>['onChange'],
}

const PaymentMethod: FC<PaymentMtehodProps> = ({ type, name, defaultValue, value, onChange }: PaymentMtehodProps) => {

    const { data, isLoading }: any = QueryHook.queryList('payment_methods', InitializeData.paymentTermType());

    // const items = useMemo(() => , [data]);

    return <MUISelect
        aliaslabel="PaymentMethodCode"
        aliasvalue="PaymentMethodCode"
        items={[]}
        onChange={onChange}
    // loading={isLoading.toString()}
    />
}

// function PaymentMethod(props: any) {
//     const { type } = props;
//     const { data, isLoading } = customQuery("PaymentMethods", "/WizardPaymentMethods?$select=PaymentMethodCode,Description,Type");

//     const items = useMemo(() => data?.data?.value?.filter((e: any) => e?.Type === type), [data]);

//     return <MUISelect
//         {...props}
//         aliaslabel="PaymentMethodCode"
//         aliasvalue="PaymentMethodCode"
//         items={items}
//         loading={isLoading.toString()}
//     />
// }

export default PaymentMethod;