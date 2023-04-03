import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import BuyerSelect from "@/components/selectbox/Buyer";
import MUISelect from "@/components/selectbox/MUISelect";
import { ContactEmployee } from "@/models/BusinessParter";
import TextField from "@mui/material/TextField";

export interface IRemarkProps {
  handlerChange: (key: string, value: any) => void;
  data: any;
  edit?: boolean;
}

export default function Remark({
  data,
  edit,
  handlerChange,
}: IRemarkProps) {
  return (
    <>
      <FormCard title="Remark">
      <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Remarks
          </label>
          <div className="">
            {data.documentStatus === "bost_Open" ? (
              <TextField
                size="small"
                multiline
                rows={4}
                fullWidth
                name="Comments"
                className="w-full "
                defaultValue={data?.comments}
              />
            ) : (
              <TextField
                size="small"
                multiline
                rows={4}
                disabled={edit}
                fullWidth
                name="Comments"
                className="w-full "
                defaultValue={data?.comments}
              />
            )}
          </div>
        </div>
      </FormCard>
    </>
  );
}
