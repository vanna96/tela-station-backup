import FormCard from "@/components/card/FormCard";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import BranchSelect from "../../../../components/selectbox/Branch";
import Checkbox from "@mui/material/Checkbox";

export interface IHeadingFormProps {
  handlerChange: (key: string, value: any) => void;
  edit?: boolean;
  data: any;
}

export default function HeadingForm({
  handlerChange,
  data,
}: IHeadingFormProps) {
  console.log(data);
  return (
    <>
      <FormCard title="Information">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Item
              </label>
              <div className="">
                <MUISelect
                  items={[
                    { name: "Manual", value: 12 },
                    { name: "Employee", value: 171 },
                  ]}
                  onChange={(e) => handlerChange("reqType", e.target.value)}
                  value={data?.reqType}
                  aliasvalue="id"
                  aliaslabel="name"
                  name="ReqType"
                />
              </div>
            </div>
            <MUITextField
              label=" No."
              value={data?.itemCode}
              name="ItemCode"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Description
              </label>
              <div className="">
                <MUITextField name="itemName" value={data.itemName} onChange={(e) => handlerChange("itemName", e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Foreign Name
              </label>
              <div className="mt-1">
                <MUITextField
                  name="ForeignName"
                  value={data.foreignName}
                  onChange={(e) => handlerChange("foreignName", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Item Type
              </label>
              <div className="">
                <BranchSelect
                  name="Item Type"
                  value={data.itemType}
                  onChange={(e) => handlerChange("Item Type", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Item Group
              </label>
              <div className="">
                <BranchSelect
                  name="Item Group"
                  value={data.itemType}
                  onChange={(e) => handlerChange("Item Type", e.target.value)}
                />
              </div>
            </div>
          </div>

        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                UoM Group
              </label>
              <div className="">
                <BranchSelect
                  name="Item Type"
                  value={data.itemType}
                  onChange={(e) => handlerChange("Item Type", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Price Lists
              </label>
              <div className="">
                <BranchSelect
                  name="Item Group"
                  value={data.itemType}
                  onChange={(e) => handlerChange("Item Type", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Bar Code

              </label>
              <div className="">
                <BranchSelect
                  name="Item Type"
                  value={data.itemType}
                  onChange={(e) => handlerChange("Item Type", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Unit Price
              </label>
              <div className="">
                <BranchSelect
                  name="Item Group"
                  value={data.itemType}
                  onChange={(e) => handlerChange("Item Type", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div className="grid grid-cols- gap-3">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1 text-sm">
                  <Checkbox />
                  <label htmlFor="Code" className="text-gray-500 text-[14px]">
                    Inventory Item
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols- gap-3">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1 text-sm">
                  <Checkbox />
                  <label htmlFor="Code" className="text-gray-500 text-[14px]">
                    Sale Item
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols- gap-3">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1 text-sm">
                  <Checkbox />
                  <label htmlFor="Code" className="text-gray-500 text-[14px]">
                    Purchasing Item
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>
      </FormCard>
    </>
  );
}
