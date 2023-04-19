import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import { ContactEmployee } from "@/models/BusinessParter";
import TextField from "@mui/material/TextField";

export interface SalesFormProps {
    handlerOpenVendor: () => void;
    handlerChange: (key: string, value: any) => void;
    data: any;
}

export default function SalesForm({
    handlerOpenVendor,
    data,
    handlerChange,
}: SalesFormProps) {
    return (
        <>
            <FormCard title="Sales">
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-3">
                        <MUITextField
                            label="Prefered Vendor"
                            value={data?.cardCode}
                            name="BPCode"
                            onClick={handlerOpenVendor}
                            endAdornment={true}
                        />

                        <MUITextField
                            label="Mfr Catalog No"
                            value={data?.cardName}
                            name="BPName"
                        />

                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                        <div className="grid grid-cols-2 gap-3">

                            <MUITextField label="Purchasing UoM Name" name="" value={data?.numAtCard} />
                            <MUITextField label="Items Per Purchasing Unit" name="" value={data?.numAtCard} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                        <div className="grid grid-cols-2 gap-3">

                            <MUITextField label="Packing UoM Name" name="" value={data?.numAtCard} />
                            <MUITextField label="Quantity per Package" name="" value={data?.numAtCard} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                        <div className="grid grid-cols-2 gap-3">

                            <MUITextField label="Customs Groups" name="" value={data?.numAtCard} />
                            <MUITextField label="Tax Group" name="" value={data?.numAtCard} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">

                    <div className="flex flex-col gap-1 text-sm">
                        <div className="grid grid-cols-2 gap-3">

                            <MUITextField label="Length" name="" value={data?.numAtCard} />
                            <MUITextField label="Width" name="" value={data?.numAtCard} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="grid grid-cols-2 gap-3">

                            <MUITextField label="Height" name="" value={data?.numAtCard} />
                            <MUITextField label="Volume" name="" value={data?.numAtCard} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="grid grid-cols-2 gap-3">

                            <MUITextField label="Weight" name="" value={data?.numAtCard} />
                            
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="grid grid-cols-2 gap-3">

                            <MUITextField label="Factor 1" name="" value={data?.numAtCard} />
                            <MUITextField label="Factor 2" name="" value={data?.numAtCard} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="grid grid-cols-2 gap-3">

                            <MUITextField label="Factor 3" name="" value={data?.numAtCard} />
                            <MUITextField label="Factor 4" name="" value={data?.numAtCard} />
                        </div>
                    </div>
                </div>
            </FormCard>
        </>
    );
}
