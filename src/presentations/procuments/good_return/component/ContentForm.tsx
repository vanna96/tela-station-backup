import React from "react";
import MaterialReactTable from "material-react-table";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import ShippingType from "@/components/selectbox/ShippingType";
import { currencyFormat } from "@/utilies";
import FormCard from "@/components/card/FormCard";
import Formular from "@/utilies/formular";
import MUISelect from "@/components/selectbox/MUISelect";
import TextField from "@mui/material/TextField";
import MUITextField from "@/components/input/MUITextField";
import Owner from "@/components/selectbox/Owner";
import AccountTextField from "@/components/input/AccountTextField";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import { documentStatusList, documentType, isItemType } from "@/constants";
import ItemGroupRepository from "@/services/actions/itemGroupRepository";
import UnitOfMeasurementGroupRepository from "@/services/actions/unitOfMeasurementGroupRepository";
import { getUOMGroupByCode } from "@/helpers";
import UOMTextField from "@/components/input/UOMTextField";
import BuyerSelect from "@/components/selectbox/Buyer";
import VatGroupTextField from "@/components/input/VatGroupTextField";


interface ContentFormProps {
  handlerChange: (key: string, value: any) => void;
  handlerAddItem: () => void,
  handlerChangeItem: (record: any) => void,
  handlerRemoveItem: (record: string) => void,
  data: any,
  edit?: boolean
}


export default function ContentForm({ data, handlerChangeItem, handlerChange, edit, handlerAddItem, handlerRemoveItem }: ContentFormProps) {
  const [tableKey, setTableKey] = React.useState(Date.now())

  const itemGroupRepo = new ItemGroupRepository();
  const uomGroupRepo = new UnitOfMeasurementGroupRepository();

  // const handlerChangeInput = (event: any, row: any, field: any) => {
  //   // if (data?.isApproved) return;

  //   let value = event.target.value;
  //   handlerChangeItem({ value: value, record: row, field })
  // }

  const handlerChangeInput = (event: any, row: any, field: any) => {
    handlerChangeItem({ value: event.target.value, record: row, field });
  };

  const handlerRemoveRow = (row: any) => {
    if (data?.isApproved) return;

    handlerRemoveItem(row.ItemCode);
  }

  const itemColumns = React.useMemo(
    () => [
      {
        accessorKey: "Action",
        header: "",
        size: 40,
        pin: true,
        enableResizing: false,
        Cell: ({ cell }: any) => {
          return (
            <div role="button" className="flex justify-center items-center">
              <button
                type="button"
                className="border border-gray-200 p-1 rounded-sm"
                onClick={() => handlerRemoveRow(cell.row.original)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: "ItemCode",
        header: "Item No", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          // return ;
          return <MUITextField
            value={cell.getValue()}
            onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'ItemCode')}
            endAdornment
            onClick={handlerAddItem}
          />;
        },
      },

      {
        accessorKey: "ItemName",
        header: "Description",
        Cell: ({ cell }: any) => <MUITextField value={cell.getValue()} />
      },

      {
        accessorKey: "ItemGroup",
        header: "Item Group",
        Cell: ({ cell }: any) => <MUITextField value={itemGroupRepo.find(cell.getValue())?.GroupName} />
      },

      {
        accessorKey: "Quantity",
        header: "Quantity",
        Cell: ({ cell }: any) => {
          return <MUITextField
            type="number"
            name="Quantity"
            error={(cell.getValue() as number) <= 0}
            defaultValue={cell.getValue()}
            onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'Quantity')}
          />;
        },
      },
      {
        accessorKey: "Price",
        header: "Unit Price",
        Cell: ({ cell }: any) => {
          return <MUITextField
            startAdornment={'USD'}
            type="number"
            name="Price"
            error={(cell.getValue() as number) <= 0}
            defaultValue={cell.getValue()}
            onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'Price')}
          />;
        },
      },
      {
        accessorKey: "DiscountPercent",
        header: "Discount %",
        Cell: ({ cell }: any) => {
          return <MUITextField
            startAdornment={'%'}
            type="number"
            name="DiscountPercent"
            defaultValue={cell.getValue()}
            onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'DiscountPercent')}
          />;
        },
      },
      {
        accessorKey: "LineTotal",
        header: "Total",
        Cell: ({ cell }: any) => {
          return <MUITextField
            startAdornment={'USD'}
            value={Formular.findLineTotal(cell.row.original.Quantity, cell.row.original.Price, cell.row.original.DiscountPercent)}
          />;
        },
      },
      {
        accessorKey: "UomGroupCode",
        header: "UoM Group",
        Cell: ({ cell }: any) => <MUITextField value={getUOMGroupByCode(cell.row.original.ItemCode)?.Code} />
      },
      {
        accessorKey: "UomCode",
        header: "UoM Code",
        Cell: ({ cell }: any) => (
          <UOMTextField
            key={cell.getValue()}
            value={cell.getValue()}
            onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'UomCode')}
            data={getUOMGroupByCode(cell.row.original.ItemCode)?.Code} />
        ),
      },
      {
        accessorKey: "UnitsOfMeasurement",
        header: "Item Per Units",
        Cell: ({ cell }: any) => (
          <MUITextField
            type="number"
            value={cell.getValue()}
          />
        ),
      },
    ],
    []
  );



  const serviceColumns = React.useMemo(
    () => [
      {
        accessorKey: "Action",
        header: "",
        size: 40,
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
        accessorKey: "ItemName",
        header: "Descriptions", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          // return ;
          return (
            <MUITextField
              value={cell.getValue()}
              name="ItemName"
              onChange={(event) =>
                handlerChangeInput(
                  event,
                  cell?.row?.original,
                  "ItemName"
                )
              }
            />
          );
        },
      },
      {
        accessorKey: "RequiredDate",
        header: "Required Date",
        Cell: ({ cell }: any) => {
          return (
            <MUIDatePicker
              value={cell.getValue() ?? null}
              name="RequiredDate"
              onChange={(event) =>
                handlerChangeInput(
                  { target: { value: event } },
                  cell?.row?.original,
                  "RequiredDate"
                )
              }
            />
          );
        },
      },
      {
        accessorKey: "ShipDate",
        header: "Quoted Date", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          return (
            <MUIDatePicker
              // disabled={true}
              value={cell.getValue() ?? null}
              onChange={(event) =>
                handlerChangeInput(
                  { target: { value: event } },
                  cell?.row?.original,
                  "ShipDate"
                )
              }
            />
          );
        },
      },
      {
        accessorKey: "AccountCode",
        header: "G/L Account", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          console.log(cell.getValue());
          return (
            <AccountTextField
              value={cell.getValue()}
              name="AccountNo"
              onChange={(event) =>
                handlerChangeInput(event, cell?.row?.original, "AccountCode")
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
        accessorKey: "VatGroup",
        header: "Tax Code",
        Cell: ({ cell }: any) => {
          return (
            <VatGroupTextField
              value={cell.getValue()}
              onChange={(event) =>
                handlerChangeInput(
                  event,
                  cell?.row?.original,
                  "VatGroup"
                )
              }
              type="InputTax"
            />
          );
        },
      },
      {
        accessorKey: "LineTotal",
        header: "Total LC", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          return (
            <MUITextField
              value={cell.getValue()}
              onChange={(event: any) =>
                handlerChangeInput(event, cell?.row?.original, "LineTotal")
              }
            />
          );
        },
      },
      {
        accessorKey: "BlanketAgreementNumber",
        header: "BlanketAgreementNumber", //uses the default width from defaultColumn prop
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

  const [colVisibility, setColVisibility] = React.useState<Record<string, boolean>>({ Total: false, ItemsGroupName: false, UoMGroupName: false, });

  const blankItem = {
    ItemCode: ''
  };
  return (
    <FormCard title="Content" >
      <div className="col-span-2 data-table">
        <div className="flex flex-col my-5">
          <div className="grid grid-cols-4">
            <div>
              <label
                htmlFor=" Item/ServiceType"
                className="text-gray-500 text-[14px]"
              >
                Item/Service Type
              </label>
              <div className="">
                <MUISelect
                  items={documentType}
                  aliaslabel="label"
                  aliasvalue="value"
                  name="DocType"
                  disabled={edit}
                  value={data.DocType}
                  onChange={(e) => handlerChange("DocType", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <MaterialReactTable
          key={tableKey}
          // columns={itemColumns}
          columns={!isItemType(data?.DocType) ? serviceColumns : itemColumns}
          data={[...data?.Items, blankItem] ?? []}
          enableStickyHeader={true}
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={false}
          enableSorting={false}
          enableTopToolbar={false}
          enableColumnResizing={true}
          enableColumnFilterModes={false}
          enableDensityToggle={false}
          enableFilters={false}
          enableFullScreenToggle={false}
          enableGlobalFilter={false}
          enableHiding={true}
          onColumnVisibilityChange={setColVisibility}
          enableStickyFooter
          initialState={{
            density: "compact",
            columnVisibility: colVisibility,
          }}
          state={{
            columnVisibility: colVisibility
          }}
          icons={{
            ViewColumnIcon: (props: any) => <AiOutlineSetting {...props} />
          }}

        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="w-[48%] gap-3">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Buyer
            </label>
            <BuyerSelect
              onChange={(e) => handlerChange("SalesPersonCode", e.target.value)}
              value={data?.SalesPersonCode}
              name="SalesPersonCode"
            />
          </div>
          <div className="w-[48%]">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Owner
            </label>
            <Owner
              onChange={(e) => handlerChange("DocumentsOwner", e.target.value)}
              value={data?.DocumentsOwner}
              name="DocumentsOwner"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Remarks
          </label>
          <div className="">
            {data.documentStatus === "bost_Open" ? (
              <TextField
                size="small"
                multiline
                rows={2}
                fullWidth
                name="Comments"
                className="w-full "
                value={data?.Comments}
                onChange={(e) => handlerChange("Comments", e.target.value)}
              />
            ) : (
              <TextField
                size="small"
                multiline
                rows={2}
                disabled={edit}
                fullWidth
                name="Comments"
                className="w-full "
                value={data?.Comments}
                onChange={(e) => handlerChange("Comments", e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
      {data?.documentStatus === "bost_Open" ? (
        <div className="flex flex-col gap-3">
          <div className="w-[100%] gap-3">
            <MUITextField
              label="Total Before Discount:"
              value={currencyFormat(data?.DocTotalBeforeDiscount)}
            />
          </div>
          <div className="flex justify-between gap-5">
            <div className="w-[48%] gap-3">
              <MUITextField
                label="Discount:"
                startAdornment={"%"}
                value={data?.DocDiscountPercent}
                onChange={(e) =>
                  handlerChange("DocDiscountPercent", e.target.value)
                }
              />
            </div>
            <div className="w-[48%] gap-3 mt-5">
              <MUITextField
                label=""
                startAdornment={data?.Currency ?? "AUD"}
                value={data?.DocDiscountPrice}
                onChange={(e) =>
                  handlerChange("DocDiscountPrice", e.target.value)
                }
              />
            </div>
            <div className="flex justify-between">
              <div className="w-[100%] gap-3">
                <MUITextField label="Fright:" value={""} />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[48%] gap-3">
              <MUITextField
                label="Tax:"
                value={currencyFormat(data?.DocTaxTotal)}
              />
            </div>

            <div className="w-[48%] gap-3">
              <MUITextField
                label="Total Payment Due::"
                value={currencyFormat(data?.DocTotal)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="w-[100%] gap-3">
            <MUITextField
              label="Total Before Discount:"
              value={currencyFormat(data?.DocTotalBeforeDiscount)}
            />
          </div>
          <div className="flex justify-between gap-5">
            <div className="w-[48%] gap-3">
              <MUITextField
                label="Discount:"
                disabled={edit}
                startAdornment={"%"}
                value={data?.DocDiscountPercent}
                onChange={(e) =>
                  handlerChange("DocDiscountPercent", e.target.value)
                }
              />
            </div>
            <div className="w-[48%] gap-3 mt-5">
              <MUITextField
                label=""
                disabled={edit}
                startAdornment={data?.currency ?? "AUD"}
                value={data?.DocDiscountPrice}
                onChange={(e) =>
                  handlerChange("DocDiscountPrice", e.target.value)
                }
              />
            </div>
            <div className="flex justify-between">
              <div className="w-[100%] gap-3">
                <MUITextField disabled={edit} label="Fright:" value={""} />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[48%] gap-3">
              <MUITextField
                disabled={edit}
                label="Tax:"
                value={currencyFormat(data?.DocTaxTotal)}
              />
            </div>
            <div className="w-[48%] gap-3">
              <MUITextField
                disabled={edit}
                label="Total Payment Due::"
                value={currencyFormat(data?.DocTotal)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[48%] gap-3">
              <MUITextField
                disabled={edit}
                label="Applied Amount:"
                value={currencyFormat(data?.DocTaxTotalL)}
              />
            </div>
            <div className="w-[48%] gap-3">
              <MUITextField
                disabled={edit}
                label="Balance Due:"
                value={currencyFormat(data?.DocTotal)}
              />
            </div>
          </div>
        </div>
      )}
    </FormCard>
  );
}
