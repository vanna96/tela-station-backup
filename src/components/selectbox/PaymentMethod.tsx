import React, { useMemo, FC } from "react";

import MUISelect from "./MUISelect";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import QueryHook from "@/utilies/useQueryHook";
import InitializeData from "@/services/actions";

// type PAYMENT_TYPE = {
//     INCOMING: 'boptIncoming',
//     OUTGOING: 'boptOutgoing',
// }

type PaymentMethodType = 'outgoing' | 'incoming';


interface PaymentMethodProps<T = unknown> {
    type: PaymentMethodType,
    name?: string,
    defaultValue?: any,
    value?: any,
    onChange?: SelectInputProps<T>['onChange'],
}

const PaymentMethod: FC<PaymentMethodProps> = ({ type, name, defaultValue, value, onChange }: PaymentMethodProps) => {

    // const { data, isLoading }: any = QueryHook.queryList('payment_methods', InitializeData.paymentTermType());


    return <MUISelect
        aliaslabel="PaymentMethodCode"
        aliasvalue="PaymentMethodCode"
        items={[]}
        onChange={onChange}
    // loading={isLoading.toString()}
    />
}
export default PaymentMethod;