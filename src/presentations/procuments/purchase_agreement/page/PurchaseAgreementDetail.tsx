import { withRouter } from '@/routes/withRouter';
import React, { Component } from 'react'
import PurchaseAgreement, { PurchaseAgreementDocumentLine } from '../../../../models/PurchaseAgreement';
import Taps from '@/components/button/Taps';
import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';
import { currencyFormat, dateFormat, fileToBase64 } from '@/utilies';
import Modal from '@/components/modal/Modal';
import PreviewAttachment from '@/components/attachment/PreviewAttachment';
import { CircularProgress } from '@mui/material';
import PurchaseAgreementRepository from '../../../../services/actions/purchaseAgreementRepository';
import DocumentHeaderComponent from '@/components/DocumenHeaderComponent';
import DocumentStatus from '@/constants/documentStatus';
import { ContactEmployee } from '@/models/BusinessParter';
import BusinessPartnerRepository from '@/services/actions/bussinessPartnerRepository';
import BusinessPartner from '../../../../models/BusinessParter';
import OwnerRepository from '@/services/actions/ownerRepository';
import PaymentTermTypeRepository from '../../../../services/actions/paymentTermTypeRepository';
import ShippingTypeRepository from '@/services/actions/shippingTypeRepository';
import ItemGroupRepository from '@/services/actions/itemGroupRepository';
import { getUOMGroupByCode } from '@/helpers';
import UnitOfMeasurementGroupRepository from '@/services/actions/unitOfMeasurementGroupRepository';
import { useQuery } from 'react-query';
import MenuButton from '@/components/button/MenuButton';


class PurchaseAgreementDetail extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            isError: false,
            message: '',
        }

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount(): void {
        this.fetchData()
    }

    async fetchData() {
        const { id } = this.props.match.params;
        const data = this.props.query.find('pa-id-' + id);
        if (!data) {
            new PurchaseAgreementRepository().find(id).then(async (res: any) => {
                this.props.query.set('pa-id-' + id, res);
                this.setState({ ...res, loading: false });
            }).catch((e: Error) => {
                this.setState({ isError: true, message: e.message });
            })
        } else {
            this.setState({ ...data, loading: false });
        }
    }

    render() {
        return (
            <div className='w-full h-full flex flex-col  gap-4'>
                <DocumentHeaderComponent data={this.state} menuTabs={[
                    <>
                        <MenuButton active={this.state.tapIndex === 0} onClick={() => { }}>General</MenuButton>
                        <MenuButton active={this.state.tapIndex === 1} onClick={() => { }}>Logistic</MenuButton>
                        <MenuButton active={this.state.tapIndex === 2} onClick={() => { }}>Content</MenuButton>
                        <MenuButton active={this.state.tapIndex === 3} onClick={() => { }}>Attachment</MenuButton>
                    </>
                ]} />

                <Modal open={this.state.isError} title='Oop' onClose={() => { }} onOk={() => console.log(this.props.history.goBack())}>
                    <span>
                        {this.state?.message}
                    </span>
                </Modal>

                {this.state.loading ? <div className='grow flex justify-center items-center'>
                    <CircularProgress />
                </div> :
                    (<div className='w-full h-full px-4 flex flex-col gap-2'>
                        {/* <div className='grid grid-cols-2 sm:grid-cols-1 gap-2 w-full shadow-sm rounded-lg bg-white text-[12px] p-6'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Vendor Code</span>
                                    <span className='w-8/12 font-medium'>: {this.state.CardCode}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Vendor Name</span>
                                    <span className='w-8/12 font-medium'>: {this.state.CardName}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Contact Person Code</span>
                                    <span className='w-8/12 font-medium'>: {this.state?.ContactPersonList?.find((e: ContactEmployee) => e.id === this.state.contactPersonCode)?.name}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Email</span>
                                    <span className='w-8/12 font-medium'>: {this.state?.Email}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Phone</span>
                                    <span className='w-8/12 font-medium'>: {this.state?.Phone}</span>
                                </div>


                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500 '>Document Numbering</span>
                                    <span className='w-8/12 font-medium'>: {this.state.DocNum}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Agreement Type</span>
                                    <span className='w-8/12 font-medium'>: {PurchaseAgreement.getType(this.state.AgreementMethod)}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Start Date</span>
                                    <span className='w-8/12 font-medium'>: {dateFormat(this.state.StartDate)}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>End Date</span>
                                    <span className='w-8/12 font-medium'>: {dateFormat(this.state.EndDate)}</span>
                                </div>


                            </div>
                        </div> */}
                        <div className='grow flex flex-col gap-3 p-6 rounded-lg shadow-lg border bg-white'>
                            <General data={this.state} />
                            {/* <Taps
                                items={['General', 'Content', 'Attachment']}
                            >
                                <General data={this.state} />
                                <Content data={this.state} />
                                <PreviewAttachment attachmentEntry={this.state.AttachmentEntry} />
                            </Taps> */}
                        </div>
                    </div>)

                }

            </div>
        )
    }
}

export default withRouter(PurchaseAgreementDetail);

function General(props: any) {
    const { data }: any = props;


    return <div className='grow w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[12px] py-2'>
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Agreement Type</span> <span className='col-span-2 font-medium'>: {PurchaseAgreement.getType(data.AgreementType)}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Payment Terms</span> <span className='col-span-2 font-medium'>: {new PaymentTermTypeRepository().find(data.PaymentTermType)?.PaymentTermsGroupName}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Payment Method</span> <span className='col-span-2 font-medium'>: {data.PaymentMethod ?? 'N/A'}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Shipping Type</span> <span className='col-span-2 font-medium'>: {new ShippingTypeRepository().find(data.ShippingType)?.Name}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Settlement Probability %</span> <span className='col-span-2 font-medium'>: {data.SettlementProbability}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Remark</span> <span className='col-span-2 font-medium'>: {data.Remark ?? 'N/A'}</span></div>
        </div>
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Status</span> <span className='col-span-2 font-medium'>: {DocumentStatus.getFullNameStatus(data?.Status)}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Owner</span> <span className='col-span-2 font-medium'>: {new OwnerRepository().find(data.Owner)?.name}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Reminder</span> <span className='col-span-2 font-medium'>: {data.remindTime} {PurchaseAgreement.getRemindUnit(data.RemindUnit)}</span></div>
        </div>
    </div>
}

function Content(props: any) {
    const { data } = props;
    const itemGroupRepo = new ItemGroupRepository();


    const itemColumn = useMemo(() => [
        {
            accessorKey: "ItemCode",
            header: "Item NO.", //uses the default width from defaultColumn prop
            enableClickToCopy: true,
            enableFilterMatchHighlighting: true,
            size: 88,
        },
        {
            accessorKey: "ItemName",
            header: "Item Description",
            enableClickToCopy: true,
        },
        {
            accessorKey: "ItemGroup",
            header: "Item Group",
            Cell: ({ cell }: any) => itemGroupRepo.find(cell.getValue())?.GroupName,
        },
        {
            accessorKey: "Quantity",
            header: "Quantity",
            Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
        },
        {
            accessorKey: "UnitPrice",
            header: "Unit Price",
            Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
        },
        {
            accessorKey: "UoMGroup",
            header: "UoM Group",
            Cell: ({ cell }: any) => getUOMGroupByCode(cell.row.original.ItemCode)?.Code,
        },
        {
            accessorKey: "UomCode",
            header: "UoM Group",
            Cell: ({ cell }: any) => cell.getValue(),
        },
        {
            accessorKey: "UnitsOfMeasurement",
            header: "Item Per Units",
            Cell: ({ cell }: any) => cell.getValue(),
        },
    ], [data]);

    const serviceColumns = React.useMemo(
        () => [
            {
                accessorKey: "PlannedAmountLC",
                header: "Planned Amount (LC)",
                Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
            },
            {
                accessorKey: "LineDiscount",
                header: "Line Discount",
                Cell: ({ cell }: any) => currencyFormat(cell.getValue()),
            },
            {
                accessorKey: "PlannedAmountLC",
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

    return <div className="data-table text-inherit  border-none p-0 mt-3">
        <MaterialReactTable
            columns={data?.AgreementMethod === 'I' ? itemColumn : serviceColumns}
            data={data?.Items ?? []}
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
