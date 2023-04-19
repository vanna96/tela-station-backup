import React, { FC } from 'react'
import Modal from './Modal';
import MaterialReactTable from 'material-react-table';
import { useQuery } from 'react-query';
import InitializeData from '@/services/actions';
import Project from '@/models/Project';
import BranchRepository from '@/services/actions/branchRepository';
import Dimension from '@/models/Dimension';
import DimensionRepository from '@/services/actions/DimensionRepostsitory';
import { BsTag } from 'react-icons/bs';
import DocumentNumberingRepository from '@/services/actions/DocumentNumberingRepository';

interface DocumentNumberingModalProps {
  open: boolean,
  onClose: () => void,
}


const DocumentNumberingModal: FC<DocumentNumberingModalProps> = ({ open, onClose }) => {
  const { data, isLoading }: any = useQuery({
    queryKey: ["documentNumbering"],
    queryFn: () => new DocumentNumberingRepository().get(),
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
        accessorKey: "ObjectName",
        header: "Document",
      },
      {
        accessorKey: "DfltSeries",
        header: "default Series",
      },
      {
        accessorKey: "UpdCounter",
        header: "Fist No",
      },
      {
        accessorKey: "as",
        header: "Next No",
  
      },
      {
        accessorKey: "AutoKey",
        header: "Last No",

      },
      {
        accessorKey: "as",
        header: "Change Menu Name",
      },
    ],
    []
  );
  // const items = React.useMemo(() => {
  //   switch (IsActive) {
  //     case 'purchase':
  //       return data?.filter((e: any) => e?.PurchaseItem === 'tYES');
  //     case 'sale':
  //       return data?.filter((e: any) => e?.SalesItem === 'tYES');
  //     case 'inventory':
  //       return data?.filter((e: any) => e?.InventoryItem === 'tYES');
  //     default:
  //       return [];
  //   }
  // }, [data]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      widthClass='w-[75rem]'
      title='List Of Projects'
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
          muiTableBodyRowProps={() => ({
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
            return <h2 className=" text-lg font-bold">List Of Document Numbering</h2>
          }}
        />
      </div>
    </Modal>
  )
}

export default DocumentNumberingModal;




