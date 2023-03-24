import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import Owner from "@/components/selectbox/Owner";
import PaymentMethod from "@/components/selectbox/PaymentMethod";
import PaymentTerm from "@/components/selectbox/PaymentTerm";
import ShippingType from "@/components/selectbox/ShippingType";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import * as React from "react";

export interface IAccounttingProps {
  data: any;
  handlerChange: (key: string, value: any) => void;
  handlerOpenProject?: () => void;
}

export default function AccounttingForm({
  data,
  handlerChange,
  handlerOpenProject,
}: IAccounttingProps) {
  return (
    <FormCard title="ACCOUNTTING">
      <div className="mt-2">
        <MUITextField
          label="Journal Remarks"
          value={ `Purchase Order - ${data?.vendor?.CardCode ?? ""}`
        }
          name="DocumentStatus"
        />
        <div className="flex gap-3 mt-3">
          <div className="w-[48%]">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Payment Terms
            </label>
            <PaymentTerm
              name="PaymentGroupCode"
              value={data?.paymentterm}
              onChange={(e: any) =>
                handlerChange("paymentterm", e.target.value)
              }
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Payment Method{" "}
            </label>
            <div className="">
              <PaymentMethod
                type="incoming"
                name="PaymentMethod"
                value={data.paymentMethod}
                onChange={(e) => handlerChange("paymentMethod", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="AgreementMethod"
            className="text-gray-500 text-[14px]"
          >
            Manually Rcalculate Due Date
          </label>
          <div className="flex gap-3">
            <div className="w-[48%]">
              <MUISelect
                items={[
                  { name: "Month End", value: "E" },
                  { name: "Half Month", value: "H" },
                  { name: "Month Start", value: "Y" },
                ]}
                aliaslabel="name"
                aliasvalue="value"
                name="AgreementMethod"
                value={data.agreementMethod}
                onChange={(e) =>
                  handlerChange("agreementMethod", e.target.value)
                }
              />
            </div>
            <div className="w-[24%] -mt-6">
              <MUITextField
                label="Month+"
                defaultValue={data?.extraMonth}
                name="ExtraMonth"
              />
            </div>
            <div className="w-[24%] -mt-6">
              <MUITextField
                label="Days+"
                defaultValue={data?.extraDays}
                name="ExtraDays"
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <MUITextField
            label="Cash Discount Date Offset"
            defaultValue={data?.cashDiscountDateOffset}
            name="CashDiscountDateOffset"
          />
        </div>
      </div>
      <div className="mt-2">
        <div>
          <MUITextField
            label="Project"
            name="Project"
            value={data.project}
            endAdornment={true}
            onClick={handlerOpenProject}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Create QR Code From
          </label>
          <div className="">
            <TextField
              size="small"
              multiline
              rows={4}
              fullWidth
              name="CreateQRCodeFrom"
              value={data?.createQRCodeFrom}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-[48%]">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Cancellation Date
            </label>
            <div className="">
              <MUIDatePicker
                value={data.cancelDate}
                name="CancelDate"
                onChange={(e: any) => handlerChange("startDate", e)}
              />
            </div>
          </div>
          <div className="w-[48%]">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Required Date
            </label>
            <div className="">
              <MUIDatePicker
                value={data.requiredDate}
                name="RequiredDate"
                onChange={(e: any) => handlerChange("startDate", e)}
              />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Indicator
          </label>
          <Owner
            name="Indicator"
            value={data?.indicator}
            onChange={(e: any) => handlerChange("owner", e.target.value)}
          />
        </div>
        <div className="flex gap-5 mt-2">
          <div className="w-[48%]">
            <div className="">
              <MUITextField
                label="Federal Tax ID"
                value={data?.federalTaxID}
                name="FederalTaxID"
              />
            </div>
          </div>
          <div className="w-[48%]">
            <div className="">
              <MUITextField
                label="Order Number"
                value={data?.importFileNum}
                name="ImportFileNum"
              />
            </div>
          </div>
        </div>
      </div>
    </FormCard>
  );
}
