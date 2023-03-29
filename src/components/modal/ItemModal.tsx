import React, { FC } from 'react'
import Modal from './Modal';
import MaterialReactTable from 'material-react-table';
import { useQuery } from 'react-query';
import itemRepository from '@/services/actions/itemRepostory';
import InitializeData from '@/services/actions';
import { useMemo } from 'react';
import Item from '@/models/Item';
import ItemGroup from '@/models/ItemGroup';
import UnitOfMeasurement from '@/models/UnitOfMeasurement';


type ItemType = 'purchase' | 'sale' | 'inventory';

interface ItemModalProps {
    open: boolean,
    onClose: () => void,
    onOk: (item: any[]) => void,
    type: ItemType,
}


const ItemModal: FC<ItemModalProps> = ({ open, onClose, type, onOk }) => {


    const { data, isLoading }: any = useQuery({
        queryKey: ["items"],
        queryFn: () => new itemRepository().get(),
        staleTime: Infinity,
    });


    const itemGroup = useQuery({
        queryKey: ["item-groups"],
        queryFn: () => InitializeData.listItemGroup(),
        staleTime: Infinity,
    });

    const uomGroup = useQuery({
        queryKey: ["uom-groups"],
        queryFn: () => InitializeData.unitOfMeasurement(),
        staleTime: Infinity,
    });


    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 8,
    });



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


    const items = useMemo(() => {
        switch (type) {
            case 'purchase':
                return data?.filter((e: any) => e?.PurchaseItem === 'tYES');
            case 'sale':
                return data?.filter((e: any) => e?.SalesItem === 'tYES');
            case 'inventory':
                return data?.filter((e: any) => e?.InventoryItem === 'tYES');
            default:
                return [];
        }
    }, [data]);


    const handlerConfirm = () => {
        const keys = Object.keys(rowSelection);
        let selectItems = keys.map((e: any) => items.find((ele: any) => ele?.ItemCode === e));

        selectItems = selectItems.map((e: any) => {

            return ({
                itemCode: e?.ItemCode,
                itemDescription: e?.ItemName,
                uomEntry: e?.UoMGroupEntry,
                itemGroup: e?.ItemsGroupCode,
                saleVatGroup: e?.SalesVATGroup,
                purchaseVatGroup: e?.PurchaseVATGroup,
                vatGroup: e?.PurchaseVATGroup,
                quantity: 0,
                unitPrice: 0,
                discountPercent: 0,
                total: 0
            })
        });

        onOk(selectItems)
    }


    return (
        <Modal
            open={open}
            onClose={onClose}
            widthClass='w-[70%]'
            title='Items'
            disableTitle={true}
            onOk={handlerConfirm}

        >
            <div className="data-table" >
                <MaterialReactTable
                    columns={columns}
                    data={items}
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


