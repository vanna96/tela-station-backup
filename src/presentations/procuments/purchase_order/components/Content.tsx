import React, { useCallback } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import MaterialReactTable from "material-react-table";
import { Button, Checkbox, TextField } from "@mui/material";
import MUITextField from "../../../../components/input/MUITextField";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import ShippingType from "@/components/selectbox/ShippingType";
import { currencyFormat } from "@/utilies";
import ItemModal from "@/components/modal/ItemModal";
import FormCard from "@/components/card/FormCard";
import Formular from "@/utilies/formular";
import MUISelect from "@/components/selectbox/MUISelect";
import { ContactEmployee } from "@/models/BusinessParter";
import Owner from "@/components/selectbox/Owner";
import AccounttingForm from "./Accountting";
import AccountTextField from "../../../../components/input/AccountTextField";

export interface ContentFormProps {
  handlerAddItem: () => void;
  handlerChangeItem: (record: any) => void;
  handlerRemoveItem: (record: string) => void;
  handlerChange: (key: string, value: any) => void;
  handlerOpenGLAccount?: () => void;
  data: any;
}

export default function ContentForm({
  data,
  handlerChangeItem,
  handlerAddItem,
  handlerRemoveItem,
  handlerChange,
  handlerOpenGLAccount,
}: ContentFormProps) {
  const [tableKey, setTableKey] = React.useState(Date.now());

  const handlerChangeInput = (event: any, row: any, field: any) => {
    handlerChangeItem({ value: event.target.value, record: row, field });
  };

  const handlerRemoveRow = (row: any) => {
    handlerRemoveItem(row.ItemCode);
  };

  const itemColumns = React.useMemo(
    () => [
      {
        accessorKey: "Action",
        header: "",
        size: 40,
        enableResizing: false,
        Cell: ({ cell }: any) => {
          return <div role="button" className="flex justify-center items-center">
            <button type="button" className="border border-gray-200 p-1 rounded-sm" onClick={() => handlerRemoveRow(cell.row.original)}><AiOutlineDelete /></button>
          </div>;
        },
      },
      {
        accessorKey: "itemCode",
        header: "Item No", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          // return ;
          return <MUITextField
            value={cell.getValue()}
            onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'ItemCode')}
            onClick={() => { }}
          />;
        },
      },

      {
        accessorKey: "itemDescription",
        header: "Description",
        Cell: ({ cell }: any) => {
          return <MUITextField
            value={cell.getValue()}
            onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'itemDescription')}
          />;
        },
      },
      {
        accessorKey: "quantity",
        header: "  Quantity",
        Cell: ({ cell }: any) => {

          return <MUITextField
            value={cell.getValue()}
            type="number"
            error={(cell.getValue() as number) <= 0}
            disabled={data?.DocumentDtatus}
            onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'quantity')}
          />;
        },
      },
      {
        accessorKey: "discountPercent",
        header: "Discount",
        Cell: ({ cell }: any) => {
          return <MUITextField
            value={cell.getValue()}
            startAdornment={'%'}
            type="number"
            error={(cell.getValue() as number) <= 0}
            disabled={data?.DocumentDtatus}
            onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'discountPercent')}
          />;
        },
      },
      {
        accessorKey: "unitPrice",
        header: "Unit Price",
        Cell: ({ cell }: any) => {
          return <MUITextField
            value={cell.getValue()}
            disabled={data?.DocumentDtatus}
            onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'unitPrice')}
          />;
        },
      },
      {
        accessorKey: "vatGroup",
        header: "Tax Code",
        Cell: ({ cell }: any) => {
          return <MUITextField
            value={cell.getValue()}
            onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'purchaseVatGroup')}
          />;
        },
      },
      {
        accessorKey: "total",
        header: "Total",
        Cell: ({ cell }: any) => {
            return <MUITextField
                disabled={data?.isApproved}
                value={Formular.findToTal(cell.row.original.quantity, cell.row.original.unitPrice)}
            />;
        },
    },
      {
        accessorKey: "uomCode",
        header: "UoM Code",
        Cell: ({ cell }: any) => {

          console.log(cell.row.original.UnitPrice)
          return <MUITextField
            value={cell.getValue()}
            onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'uomCode')}
          />;
        },
      },
    ],
    []
  );

  const serviceColumns = React.useMemo(
    () => [
      {
        accessorKey: "Action",
        header: "",
        size: 60,
        enableResizing: false,
        Cell: ({ cell }: any) => {
          // return ;
          return (
            <Button
              size="small"
              color="error"
              onClick={() => handlerRemoveRow(cell.row.original)}
            >
              <AiOutlineDelete />
            </Button>
          );
        },
      },
      {
        accessorKey: "itemDescription",
        header: "Descriptions", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          // return ;
          return <MUITextField
            value={cell.getValue()}
            name="itemDescription"
            onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'itemDescription')}
          />;
        },
      },
      {
        accessorKey: "accountCode",
        header: "G/L Account", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          console.log(cell.getValue());
          return (
            <AccountTextField
              value={cell.getValue()}
              onChange={(event) =>
                handlerChangeInput(event, cell?.row?.original, "accountCode")
              }
            />
          );
        },
      },
      {
        accessorKey: "AccountName",
        header: "	G/L Account Name", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          return <MUITextField value={cell.getValue()} />;
        },
      },
      {
        accessorKey: "vatGroup",
        header: "Tax Code", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          return (
            <MUITextField
              value={cell.getValue()}
              onChange={(event: any) =>
                handlerChangeInput(event, cell?.row?.original, "VatGroup")
              }
            />
          );
        },
      },
      {
        accessorKey: "lineTotal",
        header: "Total (LC)", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          return <MUITextField value={cell.getValue()} />;
        },
      },
      {
        accessorKey: "blanketAgreementNumber",
        header: "	Blanket Agreement No.", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          return (
            <MUITextField
              value={cell.getValue()}
              onChange={(event: any) =>
                handlerChangeInput(
                  event,
                  cell?.row?.original,
                  "BlanketAgreementNumber"
                )
              }
            />
          );
        },
      },
    ],
    []
  );

  const [colVisibility, setColVisibility] = React.useState<
    Record<string, boolean>
  >({ Total: false, ItemsGroupName: false, UoMGroupName: false });
  console.log(data);

  return (
    <FormCard title="Content">
      <div className="col-span-2 data-table">
        <div className="my-4 w-[30%]">
          <label
            htmlFor="AgreementMethod"
            className="text-gray-500 text-[14px]"
          >
            Item/Service Type
          </label>
          <div className="">
            <MUISelect
              items={[
                { name: "Items", value: "I" },
                { name: "Service", value: "S" },
              ]}
              aliaslabel="name"
              aliasvalue="value"
              name="DocType"
              value={data.docType}
              onChange={(e) => handlerChange("docType", e.target.value)}
            />
          </div>
        </div>

        <MaterialReactTable
          key={tableKey}
          // columns={itemColumns}
          columns={data?.docType === "S" ? serviceColumns : itemColumns}
          data={data.items ?? []}
          enableStickyHeader={true}
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={false}
          enableSorting={false}
          enableBottomToolbar={false}
          enableTopToolbar={true}
          enableColumnResizing={true}
          enableColumnFilterModes={false}
          enableDensityToggle={false}
          enableFilters={false}
          enableFullScreenToggle={false}
          enableGlobalFilter={false}
          enableHiding={true}
          onColumnVisibilityChange={setColVisibility}
          initialState={{
            density: "compact",
            columnVisibility: colVisibility,
          }}
          state={{
            columnVisibility: colVisibility,
          }}
          icons={{
            ViewColumnIcon: (props: any) => <AiOutlineSetting {...props} />,
          }}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <div className="flex gap-2 mb-6 pt-2 justify-center items-center">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handlerAddItem}
                >
                  <span className="text-xs  capitalize font-normal">
                    + Add New
                  </span>
                </Button>
              </div>
            );
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="w-[48%] gap-3">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Buyer
            </label>
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
          <div className="w-[48%]">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Owner
            </label>
            <Owner
              name="DocumentsOwner"
              value={data?.owner}
              onChange={(e: any) => handlerChange("owner", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Remarks
          </label>
          <div className="">
            <TextField
              size="small"
              multiline
              rows={4}
              fullWidth
              name="Comments"
              value={data?.comments}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="w-[100%] gap-3">
          <MUITextField
            label="Total Before Discount"
            value={data.LineTotal}
            name="LineTotal"
          />
        </div>
        <div className="flex justify-between">
          <div className="w-[48%] gap-3">
            <MUITextField
              label="Discount"
              value={data.DiscountPercent}
              name="DiscountPercent"
              startAdornment={"%"}
            />
          </div>
          <div className="w-[48%] gap-3 mt-5">
            <MUITextField label="" />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[48%] gap-3">
            <MUITextField label="Fright" name="" />
          </div>
          <div className="w-[48%] gap-3 mt-5">
            <div className="flex items-center gap-1 text-sm">
              <Checkbox
                name="Renewal"
                checked={data.renewal}
                onChange={(e) => handlerChange("renewal", !data.renewal)}
              />
              <label htmlFor="Renewal" className="text-gray-500 text-[14px]">
                Rounding
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[48%] gap-3">
            <MUITextField label="Tax:" value={data.Tax} />
          </div>
          <div className="w-[48%] gap-3">
            <MUITextField label="Total Payment Due" value={data.Tax} />
          </div>
        </div>
      </div>
    </FormCard>
  );
}
