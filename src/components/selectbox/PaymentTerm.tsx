import { useMemo } from "react";
import MUISelect from "./MUISelect";
import { useQuery } from "react-query";
import InitializeData from "@/services/actions";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

interface PaymentTermTypeProps<T = unknown> {
    name?: string,
    defaultValue?: any,
    value?: any,
    onChange?: SelectInputProps<T>['onChange'],
}


function PaymentTerm(props: PaymentTermTypeProps) {

    const { data, isLoading }: any = useQuery({
        queryKey: ["payment-term-types"],
        queryFn: () => InitializeData.paymentTermType(),
        staleTime: Infinity,
    });


    return <MUISelect
        {...props}
        aliaslabel="PaymentTermsGroupName"
        aliasvalue="GroupNumber"
        loading={isLoading}
        items={data}
    />
}

export default PaymentTerm;