import { withRouter } from "@/routes/withRouter";
import React, { Component, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  PurchaseAgreementProps,
  PurchaseAgreementDocumentLineProps,
} from "../../../../models/PurchaseAgreement";
import EditIcon from "@mui/icons-material/Edit";
import {
  HiOutlineEye,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineDocumentAdd,
  HiOutlineChevronDown,
} from "react-icons/hi";
import Taps from "@/components/button/Taps";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { currencyFormat, fileToBase64 } from "@/utilies";
import { AttachmentLine } from "../../../../models/Attachment";
import Modal from "@/components/modal/Modal";
import PreviewAttachment from "@/components/attachment/PreviewAttachment";
import { CircularProgress } from "@mui/material";
import BackButton from "@/components/button/BackButton";
// import purchaseQoutationRepository from '@/services/actions/purchaseQoutationRepository';
// import PurchaseQouatation from '@/models/PurchaseQouatation';
import PurchaseOrderRepository from "@/services/actions/purchaseOrderRepository";
import PurchaseOrder from "@/models/PurchaseOrder";

class PurchaseOrderDetail extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      isError: false,
      message: "",
    };

    this.initData = this.initData.bind(this);
  }

  componentDidMount(): void {
    this.initData();
  }

  initData() {
    const { id } = this.props.match.params;
    const data = this.props.location.state as PurchaseOrder;
    console.log(data);

    if (data) {
      setTimeout(() => this.setState({ ...data, loading: false }), 500);
    } else {
      new PurchaseOrderRepository()
        .find(id)
        .then((res: any) => {
          this.setState({ ...res, loading: false });
        })
        .catch((e: Error) => {
          this.setState({ isError: true, message: e.message });
        });
    }
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col p-4 gap-4">
        <div className="flex justify-between items-center bg-white p-2 rounded-lg px-6 shadow-sm">
          <div className="flex gap-2 items-center">
            <BackButton />
            <h1 className="font-bold">Purchase Qoutation</h1>
            {/* <span className='text-[12px] border border-blue-400 font-medium  px-2 rounded '>{this.state.status?.replace('as', '')}</span> */}
          </div>
          <div className="text-[12px] flex gap-3">
            <div
              role="button"
              className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 border hover:text-blue-500 text-[12px]"
            >
              Edit
            </div>
            <div
              role="button"
              className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 border hover:text-blue-500 text-[12px]"
            >
              Copy To
            </div>
            <div
              role="button"
              className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"
            >
              <HiOutlineDocumentAdd className="" />
            </div>
            <div
              role="button"
              className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"
            >
              <HiChevronDoubleLeft className="" />
            </div>
            <div
              role="button"
              className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"
            >
              <HiChevronLeft className="" />
            </div>
            <div
              role="button"
              className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"
            >
              <HiChevronRight className="" />
            </div>
            <div
              role="button"
              className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"
            >
              <HiChevronDoubleRight className="" />
            </div>
            <div className="mx-2"></div>
          </div>
        </div>

        <Modal
          open={this.state.isError}
          title="Oop"
          onClose={() => {}}
          onOk={() => console.log(this.props.history.goBack())}
        >
          <span>{this.state?.message}</span>
        </Modal>

        {this.state.loading ? (
          <div className="grow flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="min-h-[10rem] grid grid-cols-2 gap-3 w-full shadow-sm rounded-lg bg-white text-[12px] p-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Document Number</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.docNum}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Vendor</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.cardCode}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Name</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.cardName}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Contact Person</span>
                  <span className="w-8/12 font-medium">: N/A</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Vendor Ref .No</span>
                  <span className="w-8/12 font-medium"> : {this.state.numAtCard}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500 ">Local Currency</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.docCurrency}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Status</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.documentStatus?.replace("bost_", "")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Posting Date</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.docDate}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Delivery Date</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.docDueDate}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Document Date</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.taxDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="grow flex flex-col gap-3 p-6 shadow-sm rounded-lg bg-white">
              <Taps items={["Content", "Logistic", "Accountting", "Attachment"]}>
                <Content data={this.state} />
                <Logistic data={this.state} />
                <Account data={this.state} />

                <PreviewAttachment
                  attachmentEntry={this.state.attachmentEntry}
                />
              </Taps>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(PurchaseOrderDetail);

function Content(props: any) {
  const { data } = props;

  const itemColumn = useMemo(
    () => [
      {
        accessorKey: "itemNo",
        header: "Item NO.", //uses the default width from defaultColumn prop
        enableClickToCopy: true,
        enableFilterMatchHighlighting: true,
        size: 88,
      },
      {
        accessorKey: "quantity",
        header: "  Required Qty.",
        enableClickToCopy: true,
      },
      {
        accessorKey: "unitPrice",
        header: "Info Price",
        Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      },
      {
        accessorKey: "discountPercent",
        header: "  Discount %",
        Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      },
      {
        accessorKey: "vatGroup",
        header: "Tax Code",
        Cell: ({ cell }: any) => cell.getValue(),
      },
      {
        accessorKey: "LineTotal",
        header: "Total (LC)",
        Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      },
      {
        accessorKey: "uomCode ",
        header: "UoM Code",
        Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      },
    ],
    [data]
  );

  const serviceColumns = React.useMemo(
    () => [
      {
        accessorKey: "itemDescription",
        header: "  Descrition",
        Cell: ({ cell }: any) => cell.getValue(),
      },
      {
        accessorKey: "shipDate",
        header: "Qouted date",
        Cell: ({ cell }: any) => cell.getValue(),
      },
      {
        accessorKey: "requiredDate",
        header: "Required Date",
        Cell: ({ cell }: any) => cell.getValue(),
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
        Cell: ({ cell }: any) => cell.getValue(),
      },
      {
        accessorKey: "blanketAgreementNumber",
        header: "BlanketAgreementNumber",
        Cell: ({ cell }: any) => cell.getValue(),
      },
    ],
    [data]
  );

  return (
    <div className="data-table  border-none p-0 mt-3">
      <MaterialReactTable
        columns={
          data?.docType === "dDocument_Items" ? serviceColumns : itemColumn
        }
        data={data?.documentLine ?? []}
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
        state={
          {
            // isLoading: true,
          }
        }
      />
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <span className="w-4/12 text-gray-500 text-sm">Buyer</span>
          <span className="w-8/12 font-medium text-sm">: {data?.Buyer}</span>
        </div>
        <div className="flex gap-2">
          <span className="w-4/12 text-gray-500 text-sm">Owner</span>
          <span className="w-8/12 font-medium text-sm">: </span>
        </div>
        <div className="flex gap-2">
          <span className="w-4/12 text-gray-500 text-sm">
            Total Before Discount
          </span>
          <span className="w-8/12 font-medium text-sm">: </span>
        </div>
        <div className="flex gap-2">
          <span className="w-4/12 text-gray-500 text-sm">Freight</span>
          <span className="w-8/12 font-medium text-sm">: </span>
        </div>
        <div className="flex gap-2">
          <span className="w-4/12 text-gray-500 text-sm">Tax</span>
          <span className="w-8/12 font-medium text-sm">:</span>
        </div>
        <div className="flex gap-2">
          <span className="w-4/12 text-gray-500 text-sm">
            Total Payment Due
          </span>
          <span className="w-8/12 font-medium text-sm">: </span>
        </div>
        <div className="flex gap-2">
          <span className="w-4/12 text-gray-500 text-sm">Remark</span>
          <span className="w-8/12 font-medium text-sm">: {data?.comments}</span>
        </div>
      </div>
    </div>
  );
}
function Account(props: any) {
  const { data }: any = props;

  return (
    <div className="grow w-full grid grid-cols-2 gap-2 text-sm py-2">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Jounral Remark</span>{" "}
          <span className="col-span-2 font-medium">
            : {data.journalMemo?.replace("at", "")}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Payment Terms</span>{" "}
          <span className="col-span-2 font-medium">: {data.paymentTerm}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Payment Methods</span>{" "}
          <span className="col-span-2 font-medium">: {data.paymentMethod}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Manually Recalulate Due Date</span>{" "}
          <span className="col-span-2 font-medium">: {data.paymentMethod}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Cash Discount Date Offset</span>{" "}
          <span className="col-span-2 font-medium">
            : {data.cashDiscountDateOffset}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Bussiness partner Projec</span>{" "}
          <span className="col-span-2 font-medium">: {data.project}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Create QR Code From</span>{" "}
          <span className="col-span-2 font-medium">
            : {data.status?.replace("as", "")}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Cancellation Date</span>{" "}
          <span className="col-span-2 font-medium">: {data.owner}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Indicator</span>{" "}
          <span className="col-span-2 font-medium">
            : {data.remindTime} {data.remindUnit?.replace("reu_", "")}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Federal Tax ID</span>{" "}
          <span className="col-span-2 font-medium">: {data.federalTaxID}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Order Number</span>{" "}
          <span className="col-span-2 font-medium">
            : {data.remindTime} {data.remindUnit?.replace("reu_", "")}
          </span>
        </div>
      </div>
    </div>
  );
}

function Logistic(props: any) {
  const { data }: any = props;

  return (
    <div className="grow w-full grid grid-cols-2 gap-2 text-sm py-2">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500 ">Ship To</span>{" "}
          <span className="col-span-2 font-medium">: {data.address2}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Pay To</span>{" "}
          <span className="col-span-2 font-medium">: {data.address}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="text-gray-500">Shiping Type</span>{" "}
          <span className="col-span-2 font-medium">: {data.paymentMethod}</span>
        </div>
      </div>
    </div>
  );
}
