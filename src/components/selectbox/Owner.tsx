import { useMemo } from "react";
import MUISelect from "./MUISelect";
import { useQueryHook } from "@/utilies/useQueryHook";
import request from "@/utilies/request";
import { useQuery } from "react-query";
import InitializeData from "@/services/actions";
import { SelectInputProps } from "@mui/material/Select/SelectInput";


interface OwnerProps<T = unknown> {
    name?: string,
    defaultValue?: any,
    value?: any,
    onChange?: SelectInputProps<T>['onChange'],
}



function Owner(props: OwnerProps) {
    const { data, isLoading }: any = useQuery({ queryKey: ['owners'], queryFn: () => InitializeData.owner() })

    return <MUISelect
        {...props}
        items={data ?? []}
        aliaslabel="name"
        aliasvalue="id"
        loading={isLoading}
    />
}

export default Owner;