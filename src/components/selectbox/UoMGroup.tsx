
import { useMemo } from "react";
import MUISelect from "./MUISelect";

import { useQuery } from "react-query";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import wareBinRepository from "@/services/actions/WareBinRepository";
import UnitOfMeasurementGroupRepository from "@/services/actions/unitOfMeasurementGroupRepository";


interface WareBinprops<T = unknown> {
  name?: string,
  defaultValue?: any,
  value?: any,
  onChange?: SelectInputProps<T>['onChange'],
  disabled?: boolean,
}



function WareBinSelect(props: WareBinprops) {
  const { data, isLoading }: any = useQuery({ queryKey: ['uomg'], queryFn: () => new UnitOfMeasurementGroupRepository().get(), staleTime: Infinity })

  return <MUISelect
    {...props}
    items={data ?? []}
    aliaslabel="WarehouseCode"
    aliasvalue="WarehouseCode"
    loading={isLoading}
  />
}

export default WareBinSelect;