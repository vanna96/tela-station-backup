import React, { FC } from 'react'
import Modal from './Modal';
import MaterialReactTable from 'material-react-table';
import { useQuery } from 'react-query';
import itemRepository from '@/services/actions/itemRepostory';
import Item from '@/models/Item';


interface ItemModalProps {
  open: boolean,
  onClose: () => void,
  onOk: (item: Item) => void,
}


const ItemsModal: FC<ItemModalProps> = ({ open, onClose, onOk }) => {

  const { data, isLoading }: any = useQuery({
    queryKey: ["items"],
    queryFn: () => new itemRepository().get(),
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


  return (
    <Modal
      open={open}
      onClose={onClose}
      widthClass='w-[70%]'
      title='List Of Items'
      disableTitle={true}
      disableFooter={true}
    >
      <div className="data-table" >
        <MaterialReactTable
          columns={columns}
          data={data ?? []}
          enableStickyHeader={true}
          enableStickyFooter={true}
          enablePagination={true}
          enableTopToolbar={true}
          enableDensityToggle={false}
          initialState={{ density: "compact" }}
          enableRowSelection={false}
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
            onClick: () => {
              onOk(new Item(row.original));
              onClose();
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
            return <h2 className=" text-lg font-bold">List Of Items</h2>
          }}
        />
      </div>
    </Modal>
  )
}

export default ItemsModal;


