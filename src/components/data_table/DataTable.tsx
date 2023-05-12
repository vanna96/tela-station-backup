import React from 'react'
import { Button } from '@mui/material';
import { HiRefresh } from 'react-icons/hi';
import { BiFilterAlt } from 'react-icons/bi';
import DataTableColumnVisibility from './DataTableColumnVisibility';
import { AiOutlineSetting } from 'react-icons/ai';
import MaterialReactTable from 'material-react-table';
import ColumnSearch from './ColumnSearch';
import { BsSortDown } from 'react-icons/bs';
import MenuCompoment from "@/components/data_table/MenuComponent";
import DataTableColumnFilter from './DataTableColumnFilter';


interface DataTableProps {
    columns: any[],
    data: any[],
    count: number,
    handlerRefresh: () => void,
    loading: boolean
    handlerSortby: (value: string) => void,
    handlerSearch: (value: string) => void,
    pagination: any,
    paginationChange: (value: any) => void,
}

export default function DataTable(props: DataTableProps) {
    const search = React.createRef<ColumnSearch>();
    const [colVisibility, setColVisibility] = React.useState<Record<string, boolean>>({});

    React.useEffect(() => {
        const cols: any = {};
        props.columns.forEach((e) => {
            cols[e.accessorKey] = e?.visible ?? true;
        });
        setColVisibility(cols);
    }, []);


    const handlerSearch = (queries: any) => {
        if (queries === '') return;
        props.handlerSearch('&$filter=' + queries)
    }



    return (
        <div className="rounded-lg shadow-sm border bg-white p-4 flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    {/* <MUITextField placeholder="Search ..." /> */}
                    <DataTableColumnFilter
                        handlerClearFilter={props.handlerRefresh}
                        title={<div className="flex gap-2">
                            <span className="text-lg"><BiFilterAlt /></span> <span className="text-[13px] capitalize">Filter</span>
                        </div>}
                        items={props.columns?.filter((e) => e?.accessorKey !== 'DocEntry')}
                        onClick={handlerSearch}
                    />
                </div>
                <div className="flex justify-end gap-2 items-center text-[13px]">
                    <Button size="small" variant="text"
                        onClick={props.handlerRefresh}
                    >
                        <span className="text-lg mr-2"><HiRefresh /></span>
                        <span className="capitalize text-sm">Refresh</span>
                    </Button>
                    <MenuCompoment
                        title={<div className="flex gap-2">
                            <span className="text-lg"><BsSortDown /></span> <span className="text-[13px] capitalize">Sort By</span>
                        </div>}
                        items={props.columns}
                        onClick={props.handlerSortby}
                    />
                    <DataTableColumnVisibility
                        title={<div className="flex gap-2">
                            <span className="text-lg"><AiOutlineSetting /></span> <span className="text-[13px] capitalize">Columns</span>
                        </div>}
                        items={props.columns}
                        onClick={(value) => {
                            setColVisibility(value)
                        }}
                    />
                </div >
            </div>

            <div className="grow data-grid border-t">
                <MaterialReactTable
                    columns={props.columns}
                    data={props.data ?? []}
                    enableHiding={false}
                    initialState={{
                        density: "compact",
                        columnVisibility: colVisibility,
                    }}
                    enableDensityToggle={false}
                    enableColumnResizing
                    enableFullScreenToggle={false}
                    enableStickyHeader={false}
                    enableStickyFooter={false}
                    enablePagination={true}
                    enableColumnFilters={false}
                    manualPagination={true}
                    enableColumnActions={false}
                    enableSorting={false}
                    muiTablePaginationProps={{
                        rowsPerPageOptions: [5, 10, 15],
                    }}
                    enableFilters={false}
                    enableGlobalFilter={false}
                    rowCount={props.count ?? 0}
                    getRowId={(row: any) => row.DocEntry}
                    onPaginationChange={props.paginationChange}
                    state={{
                        isLoading: props.loading,
                        pagination: props.pagination,
                        columnVisibility: colVisibility
                    }}
                    enableColumnVirtualization={false}
                    onColumnVisibilityChange={setColVisibility}
                />

                <ColumnSearch ref={search} onOk={handlerSearch} />
            </div>
        </div >
    )
}
