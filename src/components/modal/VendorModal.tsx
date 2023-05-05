import React, { FC } from 'react'
import Modal from './Modal';
import MaterialReactTable from 'material-react-table';
import { useQuery } from 'react-query';
import request from '../../utilies/request';
import BusinessPartnerRepository from '@/services/actions/bussinessPartnerRepository';
import { currencyFormat } from '../../utilies/index';
import BusinessPartner from '../../models/BusinessParter';
import { useMemo } from 'react';

export type VendorModalType = 'supplier' | 'customer' | null;

interface VendorModalProps {
  open: boolean,
  onClose: () => void,
  onOk: (vendor: BusinessPartner) => void
  type: VendorModalType,
}


const VendorModal: FC<VendorModalProps> = ({ open, onClose, onOk, type }) => {
  const { data, isLoading }: any = useQuery({
    queryKey: ["venders_" + type],
    queryFn: () => new BusinessPartnerRepository().get(`&$filter=CardType eq 'c${type?.charAt(0).toUpperCase()}${type?.slice(1)}'`),
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
        accessorKey: "CardCode",
        header: "Card Code",
      },
      {
        accessorKey: "CardName",
        header: "Card Name",
      },
      {
        accessorKey: "Currency",
        header: "Currency",
      },
      {
        accessorKey: "CurrentAccountBalance",
        header: "Balance",
        Cell: ({ cell }: any) => {
          return <div className={parseFloat(cell.getValue()) > 0 ? 'text-blue-500' : 'text-red-500'}>{currencyFormat(cell.getValue())}</div>;
        },
      },
    ],
    []
  );

  // console.log(type)

  const items = useMemo(() => data?.filter((e: any) => e?.CardType?.slice(1)?.toLowerCase() === type), [data, type])
  

  return (
    <Modal
      open={open}
      onClose={onClose}
      widthClass='w-[70%]'
      title='Items'
      disableTitle={true}
      disableFooter={true}
    >
      <div className="data-table" >
        <MaterialReactTable
          columns={columns}
          data={items ?? []}
          enableStickyHeader={true}
          enableStickyFooter={true}
          enablePagination={true}
          enableTopToolbar={true}
          enableDensityToggle={false}
          initialState={{ density: "compact" }}
          // enableRowSelection={true}
          onPaginationChange={setPagination}
          // onRowSelectionChange={setRowSelection}
          getRowId={(row: any) => row.ItemCode}
          enableSelectAll={false}
          enableFullScreenToggle={false}
          enableColumnVirtualization={false}
          enableMultiRowSelection={false}
          positionToolbarAlertBanner="none"
          muiTablePaginationProps={{
            rowsPerPageOptions: [5, 8, 15],
            showFirstButton: false,
            showLastButton: false,
          }}
          muiTableBodyRowProps={({ row }) => ({
            // onClick: row.getToggleSelectedHandler(),
            onClick: () => {
              onOk(new BusinessPartner(row.original));
              onClose()
            },
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
            return <h2 className=" text-lg font-bold">Vendor</h2>
          }}
        />
      </div>
    </Modal>
  )
}

export default VendorModal;




