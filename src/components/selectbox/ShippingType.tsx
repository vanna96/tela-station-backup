import { useMemo } from "react";
import MUISelect from "./MUISelect";
import { useQuery } from "react-query";
import InitializeData from "@/services/actions";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import ShippingTypeRepository from "@/services/actions/shippingTypeRepository";

interface ShippingTypeProps<T = unknown> {
    name?: string,
    defaultValue?: any,
    value?: any,
    onChange?: SelectInputProps<T>['onChange'],
}


function ShippingType(props: ShippingTypeProps) {

    const { data, isLoading }: any = useQuery({
        queryKey: ["shipping-types"],
        queryFn: () => new ShippingTypeRepository().get(),
        staleTime: Infinity,
    });


    console.log(data)

    return <MUISelect
        {...props}
        aliaslabel="Name"
        aliasvalue="Code"
        loading={isLoading}
        items={data}
    />
}

export default ShippingType;