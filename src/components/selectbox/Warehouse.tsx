import { useMemo } from "react";
import MUISelect from "./MUISelect";
import { useQuery } from "react-query";
import InitializeData from "@/services/actions";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

interface WarehouseProps<T = unknown> {
    name?: string,
    defaultValue?: any,
    value?: any,
    onChange?: SelectInputProps<T>['onChange'],
}


function WarehouseSelect(props: WarehouseProps) {

    const { data, isLoading }: any = useQuery({
        queryKey: ["warehouse"],
        queryFn: () => InitializeData.warehouse(),
        staleTime: Infinity,
    });

    return <MUISelect
        {...props}
        aliaslabel="WarehouseName"
        aliasvalue="WarehouseCode"
        loading={isLoading}
        items={data}
    />
}

export default WarehouseSelect;