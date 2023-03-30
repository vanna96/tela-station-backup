import FormCard from "@/components/card/FormCard";
import MUISelect from "@/components/selectbox/MUISelect";
import Owner from "@/components/selectbox/Owner";
import PaymentMethod from "@/components/selectbox/PaymentMethod";
import PaymentTerm from "@/components/selectbox/PaymentTerm";
import ShippingType from "@/components/selectbox/ShippingType";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import * as React from "react";

export interface LogisticsProps {
  data: any;
  handlerChange: (key: string, value: any) => void;
}

export default function LogisticsForm({ data, handlerChange }: LogisticsProps) {
    console.log(data)
  return (
    <FormCard title="Logistics">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Ship To
            </label>
            <div className="">
              <TextField
              value={data.Address2 ?? "Level 1 - 168 Walker Street''"}
                size="small"
                multiline
                rows={4}
                fullWidth
                name="Address2"
                className="w-full "
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3"></div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Shipping Type
            </label>
            <div className="">
              <ShippingType
                name="TransportationCode"
                value={data.shippingType}
                onChange={(e) => handlerChange("shippingType", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Pay To
          </label>
          <div className="">
            <TextField
            value={data?.billToDefault ?? data?.Address2}
              size="small"
              multiline
              rows={4}
              fullWidth
              name="Address"
              className="w-full "
            />
          </div>
        </div>
      </div>
    </FormCard>
  );
}
