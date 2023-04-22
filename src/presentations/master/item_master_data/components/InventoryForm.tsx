import FormCard from "@/components/card/FormCard";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import BranchSelect from "../../../../components/selectbox/Branch";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";

export interface InventoryFomProps {
    handlerChange: (key: string, value: any) => void;
    edit?: boolean;
    data: any;
}

export default function InventoryFom({
    handlerChange,edit,
    data,
}: InventoryFomProps) {

    const [isCheckedManage, setIsCheckedManage] = useState<boolean>(false);

    console.log(data);
    return (
        <>
            <FormCard title="Inventory">
                <div className="flex flex-col gap-2">

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Set G/L Account by
                            </label>
                            <div className="">
                                <MUISelect
                                    items={[
                                        { name: "Warehouse", value: "glm_WH" },
                                        { name: "Item Group", value: "glm_ItemClass" },
                                        { name: "Item Level", value: "glm_ItemLevel" },
                                    ]}
                                    onChange={(e) => handlerChange("glMethod", e.target.value)}
                                    name="glMethod"
                                    value={data?.glMethod}
                                    aliasvalue="id"
                                    aliaslabel="name"
                                />
                            </div>
                        </div>


                        <MUITextField
                            label=" UoM Name"
                            name="inventoryUOM"
                            value={data.inventoryUOM}
                            onChange={(e) => handlerChange("inventoryUOM", e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">

                        <MUITextField
                            label="Weight"
                            name="inventoryWeight"
                            value={data.inventoryWeight}
                            onChange={(e) => handlerChange("inventoryWeight", e.target.value)}
                        />
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Valuation Method
                            </label>
                            <div className="">
                                {/* {data?.costAccountingMethod === "bis_MovingAverage"
            ? "Moving Average"
            : data?.costAccountingMethod === "bis_Standard"
              ? "Standard"
              : data?.costAccountingMethod === "bis_FIFO"
                ? "FIFO"
                : data?.costAccountingMethod === "bis_SNB"
                  ? "SNB"
                  : data?.costAccountingMethod ?? "N/A"}</span></div> */}
                                <MUISelect
                                    items={[
                                        { name: "Moving Average", value: "bis_MovingAverage" },
                                        { name: "Standard", value: "bis_Standard" },
                                        { name: "FIFO", value: "bis_FIFO" },
                                        { name: "Serial/Batch", value: "bis_SNB" },
                                    ]}
                                    onChange={(e) => handlerChange("costAccountingMethod", e.target.value)}
                                    name="costAccountingMethod"
                                    value={data?.costAccountingMethod}
                                    aliasvalue="id"
                                    aliaslabel="name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">

                        <MUITextField
                            label="Item Cost"
                            name="countingItemsPerUnit"
                            value={data.countingItemsPerUnit}
                            onChange={(e) => handlerChange("countingItemsPerUnit", e.target.value)}
                        />

                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1 text-sm">
                        <input type="checkbox" name='manageStockByWarehouse'
                            checked={edit ? data?.manageStockByWarehouse : isCheckedManage}
                            onChange={(e) => {
                                const { checked } = e.target;
                                const value = checked ? true : false;
                                setIsCheckedManage(value);
                                handlerChange("manageStockByWarehouse", value);
                            }} />
                        <label htmlFor="Code" className="text-gray-500 text-[14px]">
                            Manage Inventory by Warehouse
                        </label>
                    </div>
                    Inventory Level
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Required
                            </label>
                            <div className="">
                                <MUITextField
                                    name="ç"
                                    value={data.desiredInventory}
                                    onChange={(e) => handlerChange("desiredInventory", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Minimum
                            </label>
                            <div className="">
                                <MUITextField
                                    name="ç"
                                    value={data.minInventory}
                                    onChange={(e) => handlerChange("minInventory", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Maximum
                            </label>
                            <div className="">
                                <MUITextField
                                    name="maxInventory"
                                    value={data.maxInventory}
                                    onChange={(e) => handlerChange("maxInventory", e.target.value)}
                                />
                            </div>
                        </div>

                    </div>


                </div>
            </FormCard>
        </>
    );
}
