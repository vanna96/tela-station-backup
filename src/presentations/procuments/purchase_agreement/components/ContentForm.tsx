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


export default function ContentForm({ formData, setFormData, setItems, items }: any) {
    const [collapse, setCollapse] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);

    const [tableKey, setTableKey] = React.useState(Date.now())

    const handlerChangeInput = (event: any, row: any, field: any) => {
        const newArr = [...items];
        const index = newArr.indexOf(row);
        newArr[index][field] = event.target.value;
        setTableKey(Date.now())
    }

    const handlerRemoveRow = (row: any) => {
        const temps = [...items];
        const newArr = temps.filter((e) => e.key != row.key);
        setItems([...newArr]);
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
                accessorKey: "ItemGroupName",
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
                        startAdornment={'USD'}
                        defaultValue={parseFloat(cell.row.original.UnitPrice ?? 0) * parseFloat(cell.row.original.Quantity ?? 0)}
                    />;
                },
            },
        ],
        [items]
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
                    return <Button size="small" color="error" onClick={() => handlerRemoveRow(cell.row.original)}><AiOutlineDelete /></Button>;
                },
            },
            {
                accessorKey: "PlannedAmount",
                header: "Planned Amount (LC)", //uses the default width from defaultColumn prop
                Cell: ({ cell }: any) => {
                    // return ;
                    return <MUITextField
                        defaultValue={currencyFormat(cell.getValue())}
                        startAdornment={'USD'}
                        type="number"
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'PlannedAmount')}
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
                    return <MUITextField
                        defaultValue={cell.getValue()}
                        onClick={() => { }}
                    />;
                },
            },
        ],
        [items]
    );

    const [colVisibility, setColVisibility] = React.useState({ Total: false, ItemGroupName: false })

    const handlerClose = () => setShowModal(false);
    const handlerSelectItem = (records: any) => {
        let temps = [...items];
        records.forEach((e: any) => {
            let row = items.find((old: any) => old?.ItemCode === e?.ItemCode);

            if (!row) {
                let item = e;
                item['key'] = Date.now().toString();
                temps.push(e);
            }
        });

        setItems(temps)
    }
    const handlerAddItem = () => setShowModal(true);


    return (
        <div className="flex flex-col gap-4 bg-white rounded-lg p-4 pb-8 shadow">
            <div
                role="button"
                className="font-bold text-xl flex justify-between items-center p-2 px-4 rounded hover:bg-gray-100"
                onClick={() => setCollapse(!collapse)}
            >
                <h2>Content</h2>
                <div
                    role="button"
                    className={`${collapse ? "rotate-90" : "rotate-0"
                        }  rounded-full  duration-150 `}
                >
                    <IoChevronForwardSharp />
                </div>
            </div>
            <hr />

            <ItemModal open={showModal} onClose={handlerClose} />

            <div
                className={`w-full rounded-lg px-4 ${collapse ? "" : "h-[0rem]"
                    } overflow-hidden transition-height duration-300 data-table p-0 flex flex-col gap-3`}
            >
                <div className="grid grid-cols-2">
                    <div className="w-full flex items-center gap-3">
                    </div>
                    <div className="flex justify-end">
                    </div>
                </div>

                <MaterialReactTable
                    key={tableKey}
                    columns={formData?.AgreementMethod === 'M' ? serviceColumns : itemColumns}
                    data={items}
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
                    // onColumnVisibilityChange={setColVisibility}
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
                            {/* <Button variant="outlined" size="small"
                        onClick={handlerAddItem}
                        color="error"
                    ><span className="text-xs">Remove All</span></Button> */}
                        </div>
                    }}
                />
            </div>
        </div>
    );
}
