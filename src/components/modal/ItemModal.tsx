import React, { FC, Fragment } from 'react'
import Modal from './Modal';
import MaterialReactTable from 'material-react-table';
import { useQuery } from 'react-query';
import itemRepository from '@/services/actions/itemRepostory';
import { useMemo } from 'react';
import VatGroupRepository from '../../services/actions/VatGroupRepository';
import VatGroup from '@/models/VatGroup';
import UnitOfMeasurementRepository from '@/services/actions/unitOfMeasurementRepository';
import UnitOfMeasurementGroupRepository from '@/services/actions/unitOfMeasurementGroupRepository';
import BusinessPartnerRepository from '@/services/actions/bussinessPartnerRepository';
import { Dialog, Transition } from '@headlessui/react';
import { Button, IconButton, OutlinedInput } from '@mui/material';
import { HiSearch, HiX } from 'react-icons/hi';
import shortid from 'shortid';

type ItemType = 'purchase' | 'sale' | 'inventory';

interface ItemModalProps {
    open: boolean,
    onClose: () => void,
    onOk: (item: any[]) => void,
    type: ItemType,
}


const ItemModal: FC<ItemModalProps> = ({ open, onClose, type, onOk }) => {
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [filterKey, setFilterKey] = React.useState('key-id');

    const { data, isLoading }: any = useQuery({
        queryKey: ["items"],
        queryFn: () => new itemRepository().get(),
        staleTime: Infinity,
    });

    const vendors: any = useQuery({
        queryKey: ["venders_supplier"],
        queryFn: () => new BusinessPartnerRepository().get(`&$filter=CardType eq 'cSupplier'`),
        staleTime: Infinity,
    });

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowSelection, setRowSelection] = React.useState({});

    React.useEffect(() => {
        setTimeout(() => setRowSelection({}), 500)
    }, [open])

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


    const handlerConfirm = async () => {
        const keys = Object.keys(rowSelection);
        let selectItems = keys.map((e: any) => items.find((ele: any) => ele?.ItemCode === e));
        const uomGroups: any = await new UnitOfMeasurementGroupRepository().get();
        const uoms = await new UnitOfMeasurementRepository().get();



        selectItems = selectItems.map((e: any) => {
            const vendor = vendors.data?.find((bp: any) => bp?.CardCode === e?.Mainsupplier);
            const defaultPrice = e?.ItemPrices?.find((row: any) => row?.PriceList === vendor?.PriceListNum)?.Price;
            let vatRate: any = 0;
            switch (type) {
                case 'purchase':
                    vatRate = (new VatGroupRepository().find(e?.PurchaseVATGroup) as VatGroup).vatRate;
                    break;
                case 'sale':
                    vatRate = (new VatGroupRepository().find(e?.SalesVATGroup) as VatGroup).vatRate;
                    break;
                default:
                    vatRate = 0;
                    break;
            }


            const uomGroup: any = uomGroups.find((row: any) => row.AbsEntry === e?.UoMGroupEntry);
            let uomLists: any[] = [];
            uomGroup?.UoMGroupDefinitionCollection?.forEach((row: any) => {
                const itemUOM = uoms.find((record: any) => record?.AbsEntry === row?.AlternateUoM);
                if (itemUOM) {
                    uomLists.push(itemUOM)
                };
            })
            const baseUOM: any = uoms.find((row: any) => row.AbsEntry === uomGroup?.BaseUoM);

            const total = (defaultPrice ?? 0) * 1;

            return ({
                ItemCode: e?.ItemCode,
                LineVendor: vendor?.CardCode,
                ItemName: e?.ItemName,
                ItemDescription: e?.ItemName,
                UomEntry: e?.UoMGroupEntry,
                ItemGroup: e?.ItemsGroupCode,
                SaleVatGroup: e?.SalesVATGroup,
                PurchaseVatGroup: e?.PurchaseVATGroup,
                VatGroup: e?.PurchaseVATGroup,
                VatRate: vatRate,
                Quantity: defaultPrice !== undefined ? 1 : 0,
                UnitPrice: defaultPrice ?? 0,
                DiscountPercent: 0,
                LineTotal: total,
                Total: total,
                // GrossPrice: total + ((total * vatRate) / 100),
                UomGroupAbsEntry: e?.UoMGroupEntry,
                UomGroupCode: uomGroup?.Code,
                UomAbsEntry: baseUOM?.AbsEntry,
                UomCode: baseUOM?.Code,
                UomName: baseUOM?.Name,
                UomLists: uomLists,
                DocCurrency: e?.DocCurrency,
                UnitsOfMeasurement: uomGroup?.UoMGroupDefinitionCollection.find((e: any) => e?.AlternateUoM === uomGroup?.BaseUoM)?.BaseQuantity,
            })
        });
        onOk(selectItems)
    }

    const handlerSearch = (event: any) => setGlobalFilter(event.target.value);

    const clearFilter = React.useCallback(() => {
        if (globalFilter === '') return;
        setGlobalFilter('');
        setFilterKey(shortid.generate());
    }, [globalFilter]);


    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto w-full ">
                    <div className="flex min-h-full items-center justify-center  text-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`flex flex-col bg-white w-[70vw] min-h-[90vh] px-[2.5rem] border shadow-lg relative transform overflow-hidden rounded-lg  py-1 text-left align-middle  transition-all`}>
                                <div className={`grow text-inherit`}>
                                    <div className={`data-grid`}>
                                        <div className='w-full flex justify-between items-center p-0 pt-6'>
                                            <h2 className='font-bold text-xl capitalize'> {type} Items</h2>
                                            <OutlinedInput
                                                size='small'
                                                key={filterKey}
                                                onChange={handlerSearch}
                                                className='text-sm'
                                                sx={{ fontSize: '14px', }}
                                                placeholder='Search...'
                                                endAdornment={<IconButton size='small' onClick={clearFilter}>
                                                    {globalFilter !== '' ? <HiX className='text-xl' /> : <HiSearch className='text-xl' />}
                                                </IconButton>}
                                            />
                                        </div>
                                        <hr />
                                        <MaterialReactTable
                                            columns={columns}
                                            data={items ?? []}
                                            enableStickyHeader={true}
                                            enableStickyFooter={true}
                                            enablePagination={true}
                                            enableDensityToggle={false}
                                            initialState={{ density: "compact" }}
                                            onGlobalFilterChange={setGlobalFilter}
                                            onPaginationChange={setPagination}
                                            enableColumnActions={false}
                                            getRowId={(row: any) => row.ItemCode}
                                            enableSelectAll={false}
                                            enableFullScreenToggle={false}
                                            enableColumnVirtualization={false}
                                            enableMultiRowSelection={true}
                                            enableRowSelection={true}
                                            onRowSelectionChange={setRowSelection}
                                            positionToolbarAlertBanner="none"
                                            positionPagination='bottom'
                                            muiTablePaginationProps={{
                                                rowsPerPageOptions: [5, 10, 15],
                                                showFirstButton: true,
                                                showLastButton: true,
                                            }}
                                            muiTableBodyRowProps={({ row }) => ({
                                                onClick: row.getToggleSelectedHandler(),
                                                sx: { cursor: 'pointer' },
                                            })}
                                            state={
                                                {
                                                    globalFilter,
                                                    isLoading,
                                                    pagination: pagination,
                                                    rowSelection
                                                }
                                            }
                                        />

                                        <div className='w-full flex justify-end items-center border-t pt-3 gap-3'>
                                            <Button size='small' disableElevation variant='outlined' onClick={onClose}><span className='capitalize px-6  text-blue-700'>Close</span></Button>
                                            <Button size='small' disableElevation variant='contained' onClick={handlerConfirm}><span className='capitalize px-6 text-white'>Ok</span></Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ItemModal;


