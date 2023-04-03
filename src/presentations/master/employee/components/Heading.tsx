import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import BuyerSelect from "@/components/selectbox/Buyer";
import MUISelect from "@/components/selectbox/MUISelect";
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
            />
            <MUITextField
              label="Middle Name"
              value={data?.middleName}
              name="MiddleName"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Last Name"
              value={data?.lastName}
              name="LastName"
            />
            <MUITextField
              label="Job Title"
              value={data?.jobTitle}
              name="JobTitle"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Department
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
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Branch
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
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Manager
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
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                User Code
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
            <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Sales Employee
            </label>
            <BuyerSelect
              value={data?.salesPersonCode}
              onChange={(e) => handlerChange("salesPersonCode", e.target.value)}
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
              value={data?.firstName}
              name="FirstName"
            />
            <MUITextField
              label="Ext.Employee No."
              value={data?.middleName}
              name="MiddleName"
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
              label="Employee Code"
              value={data?.firstName}
              name="FirstName"
            />
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
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Ext."
              value={data?.firstName}
              name="FirstName"
            />
            <MUITextField
              label="Mobile Phone"
              value={data?.middleName}
              name="MiddleName"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Home Phone"
              value={data?.firstName}
              name="FirstName"
            />
            <MUITextField
              label="Fax"
              value={data?.middleName}
              name="MiddleName"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Email"
              value={data?.firstName}
              name="FirstName"
            />
            <MUITextField
              label="Link Vendor"
              value={data?.middleName}
              name="MiddleName"
            />
          </div>
        </div>
      </FormCard>
    </>
  );
}
