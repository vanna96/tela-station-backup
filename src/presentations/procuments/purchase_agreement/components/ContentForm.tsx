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
import ItemGroupRepository from '../../../../services/actions/itemGroupRepository';
import UnitOfMeasurementRepository from '../../../../services/actions/unitOfMeasurementRepository';


interface ContentFormProps {
    handlerAddItem: () => void,
    handlerChangeItem: (record: any) => void,
    handlerRemoveItem: (record: string) => void,
    data: any,
}


export default function ContentForm({ data, handlerChangeItem, handlerAddItem, handlerRemoveItem }: ContentFormProps) {
    const [tableKey, setTableKey] = React.useState(Date.now())

    const handlerChangeInput = (event: any, row: any, field: any) => {
        if (data?.isApproved) return;

        let value = event.target.value;
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
                        disabled={data?.isApproved}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'ItemCode')}
                        onClick={() => { }}
                    />;
                },
            },

            {
                accessorKey: "itemName",
                header: "Description",
                Cell: ({ cell }: any) => <MUITextField disabled={data?.isApproved} value={cell.getValue()} />
            },
            {
                accessorKey: "uomEntry",
                header: "UoM Group",
                Cell: ({ cell }: any) => <MUITextField disabled={data?.isApproved} value={new UnitOfMeasurementRepository().find(cell.getValue())?.name} />
            },
            {
                accessorKey: "itemGroup",
                header: "Item Group",
                Cell: ({ cell }: any) => <MUITextField disabled={data?.isApproved} value={new ItemGroupRepository().find(cell.getValue())?.name} />
            },
            {
                accessorKey: "quantity",
                header: "Quantity",
                Cell: ({ cell }: any) => {

                    return <MUITextField
                        value={cell.getValue()}
                        type="number"
                        error={(cell.getValue() as number) <= 0}
                        disabled={data?.isApproved}
                        onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'quantity')}
                    />;
                },
            },
            {
                accessorKey: "unitPrice",
                header: "Unit Price",
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        startAdornment={'USD'}
                        type="number"
                        disabled={data?.isApproved}
                        error={(cell.getValue() as number) <= 0}
                        value={cell.getValue()}
                        onChange={(event) => handlerChangeInput(event, cell?.row?.original, 'unitPrice')}
                    />;
                },
            },
            {
                accessorKey: "total",
                header: "Total",
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        startAdornment={'%'}
                        disabled={data?.isApproved}
                        value={Formular.findToTal(cell.row.original.quantity, cell.row.original.unitPrice)}
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
                        disabled={data?.isApproved}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'PlannedAmount')}
                    />;
                },
            },
            {
                accessorKey: "lineDiscount",
                header: "Line Discount", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    return <MUITextField
                        defaultValue={cell.getValue()}
                        disabled={data?.isApproved}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'lineDiscount')}
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
                        disabled={data?.isApproved}
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
                            {!data?.isApproved ?
                                <>
                                    <Button variant="outlined" size="small"
                                        onClick={handlerAddItem}
                                    ><span className="text-xs  capitalize font-normal">+ Add New</span></Button>
                                </>
                                : null}

                        </div>
                    }}
                />
            </div>
        </FormCard>
    );
}
