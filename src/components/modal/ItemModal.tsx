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
import VatGroupRepository from '../../services/actions/VatGroupRepository';
import VatGroup from '@/models/VatGroup';
import ItemGroupRepository from '@/services/actions/itemGroupRepository';
import UnitOfMeasurementRepository from '@/services/actions/unitOfMeasurementRepository';
import UnitOfMeasurementGroupRepository from '@/services/actions/unitOfMeasurementGroupRepository';
import BusinessPartnerRepository from '@/services/actions/bussinessPartnerRepository';

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

    const vendors: any = useQuery({
        queryKey: ["venders_supplier"],
        queryFn: () => new BusinessPartnerRepository().get(`&$filter=CardType eq 'cSupplier'`),
        staleTime: Infinity,
    });

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 8,
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

        console.log(selectItems)
        onOk(selectItems)
    }


    return (
        <Modal
            open={open}
            onClose={onClose}
            widthClass='w-[70%]'
            heightClass='h-[85vh]'
            title='Items'
            disableTitle={true}
            onOk={handlerConfirm}

        >
            <div className="data-table text-inherit" >
                <MaterialReactTable
                    columns={columns}
                    data={items ?? []}
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


