import React, { FC } from 'react'
import Modal from './Modal';
import MaterialReactTable from 'material-react-table';
import { useQuery } from 'react-query';
import request from '../../utilies/request';
import BusinessPartnerRepository from '@/services/actions/bussinessPartnerRepository';
import { currencyFormat } from '../../utilies/index';
import BusinessPartner from '../../models/BusinessParter';
import { useMemo } from 'react';
import { ThemeContext } from '@/contexts';
import MUITextField from '../input/MUITextField';
import { OutlinedInput } from '@mui/material';
import { HiSearch } from 'react-icons/hi';

export type VendorModalType = 'supplier' | 'customer' | null;

interface VendorModalProps {
  open: boolean,
  onClose: () => void,
  onOk: (vendor: BusinessPartner) => void
  type: VendorModalType,
}


const VendorModal: FC<VendorModalProps> = ({ open, onClose, onOk, type }) => {

  const { theme } = React.useContext(ThemeContext);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading }: any = useQuery({
    queryKey: ["venders_" + type],
    queryFn: () => new BusinessPartnerRepository().get(`&$filter=CardType eq 'c${type?.charAt(0).toUpperCase()}${type?.slice(1)}'`),
    staleTime: Infinity,
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

  const items = useMemo(() => data?.filter((e: any) => e?.CardType?.slice(1)?.toLowerCase() === type), [data, type]);
  const handlerSearch = (event: any) => setGlobalFilter(event.target.value);



  return (
    <Modal
      open={open}
      onClose={onClose}
      widthClass='w-[70vw]'
      heightClass='h-[80vh]'
      title='Items'
      disableTitle={true}
      disableFooter={true}
    >
      <div className={`data-grid ${theme === 'light' ? '' : 'text-white'}`}>
        <div className='w-full flex justify-between items-center p-4 pt-6'>
          <h2 className='font-bold'>Business Partners</h2>
          <OutlinedInput
            size='small'
            onChange={handlerSearch}
            className='text-sm'
            sx={{ fontSize: '14px', backgroundColor: theme === 'light' ? '' : '#64748b' }}
            placeholder='Search...'
            endAdornment={<HiSearch className='text-2xl' />}
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
          enableMultiRowSelection={false}
          positionToolbarAlertBanner="none"
          muiTablePaginationProps={{
            rowsPerPageOptions: [5, 10, 15],
            showFirstButton: false,
            showLastButton: false,
          }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              onOk(new BusinessPartner(row.original, 0));
            },
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
      </div>
    </Modal>
  )
}

export default VendorModal;




