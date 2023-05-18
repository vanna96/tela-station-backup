// import React from "react";
// import MaterialReactTable from "material-react-table";
// import { Button, TextField } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import moment from "moment/moment";
// //Date Picker Imports
// import { useNavigate } from "react-router-dom";
// import { UseQueryResult, useQuery } from "react-query";
// import ItemMasterDataRepository from "@/services/actions/itemMasterDataRepository";

// export default function ItemMasterDataListing() {
//   const route = useNavigate();

//   const { data, isLoading }: any = useQuery({
//     queryKey: ["item-master"],
//     queryFn: () => new ItemMasterDataRepository().get(),
//   });
//   console.log(data);
//   const columns = React.useMemo(
//     () => [
//       {
//         accessorKey: "index",
//         header: "No.", //uses the default width from defaultColumn prop
//         enableClickToCopy: true,
//         enableFilterMatchHighlighting: true,
//         size: 88,
//       },
//       {
//         accessorKey: "itemCode",
//         header: "Item Code",
//         enableClickToCopy: true,
//       },
//       {
//         accessorKey: "itemName",
//         header: "Item Name",
//         enableClickToCopy: true,
//         // size: 200, //increase the width of this column
//       },
//       {
//         accessorKey: "foreignName",
//         header: "Foreign Name",
//         enableClickToCopy: true,
//         // size: 200, //increase the width of this column
//       },
//       {
//         accessorKey: "createDate",
//         header: "Create Date",
//         Cell: ({ cell }: any) => (
//           <>{moment(cell.getValue()).format("DD-MM-YYYY")}</>
//         ),
//       },
//       {
//         accessorKey: "updateDate",
//         header: "Update Date",
//         Cell: ({ cell }) => <>{moment(cell.getValue()).format("DD-MM-YYYY")}</>,
//       },

//       {
//         accessorKey: "id",
//         enableFilterMatchHighlighting: false,
//         enableColumnFilterModes: false,
//         enableColumnActions: false,
//         enableColumnFilters: false,
//         enableColumnOrdering: false,
//         header: "Action", //uses the default width from defaultColumn prop
//         Cell: (cell: any) => (
//           <div className="flex gap-4">
//             <button
//               onClick={() => {
//                 route("/master-data/item-master-data/" + cell.row.original.id, {
//                   state: cell.row.original,
//                 });
//               }}
//             >
//               <VisibilityIcon fontSize="small" className="text-gray-600 " />
//             </button>
//             <button>
//               <EditIcon fontSize="small" className="text-blue-400" />
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   return (
//     <>
//       <div className="w-full h-full p-4 2xl:py-6 flex flex-col gap-3 relative bg-gray-100">
//         <div className="flex px-8 shadow-sm rounded-lg justify-between items-center sticky z-10 top-0 w-full bg-white py-3">
//           <h3 className="text-lg 2xl:text-base xl:text-sm">
//             Item Master / Item Master Data 
//           </h3>
//           <Button
//             variant="outlined"
//             disableElevation
//             size="small"
//             onClick={() => route("/master-data/item-master-data/create")}
//           >
//             <span className="text-xs">Create</span>
//           </Button>
//         </div>

//         <div className="grow data-table">
//           <MaterialReactTable
//             columns={columns}
//             data={data ?? []}
//             enableHiding={true}
//             initialState={{ density: "compact" }}
//             enableDensityToggle={false}
//             enableColumnResizing
//             enableStickyHeader={true}
//             enableStickyFooter={true}
//             enablePagination={true}
//             muiTablePaginationProps={{
//               rowsPerPageOptions: [5, 10, 15],
//             }}
//             getRowId={(row: any) => row.DocEntry}
//             onPaginationChange={setPagination}
//             state={{
//               isLoading,
//               pagination,
//             }}
//             renderTopToolbarCustomActions={({ table }) => {
//               return (
//                 <div className="flex gap-2 mb-6 pt-2 justify-center items-center">
//                   <h3 className="font-bold text-base xl:text-sm">
//                     Item Master Data 
//                   </h3>
//                   {/* ({pagination.pageSize}/{count?.data?.data ?? 0}) */}
//                 </div>
//               );
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import ItemMasterDataRepository from "@/services/actions/itemMasterDataRepository";
import { dateFormat } from "@/utilies";
import ErrorDialogMessage from "@/components/dialog/ErrorDialogMessage";
import DataTable from "@/components/data_table/DataTable";
import moment from "moment";


export default function ItemMasterDataLists() {
  const route = useNavigate();
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "index",
        header: "No.", //uses the default width from defaultColumn prop
        enableClickToCopy: true,
        enableFilterMatchHighlighting: true,
        size: 88,
        visible: true,
        type: 'number',
      },
      {
        accessorKey: "itemCode",
        header: "Item Code",
        enableClickToCopy: true,
        visible: true,
        type: 'string',
      },
      {
        accessorKey: "itemName",
        header: "Item Name",
        enableClickToCopy: true,
        visible: true,
        type: 'string',
        // size: 200, //increase the width of this column
      },
      {
        accessorKey: "foreignName",
        header: "Foreign Name",
        enableClickToCopy: true,
        visible: true,
        type: 'string',
        // size: 200, //increase the width of this column
      },
      {
        accessorKey: "createDate",
        header: "Create Date",
        visible: true,
        type: 'date',
        Cell: ({ cell }: any) => (
          <>
            {dateFormat(cell.getValue())}
          </>
        ),
      },
      {
        accessorKey: "updateDate",
        header: "Update Date",
        visible: true,
        type: 'date',
        Cell: ({ cell }: any) => (
          <>
            {dateFormat(cell.getValue())}
          </>
        ),
      },

      {
        accessorKey: "itemCode",
        enableFilterMatchHighlighting: false,
        enableColumnFilterModes: false,
        enableColumnActions: false,
        enableColumnFilters: false,
        enableColumnOrdering: false,
        enableSorting: false,
        minSize: 100, //min size enforced during resizing
        maxSize: 100, //max size enforced during resizing
        header: "Action", //uses the default width from defaultColumn prop
        Cell: (cell: any) => (
          <div className="flex gap-4">
            <button onClick={() => {
              route('/master-data/item-master-data/' + cell.row.original.ItemCode, { state: cell.row.original, replace: true })
            }}>
              <VisibilityIcon fontSize="small" className="text-gray-600 " />
            </button>
            <button title="back"
              onClick={() => route('/master-data/item-master-data/' + cell.row.original.ItemCode + '/edit', { state: cell.row.original, replace: true })}
            >
              <EditIcon fontSize="small" className="text-blue-400" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [filter, setFilter] = React.useState('');
  const [sortBy, setSortBy] = React.useState('');
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const purchaseCount = useQuery({
    queryKey: ['item-count'], queryFn: () => new ItemMasterDataRepository().documentTotal(`?$select=ItemCode${filter}`),
    staleTime: Infinity,
  });

  const { data, isLoading, error, isError, refetch, isFetching }: any = useQuery({
    queryKey: ['item', `${(pagination.pageIndex) * 10}_${filter !== '' ? 'f' : ''}`], queryFn: () => {
      return new ItemMasterDataRepository().get(`?$top=${pagination.pageSize}&$skip=${(pagination.pageIndex) * pagination.pageSize}${filter}${sortBy !== '' ? '&$orderby=' + sortBy : ''}`);
    },
    staleTime: Infinity,
    retry: 1,
  });
  console.log(data)


  const handlerRefresh = React.useCallback(() => {
    setFilter('');
    setSortBy('');
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
    setTimeout(() => {
      purchaseCount.refetch();
      refetch();
    }, 500);
  }, []);

  const handlerSortby = (value: any) => {
    setSortBy(value);
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });

    setTimeout(() => {
      refetch();
    }, 500)
  }


  const handlerSearch = (value: string) => {
    const qurey = value.replace('CardCode', 'BPCode').replace('CardName', 'BPName');
    setFilter(qurey);
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });

    setTimeout(() => {
      purchaseCount.refetch();
      refetch();
    }, 500)
  }

  return (
    <>
      <ErrorDialogMessage key={error?.message} open={isError} title="Opp Something wrong!" message={error?.message ?? ''} />
      <div className="w-full h-full p-4 2xl:py-6 flex flex-col gap-3 relative bg-gray-100">
        <div className="flex px-8 shadow-sm rounded-lg justify-between items-center sticky z-10 top-0 w-full bg-white py-3">
          <h3 className="text-lg 2xl:text-base xl:text-sm">Master Data / Item Master Data</h3>
          <Button variant="outlined" disableElevation size="small"
            onClick={() => route('/master-data/item-master-data/create')}
          >
            <span className="text-xs">Create</span>
          </Button>

        </div>

        <DataTable
          columns={columns}
          data={data}
          handlerRefresh={handlerRefresh}
          handlerSearch={handlerSearch}
          handlerSortby={handlerSortby}
          count={purchaseCount.data ?? 0}
          loading={isLoading || isFetching}
          pagination={pagination}
          paginationChange={setPagination}
        />
      </div >
    </>
  );
}




