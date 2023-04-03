import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import BuyerSelect from "@/components/selectbox/Buyer";
import MUISelect from "@/components/selectbox/MUISelect";
import { ContactEmployee } from "@/models/BusinessParter";
import TextField from "@mui/material/TextField";

export interface IAdministrationProps {
  handlerChange: (key: string, value: any) => void;
  data: any;
  edit?: boolean;
}

export default function Administration({
  data,
  edit,
  handlerChange,
}: IAdministrationProps) {
  return (
    <>
      <FormCard title="Administration">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Start Date
              </label>
              <div className="">
                <MUIDatePicker
                  error={data?.message?.includes("StartDate")}
                  value={data.startDate}
                  onChange={(e: any) => handlerChange("startDate", e)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Termination Date
              </label>
              <div className="">
                <MUIDatePicker
                  error={data?.message?.includes("TerminationReason")}
                  value={data.terminationReason}
                  onChange={(e: any) => handlerChange("terminationReason", e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-[49%]">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Status
            </label>
            <BuyerSelect
              value={data?.salesPersonCode}
              onChange={(e) => handlerChange("salesPersonCode", e.target.value)}
            />
          </div>
          <div className="w-[49%] ml-3">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Termination Reaon
            </label>
            <BuyerSelect
              value={data?.salesPersonCode}
              onChange={(e) => handlerChange("salesPersonCode", e.target.value)}
            />
          </div>
        </div>
      </FormCard>
    </>
  );
}
