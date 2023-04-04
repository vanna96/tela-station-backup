import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import BranchSelect from "@/components/selectbox/Branch";
import BuyerSelect from "@/components/selectbox/Buyer";
import DepartmentSelect from "@/components/selectbox/Department";
import MUISelect from "@/components/selectbox/MUISelect";
import ManagerSelect from "@/components/selectbox/Manager";
import UsersSelect from "@/components/selectbox/UserCode";
import { ContactEmployee } from "@/models/BusinessParter";
import { Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";

export interface IHeadingFormProps {
  //   handlerOpenVendor: () => void;
  handlerChange: (key: string, value: any) => void;
  data: any;
  edit?: boolean;
}

export default function Heading({
  data,
  edit,
  handlerChange,
}: IHeadingFormProps) {
  return (
    <>
      <FormCard title="Information">
        <div className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="First Name"
              value={data?.firstName}
              name="FirstName"
              onChange={(e: any) => handlerChange("firstName", e.target.value)}
            />
            <MUITextField
              label="Middle Name"
              value={data?.middleName}
              name="MiddleName"
              onChange={(e: any) => handlerChange("middleName", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Last Name"
              value={data?.lastName}
              name="LastName"
              onChange={(e: any) => handlerChange("lastName", e.target.value)}
            />
            <MUITextField
              label="Job Title"
              value={data?.jobTitle}
              name="JobTitle"
              onChange={(e: any) => handlerChange("jobTitle", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Department
              </label>
              <DepartmentSelect
                value={data?.department}
                onChange={(e) => handlerChange("department", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Branch
              </label>
              <BranchSelect
                value={data?.branch}
                onChange={(e) => handlerChange("branch", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Manager
              </label>
              <div className="">
              <ManagerSelect
                value={data?.manager}
                onChange={(e) =>
                  handlerChange("manager", e.target.value)
                }
              />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                User Code
              </label>
              <div className="">
                <UsersSelect
                  value={data?.applicationUserID}
                  onChange={(e) => handlerChange("applicationUserID", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Sales Employee
              </label>
              <BuyerSelect
                value={data?.salesPersonCode}
                onChange={(e) =>
                  handlerChange("salesPersonCode", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Cost Center
              </label>
              <div className="">
                <MUISelect
                  items={data?.contactPersonList?.map((e: ContactEmployee) => ({
                    id: e.id,
                    name: e.name,
                  }))}
                  onChange={(e) =>
                    handlerChange("contactPersonCode", e.target.value)
                  }
                  value={data?.contactPersonCode}
                  aliasvalue="id"
                  aliaslabel="name"
                  name="ContactPersonCode"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Employee Code"
              value={data?.employeeCode}
              name="EmployeeCode"
            />
            <MUITextField
              label="Ext.Employee No."
              value={data?.externalEmployeeNumber}
              name="ExternalEmployeeNumber"
            />
            <div className="flex items-center text-sm mt-2 -ml-2">
              <Checkbox
                name="Active Employee"
                checked={data.ActiveEmployee}
                onChange={(e) => handlerChange("renewal", !data.ActiveEmployee)}
              />
              <label
                htmlFor="Active Employee"
                className="text-gray-500 text-[14px]"
              >
                Active Employee
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Office Phone"
              value={data?.officePhone}
              name="OfficePhone"
            />
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Position
              </label>
              <div className="">
                <MUISelect
                  items={data?.contactPersonList?.map((e: ContactEmployee) => ({
                    id: e.id,
                    name: e.name,
                  }))}
                  onChange={(e) =>
                    handlerChange("contactPersonCode", e.target.value)
                  }
                  value={data?.contactPersonCode}
                  aliasvalue="id"
                  aliaslabel="name"
                  name="ContactPersonCode"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Ext."
              value={data?.officeExtension}
              name="OfficeExtension"
            />
            <MUITextField
              label="Mobile Phone"
              value={data?.mobilePhone}
              name="MobilePhone"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Home Phone"
              value={data?.homePhone}
              name="HomePhone"
            />
            <MUITextField label="Fax" value={data?.fax} name="Fax" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField label="Email" value={data?.eMail} name="eMail" />
            <MUITextField
              label="Link Vendor"
              value={data?.linkedVendor}
              name="LinkedVendor"
            />
          </div>
        </div>
      </FormCard>
    </>
  );
}
