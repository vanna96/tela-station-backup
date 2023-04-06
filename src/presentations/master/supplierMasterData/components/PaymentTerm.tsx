import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import BranchSelect from "@/components/selectbox/Branch";
import BuyerSelect from "@/components/selectbox/Buyer";
import CountrySelect from "@/components/selectbox/Country";
import DepartmentSelect from "@/components/selectbox/Department";
import EmailGroupSelect from "@/components/selectbox/EmailGroup";
import IndustrySelect from "@/components/selectbox/Industry";
import MUISelect from "@/components/selectbox/MUISelect";
import ManagerSelect from "@/components/selectbox/Manager";
import PositionSelect from "@/components/selectbox/Position";
import ShippingType from "@/components/selectbox/ShippingType";
import TerritorySelect from "@/components/selectbox/Territory";
import UsersSelect from "@/components/selectbox/UserCode";
import { ContactEmployee } from "@/models/BusinessParter";
import { Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import PaymentTerm from "@/components/selectbox/PaymentTerm";
import PriceListSelect from "@/components/selectbox/PriceList";

export interface IPaymentTermProps {
  //   handlerOpenVendor: () => void;
  handlerChange: (key: string, value: any) => void;
  data: any;
  edit?: boolean;
}

export default function PaymentTerms({
  data,
  edit,
  handlerChange,
}: IPaymentTermProps) {
  return (
    <>
      <FormCard title="PaymentTerm">
        <div className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Payment Terms
              </label>
              <PaymentTerm
                name="PaymentGroupCode"
                value={data.paymentGroupCode}
                onChange={(e) =>
                  handlerChange("paymentGroupCode", e.target.value)
                }
              />
            </div>
            <MUITextField
              label="Interest On Arieas %"
              value={data?.interestAccount}
              name="InterestAccount"
              onChange={(e: any) =>
                handlerChange("interestAccount", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Price List
              </label>
              <div className="">
                <PriceListSelect
                  value={data?.priceListNum}
                  onChange={(e) =>
                    handlerChange("priceListNum", e.target.value)
                  }
                />
              </div>
            </div>
            <MUITextField
              label="Interest On Arieas %"
              value={data?.interestAccount}
              name="InterestAccount"
              onChange={(e: any) =>
                handlerChange("interestAccount", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Credit Limit"
              value={data?.creditLimit}
              name="CreditLimit"
              onChange={(e: any) =>
                handlerChange("creditLimit", e.target.value)
              }
            />
            <MUITextField
              label="Commitment Limit"
              value={data?.maxCommitment}
              name="MaxCommitment"
              onChange={(e: any) =>
                handlerChange("maxCommitment", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-500 text-[14px]">
                Effective Discount Groups
              </label>
              <MUISelect
                items={[
                  { name: "Average", value: "A" },
                  { name: "Highest Discount", value: "H" },
                  { name: "Lowest Discount", value: "dgrLowestDiscount" },
                  { name: "Discount Multiples", value: "M" },
                  { name: "Total", value: "S" },
                ]}
                aliaslabel="name"
                aliasvalue="value"
                name="EffectiveDiscount"
                value={data?.effectiveDiscount}
                onChange={(e) =>
                  handlerChange("effectiveDiscount", e.target.value)
                }
              />
            </div>

            <div>
              <label className="text-gray-500 text-[14px]">
                Effective Price
              </label>
              <MUISelect
                items={[
                  { name: "Default Priority", value: "epDefaultPriority" },
                  { name: "Highest Price", value: "H" },
                  { name: "Lowest Price", value: "L" },
                ]}
                aliaslabel="name"
                aliasvalue="value"
                name="EffectivePrice"
                value={data?.effectivePrice}
                onChange={(e) =>
                  handlerChange("effectivePrice", e.target.value)
                }
              />
            </div>
          </div>
          <label htmlFor="Code" className=" text-black text-[18px] py-3">
            Business Partner Bank
          </label>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Bank Country/Region"
              value={data?.bankCountry}
              name="BankCountry"
              onChange={(e: any) =>
                handlerChange("bankCountry", e.target.value)
              }
            />
            <MUITextField
              label="Bank Name"
              value={data?.houseBank}
              name="HouseBank"
              onChange={(e: any) =>
                handlerChange("houseBank", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Bank Code"
              value={data?.bankCode}
              name="BankCode"
              onChange={(e: any) =>
                handlerChange("bankCode", e.target.value)
              }
            />
            <MUITextField
              label="Account"
              value={data?.accountNo}
              name="AccountNo"
              onChange={(e: any) =>
                handlerChange("accountNo", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="BIC/SWIFT Code"
              value={data?.bICSwiftCode}
              name="BICSwiftCode"
              onChange={(e: any) =>
                handlerChange("bICSwiftCode", e.target.value)
              }
            />
            <MUITextField
              label="Bank Account Name"
              value={data?.addressName2}
              name="AddressName2"
              onChange={(e: any) =>
                handlerChange("addressName2", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Branch"
              value={data?.defaultBranch}
              name="DefaultBranch"
              onChange={(e: any) =>
                handlerChange("defaultBranch", e.target.value)
              }
            />
            <MUITextField
              label="Ctrl Int ID"
              value={data?.addressName2}
              name="AddressName2"
              onChange={(e: any) =>
                handlerChange("addressName2", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="IBAN"
              value={data?.iBAN}
              name="IBAN"
              onChange={(e: any) =>
                handlerChange("iBAN", e.target.value)
              }
            />
            <MUITextField
              label="Man Date ID"
              value={data?.mandateID}
              name="MandateID"
              onChange={(e: any) =>
                handlerChange("mandateID", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Date Of signature"
              value={data?.signatureDate}
              name="SignatureDate"
              onChange={(e: any) =>
                handlerChange("signatureDate", e.target.value)
              }
            />
          
          </div>
        </div>
      </FormCard>
    </>
  );
}
