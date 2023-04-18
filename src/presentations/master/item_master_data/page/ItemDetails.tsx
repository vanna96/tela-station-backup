import { withRouter } from "@/routes/withRouter";
import React, { Component, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import PreviewAttachment from "@/components/attachment/PreviewAttachment";
import Department from "../../../../models/Department";
import { DocumentLine } from "../../../../models/interface/index";
import Formular from "../../../../utilies/formular";
import DocumentHeaderComponent from '../../../../components/DocumenHeaderComponent';
import OwnerRepository from '@/services/actions/ownerRepository';
import DepartmentRepository from '@/services/actions/departmentRepository';
import { dateFormat } from '../../../../utilies/index';
import BranchRepository from '../../../../services/actions/branchRepository';
import ItemMaster from "@/models/ItemMasterData";
import ItemMasterDataRepository from "@/services/actions/itemMasterDataRepository";
import ShippingTypeRepository from "@/services/actions/shippingTypeRepository";
import ItemGroupRepository from "@/services/actions/itemGroupRepository";

class ItemMasterDataDetails extends Component<any, any> {
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
    const data = this.props.location.state as ItemMaster;

    if (data) {
      setTimeout(() => this.setState({ ...data, loading: false }), 500);
    } else {
      new ItemMasterDataRepository()
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
                    Item Code
                  </span>
                  <span className="w-8/12 font-medium">
                    : {this.state.itemCode}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Item Description</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.itemName}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Foreign Name</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.foreignName}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Item Type</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.itemType.substring(2)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Item Group</span>
                  <span className="w-8/12 font-medium">
                    {/* : {this.state.itemsGroupCode} */}
                    : {new ItemGroupRepository().find(this.state.itemsGroupCode)?.GroupName}

                  </span>
                </div>

                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">UoM Group</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.itemsGroupCode}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Price Lists</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.priceLists}
                  </span>
                </div>



              </div>
              <div className="flex flex-col gap-1">

                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Barcode</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.barCode}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Unit Price</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.priceLists}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Pricing Unit</span>
                  <span className="w-8/12 font-medium">
                    : {this.state.pricingUnit}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Inventory Item </span>
                  <span className="w-8/12 font-medium">
                    : {this.state.inventoryItem}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Sales Item </span>
                  <span className="w-8/12 font-medium">
                    : {this.state.salesItem}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Purchasing Item </span>
                  <span className="w-8/12 font-medium">
                    : {this.state.purchaseItem}
                  </span>
                </div>
                {/* <div className="flex gap-2">
                  <span className="w-4/12 text-gray-500">Required Date</span>
                  <span className="w-8/12 font-medium">
                    : {dateFormat(this.state.requriedDate)}
                  </span>
                </div> */}
              </div>
            </div>
            <div className="grow flex flex-col gap-3 p-6 shadow-sm rounded-lg bg-white">
              <Taps items={["General", "Purchasing", "Sales", "Inventory", "Attachment"]}>
                <General data={this.state} />
                <Purchasing data={this.state} />
                <Sales data={this.state} />
                <Inventory data={this.state} />
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

export default withRouter(ItemMasterDataDetails);


function General(props: any) {
  const { data } = props;

  let inventoryManagementType: string = "";
  let SRIAndBatchManageMethod: string | undefined = data?.sriAndBatchManageMethod;
  if (data?.sriAndBatchManageMethod === "bomm_OnEveryTransaction") {
    SRIAndBatchManageMethod = "On Every Transaction";
  } else if (data?.SRIAndBatchManageMethod === "bomm_OnReleaseOnly") {
    SRIAndBatchManageMethod = "On Release Only";
  }

  if (
    data?.ManageBatchNumbers === "tYES" &&
    data?.ManageSerialNumbers === "tNO"
  ) {
    inventoryManagementType = "Batches";
  } else if (
    data?.ManageSerialNumbers === "tYES" &&
    data?.ManageBatchNumbers === "tNO"
  ) {
    inventoryManagementType = "Serial Numbers";
  } else if (
    data?.ManageSerialNumbers === "tNO" &&
    data?.ManageBatchNumbers === "tNO"
  ) {
    inventoryManagementType = "None";
  }

  let status: string = "";

  if (data?.Valid === "tYES" && data?.Frozen === "tNO") {
    status = "Active";
  } else if (data?.Valid === "tNO" && data?.Frozen === "tYES") {
    status = "Inactive";
  } else if (data?.Valid === "tYES" && data?.Frozen === "tYES") {
    status = "Advanced";
  } else {
    status = "N/A";
  }

  interface IData {
    ValidFrom: string | null;
    ValidTo: string | null;
    ValidRemarks: string | null;
    FrozenFrom: string | null;
    FrozenTo: string | null;
    FrozenRemarks: string | null;
  }

  interface ILabelFieldProps {
    label: string;
    children: React.ReactNode;
  }

  const LabelField = ({ label, children }: ILabelFieldProps) => {
    return (
      <div>
        <label>{label}</label>
        <span>{children}</span>
      </div>
    );
  };

  const getStatusLabel = (status: string, data: IData) => {
    switch (status) {
      case "Active":
        return (
          <>
            {data?.ValidFrom !== null && (
              <LabelField label="Active From">
                {(data?.ValidFrom)}
              </LabelField>
            )}
            {data?.ValidTo !== null && (
              <LabelField label="Active To">
                {(data?.ValidTo)}
              </LabelField>
            )}
            {data?.ValidRemarks !== null && (
              <LabelField label="Remarks">{data?.ValidRemarks}</LabelField>
            )}
          </>
        );
      case "Inactive":
        return (
          <>
            {data?.FrozenFrom && (
              <LabelField label="Inactive From">
                {(data?.FrozenFrom)}
              </LabelField>
            )}
            {data?.FrozenTo && (
              <LabelField label="Inactive To">
                {(data?.FrozenTo)}
              </LabelField>
            )}
            {data?.FrozenRemarks && (
              <LabelField label="Remarks">{data?.FrozenRemarks}</LabelField>
            )}
          </>
        );
    }


    return <div className='grow w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[12px] py-2'>
      <div className='flex flex-col gap-2'>

        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'> Withhlding Tax Liable</span> <span className='col-span-2 font-medium'>: {data.wtLiable}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Do Not Apply Discount Group</span> <span className='col-span-2 font-medium'>: {data.noDiscounts}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Manufacturer</span> <span className='col-span-2 font-medium'>: {data.manufacturer}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Additional Identifier</span> <span className='col-span-2 font-medium'>: {data.adfdf}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Shipping Type</span> <span className='col-span-2 font-medium'>:  {new ShippingTypeRepository().find(data.shipType)?.Name}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Manage Item by</span> <span className='col-span-2 font-medium'>: {data.manageitemby ?? 'N/A'}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Status</span> <span className='col-span-2 font-medium'>: {data.status ?? 'N/A'}</span></div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Standard Item Identification</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Commodity Classification</span> <span className='col-span-2 font-medium'>: {data.commodityclassificaiton}</span></div>
      </div>
    </div>
  }
}

function Purchasing(props: any) {
  const { data } = props;

  return <div className='grow w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[12px] py-2'>
    <div className='flex flex-col gap-2'>

      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Prefered Vendor
      </span> <span className='col-span-2 font-medium'>: {data.feofe}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Mfr Catalog No.</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Purchasing UoM Name</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Items Per Purchasing Unit
      </span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Packaging UoM Name
      </span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Quantity per Package
      </span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>

      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Length</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Width</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Height</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Volume</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Weight</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>



    </div>
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Factor 1</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Factor 2</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Factor 3</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Factor 4</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Customs Group</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Tax Group</span> <span className='col-span-2 font-medium'>: {data.commodityclassificaiton}</span></div>
    </div>
  </div>

}

function Sales(props: any) {
  const { data } = props;

  return <div className='grow w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[12px] py-2'>
    <div className='flex flex-col gap-2'>

      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Prefered Vendor
      </span> <span className='col-span-2 font-medium'>: {data.feofe}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Mfr Catalog No.</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Purchasing UoM Name</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Items Per Purchasing Unit
      </span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Packaging UoM Name
      </span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Quantity per Package
      </span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>

      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Length</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Width</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Height</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Volume</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Weight</span> <span className='col-span-2 font-medium'>: {data.donotapplydiscountgroup}</span></div>



    </div>
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Factor 1</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Factor 2</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Factor 3</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Factor 4</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Customs Group</span> <span className='col-span-2 font-medium'>: {'ee'}</span></div>
      <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Tax Group</span> <span className='col-span-2 font-medium'>: {data.commodityclassificaiton}</span></div>
    </div>
  </div>

}


function Inventory(props: any) {
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
      accessorKey: "itemName",
      header: "Item Description",
      enableClickToCopy: true,
    },
    {
      accessorKey: "itemGroup",
      header: "Item Group",
      Cell: ({ cell }: any) => cell.getValue(),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
    },
    {
      accessorKey: "unitPrice",
      header: "Unit Price",
      Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
    },
  ], [data]);


  return <div>
    <div className='grow w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[12px] py-2'>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'></span> Set G/L Account by<span className='col-span-2 font-medium'>: {data.status ?? 'N/A'}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'></span> UoM Name<span className='col-span-2 font-medium'>: {data.status ?? 'N/A'}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'></span> Weight<span className='col-span-2 font-medium'>: {data.status ?? 'N/A'}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'></span>Manage Inventory by Warehouse <span className='col-span-2 font-medium'>: {data.status ?? 'N/A'}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'></span> Inventory Level<span className='col-span-2 font-medium'>: {data.status ?? 'N/A'}</span></div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'> </span>Required (Purchasing UoM) <span className='col-span-2 font-medium'>: {data.commodityclassificaiton}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'> </span> Minimum<span className='col-span-2 font-medium'>: {data.commodityclassificaiton}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'> </span>Maximum <span className='col-span-2 font-medium'>: {data.commodityclassificaiton}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'> </span> Valuation Method<span className='col-span-2 font-medium'>: {data.commodityclassificaiton}</span></div>
        <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'> </span>Item Cost <span className='col-span-2 font-medium'>: {data.commodityclassificaiton}</span></div>
      </div>
    </div>
    <div className="data-table  border-none p-0 mt-3">

    </div>
    <div className='grow w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[12px] py-2'>
    </div>
    <MaterialReactTable
      columns={itemColumn}
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
      state={{
        // isLoading: true,
      }}
    />
  </div>
}