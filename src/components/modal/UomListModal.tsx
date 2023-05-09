import React, { FC } from 'react'
import Modal from './Modal';
import MaterialReactTable from 'material-react-table';
import { useQuery } from 'react-query';
import UnitOfMeasurementRepository from '@/services/actions/unitOfMeasurementRepository';
import UnitOfMeasurementGroupRepository from '@/services/actions/unitOfMeasurementGroupRepository';


interface UoMListModalProps {
  open: boolean,
  data: any[],
  onClose: () => void,
  onOk: (value: any) => void
}


const UoMListModal: FC<UoMListModalProps> = ({ open, onClose, onOk, data }) => {

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
        accessorKey: "Code",
        header: "UOM Code",
      },
      {
        accessorKey: "Name",
        header: "UOM Name",
      },
    ],
    []
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      widthClass='w-[70%]'
      title='List Of UOM'
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
              // onOk(new UomList(row.original));
              onClose();
            },
            sx: { cursor: 'pointer' },
          })}
          state={
            {
              isLoading: false,
              pagination: pagination,
              rowSelection
            }
          }
          renderTopToolbarCustomActions={({ table }) => {
            return <h2 className=" text-lg font-bold">List Of UOM</h2>
          }}
        />
      </div>
    </Modal>
  )
}

export default UoMListModal;




