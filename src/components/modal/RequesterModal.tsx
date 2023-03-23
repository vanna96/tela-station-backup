
import React, { FC } from 'react'
import Modal from './Modal';
import MaterialReactTable from 'material-react-table';
import { useQuery } from 'react-query';
import request from '../../utilies/request';
import BusinessPartnerRepository from '@/services/actions/bussinessPartnerRepository';
import { currencyFormat } from '../../utilies/index';
import BusinessPartner from '../../models/BusinessParter';
import { useMemo } from 'react';
import Users from '@/models/Users';
import requesterRepository from '@/services/actions/requesterRepository';
import InitializeData from '../../services/actions/index';


interface RequesterModalProps {
  open: boolean,
  onClose: () => void,
  onOk: (vendor: Users) => void
}


const RequesterModal: FC<RequesterModalProps> = ({ open, onClose, onOk }) => {
  const { data, isLoading }: any = useQuery({
    queryKey: ["requesters"],
    queryFn: () => new requesterRepository().get(),
    staleTime: Infinity,
  });

  const departmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: () => InitializeData.department(),
    staleTime: Infinity,
  });
  const departmentsData = departmentsQuery.data ?? [];

  const branchesQuery = useQuery({
    queryKey: ["branches"],
    queryFn: () => InitializeData.branches(),
    staleTime: Infinity,
  });
  const branchesData = branchesQuery?.data ?? [];

// console.log(departmentsData)
// console.log(branchesData)
// console.log(data)


const usersWithNames = data?.map((user: any) => {
    const departmentName = departmentsData.find((dept: any) => dept.Code === user.Department)?.Name ?? "";
    const branchName = branchesData.find((branch: any) => branch.Code === user.Branch)?.Name ?? "";

    return {  key: Math.random(),Department: departmentName, Branch: branchName };
  });

console.log(usersWithNames)

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 8,
  });


  const [rowSelection, setRowSelection] = React.useState({});
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "UserName",
        header: "Requester Name",
      },
      {
        accessorKey: "Branch",
        header: "Branch",
      },
      {
        accessorKey: "Department",
        header: "Department",
      },
      {
        accessorKey: "UserCode",
        header: "User Code",
      },
     
    ],
    []
  );


  return (
    <Modal
      open={open}
      onClose={onClose}
      widthClass='w-[70%]'
      title='Requester'
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
              onOk(new Users(row.original));
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

export default RequesterModal;




