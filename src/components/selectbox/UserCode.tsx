import { useMemo } from "react";
import MUISelect from "./MUISelect";
import { useQuery } from "react-query";
import InitializeData from "@/services/actions";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

interface UsersProps<T = unknown> {
    name?: string,
    defaultValue?: any,
    value?: any,
    onChange?: SelectInputProps<T>['onChange'],
}


function UsersSelect(props: UsersProps) {

    const { data, isLoading }: any = useQuery({
        queryKey: ["users"],
        queryFn: () => InitializeData.users(),
        staleTime: Infinity,
    });

    return <MUISelect
        {...props}
        aliaslabel="UserName"
        aliasvalue="UserCode"
        loading={isLoading}
        items={data}
    />
}

export default UsersSelect;