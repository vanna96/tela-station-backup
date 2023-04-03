import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import { ContactEmployee } from "@/models/BusinessParter";
import TextField from "@mui/material/TextField";

export interface IAddressFormProps {
  handlerChange: (key: string, value: any) => void;
  data: any;
  edit?: boolean;
}

export default function Address({
  data,
  edit,
  handlerChange,
}: IAddressFormProps) {
  return (
    <>
      <FormCard title="Address">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Street"
              value={data?.workStreet}
              name="WorkStreet"
            />
            <MUITextField
              label="Street No"
              value={data?.workStreetNumber}
              name="WorkStreetNumber"
            />
            <MUITextField
              label="Block"
              value={data?.workBlock}
              name="WorkBlock"
            />
            <MUITextField
              label="Building/Floor/Room"
              value={data?.workBuildingFloorRoom}
              name="WorkBuildingFloorRoom"
            />
            <MUITextField
              label="Zip Code"
              value={data?.workZipCode}
              name="WorkZipCode"
            />
            <MUITextField label="City" value={data?.workCity} name="WorkCity" />
            <MUITextField
              label="Country"
              value={data?.workCountryCode}
              name="WorkCountryCode"
            />
            <MUITextField
              label="State"
              value={data?.workStateCode}
              name="WorkStateCode"
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Country/Region
            </label>
            <div className="">
              <MUISelect
                items={data?.contactPersonList?.map((e: ContactEmployee) => ({
                  id: e.id,
                  name: e.name,
                }))}
                onChange={(e) =>
                  handlerChange("contactPersonCode", e.target.value)
                }
                value={data?.contactPersonCode}
                aliasvalue="id"
                aliaslabel="name"
                name="ContactPersonCode"
              />
            </div>
          </div>
        </div>
        {/* Home */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Street"
              value={data?.workStreet}
              name="WorkStreet"
            />
            <MUITextField
              label="Street No"
              value={data?.workStreetNumber}
              name="WorkStreetNumber"
            />
            <MUITextField
              label="Block"
              value={data?.workBlock}
              name="WorkBlock"
            />
            <MUITextField
              label="Building/Floor/Room"
              value={data?.workBuildingFloorRoom}
              name="WorkBuildingFloorRoom"
            />
            <MUITextField
              label="Zip Code"
              value={data?.workZipCode}
              name="WorkZipCode"
            />
            <MUITextField label="City" value={data?.workCity} name="WorkCity" />
            <MUITextField
              label="Country"
              value={data?.workCountryCode}
              name="WorkCountryCode"
            />
            <MUITextField
              label="State"
              value={data?.workStateCode}
              name="WorkStateCode"
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Country/Region
            </label>
            <div className="">
              <MUISelect
                items={data?.contactPersonList?.map((e: ContactEmployee) => ({
                  id: e.id,
                  name: e.name,
                }))}
                onChange={(e) =>
                  handlerChange("contactPersonCode", e.target.value)
                }
                value={data?.contactPersonCode}
                aliasvalue="id"
                aliaslabel="name"
                name="ContactPersonCode"
              />
            </div>
          </div>
        </div>
      </FormCard>
    </>
  );
}
