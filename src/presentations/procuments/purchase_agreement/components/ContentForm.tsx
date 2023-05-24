import React, { useCallback } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import MaterialReactTable from "material-react-table";
import { Button, Checkbox, IconButton, TextField } from "@mui/material";
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
import { TbColumns, TbCopy, TbEdit, TbSettings } from "react-icons/tb";
import { ThemeContext } from "@/contexts";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "@/components/modal/Modal";
import MUISelect from "@/components/selectbox/MUISelect";
import { useDocumentTotalHook } from "@/hook";
import shortid from "shortid";
import { BiSearch } from "react-icons/bi";
import ContentComponent from "@/components/core/ContentComponent";

interface ContentFormProps {
    handlerAddItem: () => void,
    handlerChangeItem: (record: any) => void,
    handlerRemoveItem: (record: string) => void,
    data: any,
    onChange: (record: any) => void
}


export default function ContentForm({ data, handlerChangeItem, handlerAddItem, handlerRemoveItem, onChange }: ContentFormProps) {
    const [tableKey, setTableKey] = React.useState(Date.now())
    const { theme } = React.useContext(ThemeContext);

    const updateRef = React.createRef<ContentTableColumn>();
    const columnRef = React.createRef<ContentTableSelectColumn>();

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
                accessorKey: "ItemCode",
                header: "Item No", //uses the default width from defaultColumn prop
                visible: true,
                Cell: ({ cell }: any) => {

                    // if (Object.keys(cell.row.original).length === 1)
                    //     return <div className={`${theme === 'light' ? '' : 'bg-slate-500'} rounded`}>
                    //         <Button onClick={handlerAddItem} variant="text" className="w-full" size="small"><span className="capitalize">Add Row</span></Button>
                    //     </div>;

                    return <MUITextField
                        value={cell.getValue()}
                        disabled={data.disable['DocumentLine']}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'ItemCode')}
                        endAdornment={!data.disable['DocumentLine']}
                        onClick={() => {
                            if (cell.getValue() === '') {
                                handlerAddItem()
                            } else {
                                updateRef.current?.onOpen(cell.row.original)
                            }
                        }}
                        endIcon={cell.getValue() === '' ? null : <TbEdit className="text-lg" />}
                        readonly={true}
                    />;
                },
            },
            {
                accessorKey: "ItemName",
                header: "Description",
                visible: true,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;

                    return cell.getValue();
                    // return <MUITextField readonly={true} disabled={data.disable['DocumentLine']} value={cell.getValue()} />;
                }
            },
            {
                accessorKey: "ItemGroup",
                header: "Item Group",
                visible: false,
                Cell: ({ cell }: any) => <MUITextField readonly={true} disabled={data.disable['DocumentLine']} value={itemGroupRepo.find(cell.getValue())?.GroupName} />
            },
            {
                accessorKey: "Quantity",
                header: "Quantity",
                size: 80,
                visible: true,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return cell.getValue();
                    return <MUITextField
                        value={cell.getValue()}
                        type="number"
                        name="Quantity"
                        readonly={true}
                        error={(cell.getValue() as number) <= 0}
                        disabled={data.disable['DocumentLine']}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'Quantity')}
                    />;
                },
            },
            {
                accessorKey: "UnitPrice",
                header: "Unit Price",
                visible: true,
                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                    return <MUITextField
                        readonly={true}
                        startAdornment={'USD'}
                        type="number"
                        name="UnitPrice"
                        disabled={data.disable['DocumentLine']}
                        error={(cell.getValue() as number) <= 0}
                        value={cell.getValue()}
                        onBlur={(event) => handlerChangeInput(event, cell?.row?.original, 'UnitPrice')}
                    />;
                },
            },
            {
                accessorKey: "VatGroup",
                header: "Tax Code",
                visible: false,
                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return cell.getValue();
                },
            },
            {
                accessorKey: "GrossPrice",
                header: "Gross Price",
                visible: false,
                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;

                    const total = parseFloat(cell.row.original?.VatRate ?? '0');
                    return "AUD " + currencyFormat(cell.row.original?.UnitPrice + (total * cell.row.original?.UnitPrice / 100));
                },
            },
            {
                accessorKey: "LineTotal",
                header: "Total",
                visible: false,
                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                },
            },
            {
                accessorKey: "UomCode",
                header: "Uom Code",
                visible: false,
                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                },
            },
            {
                accessorKey: "UomGrop",
                header: "Uom Grop",
                visible: false,
                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                },
            },
            {
                accessorKey: "UnitOfMeasure",
                header: "Item Per Group",
                size: 80,
                visible: false,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                },
            },
            {
                accessorKey: "Dimesion1",
                header: "Dimesion 1",
                visible: false,
                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                },
            },
            {
                accessorKey: "Dimesion2",
                header: "Dimesion 2",
                size: 80,
                visible: false,

                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                },
            },
            {
                accessorKey: "Dimesion3",
                header: "Dimesion 3",
                visible: false,

                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                },
            },
            {
                accessorKey: "Dimesion4",
                header: "Dimesion 4",
                visible: false,
                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                },
            },
            {
                accessorKey: "Dimesion5",
                header: "Dimesion 5",
                visible: false,
                size: 80,
                Cell: ({ cell }: any) => {
                    if (Object.keys(cell.row.original).length === 1) return null;
                    return currencyFormat(cell.getValue());
                },
            }
        ],
        [updateRef]
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
                        disabled={data.disable['DocumentLine']}
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
                        disabled={data.disable['DocumentLine']}
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
                        disabled={data.disable['DocumentLine']}
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
    const [rowSelection, setRowSelection] = React.useState({});

    const handlerRemove = () => {
        let temps: any[] = [];
        Object.values(rowSelection).forEach((e: any, index: number) => {
            if (e) temps.push(data?.Items[index]);
        });
    }

    const [docTotal, docTaxTotal] = useDocumentTotalHook(data?.Items);

    return <ContentComponent columns={itemColumns} data={data} onChange={(value) => { }} />

    // return (
    //     <FormCard
    //         title="Content"
    //         action={<div className="flex ">
    //             <Button size="small"><span className="capitalize">Copy</span></Button>
    //             <Button size="small"><span className="capitalize">Paste</span></Button>
    //             <Button size="small"><span className="capitalize" onClick={handlerRemove}>Remove</span></Button>
    //             {/* <IconButton><TbCopy /></IconButton> */}
    //             {/* <IconButton><MdDeleteOutline /></IconButton> */}
    //             <IconButton onClick={() => columnRef.current?.onOpen()}><TbSettings /></IconButton>
    //         </div>}
    //     >
    //         <div className="col-span-2 grid grid-cols-3 md:grid-cols-1 gap-4 mt-4 ">
    //             <div className="flex gap-4 items-start">
    //                 <label htmlFor="currency" className="text-[13px] flex pt-1">Currency</label>
    //                 <MUISelect value="L" items={[{ value: 'L', name: 'Local Currency' }]} aliaslabel="name" aliasvalue="value" />
    //             </div>
    //             <div className="col-span-2 grid grid-cols-3 gap-3 text-[13px]">
    //                 <label htmlFor="currency" className="col-span-2 md:col-span-1 flex items-center justify-end md:justify-start">Item / Service Type :</label>
    //                 <div className="md:col-span-2">
    //                     <MUISelect value="I" items={[{ value: 'I', name: 'Items' }, { value: 'S', name: 'Services' }]} aliaslabel="name" aliasvalue="value" />
    //                 </div>
    //                 <label htmlFor="currency" className="col-span-2 md:col-span-1 flex items-center justify-end md:justify-start">Price Mode :</label>
    //                 <div className="md:col-span-2">
    //                     <MUISelect value="G" disabled items={[{ value: 'G', name: 'Gross Price' }, { value: 'N', name: 'Net Price' }]} aliaslabel="name" aliasvalue="value" />
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="col-span-2 data-table border-t">
    //             <MaterialReactTable
    //                 key={tableKey}
    //                 // columns={itemColumns}
    //                 columns={data?.AgreementMethod === 'M' ? serviceColumns : itemColumns}
    //                 data={[...data?.Items, blankItem] ?? []}
    //                 enableStickyHeader={true}
    //                 enableColumnActions={false}
    //                 enableColumnFilters={false}
    //                 enablePagination={false}
    //                 enableSorting={false}
    //                 enableTopToolbar={false}
    //                 enableColumnResizing={true}
    //                 enableColumnFilterModes={false}
    //                 enableDensityToggle={false}
    //                 enableFilters={false}
    //                 enableFullScreenToggle={false}
    //                 enableGlobalFilter={false}
    //                 enableHiding={true}
    //                 enablePinning={true}
    //                 onColumnVisibilityChange={setColVisibility}
    //                 enableStickyFooter={false}
    //                 enableRowSelection={true}
    //                 onRowSelectionChange={setRowSelection}
    //                 rowNumberMode="original" //default
    //                 enableSelectAll={true}
    //                 enableRowNumbers={true}
    //                 enableMultiRowSelection={true}
    //                 initialState={{
    //                     density: "compact",
    //                     columnVisibility: colVisibility,
    //                     rowSelection,
    //                     // columnPinning: { left: ['Action', 'ItemCode'] }
    //                 }}
    //                 state={{
    //                     columnVisibility: colVisibility,
    //                     rowSelection,
    //                 }}
    //                 muiTableBodyRowProps={({ row }) => ({
    //                     sx: { cursor: 'pointer' },
    //                 })}
    //                 icons={{
    //                     ViewColumnIcon: (props: any) => <AiOutlineSetting {...props} />
    //                 }}
    //                 muiTableHeadCellProps={{
    //                     sx: {
    //                         backgroundColor: theme === 'light' ? '' : '#334155'
    //                     }
    //                 }}
    //                 muiTableBodyCellProps={{
    //                     sx: {
    //                         backgroundColor: theme === 'light' ? '' : '#364455 !important',
    //                     }
    //                 }}
    //                 muiTableContainerProps={{
    //                     sx: {
    //                         backgroundColor: theme === 'light' ? '' : '#334155'
    //                     }
    //                 }}
    //                 muiTableBodyProps={{
    //                     sx: {
    //                         '& tr:nth-of-type(odd)': {
    //                             backgroundColor: theme === 'light' ? '' : '#2C3847 !important',
    //                         },
    //                         ':hover': {
    //                             backgroundColor: theme === 'light' ? '' : '#334155'
    //                         }
    //                     },
    //                 }}
    //                 muiBottomToolbarProps={
    //                     {
    //                         sx: {
    //                             display: 'none',
    //                             backgroundColor: theme === 'light' ? '' : '#334155 !important',
    //                         }
    //                     }
    //                 }

    //                 enableTableFooter={false}
    //             />

    //             <div className="w-full flex justify-between">
    //                 <div className="text-right"></div>
    //                 <div className="grid grid-cols-2 gap-1 text-[13px] w-[26rem] text-gray-600">
    //                     <p className="text-lg text-gray-800 font-semibold">Total Summary</p>
    //                     <span></span>
    //                     <div className="col-span-2 my-1 border-b"></div>
    //                     <span className="flex items-center pt-1">Total Before Discount { }</span>
    //                     <MUITextField placeholder="0.00" type="text" value={currencyFormat(docTotal)} readonly startAdornment={'AUD'} />
    //                     <span className="flex items-center pt-1">Discount</span>
    //                     <div className="grid grid-cols-2 gap-2">
    //                         <MUITextField placeholder="0.00" type="number" startAdornment={'%'} />
    //                         <span className="w-full text-[13px] flex items-center pt-1 justify-end">AUD 0.00</span>
    //                     </div>
    //                     <span className="flex items-center pt-1">Freight</span>
    //                     <span className="text-right pt-1">AUD 0.00</span>
    //                     {/* <MUITextField placeholder="0.00" type="number" startAdornment={'AUD'} /> */}
    //                     <span className="flex items-center pt-1">Rounding</span>
    //                     <div className="grid grid-cols-2 gap-1">
    //                         <div> <Checkbox size="small" /></div>
    //                         <span className="flex items-center justify-end pt-1">AUD 0.00</span>
    //                     </div>
    //                     <span className="flex items-center pt-1">Tax</span>
    //                     <MUITextField placeholder="0.00" type="text" value={currencyFormat(docTaxTotal)} startAdornment={'AUD'} readonly />
    //                     <span className="flex items-center pt-1">Total Payment Due</span>
    //                     <MUITextField placeholder="0.00" type="text" startAdornment={'AUD'} key={currencyFormat(docTotal + docTaxTotal)} defaultValue={currencyFormat(docTotal + docTaxTotal)} />

    //                 </div>
    //             </div>
    //         </div>

    //         <ContentTableColumn ref={updateRef} onSave={onChange} columns={itemColumns} />
    //         <ContentTableSelectColumn ref={columnRef} columns={itemColumns} />
    //     </FormCard>
    // );
}



interface ContentTableColumnProps {
    ref?: React.RefObject<ContentTableColumn | undefined>,
    onSave?: (value: any) => void,
    columns: any[],
}

class ContentTableColumn extends React.Component<ContentTableColumnProps, any>  {
    constructor(props: any) {
        super(props);

        this.state = {
            open: false
        } as any

        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handChange = this.handChange.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
    }


    onOpen(data?: any) {
        this.setState({ open: true, ...data });
    }

    onClose() {
        this.setState({ open: false })
    }

    onSave() {
        if (this.props.onSave) {
            const temps: any = { ...this.state };
            delete temps.open;
            this.props.onSave(temps);
        }

        this.setState({ open: false })
    }


    handChange(event: any, field: string, cal = false) {
        const temps = { ...this.state };
        temps[field] = event.target.value;

        if (cal) {
            temps['LineTotal'] = parseFloat(temps['Quantity'] ?? 0) * (parseFloat(temps['UnitPrice']) ?? 0);
        }

        this.setState({ ...temps });
    }

    private handlerClick(accessorKey: string) {
        if (accessorKey === 'ItemCode') {

        }
    }


    render() {
        return (
            <Modal
                title={`Item - ${this.state?.ItemCode ?? ''}`}
                titleClass="pt-3 px-4 font-bold w-full"
                open={this.state.open}
                widthClass="w-[80vw]"
                heightClass="h-[90vh]"
                onClose={this.onClose}
                onOk={this.onSave}
                okLabel="Save"
            >
                <>
                    <div className="w-full"></div>
                    <div className="grid grid-cols-4 md:grid-cols-1 gap-3 px-4">
                        {this.props.columns.map((e) => <MUITextField
                            key={shortid.generate()}
                            label={e?.header}
                            value={this.state[e?.accessorKey]}
                            endAdornment={e?.accessorKey?.includes('ItemCode')}
                            onClick={() => this.handlerClick(e?.accessorKey)}
                        />)}

                        {/* <MUITextField label="Item Code" endAdornment defaultValue={this.state.ItemCode} />
                        <MUITextField label="Item Description" defaultValue={this.state.ItemName} />
                        <MUITextField label="Quantity" value={this.state.Quantity} onChange={(event) => this.handChange(event, 'Quantity', true)} />
                        <MUITextField label="Unit Price" value={this.state.UnitPrice} onChange={(event) => this.handChange(event, 'UnitPrice', true)} />
                        <MUITextField label="Price After Discount" value={this.state.LineTotal} />
                        <MUITextField label="Tax Code" defaultValue={this.state.VatGroup} />
                        <MUITextField label="Gross Price" defaultValue={this.state.UnitPrice} />
                        <MUITextField label="Total" value={this.state.LineTotal} />
                        <MUITextField label="Item Group" defaultValue={this.state.ItemGroup} />
                        <MUITextField label="UOM Code" defaultValue={this.state.UomCode} />
                        <MUITextField label="Item Per Unit" defaultValue={this.state.UnitsOfMeasurement} /> */}
                    </div>
                </>
            </Modal>
        )
    }
}

interface ContentTableSelectColumnProps {
    ref?: React.RefObject<ContentTableSelectColumn | undefined>,
    onSave?: (value: any) => void,
    columns: any[],
}

class ContentTableSelectColumn extends React.Component<ContentTableSelectColumnProps, any>  {
    constructor(props: any) {
        super(props);

        this.state = {
            open: false,
            searchColumn: '',
            showChecks: false,
        } as any

        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handChange = this.handChange.bind(this);
    }


    componentDidMount(): void {
    }

    onOpen(data?: any) {
        this.setState({ open: true, ...data });
    }

    onClose() {
        this.setState({ open: false })
    }

    onSave() {
        if (this.props.onSave) {
            const temps: any = { ...this.state };
            delete temps.open;
            this.props.onSave(temps);
        }

        this.setState({ open: false })
    }


    handChange(event: any) {
        this.setState({ ...this.state, searchColumn: event.target.value })
    }

    render() {
        return (
            <Modal
                title={`Columns Setting`}
                titleClass="pt-3 px-2 font-bold w-full "
                open={this.state.open}
                widthClass="w-[40rem]"
                heightClass="h-[80vh]"
                onClose={this.onClose}
                onOk={this.onSave}
                okLabel="Save"
            >
                <div className="px-3">
                    <div className="flex justify-between sticky top-0 bg-white py-2 z-10 border-b">
                        <div className="flex">
                            <div> <Checkbox size="small" className="mt-2" defaultChecked={this.state.showChecks} onChange={(e) => this.setState({ ...this.state, showChecks: !this.state.showChecks })} /></div>
                            <label htmlFor="showAll" className="flex items-center text-[13px]">Show Selected</label>
                        </div>
                        <div className="flex w-[15rem] items-center">
                            <MUITextField placeholder="Search Column..." onChange={this.handChange} endAdornment endIcon={<BiSearch className="text-sm" />} />
                        </div>
                    </div>
                    <ul className=" h-full text-[14px] grid grid-cols-1 mt-3 ">
                        {this.props.columns.filter((val) => val.visible).filter((val) => val.header.toLowerCase().includes(this.state.searchColumn.toLowerCase())).map((e, index: number) => <li className={`border-b`}>
                            <Checkbox defaultChecked={e?.visible} size="small" />  <span>{e?.header}</span>
                        </li>)}
                    </ul>
                </div>
            </Modal>
        )
    }
}

