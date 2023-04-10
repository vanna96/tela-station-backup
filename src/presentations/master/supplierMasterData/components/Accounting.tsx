import FormCard from "@/components/card/FormCard";
import AccountTextField from "@/components/input/AccountTextField";
import MUITextField from "@/components/input/MUITextField";
import GLAccountModal from "@/components/modal/GLAccountModal";
import BankChargesAllocationCodesSelect from "@/components/selectbox/BankChargesAllocationCodes";
import CountrySelect from "@/components/selectbox/Country";
import HolidaySelect from "@/components/selectbox/Holidays";
import HouseBankAccounts from "@/components/selectbox/HouseBankAccount";
import MUISelect from "@/components/selectbox/MUISelect";
import PaymentBlockSelect from "@/components/selectbox/PaymentBlock";
import PaymentTerm from "@/components/selectbox/PaymentTerm";
import PriceListSelect from "@/components/selectbox/PriceList";
import PrioritySelect from "@/components/selectbox/Priority";
import BankSelect from "@/components/selectbox/bank";
import PaymentBlock from "@/models/PaymentBlock";
import { Checkbox } from "@mui/material";

export interface IAccouttingProps {
  handlerChange: (key: string, value: any) => void;
  handlerOpenVendor: () => void;
  data: any;
  edit?: boolean;
  handlerOpenAccount: () => void;
}

export default function Accounting({
  data,
  edit,
  handlerChange,
  handlerOpenAccount,
  handlerOpenVendor,
}: IAccouttingProps) {
  return (
    <>
      <FormCard title="Accounting">
        <div className="flex flex-col gap-2 mt-2">
          <label htmlFor="Code" className="text-black text-[18px]">
            General
          </label>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <MUITextField
              label="Consolidating Bussiness Partner:"
              value={data?.cardForeignName}
              name="CardForeignName"
              onChange={(e: any) =>
                handlerChange("cardForeignName", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center text-sm pt-3 -ml-3">
              <Checkbox />
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Payment Consolidating
              </label>
            </div>
            <div className="flex items-center text-sm pt-3 -ml-3">
              <Checkbox />
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Delivery Consolidating
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Accounts Payable
              </label>
              <AccountTextField
                name="AccountNo"
                value={data?.debitorAccount}
                onChange={(e) =>
                  handlerChange("debitorAccount", e.target.value?.code)
                }
              />
            </div>
            <div>
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Down Payment Clearing Account
              </label>
              <AccountTextField
                name="AccountNo"
                value={data?.downPaymentClearAct}
                onChange={(e) =>
                  handlerChange("downPaymentClearAct", e.target.value?.code)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Down Payment Interim Account
              </label>
              <AccountTextField
                name="AccountNo"
                value={data?.downPaymentInterimAccount}
                onChange={(e) =>
                  handlerChange(
                    "downPaymentInterimAccount",
                    e.target.value?.code
                  )
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Vendor Code"
              value={data?.cardCode}
              disabled={edit}
              name="BPCode"
              onClick={handlerOpenVendor}
              endAdornment={!edit}
            />
            <MUITextField
              label="Planning Group"
              value={data?.planningGroup}
              name="PlanningGroup"
              onChange={(e: any) => handlerChange("planningGroup", e.target.value)}
            />
          </div>
        </div>
      </FormCard>
    </>
  );
}
