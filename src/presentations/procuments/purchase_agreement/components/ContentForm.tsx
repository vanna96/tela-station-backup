import React, { useCallback } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import MaterialReactTable from "material-react-table";
import { Button, TextField } from "@mui/material";
import MUITextField from '../../../../components/input/MUITextField'
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import ShippingType from "@/components/selectbox/ShippingType";
import { currencyFormat } from "@/utilies";
import ItemModal from "@/components/modal/ItemModal";
import FormCard from "@/components/card/FormCard";
import Formular from "@/utilies/formular";
import AccountTextField from '../../../../components/input/AccountTextField';
import ProjectionTextField from "@/components/input/ProjectionTextField";
import ItemGroupRepository from '../../../../services/actions/itemGroupRepository';
import UnitOfMeasurementRepository from '../../../../services/actions/unitOfMeasurementRepository';
import UOMTextField from "@/components/input/UOMTextField";
import UnitOfMeasurementGroupRepository from "@/services/actions/unitOfMeasurementGroupRepository";
import { getUOMGroupByCode } from "@/helpers";
import MUIDatePicker from "@/components/input/MUIDatePicker";


interface ContentFormProps {
    handlerAddItem: () => void,
    handlerChangeItem: (record: any) => void,
    handlerRemoveItem: (record: string) => void,
    data: any,
}


export default function ContentForm({ data, handlerChangeItem, handlerAddItem, handlerRemoveItem }: ContentFormProps) {
    const [tableKey, setTableKey] = React.useState(Date.now())

    const itemGroupRepo = new ItemGroupRepository();
    const uomGroupRepo = new UnitOfMeasurementGroupRepository();

    const handlerChangeInput = (event: any, row: any, field: any) => {
        if (data?.isApproved) return;

        let value = event?.target?.value ?? event;
        handlerChangeItem({ value: value, record: row, field })
    }

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
                        disabled={data?.isApproved}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'ItemCode')}
                        endAdornment
                        onClick={handlerAddItem}
                    />;
                },
            },

            {
                accessorKey: "ItemName",
                header: "Description",
                Cell: ({ cell }: any) => <MUITextField disabled={data?.isApproved} value={cell.getValue()} />
            },

            {
                accessorKey: "ItemGroup",
                header: "Item Group",
                Cell: ({ cell }: any) => <MUITextField disabled={data?.isApproved} value={itemGroupRepo.find(cell.getValue())?.GroupName} />
            },
            {
                accessorKey: "Quantity",
                header: "Quantity",
                Cell: ({ cell }: any) => {

                    return <MUITextField
                        defaultValue={cell.getValue()}
                        type="number"
                        name="Quantity"
                        error={(cell.getValue() as number) <= 0}
                        disabled={data?.isApproved}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'Quantity')}
                    />;
                },
            },
            {
                accessorKey: "UnitPrice",
                header: "Unit Price",
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        startAdornment={'USD'}
                        type="number"
                        name="UnitPrice"
                        disabled={data?.isApproved}
                        error={(cell.getValue() as number) <= 0}
                        defaultValue={cell.getValue()}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'UnitPrice')}
                    />;
                },
            },
            {
                accessorKey: "Total",
                header: "Total",
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        startAdornment={'%'}
                        disabled={data?.isApproved}
                        value={Formular.findToTal(cell.row.original.Quantity, cell.row.original.UnitPrice)}
                    />;
                },
            },
            {
                accessorKey: "UomGroupCode",
                header: "UoM Group",
                Cell: ({ cell }: any) => <MUITextField disabled={data?.isApproved} value={getUOMGroupByCode(cell.row.original.ItemCode)?.Code} />
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
                accessorKey: "PlannedAmountLC",
                header: "Planned Amount (LC)", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        defaultValue={cell.getValue() ? currencyFormat(cell.getValue()) : null}
                        startAdornment={'USD'}
                        type="number"
                        disabled={data?.isApproved}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'PlannedAmountLC')}
                    />;
                },
            },
            {
                accessorKey: "LineDiscount",
                header: "Line Discount", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        defaultValue={cell.getValue()}
                        disabled={data?.isApproved}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'LineDiscount')}
                    />;
                },
            },
            {
                accessorKey: "OpenAmount",
                header: "Open Amount (LC)", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        startAdornment={'USD'}
                        value={cell.row?.original?.UnitPrice}
                        disabled={true}
                    />;
                },
            },
            {
                accessorKey: "FreeText",
                header: "Free Text", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        value={cell.getValue()}
                        disabled={data?.isApproved}
                        onChange={(event: any) => handlerChangeInput(event, cell?.row?.original, 'ShppingType')}
                    />;
                },
            },
            {
                accessorKey: "PortionOfReturns",
                header: "Portion Of Returns %", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUITextField type="number" value={cell.getValue()} onChange={(value) => handlerChangeInput(value, cell?.row?.original, 'PortionOfReturns')} />;
                },
            },
            {
                accessorKey: "EndOfWarranty",
                header: "End Of Warranty", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUIDatePicker value={cell.getValue() ?? null} onChange={(value) => handlerChangeInput(value, cell?.row?.original, 'EndOfWarranty')} />;
                },
            },
        ],
        []
    );

    const [colVisibility, setColVisibility] = React.useState<Record<string, boolean>>({ Total: false, ItemsGroupName: false, UoMGroupName: false, });

    const blankItem = { ItemCode: '' };

    return (
        <FormCard title="Content" >
            <div className="col-span-2 data-table">
                <MaterialReactTable
                    key={tableKey}
                    // columns={itemColumns}
                    columns={data?.AgreementMethod === 'M' ? serviceColumns : itemColumns}
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
                        // columnPinning: { left: ['Action', 'ItemCode'] }
                    }}
                    state={{
                        columnVisibility: colVisibility
                    }}
                    icons={{
                        ViewColumnIcon: (props: any) => <AiOutlineSetting {...props} />
                    }}
                // renderTopToolbarCustomActions={({ table }) => {
                //     return <div className="flex gap-2 mb-6 pt-2 justify-center items-center">
                //         {!data?.isApproved ?
                //             <>
                //                 <Button variant="outlined" size="small"
                //                     onClick={handlerAddItem}
                //                 ><span className="text-xs  capitalize font-normal">+ Add New</span></Button>
                //             </>
                //             : null}

                //     </div>
                // }}
                />
            </div>
        </FormCard>
    );
}
