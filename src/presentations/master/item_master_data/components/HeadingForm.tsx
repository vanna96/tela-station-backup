import FormCard from "@/components/card/FormCard";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import BranchSelect from "../../../../components/selectbox/Branch";
import Checkbox from "@mui/material/Checkbox";
import ItemGroupSelect from "@/components/selectbox/ItemGroup";
import UOMSelect from "@/components/selectbox/UnitofMeasurment";
import PriceListSelect from "@/components/selectbox/PriceList";
import MUICheckbox from "@/components/input/MUICheckbox";
import { useRef } from "react";

export interface IHeadingFormProps {
  handlerChange: (key: string, value: any) => void;
  edit?: boolean;
  data: any;
}

export default function HeadingForm({
  handlerChange,
  edit,
  data,
}: IHeadingFormProps) {

  const salesItemRef = useRef<HTMLInputElement>(null);

  const handleSalesItemChange = () => {
    const salesItem = salesItemRef.current?.checked ? 'tYES' : 'tNO';
    console.log(salesItem);
  };
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
              onChange={(e) => handlerChange("itemCode", e.target.value)}

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
                <MUISelect
                  items={[
                    { name: "Items", value: "itItems" },
                    { name: "Labor", value: "itLabor" },
                    { name: "Travel", value: "itTravel" },
                    { name: "Fixed Assets", value: "itFixedAssets" },
                  ]}
                  onChange={(e) => handlerChange("itemType", e.target.value)}
                  name="itemType"
                  value={data?.itemType}
                  aliasvalue="id"
                  aliaslabel="name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Item Group
              </label>
              <div className="">
                <ItemGroupSelect
                  name="itemsGroupCode"
                  value={data.itemsGroupCode}
                  onChange={(e) => handlerChange("itemsGroupCode", e.target.value)}
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
                <UOMSelect
                  name="uomGroupEntry"
                  value={data.uomGroupEntry}
                  onChange={(e) => handlerChange("uomGroupEntry", e.target.value)}
                />

              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Price Lists
              </label>
              <div className="">
                <PriceListSelect
                  name="PriceList"
                  value={data.priceList}
                  onChange={(e) => handlerChange("priceList", e.target.value)}
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
                <MUITextField
                  name="Barcode"
                  value={data.barCode}
                  onChange={(e) => handlerChange("barCode", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Unit Price
              </label>
              <div className="">
                <MUITextField
                  name="PricingUnit"
                  value={data.pricingUnit}
                  onChange={(e) => handlerChange("pricingUnit", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div className="grid grid-cols- gap-3">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1 text-sm">
                  {/* <Checkbox defaultChecked={true} checked={data.inventoryItem === 'tYES' ? true : false} /> */}
                  {/* <MUICheckbox name='SalesItem' value={data.inventoryItem} /> */}
                  {/* <input type="checkbox" name="InventoryItem" value={data.inventoryItem}  
                
                  onChange={(e) => handlerChange("inventoryItem", e.target.value)}
                  
                  ></input> */}
                  {/* <MUICheckb  ox name="InventoryItem" value={data.inventoryItem}

                    onChange={(e) => handlerChange("inventoryItem", e.getValue())}
                  /> */}

                  {/* <input type="checkbox" name='inventoryItem' onChange={(e) => handlerChange("inventoryItem", e.target.value)}
                  
                  /> */}
                  < input type="checkbox"  name="inventoryItem" value="tYES"/>

                  <label htmlFor="Code" className="text-gray-500 text-[14px]">
                    Inventory Item
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols- gap-3">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1 text-sm">
                  {/* { edit ? <Checkbox checked={data.salesItem === 'tYES' ? true : false} /> : <Checkbox defaultChecked={true} name="SalesItem" checked={data.salesItem } />} */}
                  {/* <MUICheckbox name='SalesItem' value={data.salesItem} /> */}
                  < input type="checkbox"  name="salesItem" value="tYES" onChange={(e) => handlerChange("salesItem", e.target.value)}/>

                  <label htmlFor="Code" className="text-gray-500 text-[14px]">
                    Sales Item
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols- gap-3">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1 text-sm">
                  <input type="checkbox" checked={data.purchaseItem} name='purchaseItem' onChange={(e) => handlerChange("purchaseItem", e.target.value)} />
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
