import { useMemo} from "react";
import MUISelect from "./MUISelect";
import { useQuery } from "react-query";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import cityRepository from "@/services/actions/CityRepository";


interface CityProps<T = unknown> {
  name?: string,
  defaultValue?: any,
  value?: any,
  onChange?: SelectInputProps<T>['onChange'],
  disabled?: boolean,
  country?: string
  key?: string
}


function CitySelect(props: CityProps) {
  const { data, isLoading }: any = useQuery({ queryKey: ['city'], queryFn: () => new cityRepository().get(), staleTime: Infinity })
  
  const items = data?.filter((e: any) => e?.Country === props?.country)?.map((e: any) => ({ label: e?.Name + "(" + e?.Code + ")", value: e?.Code }))
  
  
  return <MUISelect
    {...props}
    items={items ?? []}
    aliaslabel={"Name"}
    aliasvalue="Code"
    loading={isLoading}
  />
}
export default CitySelect;