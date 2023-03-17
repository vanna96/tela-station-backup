import React, { FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { IoClose } from "react-icons/io5";
import Modal from './Modal';
import MaterialReactTable from 'material-react-table';
import { useQuery } from 'react-query';
import request from '../../utilies/request';


type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ItemModalProps {
    open: boolean,
    onClose: () => void,
}


const ItemModal: FC<ItemModalProps> = ({ open, onClose, }) => {


    const { data, isLoading }: any = useQuery({
        queryKey: ["items"],
        queryFn: () => request("GET", "/Items?$select=ItemName, ItemCode, PurchaseVATGroup, SalesVATGroup, UoMGroupEntry, ItemsGroupCode, ItemsGroupCode"),
        staleTime: Infinity,
    });

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 8,
    });

    const handlerConfirm = () => {
    }

    const [rowSelection, setRowSelection] = React.useState({});

    const columns = React.useMemo(
        () => [
            {
                accessorKey: "ItemCode",
                header: "Code",
            },
            {
                accessorKey: "ItemName",
                header: "Name", //uses the default width from defaultColumn prop
            },
            {
                accessorKey: "Description",
                header: "Description",
            },
        ],
        []
    );


    return (
        <Modal
            open={open}
            onClose={onClose}
            widthClass='w-[70%]'
            title='Items'
            disableTitle={true}
        >
            <div className="data-table" >
                <MaterialReactTable
                    columns={columns}
                    data={data?.data?.value ?? []}
                    enableStickyHeader={true}
                    enableStickyFooter={true}
                    enablePagination={true}
                    enableTopToolbar={true}
                    enableDensityToggle={false}
                    initialState={{ density: "compact" }}
                    enableRowSelection={true}
                    onPaginationChange={setPagination}
                    onRowSelectionChange={setRowSelection}
                    getRowId={(row: any) => row.ItemCode}
                    enableSelectAll={true}
                    enableFullScreenToggle={false}
                    enableColumnVirtualization={false}
                    positionToolbarAlertBanner="bottom"
                    muiTablePaginationProps={{
                        rowsPerPageOptions: [5, 8, 15],
                        showFirstButton: false,
                        showLastButton: false,
                    }}
                    muiTableBodyRowProps={({ row }) => ({
                        onClick: row.getToggleSelectedHandler(),
                        sx: { cursor: 'pointer' },
                    })}
                    state={
                        {
                            isLoading,
                            pagination: pagination,
                            rowSelection
                        }
                    }
                    renderTopToolbarCustomActions={({ table }) => {
                        return <h2 className=" text-lg font-bold">Items</h2>
                    }}
                />
            </div>
        </Modal>
    )
}

export default ItemModal;


