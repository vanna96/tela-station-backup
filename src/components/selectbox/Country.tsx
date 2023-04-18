import { useMemo } from "react";
import MUISelect from "./MUISelect";
import { useQueryHook } from "@/utilies/useQueryHook";
import request from "@/utilies/request";
import { useQuery } from "react-query";
import InitializeData from "@/services/actions";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import OwnerRepository from "@/services/actions/ownerRepository";
import FactoringIndicatorRepository from "@/services/actions/FactoringIndicatorRepository";
import CountryRepository from "@/services/actions/CountryRepository";


interface CountryProps<T = unknown> {
  name?: string,
  defaultValue?: any,
  value?: any,
  onChange?: SelectInputProps<T>['onChange'],
  disabled?: boolean,
}



function CountrySelect(props: CountryProps) {
  const { data, isLoading }: any = useQuery({ queryKey: ['country'], queryFn: () => new CountryRepository().get(), staleTime: Infinity })
  const items = useMemo(() =>
    data?.map((e: any) => ({ label: e?.Name + "(" + e?.Code + ")", value: e?.Code })),
    [data])
  return <MUISelect
    {...props}
    items={items ?? []}
    aliaslabel={'Name'}
    aliasvalue="Code"
    loading={isLoading}
  />
}

export default CountrySelect;