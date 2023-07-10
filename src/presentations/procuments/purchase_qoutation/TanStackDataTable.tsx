import React, { useState } from 'react'
import { Button, MenuItem, Select } from "@mui/material";
import {
  flexRender, getCoreRowModel, getPaginationRowModel, useReactTable
} from './../../../../node_modules/material-react-table/node_modules/@tanstack/react-table/src/index';
import { AiOutlineSetting } from 'react-icons/ai';
 
 
interface TanStackDataTableProps{
  data: any[],
  columns: any[],
}
  



const TanStackDataTable = (props: TanStackDataTableProps) => {
const [data] = React.useState([...props?.data])
  const [columns] = React.useState([...props?.columns])

  const table = useReactTable<any>({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })
  console.log(table.options?.data);

  const [state, setState] = React.useState(table.initialState);

  table.setOptions((prev): any => ({
    ...prev,
    state,
    onStateChange: setState,
    debugTable: state.pagination.pageIndex > 2,
  }))
  // const refreshData = () => setData(() => [...data1])
  return (
    <div>
      <div className=" data-table p-[25px] border rounded-md shadow-sm border-slate-200">
        <div className="flex justify-end ">
          <Button className="px-5 flex items-center rounded-sm text-md p-2">
            <AiOutlineSetting />
            <span className='text-[12px] ml-2'> Setting</span>
          </Button>
        </div>
        {/* Table controller */}
        <div className="w-[full] xl:overflow-x-auto">
          <table
            className="w-full xl:min-w-[1100px] mt-4 shadow-sm border-collapse overflow-auto">
            <thead >
              {table.getHeaderGroups().map((headerGroup): any => (
                <tr key={headerGroup?.id} className="shadow-md shadow-gray-300 h-[38px]">
                  {headerGroup.headers.map((header): any => (
                    <th
                      className="t-sha relative border-[0.5px] border-gray-300 border-b-[1px] px-[15px]  text-left text-[14.5px]"
                      colSpan={header?.colSpan}
                      style={{
                        width: header?.getSize(),
                      }}
                      key={header.id}

                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      <div
                        className="absolute shadow-md shadow-gray-300 bg-gray-300 select-none touch-none cursor-col-resize w-[4.5px] rounded-full hover:bg-gray-500 transition-all duration-300 top-1 right-2 h-[80%]"
                        onMouseDown={header?.getResizeHandler()}
                        onTouchStart={header?.getResizeHandler()}
                      >
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr className={`hover:bg-[#dfe5eb] hover:h-[46px] h-[44px] transition-all duration-500" `} key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td className="px-[15px] relative  text-[14px] text-black text-left border-[2px] border-gray-200 " key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* footer controller  */}
        <div className="h-6" />
        <div className="flex rounded-md justify-end items-center gap-2">
          <span className="flex text-sm mx-[20px] items-center gap-1">
            <div className="flex items-center">
              <span className="text-[15px] mt-[.5px] mr-4"> Row Per Page</span>
              <div className="bg-red-500]">
                <Select
                  className={`text-[15px] h-[30px] border-none select`}
                  sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                  }} value={table.getState().pagination.pageSize}

                  onChange={(e): any => {
                    table.setPageSize(Number(e.target.value))
                  }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <MenuItem className="text-[10px] select" value={pageSize}>{pageSize}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="text-[16px]  ml-5 mr-3">Page</div>
            <span className=" text-sky-500 font-semibold text-[14px]">
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
          </span>
          <Button
            style={{ minWidth: '5px' }}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
              <path fill-rule="evenodd" d="M13.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </Button>

          <Button
            style={{ minWidth: '5px' }}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </Button>
          <Button
            style={{ minWidth: '5px' }}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Button>
          <Button
            style={{ minWidth: '5px' }}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
              <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TanStackDataTable