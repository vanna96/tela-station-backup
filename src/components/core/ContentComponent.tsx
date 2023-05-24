import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import { AiOutlineSetting } from "react-icons/ai";
import { currencyFormat } from "@/utilies";
import FormCard from "@/components/card/FormCard";
import UnitOfMeasurementGroupRepository from "@/services/actions/unitOfMeasurementGroupRepository";
import { TbSettings } from "react-icons/tb";
import { ThemeContext } from "@/contexts";
import Modal from "@/components/modal/Modal";
import MUISelect from "@/components/selectbox/MUISelect";
import { useDocumentTotalHook } from "@/hook";
import shortid from "shortid";
import { BiSearch } from "react-icons/bi";
import MUITextField from "../input/MUITextField";

interface ContentComponentProps {
    data: any,
    onChange: (record: any) => void,
    columns: any[]
}


export default function ContentComponent(props: ContentComponentProps) {
    const { theme } = React.useContext(ThemeContext);
    const updateRef = React.createRef<ContentTableColumn>();
    const columnRef = React.createRef<ContentTableSelectColumn>();


    const [colVisibility, setColVisibility] = React.useState<Record<string, boolean>>({});
    const blankItem = { ItemCode: '' };
    const [rowSelection, setRowSelection] = React.useState({});

    const handlerRemove = () => {
        let temps: any[] = [];
        Object.values(rowSelection).forEach((e: any, index: number) => {
            // if (e) temps.push(data?.Items[index]);
        });
    }

    const [docTotal, docTaxTotal] = useDocumentTotalHook([]);


    React.useEffect(() => {
        const cols: any = {};
        props.columns.forEach((e: any) => {
            cols[e?.accessorKey] = e?.visible;
        })
        setColVisibility(cols);
    }, [props.columns])


    const columns = useMemo(() => props.columns, [colVisibility, updateRef])

    return (
        <FormCard
            title="Content"
            action={<div className="flex ">
                <Button size="small"><span className="capitalize">Copy</span></Button>
                <Button size="small"><span className="capitalize">Paste</span></Button>
                <Button size="small"><span className="capitalize" onClick={handlerRemove}>Remove</span></Button>
                {/* <IconButton><TbCopy /></IconButton> */}
                {/* <IconButton><MdDeleteOutline /></IconButton> */}
                <IconButton onClick={() => columnRef.current?.onOpen()}><TbSettings /></IconButton>
            </div>}
        >
            <div className="col-span-2 grid grid-cols-3 md:grid-cols-1 gap-4 mt-4 ">
                <div className="flex gap-4 items-start">
                    <label htmlFor="currency" className="text-[13px] flex pt-1">Currency</label>
                    <MUISelect value="L" items={[{ value: 'L', name: 'Local Currency' }]} aliaslabel="name" aliasvalue="value" />
                </div>
                <div className="col-span-2 grid grid-cols-3 gap-3 text-[13px]">
                    <label htmlFor="currency" className="col-span-2 md:col-span-1 flex items-center justify-end md:justify-start">Item / Service Type :</label>
                    <div className="md:col-span-2">
                        <MUISelect value="I" items={[{ value: 'I', name: 'Items' }, { value: 'S', name: 'Services' }]} aliaslabel="name" aliasvalue="value" />
                    </div>
                    <label htmlFor="currency" className="col-span-2 md:col-span-1 flex items-center justify-end md:justify-start">Price Mode :</label>
                    <div className="md:col-span-2">
                        <MUISelect value="G" disabled items={[{ value: 'G', name: 'Gross Price' }, { value: 'N', name: 'Net Price' }]} aliaslabel="name" aliasvalue="value" />
                    </div>
                </div>
            </div>
            <div className="col-span-2 data-table border-t">
                <MaterialReactTable
                    // columns={itemColumns}
                    columns={columns}
                    data={[...props.data?.Items, blankItem] ?? []}
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
                    enablePinning={true}
                    onColumnVisibilityChange={setColVisibility}
                    enableStickyFooter={false}
                    enableRowSelection={true}
                    onRowSelectionChange={setRowSelection}
                    rowNumberMode="original" //default
                    enableSelectAll={true}
                    enableRowNumbers={true}
                    enableMultiRowSelection={true}
                    initialState={{
                        density: "compact",
                        columnVisibility: colVisibility,
                        rowSelection,
                        // columnPinning: { left: ['Action', 'ItemCode'] }
                    }}
                    state={{
                        columnVisibility: colVisibility,
                        rowSelection,
                    }}
                    muiTableBodyRowProps={({ row }) => ({
                        sx: { cursor: 'pointer' },
                    })}
                    icons={{
                        ViewColumnIcon: (props: any) => <AiOutlineSetting {...props} />
                    }}
                    muiTableHeadCellProps={{
                        sx: {
                            backgroundColor: theme === 'light' ? '' : '#334155'
                        }
                    }}
                    muiTableBodyCellProps={{
                        sx: {
                            backgroundColor: theme === 'light' ? '' : '#364455 !important',
                        }
                    }}
                    muiTableContainerProps={{
                        sx: {
                            backgroundColor: theme === 'light' ? '' : '#334155'
                        }
                    }}
                    muiTableBodyProps={{
                        sx: {
                            '& tr:nth-of-type(odd)': {
                                backgroundColor: theme === 'light' ? '' : '#2C3847 !important',
                            },
                            ':hover': {
                                backgroundColor: theme === 'light' ? '' : '#334155'
                            }
                        },
                    }}
                    muiBottomToolbarProps={
                        {
                            sx: {
                                display: 'none',
                                backgroundColor: theme === 'light' ? '' : '#334155 !important',
                            }
                        }
                    }

                    enableTableFooter={false}
                />

                <div className="w-full flex justify-between">
                    <div className="text-right"></div>
                    <div className="grid grid-cols-2 gap-1 text-[13px] w-[26rem] text-gray-600">
                        <p className="text-lg text-gray-800 font-semibold">Total Summary</p>
                        <span></span>
                        <div className="col-span-2 my-1 border-b"></div>
                        <span className="flex items-center pt-1">Total Before Discount { }</span>
                        <MUITextField placeholder="0.00" type="text" value={currencyFormat(docTotal)} readonly startAdornment={'AUD'} />
                        <span className="flex items-center pt-1">Discount</span>
                        <div className="grid grid-cols-2 gap-2">
                            <MUITextField placeholder="0.00" type="number" startAdornment={'%'} />
                            <span className="w-full text-[13px] flex items-center pt-1 justify-end">AUD 0.00</span>
                        </div>
                        <span className="flex items-center pt-1">Freight</span>
                        <span className="text-right pt-1">AUD 0.00</span>
                        {/* <MUITextField placeholder="0.00" type="number" startAdornment={'AUD'} /> */}
                        <span className="flex items-center pt-1">Rounding</span>
                        <div className="grid grid-cols-2 gap-1">
                            <div> <Checkbox size="small" /></div>
                            <span className="flex items-center justify-end pt-1">AUD 0.00</span>
                        </div>
                        <span className="flex items-center pt-1">Tax</span>
                        <MUITextField placeholder="0.00" type="text" value={currencyFormat(docTaxTotal)} startAdornment={'AUD'} readonly />
                        <span className="flex items-center pt-1">Total Payment Due</span>
                        <MUITextField placeholder="0.00" type="text" startAdornment={'AUD'} key={currencyFormat(docTotal + docTaxTotal)} defaultValue={currencyFormat(docTotal + docTaxTotal)} />

                    </div>
                </div>
            </div>

            {/* <ContentTableColumn ref={updateRef} onSave={onChange} columns={itemColumns} /> */}
            <ContentTableSelectColumn ref={columnRef} columns={props.columns} visibles={colVisibility} onSave={(value) => {
                setColVisibility(value)
            }} />
        </FormCard>
    );
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
    visibles: any,
}

class ContentTableSelectColumn extends React.Component<ContentTableSelectColumnProps, any>  {
    constructor(props: any) {
        super(props);

        this.state = {
            open: false,
            searchColumn: '',
            showChecks: false,
            visibles: {},
        } as any

        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handChange = this.handChange.bind(this);
        this.handlerChangeColVisibility = this.handlerChangeColVisibility.bind(this);
    }


    componentDidMount(): void {
        this.setState({ ...this.state, visibles: { ...this.props.visibles } });
    }

    onOpen(data?: any) {
        this.setState({ open: true, ...data });
    }

    onClose() {
        this.setState({ open: false })
    }

    onSave() {
        if (this.props.onSave) {
            this.props.onSave(this.state.visibles);
        }

        this.setState({ open: false })
    }


    handChange(event: any) {
        this.setState({ ...this.state, searchColumn: event.target.value })
    }

    handlerChangeColVisibility(event: any, field: string) {
        const visibles = { ...this.state.visibles };
        visibles[field] = event.target.checked;
        console.log(visibles);
        this.setState({ ...this.state, visibles: { ...this.props.visibles, ...visibles } });
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
                        {this.props.columns.filter((val) => val.header.toLowerCase().includes(this.state.searchColumn.toLowerCase())).map((e, index: number) => <li key={`${e?.accessorKey}`} className={`border-b`}>
                            <Checkbox checked={this.state.visibles[e?.accessorKey] ?? false} onChange={(event) => this.handlerChangeColVisibility(event, e?.accessorKey)} size="small" />  <span>{e?.header} </span>
                        </li>)}
                    </ul>
                </div>
            </Modal>
        )
    }
}

