// import React, { useMemo } from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import { IoMdClose } from "react-icons/io";
// import MaterialReactTable from "material-react-table";
// import { useQuery } from "react-query";
// import request from "utils/request";
// import { Button } from "@mui/material";
// import businessPartner from "../../repositories/business_parnter";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "70%",
//   bgcolor: "background.paper",
//   borderRadius: "6px",
//   boxShadow: 24,
//   p: 4,
// };


// const VendorType = {
//   SUPPLIER: 'cSupplier',
//   CUSTOMER: 'cCustomer',
// }

// const VendorModal = ({ open, onClose, onOk, type = VendorType.SUPPLIER }) =>
// {
//   const { data, isLoading } = useQuery({
//     queryKey: ["BusinessPartners"],
//     queryFn: () => businessPartner.getAll(),
//     staleTime: Infinity,
//   });

//   const vendors = React.useMemo(() => data?.filter((e) => e?.CardType === type), [data]);



//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const [rowSelection, setRowSelection] = React.useState({});

//   const handlerConfirm = () =>
//   {
//     let codes = Object.keys(rowSelection);
//     const temp = vendors.find((e) => e?.CardCode === codes[0]);

//     let addressLine1 = temp?.BPAddresses?.find((e) => e.AddressName === temp?.ShipToDefault);
//     let addressLine2 = temp?.BPAddresses?.find((e) => e.AddressName === temp?.BilltoDefault);

//     const vendor = {
//       ...temp,
//       AddressLine1: `${ addressLine1?.Street }, ${ addressLine1?.City ?? '' }`,
//       AddressLine2: `${ addressLine2?.Street }, ${ addressLine2?.City ?? '' }`,
//       CardCode: temp?.CardCode,
//       CardName: temp?.CardName,
//       ContactEmployees: temp?.ContactEmployees ?? [],
//       Currency: temp?.Currency,
//       EmailAdress: temp?.EmailAddress,
//       OwnerCode: temp?.OwnerCode,
//       // PayTermsGrpCode: temp?.PayTermsGrpCode,
//       // PeymentMethodCode: temp?.PeymentMethodCode,
//       PaymentTerms: temp?.PayTermsGrpCode,
//       PaymentMethod: temp?.PeymentMethodCode,
//       Phone: temp?.Phone1,
//       PriceListNum: temp?.PriceListNum,
//       SalePersonCode: temp?.SalesPersonCode,
//       ShippingType: temp?.ShippingType,
//       VatGroup: temp?.VatGroup,
//       ContactPersonCode: temp?.ContactEmployees?.[0]?.InternalCode,
//     }
//     if (onOk) onOk(vendor)

//     onClose();
//   }



//   return (
//     <Modal
//       //   keepMounted
//       open={open}
//       onClose={onClose}
//       aria-labelledby="keep-mounted-modal-title"
//       aria-describedby="keep-mounted-modal-description"
//       className="p-10"
//     >
//       <Box sx={style}>
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-xl xl:text-lg font-bold">Vendor</h2>
//           <div
//             role="button"
//             onClick={onClose}
//             className="text-xl xl:text-lg font-bold hover:bg-gray-100 rounded-sm p-2"
//           >
//             <IoMdClose />
//           </div>
//         </div>
//         <hr />
//         <div className="data-table mt-4 overflow-auto">

//         </div>
//         <div className="mt-4 flex justify-end gap-3">
//           <Button variant="outlined" size="medium" onClick={onClose} disableElevation><span className="text-xs">Cancel</span></Button>
//           <Button variant="contained" size="medium" disableElevation><span className="text-xs" onClick={handlerConfirm}>Confirm</span></Button>
//         </div>
//       </Box>
//     </Modal>
//   );
// };

// export default VendorModal;


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
    queryKey: ["venders"],
    queryFn: () => new BusinessPartnerRepository().get(),
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




