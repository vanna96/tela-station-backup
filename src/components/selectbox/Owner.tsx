import { useMemo } from "react";
import MUISelect from "./MUISelect";
import { useQueryHook } from "@/utilies/useQueryHook";
import request from "@/utilies/request";
import { useQuery } from "react-query";
import InitializeData from "@/services/actions";


function Owner(props: any) {
    // const { data, isLoading }: any = useQuery({ queryKey: ['owners'], queryFn: () => InitializeData.owner() })

    return <MUISelect
        {...props}
        items={[]}
        aliaslabel="id"
        aliasvalue="name"
        loading={true}
    />
}

export default Owner;