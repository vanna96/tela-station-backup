import React, { useCallback } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import MaterialReactTable from "material-react-table";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import ShippingType from "@/components/selectbox/ShippingType";
import { currencyFormat } from "@/utilies";
import ItemModal from "@/components/modal/ItemModal";
import FormCard from "@/components/card/FormCard";
import Formular from "@/utilies/formular";
import MUISelect from "@/components/selectbox/MUISelect";
import { ContactEmployee } from "@/models/BusinessParter";
import TextField from "@mui/material/TextField";
import MUITextField from "@/components/input/MUITextField";
import Checkbox from "@mui/material/Checkbox";
import Owner from "@/components/selectbox/Owner";
import AccountTextField from "@/components/input/AccountTextField";
import MUIDatePicker from "@/components/input/MUIDatePicker";
import SalePerson from "@/components/selectbox/SalePerson";
import VatGroup from "@/components/selectbox/VatGroup";
import BuyerSelect from "@/components/selectbox/buyer";
import Item from "./../../../../models/Item";
import { documentStatusList } from "@/constants";
import WarehouseSelect from "@/components/selectbox/Warehouse";
import UnitOfMeasurementRepository from "@/services/actions/unitOfMeasurementRepository";
import UOMSelect from "@/components/selectbox/UnitofMeasurment";
import DistributionRule from "@/models/DistributionRule";
import DistributionRuleModal from "@/components/modal/DistributionRuleModal";
import DistributionRuleSelect from "@/components/selectbox/DistributionRule";

interface ContentFormProps {
  handlerAddItem: () => void;
  handlerChangeItem: (record: any) => void;
  handlerRemoveItem: (record: string) => void;
  handlerChange: (key: string, value: any) => void;
  data: any;
  edit?: boolean;
}

export default function ContentForm({
  edit,
  data,
  handlerChangeItem,
  handlerChange,
  handlerAddItem,
  handlerRemoveItem,
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
        accessorKey: "itemCode",
        header: "Item No", //uses the default width from defaultColumn prop
        Cell: ({ cell }: any) => {
          return (
            <MUITextField
              value={cell.getValue()}
              name="ItemCode"
              error={(cell.getValue() as number) <= 0}
              onChange={(event) =>
                handlerChangeInput(event, cell?.row?.original, "itemCode")
              }
            />
          );
        },
      },

      {
        accessorKey: "itemDescription",
        header: "Description",
        Cell: ({ cell }: any) => {
          return (
            <MUITextField
              value={cell.getValue()}
              name="ItemDescription"
              onChange={(event) =>
                handlerChangeInput(
                  event,
                  cell?.row?.original,
                  "itemDescription"
                )
              }
            />
          );
        },
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        Cell: ({ cell }: any) => {
          return (
            <MUITextField
              value={cell.getValue()}
              type="number"
              name="Quantity"
              error={(cell.getValue() as number) <= 0}
              onChange={(event) =>
                handlerChangeInput(event, cell?.row?.original, "quantity")
              }
            />
          );
        },
      },

      // {
      //   accessorKey: "unitPrice",
      //   header: "Item Cost",
      //   Cell: ({ cell }: any) => {
      //     return <MUITextField
      //       startAdornment={'USD'}
      //       type="number"
      //       disabled
      //       name="UnitPrice"
      //       error={(cell.getValue() as number) <= 0}
      //       value={cell.getValue()}
      //       onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'unitPrice')}
      //     />;
      //   },
      // },
      {
        accessorKey: "uomEntry",
        header: "UoM Code",
        Cell: ({ cell }: any) => (
          <UOMSelect
            value={cell.getValue()}
            name="uomEntry"
            onChange={(event) =>
              handlerChangeInput(
                event,
                cell?.row?.original,
                "uomEntry"
              )
            }
          />
        ),
      },

      // {
      //   accessorKey: "uomCode",
      //   header: "UoM Name",
      //   Cell: ({ cell }: any) => (
      //     <MUITextField
      //       disabled
      //       value={
      //         new UnitOfMeasurementRepository().find(cell.getValue())?.Name
      //       }
      //     />
      //   ),
      // },

      // {
      //   accessorKey: "fromWarehouseCode",
      //   header: "From Warehouse",
      //   Cell: ({ cell }: any) => {
      //     return (
      //       <WarehouseSelect
      //         value={cell.getValue()}
      //         name="fromWarehouseCode"
      //         onChange={(event) =>
      //           handlerChangeInput(
      //             event,
      //             cell?.row?.original,
      //             "fromWarehouseCode"
      //           )
      //         }
      //       />
      //     );
      //   },
      // },

      {
        accessorKey: "distributionRule",
        header: "Department",
        Cell: ({ cell }: any) => {
          return (
            <DistributionRuleSelect
              value={cell.getValue()}
              name="distributionRule"
              onChange={(event) =>
                handlerChangeInput(event, cell?.row?.original, "distributionRule")
              } />
          )
        }
      },

      {
        accessorKey: "distributionRule2",
        header: "Line of Business",
        Cell: ({ cell }: any) => {
          return (
            <DistributionRuleSelect
              value={cell.getValue()}
              name="distributionRule2"
              onChange={(event) =>
                handlerChangeInput(event, cell?.row?.original, "distributionRule2")
              } />
          )
        }
      },
      // {
      //   accessorKey: "department",
      //   header: "Department",
      // },
      // {
      //   accessorKey: "branch",
      //   header: "Branch",
      // },
      // {
      //   accessorKey: "productline",
      //   header: "Product Line",
      // },

    ],
    []
  );

  const [colVisibility, setColVisibility] = React.useState<
    Record<string, boolean>
  >({ Total: false, ItemsGroupName: false, UoMGroupName: false });

  return (
    <FormCard title="Content">
      <div className="col-span-2 data-table gap-3">
        <MaterialReactTable
          key={tableKey}
          
          // columns={itemColumns}
          columns={itemColumns}
          data={data?.items ?? []}
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
          <div className="w-full gap-3">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Sales Employee
            </label>
            <BuyerSelect
              
              onChange={(e) => handlerChange("salePersonCode", e.target.value)}
              // value={data?.salePersonCode}
              value={edit ? data?.salesPersonCode : data?.salePersonCode}

              name="SalesPersonCode"
            />
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="Code" className="text-gray-500 text-[14px]">
                Journal Remark
              </label>
              <div className="">
                <TextField
                  size="small"
                  multiline
                  rows={2}
                  fullWidth
                  name="journalMemo"
                  className="w-full "
                  // value={data?.journalMemo}
                  value={"Inventory Transfer Request - " + data?.cardCode ?? ""}
                  onChange={(e) => handlerChange("cardCode", e.target.value)}
                />
              </div>
          </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="w-full gap-3">
            <label htmlFor="Code" className="text-gray-500 text-[14px]">

              Remarks
            </label>
            <TextField
              size="small"
              fullWidth
              multiline
              rows={4}
              name="Comments"
              className="w-full "
              value={data?.comments}
              onChange={(e: any) => handlerChange("comments", e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormCard>
  );
}
