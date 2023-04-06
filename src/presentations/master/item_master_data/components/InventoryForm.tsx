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
                                <BranchSelect
                                    name="Item Type"
                                    value={data.itemType}
                                    onChange={(e) => handlerChange("Item Type", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                UoM Name:

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
                                Weight:
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
                                Valuation Method
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
                                Item Cost
                            </label>
                            <div className="">
                                <BranchSelect
                                    name="Item Type"
                                    value={data.itemType}
                                    onChange={(e) => handlerChange("Item Type", e.target.value)}
                                />
                            </div>
                        </div>

                    </div>



                </div>
                <div className="flex flex-col gap-2">

                    <div className="grid grid-cols-2 gap-3">

                        <div className="grid grid-cols- gap-3">
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex items-center gap-1 text-sm">
                                    <Checkbox />
                                    <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                    Manage Inventory by Warehouse
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    Invenotry Level
                        <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                            Required
                            </label>
                            <div className="">
                                <MUITextField
                                    name="Item Type"
                                    value={data.itemType}
                                    onChange={(e) => handlerChange("Item Type", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                            Minimum
                            </label>
                            <div className="">
                                <MUITextField
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
                            Maximum
                            </label>
                            <div className="">
                                <MUITextField
                                    name="Item Type"
                                    value={data.itemType}
                                    onChange={(e) => handlerChange("Item Type", e.target.value)}
                                />
                            </div>
                        </div>
                       
                    </div>


                </div>
            </FormCard>
        </>
    );
}
