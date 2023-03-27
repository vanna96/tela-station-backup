// import FormCard from "@/components/card/FormCard";
// import MUITextField from "@/components/input/MUITextField";
// import MUISelect from "@/components/selectbox/MUISelect";
// import Owner from "@/components/selectbox/Owner";
// import PaymentMethod from "@/components/selectbox/PaymentMethod";
// import PaymentTerm from "@/components/selectbox/PaymentTerm";
// import ShippingType from "@/components/selectbox/ShippingType";
// import Checkbox from "@mui/material/Checkbox";
// import TextField from "@mui/material/TextField";
// import * as React from "react";
// import MUIDatePicker from "@/components/input/MUIDatePicker";
// import IndicatorSelect from "../../../../components/selectbox/Indicator";

// export interface AccountingProps {
//   data: any;
//   handlerChange: (key: string, value: any) => void;
//   handlerOpenProject?: () => void;
// }

// export default function AccountingForm({
//   data,
//   handlerChange,
//   handlerOpenProject,
// }: AccountingProps) {
//   return (
//     <FormCard title="Accounting">
//       <div className="flex flex-col gap-2">
//         <div className="grid grid-cols-1 gap-3">
//           <div className="flex items-center gap-1 text-sm">
//             <MUITextField label="Journal Remarks" />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <div className="flex flex-col gap-1 text-sm">
//             <label
//               htmlFor="PayTermsGrpCode"
//               className="text-gray-500 text-[14px]"
//             >
//               Payment Terms
//             </label>
//             <div className="">
//               <PaymentTerm
//                 name="PaymentTerms"
//                 value={data.paymentTermType}
//                 onChange={(e) =>
//                   handlerChange("paymentTermType", e.target.value)
//                 }
//               />
//             </div>
//           </div>

//           <div className="flex flex-col gap-1 text-sm">
//             <label htmlFor="Code" className="text-gray-500 text-[14px]">
//               Payment Method{" "}
//             </label>
//             <div className="">
//               <PaymentMethod
//                 type="outgoing"
//                 name="PaymentMethod"
//                 value={data.paymentMethod}
//                 onChange={(e) => handlerChange("paymentMethod", e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="">
//             <div className="grid grid-cols-1 gap-3">
//               <div className="flex flex-col gap-1 text-sm">
//                 <label htmlFor="Code" className="text-gray-500 text-[14px]">
//                   Manually Recalculate Due Date
//                 </label>

//                 <MUISelect
//                   items={[
//                     { value: "S", label: "Start Month" },
//                     { value: "H", label: "Half Month" },
//                     { value: "E", label: "End Month" },
//                   ]}
//                   name="ManuallyRecalc"
//                   value={data?.ManuallyRecalc}
//                   onChange={(e) =>
//                     handlerChange("ManuallyRecalc", e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 text-sm">
//             <TextField label="Month" variant="outlined" size="small" />
//             <TextField label="Days" variant="outlined" size="small" />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col gap-3">
//         <div className="grid grid-cols-2 gap-3">
//           <div className="flex flex-col gap-1 text-sm">
//             <MUITextField
//               label="Project"
//               name="Project"
//               value={data.project}
//               endAdornment={true}
//               onClick={handlerOpenProject}
//             />
//           </div>
//           <div className="grid grid-cols-1 gap-3">
//             <div className="flex flex-col gap-1 text-sm">
//               <label htmlFor="Code" className="text-gray-500 text-[14px]">
//                 Indicator
//               </label>
//               <IndicatorSelect value={data?.indicator} name="indicator" />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-1 text-sm">
//           <MUITextField
//             label="Federal Tax Number"
//             value={data?.federalTaxNumber}
//             name="federalTaxNumber"
//           />
//         </div>
//         <div className="flex flex-col gap-1 text-sm">
//           <MUITextField
//             label="Order Number"
//             value={data?.orderNumber}
//             name="orderNumber"
//           />
//           {/* <MUITextField
//             label="Vendor Name"
//             value={data?.cardName}
//             name="CardName"
//           /> */}
//         </div>
//       </div>
//     </FormCard>
//   );
// }


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
          value={ `Good Return - ${data?.vendor?.CardCode ?? ""}`
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