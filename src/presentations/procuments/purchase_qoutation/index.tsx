import React from "react";
import MaterialReactTable from "material-react-table";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment/moment";
//Date Picker Imports
import { useNavigate } from "react-router-dom";
import { useQueryHook } from '../../../utilies/useQueryHook';
import { UseQueryResult, useQuery } from "react-query";
import purchaseQoutationRepository from "@/services/actions/purchaseQoutationRepository";
import PurchaseQoutationRepository from "@/services/actions/purchaseQoutationRepository";
import DataTable from "@/components/data_table/DataTable";



export default function PurchaseQoutationLists() {
  const route = useNavigate();



  const columns = React.useMemo(
    () => [
      {
        accessorKey: "DocNum",
        header: "Doc Num", //uses the default width from defaultColumn prop
        enableClickToCopy: true,
        enableFilterMatchHighlighting: true,
        size: 88,
        visible: true,
        type: 'number',
      },
      {
        accessorKey: "CardCode",
        header: "Vendor Code",
        enableClickToCopy: true,
        visible: true,
        type: 'string',
      },
      {
        accessorKey: "CardName",
        header: "Vendor Name",
        visible: true,
        type: 'string',
        // size: 200, //increase the width of this column
      },
      {
        accessorKey: "DocumentStatus",
        header: "Status", //uses the default width from defaultColumn prop
        enableClickToCopy: true,
        enableFilterMatchHighlighting: true,
        size: 88,
        visible: false,
        type: 'string',
        Cell: ({ cell }: any) => (
          <>
            {cell.getValue()?.replace('bost_', '')}
          </>
        ),
      },
      {
        accessorKey: "DocType",
        header: "Document Type", //uses the default width from defaultColumn prop
        enableClickToCopy: true,
        enableFilterMatchHighlighting: true,
        size: 88,
        visible: false,
        type: 'string',
        Cell: ({ cell }: any) => (
          <>
            {cell.getValue()?.replace('dDocument_', '')}
          </>
        ),
      },
      {
        accessorKey: "DocDate",
        header: "Posting Date",
        visible: true,
        type: 'date',
        Cell: ({ cell }: any) => (
          <>
            {moment(cell.getValue()).format('DD-MM-YYYY')}
          </>
        ),
      },
      {
        accessorKey: "DocDueDate",
        header: "Delivery Date",
        visible: true,
        type: 'date',
        Cell: ({ cell }: any) => (
          <>
            {moment(cell.getValue()).format('DD-MM-YYYY')}
          </>
        ),

      },
      {
        accessorKey: "DocEntry",
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
              route('/procument/purchase-qoutation/' + cell.row.original.DocEntry, { state: cell.row.original, replace: true })
            }}>
              <VisibilityIcon fontSize="small" className="text-gray-600 " />
            </button>
            <button title="back"
              onClick={() => route('/procument/purchase-qoutation/' + cell.row.original.DocEntry + '/edit', { state: cell.row.original, replace: true })}
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
    queryKey: ['pq-count'], queryFn: () => new purchaseQoutationRepository().documentTotal(`?$select=DocNum${filter}`),
    staleTime: Infinity
  })

  const { data, isLoading, error, isError, refetch, isFetching }: any = useQuery({
    queryKey: ['pq', `${(pagination.pageIndex) * 10}_${filter !== '' ? 'f' : ''}`], queryFn: () => {
      return new PurchaseQoutationRepository().get(`?$top=${pagination.pageSize}&$skip=${(pagination.pageIndex) * pagination.pageSize}${filter}${sortBy !== '' ? '&$orderby=' + sortBy : ''}`);
    },
    staleTime: Infinity,
    retry: 1,
  });


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
      <div className="w-full h-full p-4 2xl:py-6 flex flex-col gap-3 relative bg-gray-100">
        <div className="flex px-8 shadow-sm rounded-lg justify-between items-center sticky z-10 top-0 w-full bg-white py-3">
          <h3 className="text-lg 2xl:text-base xl:text-sm">Procument / Purchase Qoutation</h3>
          <Button variant="outlined" disableElevation size="small"
            onClick={() => route('/procument/purchase-qoutation/create')}
          >
            <span className="text-xs">Create</span>
          </Button>
        </div>


        <div className="grow data-table">
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
        </div>
      </div>
    </>
  );
}


// import React from "react";

// import { Button, MenuItem, Select } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import shortid from "shortid";
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from './../../../../node_modules/material-react-table/node_modules/@tanstack/react-table/src/index';
// import TanStackDataTable from "./TanStackDataTable";
// import { HiRefresh } from 'react-icons/hi';
// type Person = {
//   CardCode: string | undefined
//   CardName: string | undefined
//   DocNum: string | undefined
//   DocDate: string | undefined
//   DocDueDate: string | undefined
//   DocumentStatus: string | undefined
//   DocType: string | undefined
// }


// const data = [
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: "ZqOMIuidLS",
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Close",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Close",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Close",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Close",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Close",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013",
//     DocumentStatus: "Open",
//     DocType: "Items"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
//   {
//     CardCode: "V10000",
//     CardName: "Acme Associates",
//     DocNum: shortid.generate(),
//     DocDate: "13/13/2013",
//     DocDueDate: "13/13/2013"
//   },
// ]

// export default function PurchaseQoutationLists() {

//   const defaultColumns: ColumnDef<Person>[] = [
//     {
//       accessorKey: "DocNum",
//       header: "Doc Num", //uses the default width from defaultColumn prop
//       footer: "Doc Num",
//       cell: (props): any => {
//         const value: any = props?.getValue();
//         return (
//           <div className={`p-[5px] ${value === "ZqOMIuidLS" ? "" : ""}`}>{value}</div>
//         )
//       }
//     },
//     {
//       accessorKey: "CardCode",
//       header: "Vendor Code",
//       footer: "Vendor Code"
//     },
//     {
//       accessorKey: "CardName",
//       header: "Vendor Name",
//       footer: "Vendor Name"
//     },

//     {
//       accessorKey: "DocType",
//       header: "Document Type", //uses the default width from defaultColumn prop
//       footer: "Document Type"
//     },
//     {
//       accessorKey: "DocumentStatus",
//       header: "Status", //uses the default width from defaultColumn prop
//       footer: "Status",
//       cell: (props): any => {
//         const value: any = props?.getValue();
//         return (
//           <div className="flex text-sm items-center">
//             {
//               value === "Close" ? <span className="text-red-500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
//                 <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
//               </svg></span> : <span className="text-green-600 mr-[5px]"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-calendar2-check" viewBox="0 0 16 16">
//                 <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
//                 <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
//                 <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
//               </svg></span>
//             }
//             <span className={` py-[5px] rounded-[3px] ${value === "Open" ? " text-green-600" : " text-red-600"}`}>{value}</span>
//           </div>
//         )
//       }
//     },
//     {
//       accessorKey: "DocDate",
//       header: "Posting Date",
//       footer: "Posting Date"
//     },
//     {
//       accessorKey: "DocDueDate",
//       header: "Delivery Date",
//       footer: "Delivery Date"

//     },
//     {
//       accessorKey: "DocEntry",
//       header: "Action",
//       footer: "Action",
//       cell: (props): any => {
//         const value: any = props?.getValue();
//         return (
//           <div className="flex justify-center text-gray-800">
//             <div className="flex hover:transform hover:scale-105 duration-100 transition-all py-[3px] px-[7px] rounded-[5px] bg-sky-500 text-white border-[1px] mr-3 cursor-pointer items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="cursor-pointer bi bi-file-earmark-text" viewBox="0 0 16 16">
//                 <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
//                 <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
//               </svg>
//               <span className="text-[11px] ml-2 mt-[2px]">View</span>
//             </div>

//             <div className="flex hover:transform hover:scale-105 duration-100 transition-all py-[3px] px-[10px] rounded-[5px] bg-green-500 text-white border-[1px] cursor-pointer items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi cursor-pointer bi-pencil-square" viewBox="0 0 16 16">
//                 <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                 <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
//               </svg>
//               <span className="text-[11px] ml-2 mt-[2px]">Edit</span>
//             </div>
//           </div>
//         )
//       }
//     },
//   ]

//   const route = useNavigate();


//   return (
//     <>

//       {/* Header */}
//       <div className="w-full h-full p-4 2xl:py-6 flex flex-col gap-3 relative bg-gray-100">
//         <div className="flex px-8 shadow-sm rounded-lg justify-between items-center sticky z-10 top-0 w-full bg-white py-3">
//           <h3 className="text-lg 2xl:text-base xl:text-sm">Procument / Purchase Qoutation</h3>
//           <Button variant="outlined" disableElevation size="small"
//             onClick={() => route('/procument/purchase-qoutation/create')}
//           >
//             <span className="text-xs">Create</span>
//           </Button>
//         </div>

//         {/* Header controller table */}
//         <TanStackDataTable
//           data={data}
//           columns={defaultColumns}
//         // refreshData={null}
//         />
//       </div>
//     </>
//   );
// }