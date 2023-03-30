import FormCard from "@/components/card/FormCard";
import MUISelect from "@/components/selectbox/MUISelect";
import Owner from "@/components/selectbox/Owner";
import PaymentMethod from "@/components/selectbox/PaymentMethod";
import PaymentTerm from "@/components/selectbox/PaymentTerm";
import ShippingType from "@/components/selectbox/ShippingType";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import * as React from "react";

export interface ILogisticFormProps {
  data: any;
  handlerChange: (key: string, value: any) => void;
}

export default function GeneralForm({
  data,
  handlerChange,
}: ILogisticFormProps) {
  return (
    <FormCard title="Logistic">
      <div className="mt-2">
        <label htmlFor="Code" className="text-gray-500 text-[14px]">
          Ship To
        </label>
        <div className="">
          <TextField
            size="small"
            multiline
            rows={4}
            fullWidth
            name="Address2"
            defaultValue={
              data?.address2 ?? "Level 1 - 168 Walker Street''"
            }
          />
        </div>
        <div className="">
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Pay To
          </label>
          <div className="">
            <TextField
              size="small"
              multiline
              rows={4}
              fullWidth
              name="Address"
              defaultValue={data?.address}
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Shipping Type
          </label>
          <ShippingType
            name="TransportationCode"
            value={data?.shippingType}
            onChange={(e) => handlerChange('shippingType', e.target.value)}
          />
        </div>
      </div>
    </FormCard>
  );
}