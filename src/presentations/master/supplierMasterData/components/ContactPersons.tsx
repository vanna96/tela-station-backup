import FormCard from "@/components/card/FormCard";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import MUITextField from "@/components/input/MUITextField";
import CountrySelect from "@/components/selectbox/Country";
import EmailGroupSelect from "@/components/selectbox/EmailGroup";
import MUISelect from "@/components/selectbox/MUISelect";

export interface IContactPersonFormProps {
  //   handlerOpenVendor: () => void;
  handlerChange: (key: string, value: any) => void;
  data: any;
  edit?: boolean;
}

export default function ContactPerson({
  data,
  edit,
  handlerChange,
}: IContactPersonFormProps) {
  return (
    <>
      <FormCard title="ContactPerson">
        <div className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Contact ID"
              value={data?.name}
              name="Name"
              onChange={(e: any) => handlerChange("name", e.target.value)}
            />
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
            <MUITextField
              label="Last Name"
              value={data?.lastName}
              name="LastName"
              onChange={(e: any) => handlerChange("lastName", e.target.value)}
            />
            <MUITextField
              label="Title"
              value={data?.title}
              name="Title"
              onChange={(e: any) => handlerChange("title", e.target.value)}
            />
            <MUITextField
              label="Position"
              value={data?.position}
              name="Position"
              onChange={(e: any) => handlerChange("position", e.target.value)}
            />
            <MUITextField
              label="Address"
              value={data?.address}
              name="Address"
              onChange={(e: any) => handlerChange("address", e.target.value)}
            />
            <MUITextField
              label="TelePhone 1"
              value={data?.phone1}
              name="Phone1"
              onChange={(e: any) => handlerChange("phone1", e.target.value)}
            />
            <MUITextField
              label="TelePhone 2"
              value={data?.phone2}
              name="Phone2"
              onChange={(e: any) => handlerChange("phone2", e.target.value)}
            />
            <MUITextField
              label="Mobile Phone"
              value={data?.mobilePhone}
              name="MobilePhone"
              onChange={(e: any) =>
                handlerChange("mobilePhone", e.target.value)
              }
            />
            <MUITextField
              label="Fax"
              value={data?.fax}
              name="Fax"
              onChange={(e: any) => handlerChange("fax", e.target.value)}
            />
            <MUITextField
              label="E-Mail"
              value={data?.e_Mail}
              name="E_Mail"
              onChange={(e: any) => handlerChange("e_Mail", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                E-Mail Group
              </label>
              <EmailGroupSelect
                name="EmailGroupCode"
                value={data?.emailGroupCode}
                onChange={(e) =>
                  handlerChange("emailGroupCode", e.target.value)
                }
              />
            </div>
            <MUITextField
              label="Pager"
              value={data?.pager}
              name="Pager"
              onChange={(e: any) => handlerChange("pager", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Remark1"
              value={data?.remarks1}
              name="Remarks1"
              onChange={(e: any) => handlerChange("remarks1", e.target.value)}
            />
            <MUITextField
              label="Remark2"
              value={data?.remarks2}
              name="Remarks2"
              onChange={(e: any) => handlerChange("remarks2", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Password"
              value={data?.password}
              name="Password"
              onChange={(e: any) => handlerChange("password", e.target.value)}
            />
            <div>
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Country/Region Of Birth
              </label>
              <CountrySelect
                value={data?.placeOfBirth}
                name="PlaceOfBirth"
                onChange={(e: any) =>
                  handlerChange("placeOfBirth", e.target.value)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Date Of Birth
              </label>
              <div className="">
                <MUIDatePicker
                  error={data?.message?.includes("DateOfBirth")}
                  value={data.dateOfBirth}
                  onChange={(e: any) => handlerChange("dateOfBirth", e)}
                />
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-[14px]">Gender</label>
              <MUISelect
                items={[
                  { name: "Female", value: "F" },
                  { name: "Male", value: "gt_Male" },
                ]}
                aliaslabel="name"
                aliasvalue="value"
                name="Gender"
                value={data?.gender}
                onChange={(e) => handlerChange("gender", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Profession"
              value={data?.profession}
              name="Profession"
              onChange={(e: any) => handlerChange("profession", e.target.value)}
            />
            <MUITextField
              label="City Of Birth"
              value={data?.cityOfBirth}
              name="CityOfBirth"
              onChange={(e: any) => handlerChange("cityOfBirth", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MUITextField
              label="Connected Address"
              value={data?.connectedAddressName}
              name="ConnectedAddressName"
              onChange={(e: any) => handlerChange("connectedAddressName", e.target.value)}
            />
            
          </div>
        </div>
      </FormCard>
    </>
  );
}
