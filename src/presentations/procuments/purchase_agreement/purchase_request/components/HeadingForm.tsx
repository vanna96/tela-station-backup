import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import { ContactEmployee } from "@/models/BusinessParter";
import TextField from "@mui/material/TextField";
import Department from "@/models/Department";
import Branch from "@/models/Branch";
import MUICheckBox from "@/components/input/MUICheckBox";
import ShippingType from '@/models/ShippingType';
import DepartmentSelect from '../../../../../components/selectbox/Department';
import BranchSelect from '../../../../../components/selectbox/Branch';

export interface IHeadingFormProps {
  handlerOpenRequester: () => void;
  handlerChange: (key: string, value: any) => void;
  data: any;
}

export default function HeadingForm({
  handlerOpenRequester,
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
                Requester
              </label>
              <div className="">
                <MUISelect
                  items={[
                    { name: "User", value: "U" },
                    { name: "Employee", value: "E" },
                  ]}
                  onChange={(e) => handlerChange("reqType", e.target.value)}
                  value={data?.reqType}
                  aliasvalue="id"
                  aliaslabel="name"
                  name="ReqType"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <MUITextField
                label="Requester Name"
                value={data?.userName}
                name="BPCode"
                onClick={handlerOpenRequester}
                endAdornment={true}
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              {/* <MUITextField
                  label="Department"
                  value={data?.department}
                  name="Department"
                /> */}
              <div className="flex flex-col gap-1 text-sm">
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Department
                </label>
                <div className="">
                  {/* <MUISelect
                    items={data?.Department?.map((e: Department) => ({
                      id: e.code,
                      name: e.name,
                    }))}
                    onChange={(e) =>
                      handlerChange("department", e.target.value)
                    }
                    value={data?.department}
                    aliasvalue="id"
                    aliaslabel="name"
                    name="RequesterDepartment"
                  /> */}
                  <DepartmentSelect
                    name="RequesterDepartment"
                    value={data.department}
                    onChange={(e) =>
                      handlerChange("department", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex flex-col gap-1 text-sm">
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Branch
                </label>
                  
                  <BranchSelect
                    name="Branch"
                    value={data.branch}
                    onChange={(e) =>
                      handlerChange("branch", e.target.value)
                    }
                    />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <MUICheckBox
                label="Send E-Mail if PO or GPRO is Added"
                defaultChecked
                //  value={data?.email}
                name="RequesterEmail"
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <MUITextField
                label="Email"
                value={data?.email}
                name="RequesterEmail"
              />
            </div>
          </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 text-sm">
            <MUITextField
              label="No "
              value={data?.Requester}
              name="Requester"
            />
            <MUITextField
              label="Requester Name"
              value={data?.RequesterName}
              name="RequesterName"
            />
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <MUITextField label="Vender Ref.No" name="" />
          </div>
        </div>
      </FormCard>
    </>
  );
}
