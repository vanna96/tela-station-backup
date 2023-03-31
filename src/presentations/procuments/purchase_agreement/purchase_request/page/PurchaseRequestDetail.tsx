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
import OwnerRepository from '@/services/actions/ownerRepository';
import DepartmentRepository from '@/services/actions/departmentRepository';
import { dateFormat } from '../../../../../utilies/index';
import BranchRepository from '../../../../../services/actions/branchRepository';

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
          onClose={() => { }}
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
                    : {new BranchRepository().find(this.state.requesterBranch)?.Name}
                    {/* : {new Branchrepository().find(this.state.requesterBranch)?.name} */}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Department</span>
                  <span className="w-8/12 font-medium">
                    {/* : {this.state.requesterDepartment} */}
                    : {new DepartmentRepository().find(this.state.requesterDepartment)?.Name}

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
                    : {this.state.status?.replace("bost_", "")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Posting Date</span>
                  <span className="w-8/12 font-medium">
                    : {dateFormat(this.state.docDate)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Valid Until</span>
                  <span className="w-8/12 font-medium">
                    : {dateFormat(this.state.docDueDate)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Document Date</span>
                  <span className="w-8/12 font-medium">
                    : {dateFormat(this.state.taxDate)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Required Date</span>
                  <span className="w-8/12 font-medium">
                    : {dateFormat(this.state.requriedDate)}
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
        accessorKey: "itemCode",
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
        size: 200,
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
        accessorKey: "itemDescription",
        header: "Description",
        Cell: ({ cell }: any) => (cell.getValue()),
      },
      {
        accessorKey: "requiredDate",
        header: "Required Date",
        Cell: ({ cell }: any) => dateFormat(cell.getValue()),
      },
      {
        accessorKey: "lineVendor",
        header: "Vendor",
        Cell: ({ cell }: any) => (cell.getValue()),
      },
      {
        accessorKey: "accountCode",
        header: "G/L Account",
      },
      {
        accessorKey: "accountNameD",
        header: "G/L Account Name",
      },
      {
        accessorKey: "vatGroup",
        header: "Tax Code",
      },
      {
        accessorKey: "lineTotal",
        header: "Total (LC)",
        Cell: ({ cell }: any) => currencyFormat(cell.getValue()),

      },
    ],
    [data]
  );

  return (
    <div className="data-table  border-none p-0 mt-3">
      <MaterialReactTable
        columns={data?.docType === "I" ? itemColumn : serviceColumns}
        data={data?.items ?? []}
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
              {/* : {data.documentowner} */}
              : {(new OwnerRepository().find(data.owner)?.name) || "N/A"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Remark</span>
            <span className="col-span-2 font-medium">: {data?.comments ?? "N/A"}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Total Before Discount</span>
            <span className="col-span-2 font-medium">
              : {currencyFormat(Formular.findItemTotal(data?.items)) ?? ""}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Freight</span>
            <span className="col-span-2 font-medium">: {data.Freight}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Tax</span>
            <span className="col-span-2 font-medium">: {currencyFormat(data.vatSumSys)}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Total Payment Due</span>
            <span className="col-span-2 font-medium">: {currencyFormat(data.docTotalSys)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
