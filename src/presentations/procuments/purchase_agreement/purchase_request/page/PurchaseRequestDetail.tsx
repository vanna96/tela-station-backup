import { withRouter } from "@/routes/withRouter";
import React, { Component, useEffect } from "react";
import { useParams } from "react-router-dom";
import PurchaseRequest from "@/models/PurchaseRequest";
// import { PurchaseRequestProps, PurchaseRequestDocumentLineProps } from '../../../../models/PurchaseRequest';
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
import { AttachmentLine } from "@/models/Attachment";
import Modal from "@/components/modal/Modal";
import { CircularProgress } from "@mui/material";
import BackButton from "@/components/button/BackButton";
import PurchaseRequestRepository from "@/services/purchaseRequestRepository";
import PreviewAttachment from "@/components/attachment/PreviewAttachment";
import {
  PurchaseRequestProps,
  PurchaseRequestDocumentLineProps,
} from "../../../../../models/PurchaseRequest";
import Department from "../../../../../models/Department";
import { DocumentLine } from "../../../../../models/interface/index";
import { PurchaseRequestDocumentLine } from "../../../../../models/PurchaseRequest";
import Formular from "../../../../../utilies/formular";
import DocumentHeaderComponent from '../../../../../components/DocumenHeaderComponent';

class PurchaseRequestDetail extends Component<any, any> {
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
    const data = this.props.location.state as PurchaseRequest;

    if (data) {
      setTimeout(() => this.setState({ ...data, loading: false }), 500);
    } else {
      new PurchaseRequestRepository()
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
        <DocumentHeaderComponent data={this.state} />

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
            <div className="min-h-[10rem] grid grid-cols-2 gap-2 w-full shadow-sm rounded-lg bg-white text-[12px] p-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500 ">
                    Document Numbering
                  </span>
                  <span className="w-8/12 font-medium">
                    : {this.state.docNum}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Requester</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.requester}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Requester Name</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.requesterName}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Branch</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.requesterBranch}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Department</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.requesterDepartment}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">E-mail Address</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.requesterEmail}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Status</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.documentStatus?.replace("bost_", "")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Posting Date</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.creationDate}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Valid Until</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.docDueDate}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Document Date</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.docDate}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Required Date</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.requriedDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="grow flex flex-col gap-3 p-6 shadow-sm rounded-lg bg-white">
              <Taps items={["Content", "Attachment"]}>
                <Content data={this.state} />
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

export default withRouter(PurchaseRequestDetail);

function Content(props: any) {
  const { data } = props;
  console.log(data);

  const itemColumn = useMemo(
    () => [
      // {
      //     accessorKey: "lineNum",
      //     header: "No.",

      //   },
      {
        accessorKey: "itemNo",
        header: "Item NO.", //uses the default width from defaultColumn prop
        enableClickToCopy: true,
        enableFilterMatchHighlighting: true,
        size: 88,
      },
      {
        accessorKey: "itemDescription",
        header: "Item Description", //uses the default width from defaultColumn prop
        enableClickToCopy: true,
        enableFilterMatchHighlighting: true,
        size: 88,
      },
      {
        accessorKey: "quantity",
        header: "Required Qty.",
        enableClickToCopy: true,
      },
      {
        accessorKey: "unitPrice",
        header: "Info Price",
        enableClickToCopy: true,
        // Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      },
      {
        accessorKey: "discountPercent",
        header: "Discount %	",
        enableClickToCopy: true,
      },
      {
        accessorKey: "vatGroup",
        header: "Tax Code",
        enableClickToCopy: true,
      },
      {
        accessorKey: "lineTotal",
        header: "Total (LC)	",
        enableClickToCopy: true,
        // Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      },
      {
        accessorKey: "uomCode",
        header: "UoM Code",
        enableClickToCopy: true,
      },
      //   {
      //     accessorKey: "Discount %	",
      //     header: "Item Group",
      //     Cell: ({ cell }: any) => cell.getValue(),
      //   },
      //   {
      //     accessorKey: "quantity",
      //     header: "Quantity",
      //   },
      //   {
      //     accessorKey: "unitPrice",
      //     header: "Unit Price",
      //     Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      //   },
    ],
    [data]
  );

  const serviceColumns = React.useMemo(
    () => [
      {
        accessorKey: "PlannedAmount",
        header: "Planned Amount (LC)",
        Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      },
      {
        accessorKey: "LineDiscount",
        header: "Line Discount",
        Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      },
      {
        accessorKey: "OpenAmount",
        header: "Open Amount (LC)",
        Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
      },
      {
        accessorKey: "ShppingType",
        header: "Shipping Type",
      },
      {
        accessorKey: "Project",
        header: "Project",
      },
    ],
    [data]
  );

  return (
    <div className="data-table  border-none p-0 mt-3">
      <MaterialReactTable
        columns={data?.docType === "I" ? itemColumn : serviceColumns}
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
      <div className="grow w-full grid grid-cols-2 gap-2 text-[12px] py-2">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Owner</span>
            <span className="col-span-2 font-medium">
              : {data.documentowner}
             {/* : {new OwnerRepository().find(data.documentowner)?.name} */}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Remark</span>
            <span className="col-span-2 font-medium">: {data.comments}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Total Before Discount</span>
            <span className="col-span-2 font-medium">
              : {Formular.findItemTotal(data?.documentLine)}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Freight</span>
            <span className="col-span-2 font-medium">: {data.Freight}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Tax</span>
            <span className="col-span-2 font-medium">: {data.vatSumSys}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Total Payment Due</span>
            <span className="col-span-2 font-medium">: {data.docTotalSys}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
