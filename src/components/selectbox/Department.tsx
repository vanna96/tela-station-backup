import { useMemo } from "react";
import MUISelect from "./MUISelect";
import { useQuery } from "react-query";
import InitializeData from "@/services/actions";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

interface DepartmentProps<T = unknown> {
    name?: string,
    defaultValue?: any,
    value?: any,
    onChange?: SelectInputProps<T>['onChange'],
}


function DepartmentSelect(props: DepartmentProps) {

    const { data, isLoading }: any = useQuery({
        queryKey: ["department"],
        queryFn: () => InitializeData.department(),
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

export default DepartmentSelect;