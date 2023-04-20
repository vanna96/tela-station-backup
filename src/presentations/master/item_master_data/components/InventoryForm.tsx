import FormCard from "@/components/card/FormCard";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import BranchSelect from "../../../../components/selectbox/Branch";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";

export interface InventoryFomProps {
    handlerChange: (key: string, value: any) => void;
    edit?: boolean;
    data: any;
}

export default function InventoryFom({
    handlerChange,
    data,
}: InventoryFomProps) {
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
                                        { name: "Warehouse", value: "W" },
                                        { name: "Item Group", value: "C" },
                                        { name: "Item Level", value: "L" },
                                    ]}
                                    onChange={(e) => handlerChange("setGLAccountBy", e.target.value)}
                                    name="setGLAccountBy"
                                    value={data?.setGLAccountBy}
                                    aliasvalue="id"
                                    aliaslabel="name"
                                />
                            </div>
                        </div>


                        <MUITextField
                            label=" UoM Name"
                            name="uomName"
                            value={data.uomName}
                            onChange={(e) => handlerChange("uomName", e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">

                        <MUITextField
                            label="Weight"
                            name="weight"
                            value={data.weight}
                            onChange={(e) => handlerChange("weight", e.target.value)}
                        />
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Valuation Method
                            </label>
                            <div className="">
                                <MUISelect
                                    items={[
                                        { name: "Moving Average", value: "A" },
                                        { name: "Standard", value: "S" },
                                        { name: "FIFO", value: "F" },
                                        { name: "Serial/Batch", value: "B" },
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
                            name="itemCost"
                            value={data.itemCost}
                            onChange={(e) => handlerChange("itemCost", e.target.value)}
                        />

                    </div>



                </div>
                <div className="flex flex-col gap-2">


                        <div className="flex items-center gap-1 text-sm">
                            <Checkbox />
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
                                    name="requiredPurchasingUoM"
                                    value={data.requiredPurchasingUoM}
                                    onChange={(e) => handlerChange("requiredPurchasingUoM", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Minimum
                            </label>
                            <div className="">
                                <MUITextField
                                    name="minimum"
                                    value={data.minimum}
                                    onChange={(e) => handlerChange("minimum", e.target.value)}
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
                                    name="maximum"
                                    value={data.maximum}
                                    onChange={(e) => handlerChange("maximum", e.target.value)}
                                />
                            </div>
                        </div>

                    </div>


                </div>
            </FormCard>
        </>
    );
}
