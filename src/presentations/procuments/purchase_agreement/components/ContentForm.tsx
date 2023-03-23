import React, { useCallback } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import MaterialReactTable from "material-react-table";
import { Button } from "@mui/material";
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


interface ContentFormProps {
    handlerAddItem: () => void,
    handlerChangeItem: (record: any) => void,
    handlerRemoveItem: (record: string) => void,
    data: any,
}


export default function ContentForm({ data, handlerChangeItem, handlerAddItem, handlerRemoveItem }: ContentFormProps) {
    const [tableKey, setTableKey] = React.useState(Date.now())

    const handlerChangeInput = (event: any, row: any, field: any) => {
        let value = event.target.value;
        handlerChangeItem({ value: value, record: row, field })
    }

    const handlerRemoveRow = (row: any) => {
        handlerRemoveItem(row.ItemCode);
    }

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
                accessorKey: "ItemCode",
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
                accessorKey: "ItemName",
                header: "Description",
                Cell: ({ cell }: any) => <MUITextField value={cell.getValue()} />
            },
            {
                accessorKey: "UoMGroupName",
                header: "UoM Group",
                Cell: ({ cell }: any) => <MUITextField defaultValue={cell.getValue()} />
            },
            {
                accessorKey: "ItemsGroupName",
                header: "Item Group",
                Cell: ({ cell }: any) => <MUITextField defaultValue={cell.getValue()} />
            },
            {
                accessorKey: "Quantity",
                header: "Quanitity",
                Cell: ({ cell }: any) => {

                    return <MUITextField
                        defaultValue={cell.getValue()}
                        type="number"
                        error={(cell.getValue() as number) <= 0}
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
                        value={Formular.findToTal(cell.row.original.Quantity, cell.row.original.UnitPrice)}
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
                    return <Button size="small" color="error" onClick={() => handlerRemoveRow(cell.row.original)}><AiOutlineDelete /></Button>;
                },
            },
            {
                accessorKey: "PlannedAmount",
                header: "Planned Amount (LC)", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        defaultValue={currencyFormat(cell.getValue())}
                        startAdornment={'USD'}
                        type="number"
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'PlannedAmount')}
                    />;
                },
            },
            {
                accessorKey: "AccountNo",
                header: "Account NO)", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <AccountTextField
                        value={cell.getValue()}
                        onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'AccountNo')}
                    />;
                },
            },
            {
                accessorKey: "AccountName",
                header: "Account Name)", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        value={cell.getValue()}
                    />;
                },
            },
            {
                accessorKey: "LineDiscount",
                header: "Line Discount", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        defaultValue={cell.getValue()}
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
                        value={cell.row?.original?.PlannedAmount}
                        disabled={true}
                    />;
                },
            },
            {
                accessorKey: "ShppingType",
                header: "Shipping Type", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <ShippingType
                        value={cell.getValue()}
                        onChange={(event: any) => handlerChangeInput(event, cell?.row?.original, 'ShppingType')}
                    />;
                },
            },
            {
                accessorKey: "Project",
                header: "Project", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <ProjectionTextField value={cell.getValue()} onChange={(project) => handlerChangeInput(project, cell?.row?.original, 'Project')} />;
                },
            },
        ],
        []
    );

    const [colVisibility, setColVisibility] = React.useState<Record<string, boolean>>({ Total: false, ItemsGroupName: false, UoMGroupName: false, })

    return (
        <FormCard title="Content" >
            <div className="col-span-2 data-table">
                <MaterialReactTable
                    key={tableKey}
                    // columns={itemColumns}
                    columns={data?.agreementMethod === 'M' ? serviceColumns : itemColumns}
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
                        columnVisibility: colVisibility
                    }}
                    state={{
                        columnVisibility: colVisibility
                    }}
                    icons={{
                        ViewColumnIcon: (props: any) => <AiOutlineSetting {...props} />
                    }}
                    renderTopToolbarCustomActions={({ table }) => {
                        return <div className="flex gap-2 mb-6 pt-2 justify-center items-center">
                            <Button variant="outlined" size="small"
                                onClick={handlerAddItem}
                            ><span className="text-xs  capitalize font-normal">+ Add New</span></Button>
                        </div>
                    }}
                />
            </div>
        </FormCard>
    );
}
