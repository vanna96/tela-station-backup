import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import BuyerSelect from "@/components/selectbox/Buyer";
import MUISelect from "@/components/selectbox/MUISelect";
import { ContactEmployee } from "@/models/BusinessParter";
import TextField from "@mui/material/TextField";

export interface IPersonalProps {
  handlerChange: (key: string, value: any) => void;
  data: any;
  edit?: boolean;
}

export default function Personal({
  data,
  edit,
  handlerChange,
}: IPersonalProps) {
  return (
    <>
      <FormCard title="Personal">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Status
              </label>
              <BuyerSelect
                value={data?.salesPersonCode}
                onChange={(e) =>
                  handlerChange("salesPersonCode", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Date of Birth
              </label>
              <div className="">
                <MUIDatePicker
                  error={data?.message?.includes("TerminationReason")}
                  value={data.terminationReason}
                  onChange={(e: any) => handlerChange("terminationReason", e)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Country/Region Of Bir
              </label>
              <BuyerSelect
                value={data?.salesPersonCode}
                onChange={(e) =>
                  handlerChange("salesPersonCode", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Marital Status
              </label>
              <BuyerSelect
                value={data?.salesPersonCode}
                onChange={(e) =>
                  handlerChange("salesPersonCode", e.target.value)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="No. of Children"
              value={data?.numOfChildren}
              name="NumOfChildren"
            />
            <MUITextField
              label="ID No."
              value={data?.idNumber}
              name="IdNumber"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Citizenship
              </label>
              <BuyerSelect
                value={data?.salesPersonCode}
                onChange={(e) =>
                  handlerChange("salesPersonCode", e.target.value)
                }
              />
            </div>
            <MUITextField
              label="ID No."
              value={data?.idNumber}
              name="IdNumber"
            />
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Passport Expiration Date
              </label>
              <div className="">
                <MUIDatePicker
                  error={data?.message?.includes("PassportExpirationDate")}
                  value={data.passportExpirationDate}
                  onChange={(e: any) => handlerChange("passportExpirationDate", e)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Passport Issue Date
              </label>
              <div className="">
                <MUIDatePicker
                  error={data?.message?.includes("PassportIssueDate")}
                  value={data.passportIssueDate}
                  onChange={(e: any) => handlerChange("passportIssueDate", e)}
                />
              </div>
            </div>
          </div>
          <MUITextField
            label="Passport Issuer"
            value={data?.passportIssuer}
            name="PassportIssuer"
          />
        </div>
      </FormCard>
    </>
  );
}
