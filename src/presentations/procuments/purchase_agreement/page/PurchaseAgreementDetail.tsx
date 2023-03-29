import { withRouter } from '@/routes/withRouter';
import React, { Component, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PurchaseAgreement from '../../../../models/PurchaseAgreement';
import { PurchaseAgreementProps, PurchaseAgreementDocumentLineProps } from '../../../../models/PurchaseAgreement';
import EditIcon from "@mui/icons-material/Edit";
import { HiOutlineEye, HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight, HiOutlineDocumentAdd, HiOutlineChevronDown } from "react-icons/hi";
import Taps from '@/components/button/Taps';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { currencyFormat, dateFormat, fileToBase64 } from '@/utilies';
import { AttachmentLine } from '../../../../models/Attachment';
import Modal from '@/components/modal/Modal';
import PreviewAttachment from '@/components/attachment/PreviewAttachment';
import { CircularProgress } from '@mui/material';
import BackButton from '@/components/button/BackButton';
import PurchaseAgreementRepository from '../../../../services/actions/purchaseAgreementRepository';
import DocumentHeaderComponent from '@/components/DocumenHeaderComponent';
import DocumentStatus from '@/constants/documentStatus';
import { ContactEmployee } from '@/models/BusinessParter';
import BusinessPartnerRepository from '@/services/actions/bussinessPartnerRepository';
import BusinessPartner from '../../../../models/BusinessParter';
import OwnerRepository from '@/services/actions/ownerRepository';
import PaymentTermTypeRepository from '../../../../services/actions/paymentTermTypeRepository';
import ShippingTypeRepository from '@/services/actions/shippingTypeRepository';
import { QueryClient } from 'react-query';


class PurchaseAgreementDetail extends Component<any, any> {

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
        const data = this.props.location.state as PurchaseAgreement;

        if (data) {
            setTimeout(() => {
                let purchaseAgreement = data;
                purchaseAgreement as PurchaseAgreement;
                if (purchaseAgreement.contactPersonCode) {
                    new BusinessPartnerRepository().findContactEmployee(purchaseAgreement.cardCode!).then((res: BusinessPartner) => {
                        purchaseAgreement.email = res.email;
                        purchaseAgreement.phone = res.phone;
                        purchaseAgreement.contactPersonList = res.contactEmployee ?? [];
                        this.setState({ ...purchaseAgreement, loading: false })
                    })
                } else {
                    this.setState({ ...purchaseAgreement, loading: false })
                }
            }, 500)
        } else {
            new PurchaseAgreementRepository().find(id).then((res: any) => {
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
                        <div className='grid grid-cols-2 sm:grid-cols-1 gap-2 w-full shadow-sm rounded-lg bg-white text-[12px] p-6'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>BP Code</span>
                                    <span className='w-8/12 font-medium'>: {this.state.cardCode}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>BP Name</span>
                                    <span className='w-8/12 font-medium'>: {this.state.cardName}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Contact Person Code</span>
                                    <span className='w-8/12 font-medium'>: {this.state?.contactPersonList?.find((e: ContactEmployee) => e.id === this.state.contactPersonCode)?.name}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Email</span>
                                    <span className='w-8/12 font-medium'>: {this.state?.email}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Phone</span>
                                    <span className='w-8/12 font-medium'>: {this.state?.phone}</span>
                                </div>


                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500 '>Document Numbering</span>
                                    <span className='w-8/12 font-medium'>: {this.state.docNum}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Agreement Type</span>
                                    <span className='w-8/12 font-medium'>: {PurchaseAgreement.getType(this.state.agreementMethod)}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>Start Date</span>
                                    <span className='w-8/12 font-medium'>: {dateFormat(this.state.startDate)}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='w-4/12 text-gray-500'>End Date</span>
                                    <span className='w-8/12 font-medium'>: {dateFormat(this.state.endDate)}</span>
                                </div>


                            </div>
                        </div>
                        <div className='grow flex flex-col gap-3 p-6 shadow-sm rounded-lg bg-white'>
                            <Taps
                                items={['General', 'Content', 'Attachment']}
                            >
                                <General data={this.state} />
                                <Content data={this.state} />
                                <PreviewAttachment attachmentEntry={this.state.attachmentEntry} />
                            </Taps>
                        </div>
                    </>)

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
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Agreement Type</span> <span className='col-span-2 font-medium'>: {PurchaseAgreement.getType(data.agreementType)}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Payment Terms</span> <span className='col-span-2 font-medium'>: {new PaymentTermTypeRepository().find(data.paymentTermType)?.PaymentTermsGroupName}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Payment Method</span> <span className='col-span-2 font-medium'>: {data.paymentMethod ?? 'N/A'}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Shipping Type</span> <span className='col-span-2 font-medium'>: {new ShippingTypeRepository().find(data.shippingType)?.Name}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Settlement Probability %</span> <span className='col-span-2 font-medium'>: {data.settlementProbability}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Remark</span> <span className='col-span-2 font-medium'>: {data.remark ?? 'N/A'}</span></div>
        </div>
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Status</span> <span className='col-span-2 font-medium'>: {DocumentStatus.getFullNameStatus(data?.status)}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Owner</span> <span className='col-span-2 font-medium'>: {new OwnerRepository().find(data.owner)?.name}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Reminder</span> <span className='col-span-2 font-medium'>: {data.remindTime} {PurchaseAgreement.getRemindUnit(data.remindUnit)}</span></div>
        </div>
    </div>
}

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

    return <div className="data-table  border-none p-0 mt-3">
        <MaterialReactTable
            columns={data?.agreementMethod === 'I' ? itemColumn : serviceColumns}
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
