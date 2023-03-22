import React, { useMemo, FC } from "react";

import MUISelect from "./MUISelect";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import QueryHook from "@/utilies/useQueryHook";
import InitializeData from "@/services/actions";
import { useQuery } from "react-query";

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

    const { data, isLoading }: any = useQuery({
        queryKey: ["payment-methods"],
        queryFn: () => InitializeData.listPaymentMethod(),
        staleTime: Infinity,
    });

    const items = React.useMemo(() => data?.filter((e: any) => e?.Type?.replace("bopt", "")?.toLowerCase() === type), [data])

    return <MUISelect
        aliaslabel="PaymentMethodCode"
        aliasvalue="PaymentMethodCode"
        items={items ?? []}
        onChange={onChange}
        loading={isLoading}
        value={value}
        defaultValue={defaultValue}
    />
}
export default PaymentMethod;