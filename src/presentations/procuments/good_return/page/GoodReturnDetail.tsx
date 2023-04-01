import { withRouter } from '@/routes/withRouter';
import React, { Component, useEffect } from 'react'
import Taps from '@/components/button/Taps';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { currencyDetailFormat, currencyFormat, dateFormat, discountFormat, fileToBase64 } from '@/utilies';
import Modal from '@/components/modal/Modal';
import PreviewAttachment from '@/components/attachment/PreviewAttachment';
import { CircularProgress } from '@mui/material';
import DocumentHeaderComponent from '@/components/DocumenHeaderComponent';
import OwnerRepository from '@/services/actions/ownerRepository';
import PaymentTermTypeRepository from '@/services/actions/paymentTermTypeRepository';
import ShippingTypeRepository from '@/services/actions/shippingTypeRepository';
import BusinessPartner, { ContactEmployee } from '@/models/BusinessParter';
import BuyerRepository from '@/services/actions/BuyerRepository';
import BusinessPartnerRepository from '@/services/actions/bussinessPartnerRepository';
import PurchaseQoutationRepository from '../../../../services/actions/purchaseQoutationRepository';
import GoodReturn from '@/models/GoodReturn';
import GoodReturnRepository from '@/services/goodReturnRepository';
import SalePersonRepository from '../../../../services/actions/salePersonRepository';
import Formular from '@/utilies/formular';


class GoodReturnDetail extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      isError: false,
      message: '',
    }

    this.initData = this.initData.bind(this);
  }


  componentDidMount(): void {
    this.initData()
  }

  initData() {
    const { id } = this.props.match.params;
    const data = this.props.location.state as GoodReturn;
    console.log(data);

    if (data) {
      setTimeout(() => {
        let goodReturn = data;
        goodReturn as GoodReturn;
        if (goodReturn.contactPersonCode) {
          new BusinessPartnerRepository().findContactEmployee(goodReturn.cardCode!).then((res: BusinessPartner) => {
            goodReturn.contactPersonList = res.contactEmployee || [];
            this.setState({ ...goodReturn, loading: false })
          })
        } else {
          this.setState({ ...goodReturn, loading: false })
        }
      }, 500)
    } else {
      new GoodReturnRepository().find(id).then((res: any) => {
        this.setState({ ...res, loading: false });
      }).catch((e: Error) => {
        this.setState({ isError: true, message: e.message });
      })
    }
  }

  render() {


    return (
      <div className='w-full h-full flex flex-col p-4 gap-4'>
        <DocumentHeaderComponent data={this.state} />

        <Modal open={this.state.isError} title='Oop' onClose={() => { }} onOk={() => console.log(this.props.history.goBack())}>
          <span>
            {this.state?.message}
          </span>
        </Modal>

        {this.state.loading ? <div className='grow flex justify-center items-center'>
          <CircularProgress />
        </div> :
          (<>
            <div className='min-h-[10rem] grid grid-cols-2 gap-3 w-full shadow-sm rounded-lg bg-white text-[12px] p-6'>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500'>Document Number</span>
                  <span className='w-8/12 font-medium'>: {this.state.docNum || "N/A"}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500'>Vendor</span>
                  <span className='w-8/12 font-medium'>: {this.state.cardCode || "N/A"}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500'>Name</span>
                  <span className='w-8/12 font-medium'>: {this.state.cardName || "N/A"}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500'>Contact Person</span>
                  <span className='w-8/12 font-medium'>: {this.state?.contactPersonList?.find((e: ContactEmployee) => e.id === this.state.contactPersonCode)?.name || "N/A"}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500'>Vendor Ref .No</span>
                  <span className='w-8/12 font-medium'>:{this.state?.numAtCard || " N/A"}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500 '>Local Currency</span>
                  <span className='w-8/12 font-medium'>: {this.state.docCurrency || "N/A"}</span>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500'>Status</span>
                  <span className='w-8/12 font-medium'>: {this.state.documentStatus?.replace('bost_', '') || "N/A"}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500'>Posting Date</span>
                  <span className='w-8/12 font-medium'>: {dateFormat(this.state.docDate) || "N/A"}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500'>Return Date </span>
                  <span className='w-8/12 font-medium'>: {dateFormat(this.state.docDueDate) || "N/A"}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='w-4/12 text-gray-500'>Document Date</span>
                  <span className='w-8/12 font-medium'>: {dateFormat(this.state.taxDate) || "N/A"}</span>
                </div>
                

              </div>
            </div>
            <div className='grow flex flex-col gap-3 p-6 shadow-sm rounded-lg bg-white'>
              <Taps
                items={['Content', 'Logistic', 'Account', 'Attachment']}
              >
                <Content data={this.state} />
                <Logistic data={this.state} />
                <Account data={this.state} />

                <PreviewAttachment attachmentEntry={this.state.attachmentEntry || "N/A"} />
              </Taps>
            </div>
          </>)

        }

      </div>
    )
  }
}

export default withRouter(GoodReturnDetail);



function Content(props: any) {

  const { data } = props;

  const itemColumn = useMemo(() => [
    {
      accessorKey: "itemCode",
      header: "Item NO.", //uses the default width from defaultColumn prop
      enableClickToCopy: true,
      enableFilterMatchHighlighting: true,
      size: 88,
    },
    {
      accessorKey: "itemDescription",
      header: "Descriptions",

    },
    {
      accessorKey: "quantity",
      header: "	Required Qty.",
      enableClickToCopy: true,
    },
    {
      accessorKey: "unitPrice",
      header: "Info Price",
      Cell: ({ cell }: any) => currencyDetailFormat(cell.getValue()),
    },
    {
      accessorKey: "discountPercent",
      header: "	Discount",
      Cell: ({ cell }: any) => discountFormat(cell.getValue()),
    },
    {
      accessorKey: "vatGroup",
      header: "Tax Code",
      Cell: ({ cell }: any) => cell.getValue(),
    },
    {
      accessorKey: "lineTotal",
      header: "Total (LC)",
      Cell: ({ cell }: any) => currencyDetailFormat(cell.getValue()),
      enableClickToCopy: true,
    },
    {
      accessorKey: "uomCode",
      header: "UoM Code",
      Cell: ({ cell }: any) => cell.getValue(),
    },
  ], [data]);

  const serviceColumns = React.useMemo(
    () => [
      {
        accessorKey: "itemDescription",
        header: "	Descrition",
        Cell: ({ cell }: any) => cell.getValue(),
    
      },
      {
        accessorKey: "shipDate",
        header: "Qouted date",
        Cell: ({ cell }: any) => dateFormat(cell.getValue()),
      },
      {
        accessorKey: "requiredDate",
        header: "Required Date",
        Cell: ({ cell }: any) => dateFormat(cell.getValue()),
      },
      {
        accessorKey: "accountCode",
        header: "G/L Account",
        Cell: ({ cell }: any) => cell.getValue(),
      },
      {
        accessorKey: "accountName",
        header: "G/L Account Name",
        Cell: ({ cell }: any) => cell.getValue(),
      },
      {
        accessorKey: "vatGroup",
        header: "Tax Code",
        Cell: ({ cell }: any) => cell.getValue(),
      },
      {
        accessorKey: "lineTotal",
        header: "Total (LC)",
        Cell: ({ cell }: any) => currencyDetailFormat(cell.getValue()),
      },
      {
        accessorKey: "blanketAgreementNumber",
        header: "BlanketAgreementNumber",
        Cell: ({ cell }: any) => cell.getValue(),
      },
    ],
    [data]
  );

  return <div className="data-table  border-none p-0 mt-3">
    <MaterialReactTable
      columns={data?.docType === 'I' ? itemColumn : serviceColumns}
      data={data?.items || []}
      enableHiding={true}
      initialState={{ density: "compact" }}
      enableDensityToggle={false}
      enableColumnResizing
      enableStickyHeader={true}
      enableStickyFooter={true}
      enableTableHead={true}
      enableTopToolbar={false}
      enableColumnActions={false}
      enableGlobalFilter={false}
      enableFilters={false}
      enableFullScreenToggle={false}
      enablePagination={false}
      getRowId={(row: any) => row.DocEntry}
      state={{
        // isLoading: true,
      }}
    />
    <div className='flex flex-col gap-3'>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Buyer</span>
        <span className="w-8/12 font-medium text-sm">
          : {new SalePersonRepository().find(data?.salesPersonCode)?.name || "N/A"}
        </span>
      </div>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Owner</span>
        <span className="w-8/12 font-medium text-sm">
          : {new OwnerRepository().find(data?.documentsOwner)?.name || "N/A"}

        </span>
      </div>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Total Before Discount</span>
        <span className='w-8/12 font-medium text-sm'>: {currencyFormat(Formular.findItemTotal(data?.items)) ?? ""}</span>
      </div>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Discount</span>
        <span className='w-8/12 font-medium text-sm'>: {data?.docDiscountPercent || "N/A"}{data?.docDiscountPrice}</span>
      </div>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Freight</span>
        <span className='w-8/12 font-medium text-sm'>: {data?.as || "N/A"}</span>
      </div>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Tax</span>
        <span className='w-8/12 font-medium text-sm'>:{data?.vatSum}</span>
      </div>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Total Payment Due</span>
        <span className='w-8/12 font-medium text-sm'>:{data?.docTotalSys} </span>
      </div>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Applied Amount</span>
        <span className='w-8/12 font-medium text-sm'>:{data?.appliedAmount} </span>
      </div>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Balance Due</span>
        <span className='w-8/12 font-medium text-sm'>:{data?.BalanceDue} </span>
      </div>
      <div className='flex gap-2'>
        <span className='w-4/12 text-gray-500 text-sm'>Remark</span>
        <span className='w-8/12 font-medium text-sm'>: {data?.comments || "N/A"}</span>
      </div>
    </div>
  </div>

}
function Account(props: any) {
  const { data }: any = props;

  return <div className='grow w-full grid grid-cols-2 gap-2 text-sm py-2'>
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Jounral Remark</span> <span className='col-span-2 font-medium'>: {data.journalMemo?.replace('at', '') || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Payment Terms</span> <span className='col-span-2 font-medium'>: {new PaymentTermTypeRepository().find(data.paymentGroupCode)?.PaymentTermsGroupName || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Payment Methods</span> <span className='col-span-2 font-medium'>: {data.paymentMethod || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Central Bank Ind.</span> <span className='col-span-2 font-medium'>: {data.CentralBankIndicator || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Installments</span> <span className='col-span-2 font-medium'>: {data.NumberOfInstallments || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Manually Recalculate Due Date</span> <span className='col-span-2 font-medium'>: {data.StartFrom || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Cash Discount Date Offset</span> <span className='col-span-2 font-medium'>: {data.cashDiscountDateOffset || "N/A"}</span></div>
    </div>
    <div className='flex flex-col gap-2'>
    <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Business partner Project</span> <span className='col-span-2 font-medium'>: {data.project || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Create QR Code From</span> <span className='col-span-2 font-medium'>: {data.createQRCodeFrom || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Cancellation Date</span> <span className='col-span-2 font-medium'>: {dateFormat(data.cancelDate || "N/A")}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Indicator</span> <span className='col-span-2 font-medium'>: {data.indicator || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Federal Tax ID</span> <span className='col-span-2 font-medium'>: {data.federalTaxID || "N/A"}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Order Number</span> <span className='col-span-2 font-medium'>: {data.importFileNum || "N/A"}</span></div>
    </div>

  </div>
}

function Logistic(props: any) {
  const { data }: any = props;

  return <div className='grow w-full grid grid-cols-2 gap-2 text-sm py-2'>
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500 '>Ship To</span> <span className='col-span-2 font-medium'>: {data.address2}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Pay To</span> <span className='col-span-2 font-medium'>: {data.address}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Shiping Type</span> <span className='col-span-2 font-medium'>:  {new ShippingTypeRepository().find(data.shippingType)?.Name}</span></div>

    </div>
  </div>
}
