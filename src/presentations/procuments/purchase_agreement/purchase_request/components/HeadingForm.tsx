import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import MUISelect from "@/components/selectbox/MUISelect";
import { ContactEmployee } from "@/models/BusinessParter";
import TextField from "@mui/material/TextField";
import Department from "@/models/Department";
import Branch from "@/models/Branch";
import ShippingType from "@/models/ShippingType";
import DepartmentSelect from "../../../../../components/selectbox/Department";
import BranchSelect from "../../../../../components/selectbox/Branch";
import Owner from "../../../../../models/FactoringIndicator";
import OwnerModal from "../../../../../components/modal/OwnerModal";
import Checkbox from "@mui/material/Checkbox";

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
                    { name: "User", value: 12 },
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
            <div className="flex flex-col gap-1 text-sm">
              <MUITextField
                label="Requester"
                value={data?.cardCode}
                name="BPCode"
                onClick={handlerOpenRequester}
                endAdornment={true}
              />
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <div className="flex flex-col gap-1 text-sm">
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Requester name
                </label>
                <div className="">
                  <MUITextField name="CardName" value={data.cardName} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <div className="flex flex-col gap-1 text-sm">
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Department
                </label>
                <div className="">
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
              <div className="flex items-center gap-1 text-sm">
                <Checkbox />
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Send E-Mail if PO or GPRO is Added
                </label>
              </div>
            </div>
            <MUITextField
              label="Email"
              value={data?.email}
              name="RequesterEmail"
            />
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex flex-col gap-1 text-sm">
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Branch
                </label>

                <BranchSelect
                  name="Branch"
                  value={data.branch}
                  onChange={(e) => handlerChange("branch", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              No
            </label>
            <div className="grid grid-cols-2 gap-3">
              <MUISelect
                items={data.series ?? []}
                aliasvalue="Series"
                aliaslabel="Name"
                name="Series"
                loading={data?.isLoadingSerie}
                value={data?.serie}
                onChange={(e: any) => handlerChange("serie", e.target.value)}
              />
              <TextField
                size="small"
                name="DocNum"
                key={data?.docNum}
                defaultValue={data?.docNum}
                disabled={data?.isLoadingSerie}
                placeholder="Document No"
                fullWidth
                className="w-full text-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Status
              </label>
              <div className="">
                <MUISelect
                  value={data?.documentStatus}
                  items={[
                    { value: "O", label: "Open" },
                    { value: "C", label: "Closed" },
                  ]}
                  name="DocumentStatus"
                  onChange={(e) =>
                    handlerChange("documentStatus", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Posting Date
              </label>
              <div className="">
                <MUIDatePicker
                  value={data.creationDate}
                  onChange={(e: any) => handlerChange("creationDate", e)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Valid Until
              </label>
              <div className="">
                <MUIDatePicker
                  value={data.docDueDate}
                  onChange={(e: any) => handlerChange("docDueDate", e)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Document Date
              </label>
              <div className="">
                <MUIDatePicker
                  value={data.docDate}
                  onChange={(e: any) => handlerChange("docDate", e)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Required Date
              </label>
              <div className="">
                <MUIDatePicker
                  value={data.requriedDate}
                  onChange={(e: any) => handlerChange("requriedDate", e)}
                />
              </div>
            </div>
          </div>
        </div>
      </FormCard>
    </>
  );
}
