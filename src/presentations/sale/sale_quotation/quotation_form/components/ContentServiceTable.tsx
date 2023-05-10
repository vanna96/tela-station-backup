import { MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";
import { ContactContext } from "../context/ContentFormContext";
import { GeneralContact } from "../context/GeneralFormContext";
import { ModalContentService } from "./ModalContentService";

export const ContentServiceTable = () => {
  const { formContent, setFormContent, TaxCode, ContentService }: any =
    useContext(ContactContext);
  const { formGeneral }: any = useContext(GeneralContact);
  const items = formContent?.items;

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleOpenModal = (obj?: any) => {
    if (!formGeneral?.CardCode) return;
    setEditData(obj);
    handleOpen();
  };

  const handleRemoveRow = (Code: string) =>
    setFormContent({
      ...formContent,
      items: items?.filter((e: any) => e.Code !== Code),
    });

  const handleUpdateRow = (row: any, field: any) => {
    const newState = items?.map((obj: any) => {
      if (obj.Code !== row.Code) return obj;
      if (field?.total !== undefined) {
        const rate =
          TaxCode?.find((e: any) => e.Code === obj.taxCode)?.VatGroups_Lines[0][
            "Rate"
          ] || 0;
        field = {
          ...field,
          rate: (rate / 100) * parseFloat(field?.total),
        };
        return { ...obj, ...field };
      }

      if (field.taxCode !== undefined) {
        const rate =
          TaxCode?.find((e: any) => e.Code === field.taxCode)
            ?.VatGroups_Lines[0]["Rate"] || 0;
        field = {
          rate: (rate / 100) * parseFloat(obj?.total),
          taxCode: field.taxCode,
        };
        return { ...obj, ...field };
      }
    });

    setFormContent({ ...formContent, items: newState });
  };

  return (
    <>
      <ModalContentService
        openModal={open}
        handleClose={handleClose}
        contentType={formContent?.itemServiceType}
        data={ContentService}
        editData={editData}
      />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-[5px]">
              #
            </th>
            <th scope="col" className="px-6 py-3  w-full 2xl:w-[200px]">
              Description
            </th>
            <th scope="col" className="px-6 py-3  w-[150px]">
              G/L Account
            </th>
            <th scope="col" className="px-6 py-3  w-[200px]">
              G/L Account Name
            </th>
            <th scope="col" className="px-6 py-3 w-[150px]">
              Tax Code
            </th>
            <th scope="col" className="px-6 py-3 w-[150px]">
              Total (LC)
            </th>
            <th scope="col" className="px-6 py-3 w-[200px]">
              Blanket Agreement No.
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {items?.map((data: any, index: number) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-[40px]"
                key={index}
              >
                <td className="px-6 py-3 w-[5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 text-red-500 cursor-pointer"
                    onClick={() => handleRemoveRow(data.Code)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </td>
                <td className="px-2">
                  <input
                    type="text"
                    className="form-control h-[25px] w-full"
                    value={data.description}
                    onChange={(e) =>
                      handleUpdateRow(data, { description: e.target.value })
                    }
                  />
                </td>
                <td className="px-2 relative">
                  <div className="absolute top-2.5 right-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      onClick={() => handleOpenModal(data)}
                      className="w-5 text-blue-400 cursor-pointer "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="form-control h-[25px] w-[200px]"
                    value={data.Code}
                    readOnly={true}
                  />
                </td>
                <td className="px-2">
                  <input
                    type="text"
                    className="form-control h-[25px] w-[200px]"
                    value={data.Name}
                    readOnly={true}
                  />
                </td>
                <td className="px-2">
                  <Select
                    label=""
                    className="form-control h-[25px] w-[200px]"
                    onChange={(e) =>
                      handleUpdateRow(data, { taxCode: e.target.value })
                    }
                    value={data.taxCode}
                    sx={{ border: "0px solid black", padding: 0 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {TaxCode?.map((res: any, index: number) => (
                      <MenuItem key={index} value={`${res.Code}`}>
                        {res.Code}
                      </MenuItem>
                    ))}
                  </Select>
                </td>
                <td className="px-2">
                  <input
                    type="text"
                    className="form-control h-[25px] w-[200px]"
                    value={data.total}
                    onChange={(e) =>
                      handleUpdateRow(data, { total: e.target.value })
                    }
                  />
                </td>
                <td className="px-2">
                  <input
                    type="text"
                    className="form-control h-[25px] w-[200px]"
                    value={data.blanketAgreement}
                    onChange={(e) =>
                      handleUpdateRow(data, {
                        blanketAgreement: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
            );
          })}
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-3 w-[5px]"></td>
            <td className="px-2">
              <input
                name=""
                type="text"
                className="form-control h-[25px] w-full 2xl:w-[200px]"
              />
            </td>
            <td className="px-2 relative">
              <div className="absolute right-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={() => handleOpenModal()}
                  className="w-5 text-blue-400 cursor-pointer "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                  />
                </svg>
              </div>
              <input
                name=""
                type="text"
                className="form-control h-[25px] w-[200px]"
              />
            </td>
            <td className="px-2">
              <input
                name=""
                type="text"
                className="form-control h-[25px] w-[200px]"
              />
            </td>
            <td className="px-2">
              <input
                name=""
                type="text"
                className="form-control h-[25px] w-[200px]"
              />
            </td>
            <td className="px-2">
              <input
                name=""
                type="text"
                className="form-control h-[25px] w-[200px]"
              />
            </td>
            <td className="px-2">
              <input
                name=""
                type="text"
                className="form-control h-[25px] w-[200px]"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
