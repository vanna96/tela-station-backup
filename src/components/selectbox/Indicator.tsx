import { useMemo } from "react";
import MUISelect from "./MUISelect";
import { useQuery } from "react-query";
import InitializeData from "@/services/actions";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

interface IndicatorProps<T = unknown> {
    name?: string,
    defaultValue?: any,
    value?: any,
    onChange?: SelectInputProps<T>['onChange'],
}


function IndicatorSelect(props: IndicatorProps) {

    const { data, isLoading }: any = useQuery({
        queryKey: ["Indicator"],
        queryFn: () => InitializeData.factoringIndicator(),
        staleTime: Infinity,
    });

    return <MUISelect
        {...props}
        aliaslabel="Name"
        aliasvalue="Code"
        loading={isLoading}
        items={data}
    />
}

export default IndicatorSelect;