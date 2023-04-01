import FormCard from "@/components/card/FormCard";
import MUISelect from "@/components/selectbox/MUISelect";
import Owner from "@/components/selectbox/Owner";
import PaymentMethod from "@/components/selectbox/PaymentMethod";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import * as React from "react";
import ShippingType from "@/components/selectbox/ShippingType";
import MUITextField from "@/components/input/MUITextField";
import PaymentTerm from "@/components/selectbox/PaymentTerm";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import IndicatorSelect from "@/components/selectbox/Indicator";

export interface IAccountingFormProps {
  data: any;
  handlerChange: (key: string, value: any) => void;
  handlerOpenProject?: () => void;
  edit: boolean;
}

export default function Accounting({
  data,
  handlerChange,
  handlerOpenProject,
  edit,
}: IAccountingFormProps) {
  return (
    <FormCard title="ACCOUNTING">
      <div className="flex flex-col gap-3 mt-2">
        <div>
          <MUITextField
            label="Journal Remark"
            value={("Good Return - " ?? data?.cardCode) || "N/A"}
            name="JournalMemo"
            onChange={(e) => handlerChange("journalMemo", e.target.value)}
          />
        </div>
        {data?.documentStatus === "bost_Open" ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Payment Term
                </label>
                <PaymentTerm
                  onChange={(e) =>
                    handlerChange("paymentGroupCode", e.target.value)
                  }
                  value={data?.paymentGroupCode}
                  name="PaymentGroupCode"
                />
              </div>
              <div>
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Payment Method
                </label>
                <div className="">
                  <PaymentMethod
                    type="outgoing"
                    name="PaymentMethod"
                    value={data.paymentMethod}
                    onChange={(e) =>
                      handlerChange("paymentMethod", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                 Central Bank Ind.
                </label>
                <PaymentTerm
                  onChange={(e) =>
                    handlerChange("paymentGroupCode", e.target.value)
                  }
                  value={data?.paymentGroupCode}
                  name="PaymentGroupCode"
                />
              </div>
              <div>
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                 Installments
                </label>
                <div className="">
                  <PaymentMethod
                    type="outgoing"
                    name="PaymentMethod"
                    value={data.paymentMethod}
                    onChange={(e) =>
                      handlerChange("paymentMethod", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="AgreementMethod"
                  className="text-gray-500 text-[14px]"
                >
                  Manually Rcalculate Due Date
                </label>

                <MUISelect
                  items={[
                    { value: "E", name: "Month End" },
                    { value: "H", name: "Half Month" },
                    { value: "Y", name: "Month Start" },
                  ]}
                  aliaslabel="name"
                  aliasvalue="pdt_None"
                  name="StartFrom"
                  value={data.startFrom}
                  onChange={(e) =>
                    handlerChange("startFrom", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MUITextField
                  label="Month +"
                  onChange={(e) => handlerChange("extraMonth", e.target.value)}
                  value={data.extraMonth}
                  name="ExtraMonth"
                />
                <MUITextField
                  label="Days"
                  onChange={(e) => handlerChange("extraDays", e.target.value)}
                  value={data.extraDays}
                  name="ExtraDays"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <MUITextField
                label="Cash Discount Date Offset"
                onChange={(e) =>
                  handlerChange("cashDiscountDateOffset", e.target.value)
                }
                value={data.cashDiscountDateOffset}
                name="CashDiscountDateOffset"
              />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Payment Term
                </label>
                <PaymentTerm
                  disabled={edit}
                  onChange={(e) =>
                    handlerChange("paymentGroupCode", e.target.value)
                  }
                  value={data?.paymentGroupCode}
                  name="PaymentGroupCode"
                />
              </div>
              <div>
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Payment Method
                </label>
                <div className="">
                  <PaymentMethod
                    disabled={edit}
                    type="outgoing"
                    name="PaymentMethod"
                    value={data.paymentMethod}
                    onChange={(e) =>
                      handlerChange("paymentMethod", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Central Bank Ind.
                </label>
                <MUITextField
                  onChange={(e) =>
                    handlerChange("centralBankIndicator", e.target.value)
                  }
                  value={data?.centralBankIndicator}
                  name="CentralBankIndicator"
                />
              </div>
              <div>
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                 Installments
                </label>
                <div className="">
                  <MUITextField
                   
                    value={data.installments}
                    onChange={(e) =>
                      handlerChange("installments", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="AgreementMethod"
                  className="text-gray-500 text-[14px]"
                >
                  Manually Rcalculate Due Date
                </label>

                <MUISelect
                  items={[
                    { value: "E", name: "Month End" },
                    { value: "H", name: "Half Month" },
                    { value: "Y", name: "Month Start" },
                  ]}
                  aliaslabel="name"
                  aliasvalue="value"
                  name="AgreementMethod"
                  disabled={edit}
                  value={data.agreementMethod}
                  onChange={(e) =>
                    handlerChange("agreementMethod", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MUITextField
                  disabled={edit}
                  label="Month +"
                  onChange={(e) => handlerChange("extraMonth", e.target.value)}
                  value={data.extraMonth}
                  name="ExtraMonth"
                />
                <MUITextField
                  disabled={edit}
                  label="Days"
                  onChange={(e) => handlerChange("extraDays", e.target.value)}
                  value={data.extraDays}
                  name="ExtraDays"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <MUITextField
                disabled={edit}
                label="Cash Discount Date Offsetys"
                value={""}
                name="CashDiscountDateOffset"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <div className="grid grid-cols-1">
          <div>
            <MUITextField
              label="Project"
              onChange={(e) => handlerChange("project", e.target.value)}
              name="Project"
              value={data.project}
              endAdornment={true}
              onClick={handlerOpenProject}
            />
          </div>
          <div>
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Create QR Code From:
            </label>
            <div className="">
              <TextField
                size="small"
                multiline
                rows={4}
                fullWidth
                name="CreateQRCodeFrom"
                className="w-full "
                value={data?.createQRCodeFrom}
                onChange={(e) =>
                  handlerChange("createQRCodeFrom", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Cancellation Date
            </label>
            <div className="">
              <MUIDatePicker
                value={data.cancelDate}
                name="CancelDate"
                onChange={(e: any) => handlerChange("cancelDate", e)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Indicator
            </label>
            <IndicatorSelect
              onChange={(e) => handlerChange("indicator", e.target.value)}
              value={data?.indicator}
              name="Indicator"
            />
          </div>
          <div>
            <MUITextField
              label="Federal Tax ID"
              value={data.federalTaxID}
              name="FederalTaxID"
              onChange={(e) => handlerChange("federalTaxID", e.target.value)}
            />
          </div>
          <div>
            <MUITextField
              label="Order Number:"
              value={data?.importFileNum}
              name="ImportFileNum"
              onChange={(e) => handlerChange("importFileNum", e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormCard>
  );
}
