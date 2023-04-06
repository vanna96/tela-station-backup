import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import BranchSelect from "@/components/selectbox/Branch";
import BuyerSelect from "@/components/selectbox/Buyer";
import CountrySelect from "@/components/selectbox/Country";
import DepartmentSelect from "@/components/selectbox/Department";
import EmailGroupSelect from "@/components/selectbox/EmailGroup";
import IndustrySelect from "@/components/selectbox/Industry";
import MUISelect from "@/components/selectbox/MUISelect";
import ManagerSelect from "@/components/selectbox/Manager";
import PositionSelect from "@/components/selectbox/Position";
import ShippingType from "@/components/selectbox/ShippingType";
import TerritorySelect from "@/components/selectbox/Territory";
import UsersSelect from "@/components/selectbox/UserCode";
import { ContactEmployee } from "@/models/BusinessParter";
import { Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";

export interface IPaymentTermProps {
  //   handlerOpenVendor: () => void;
  handlerChange: (key: string, value: any) => void;
  data: any;
  edit?: boolean;
}

export default function PaymentTerm({
  data,
  edit,
  handlerChange,
}: IPaymentTermProps) {
  return (
    <>
      <FormCard title="PaymentTerm">
        <div className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 gap-3">
             
          </div>
        </div>
      </FormCard>
    </>
  );
}
