import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import BranchSelect from "@/components/selectbox/Branch";
import BuyerSelect from "@/components/selectbox/Buyer";
import CountrySelect from "@/components/selectbox/Country";
import DepartmentSelect from "@/components/selectbox/Department";
import MUISelect from "@/components/selectbox/MUISelect";
import ManagerSelect from "@/components/selectbox/Manager";
import PositionSelect from "@/components/selectbox/Position";
import UsersSelect from "@/components/selectbox/UserCode";
import { ContactEmployee } from "@/models/BusinessParter";
import { Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";

export interface IAddressFormProps {
  //   handlerOpenVendor: () => void;
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
        <div className="flex flex-col gap-2 mt-2">
          <label htmlFor="Code" className=" text-black text-[20px] py-3">
            Pay To
          </label>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Addres ID"
              value={data?.addressName}
              name="AddressName"
              onChange={(e: any) =>
                handlerChange("addressName", e.target.value)
              }
            />
            <MUITextField
              label="Address Name 2"
              value={data?.addressName2}
              name="AddressName2"
              onChange={(e: any) =>
                handlerChange("addressName2", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Addres Name 3"
              value={data?.addressName3}
              name="AddressName3"
              onChange={(e: any) =>
                handlerChange("addressName3", e.target.value)
              }
            />
            <MUITextField
              label="Street / PO Box"
              value={data?.street}
              name="Street"
              onChange={(e: any) => handlerChange("street", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Block"
              value={data?.block}
              name="Block"
              onChange={(e: any) => handlerChange("block", e.target.value)}
            />
            <MUITextField
              label="City"
              value={data?.city}
              name="City"
              onChange={(e: any) => handlerChange("city", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Zip Code"
              value={data?.zipCode}
              name="ZipCode"
              onChange={(e: any) => handlerChange("zipCode", e.target.value)}
            />
            <MUITextField
              label="County"
              value={data?.county}
              name="County"
              onChange={(e: any) => handlerChange("county", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="State"
              value={data?.state}
              name="State"
              onChange={(e: any) => handlerChange("state", e.target.value)}
            />
            <MUITextField
              label="Country/Region"
              value={data?.country}
              name="Country"
              onChange={(e: any) => handlerChange("country", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Street No."
              value={data?.streetNo}
              name="StreetNo"
              onChange={(e: any) => handlerChange("streetNo", e.target.value)}
            />
            <MUITextField
              label="Building/Florr/Room"
              value={data?.buildingFloorRoom}
              name="BuildingFloorRoom"
              onChange={(e: any) =>
                handlerChange("buildingFloorRoom", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="GLN"
              value={data?.globalLocationNumber}
              name="GlobalLocationNumber"
              onChange={(e: any) =>
                handlerChange("globalLocationNumber", e.target.value)
              }
            />
            <MUITextField
              label="Route"
              value={data?.u_RouteCode}
              name="U_RouteCode"
              onChange={(e: any) =>
                handlerChange("u_RouteCode", e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label htmlFor="Code" className=" text-black text-[20px] py-3">
            Ship To
          </label>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Addres ID"
              value={data?.addressName}
              name="AddressName"
              onChange={(e: any) =>
                handlerChange("addressName", e.target.value)
              }
            />
            <MUITextField
              label="Address Name 2"
              value={data?.addressName2}
              name="AddressName2"
              onChange={(e: any) =>
                handlerChange("addressName2", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Addres Name 3"
              value={data?.addressName3}
              name="AddressName3"
              onChange={(e: any) =>
                handlerChange("addressName3", e.target.value)
              }
            />
            <MUITextField
              label="Street / PO Box"
              value={data?.street}
              name="Street"
              onChange={(e: any) => handlerChange("street", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Block"
              value={data?.block}
              name="Block"
              onChange={(e: any) => handlerChange("block", e.target.value)}
            />
            <MUITextField
              label="City"
              value={data?.city}
              name="City"
              onChange={(e: any) => handlerChange("city", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Zip Code"
              value={data?.zipCode}
              name="ZipCode"
              onChange={(e: any) => handlerChange("zipCode", e.target.value)}
            />
            <MUITextField
              label="County"
              value={data?.county}
              name="County"
              onChange={(e: any) => handlerChange("county", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="State"
              value={data?.state}
              name="State"
              onChange={(e: any) => handlerChange("state", e.target.value)}
            />
            <MUITextField
              label="Country/Region"
              value={data?.country}
              name="Country"
              onChange={(e: any) => handlerChange("country", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Street No."
              value={data?.streetNo}
              name="StreetNo"
              onChange={(e: any) => handlerChange("streetNo", e.target.value)}
            />
            <MUITextField
              label="Building/Florr/Room"
              value={data?.buildingFloorRoom}
              name="BuildingFloorRoom"
              onChange={(e: any) =>
                handlerChange("buildingFloorRoom", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="GLN"
              value={data?.globalLocationNumber}
              name="GlobalLocationNumber"
              onChange={(e: any) =>
                handlerChange("globalLocationNumber", e.target.value)
              }
            />
            <MUITextField
              label="Route"
              value={data?.u_RouteCode}
              name="U_RouteCode"
              onChange={(e: any) =>
                handlerChange("u_RouteCode", e.target.value)
              }
            />
          </div>
        </div>
      </FormCard>
    </>
  );
}
