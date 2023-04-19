import FormCard from "@/components/card/FormCard";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import BranchSelect from "../../../../components/selectbox/Branch";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";

export interface GeneralFormProps {
    handlerChange: (key: string, value: any) => void;
    edit?: boolean;
    data: any;
}

export default function GeneralForm({
    handlerChange,
    data,
}: GeneralFormProps) {
    console.log(data);
    return (
        <>
            <FormCard title="General">
                <div className="flex flex-col gap-2">


                    <div className="grid grid-cols-2 gap-3">

                        <div className="grid grid-cols- gap-3">
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex items-center gap-1 text-sm">
                                    <Checkbox />
                                    <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                        Withholding Tax Liable
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols- gap-3">
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex items-center gap-1 text-sm">
                                    <Checkbox />
                                    <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                        Do Not Apply Discount Groups

                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Manufacturers
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
                                Additional Identifier:
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
                                Shipping Type
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
                                Manage Item By
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

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Active</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="active"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="active" control={<Radio />} label="Active" />
                            <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                            <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
                        </RadioGroup>
                    </FormControl>

                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 text-sm">
                        <label htmlFor="Code" className="text-gray-500 text-[14px]">
                            Remarks
                        </label>
                        <div className="">
                            <TextField
                                size="small"
                                multiline
                                rows={2}
                                fullWidth
                                name="Comments"
                                className="w-full "
                                value={data?.comments}
                                onChange={(e) => handlerChange("comments", e.target.value)}
                            /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Standard Item Identification
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
                                Commodity Classification:
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


                </div>
            </FormCard>
        </>
    );
}
