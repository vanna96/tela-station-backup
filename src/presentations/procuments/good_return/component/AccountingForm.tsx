import FormCard from "@/components/card/FormCard";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import Owner from "@/components/selectbox/Owner";
import PaymentMethod from "@/components/selectbox/PaymentMethod";
import PaymentTerm from "@/components/selectbox/PaymentTerm";
import ShippingType from "@/components/selectbox/ShippingType";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import * as React from "react";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import IndicatorSelect from "../../../../components/selectbox/Indicator";

export interface AccountingProps {
  data: any;
  handlerChange: (key: string, value: any) => void;
  handlerOpenProject?: () => void;
}

export default function AccountingForm({
  data,
  handlerChange,
  handlerOpenProject,
}: AccountingProps) {
  return (
    <FormCard title="Accounting">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-1 text-sm">
            <MUITextField label="Journal Remarks" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 text-sm">
            <label
              htmlFor="PayTermsGrpCode"
              className="text-gray-500 text-[14px]"
            >
              Payment Terms
            </label>
            <div className="">
              <PaymentTerm
                name="PaymentTerms"
                value={data.paymentTermType}
                onChange={(e) =>
                  handlerChange("paymentTermType", e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Payment Method{" "}
            </label>
            <div className="">
              <PaymentMethod
                type="outgoing"
                name="PaymentMethod"
                value={data.paymentMethod}
                onChange={(e) => handlerChange("paymentMethod", e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-1 text-sm">
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Manually Recalculate Due Date
                </label>

                <MUISelect
                  items={[
                    { value: "S", label: "Start Month" },
                    { value: "H", label: "Half Month" },
                    { value: "E", label: "End Month" },
                  ]}
                  name="ManuallyRecalc"
                  value={data?.ManuallyRecalc}
                  onChange={(e) =>
                    handlerChange("ManuallyRecalc", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <TextField label="Month" variant="outlined" size="small" />
            <TextField label="Days" variant="outlined" size="small" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 text-sm">
            <MUITextField
              label="Project"
              name="Project"
              value={data.project}
              endAdornment={true}
              onClick={handlerOpenProject}
            />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Indicator
              </label>
              <IndicatorSelect value={data?.indicator} name="indicator" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <MUITextField
            label="Federal Tax Number"
            value={data?.federalTaxNumber}
            name="federalTaxNumber"
          />
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <MUITextField
            label="Order Number"
            value={data?.orderNumber}
            name="orderNumber"
          />
          {/* <MUITextField
            label="Vendor Name"
            value={data?.cardName}
            name="CardName"
          /> */}
        </div>
      </div>
    </FormCard>
  );
}
